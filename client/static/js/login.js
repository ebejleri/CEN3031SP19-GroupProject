var email = (v) => {
	if (v) {
		window.sessionStorage.setItem('email', v);
	}
	return window.sessionStorage.getItem('email');
}
var password = (v) => {
	if (v) {
		window.sessionStorage.setItem('password', v);
	}
	return window.sessionStorage.getItem('password');
}
$(document).on('click', '#login-click', (e) => {
	if (email() !== null && password() !== null) {
		
	}
	e.preventDefault();
	
})