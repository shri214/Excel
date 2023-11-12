//Adding other sheets in excels
let footer_row = document.querySelector(".footer-row");
let AddNew = document.getElementById("AddNew");

let numSheets = 1;
let arrMatrix = [matrix];
let currSheetNum = 1;
document.querySelector(".add-sheet-btn").addEventListener("click", () => {
  console.log("adding sheets");
  if (numSheets == 1) {
    //putting all matrix in side the new myArr
    var myArr = [matrix];
    localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
    console.log(myArr);
  } else {
    //convert into obj and put again all stored matrix in local storage and new matrix inside the myArr
    localStorageArr = JSON.parse(localStorage.getItem("ArrMatrix"));
    var myArr = [...localStorageArr, matrix];
    console.log(myArr);
    localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
  }
  let th = document.createElement("th");
  th.setAttribute("class", "addPage");
  footer_row.appendChild(th);
  numSheets++;
  currSheetNum = numSheets;
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = {};
    }
  }
  th.innerText = `sheet${currSheetNum}`;
  tbody.innerHTML = ``;
  addingCell();
  pages();
});
function pages() {
  let page = Array.from(document.querySelectorAll(".addPage"));
  console.log(page);
  for (let i = 0; i < page.length; i++) {
    // console.log(page[i]);
    page[i].addEventListener("click", (e) => {
      tbody.innerHTML = ``;
      addingCell();
      //   console.log(page[i]);
      var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
      let tableData = myArr[i];
      //   console.log(tableData);
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (cell.id) {
            var myCell = document.getElementById(cell.id);
            myCell.innerText = cell.text;
            myCell.style.cssText = cell.style;
          }
        });
      });
    });
    page[i].addEventListener("mousedown", (e) => {
      if (e.button == 2) {
        console.log(e.button);
      }
    });
  }
}
