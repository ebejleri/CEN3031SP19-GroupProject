var getForm = (name, placeholder) => {
	return `
		<input class="form-control mb-4" id="${name}-input" type="text" placeholder="${placeholder}" required="required">
	`
}

var getVendorInput = () => {
  return `
    <select  class="mb-4" style="margin-top:20px;" id = "VENDOR" onChange="updateVendorValue()">
      <option value="venues" selected="selected">Venues</option>
      <option value="bakers">Bakers</option>
      <option value="caterers">Caterers</option>
      <option value="florists">Florists</option>
      <option value="photographers">Photographers</option>
      <option value="djs">DJs</option>
    </select>
  `;
}

var getVendorForm = () => {
  return `
    <textarea class="form-control mb-4" id="vendor-text" type="text" cols="40", rows="10" required="required"></textarea>
  `;
};

var updateVendorValue = () => {
  const siteData = JSON.parse(getAccount().site_data);
  const vdata = siteData.vendors[$("#VENDOR").val()];
  var str = "";
  for (let i = 0; i < vdata.length; i++) {
    str += vdata[i] + "\n";
  }
  console.log(vdata);
  console.log(str);
  $("#vendor-text").val(str);
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
	if(val === 'create') {
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
  else if (val === 'delete') {
    $.post('/account/deleteaccount', {
      email: account.email,
      hash: account.hash,
      userEmail: userEmail,
    }, (data) => { alert(data.msg);});
  }
  else if (val === 'update') {
    $.post('/account/setaccountemail', {
      email: account.email,
      hash: account.hash,
      oldEmail: userEmail,
      userEmail: newEmail,
    }, (data) =>{ alert(data.msg);});
  }
  else if (val === 'vendor') {
    onChangeVendorText();
  }
});

const onChangeVendorText = () => {
  var account = getAccount();
  var newData = $("#vendor-text").val().trim().split("\n");
  var siteData = JSON.parse(account.site_data);
  siteData.vendors[$("#VENDOR").val()] = newData;
  account.site_data = JSON.stringify(siteData);
  updateAccount(account, () => {
    $.get('/account/getaccount', { email: account.email, hash: account.hash }, function (data, msg) {
      window.sessionStorage.setItem('account', JSON.stringify(data.account));
      alert("Vendor Data Updated!");
    });
  });
}

const showSubmit = () => $("#submitButton").css({ display: 'block' });
const hideSubmit = () => $("#submitButton").css({ display: 'none' });

var updateCRUD = () => {
	var val = $('#CRUD').val();
	var formsElem = document.getElementById('forms');
	if (val === 'delete') {
    formsElem.innerHTML = getForm('email', 'Email');
    showSubmit();
	}
	else if (val === 'update') {
		formsElem.innerHTML = getForm('email', 'Current Email');
		formsElem.innerHTML += getForm('new-email', 'New Email');
    showSubmit();
	}
	else if (val === 'create'){ // create
		formsElem.innerHTML = getForm('first-name', "First Name");
		formsElem.innerHTML += getForm('last-name', "Last Name");
		formsElem.innerHTML += getForm('email', 'Email');
    showSubmit();
  }
  else if (val === 'vendor') {
    formsElem.innerHTML = getVendorInput();
    formsElem.innerHTML += getVendorForm();
    updateVendorValue();
    showSubmit();
    // hideSubmit();
  }
}

$(document).ready(updateCRUD);
$('#CRUD').change(updateCRUD);