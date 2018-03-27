if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

var userName = "";
var password = "";
var confirmation = "";

//test code to plug up the modals
$(document).ready(function() {
    //User Login - check to see if the value entered matches for confirmation
    $("#custom-btnSignup").on("click", function() {
        //set up the varaibles to contain the information that is requried to function.
        userName = $("accountName").val();
        password = $("#mainPassWord").val();
        confirmPass = $("#checkPassword").val();

        //check to insure that the information is blank
        if (userName === "" || password === "" || confirmPass === "") {
            iziToast.warning({
                title: 'Login Issue',
                timeout: 5000,
                message: 'One or more of the current fields are blank.  Please fully fill in then try again.',
            });
            return;
        };

        //Check to see if the passwords match
        if (password !== confirmPass) {
            //if no match is made throw an error to the user
            iziToast.warning({
                timeout: 5000,
                title: 'Password Issue',
                message: "The password you've have enterted does not match, please check and try again.",
            });
            $("#checkPassword").val("");
            return;
        } else {
            iziToast.success({
                title: 'Welcome!',
                message: "We're logging you in now!",
            });
        }

        //check the number of digits in the password field exceed 10 digits.  If so then throw error and stop user
        if (parseInt($(password).val()) > 10 || parseInt($(confirmPass).val()) > 10) {
            iziToast.warning({
                title: 'Bad Value',
                timeout: 5000,
                message: 'Either your password or the confirmation exceeds 10 digits, please try again with less than 10 digits.'
            });
            $("#mainPassWord").val("");
            return;
        }
    });

    //Basic Button controls
    /* Added code here for button navigation to the BattleScreen from the TeamEdit file */
    //when this battle button is clicked it should open the battle page.
    $("#btnBattle").click(function() {
        window.location.href = "battle.html";
        return false;
    });

    //when clicked confirm if they want to leave the program.  If confirmed as yes then thank and exit.
    $(".btn-exit").click(function() {
        //text to be placed.
    });
});

//If the user gets a valid login response then move to the next page - this code is still in test and may need mySQL confirmation.
/*function WelcomeIn({

});*/

//Below is the modal information that has been cleaned up.
$("#modal-custom-signup").iziModal({
    history: false,
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    navigateCaption: true,
    navigateArrows: "false",
});

$("#modal-custom-login").iziModal({
    history: false,
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    navigateCaption: true,
    navigateArrows: "false",
});

$("#modal-custom-rules").iziModal({
    history: false,
    overlayClose: false,
    width: 1200,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    navigateCaption: true,
    navigateArrows: "false",
});

$(document).on('click', '#iNewAccount', function(event) {
    event.preventDefault();
    $('#modal-custom-signup').iziModal('open');
});

$(document).on('click', '#iExisting', function(event) {
    event.preventDefault();
    $('#modal-custom-login').iziModal('open');
});

$(document).on('click', '#iRules', function(event) {
    event.preventDefault();
    $('#modal-custom-rules').iziModal('open');
});

$("#modal-custom-signup").on('click', 'button.submit', function() {
    console.log("in #modal-custom-signup #b_create on-click");
    var newOwner = {};
    // verify passwords match
    if ($('#create_pass').val().trim() === $('#create_verify').val().trim()) {
        newOwner = {
            userName: $('#create_name').val().trim(),
            passWord: $('#create_pass').val().trim()
        }
    }
    // first, check if username exists
    $.ajax("/api/owners/" + newOwner.userName, {
        type: "GET",
        data: newOwner
    }).then(
        function(owner) {
            console.log("owner:", owner);
            if (owner) {
                // popup/alert to choose new username
                iziToast.warning({
                    timeout: 5000,
                    title: 'Exisiting Owner',
                    message: "Username already exists, please choose a new one!",
                });
                return false;
            } else {
                // if not already existing, then create it
                $.ajax("/api/owners/new", {
                    type: "POST",
                    data: newOwner
                }).then(
                    function() {
                        console.log("created new User");

                        // one thing we need to do is have the OwnerId available to the app
                        // so, for now, store the username in localStorage
                        localStorage.setItem("username", newOwner.userName);
                        //Shift the screen to the next page at this point.
                        window.location.href = ("teamEdit.html");
                        // now dismiss the modal and switch to teamEdit
                        // TODO
                    }
                );
            }
        }
    );
});

$("#modal-custom-login").on('click', 'button.submit', function() {
    console.log("in #modal-custom-signup on-click");
    var loginOwner = {};
    // verify passwords match
    if ($('#login_pass').val().trim()) {
        loginOwner = {
            userName: $('#login_name').val().trim(),
            passWord: $('#login_pass').val().trim()
        }
    }
    // first, check if username exists
    $.ajax("/api/owners/login/" + loginOwner.userName, {
        type: "GET",
        data: loginOwner
    }).then(
        function(owner) {
            console.log("owner:", owner);
            if (owner) {
                // one thing we need to do is have the OwnerId available to the app
                // so, for now, store the username in localStorage
                localStorage.setItem("username", loginOwner.userName);

                // now dismiss the modal and switch to teamEdit
                // TODO
                //Shift the screen to the next page at this point.
                window.location.href = ("teamEdit.html");
                // Note *** The following will need to be valdated that it loads that owners info.
            } else {
                // TODO popup/alert to choose new username
                iziToast.warning({
                    timeout: 5000,
                    title: 'Exisiting Owner',
                    message: "Username already exists, please choose a new one!",
                });
                return false;
            }
        }
    );
});