console.log("table");
let table = document.getElementById("my-table");
let thead = document.getElementById("my-table-head");
let tbody = document.getElementById("my-table-body");
let thead_row = document.querySelector(".table-heading-row");
let heading = document.querySelector(".heading");
let bold = document.getElementById("bolds");
let italics = document.getElementById("itallics");
let underlines = document.getElementById("underlines");
let copy = document.getElementById("copy");
let cut = document.getElementById("cut");
let paste = document.getElementById("paste");
let fonts = document.getElementById("fontSelect");
let font_size = document.getElementById("fontSize");
let left = document.getElementById("left");
let center = document.getElementById("centre");
let right = document.getElementById("right");
let textColor = document.getElementById("text-color");
let bgColor = document.getElementById("bg-color");

let str = "This is the clone of Excel Sheet.";
let speed = 200;
let curCell = "No Shell";
var i = 0;

function write() {
  if (i < str.length) {
    heading.innerHTML += str[i];
    if (i == str.length - 1) {
      i = -1;
      heading.innerHTML = "";
    }
    i++;
    setTimeout(write, speed);
  }
}
write();

let columns = 26;
let rows = 100;
for (let col = 0; col < columns; col++) {
  let th = document.createElement("th");
  th.innerHTML = String.fromCharCode(65 + col);
  thead_row.append(th);
}
// for (let col = 0; col < columns; col++) {
//   let th = document.createElement("th");
//   footer_row.append(th);
// }

function addingCell() {
  for (let row = 0; row < rows; row++) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerHTML = row + 1;
    tr.appendChild(th);

    for (let col = 0; col < columns; col++) {
      let td = document.createElement("td");
      td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
      td.setAttribute("contenteditable", "true");
      td.addEventListener("focus", (event) => onFocusFuc(event));
      td.addEventListener("input", (event) => oninputFuc(event));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

addingCell();
function onFocusFuc(event) {
  console.log(event.target.id);
  curCell = event.target;
  console.log(curCell);
  updateObj(curCell);
  document.querySelector(".noOfShell").innerHTML = event.target.id;
}

function oninputFuc(event) {
  updateObj(event.target);
}
//bold italic underline
bold.addEventListener("click", () => {
  console.log("bold is clicked");
  if (curCell.style.fontWeight == "bold") {
    curCell.style.fontWeight = "normal";
  } else {
    curCell.style.fontWeight = "bold";
  }
  updateObj(curCell);
});

italics.addEventListener("click", () => {
  console.log("italic is clicked");
  if (curCell.style.fontStyle == "italic") {
    curCell.style.fontStyle = "normal";
  } else {
    curCell.style.fontStyle = "italic";
  }
  updateObj(curCell);
});

underlines.addEventListener("click", () => {
  console.log("underline is clicked");
  if (curCell.style.textDecoration == "underline") {
    curCell.style.textDecoration = null;
  } else {
    curCell.style.textDecoration = "underline";
  }
  updateObj(curCell);
});

// cut copy and paste
let curVal = {};
copy.addEventListener("click", () => {
  curVal = {
    style: curCell.style.cssText,
    text: curCell.innerText,
  };
  updateObj(curCell);
});

cut.addEventListener("click", () => {
  curVal = {
    style: curCell.style.cssText,
    text: curCell.innerText,
  };
  updateObj(curCell);
  curCell.style.cssText = null;
  curCell.innerText = null;
});

paste.addEventListener("click", () => {
  curCell.style.cssText = curVal.style;
  curCell.innerText = curVal.text;
  updateObj(curCell);
});

// fonts selections

fonts.addEventListener("click", () => {
  curCell.style.fontFamily = fonts.value;
  updateObj(curCell);
  console.log(fonts.value);
});

// fonts size

font_size.addEventListener("click", () => {
  curCell.style.fontSize = font_size.value;
  updateObj(curCell);
});

//text align

left.addEventListener("click", () => {
  curCell.style.textAlign = "left";
  updateObj(curCell);
});
center.addEventListener("click", () => {
  curCell.style.textAlign = "center";
  updateObj(curCell);
});
right.addEventListener("click", () => {
  curCell.style.textAlign = "right";
  updateObj(curCell);
});

// color and background

textColor.addEventListener("input", () => {
  curCell.style.color = textColor.value;
  updateObj(curCell);
});

bgColor.addEventListener("input", () => {
  curCell.style.backgroundColor = bgColor.value;
  updateObj(curCell);
});

let matrix = new Array(rows);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(columns);
  for (let j = 0; j < matrix[i].length; j++) {
    matrix[i][j] = {};
  }
}
console.log(matrix);

function updateObj(cell) {
  let obj = {
    id: cell.id,
    style: cell.style.cssText,
    text: cell.innerHTML,
  };
  var id = cell.id.split("");
  console.log(id);
  console.log(id[0].charCodeAt(0) - 65);
  var j = id[0].charCodeAt(0) - 65;
  var num = "";
  for (let k = 1; k < id.length; k++) {
    num += id[k];
  }
  num = Number(num);
  console.log(num, typeof num);
  console.log(num);
  var i = num - 1;
  matrix[i][j] = obj;
  console.log(obj);
}

//////////////////////////////
//downloading files
function downloadJson() {
  // Define your JSON data

  // Convert JSON data to a string
  const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

///////////////////////////////////////
//uploading files
document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // {id,style,text}
      // Parse the JSON file content and process the data
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);
              myCell.innerText = cell.text;
              myCell.style.cssText = cell.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}

///////////////////////////////////////
////////////////////////////////////////////

// adding sheets
