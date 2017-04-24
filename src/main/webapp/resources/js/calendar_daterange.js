var startDate;
var endDate;
function calendarConsole(){
	// console.log("Начальная дата: " + startDate + ", конечная дата: " +endDate);
}

function cb(start, end) {
			if (start.length==10)
			{
				startDate = start;
				endDate = end;	
			}	
				else{
			startDate = moment(start).format("DD-MM-YYYY");;
			endDate = moment(end).format("DD-MM-YYYY");;
				}
					
    }

function createCalendar(startDate, endDate)
{
	
	$('input[name="daterange"]').daterangepicker({
			locale: {
        format: 'DD-MM-YYYY',
       
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
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
        "firstDay": 1
    },
			"startDate": startDate,
			"endDate": endDate,
			"opens": "left"
    }, cb);
}
function StartCalendar() {
	$(function() {

    createCalendar(startDate, endDate);
    cb(startDate, endDate);

});
$("#yesterday").click(function () {
		
		startDate = moment().subtract(1, 'days').format("DD-MM-YYYY");
		endDate = moment().format("DD-MM-YYYY");
		// console.log(startDate);
		// console.log(endDate);
		createCalendar(startDate, endDate);
		cb(startDate, endDate);
});
$("#today").click(function () {
		
		startDate = moment().format("DD-MM-YYYY");
		endDate = moment().add(1,'days').format("DD-MM-YYYY");
        createCalendar(startDate, endDate);
		cb(startDate, endDate);	
});
$("#week").click(function () {
		
		startDate = moment().startOf('week').add(1,'days').format("DD-MM-YYYY");
		endDate = moment().endOf('week').add(1,'days').format("DD-MM-YYYY");
        createCalendar(startDate, endDate);
		cb(startDate, endDate);	
});
$("#month").click(function () {
		
		startDate = moment().startOf('month').format("DD-MM-YYYY");
		endDate = moment().endOf('month').format("DD-MM-YYYY");
        createCalendar(startDate, endDate);
		cb(startDate, endDate);	
});
};


/*
        ranges: {
           'Сегодня': [moment(), moment().add(1,'days')],
           'Вчера': [moment().subtract(1, 'days'), moment()],
           'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
		   'Неделя': [moment().startOf('week').add(1,'days'), moment().endOf('week').add(1,'days')],
           'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
           'Месяц': [moment().startOf('month'), moment().endOf('month')]          
        }
*/