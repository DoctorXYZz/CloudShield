"use strict";
const theme_button = document.getElementById("theme_toggle");
const body = document.body;
function Initialize() {
    ApplyTheme();
}
function ApplyTheme() {
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
theme_button.addEventListener("click", (event) => {
    const is_dark = body.classList.toggle("dark");
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
var scale_zoom_w = window.innerWidth / window.outerWidth;
var scale_zoom_h = window.innerHeight / window.outerHeight;
const SCREEN_WIDTH = window.screen.width;
const SCREEN_HEIGHT = window.screen.height;
var scale_x = 1;
var scale_y = 1;
window.addEventListener("resize", () => {
    scale_zoom_w = window.innerWidth / window.outerWidth;
    scale_zoom_h = window.innerHeight / window.outerHeight;
    scale_x = window.innerWidth / SCREEN_WIDTH; // * scale_zoom_w;
    scale_y = window.innerHeight / SCREEN_HEIGHT; // * scale_zoom_h;
    //console.log(scale);
    /*
    for (const object of clouds) {
      object.x = object.x * scale_x;
      object.y = object.y * scale_y;
  
      object.element.style.left = (object.x).toString() + "px";
      object.element.style.top = (object.y).toString() + "px";
    }
      */
    //console.log(scale_x);
    //console.log(scale_y);
});
const CLOUDS_AMOUNT = 48;
const container = document.getElementById("clouds");
const clouds = [];
var clouds_opacity = 0;
var content_opacity = 0;
for (let i = 0; i < CLOUDS_AMOUNT; i++) {
    const img = document.createElement("img");
    img.src = "styles/images/Cloud.png";
    img.style.backgroundColor = `rgba(0, 0, 0, 0)`;
    img.classList.add("cloud_object");
    container.appendChild(img);
    clouds.push({
        element: img,
        x: Math.random() * window.innerWidth / scale_zoom_w,
        y: Math.random() * window.innerHeight / scale_zoom_h,
        direction: Math.random() < 0.5 ? -1 : 1,
        spd: RandomNumberInRange(1, 3) / 10,
    });
    //console.log(RandomNumberInRange(0,1) == 0 ? -1 : 1)
}
function RandomNumberInRange(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}
const logo = document.getElementById("logo");
logo.style.transformOrigin = "50% -100%";
// Animate or set rotation
let angle = 0;
let angle_limit = 0;
let angle_dir = "left";
logo.addEventListener("click", () => {
    angle = 0;
    angle_limit += 60;
});
function MainLoop() {
    //if (angle != 90) angle++;
    //console.log(angle_limit);
    if (angle_dir == "left") {
        if (angle_limit > 0)
            angle += 1;
        angle_limit = Math.max(angle_limit - 0.1, 0);
        if (angle >= angle_limit) {
            angle_dir = "right";
        }
    }
    else {
        if (angle_limit > 0)
            angle -= 1;
        angle_limit = Math.max(angle_limit - 0.1, 0);
        if (angle <= -angle_limit) {
            angle_dir = "left";
        }
    }
    logo.style.transform = `rotate(${angle}deg)`;
    if (content_opacity < 1) {
        content_opacity += 0.005;
        document.documentElement.style.setProperty("--content_opacity", content_opacity.toString());
    }
    if (clouds_opacity < 0.25) {
        clouds_opacity += 0.001;
        document.documentElement.style.setProperty("--clouds_opacity", clouds_opacity.toString());
    }
    for (const object of clouds) {
        //console.log("!");
        object.x += object.spd * object.direction;
        if (object.x >= SCREEN_WIDTH) {
            object.x = 0;
            object.y = Math.random() * SCREEN_HEIGHT;
            object.spd = RandomNumberInRange(1, 3) / 10;
        }
        if (object.x <= -1) {
            object.x = SCREEN_WIDTH;
            object.y = Math.random() * SCREEN_HEIGHT;
            object.spd = RandomNumberInRange(1, 3) / 10;
        }
        object.element.style.left = (object.x * scale_x).toString() + "px";
        object.element.style.top = (object.y * scale_y).toString() + "px";
        //console.log(`$(object.x)px`);
    }
    requestAnimationFrame(MainLoop);
}
MainLoop();
