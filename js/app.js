
let formInput = document.querySelector(".form-control");
let btnBudget = document.querySelector(".budget-submit");
let budget = document.getElementById("budget-amount");
let balance = document.getElementById("balance");
let expenseInput = document.getElementById("amount-input");
let btnexpense = document.querySelector(".expense-submit");
let expenseAmount = document.getElementById("expense-amount");
let expenseInputd = document.getElementById("expense-input");
let arrayOfExpenses = [];
let arrayoflistsExpns = [];

let expensLis = document.querySelector(".expense-list");
let expensesLists = document.querySelector(".expensesLists");

let btnReset = document.querySelector(".budget-reset");

btnReset.addEventListener("click", (e) => {
    localStorage.clear();
    //getDatafromLocalStorage();
    Window.location.reload();
    e.preventDefault();
})

if(localStorage.getItem("budget")){
    getDatafromLocalStorage();
}

if(localStorage.getItem("expense")){
  let nmbr = parseInt(localStorage.getItem("expense"));
  arrayOfExpenses.push(nmbr);
  
}
if(localStorage.getItem("expensesLists")){
  arrayoflistsExpns = JSON.parse(localStorage.getItem("expensesLists"));
}

//getDatafromLocalStorage();

function getDatafromLocalStorage(){
  budget.innerHTML = localStorage.getItem("budget");
  expenseAmount.innerHTML = localStorage.getItem("expense");

  let dataOfExpns = window.localStorage.getItem("expensesLists");

    if(dataOfExpns){
        let listsOfExpense = JSON.parse(dataOfExpns);
        addElementsToPage(listsOfExpense);
    }
  calculRes();
}

btnBudget.addEventListener("click", function(e){

    addBudget();

  e.preventDefault();
});

btnexpense.addEventListener("click", function(e){
  
    addExpense();

    e.preventDefault();
});

function  addBudget(){
  budget.innerHTML = formInput.value;
  addToLocalStr(budget.innerHTML);
  calculRes();

}
function addExpense(){
  expenseAmount.innerHTML = expenseInput.value;
  let expenses = parseInt(expenseInput.value);
    arrayOfExpenses.push(expenses);
    let calculexpense = arrayOfExpenses.reduce(function(acc, cur){
      return acc + cur ;
  }); 
  expenseAmount.innerHTML = calculexpense;

  adExpenseToLocalStr(expenseAmount.innerHTML);
  //expenseConstruction();
  expenseConstructor();

  calculRes();
}

function expenseConstructor(){
    let expenseAmountsOBj = {
      id: Date.now(),
      titleValue :expenseInputd.value,
      ExpenseValue : expenseInput.value,
    }

    arrayoflistsExpns.push(expenseAmountsOBj);
    addElementsToPage(arrayoflistsExpns);
    addExpnsListsToLocalStorage(arrayoflistsExpns);
}

//addElementsToPage
  function addElementsToPage(arrayoflistsExpns){
    //empty lists 
    expensesLists.innerHTML = "";
    
    arrayoflistsExpns.forEach(expn => {

    let expensediv = document.createElement("div");
    expensediv.className = "expense";
    
    expensediv.setAttribute("data-id",expn.id)

    let h6 = document.createElement("h6");
    h6.className = "expense-title list-item";
    let h6txt = document.createTextNode(`-${expn.titleValue}`)
    h6.appendChild(h6txt);

    let h5 = document.createElement("h5");
    h5.className = "expense-amount list-item";
    let h5txt = document.createTextNode(`${expn.ExpenseValue}`)
    h5.appendChild(h5txt);

    let divgrp = document.createElement("div");
    divgrp.className = "expense-item d-flex justify-content-between align-items-baseline";

    let divicons = document.createElement("div");
    divicons.className = "expense-icons list-item";

    let edticn = document.createElement("a");
    edticn.className = "edit-icon mx-2";
    edticn.innerHTML = `<i class="fas fa-edit"></i>`;
    divicons.appendChild(edticn);

    let rmvicn = document.createElement("a");
    rmvicn.className = "delete-icon mx-2";
    rmvicn.innerHTML = `<i  class="fas fa-trash"></i>`;
    rmvicn.addEventListener("click", (e) => {
      
      //remove in local storage;
      if(e.target.parentElement.classList.contains("delete-icon")){
        let targetExpn = e.target.parentElement.parentElement.parentElement.parentElement;
          deleteExpenseWith(targetExpn.getAttribute("data-id"));
      //remove from page

      targetExpn.remove(); 

      //Update expense Amount

      let expenseparent = e.target.parentElement.parentElement.parentElement;
      let expenseValue = expenseparent.querySelector(".expense-amount");

      expenseAmount.innerHTML = expenseAmount.innerHTML - expenseValue.innerHTML;
      adExpenseToLocalStr(expenseAmount.innerHTML);
      calculRes();
      }
    })

    divicons.appendChild(rmvicn)

    divgrp.appendChild(h6);
    divgrp.appendChild(h5);
    divgrp.appendChild(divicons)

    expensediv.appendChild(divgrp);
    expensesLists.appendChild(expensediv)

    //expensLis.appendChild(expensediv);

    });
  }


//Balance
function calculRes(){
//balance
  let bg = parseInt(budget.innerHTML);
  let expn = parseInt(expenseAmount.innerHTML)
  balance.innerHTML = bg - expn;
}

function addToLocalStr(budgettxt){
    window.localStorage.setItem("budget", budgettxt);
}
function adExpenseToLocalStr(expenses){
    localStorage.setItem("expense",expenses)
}

function addExpnsListsToLocalStorage(arrayoflistsExpns){
  window.localStorage.setItem("expensesLists", JSON.stringify(arrayoflistsExpns))
}

function deleteExpenseWith(ids){
  arrayoflistsExpns = arrayoflistsExpns.filter((expenseAmountsOBj) => expenseAmountsOBj.id != ids);

  addExpnsListsToLocalStorage(arrayoflistsExpns);

}



