var lengthOfTagGroup = outputTags= ""; // Обнуление переменных
function createTagsTable(){ // отрисовка таблицы
	$.get(tagGroupURL).done( function (data) { //получение данных в data
	var finalForm = data; 
	var coreHeader = '<div class="tag-form">' +
							'<div class="tag-form-header">'+
							'<span>Тэги по категориям</span>'+
							'</div>'+
						'<div class="tag-form-container">'; // данные, в "шапке" блока
	var coreFooter = '</div></div>'; //закрытие блока tag-form-container и tag-form
	var tagGroups = finalForm.length; // количество групп тэгов
	var columnsArray = [];
	var columnFinal = ""; // итоговый текст
	for (var columns = 0; columns<tagGroups;columns++){ // цикл, пробегается по всем группам тэгов
		if (finalForm[columns].name!="Main"&&finalForm[columns].tags.length>0&&finalForm[columns].name!="User satisfaction"&&finalForm[columns].name!="Unfiltered"){
			// не выводит группу Мэйн, пустые группы, Unfiltered и Satisfaction
		var columnsHead = '<div class="container-column">'+	
				'<div class="container-column-group">'	+				
					'<ul class="group-list">'+
						'<label class="group-header">'+ 
						finalForm[columns].name + '</label>';	 // построение группы тэгов, шапка блока	
		var columnsBody = ""; // обнуление тела
		for (var colTags = 0; colTags<finalForm[columns].tags.length;colTags++){ // цикл "накачки" тела, пробегается по всем тэгам, берет значение, номер и название
			var value = finalForm[columns].tags[colTags].value;
			var id = finalForm[columns].tags[colTags].id;
			var name = finalForm[columns].tags[colTags].name;
			columnsBody+='<li class="group-list-item">'+
					'<input type="checkbox" id="tags-checkbox-1" value="'+value+'" class="group-list-checkbox">' +
					'<label for="tags-checkbox-'+(colTags+1) + '" id="label-checkbox-'+id + '" class="tag-label" name="info-label" value="'+id+'" title="'+ finalForm[columns].tags[colTags].description+ '"><span>'+name+'</span></label></li>';
		}
		var columnsTail = '</ul></div></div>'; // строит конец блока, завершает список и столбец
		columnsArray[columns] = columnsHead + columnsBody + columnsTail; // заносит в массив получившийся блок
		columnFinal += columnsArray[columns]; // добавляет в конечный результат
		}
	}
	var serviceMessage = 	"<div><label id='serviceFeedbackMessage'></label></div>"; // сервис сообщения об ошибках или отправлении звонка
	var commentBox = 		"<div id=commentBox class='input-group'>"+
							"<textarea class='form-control' rows='4' id='feedbackComment' maxlength='2048'></textarea>"+
							"<span class='input-group-addon btn btn-success' onclick=collectInfo()>Save</span></div>"  // блок комментариев и кнопки отправить
	document.getElementById("FeedbackForm").innerHTML = coreHeader+columnFinal+coreFooter+commentBox+serviceMessage; // формирование всего блока фидбек
	$('label.tag-label').click(function(){ // по нажатию на тэг - добавление класса+выделение синим цветом
		$(this).toggleClass("blueOne");
		var forcheck = "#" + $(this).attr("for");
		$(forcheck).prop('checked', true);
	}) })
}
function collectInfo() { // сбор инфы по тэгам, отправление на проверку
lengthOfTagGroup = 0; 
outputTags ="";
	$('label[name=info-label]').each(function (){ //каждый тэг
	if($(this).hasClass('blueOne')) {// проверяется на наличие класса blueOne	
		outputTags += "{\"id\":" +$(this).attr("value") +"},"; // добавляет тэг
		lengthOfTagGroup++; // увеличивает количество тэгов активных
	}
})
outputTags= "[" + additionalTags + outputTags.substring(0, outputTags.length - 1)+"]"; //формирует строку на отправку на сервер
isInfoCorrect(); //проверка
}
function isInfoCorrect(){ // проверка корректности информации, отправка на сервер
var isCorrect = true; // по умолчанию данные корректны
$('#feedbackComment').removeClass("box-shadow"); // очистить блок от выделения
$('div.tag-form').removeClass("box-shadow"); // очистить блок от выделения
if (chainId=="") {$('#serviceFeedbackMessage').text("Выберите звонок").css({"color":"red"}); } //если нет chainID - выберите звонок и ничего не делается
		else  {
			if (lengthOfTagGroup == 0) {isCorrect = false;
					$('div.tag-form').addClass("box-shadow");} // если тэгов нет активных - подсветка и фолс
			if ($('#feedbackComment').val()=="") {isCorrect=false;
					$('#feedbackComment').addClass("box-shadow");}  // если комментария нет - подсветка и фолс
			if (isCorrect) {	$('#serviceFeedbackMessage').text("").css({"color":"black"}); // если все норм
										postFeedback(); // отправка фидбека
										setTimeout(function(){ drawBadges(); drawFeedback()}, 800); //сброс данных, отрисовка заново
			} 
			else {$('#serviceFeedbackMessage').text("Введены не все данные").css({"color":"red"});} // если false - данное сообщение
		}
}
function postFeedback () { // Отправить  фидбек
	var updateFeedbackCall = {
		"agentId": agentId,
		"chainId" : chainId,
        "comments":$('#feedbackComment').val(),
        "tags": JSON.parse(outputTags),
		"type": "FULL_FEEDBACK" } // массив данных
	RestPost(updateFeedbackCall, feedbackSaveURL);
}
function clearFeedback() { // Очистка фидбека
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', false); }); // снять чек со всех подписей
	$('label[name=info-label]').removeClass('blueOne'); // убрать класс
	$('#feedbackComment').val(""); // обнулить комментарий
	$('#serviceFeedbackMessage').text("").css({"color":"black"}); // черный цвет сервис-сообщения
}
function drawFeedback() { // отрисовка Feedbackа
	clearFeedback();
	var timeNow = moment().unix()*1000; 
	$.get(emptyFeedbackURL+timeNow+"/").done( function (data) { // вывод незаполненного к этому моменту фидбека
	var feedbackInfo = data;
	sorting(feedbackInfo, 'timeStart'); // сортировка, последние сверху
	var chainId = feedbackEmptyCalls = ""; // очистка чейнайди и выходного сообщения
	if(feedbackInfo.length==0) 	{document.getElementById("MainForm").innerHTML = "Все звонки заполнены";} // пусто
	else { 	var callInfo = []; var timetag,audioURL; 
			for (var i = 0; i < feedbackInfo.length; i++) { //цикл отрисовки пустых звонков
				var tagCollector =""; // переменная для тэгов, которые уже стоят в звонке
				for (var j=0;j<feedbackInfo[i].tags.length;j++){
					tagCollector +='{\"id\":' + feedbackInfo[i].tags[j].id + '},'; //сбор этих тэгов
				}
				var userID = feedbackInfo[i].avitoUserId; 
				var questionID = feedbackInfo[i].questionId; 
				var catID = feedbackInfo[i].shopCategoryId;
				var additionalInfo = collectAdditionalInfo(feedbackInfo[i], "feedback");
				timetag = moment.unix(feedbackInfo[i].timeStart/1000).format(dateFormat);
				CallInfo = [feedbackInfo[i].chainId, i, true];
				var onPlay = ' onplay=\'changeCall('+JSON.stringify(CallInfo)+')\'';
				var multipleCallsInfo = {
								data: feedbackInfo,
								counter: i,
								onPlayInfo: onPlay
							};
				var nextCall = collectMultipleCalls(multipleCallsInfo);
				var margin = (nextCall == "") ? "" : "no-margin-top";
				audioURL = '<audio class="audio-call '+margin+'" id="audio'+i+'" src="' + oktell + feedbackInfo[i].comId +'" '+onPlay+' controls></audio><a href="'+ oktell + feedbackInfo[i].chainId +'" target="_blank">' + '</a>';
				feedbackEmptyCalls += '<div id="feedbackCall' +i+'" onclick=changeCall('+JSON.stringify(CallInfo)+') class="call col-lg-12 feedback-call" data-time="'+timetag+'" data-sign="'+feedbackInfo[i].agent.username+'" value="'+ feedbackInfo[i].type+'" name='+ tagCollector +'><span style="display:none" id=feedback-com'+i+'>'+feedbackInfo[i].comments+'</span><span>'+ timetag +' '+ feedbackInfo[i].agent.username + '</span>'+additionalInfo+'<br>' + nextCall + audioURL  + '</div>'; // собственно пустые звонки, собирающиеся в цикле
				i+=iJump;
		}
		document.getElementById("MainForm").innerHTML = feedbackEmptyCalls;		
	}
	$("audio").each(function(){
		$(this).bind("play",stopAll).bind("click",stopAll);
	});
	//$(".feedback-call").bind("click",stopAll);
}
)}