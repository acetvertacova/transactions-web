# INDIVIDUAL WORK NR 3

## Project's summary 
The Transaction Manager is a web application designed to help users manage their financial transactions. 
Users can input transaction details such as ID, date, amount, category, and description using a form provided on the webpage. 
Upon submission, the transaction details are displayed in a table, where each row represents a transaction.

## How the project works
Adding Transactions:
    - Users can fill out a form with details about a new transaction, including ID, date, amount, category, and description.
    
    let form = document.getElementById("transactionForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let id = document.getElementById("id").value;
        if (id == 0) {
            alert("Pay attention, please! Transaction's id has to be above 0 :)");
            return 0;
        }
        let date = document.getElementById("date").value;
        let amount = parseFloat(document.getElementById("amount").value);
        if (isNaN(amount)) {
            alert("Pay attention, please! Enter number value for amount :)");
            return 0;
        }
        let category = document.getElementById("category").value;
        let description = document.getElementById("description").value;
        if (typeof description !== 'string') {
            alert("Pay attention, please! Here you need to write some text :)");
            return 0;
        } 
    
    - After filling out the form and clicking the "Submit" button, the new transaction is added to a table on the page.

    let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        if (newTransaction.amount < 0) {
            row.style.backgroundColor = "#e65054";
        } else if (newTransaction.amount > 0) {
            row.style.backgroundColor = "#68de7c";
        }

        cell1.innerHTML = newTransaction.id;
        cell2.innerHTML = newTransaction.date;
        cell3.innerHTML = newTransaction.category;
        cell4.innerHTML = newTransaction.description.split(' ').slice(0, 4).join(' ');;
        cell5.innerHTML = '<button>Delete</button>';
        cell6.innerHTML = '<button>Display</button>'
    
Deleting Transactions:

    - Users have the option to delete a transaction from the table by clicking the "Delete" button in the corresponding row.

    cell5.querySelector('button').addEventListener('click', function (event) {
            let row = event.target.parentNode.parentNode;
            let index = row.rowIndex;
            table.deleteRow(index);
            transactions.splice(index - 1, 1)
            calculateTotal();
            updateSummary();
        });
        calculateTotal();
    
    - Once a transaction is deleted, it is removed from the table, and the total amount is automatically recalculated.

Viewing Transaction Details:

    - Users can view detailed information about a transaction by clicking the "Display" button in the corresponding row.
    
    cell6.querySelector('button').addEventListener('click', function (event) {
            let row = event.target.parentNode.parentNode;
            let index = row.rowIndex;
            let summary = transactions[index - 1].description;
            document.getElementById('summary').textContent = "Transaction's description: " + summary;
        });
    
    Updating the Total Amount:

    
    function calculateTotal() {
    let total = transactions.reduce((accumulator, currentTransaction) => {
        return accumulator + currentTransaction.amount;
    }, 0);

    document.getElementById('totalSum').textContent = "Total amount: " + total + ' m.u';
    }
    

Whenever a new transaction is added or an existing one is deleted, the total amount is automatically recalculated and displayed on the page.

## Control questions
- How to access an element on a web using JS
    getElementById(id)
    querySelectorAll
    querySelector
- What is event delegation and how is it used to effectively manage events on DOM elements?
    One of the key concepts of events in JS is event delegation. Let's say we have many elements to which we want to assign the same event.
    Instead of assigning this event to each individual element, we can assign it to their common ancestor.
- How can you change the content of a DOM element using JS after it has been fetched?
    value
    textContent
    innerHTML
- How can you add a new element to the DOM tree using JavaScript?
    createElement
    appendChild
    insertRow

## Sources 
https://www.w3schools.com/jsref/met_table_deleterow.asp
https://www.w3schools.com/jsref/prop_tablerow_rowindex.asp
https://developer.mozilla.org/ru/docs/Web/API/Event/target
https://www.w3schools.com/jsref/met_table_insertrow.asp
