//window.addEventListener("load",ClearStringSlowly("ad",200));

var flag : boolean = false;
function ClearStringSlowly(delay: number) : void {

  let text = ad_label.textContent || "";

  function RemoveNextChar() {
    console.log(text.length);
    if (text.length > 0) {
      text = text.slice(0, -1);
      ad_label.textContent = text;
      console.log(ad_label.textContent);
      setTimeout(RemoveNextChar, delay);
    } else {
      
      new_label = LABELS_ARRAY[current_label];
      ad_label.textContent = text;
      current_symbol = 0;

      if (current_label == LABELS_ARRAY.length - 1){
        current_label = 0;
      } else {
        current_label++;
      }

      
      
      //FillStringSlowly("ad",20);
      flag = true;
      Wait();
      return;
    }
  }

  RemoveNextChar();
  
}

const LABELS_ARRAY : Array<string> = ["Защититесь даже будучи на высоте","Консультации проводятся бесплатно", "Более 200 постоянных клинетов"];
var new_label : string = "Защититесь даже будучи на высоте";
var current_label : number = 1;
var current_symbol : number = 0;

function FillStringSlowly(delay: number) : void {

  let text = ad_label.textContent || "";

  function AddNextChar() {
    if (current_symbol < new_label.length) {
      //text = new_label.slice(0,current_symbol);
      text += new_label[current_symbol];
      current_symbol++;
      ad_label.textContent = text;
      setTimeout(AddNextChar, delay);
    } else {
      flag = false;
      Wait();
      //ClearStringSlowly("ad",20);
    }
  }

  AddNextChar();

}

function Wait() : void {
  
  if (flag) {
    setTimeout(Waitwaitwait,20);
  } else {
    setTimeout(Waitwaitwait,3000);
  }
  

  function Waitwaitwait() {
    if (flag) {
      FillStringSlowly(20);
      return;
    } else {
      ClearStringSlowly(20);
      return;
    }
  }
}


const ad_label = document.getElementById("ad") as HTMLLabelElement;
ad_label.textContent = LABELS_ARRAY[0];
Wait();