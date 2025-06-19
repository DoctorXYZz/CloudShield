const form = document.getElementById("regForm") as HTMLFormElement;
const login_input = document.getElementById("login") as HTMLInputElement;
const email_input = document.getElementById("email") as HTMLInputElement;
const password_input = document.getElementById("password") as HTMLInputElement;
const confirm_password_input = document.getElementById("confirm_password") as HTMLInputElement;
const service_selector_selection = document.getElementById("service_type") as HTMLSelectElement;
const message = document.getElementById("message") as HTMLFormElement;
const button = document.getElementById("btn_submit") as HTMLButtonElement;

console.log(localStorage.getItem("reg_option"));

const service_selector_set_option = localStorage.getItem("reg_option") ?? "Консалтинг";
service_selector_selection.value = service_selector_set_option;

localStorage.setItem("reg_option", "Консалтинг");

function CheckFormComponents() : void {
    const login = login_input.value;
    const password = password_input.value;
    const confirm_password = confirm_password_input.value;
    const email = email_input.value;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const special_symbols = /[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    const matches = password.match(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g);

    function ClearMessage() : void {
        message.style.display = "none";
        message.innerHTML = "";
        button.disabled = true;
    }

    function ErrorMessage(error_msg:string) : void {
        message.style.display = "";
        message.innerHTML = error_msg;
        message.style.backgroundColor = `rgb(255, 91, 91)`;
        button.disabled = true;
    }

    if (login.length > 0) {
        if (special_symbols.test(login)) {
            ErrorMessage("Логин не должен содержать специальные символы");
            return;
        }
        if (login.length < 6) {
            ErrorMessage("Логин должен содержать не менее 6 символов");
            return;
        }
    } else {ClearMessage()}
    
    if (email.length > 0) {
            if (!email_pattern.test(email)) {
            ErrorMessage("Некорректный email");
            return;
        }
    } else {ClearMessage()}
    
    if (password.length > 0) {
        if (password.length < 6) {
            ErrorMessage("Пароль должен содержать не менее 6 символов");
            return;
        }

        const count = matches ? matches.length : 0;
        if (count < 2) {
          ErrorMessage("Пароль должен содержать 2 или более специальных символа");
          return;
        }

    } else {ClearMessage()}
    

    if (confirm_password.length > 0) {
        if (password != confirm_password) {
            ErrorMessage("Пароли не совпадают");
            return;
        }
    } else {ClearMessage()}
        
  
    message.style.display = "none";
    button.disabled = false;

    if (login == "" || email == "" || password == "" || confirm_password == ""){
        message.style.display = "none";
        message.innerHTML = "";
        button.disabled = true;
    }
}

login_input.addEventListener("input", CheckFormComponents);
email_input.addEventListener("input", CheckFormComponents);
password_input.addEventListener("input", CheckFormComponents);
confirm_password_input.addEventListener("input", CheckFormComponents);

form.addEventListener("submit", (event) : void => {
    event.preventDefault();
    message.style.display = "";
    message.innerHTML = "Регистрация успешна!";
    message.style.backgroundColor = `rgb(176, 255, 112)`;
    button.disabled = true;
    form.reset();
});

function FillString(str_id:string, target_label:string) : void {
  const LABEL = document.getElementById(str_id) as HTMLLabelElement;

  var text = LABEL.textContent || "";

  text = text.slice(0,-1);

  function AddNextChar() : void {
    if (text.length != target_label.length) {
      text += target_label[text.length];
      LABEL.textContent = text + "|";
      setTimeout(AddNextChar, 2000 / target_label.length);
    } else {
      LABEL.textContent = target_label;
      AddInputSymbol(str_id, 10);
    }
  }

  AddNextChar();

}

function AddInputSymbol(str_id:string,times:number) : void {
  const LABEL = document.getElementById(str_id) as HTMLLabelElement;
  var text = LABEL.textContent || "";

  function AddNextChar() {
    if (text[text.length-1] == "|") {
      text = text.slice(0,-1);
      LABEL.textContent = text;
    } else {
      text += "|";
      LABEL.textContent = text;
    }
    times--;
    if (times > 0) {
      setTimeout(AddNextChar, 200 );
    }
    
  }

  AddNextChar();
  
}

FillString("reg_label1","Введите логин:");
FillString("reg_label2","Введите email:");
FillString("reg_label3","Введите пароль:");
FillString("reg_label4","Подтвердите пароль:");
FillString("reg_label5","Выберите тип услуги:");