var hashCode = function(s){
	return ""+(s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));              
}

const popup = () => {
	$('#loginTrigger').trigger('click');
}

$(document).on('click', '#login-click', (e) => {
	if (window.sessionStorage.getItem('account'))
		return;
	e.preventDefault();
	popup();
})

$('#loginContinue').click((e) => {
	e.preventDefault();
	const email = $('#email-input').val();
	const hash = hashCode($('#password-input').val());
	console.log("#1");
	$.get('/account/getaccount', {email: email, hash: hash}, function(data, msg) {
		if (data.err) {
			alert("Incorrect Login!");
		}
		else {
			console.log(data[0]);
			window.sessionStorage.setItem('account', JSON.stringify(data[0]));
			window.location.href = '/user/index.html';
		}
	});
})