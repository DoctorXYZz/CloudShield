const theme_button = document.getElementById("theme_toggle") as HTMLButtonElement;
const body = document.body;

function ApplyTheme() : void {
    
    body.classList.add("instant_transform");

    const saved_theme = localStorage.getItem("theme");
    if (saved_theme == "light") {
        body.classList.add("light");
        theme_button.textContent = "☀️";
    }
    
    requestAnimationFrame(() => {
      body.classList.remove("instant_transform");
    });
    
}

theme_button.addEventListener("click", () : void => {
    const is_light = body.classList.toggle("light");
    if (is_light) {
      theme_button.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      theme_button.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
    ApplyTheme();
});


var scale_zoom_w = window.innerWidth / window.outerWidth;
var scale_zoom_h = window.innerHeight / window.outerHeight;
const SCREEN_WIDTH : number = window.screen.width;
const SCREEN_HEIGHT : number = window.screen.height;
var scale_x : number = 1;
var scale_y : number = 1;

window.addEventListener("resize", () => {
  scale_zoom_w = window.innerWidth / window.outerWidth;
  scale_zoom_h = window.innerHeight / window.outerHeight;
  scale_x = window.innerWidth / SCREEN_WIDTH;
  scale_y = window.innerHeight / SCREEN_HEIGHT;
});

const CLOUDS_AMOUNT : number = 48;
const CLOUDS_TARGET_OPACITY : number = 0.15;
const container = document.getElementById("clouds") as HTMLElement;
const clouds : CloudObject[] = [];
var clouds_opacity : number = 0;
var content_opacity: number = 0;

interface CloudObject {
  element: HTMLImageElement;
  x: number;
  y: number;
  direction: number;
  spd: number;
}

for (var i : number = 0; i < CLOUDS_AMOUNT; i++) {
  const img = document.createElement("img") as HTMLImageElement;
  img.src = "styles/images/general/Cloud.png";
  img.style.backgroundColor = `rgba(0, 0, 0, 0)`;
  img.classList.add("cloud_object");

  container.appendChild(img);

  clouds.push({
  element: img,
  x: Math.random() * window.innerWidth / scale_zoom_w,
  y: Math.random() * window.innerHeight / scale_zoom_h,
  direction: Math.random() < 0.5 ? -1 : 1,
  spd: RandomNumberInRange(1,3)/10,
  });
}

function RandomNumberInRange(min:number, max:number) : number {
  return ( Math.random() * (max-min+1) ) + min;
}

const logo = document.getElementById("logo") as HTMLImageElement;
logo.style.transformOrigin = "50% 0%";


var angle = 0;
var angle_limit = 0;
var angle_dir = "left";

logo.addEventListener("click", () => {
  angle = 0;
  angle_limit = 60;
});

function MainLoop() : void {
  if (angle_dir == "left"){
    if (angle_limit > 0) angle += 1;
    angle_limit = Math.max(angle_limit - 0.1, 0);
    if (angle >= angle_limit ) angle_dir = "right";
  } else {
    if (angle_limit > 0) angle -= 1;
    angle_limit = Math.max(angle_limit - 0.1, 0);
    if (angle <= -angle_limit) angle_dir = "left";
  }

  logo.style.transform = "rotate(" + angle.toString() + "deg)";

  if (content_opacity < 1){
    content_opacity = Math.min(content_opacity + 0.005, 1);
    document.documentElement.style.setProperty("--content_opacity", content_opacity.toString());
  }

  if (clouds_opacity < CLOUDS_TARGET_OPACITY){
    clouds_opacity = Math.min(clouds_opacity + 0.001, CLOUDS_TARGET_OPACITY);
    document.documentElement.style.setProperty("--clouds_opacity", clouds_opacity.toString());
  }

  for (const object of clouds) {
    object.x += object.spd * object.direction;
    if (object.x >= SCREEN_WIDTH) {
      object.x = 0;
      object.y = Math.random() * SCREEN_HEIGHT;
      object.spd = RandomNumberInRange(1,3)/10;
    }
    if (object.x <= -1) {
      object.x = SCREEN_WIDTH;
      object.y = Math.random() * SCREEN_HEIGHT;
      object.spd = RandomNumberInRange(1,3)/10;
    }

    object.element.style.left = (object.x * scale_x).toString() + "px";
    object.element.style.top = (object.y * scale_y).toString() + "px";
  }

  requestAnimationFrame(MainLoop);
}

ApplyTheme();
MainLoop();