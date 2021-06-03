firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var user = firebase.auth().currentUser;

    if (user != null) {
      var uid = user.uid;
      var name, email, child_name, age, dob, prev;
        const dbRef = firebase.database().ref();
        dbRef
          .child("users")
          .child(uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
                const user = snapshot.val();
                first_name = user.parentFirstName;
                name = user.parentFirstName + user.parentLastName;
                child_name = user.childFirstName + " " +user.childLastName;
                email = user.email;
                phone = user.phone;
                age = user.age;
                dob = user.dob;
                prev = user.history;
                document.getElementById(
                  "user_name"
                ).innerHTML = `<p>Hey, welcome to the dashboard, ${first_name}! </p> `;

                document.getElementById("name").innerHTML = name;
                document.getElementById("email").innerHTML = email;
                document.getElementById("phone").innerHTML = phone;
                document.getElementById("child_name").innerHTML = child_name;
                document.getElementById("age").innerHTML = age;
                document.getElementById("dob").innerHTML = dob;
                document.getElementById("warden_name").innerHTML = name;
                document.getElementById("prev").innerHTML = prev;
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
