// ================ DOM ================
let userEmailSignIn = document.getElementById("userEmailSignIn");
let userPasswordSignIn = document.getElementById("passWordSignIn");
let userNameSignUp = document.getElementById("userNameSignUp");
let userEmailSignUp = document.getElementById("userEmailSignUp");
let userPasswordSignUp = document.getElementById("userPasswordSignUp");
let signInBtn = document.getElementById("signInBtn");
let signUpBtn = document.getElementById("signUpBtn");
let logOutBtn = document.getElementById("logOutBtn");
let welcomeName = document.getElementById("welcome");
let alert = document.getElementById("alert");
let h1 = document.getElementById("title");

// Regex to validate email
let regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Regex to validate password
let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


// An array to contain user registration details
let userInfoContainer;

// Checking if there are stored data in local storage
if (localStorage.getItem("UsersList") == null) {
    userInfoContainer = [];
}
else {
    userInfoContainer = JSON.parse(localStorage.getItem('UsersList'));
    userSignInArray = JSON.parse(localStorage.getItem('UserSignIn'));
}

// Sign up function 
function signUp() {
    if (userInfoContainer.length == 0 || isEmailExist() == false && validateEmail() == true && validatePass() == true) {
        let user =
        {
            userName: userNameSignUp.value,
            userMail: userEmailSignUp.value,
            userPassword: userPasswordSignUp.value,
        }
        userInfoContainer.push(user)
        localStorage.setItem("UsersList", JSON.stringify(userInfoContainer));
        window.location.assign("Sign in.html")
        clrForm()
    }
    else if (signUpEmptyCheck() == false) {
        alert.style.display = "block"
        alert.style.color = "yellow"
        alert.innerHTML = `All data required`
    }
    else {
        alert.style.display = "block"
        alert.style.color = "red"
        alert.innerHTML = "Invalid data"
    }
}


function isEmailExist() {
    let y = undefined;
    for (let i = 0; i < userInfoContainer.length; i++) {
        if (userEmailSignUp.value == userInfoContainer[i].userMail) {
            y = true
            // return true;
        }
        else {
            y = false;
            // return false;
        }
    }
    return y;
}

// logout function
function logOut() {
    localStorage.removeItem('sessionUserName')
    window.location.replace("Sign in.html");
}

function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);

// Sign in function 
function signIn() {
    if (signInEmptyChecker() != true) {
        for (let i = 0; i < userInfoContainer.length; i++) {
            let emailInput = userEmailSignIn.value;
            let passwordIn = userPasswordSignIn.value;
            if (emailInput == userInfoContainer[i].userMail && passwordIn == userInfoContainer[i].userPassword) {
                localStorage.setItem('sessionUserName', userInfoContainer[i].userName)
                window.location.replace("bookmarks.html");
                break;
            }
            else {
                alert.style.display = `block`;
                alert.innerHTML = "Incorrect data"
            }
        }
    }
    else {
        alert.style.display = "block";
        alert.innerHTML = `All data are required`
    }
}

// Checking if the sign up inputs are empty
function signUpEmptyCheck() {
    if (userNameSignUp.value == "" && userEmailSignUp.value == "" && userPasswordSignUp.value == "") {
        return false;
    }
    else {
        return true;
    }
}

// Checking if the sign in inputs are empty
function signInEmptyChecker() {
    if (userEmailSignIn.value == "" && userPasswordSignIn.value == "") {
        return true;
    }
    else {
        return false;
    }
}

// Clearing the inputs after user presses sign up
function clrSignUpInputs() {
    userEmailSignUp.value = ``;
    userPasswordSignUp.value = ``;
    userNameSignUp.value = ``;
}

// Clearing the inputs after user presses sign in
function clrSignInInputs() {
    userEmailSignIn.value = ``;
    userPasswordSignIn.value = ``;
}

// Title animation
(function () {
    setTimeout(titleVis, 800)

    function titleVis() {
        h1.style.opacity = "1"
        h1.style.transition = "opacity,1.2s"
    }
    function hideTitle() {
        h1.style.opacity = "0"
    }
    hideTitle();
})()

// Welcoming the user with his/her name
function userWelcoming() {
    for (let i = 0; i < userInfoContainer.length; i++) {
        welcomeName.innerHTML = `Welcome` + ` ` + localStorage.getItem('sessionUserName')
    }
}

// Email validation function
function validateEmail() {
    if (regexMail.test(userEmailSignUp.value) == true) {
        return true;
    }
    else {
        return false;
    }
}
// Password validation function
function validatePass() {
    if (regexPass.test(userPasswordSignUp.value) == true) {
        return true;
    }
    else {
        return false;
    }
}

// Realtime checking for email
function isEmailValid() {
    if (validateEmail() == true) {
        alert.style.display = `block`
        alert.style.color = `green`
        alert.innerHTML = `Email valid`
    }
    else {
        alert.style.display = `block`
        alert.style.color = `red`
        alert.innerHTML = `Invalid-email`
    }
}

// Realtime checking for password
function isPassValid() {
    if (validatePass() == true) {
        alert.style.display = `block`
        alert.style.color = `green`
        alert.innerHTML = `Valid Password`
    }
    else {
        alert.style.display = `block`
        alert.style.color = `red`
        alert.innerHTML = `Invalid Password`
    }
}