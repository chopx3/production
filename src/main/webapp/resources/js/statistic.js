$(document).ready(function() {
	$('#statistic').click(function() {
		var options = {
			header : "Статистика",
			mainFormWidth: 12
		}
		fillInfo(options);
		document.getElementById("mainForm").innerHTML = "Показать статистику за: Вчера, Сегодня, Неделя, Месяц";
	});
});