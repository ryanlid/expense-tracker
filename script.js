const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   {
//     id: 1,
//     text: 'flower',
//     amount: -20,
//   },
//   {
//     id: 2,
//     text: 'Salary',
//     amount: 300,
//   },
//   {
//     id: 3,
//     text: 'Book',
//     amount: -10,
//   },
//   {
//     id: 4,
//     text: 'Camera',
//     amount: 150,
//   },
// ];

// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  }
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };
  transactions.push(transaction);
  addTransactionDOM(transaction);

  updateValues();

  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

function generateID() {
  return Math.floor(Math.random() * 10000000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // 根据金额添加对应 class
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text}<span>${sign}${transaction.amount}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);
}

// 更新 balance income expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
  // console.log(amounts);
}
// 通过 id 删除 transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);
  updateLocalStorage();
  init();

}

// 更新 localStorage 中的 transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
