const calHandler = (e) => {
	e.preventDefault();
	const date = $('#name').val();
	const time = $('#selectTime').val();
	console.log(date + ",  " + time);
	const account = JSON.parse(window.sessionStorage.getItem('account'));
	if (date == null || date.length < 3) {
		alert("Please put in valid date!");
	}
	else {
		$('#name').val("");
		$("selectTime").val(1);
		$.post('../account/appointment', {
			date: date,
			time: time,
			email: account ? account.email : 'test@gmail.com',
		})
	}
}
$('#sendMessageButton').click(calHandler);
