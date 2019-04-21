const getAdminAccount = () => {
  return JSON.parse(window.sessionStorage.getItem('account'));
}

var userAccountEmail = "";
var userAccount = null;
const calcAccount = (cb) => {
  const adminAccount = getAdminAccount();
  $.get('/account/getaccount', {
    user_email: userAccountEmail,
    not_conform: true,
    email: adminAccount.email,
    hash: adminAccount.hash,
  }, (data) => {
    if (data.account) {
      console.log(data.account);
      userAccount = data.account;
      setupTodo(getUserAccount());
    }
    else {
      removeTodoButton();
      removeTodo();
      alert(data.msg);
    }
  })
}

var getUserAccount = () => {
  return userAccount;
}

const addItemButtonClick = () => {
  const item = $('#addedItem').val();
  $('#addedItem').val("");
  addItem(item);
}

$('#addItemButton').click(addItemButtonClick);

var addItem = (item) => {
  var account = getUserAccount();
  var todo = JSON.parse(account.todo);
  todo.push(item);
  account.todo = JSON.stringify(todo);
  updateAccount(account);
}

var deleteItem = (i) => {
  var account = getUserAccount();
  var todo = JSON.parse(account.todo);
  todo.splice(i, 1);
  account.todo = JSON.stringify(todo);
  updateAccount(account);
}

var getTodoItem = (item, i) => {
  return `
    <li class="text-s font-weight-bold todo-item" id="todo-${i}">
      ${item} <div id="todo-X" onClick="deleteItem(${i})" style="cursor: pointer;">❌</span>
    </li>
  `
}

var setupTodo = (account) => {
  createTodoButton();
  var todo;
  try {
    todo = JSON.parse(account.todo);
  }
  catch {
    account.todo = JSON.stringify([]);
    updateAccount(account);
    return;
  }
  console.log("TODO:")
  console.log(todo);
  var todoElem = document.getElementById('todo-list');
  var new_todo = "";
  var i = 0;
  for (let item of todo) {
    new_todo += getTodoItem(item, i);
    i++;
  }
  todoElem.innerHTML = new_todo
}

var removeTodo = () => {
  var todoElem = document.getElementById('todo-list');
  todoElem.innerHTML = '';
}

var updateAccount = (account, cb) => {
  $.post('/account/setaccount', {
    email: account.email,
    hash: account.hash,
    account: JSON.stringify(account),
  }, (err) => {
    cb ? cb() : calcAccount();
  })
}

const createTodoButton = () => {
  document.getElementById('inject-todo-add').innerHTML = `<div class="input-group">
    <input id = "addedItem" type = "text" class="form-control bg-light border-0 small" placeholder = "Item Name"
  aria-label="Search" aria-describedby="basic-addon2">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" onClick="addItemButtonClick()">
        <i class="fas fa-plus fa-sm"></i>
      </button>
    </div>
  </div>`
}

const removeTodoButton = () => {
  document.getElementById('inject-todo-add').innerHTML = ``;
}

$('#set-user-email').click(() => {
  userAccountEmail = $('#user-email-input').val();
  console.log("USER EMAIL SET: " + userAccountEmail);
  calcAccount();
});

$(document).ready(() => {
  const account = getAdminAccount();
  document.getElementById('FULLNAME').innerHTML = (account.first_name + " " + account.last_name);
});

$(document).on('click', '#logoutButton', (e) => {
  window.sessionStorage.removeItem('account');
})