//classes
class Budget{
    constructor(budget) {
        this.budget = Number( budget );
        this.budgetLeft = this.budget;
    }
    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    } 

}

class HTMLUI{
    //displays weekly budget
    displayBudget(amount){
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    displayMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        const messageDiv = document.getElementById('error').appendChild(messageWrapper);
        setTimeout(() => {
            messageWrapper.remove();
            expensesForm.reset();
        }, 3000);
    }

    addExpenseToList(name, amount){
        const expenseList = document.querySelector('#expenses ul');

        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center text-capitalize";
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">Ksh ${amount}</span>
        `;
        expenseList.appendChild(li);
    }

    trackBudget(amount){
        const budgetLeftKsh = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftKsh}`;

        if((budget.budget / 4) > budgetLeftKsh) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

        } else if ((budget.budget / 2) > budgetLeftKsh) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}


//variables
const budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left'),
      expensesForm = document.getElementById('form');

let budget, userBudget;

const html = new HTMLUI();


//eventListener
addEventListener();

function addEventListener(){
    document.addEventListener('DOMContentLoaded', function(){
        userBudget = prompt('What\'s your budget this week?');

        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        } else {
            // instanciate budget class
            budget = new Budget(userBudget);
            html.displayBudget(budget.budget);
        }
    });

    expensesForm.addEventListener('submit', function(e){
        e.preventDefault();
        const expenseName = document.getElementById('expense').value;
        const expenseAllocation = document.getElementById('allocated').value;

        if(expenseName === '' || expenseAllocation === '') {
            html.displayMessage('All fields are mandatory', 'alert-danger');
        } else {
            html.addExpenseToList(expenseName, expenseAllocation);
            html.displayMessage('Success! Added...', 'alert-success');
            html.trackBudget(expenseAllocation);
        }
    });
}