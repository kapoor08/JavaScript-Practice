let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const balance = parseFloat(document.getElementById("balance"));
const bal = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");

document.getElementById("form").addEventListener("submit", function (event) {

    const inputText = document.getElementById("text").value;
    const amount = parseFloat(document.getElementById("number").value);

    event.preventDefault();
    if (inputText !== "" && amount !== "") {
      const transaction = {
          id: generateID(),
        text: inputText,
        amount: amount
    }

    transactions.push(transaction);
    var listItem = addTransaction(transaction);

    list.insertAdjacentHTML("beforeend", listItem);
    form.reset();
    updateValues(amount);
    deleteTransaction(transaction);
    updateLocalStorage();

} else {
    alert("Enter values");
}
});

function generateID(){
    return Math.floor(Math.random()*100000000); 
}

function addTransaction(transaction){
    const form = document.getElementById("form");
    
    let value = transaction.amount < 0 ? '-' : '+';
    
    var listItem = `<li class="${transaction.amount < 0 ? "minus" : "plus"}" data-id="${transaction.id}">${transaction.text}<span>${value}${Math.abs(transaction.amount)}</span><button class='delete-btn' onclick='deleteTransaction(${transaction.id})'>X</button></li>`;

    return listItem;
}

function updateValues() {
    let total = 0;

    transactions.forEach(transaction => {
        total += transaction.amount;
    });

    bal.innerText = "₹" + total.toFixed(2);

    let incomeAmt = 0;
    let expenseAmt = 0;

    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            incomeAmt += transaction.amount;
        } else {
            expenseAmt += Math.abs(transaction.amount);
        }
    });

    income.innerText = "₹" + incomeAmt.toFixed(2);
    expense.innerText = "₹" + expenseAmt.toFixed(2);
}




function deleteTransaction(transactionId) {
    const indexToDelete = transactions.findIndex(transaction => transaction.id === transactionId);

    if (indexToDelete !== -1) {
        transactions.splice(indexToDelete, 1);

        const listItem = document.querySelector(`[data-id="${transactionId}"]`);
        listItem.remove();
        updateLocalStorage();
        updateValues(0);
    }
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  document.addEventListener("DOMContentLoaded", function () {
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(transaction => {
        var listItem = addTransaction(transaction);
        list.insertAdjacentHTML("beforeend", listItem);
    });

    updateValues();

    updateLocalStorage();
});