var Lemail = document.getElementById("email");
var Lpassword = document.getElementById("password");

Lemail.addEventListener('input', () => {
    const emailBox = document.querySelector('.emailBox');
    const emailText = document.querySelector('.emailText');
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

    if (Lemail.value.match(emailPattern)) {
        emailBox.classList.add('valid');
        emailBox.classList.remove('invalid');
        emailText.innerHTML = "Your Email Address in Valid";
        document.querySelector("#password").disabled = false;
    } else {
        emailBox.classList.add('invalid');
        emailBox.classList.remove('valid');
        emailText.innerHTML = "Must be a valid email address.";
    }
});

Lpassword.addEventListener('input', () => {
    const passBox = document.querySelector('.passBox');
    const passText = document.querySelector('.passText');
    const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (Lpassword.value.match(passPattern)) {
        passBox.classList.add('valid');
        passBox.classList.remove('invalid');
        passText.innerHTML = "Your Password in Valid";
        document.querySelector("#btnLogin").disabled = false;

    } else {
        passBox.classList.add('invalid');
        passBox.classList.remove('valid');
        passText.innerHTML = "Your password must be at least 8 characters as well as contain at least one uppercase, one lowercase, and one number.";
    }


    const togglePassword = document.querySelector('#togglePassword');
    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = Lpassword.getAttribute('type') === 'password' ? 'text' : 'password';
        Lpassword.setAttribute('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });
});
function login() {
    if (Lemail.value == "nitin@gmail.com" && Lpassword.value == "Nitin@123") {
        alert('sucess')
        window.location = "admin_manager.html"
    }
    else {

        alert("invalid")
    }

}