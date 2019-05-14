// Expense Controller
const ExpenseController = (function () {

  // Expense Constructor
  const Expense = function (id, desc, amount) {
    this.id = id;
    this.desc = desc;
    this.amount = amount;
  }

  // Data Structure
  const data = {
    expenses: [],
    currentExpense: null,
    totalExpenses: 0
  }

  // Public methods
  return {
    // Get expenses 
    getExpenses: function () {
      return data.expenses;
    },

    getAllExpenseAmounts: function () {

      let allExpenses = [];

      for (let i = 0, l = data.expenses.length; i < l; i++) {
        allExpenses.push(data.expenses[i].amount);
      }

      return allExpenses;
    },

    // Add new expense
    addExpense: function (desc, amount) {
      let ID;
      // Create expense IDs
      if (data.expenses.length > 0) {
        ID = data.expenses[data.expenses.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Parse amount to number 
      amount = parseInt(amount);

      // Create new expense 
      newExpense = new Expense(ID, desc, amount);

      // Add to Expenses Array
      data.expenses.push(newExpense);

      return newExpense;
    },

    // Get expense id
    getExpenseById: function (id) {
      let found = null;

      // Loop through the expense items
      data.expenses.forEach(function (expense) {
        if (expense.id === id) {
          found = expense;
        }
      });
      return found;
    },

    // Update expense
    updateExpense: function (desc, amount) {
      amount = parseInt(amount);

      let found = null;

      data.expenses.forEach(function (expense) {
        if (expense.id === data.currentExpense.id) {
          expense.desc = desc;
          expense.amount = amount;
          found = expense;
        }
      });

      return found;
    },

    // Delete expense
    deleteExpense: function (id) {
      // Get id
      const ids = data.expenses.map(function (expense) {
        return expense.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove expense
      data.expenses.splice(index, 1)
    },

    // Clear all expense items
    clearAllExpenseItems: function () {
      data.expenses = [];
    },

    // Set current expense
    setCurrentExpense: function (expense) {
      data.currentExpense = expense;
    },

    // Get current expense
    getCurrentExpense: function () {
      return data.currentExpense;
    },

    // Get total expense
    getTotalExpense: function () {
      let total = 0;

      if (data.expenses.length > 0) {
        total = data.expenses.reduce(function (acc, curr) {
          acc += curr.amount;
          return acc;
        }, 0);
      }

      // Set total expenses 
      data.totalExpenses = total;

      return data.totalExpenses;
    },

    // To test my code
    logData: function () {
      return data;
    }
  }

})();


// UI Controller
const UIController = (function () {

  // DOM Selectors in one entire variable
  const UISelectors = {
    addBudgetButton: '#budget-btn',
    budgetInput: '#budget-input',
    editBudgetButton: '#edit-budget-btn',
    removeBudgetButton: '#remove-budget-btn',
    backBudgetButton: '#back-budget-btn',
    updateBudgetButton: '#update-budget-btn',
    budgetError: '.budget-error',
    budgetAmount: '#budget-amount',
    balanceAmount: '#balance-amount',
    expenseTableBody: '#expense-table-body',
    expenseTableRow: '#expense-table-body tr',
    clearExpenseButton: '#clear-expense-btn',
    addExpenseBtn: '#add-expense-btn',
    expenseDescInput: '#expense-desc',
    expenseAmountInput: '#expense-input',
    expenseError: '.expense-error',
    expenseAmount: '#expense-amount',
    updateButton: '#update-expense-btn',
    deleteButton: '#delete-expense-btn',
    backButton: '#back-btn',
    balanceEmoji: '.balance-emoji'
   }

  // Public methods
  return {
    populateExpenseList: function (expenses) {
      let html = '';
      expenses.forEach(expense => {
        html +=
          `
        <tr class="collection-expense" id="expense-${expense.id}"> 
        <th>${expense.desc}</th>
        <td>$ ${expense.amount}</td>
        <td>
          <a href="#" class="edit-icon">
            <i class="fas fa-edit"></i>
          </a>
        </td>
        </tr>
        `
      });

      // Insert expense lists to DOM
      document.querySelector(UISelectors.expenseTableBody).innerHTML = html;
    },

    // Get form input values
    getExpenseInput: function () {
      return {
        desc: document.querySelector(UISelectors.expenseDescInput).value,
        amount: document.querySelector(UISelectors.expenseAmountInput).value
      }
    },

    // Add expenses to the ui from the inputs
    addExpenseToList: function (expense) {
      // Create TR element
      const tr = document.createElement('tr');
      // Add class
      tr.className = 'collection-expense';
      // Add id
      tr.id = `expense-${expense.id}`;

      // Add HTML
      tr.innerHTML =
        `
      <th>${expense.desc}</th>
      <td>$ ${expense.amount}</td>
      <td>
        <a href="#" class="edit-icon">
          <i class="fas fa-edit"></i>
        </a>
      </td>
      `;

      // Insert to DOM
      document.querySelector(UISelectors.expenseTableBody).insertAdjacentElement('beforeend', tr);

    },

    // Show total expenses in the list
    showTotalExpense: function (totalExpenses) {
      document.querySelector(UISelectors.expenseAmount).textContent = totalExpenses;
    },

    // Clear expense inputs
    clearExpenseInputs: function () {
      document.querySelector(UISelectors.expenseDescInput).value = '';
      document.querySelector(UISelectors.expenseAmountInput).value = '';
    },

    clearBudgetInput: function () {
      document.querySelector(UISelectors.budgetInput).value = '';
    },

    // Add expense to form to edit
    addExpenseToForm: function () {
      document.querySelector(UISelectors.expenseDescInput).value = ExpenseController.getCurrentExpense().desc;
      document.querySelector(UISelectors.expenseAmountInput).value = ExpenseController.getCurrentExpense().amount;
      UIController.showEditState();
    },

    // Update expense desc and amount in the table
    updateTableExpense: function (expense) {
      let tableExpenses = document.querySelectorAll(UISelectors.expenseTableRow);

      // Convert node list to array
      tableExpenses = Array.from(tableExpenses);


      tableExpenses.forEach(function (tableExpense) {
        const expenseID = tableExpense.getAttribute('id');

        if (expenseID === `expense-${expense.id}`) {
          document.querySelector(`#${expenseID}`).innerHTML =
            `
          <th>${expense.desc}</th>
          <td>$ ${expense.amount}</td>
          <td>
            <a href="#" class="edit-icon">
              <i class="fas fa-edit"></i>
            </a>
          </td>
          `;

        };
      });
    },

    // Delete expense from UI
    deleteListExpense: function (id) {
      const expenseID = `#expense-${id}`;
      const expense = document.querySelector(expenseID);
      expense.remove();
    },

    // Clear edit state
    clearEditState: function () {
      UIController.clearExpenseInputs();
      document.querySelector(UISelectors.updateButton).style.display = 'none';
      document.querySelector(UISelectors.deleteButton).style.display = 'none';
      document.querySelector(UISelectors.backButton).style.display = 'none';
      document.querySelector(UISelectors.clearExpenseButton).style.display = 'inline';
      document.querySelector(UISelectors.addExpenseBtn).style.display = 'inline';
    },

    // Show edit state
    showEditState: function () {
      document.querySelector(UISelectors.updateButton).style.display = 'inline';
      document.querySelector(UISelectors.deleteButton).style.display = 'inline';
      document.querySelector(UISelectors.backButton).style.display = 'inline';
      document.querySelector(UISelectors.clearExpenseButton).style.display = 'none';
      document.querySelector(UISelectors.addExpenseBtn).style.display = 'none';
    },

    // Remove all expenses from UI
    removeAllExpenseUI: function () {
      let tableExpenses = document.querySelectorAll(UISelectors.expenseTableRow);

      tableExpenses = Array.from(tableExpenses);

      tableExpenses.forEach(function (expense) {
        expense.remove();
      })
    },

    // Clear budget inputs
    removeBudgetUI: function () {
      // Make budget amount equal to ZERO
      document.querySelector(UISelectors.budgetAmount).innerHTML = 0;
      document.querySelector(UISelectors.budgetInput).value = '';
    },

    // Budget error show
    budgetErrorUI: function () {
      document.querySelector(UISelectors.budgetError).style.visibility = 'visible';
      setTimeout(() => {
        document.querySelector(UISelectors.budgetError).style.visibility = 'hidden';
      }, 4000);
    },

    // edit budget error 
    editBudgetError: function () {
      document.querySelector(UISelectors.budgetError).style.visibility = 'visible';
      document.querySelector(UISelectors.budgetError).innerHTML = 'Please use the edit button to modify your budget';
      setTimeout(() => {
        document.querySelector(UISelectors.budgetError).style.visibility = 'hidden';
      }, 4000);
    },

    // Budget back button 
    backBudgetUI: function () {
      document.querySelector(UISelectors.removeBudgetButton).style.display = 'none';
      document.querySelector(UISelectors.backBudgetButton).style.display = 'none';
      document.querySelector(UISelectors.updateBudgetButton).style.display = 'none';
      document.querySelector(UISelectors.editBudgetButton).style.display = 'inline';
      document.querySelector(UISelectors.addBudgetButton).style.display = 'inline';
    },

    showEditErrorUI: function () {
      document.querySelector(UISelectors.budgetError).style.visibility = 'visible';
      document.querySelector(UISelectors.budgetError).innerHTML = 'You must enter a budget first';
      setTimeout(() => {
        document.querySelector(UISelectors.budgetError).style.visibility = 'hidden';
      }, 4000);
    },

    // Edit budget state
    showEditBudgetUI: function () {
      const budget = document.querySelector(UISelectors.budgetAmount);
      // Show edt buttons
      document.querySelector(UISelectors.removeBudgetButton).style.display = 'inline';
      document.querySelector(UISelectors.backBudgetButton).style.display = 'inline';
      document.querySelector(UISelectors.updateBudgetButton).style.display = 'inline';
      document.querySelector(UISelectors.editBudgetButton).style.display = 'none';
      document.querySelector(UISelectors.addBudgetButton).style.display = 'none';
      document.querySelector(UISelectors.budgetInput).value = budget.textContent;
    },

    // Update budget ui fields
    updateBudgetUI: function () {
      const newBudget = document.querySelector(UISelectors.budgetInput).value;
      document.querySelector(UISelectors.budgetInput).value = "";
      const totalBudget = parseInt(newBudget)
      document.querySelector(UISelectors.budgetAmount).innerHTML = totalBudget;
      return totalBudget;
    },

    // Give public access to UI selectors
    getSelectors: function () {
      return UISelectors;
    }
  }

})();


// Income Controller
const BudgetController = (function () {

  // Get UI selectors from the public function
  const UISelectors = UIController.getSelectors();

  return {

    // Add budget 
    addIncome: function () {
      const value = document.querySelector(UISelectors.budgetInput).value;

      if (value === "" || value <= 0) {
        UIController.budgetErrorUI();
      } else if (document.querySelector(UISelectors.budgetAmount).innerHTML > 0) {
        UIController.editBudgetError();
        return;
      } else {
        const totalBudget = parseInt(value)
        document.querySelector(UISelectors.budgetAmount).innerHTML = totalBudget;
        UIController.clearBudgetInput();
        return totalBudget;
      }

    },

    removeBudget: function () {
      UIController.removeBudgetUI();
      UIController.backBudgetUI();

    },

    backBudget: function () {
      // Hide edit buttons
      UIController.backBudgetUI();
    },

    editBudget: function () {
      const budget = document.querySelector(UISelectors.budgetAmount);
      if (budget.textContent == 0) {
        UIController.showEditErrorUI();
      } else {
        UIController.showEditBudgetUI();
      }
    },

    updateBudget: function () {
      // Get new budget
      UIController.updateBudgetUI();
      UIController.clearBudgetInput();
      UIController.backBudgetUI();
    }
  }
})();

// Balance
const BalanceController = (function () {

  // Get UI selectors from the public function
  const UISelectors = UIController.getSelectors();

  return {
    showBalance: function () {
      const totalExpenses = ExpenseController.getTotalExpense();
      const totalUI = document.querySelector(UISelectors.budgetAmount);
      const totalBudget = parseInt(totalUI.textContent) - totalExpenses;
      document.querySelector(UISelectors.balanceAmount).textContent = totalBudget;
      if (totalBudget > 0) {
        document.querySelector(UISelectors.balanceEmoji).innerHTML = "🤩";
      } else if (totalBudget < 0) {
        document.querySelector(UISelectors.balanceEmoji).innerHTML = "💩";
      } else {
        document.querySelector(UISelectors.balanceEmoji).innerHTML = "❓";
      }
      return totalBudget;
    }
  }

})();

// App Controller
const App = (function (ExpenseController, BudgetController, BalanceController, UIController) {

  // Load Event Listeners 
  const loadEventListeners = function () {

    // Get UI selectors from the public function
    const UISelectors = UIController.getSelectors();


    // Disable the enter key to prevent submitting expense 
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Add budget button event listener
    document.querySelector(UISelectors.addBudgetButton).addEventListener('click', addBudgetFunction);

    // Edit budget button event listener
    document.querySelector(UISelectors.editBudgetButton).addEventListener('click', editBudgetFunction);

    // Update budget button event listener
    document.querySelector(UISelectors.updateBudgetButton).addEventListener('click', updateBudgetFunction);

    // Remove budget button event listener
    document.querySelector(UISelectors.removeBudgetButton).addEventListener('click', removeBudgetFunction);

    // Back budget button event listener
    document.querySelector(UISelectors.backBudgetButton).addEventListener('click', backBudgetFunction);

    // Add expense button event listener
    document.querySelector(UISelectors.addExpenseBtn).addEventListener('click', addExpenseFunction);

    // Edit expense button event listener
    document.querySelector(UISelectors.expenseTableBody).addEventListener('click', editExpenseFunction);

    // Update expense button event
    document.querySelector(UISelectors.updateButton).addEventListener('click', expenseUpdateSubmit);

    // Delete expense button event
    document.querySelector(UISelectors.deleteButton).addEventListener('click', deleteExpenseSubmit);

    // Back button event
    document.querySelector(UISelectors.backButton).addEventListener('click', UIController.clearEditState);

    // Clear button event
    document.querySelector(UISelectors.clearExpenseButton).addEventListener('click', clearAllExpenses);
  }

  // Add expense Function
  const addExpenseFunction = function (e) {

    // Get UI selectors from the public function
    const UISelectors = UIController.getSelectors();

    // Get form input from UI controller
    const input = UIController.getExpenseInput();

    // Validate expense form inputs
    if (input.desc === "" || input.amount <= 0) {

      document.querySelector(UISelectors.expenseError).style.visibility = 'visible';
      setTimeout(() => {
        document.querySelector(UISelectors.expenseError).style.visibility = 'hidden';
      }, 4000);
    } else {

      // Add expense
      const newExpense = ExpenseController.addExpense(input.desc, input.amount);

      // Add expense to the list 
      UIController.addExpenseToList(newExpense);

      // Get total expenses
      const totalExpenses = ExpenseController.getTotalExpense();

      // Add total expenses to UI list
      UIController.showTotalExpense(totalExpenses);

      // Calculate balance
      BalanceController.showBalance();

      // Clear input fields
      UIController.clearExpenseInputs();

    }

    e.preventDefault();
  }

  // Add budget function
  const addBudgetFunction = function (e) {
    // Add income to the form
    BudgetController.addIncome();

    // Calculate balance
    BalanceController.showBalance();

    e.preventDefault();
  }

  const editBudgetFunction = function (e) {
    // Call edit budget function from BudgetController
    BudgetController.editBudget()
    // Calculate balance
    // BalanceController.showBalance();
    e.preventDefault();
  }

  // Update budget function
  const updateBudgetFunction = function (e) {
    // Call update budget function from BudgetController
    BudgetController.updateBudget();

    // Calculate balance
    BalanceController.showBalance();

    e.preventDefault()
  }

  // Delete budget function
  const removeBudgetFunction = function (e) {
    // Call remove budget function from BudgetController
    BudgetController.removeBudget();
    // Calculate balance
    BalanceController.showBalance();

    e.preventDefault();
  }

  const backBudgetFunction = function (e) {
    BudgetController.backBudget();

    e.preventDefault();
  }


  // Update expense when the edit icon is pressed
  const editExpenseFunction = function (e) {
    if (e.target.className === 'fas fa-edit') {
      // Get expense id
      const expenseId = e.target.parentNode.parentNode.parentNode.id;

      // Break the array and get the id number
      const expenseIdArray = expenseId.split('-');
      const id = parseInt(expenseIdArray[1]);

      // Get expense 
      const expenseToEdit = ExpenseController.getExpenseById(id);

      // Set current expense
      ExpenseController.setCurrentExpense(expenseToEdit);

      // Add expense to form to edit
      UIController.addExpenseToForm();

    }

    e.preventDefault();
  }

  // Update expense after the update button is pressed
  const expenseUpdateSubmit = function (e) {
    // Get expense inputs
    const input = UIController.getExpenseInput();

    // Update expense array
    const updatedExpense = ExpenseController.updateExpense(input.desc, input.amount);

    // Update expense in the ui
    UIController.updateTableExpense(updatedExpense);

    // Get total expenses
    const totalExpenses = ExpenseController.getTotalExpense();

    // Add total expenses to UI list
    UIController.showTotalExpense(totalExpenses);

    // Calculate balance
    BalanceController.showBalance();

    // Clear input fields
    UIController.clearEditState();

    e.preventDefault();
  }

  // Delete expense item event
  const deleteExpenseSubmit = function (e) {

    // Get current expense
    const currentExpense = ExpenseController.getCurrentExpense();

    // Delete from data structure
    ExpenseController.deleteExpense(currentExpense.id);

    // Delete from UI
    UIController.deleteListExpense(currentExpense.id);

    // Get total expenses
    const totalExpenses = ExpenseController.getTotalExpense();

    // Add total expenses to UI list
    UIController.showTotalExpense(totalExpenses);

    // Calculate balance
    BalanceController.showBalance();

    // Clear input fields
    UIController.clearEditState();

    e.preventDefault();
  }

  const clearAllExpenses = function (e) {
    // Remove from data structure
    ExpenseController.clearAllExpenseItems();

    // Get total expenses
    const totalExpenses = ExpenseController.getTotalExpense();

    // Add total expenses to UI list
    UIController.showTotalExpense(totalExpenses);

    // Remove from UI
    UIController.removeAllExpenseUI();

    // Calculate balance
    BalanceController.showBalance();

    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {
      // Set initial state
      UIController.clearEditState();

      // Get expenses from our data structure
      const expenses = ExpenseController.getExpenses();

      // Populate list with expenses
      UIController.populateExpenseList(expenses);

      // Get total expenses
      const totalExpenses = ExpenseController.getTotalExpense();

      // Add total expenses to UI list
      UIController.showTotalExpense(totalExpenses);

      // Load event listeners
      loadEventListeners();
    }
  }

})(ExpenseController, BudgetController, BalanceController, UIController);


App.init();