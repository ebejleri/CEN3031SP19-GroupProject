var hashCode = function(s){
	return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
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
	$.get('/account/getaccount', {email: email, hash: hash})
	.done((e) => console.log("SUCCESS " + e))
	.fail((e) => console.log("FAIL " + e));
})