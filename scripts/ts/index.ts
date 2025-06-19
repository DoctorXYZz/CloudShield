const LABELS_ARRAY : Array<string> = ["Защититесь даже будучи на высоте","Зарегистрируйтесь для бесплатной консультации", "Более 200 постоянных клиентов", "Получите скидку на первый месяц обслуживания"];
var current_label : string = "Защититесь даже будучи на высоте";
var current_label_index : number = 1;
var current_symbol_index : number = 0;

const reg_link1 = document.getElementById("reg_link1") as HTMLLinkElement;
const reg_link2 = document.getElementById("reg_link2") as HTMLLinkElement;
const reg_link3 = document.getElementById("reg_link3") as HTMLLinkElement;
const reg_link4 = document.getElementById("reg_link4") as HTMLLinkElement;

reg_link1.addEventListener("mouseenter", () : void => {
  localStorage.setItem("reg_option", "Консалтинг");
});

reg_link2.addEventListener("mouseenter", () : void => {
  localStorage.setItem("reg_option", "Аудит");
});

reg_link3.addEventListener("mouseenter", () : void => {
  localStorage.setItem("reg_option", "Защита");
});

reg_link4.addEventListener("mouseenter", () : void => {
  localStorage.setItem("reg_option", "Резервное копирование");
});


function ClearStringSlowly(delay: number) : void {

  var text = slogan_label.textContent || "";

  function RemoveNextChar() : void {
    if (text.length > 0) {
      text = text.slice(0, -1);
      slogan_label.textContent = text;
      setTimeout(RemoveNextChar, delay);
    } else {
      
      current_label = LABELS_ARRAY[current_label_index];
      slogan_label.textContent = text;
      current_symbol_index = 0;

      if (current_label_index == LABELS_ARRAY.length - 1){
        current_label_index = 0;
      } else {
        current_label_index++;
      }
      Idle(true);
      return;
    }
  }

  RemoveNextChar();
  
}

function FillStringSlowly(delay: number) : void {

  var text = slogan_label.textContent || "";

  function AddNextChar() : void {
    if (current_symbol_index < current_label.length) {
      text += current_label[current_symbol_index];
      current_symbol_index++;
      slogan_label.textContent = text;
      setTimeout(AddNextChar, delay);
    } else {
      Idle(false);
    }
  }

  AddNextChar();

}

function Idle(flag:boolean) : void {
  
  if (flag) {
    setTimeout(Wait,20);
  } else {
    setTimeout(Wait,3000);
  }
  
  function Wait() : void {
    if (flag) {
      FillStringSlowly(20);
      return;
    } else {
      ClearStringSlowly(20);
      return;
    }
  }

}


const slogan_label = document.getElementById("slogan") as HTMLLabelElement;
slogan_label.textContent = LABELS_ARRAY[0];
Idle(false);