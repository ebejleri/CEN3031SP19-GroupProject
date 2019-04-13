var getAccount = () => {
	return JSON.parse(window.sessionStorage.getItem('account'));
}

$('#addItemButton').click(() => {
	const item = $('#addedItem').val();
	$('#addedItem').val("");
	addItem(item);
});

var addItem = (item) => {
	var account = getAccount();
	var todo = JSON.parse(account.todo);
	todo.push(item);
	account.todo = JSON.stringify(todo);
	updateAccount(account);
}

var deleteItem = (i) => {
	var account = getAccount();
	var todo = JSON.parse(account.todo);
	todo.splice(i, 1);
	account.todo = JSON.stringify(todo);
	updateAccount(account);
}

var getTodoItem = (item, i) => {
	return `
		<li class="text-s font-weight-bold todo-item" id="todo-${i}">
			${item} <span onClick="deleteItem(${i})" style="cursor: pointer;" align="right">❌</span>
		</li>
	`
}

var setupTodo = (account) => {
	var todo;
	try {
		todo = JSON.parse(account.todo);
	}
	catch {
		account.todo = JSON.stringify([]);
		updateAccount(account);
		return;
	}
	var todoElem = document.getElementById('todo-list');
	var new_todo = "";
	var i = 0;
	for (let item of todo) {
		new_todo += getTodoItem(item, i);
		i++;
	}
	todoElem.innerHTML = new_todo
}

var updateAccount = (account) => {
	$.post('/account/setaccount', {
		email: account.email,
		hash: account.hash,
		account: JSON.stringify(account),
	}, (err) => {
		$.get('/account/getaccount', {email: account.email, hash: account.hash}, function(data, msg) {
			window.sessionStorage.setItem('account', JSON.stringify(data[0]));
			setupTodo(getAccount());
		});
	})
}

$(document).ready(() => {
	const account = getAccount();
	document.getElementById('FULLNAME').innerHTML = (account.first_name + " " + account.last_name);
  setupTodo(account);
  
  if (account.pending_payment) {
    var paypalButton = document.getElementById('payPalBlock');
    var paypalCheckbox = document.getElementById('checkBoxPaypal');
    paypalCheckbox.style.display = "none";
    paypal.Button.render({
      env: 'sandbox', // Or 'production'
      // Set up the payment:
      // 1. Add a payment callback
      payment: function (data, actions) {
        // 2. Make a request to your server
        return actions.request.post('/my-api/create-payment/')
          .then(function (res) {
            // 3. Return res.id from the response
            return res.id;
          });
      },
      // Execute the payment:
      // 1. Add an onAuthorize callback
      onAuthorize: function (data, actions) {
        // 2. Make a request to your server
        return actions.request.post('/my-api/execute-payment/', {
          paymentID: data.paymentID,
          payerID: data.payerID
        })
          .then(function (res) {
            // flag = true;
            console.log("payment completed");
            paypalButton.disabled = true;
            paypalButton.style.display = "none";
            paypalCheckbox.style.display = "block"
            var account = getAccount();
            account.pending_payment = false;
            updateAccount(account);
            // alert('Transaction completed by ' + res.payer.name.given_name + '!');
            // 3. Show the buyer a confirmation message.
          });
        }
      }, '#paypal-button');
        // if(flag){
        //   paypalButton.disabled=true;
        // }
  }
});



$(document).on('click', '#logoutButton', (e) => {
	window.sessionStorage.removeItem('account');
})