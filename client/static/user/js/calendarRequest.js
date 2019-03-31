const calHandler = (e) => {
	e.preventDefault();
	const date = $('#name').val();
	const time = $('#selectTime').val();
	const account = JSON.parse(window.sessionStorage.getItem('account')) || 'test@gmail.com';
	if (date === null || date.length < 3) {
		// err
	}
	else {
		$.post('../account/appointment', {
			date: date,
			time: time,
			email: account.email,
		})
	}
}
$('#sendMessageButton').click(calHandler);
