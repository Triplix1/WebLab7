function sizeToNum(size) {
  return parseFloat(size.substring(0, size.length - 2));
}

function saveAction(string) {
  let list = JSON.parse(localStorage.getItem("actionsList"));
  let date = new Date();
  let resultString = string + " " + date.toString();
  if (list) {
    list.push(resultString);
  } else {
    list = [];
    list.push(resultString);
  }
  localStorage.setItem("actionsList", JSON.stringify(list));
  text.innerText = string;
}

function getActions() {
  return localStorage.getItem("actionsList");
}

function saveToDb(name, object) {
    var s = new XMLSerializer();
    $.post("/Home/SetRow", { name: name, json: s.serializeToString(object) }, null, "json");
}


