var signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('error').innerHTML = '';
    document.getElementById('success').innerHTML = '';
    //get user info
    var firstname = signupForm['signup-firstname'].value;
    var lastname = signupForm['signup-lastname'].value;
    var password = signupForm['signup-password'].value;
    var email = signupForm['signup-email'].value;

    //signup user
    auth.createUserWithEmailAndPassword(email, password).catch(err => {
        //setting up error message + error message
        document.getElementById('error').innerHTML = err.message;
        }).then(cred => {
            //Add DisplayName
            console.log(cred.user);
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: firstname
            })

            //email verification
            user.sendEmailVerification().then(() => {
                console.log('email verification sent')
                //entering a success message when successful
                document.getElementById('success').innerHTML = 'Successful registration!<br>An email has been sent to '+ email +' for account verification. Be sure to check spam!';
            })
            signupForm.reset();
            })
})

//signin 
var loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    var email = loginForm['login-email'].value;
    var password = loginForm['login-password'].value;

    //setting up error message if needed
    document.getElementById('error1').innerHTML = '';
    
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        document.getElementByID('success1').innerHTML = 'Success';
    }).catch(err => {
        //error message
        document.getElementById('error1').innerHTML = err.message;
    })
})