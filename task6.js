const inputData = []; // Array to store input values

function addColumn() {
    const newData = document.getElementById("new-data-input").value.trim();
    if (newData !== "") {
        inputData.push(newData);
        updateTables();
        clearInput();
    }
}

function deleteColumn(index) {
    inputData.splice(index,1);
    updateTables();
}

function updateTables() {
    const dataTable = document.getElementById("data-table");
    
    // Clear existing rows
    while (dataTable.rows.length > 1) {
        dataTable.deleteRow(1);
    }

    inputData.forEach((data,index) => {
        var row = "<tr><td>"+data+"</td><td><button class='delete-button' onclick='deleteColumn("+index+")'>Delete</button></td></tr>";
        
        console.log(row);
        document.getElementById('data-table').insertAdjacentHTML("beforeend", row);
    });
}

function clearInput() {
    document.getElementById("new-data-input").value = "";
}
