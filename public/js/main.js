firebase.auth().languageCode = "en";

window.addEventListener("load", function () {
  // first funtion to listen google button
  this.document
    .getElementById("mdkgoogle")
    .addEventListener("click", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log("Loggin sucessfully", result.user);
        })
        .catch(function (error) {
          console.log("Loggin fail", error);
        });
    });

  this.document
    .getElementById("sing-in-traditional")
    .addEventListener("click", function () {
      var emailTxt = document.getElementById("email").value;
      var passwordTxt = document.getElementById("password").value;

      var provider = new firebase.auth()
        .signInWithEmailAndPassword(emailTxt, passwordTxt)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("Loggin sucessfully", user);
        })
        .catch((error) => {
          console.log("Loggin fail", error);
        });
    });

  this.document
    .getElementById("sing-in-phone")
    .addEventListener("click", function () {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        }
      );
      const phoneNumber = "+16047200257";

      const appVerifier = window.recaptchaVerifier;

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("Loggin sucessfully", confirmationResult);
        })
        .catch((error) => {
          console.log("Loggin fail", error);

          grecaptcha.reset(window.recaptchaWidgetId);
        });
    });
});
