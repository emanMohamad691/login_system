var allInputs = document.querySelectorAll("input");
var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");

var loginbtn = document.querySelector("#loginBtn");
var signUpbtn = document.querySelector("#signUp");
var allInvalidPara = document.querySelectorAll(
  "#invalidName,#invalidEmail,#invalidPassword,#invalidAllInput,#incorrectEAndP,#existEmail"
);
var allUsers = [];
var welcome = document.getElementById("welcome");
var currentUser;

var regx = {
  userName: {
    value: /^[a-zA-Z]{3,15}$/,
    isValid: false
  },
  userEmail: {
    value: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    isValid: false
  },
  userPassword: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    isValid: false
  }
};

function clear() {
  for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].value = null;
  }
}
function displayMessage(id) {
  for (var i = 0; i < allInvalidPara.length; i++) {
    if (allInvalidPara[i].id !== id) {
      allInvalidPara[i].classList.replace("d-block", "d-none");
    } else {
      allInvalidPara[i].classList.replace("d-none", "d-block");
    }
  }
}

// !sign up page
var signUpPage = document.body.id;
if (signUpPage === "signUpPage") {
  function isEmailExist(email) {
    if (localStorage.getItem("users") !== null) {
      allUsers = JSON.parse(localStorage.getItem("users"));

      for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === email) {
          return true;
        }
      }
      return false;
    }
  }

  function signUpValidation(name, email, password) {
    regx.userName.isValid = false;
    regx.userEmail.isValid = false;
    regx.userPassword.isValid = false;
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].addEventListener("input", function() {
        displayMessage("");
      });
    }

    if (name === "" || email === "" || password === "") {
      displayMessage("invalidAllInput");
    } else if (!regx.userName.value.test(name)) {
      displayMessage("invalidName");
    } else if (!regx.userEmail.value.test(email)) {
      displayMessage("invalidEmail");
    } else if (isEmailExist(email)) {
      displayMessage("existEmail");
    } else if (!regx.userPassword.value.test(password)) {
      displayMessage("invalidPassword");
    } else {
      regx.userName.isValid = true;
      regx.userEmail.isValid = true;
      regx.userPassword.isValid = true;
      
    }
  }
  function signUpForm(e) {
    e.preventDefault();
    var user = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value
    };

    signUpValidation(user.name, user.email, user.password);

    if (
      regx.userName.isValid &&
      regx.userEmail.isValid &&
      regx.userPassword.isValid
    ) {
      if (localStorage.getItem("users") !== null) {
        allUsers = JSON.parse(localStorage.getItem("users"));
      }

      allUsers.push(user);
      localStorage.setItem("users", JSON.stringify(allUsers));

      clear();
      location.href = "../index.html";
    }
  }

  signUpbtn.addEventListener("click", signUpForm);
}

// ! login page

var login = document.body.id;
if (login === "login") {

  var isValid = false;
  function validationLogin() {
    isValid = false;
    for (var i = 0; i < allInputs.length; i++) {
          allInputs[i].addEventListener("input", function() {
            displayMessage("");
          });
        }
    if(userEmail.value === "" || userPassword.value === ""){
      displayMessage("invalidAllInput");
    }
    else if(localStorage.getItem("users") === null){
      displayMessage("incorrectEAndP");
    }
    else if(localStorage.getItem("users") !== null){
      allUsers = JSON.parse(localStorage.getItem("users"));
      for(var i = 0; i<allUsers.length; i++){
       if(!(allUsers[i].email === userEmail.value && allUsers[i].password === userPassword.value)){
        displayMessage("incorrectEAndP");
       }
       else
    {
      isValid = true;
      currentUser = allUsers[i].name;
      
      
    }
        
      }
      
    }
 
  }
  loginbtn.addEventListener("click", function(e) {
    e.preventDefault();
   validationLogin();
   if(isValid){
   
       clear();
      location.href = `./pages/home.html?name=${currentUser}`;
    
   }
  });
}

// ! home page

var home = document.body.id;
if (home === "home") {
  var params = new URLSearchParams(location.search);
  welcome.innerHTML = `Welcome ${params.get("name")}`;
 
}
