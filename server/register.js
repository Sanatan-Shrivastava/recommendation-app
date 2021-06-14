function checkUserFirstName() {
  var userSurname = document.getElementById("reg_sr_firstname").value;
  var flag = false;
  if (userSurname === "") {
    flag = true;
  }
  if (flag) {
    document.getElementById("userFirstNameError").style.display = "block";
  } else {
    document.getElementById("userFirstNameError").style.display = "none";
  }
}

function checkChildFirstName() {
  var userSurname = document.getElementById("reg_child_firstname").value;
  var flag = false;
  if (userSurname === "") {
    flag = true;
  }
  if (flag) {
    document.getElementById("userChildFirstNameError").style.display = "block";
  } else {
    document.getElementById("userChildFirstNameError").style.display = "none";
  }
}

function checkChildLastName() {
  var userSurname = document.getElementById("reg_child_lastname").value;
  var flag = false;
  if (userSurname === "") {
    flag = true;
  }
  if (flag) {
    document.getElementById("userChildLastNameError").style.display = "block";
  } else {
    document.getElementById("userChildLastNameError").style.display = "none";
  }
}

function checkUserSurname() {
  var userSurname = document.getElementById("reg_sr_lastname").value;
  var flag = false;
  if (userSurname === "") {
    flag = true;
  }
  if (flag) {
    document.getElementById("userSurnameError").style.display = "block";
  } else {
    document.getElementById("userSurnameError").style.display = "none";
  }
}

function checkUserPassword() {
  var userPassword = document.getElementById("reg_password");
  var userPasswordConfirmed = document.getElementById("confirm_reg_password");
  var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
  var flag;
  if (
    userPassword.value.match(userPasswordFormate) &&
    userPassword.value === userPasswordConfirmed.value
  ) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    document.getElementById("userPasswordError").style.display = "block";
    document.getElementById("userPasswordConfirmError").style.display = "block";
  } else {
    document.getElementById("userPasswordError").style.display = "none";
    document.getElementById("userPasswordConfirmError").style.display = "none";
  }
}

function checkUserEmail() {
  var userEmail = document.getElementById("reg_email");
  var userEmailFormate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if (userEmail.value.match(userEmailFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    document.getElementById("userEmailError").style.display = "block";
  } else {
    document.getElementById("userEmailError").style.display = "none";
  }
}

function registerUser() {
  // Warden details:

  var parentFirstName = document.getElementById("reg_sr_firstname").value;
  var parentLastName = document.getElementById("reg_sr_lastname").value;
  var email = document.getElementById("reg_email").value;
  var phone = document.getElementById("reg_phone").value;
  var password = document.getElementById("reg_password").value;
  var password2 = document.getElementById("confirm_reg_password").value;

  // Ward details:

  var childFirstName = document.getElementById("reg_child_firstname").value;
  var childLastName = document.getElementById("reg_child_lastname").value;
  var dob = document.getElementById("reg_child_dob").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((success) => {
      var user = firebase.auth().currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      var firebaseRef = firebase.database().ref("users");
      var userData = {
        parentFirstName: parentFirstName,
        parentLastName: parentLastName,
        email: email,
        phone: phone,
        password: password,
        password2: password2,

        childFirstName: childFirstName,
        childLastName: childLastName,
        dob: dob,
        age: new Date(Date.now()).getUTCFullYear() - new Date(dob).getUTCFullYear()
      };
      firebaseRef.child(uid).set(userData);
      swal(
        "Your Account Created",
        "Your account was created successfully, you can log in now."
      ).then((value) => {
        setTimeout(function () {
          window.location.replace("./profile.html");
        }, 1000);
      });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Error",
      });
    });
}
