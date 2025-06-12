const theme_button = document.getElementById("theme_toggle") as HTMLButtonElement;
const body = document.body;

function ApplyTheme() : void {
    
    body.classList.add("instant_transform");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme == "dark") {
        body.classList.add("dark");
        theme_button.textContent = "☀️";
    }
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        body.classList.remove("instant_transform");
      });
    });
    
}

theme_button.addEventListener("click", (event) : void => {
    //const test = document.getElementById("ad") as HTMLLabelElement;
    //let text = test.textContent || "";
    //ClearStringSlowly("ad",20);
    
    
    console.log("!!!");
    const isDark = body.classList.toggle("dark");
    theme_button.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
    ApplyTheme();
    
});


function ClearStringSlowly(str_id:string, delay: number) : void {
  const LABEL = document.getElementById(str_id) as HTMLLabelElement;

  let text = LABEL.textContent || "";

  function RemoveNextChar() {
    console.log(text.length);
    if (text.length > 1) {
      text = text.slice(0, -1);
      LABEL.textContent = text;
      setTimeout(RemoveNextChar, delay);
    } else {
      
      new_label = DIFFERENT_LABELS[current_label];
      text = DIFFERENT_LABELS[current_label][0];
      LABEL.textContent = text;
      current_symbol = 1;
      if (current_label == DIFFERENT_LABELS.length - 1){
        current_label = 0;
      } else {
        current_label++;
      }

      console.log(new_label);
      
      FillStringSlowly("ad",20);
      return;
    }
  }

  RemoveNextChar();
  
}

const DIFFERENT_LABELS : Array<string> = ["Я хочу аркнайтс эндфилд", "Здесь могла быть ваша реклама", "Продам аккаунт в ззз недорого","В лимбус мне задонатьте", "Мне лень писать", "Продам аккаунт в ззз дорого", "Эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд"];
var new_label : string = "Я хочу аркнайтс эндфилд";
var current_label : number = 0;
var current_symbol : number = 0;

function FillStringSlowly(str_id:string, delay: number) : void {
  const LABEL = document.getElementById(str_id) as HTMLLabelElement;

  let text = LABEL.textContent || "";

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