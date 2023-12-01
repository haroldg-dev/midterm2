firebase.auth().languageCode = "en";

window.addEventListener("load", function () {
  // first funtion to listen google button
  this.document
    .getElementById("sign-in-google")
    .addEventListener("click", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log("Loggin sucessfully", result.user);
          window.location.href = "home.html";
        })
        .catch(function (error) {
          console.log("Loggin fail", error);
        });
    });

  this.document
    .getElementById("sing-in-traditional")
    .addEventListener("click", function () {
      var emailTxt = document.getElementById("account_email").value;
      var passwordTxt = document.getElementById("account_passwd").value;

      var provider = new firebase.auth()
        .signInWithEmailAndPassword(emailTxt, passwordTxt)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("Loggin sucessfully", user);
          window.location.href = "home.html";
        })
        .catch((error) => {
          console.log("Loggin fail", error);
        });
    });

  this.document
    .getElementById("sign-in-phone")
    .addEventListener("click", function () {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
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
          const code = "123456";
          confirmationResult
            .confirm(code)
            .then((result) => {
              // User signed in successfully.
              const user = result.user;
              // ...
              console.log("Loggin sucessfully", user);
              window.location.href = "home.html";
            })
            .catch((error) => {
              // User couldn't sign in (bad verification code?)
              // ...
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("Loggin fail", error);

          grecaptcha.reset(window.recaptchaWidgetId);
        });
    });
});
