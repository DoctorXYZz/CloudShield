var theme_button = document.getElementById("theme_toggle");
var body = document.body;
function ApplyTheme() {
    body.classList.add("instant_transform");
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme == "dark") {
        body.classList.add("dark");
        theme_button.textContent = "☀️";
    }
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            body.classList.remove("instant_transform");
        });
    });
}
theme_button.addEventListener("click", function (event) {
    //const test = document.getElementById("ad") as HTMLLabelElement;
    //let text = test.textContent || "";
    //ClearStringSlowly("ad",20);
    console.log("!!!");
    var is_dark = body.classList.toggle("dark");
    if (is_dark) {
        theme_button.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    }
    else {
        theme_button.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
    ApplyTheme();
});
function ClearStringSlowly(str_id, delay) {
    var LABEL = document.getElementById(str_id);
    var text = LABEL.textContent || "";
    function RemoveNextChar() {
        console.log(text.length);
        if (text.length > 1) {
            text = text.slice(0, -1);
            LABEL.textContent = text;
            setTimeout(RemoveNextChar, delay);
        }
        else {
            new_label = DIFFERENT_LABELS[current_label];
            text = DIFFERENT_LABELS[current_label][0];
            LABEL.textContent = text;
            current_symbol = 1;
            if (current_label == DIFFERENT_LABELS.length - 1) {
                current_label = 0;
            }
            else {
                current_label++;
            }
            console.log(new_label);
            FillStringSlowly("ad", 20);
            return;
        }
    }
    RemoveNextChar();
}
var DIFFERENT_LABELS = ["Я хочу аркнайтс эндфилд", "Здесь могла быть ваша реклама", "Продам аккаунт в ззз недорого", "В лимбус мне задонатьте", "Мне лень писать", "Продам аккаунт в ззз дорого", "Эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд"];
var new_label = "Я хочу аркнайтс эндфилд";
var current_label = 0;
var current_symbol = 0;
function FillStringSlowly(str_id, delay) {
    var LABEL = document.getElementById(str_id);
    var text = LABEL.textContent || "";
    function AddNextChar() {
        if (current_symbol < new_label.length) {
            text += new_label[current_symbol];
            current_symbol++;
            LABEL.textContent = text;
            setTimeout(AddNextChar, delay);
        }
    }
    AddNextChar();
}
/*
function ClearString(str:String) : String {
  if (str.length > 0) {
    ClearString(str)
  }
}
*/
/*
const themeButton = document.getElementById("toggle-theme") as HTMLButtonElement;
  const body = document.body;

themeButton.addEventListener("click", () : void => {
    
  });
*/ 
