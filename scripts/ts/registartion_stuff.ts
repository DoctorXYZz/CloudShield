/*
const img = document.getElementById("rot_img") as HTMLImageElement;

// Move transform origin to desired point relative to image, e.g., top-left corner (0% 0%)
img.style.transformOrigin = "10% 10%";

// Animate or set rotation
let angle = 0;
setInterval(() => {
    angle += 1; // degrees
    img.style.transform = `rotate(${angle}deg)`;
}, 16); // roughly 60fps

function Loop() : void {
  console.log(angle);
  angle += 1; // degrees
  img.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(Loop);
}

Loop();
*/
const form = document.getElementById("regForm") as HTMLFormElement;
const login_input = document.getElementById("login") as HTMLInputElement;
const email_input = document.getElementById("email") as HTMLInputElement;
const password_input = document.getElementById("password") as HTMLInputElement;
const confirm_password_input = document.getElementById("confirmPassword") as HTMLInputElement;
const message = document.getElementById("message") as HTMLFormElement;
const button = document.getElementById("btn_submit") as HTMLButtonElement;


function CheckFormComponents() : void {
    const login = login_input.value;
    const password = password_input.value;
    const confirm_password = confirm_password_input.value;
    const email = email_input.value;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const numbers = /1234567890/;
    const special_symbols = /[!@#$%^&*"№;%:?*]/;
    const matches = password.match(/[!@#$%^&*"№;%:?*]/g);


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
    } else {ClearMessage();}
    
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
    console.log("!");

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
    form.reset();
});



window.addEventListener("load",InitializeAd);

function InitializeAd() {
  FillString("reg_label1",300);
  FillString("reg_label2",300);
  FillString("reg_label3",300);
  FillString("reg_label4",300);
}

const reg_label_text = new Map<string,string> ([
  ["reg_label1","Введите логин:"],
  ["reg_label2","Введите email:"],
  ["reg_label3","Введите пароль:"],
  ["reg_label4","Подтвердите пароль:"],
]);

function FillString(str_id:string, delay:number) : void {
  console.log("Function started");
  const LABEL = document.getElementById(str_id) as HTMLLabelElement;

  let text = LABEL.textContent || "";

  text = text.slice(0,-1);

  

  function AddNextChar() {
    if (text.length != reg_label_text.get(str_id)?.length) {
      text += reg_label_text.get(str_id)?.[text.length];
      LABEL.textContent = text + "|";
      //setTimeout(AddNextChar, RandomNumberInRange(100,300));
      setTimeout(AddNextChar, 2000 / reg_label_text.get(str_id)!.length);
    } else {
      LABEL.textContent = reg_label_text.get(str_id)!;
      AddInputSymbol(str_id, 10);
    }
  }

  AddNextChar();

}

function AddInputSymbol(str_id:string,times:number) {
  const LABEL = document.getElementById(str_id) as HTMLLabelElement;
  let text = LABEL.textContent || "";

  function DoThing() {
    if (text[text.length-1] == "|") {
      text = text.slice(0,-1);
      LABEL.textContent = text;
    } else {
      text += "|";
      LABEL.textContent = text;
    }
    console.log(times);
    times--;
    if (times > 0) {
      setTimeout(DoThing, 200 );
    }
    
  }

  DoThing();
  
}