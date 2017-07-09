var outputTags = "";
var tagCounter=tagSum=0;
var tagsMap;
$(document).ready(function() {
tagActiveChecker(); // Проверка тэгов на запуске
$('.dropdown-menu.tag-form').on('click', function(event){ // убрать срабатывание закрытия формы по нажатию на тэги
    event.stopPropagation();
});
});
function toggle() { // для работы тоггла, менять значение по нажатию
    $("#toggle-trigger").bootstrapToggle("toggle");
	console.log($("#toggle-trigger").prop("checked"));
  }	
function clickOnLabel(id){ // функция при нажатии на лейбл(тэг)
		$("#label-checkbox-"+id).toggleClass("blueOne"); // тоггл класса тэга
		var forcheck = "#" + $(this).attr("for"); // вылавливание id тэга у лейбла
		$(forcheck).prop('checked', true); // чек
		tagActiveChecker(); // вывод обновленной инфы
	}
function checkAllButton(){ // кнопка "все", тоже самое, что у лейбла, только в цикле по всем кнопкам
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', true); });
	$('label[name=info-label]').addClass('blueOne');
	tagActiveChecker();
}
function clearButton(){ // кнопка очистить, тоже самое, что у лейбла, только в цикле убрать значения у всех кнопок
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', false); });
	$('label[name=info-label]').removeClass('blueOne');
	tagActiveChecker();
}
function tagActiveChecker(){ // проверка активных тэгов
tagsMap = new Map(); // мэп для хранения данных
outputTags = ""; // обнуление инфы
tagCounter = 0; // обнуление инфы
tagSum = 0;
$('label[name=info-label]').each(function () { tagSum++;
	if($(this).hasClass('blueOne')){ // в цикле проходятся все тэги и лейблы, если есть класс Blue
	outputTags += $("#"+$(this).attr("for")).attr("value") + " "; // название тэга
	tagCounter++; // + в количество тэгов
	tagsMap.set($(this).attr("value"), $("#"+$(this).attr("for")).attr("value")); // внесение в мэп информации ключ:значение, id:название
}
})
$('#tagCounterPlace').text(tagCounter); //вывод информации о количестве тэгов
if (tagSum==tagCounter&&tagSum>0) 	{$('#tagNamesPlace').text("Выбраны все тэги"); } // проверка, чтобы максимальное количество тэгов и выбранных совпадало и было больше 0
else 			{$('#tagNamesPlace').text(outputTags); }// и о их названиях
}