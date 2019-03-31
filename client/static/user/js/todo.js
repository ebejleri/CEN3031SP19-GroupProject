$(document).ready(() => {
	console.log(window.sessionStorage.getItem('account'));
	const account = JSON.parse(window.sessionStorage.getItem('account'));
	document.getElementById('FULLNAME').innerHTML = (account.first_name + " " + account.last_name);
})

$(document).on('click', '#logoutButton', (e) => {
	window.sessionStorage.removeItem('account');
})