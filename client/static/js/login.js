const popup = () => {

}

const try_login = (cbs) => {
	$.get('../account/getaccount', {
		{
			email = email();
			hash = crypto.subtle.digest("SHA-512", password());
		}
	});
}

$(document).on('click', '#login-click', (e) => {
	if (window.sessionStorage.getItem('account'))
		return;
	e.preventDefault();
	popup();
})