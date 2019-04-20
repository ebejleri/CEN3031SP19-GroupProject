var getForm = (name, placeholder) => {
	return `
		<input class="form-control mb-4" id="${name}-input" type="text" placeholder="${placeholder}" required="required">
	`
}

var getAccount = () => {
	return JSON.parse(window.sessionStorage.getItem('account'));
}

$('#submitButton').click(() => {
	var val = $('#CRUD').val();
	var firstName = $('#first-name-input').val();
	var lastName = $('#last-name-input').val();
  var userEmail = $('#email-input').val();
  var newEmail = $('#new-email-input').val();
	const account = getAccount();
	if(val == 'create') {
		$.post('/account/createaccount', {
			email: account.email,
			hash: account.hash,
			userEmail: userEmail,
			firstName: firstName,
			lastName: lastName,
		}, function(err, data) {
      console.log("err:")
      console.log(err);
      console.log("data:");
      console.log(data);
    } )
  }
  else if (val == 'delete') {
    $.post('/account/deleteaccount', {
      email: account.email,
      hash: account.hash,
      userEmail: userEmail,
    }, (data) => { alert(data.msg);});
  }
  else if (val == 'update') {
    $.post('/account/setaccountemail', {
      email: account.email,
      hash: account.hash,
      oldEmail: userEmail,
      userEmail: newEmail,
    }, (data) =>{ alert(data.msg);});
  }
});

var updateCRUD = () => {
	var val = $('#CRUD').val();
	var formsElem = document.getElementById('forms');
	if (val == 'delete') {
		formsElem.innerHTML = getForm('email', 'Email');
	}
	else if (val == 'update') {
		formsElem.innerHTML = getForm('email', 'Current Email');
		formsElem.innerHTML += getForm('new-email', 'New Email');
	}
	else { // create
		formsElem.innerHTML = getForm('first-name', "First Name");
		formsElem.innerHTML += getForm('last-name', "Last Name");
		formsElem.innerHTML += getForm('email', 'Email');
	}
}

$(document).ready(updateCRUD);
$('#CRUD').change(updateCRUD);