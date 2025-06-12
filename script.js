var form = document.getElementById("regForm");
var email_input = document.getElementById("email");
var password_input = document.getElementById("password");
var confirm_password_input = document.getElementById("confirmPassword");
var message = document.getElementById("message");
var button = document.getElementById("btn_submit");
function CheckFormComponents() {
    var password = password_input.value;
    var confirm_password = confirm_password_input.value;
    var email = email_input.value;
    var email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var numbers = /1234567890/;
    var special_symbols = /[!@#$%^&*]/;
    var matches = password.match(/[!@#$%^&*"№;%:?*]/g);
    if (email == "" || password == "" || confirm_password == "") {
        message.style.display = "none";
        message.innerHTML = "";
        button.disabled = true;
        return;
    }
    if (!email_pattern.test(email)) {
        message.style.display = "";
        message.innerHTML = "Некорректный email!";
        message.style.backgroundColor = "rgb(255, 91, 91)";
        button.disabled = true;
        return;
    }
    var count = matches ? matches.length : 0;
    if (count < 2) {
        message.innerHTML = "Пароль должен содержать 2 или более специальных символа";
        message.style.display = "";
        message.style.backgroundColor = "rgb(255, 91, 91)";
        button.disabled = true;
        return;
    }
    if (password.length < 6) {
        message.style.display = "";
        message.innerHTML = "Пароль должен содержать не менее 6 символов";
        message.style.backgroundColor = "rgb(255, 91, 91)";
        button.disabled = true;
        return;
    }
    if (password != confirm_password) {
        message.style.display = "";
        message.innerHTML = "Пароли не совпадают";
        message.style.backgroundColor = "rgb(255, 91, 91)";
        button.disabled = true;
        return;
    }
    message.style.display = "none";
    button.disabled = false;
    console.log("!");
}
email_input.addEventListener("input", CheckFormComponents);
password_input.addEventListener("input", CheckFormComponents);
confirm_password_input.addEventListener("input", CheckFormComponents);
form.addEventListener("submit", function (event) {
    event.preventDefault();
    message.style.display = "";
    message.innerHTML = "Регистрация успешна!";
    message.style.backgroundColor = "rgb(176, 255, 112)";
    form.reset();
});
