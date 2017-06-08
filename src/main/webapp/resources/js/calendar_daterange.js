var startDate;  
var endDate;
// функция для установки переменных startDate и endDate для передачи в функции статистики, звонков итд. Проверка на вид передаваемой даты, конвертация в цифровой вид (11.11.2011)
function cb(start, end) {
			if (start.length==10){
				startDate = start;
				endDate = end;	
			}	
				else{
			startDate = moment(start).format("DD-MM-YYYY");;
			endDate = moment(end).format("DD-MM-YYYY");;
				}			
    }
// Отрисовка календаря
function createCalendar(startDate, endDate){
	$('input[name="daterange"]').daterangepicker({
			locale: { // показываемые данные
        format: 'DD-MM-YYYY',      
        "applyLabel": "Выбрать",
        "cancelLabel": "Отмена",
        "daysOfWeek": [
            "ВС",
            "ПН",
            "ВТ",
            "СР",
            "ЧТ",
            "ПТ",
            "СБ"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        "firstDay": 1 // 1 день Понедельник
    },
			"startDate": startDate,
			"endDate": endDate,
			"opens": "left" // выезжает влево
    }, cb);
}
// Старт, создание календаря, выбор даты
function StartCalendar() {
	$(function() {
    createCalendar(startDate, endDate);
    cb(startDate, endDate);
	getInfo('date');
});
// отдельная функция, вызываемая после нажатия каждой кнопки, отрисовка календаря, передача данных + передача переменной "дата" для сохранения инфы в статистике
function afterClickActions(){
		createCalendar(startDate, endDate);
		cb(startDate, endDate);
		getInfo('date');	
} 
$("#yesterday").click(function () { 	// Кнопка Вчера
		startDate = moment().subtract(1, 'days').format("DD-MM-YYYY");
		endDate = moment().format("DD-MM-YYYY");
		afterClickActions();
}); 
$("#today").click(function () {	 		// Кнопка Сегодня
		startDate = moment().format("DD-MM-YYYY");
		endDate = moment().add(1,'days').format("DD-MM-YYYY");
        afterClickActions();
}); 
$("#week").click(function () {			//Кнопка Неделя
		startDate = moment().startOf('week').add(1,'days').format("DD-MM-YYYY");
		endDate = moment().endOf('week').add(1,'days').format("DD-MM-YYYY");
        afterClickActions();		
}); 
$("#month").click(function () {			// Кнопка месяц
		startDate = moment().startOf('month').format("DD-MM-YYYY");
		endDate = moment().endOf('month').format("DD-MM-YYYY");
        afterClickActions();
});
};