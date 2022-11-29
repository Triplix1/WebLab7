let sectionSecond = document.querySelector("#section2");

function openWork() {

    saveAction("open");

  document.querySelector(".work").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
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

let anim = document.querySelector(".anim");

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

let square = document.querySelector(".square");
let squareWidth = 10;
let squareHeight = 10;
square.style.width = squareWidth + "px";
square.style.height = squareHeight + "px";

let controls = document.querySelector(".controls");
controls.insertAdjacentElement("afterbegin", text);
controls.insertAdjacentElement("beforeend", start);

let timer;

saveToDb("start", start);
saveToDb("stop", stop);
saveToDb("reload", reload);
saveToDb("anim", anim);
saveToDb("work", document.querySelector(".work"));
saveToDb("overlay", document.querySelector(".overlay"));
saveToDb("square", square);
saveToDb("controls", controls);
saveToDb("text", text);

start.addEventListener("click", () => {
    saveAction("start");

    controls.removeChild(start);
    controls.insertAdjacentElement("beforeend", stop);

    let animWidth = sizeToNum(window.getComputedStyle(anim).width);
    let animHeight = sizeToNum(window.getComputedStyle(anim).height);
    let borderSize = sizeToNum(window.getComputedStyle(anim).borderWidth);

  let randomwidth = (squareWidth * Math.random()) / 3;
  let randomHeight = (squareHeight * Math.random()) / 3;
  let right = squareWidth + borderSize * 2;
  let top = 0;
  let flag = true;
  timer = setInterval(() => {
    if (right + randomwidth > animWidth) {
        right = animWidth;
        let tmp = sizeToNum(window.getComputedStyle(square).width) - randomwidth
        square.style.width = (tmp > 0 ? tmp : 0)+ "px";
    } else {
      right += randomwidth;
    }

    if (flag) {
      if (top + randomHeight < animHeight - squareHeight - borderSize * 2) {
        top += randomHeight;
      } else {
          top = animHeight - squareHeight - borderSize * 2;
          saveAction("touched border");
        flag = false;
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
    square.style.left = animWidth - right + "px";
    square.style.top = top + "px";
    if (sizeToNum(window.getComputedStyle(square).width) <= 0) {
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

    saveAction("reload");

    let animWidth = sizeToNum(window.getComputedStyle(anim).width);
    let borderSize = sizeToNum(window.getComputedStyle(anim).borderWidth);

    square.style.width = squareWidth + "px";
    square.style.left = animWidth - squareWidth - borderSize * 2 + "px";
    square.style.top = 0;

    controls.removeChild(reload);
    controls.insertAdjacentElement("beforeend", start);
});