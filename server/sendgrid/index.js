const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

require("dotenv").config();
// console.log(process.env.SENDGRID_API_KEY);

const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendWelcomeMail = functions.database
  .ref("/users/{email}")
  .onCreate((snapshot, context) => {
    console.log("atleast function is triggered");
    const user = snapshot.val();

    const userName = user.parentFirstName;
    const userEmail = user.email;
    const userContact = user.phone;

    console.log(user.flairId);

    const msg = {
      to: user.email,
      from: "team@detect-dysgraphia.ml",
      subject: `Welcome to Our Group! - IIIT Kota Research Team!`,

      text: `Hi ${userName},
        We're so glad, you registered with us.
        Welcome to Detect-Dysgraphia - A platform contributing to Early and automated Diagnosis of Dysgraphia using Deep Neural Network.
        We appreciate your help and contribution in this project!

        Your Credentials: 
        Email: ${userEmail}
        Registered Contact No: ${userContact}
        Cheers!
        Research Group - IIIT Kota
        "Early and automated Diagnosis of Dysgraphia using Deep Neural Network"
        © 2021 IIIT Kota, All rights reserved.
        Indian Institute of Information Technology, Kota
        Mentored by MNIT Jaipur.

        Address: MNIT Campus, 
        J.L.N. Marg, Malviya Nagar,
        Jaipur, Rajasthan -302017
        Contact Office IIIT Kota:  0141- 2743494`,
      html: `<p>Hi ${userName},</p><br>
        <p>We're so glad, you registered with us.</p>
        <p>Welcome to <strong>Detect-Dysgraphia</strong> - A platform contributing to Early and automated Diagnosis of Dysgraphia using Deep Neural Network.</p>
        <p>We appreciate your help and contribution in this project!</p><br>
        <p>Your Credentials: <br>
        Email: ${userEmail} <br>
        Registered Contact No: ${userContact}</p> <br>
        <p><strong>Cheers!</strong></p>
        <p>Research Group - IIIT Kota</p> <br>
        "Early and automated Diagnosis of Dysgraphia using Deep Neural Network" <br>
        © 2021 IIIT Kota, All rights reserved. <br>
        Indian Institute of Information Technology, Kota <br>
        Mentored by MNIT Jaipur. <br>
        Address: MNIT Campus,<br>
        J.L.N. Marg, Malviya Nagar, <br>
        Jaipur, Rajasthan -302017 <br>
        Contact Office IIIT Kota:  0141- 2743494 `,
    };

    return sendGridMail.send(msg);
  });
