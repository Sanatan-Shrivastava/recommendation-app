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
  var age = document.getElementById("reg_child_age").value;
  var history = document.getElementById("reg_child_ailment").value;

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
          age: age,
          history: history
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