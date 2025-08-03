let entries = JSON.parse(localStorage.getItem('entries')) || [];

const incTitleInput = document.querySelector("#income-title");
const incCategoryInput = document.querySelector("#income-category");
const incAmountInput = document.querySelector("#income-amount");
const addIncBtn = document.querySelector("#add-income-btn");

function calBalance(){ 

    document.querySelector("#total-income").innerHTML = `₹${totalIncome.toLocaleString('en-IN')}`;
    document.querySelector("#total-expenses").innerHTML = `₹${totalExpense.toLocaleString('en-IN')}`;
    document.querySelector("#remaining-balance").innerHTML = `₹${(totalIncome - totalExpense).toLocaleString('en-IN')}`;

}

addIncBtn.addEventListener('click', () => {
    
    const incTitle = incTitleInput.value;
    const incCategory = incCategoryInput.value;
    const incAmount = incAmountInput.value;

    entries.push({
        title: incTitle,
        category: incCategory,
        amount: Number(incAmount),
        type: "income"
    });
    localStorage.setItem('entries', JSON.stringify(entries));
    incTitleInput.value = '';
    incCategoryInput.value = '';
    incAmountInput.value = '';

    let totalIncome = Number(0);
    Object.keys(entries).forEach((key) => {
        totalIncome += Number(entries[key].amount);
    });

    renderTransactionSummary();
});

const expTitleInput = document.querySelector("#expense-title");
const expCategoryInput = document.querySelector("#expense-category");
const expAmountInput = document.querySelector("#expense-amount");
const addExpBtn = document.querySelector("#add-expense-btn");

addExpBtn.addEventListener('click', () => {
    
    const expTitle = expTitleInput.value;
    const expCategory = expCategoryInput.value;
    const expAmount = expAmountInput.value;

    console.log(expTitle, expCategory, expAmount);

    entries.push({
        title: expTitle,
        category: expCategory,
        amount: Number(expAmount),
        type: "expense"
    });
    localStorage.setItem('entries', JSON.stringify(entries));
    expTitleInput.value = '';
    expCategoryInput.value = '';
    expAmountInput.value = '';

    let totalExpense = Number(0);
    Object.keys(entries).forEach((key) => {
        totalExpense += Number(entries[key].amount);
    });

    renderTransactionSummary();
});

function renderTransactionSummary(){
    let html = '';
    totalExpense = 0;
    totalIncome = 0;
    for (let i = 0; i < entries.length; i++){
        const { title, category, amount, type } = entries[i];
        if (type === "income"){
            totalIncome += amount;
        } else {
            totalExpense += amount;
        }

        html += `
            <div class="entry-item ${type}">
                <div class="entry-details">
                    <div class="entry-title">${title}</div>
                    <div class="entry-category">${category}</div>
                </div>
                <div class="entry-amount">${type === 'income' ? '+' : '-'}₹${amount}</div>
                <button class="delete-btn" 
                  onclick="
                  entries.splice(${i}, 1);
                  localStorage.setItem('entries', JSON.stringify(entries));
                  renderTransactionSummary();
                  calBalance();
                ">×</button>
            </div>
        `;

    }
    document.querySelector("#entries-list").innerHTML = html;
    calBalance(); 
}

renderTransactionSummary(); //Initial Render

const tabButtons = document.querySelectorAll(".tab-btn"); 
const entriesList = document.querySelector(".entries-list");

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
       
        tabButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const tabType = button.getAttribute('data-tab');

        filterEntries(tabType);

    });
});

function filterEntries(tabType){
    const allEntries = document.querySelectorAll(".entry-item"); 

    allEntries.forEach((entry) => {
        if (tabType === "all"){ 
            entry.style.display = 'flex';
        }
        else if(tabType === "income"){
            
            if (!entry.classList.contains('expense')){ 
                entry.style.display = 'flex';
            } else{
                entry.style.display = 'none';
            }
        }
        else if (tabType === "expenses"){
            if (entry.classList.contains('expense')){
                entry.style.display = 'flex';
            } else{
                entry.style.display = 'none';
            }
        }

    });
}