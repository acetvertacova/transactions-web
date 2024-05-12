/**
 * Array to store transactions.
 * @type {Transaction[]}
 */
const transactions = [];

/**
 * HTML table where transactions will be added.
 * @type {HTMLTableElement}
 */
let table = document.getElementById("table");

/**
 * Class representing a transaction.
 */
class Transaction {
    /**
     * Creates an instance of Transaction.
     * @param {string} id - Transaction ID.
     * @param {Date} date - Transaction date.
     * @param {number} amount - Transaction amount.
     * @param {string} category - Transaction category.
     * @param {string} description - Transaction description.
     */
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
}

/**
 * Function to add a new transaction.
 */
function addTransaction() {
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

        let newTransaction = new Transaction(id, date, amount, category, description);
        transactions.push(newTransaction);

/* Create a new row in the table to display transaction data
Insert cells into the row to display transaction properties (ID, date, category, description)
Set the background color of the row based on the transaction amount (negative: red, positive: green)
Populate the cells with transaction information
Add a delete button to the fifth cell of the row
Add a display button to the sixth cell of the row */

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

        cell5.querySelector('button').addEventListener('click', function (event) {
            let row = event.target.parentNode.parentNode;
            let index = row.rowIndex;
            table.deleteRow(index);
            transactions.splice(index - 1, 1)
            calculateTotal();
            updateSummary();
        });
        calculateTotal();

        cell6.querySelector('button').addEventListener('click', function (event) {
            let row = event.target.parentNode.parentNode;
            let index = row.rowIndex;
            let summary = transactions[index - 1].description;
            document.getElementById('summary').textContent = "Transaction's description: " + summary;
        });
    });
}

/**
 * Updates the information in the summary block with the transaction's description.
 */
function updateSummary() {
    document.getElementById('summary').textContent = "Transaction's description: ";
}

/**
 * Calculates the total amount of transactions and displays it on the page.
 */
function calculateTotal() {
    let total = transactions.reduce((accumulator, currentTransaction) => {
        return accumulator + currentTransaction.amount;
    }, 0);

    document.getElementById('totalSum').textContent = "Total amount: " + total + ' m.u';

}

// Add event listener to the submit button of the form to add a new transaction.
addTransaction();
