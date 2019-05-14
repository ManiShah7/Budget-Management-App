// UI Class
class UI {
  constructor() {
    this.incomeError = document.querySelector(".income-error");
    this.expenseError = document.querySelector(".expense-error");
    this.incomeForm = document.getElementById("income-form");
    this.incomeInput = document.getElementById("income-input");
    this.incomeAmount = document.getElementById("income-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.expenseDesc = document.getElementById("expense-desc");
    this.expenseList = document.getElementById("expense-list");
    this.deleteWarning = document.querySelector(".delete-warning");
    this.addButton = document.querySelector(".add-btn");
    this.updateButton = document.querySelector(".update-btn");
    this.deleteButton = document.querySelector(".delete-btn");
    this.backButton = document.querySelector(".back-btn");
    this.itemList = [];
    this.itemID = 0;
  }

  // Income form submission function
  submitIncomeForm() {
    if (this.incomeInput.value === "" || this.incomeInput.value <= 0) {
      this.incomeError.style.visibility = 'visible';
      this.incomeInput.style.border = '1px solid red';
      setTimeout(() => {
        this.incomeError.style.visibility = 'hidden';
        this.incomeInput.style.border = '1px solid #eee';
      }, 3000);
    } else {
      this.incomeAmount.textContent = (parseInt(this.incomeInput.value));;
      this.incomeInput.value = '';
    }
    this.showBalance();
  }

  // Expense form submission function
  submitExpenseForm() {
    if (this.expenseInput.value === "" || this.expenseInput.value <= 0 || this.expenseDesc.value === "") {
      this.expenseError.style.visibility = 'visible';
      this.expenseInput.style.border = '1px solid red';
      this.expenseDesc.style.border = '1px solid red';
      setTimeout(() => {
        this.expenseError.style.visibility = 'hidden';
        this.expenseInput.style.border = '1px solid #eee';
        this.expenseDesc.style.border = '1px solid #eee';
      }, 3000);
    } else {
      const id = this.itemID;
      const title = this.expenseDesc.value;
      let amount = (parseInt(this.expenseInput.value));
      this.expenseDesc.value = '';
      this.expenseInput.value = '';

      let expense = {
        id,
        title,
        amount
      }

      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.totalExpenses();
      this.showBalance();
    }
  }

  // Add an individual expense to the app
  addExpense(expense) {
    const tr = document.createElement('tr');
    tr.innerHTML = `

    <th>${expense.title}</th>

    <td>$ ${expense.amount}</td>

    <td>
      <a href="#" class="edit-icon" data-id="${expense.id}">
        <i class="fas fa-edit"></i>
      </a>
    </td>
    `
  //   <td>
  //   <a href="#" class="delete-icon" data-id="${expense.id}">
  //     <i class="fas fa-trash"></i>
  //   </a>
  //  </td>
    this.expenseList.appendChild(tr);
  }

  // Calculate total expenses every time we add an expense
  totalExpenses() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function (acc, curr) {
        acc += curr.amount;
        return acc;
      }, 0)
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  // Calculate total balance
  showBalance() {
    const expense = this.totalExpenses();
    const total = parseInt(this.incomeAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
  }

  // Edit expenses 
  editExpense(e) {
    if (e.target.className === 'fas fa-edit') {
      this.addButton.style.display = 'none';
      this.deleteButton.style.display = 'inline-block';
      this.updateButton.style.display = 'inline-block';
      this.backButton.style.display = 'inline-block';
      let id = parseInt(e.target.parentElement.dataset.id);
      let expense = this.itemList.filter(function (item) {
        return item.id === id;
        });
      this.expenseDesc.value = expense[0].title;
      this.expenseInput.value = expense[0].amount;
      
      
      // e.target.parentElement.parentElement.parentElement.remove();
      // let expense = this.itemList.filter(function (item) {
      //   return item.id === id;
      // });

      // let tempList = this.itemList.filter(function (item) {
      //   return item.id !== id;
      // });
      // this.itemList = tempList;
      // // this.showBalance();
            
    }
  }

  updateExpense(){
    const id = this.itemID;
    const title = this.expenseDesc.value;
    let amount = (parseInt(this.expenseInput.value));
    this.expenseDesc.value = '';
    this.expenseInput.value = '';
    
  }

  // Back button function
  backBtnClearsEdit(){
    this.expenseDesc.value = '';
    this.expenseInput.value = '';
    this.addButton.style.display = 'inline-block';
    this.deleteButton.style.display = 'none';
    this.updateButton.style.display = 'none';
    this.backButton.style.display = 'none';
  }

  // Delete item
  // deleteItem(id) {
  //   Get ids
  //   ids = expense.map(function (item) {
  //     return item.id
  //   });

  //   console.log("gooz");
    

  //   // // Get index
  //   // const index = ids.indexOf(id);

  //   // // Remove item
  //   // data.items.splice(index, 1);

  // }

  // Delete button function
  removeExpense(id){
    // Get ids
    console.log('gooz');
    

  }



  // Delete individual expenses from the list
  // deleteExpense(e) {
  //   if (e.target.className === 'fas fa-trash') {
  //     this.deleteWarning.style.display = 'block';
      
  //     console.log(e);
      
        
  //       // let id = parseInt(e.target.parentElement.dataset.id);
  //       // let tempList = this.itemList.filter(function (item) {
  //       //   return item.id !== id;
  //       // });
  //       // e.target.parentElement.parentElement.parentElement.remove();
  //       // this.itemList = tempList;
  //       // this.showBalance();
  //     // } else {
  //     //   this.deleteWarning.style.visibility = 'hidden';
  //     // }
  //   }
  // }

}



