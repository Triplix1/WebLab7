let sectionSecond = document.querySelector("#section2");

function openWork() {
  saveAction("open");

  document.querySelector(".work").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    animWidth = sizeToNum(window.getComputedStyle(anim).width);
    animHeight = sizeToNum(window.getComputedStyle(anim).height);
    borderSize = sizeToNum(window.getComputedStyle(anim).borderWidth);
    canvas.width = animWidth;
    canvas.height = animHeight;
    ctx.fillStyle = "green";
    ctx.fillRect(canvas.width - squareWidth, 0, squareWidth, squareHeight);

}

document.querySelector(".overlay").addEventListener("click", () => {
  saveAction("close");

  document.querySelector(".work").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");

  let list = JSON.parse(localStorage.getItem("actionsList"));
  let rows = "";
  for (var i = 0; i < list.length; i++) {
    rows += `<tr><td>${list[i]}</td></tr>`;
  } 
  let table = `<table>${rows}</table>`;
  sectionSecond.innerHTML = table;
});

//localStorage.setItem("actionsList", JSON.stringify([]));

let anim = document.querySelector(".anim");
let animWidth;
let animHeight;
let borderSize;

let start = document.createElement("button");
start.classList.add("button");
start.classList.add("start");
start.innerText = "Start";

let text = document.createElement("p");

let stop = document.createElement("button");
stop.classList.add("button");
stop.classList.add("stop");
stop.innerText = "Stop";

let reload = document.createElement("button");
reload.classList.add("button");
reload.classList.add("reload");
reload.innerText = "Reload";

let squareWidth = 10;
let squareHeight = 10;

let controls = document.querySelector(".controls");
controls.insertAdjacentElement("afterbegin", text);
controls.insertAdjacentElement("beforeend", start);

let canvas = document.querySelector(".canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "green";

saveToDb("start", start);
saveToDb("stop", stop);
saveToDb("reload", reload);
saveToDb("anim", anim);
saveToDb("work", document.querySelector(".work"));
saveToDb("overlay", document.querySelector(".overlay"));
saveToDb("square", square);
saveToDb("controls", controls);
saveToDb("text", text);

let timer;

start.addEventListener("click", () => {
  saveAction("start");

  controls.removeChild(start);
  controls.insertAdjacentElement("beforeend", stop);

  animWidth = sizeToNum(window.getComputedStyle(anim).width);
  animHeight = sizeToNum(window.getComputedStyle(anim).height);
  borderSize = sizeToNum(window.getComputedStyle(anim).borderWidth);

  let randomwidth = (squareWidth * Math.random()) / 3;
  let randomHeight = (squareHeight * Math.random()) / 3;
  let right = squareWidth;
  let top = 0;
  let flag = true;
  let width = squareWidth;
  timer = setInterval(() => {
    if (right + randomwidth > animWidth) {
      right = animWidth;
      let tmp = width - randomwidth;
      width = tmp > 0 ? tmp : 0;
    } else {
      right += randomwidth;
    }

    if (flag) {
      if (top + randomHeight < animHeight - squareHeight) {
        top += randomHeight;
      } else {
        top = animHeight - squareHeight;
          flag = false;
          saveAction("touched border");
      }
    } else {
      if (top - randomHeight > 0) {
        top -= randomHeight;
      } else {
        top = 0;
          flag = true;
          saveAction("touched border");
      }
    }
    createSquare(animWidth - right, top, width);
    if (width <= 0) {
      clearInterval(timer);
      controls.removeChild(stop);
      controls.insertAdjacentElement("beforeend", reload);
      saveAction("end animation");
    }
  }, 15);
});

stop.addEventListener("click", () => {
  saveAction("stop");

  clearInterval(timer);
  controls.removeChild(stop);
  controls.insertAdjacentElement("beforeend", reload);
});

reload.addEventListener("click", () => {
  console.log(canvas.width);

  saveAction("reload");

    createSquare(canvas.width - squareWidth, 0, squareWidth);

  controls.removeChild(reload);
  controls.insertAdjacentElement("beforeend", start);
});


function createSquare(x, y, w) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(x, y, w, squareHeight);
}
