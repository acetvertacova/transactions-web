/**
 * Array to store transactions.
 * @type {Transaction[]}
 */
let transactions = [];

/**
 * HTML table where transactions will be added.
 * @type {HTMLTableElement}
 */
const table = document.getElementById("table");

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

        const newTransaction = new Transaction(id, date, amount, category, description);
        transactions.push(newTransaction);

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

        table.addEventListener('click', function (event) {

            const row = event.target.parentNode.parentNode;
            const transactionId = row.cells[0].textContent;

            if (event.target.classList.contains('delete-button')) {
                row.remove();
                transactions = transactions.filter(transaction => transaction.id !== transactionId);
                calculateTotal();
                updateSummary();
            }

            if (event.target.classList.contains('display-button')) {
                const transaction = transactions.find(transaction => transaction.id === transactionId);
                if (transaction) {
                    const summary = transaction.description;
                    document.getElementById('summary').textContent = "Transaction's description: " + summary;
                }
            }
        });

        calculateTotal();
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
    const total = transactions.reduce((accumulator, currentTransaction) => {
        return accumulator + currentTransaction.amount;
    }, 0);

    document.getElementById('totalSum').textContent = "Total amount: " + total + ' m.u';

}

// Add event listener to the submit button of the form to add a new transaction.
addTransaction();
