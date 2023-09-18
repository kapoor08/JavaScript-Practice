// const table = document.getElementById("example2");
// const tbody = table.querySelector("tbody");
// const rows = tbody.querySelectorAll("tr");
// const data = [];

// rows.forEach(row =>{
//     const cells = row.querySelectorAll("td");
//     const rowData = {};
//     cells.forEach((cell,index)=>{
//         const headerText = table.querySelectorAll("thead tr th:nth-child(" + (index + 1) + ")");
//         rowData[headerText] = cell.textContent.trim();
//     });
//     data.push(rowData);
// })
// console.log(data);

const table = document.getElementById("example2");

const tbody = table.querySelector("tbody");
const rows = tbody.querySelectorAll("tr");

const data = [];

rows.forEach(row => {
  const cells = row.querySelectorAll("td");
  const rowData = {};

  cells.forEach((cell, index) => {
    const headerText = table.querySelector("thead th:nth-child(" + (index + 1) + ")").textContent.trim();

    rowData[headerText] = cell.textContent.trim();
  });

  data.push(rowData);
});

console.log(data);