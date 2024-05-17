## INDIVIDUAL WORK NR 3

# Project's summary 
The Transaction Manager is a web application designed to help users manage their financial transactions. 
Users can input transaction details such as ID, date, amount, category, and description using a form provided on the webpage. 
Upon submission, the transaction details are displayed in a table, where each row represents a transaction.

# How the project works
Adding Transactions:
    - Users can fill out a form with details about a new transaction, including ID, date, amount, category, and description.
    
    ```
    const form = document.getElementById("transactionForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("id").value;
        if (id == 0) {
            alert("Pay attention, please! Transaction's id has to be above 0 :)");
            return 0;
        }

        let idExists = false;
        transactions.forEach(transaction => {
            if (transaction.id === id) {
                idExists = true;
            }
        });

        if (idExists) {
            alert("Pay attention, please! Transaction with this ID already exists.");
            return;
        }
        const date = document.getElementById("date").value;
        const amount = parseFloat(document.getElementById("amount").value);
        if (isNaN(amount)) {
            alert("Pay attention, please! Enter number value for amount :)");
            return 0;
        }
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;
        if (typeof description !== 'string') {
            alert("Pay attention, please! Here you need to write some text :)");
            return 0;
        }

    ```

    - After filling out the form and clicking the "Submit" button, the new transaction is added to a table on the page.

    ```
        const row = table.insertRow(-1);
        const cellID = row.insertCell(0);
        const cellDate = row.insertCell(1);
        const cellCategory = row.insertCell(2);
        const cellDescription = row.insertCell(3);
        const cellDelete = row.insertCell(4);
        const cellDisplay = row.insertCell(5);

        if (newTransaction.amount < 0) {
            row.style.backgroundColor = "#e65054";
        } else if (newTransaction.amount > 0) {
            row.style.backgroundColor = "#68de7c";
        }

        cellID.innerHTML = newTransaction.id;
        cellDate.innerHTML = newTransaction.date;
        cellCategory.innerHTML = newTransaction.category;
        cellDescription.innerHTML = newTransaction.description.split(' ').slice(0, 4).join(' ');;
        cellDelete.innerHTML = '<button class="delete-button">Delete</button>';
        cellDisplay.innerHTML = '<button class="display-button">Display</button>';
    ```
Deleting Transactions:

    - Users have the option to delete a transaction from the table by clicking the "Delete" button in the corresponding row.

    ```
    if (event.target.classList.contains('delete-button')) {
                row.remove();
                transactions = transactions.filter(transaction => transaction.id !== transactionId);
                calculateTotal();
                updateSummary();
            }
    ```
    - Once a transaction is deleted, it is removed from the table, and the total amount is automatically recalculated.

Viewing Transaction Details:

    - Users can view detailed information about a transaction by clicking the "Display" button in the corresponding row.
    ```
    if (event.target.classList.contains('display-button')) {
                const transaction = transactions.find(transaction => transaction.id === transactionId);
                if (transaction) {
                    const summary = transaction.description;
                    document.getElementById('summary').textContent = "Transaction's description: " + summary;
                }
            }
    ```
    Updating the Total Amount:

    ```
   function calculateTotal() {
    const total = transactions.reduce((accumulator, currentTransaction) => {
        return accumulator + currentTransaction.amount;
    }, 0);

    document.getElementById('totalSum').textContent = "Total amount: " + total + ' m.u';

    }
    ```

Whenever a new transaction is added or an existing one is deleted, the total amount is automatically recalculated and displayed on the page.

# Control questions
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

# Sources 
https://www.w3schools.com/jsref/met_table_deleterow.asp
https://www.w3schools.com/jsref/prop_tablerow_rowindex.asp
https://developer.mozilla.org/ru/docs/Web/API/Event/target
https://www.w3schools.com/jsref/met_table_insertrow.asp
