document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("table-form");
  const tableContainer = document.getElementById("table-container");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById("row").value);
    const columns = parseInt(document.getElementById("column").value);

    const table = document.createElement("table");
    var loop = 1;
    for (let i = 1; i <= rows; i++) {
      const row = document.createElement("tr");
      for (let j = 1; j <= columns; j++) {
        const cell = document.createElement("td");
        cell.textContent = " ";
        if (loop % 2 === 0) {
          cell.textContent = loop;
        }
        loop += 1;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  });
});
