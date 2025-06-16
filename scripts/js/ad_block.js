"use strict";
//window.addEventListener("load",ClearStringSlowly("ad",200));
var flag = false;
function ClearStringSlowly(str_id, delay) {
    const LABEL = document.getElementById(str_id);
    let text = LABEL.textContent || "";
    function RemoveNextChar() {
        console.log(text.length);
        if (text.length > 1) {
            text = text.slice(0, -1);
            LABEL.textContent = text;
            setTimeout(RemoveNextChar, delay);
        }
        else {
            new_label = DIFFERENT_LABELS[current_label];
            text = "⠀"; // DIFFERENT_LABELS[current_label][0];
            LABEL.textContent = text;
            current_symbol = 0;
            if (current_label == DIFFERENT_LABELS.length - 1) {
                current_label = 0;
            }
            else {
                current_label++;
            }
            console.log(new_label);
            //FillStringSlowly("ad",20);
            flag = true;
            Wait();
            return;
        }
    }
    RemoveNextChar();
}
const DIFFERENT_LABELS = ["Я хочу аркнайтс эндфилд", "Здесь могла быть ваша реклама", "Продам аккаунт в ззз недорого", "В лимбус мне задонатьте", "Мне лень писать", "Продам аккаунт в ззз дорого", "Эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд эндфилд"];
var new_label = "Я хочу аркнайтс эндфилд";
var current_label = 0;
var current_symbol = 0;
function FillStringSlowly(str_id, delay) {
    const LABEL = document.getElementById(str_id);
    let text = LABEL.textContent || "";
    function AddNextChar() {
        if (current_symbol < new_label.length) {
            text += new_label[current_symbol];
            current_symbol++;
            LABEL.textContent = text;
            setTimeout(AddNextChar, delay);
        }
        else {
            flag = false;
            Wait();
            //ClearStringSlowly("ad",20);
        }
    }
    AddNextChar();
}
function Wait() {
    if (flag) {
        setTimeout(Waitwaitwait, 20);
    }
    else {
        setTimeout(Waitwaitwait, 1000);
    }
    function Waitwaitwait() {
        if (flag) {
            FillStringSlowly("ad", 20);
            return;
        }
        else {
            ClearStringSlowly("ad", 20);
            return;
        }
    }
}
ClearStringSlowly("ad", 20);
