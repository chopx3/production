﻿var chainId = tagsString = tagBuffer = ""; // объявление переменных
var idSaver, dataArray, additionalTags, dayOrEmpty; // объявление переменных
var sentCall=false; // для отображения "отправки" звонка
var questNum=catNum=1; // начальные значения категории и вопроса, по умолчанию 1\1
var comFormat = 'DD.MM.YY HH:mm'; // формат отображения комментариев
var isHappy = true; // для тогглера happy|unhappy
var happy = unhappy = agentId = 0;
var CallInfo; // для передачи данных о звонке
var agentName = "";
var RestPost = function(sendData, url) { // стандартная функция пост отправки данных
            $.ajax({
                url: url,
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(sendData), //Stringified Json Object
                async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
                cache: false,    //This will force requested pages not to be cached by the browser
                processData: false, //To avoid making query String instead of JSON
                success: function (resposeJsonObject) { /* Success Action */  },
                error: function (message) { alert(message) }
            });
    };

$(document).ready(function() { // основной блок
	window.setInterval(function(){
	sendWebSocketMessage("getMyEmptyCalls");
  getWebsocketMessage(function(data){ 	if (getUniqueData(data.emptyCallList)>0) {	$("#emptyCallsBadge").text(getUniqueData(data.emptyCallList));
																					$("#emptyCallsBadge").addClass("Add");
																					$("#favicon").attr("href","./resources/img/favicon2.ico");}
										else {$("#emptyCallsBadge").removeClass("Add");
										$("#favicon").attr("href","./resources/img/favicon.ico");}  });
  
  $.get(emptyFeedbackURL+moment().unix()*1000 +"/").done( function (data) {
		if (getUniqueData(data)>0) {	$("#emptyFeedbackBadge").text(getUniqueData(data));
										$("#emptyFeedbackBadge").addClass("Add");}
		else $("#emptyFeedbackBadge").removeClass("Add")});
}, 5000);

	drawAdditionalTags(); // отрисовка дополнительных тэгов звонка
	var commentsInfo = callsInfo = emptyCallsInfo = null;
	var outputCalls;
	var isManager=false;
	$('#IDforComments').keypress(function (e) { // обработка нажатия клавиши enter для вывода информации (при нажатии)
	 var key = e.which;
	 if (key == 13)   { getComments(); }
	});
	$('#magic').click(function(){ // МЭЭЭДЖИК, включение или отключение css'ки
	if   	( $('#colours').prop("disabled"))
			{ $('#colours').prop("disabled", false);}
	else 	{ $('#colours').prop("disabled", true);	}
	});
	$('#openQuestionLabel').click(function(){ // общий вопрос, кнопка, ввести ID = 100
		$('#IDNum').val(100); 
	});
	$('input[name="question"]').change(function(e){ // смена значения переменной при нажатии на другой вопрос
		questNum = $(this).attr("value");
	});
	$('input[name="category"]').change(function(e){ //смена значения переменной при нажатии на другую категорию
		catNum = $(this).attr("value");
	});
	$('#noteArea').change(function(e){ // обновить заметки при внесении каких-либо изменений
		updateNotes();
	});
	$('#IsManagerDiv').click(function(){ // проверка, нажата ли кнопка менеджер, если да - появляется кнопка Без ID, если нажата повторна - скрывается и обнуляется ID
		if (!$("#IsManager").prop("checked"))
				{$('#IsManagerAndNoID').addClass("Add");}
		else 	{$('#IsManagerAndNoID').removeClass("Add");
				 $('#IDNum').val("");}
	});
	$("#2299").click(function() { //Кнопка "Частник"
		if (chainId=="") { $('#serviceMessage').text("Выберите звонок"); } // если не выбран звонок - сервис-сообщение
		else { 	var comment = ($('#callComments').val()!="") ? $('#callComments').val() : "";
				dataArray = [chainId, -1, 9, 6, false, "UPDATED", JSON.parse("[]"), comment]; // стандартные данные на отправку, [чейн, -1, частник, частник, не менеджер, обновлен]
				fillData(dataArray); // заполнение корректной отправки инфы на сервер
				sentCall = true; // звонок отправлен
				clearData(); // очистка
				if (dayOrEmpty == "empty") // если отправка произошла из окна незаполненные
					{setTimeout(function(){$('#emptyCalls').click()}, 800);} // обнови
				else{setTimeout(function(){$("#dayCalls").click()}, 800);} // иначе - звонки за день
		}
	});
	$('#sendDataButton').click(function() { //Кнопка "Отправить"
		var correctInfo = true; // проверка корректности информации, по умолчанию вся информация корректна
		$("#JsonText").val("");
		$('#IDNum').removeClass("box-shadow");
		$('#questButtonGroup').removeClass("box-shadow");
		$('#catButtonGroup').removeClass("box-shadow"); // очистка информации, приведение к виду "по умолчанию"
		if (chainId=="") { $('#serviceMessage').text("Выберите звонок"); } // проверка выбран ли звонок
		else  {
			if (!$('[name="category"]').is(':checked')) { // проверка выбора категории
				correctInfo = false;
				$('#catButtonGroup').addClass("box-shadow");
			}
			if (!$('[name="question"]').is(':checked')) { // проверка выбора вопроса
				correctInfo = false;
				$('#questButtonGroup').addClass("box-shadow");
			}
			if ($('#IDNum').val()=="" || $('#IDNum').val()=="Введите ID") { // проверка заполнения ID
				correctInfo=false;
				$('#IDNum').addClass("box-shadow");
				$('#IDNum').attr('placeholder','Введите ID');
			}
			if (correctInfo) { // если данные корректны -
				$('#serviceMessage').text(""); // обнуление сервис сообщения
				collectTags($(this).attr("value")); // сбор тэгов
				var comment = ($('#callComments').val()!="") ? $('#callComments').val() : "";
				var isFeedback=($('#tag-4').is(':checked')||$("#IsHappyToggler").prop("checked")) ?"EMPTY_FEEDBACK":"UPDATED"; // если фидбек или недоволен -empty_feedback //криво	
				dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked"),isFeedback, JSON.parse(tagsString), comment]; // заполнение данных для отправки
				fillData(dataArray); // отправка
				sentCall=true; // звонок отправлен
				if (dayOrEmpty == "empty") // если отправка произошла из окна незаполненные
					{setTimeout(function(){$('#emptyCalls').click()}, 800);} // обнови
				else{setTimeout(function(){$("#dayCalls").click()}, 800);} // иначе - звонки за день
			} 	
			else{$('#serviceMessage').text("Введите корректные данные");} // данные некорректны
		}
	});
	$('li.hl').click(function(){ //Подсветка бокового меню
		$('li.hl').removeClass('highlight');
		$(this).toggleClass('highlight');
	});
	$("#Adder").click(function() { //Переключение класса "Добавить звонок"
		$("#SubForm").toggleClass("Add");
	});
	$('#emptyCalls').click(function() { //Кнопка "Мои звонки"
		drawAdditionalTags();
		dayOrEmpty = "empty"; // установка переменной для обновления страницы при отправке звонка
		clearData(); // очистка данных
		showMyEmptyCalls(); // отображение пустых звонков
	});
	$('#comments').click(function() { //Кнопка "Комментарии". Выключение заметок, переключение комментариев, тоже самое с треугольниками.
		addButton();
		$("#noteForm").removeClass("On");
		$("#commentForm").toggleClass("On");
		$('#glyphCom').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');	
		$('#glyphNote').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});
	$('#notes').click(function(){ //Кнопка "Заметки", тоже самое, что в комментах, только наоборот + подгрузка заметок
		$("#noteForm").toggleClass("On");
		$("#commentForm").removeClass("On");
		getNotes();
		$('#glyphNote').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');
		$('#glyphCom').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});
	$('#feedback').click(function() { //Кнопка "Фидбек"
		fillInfo("remove","Feedback", ""); //заполнение информации
		$("#FeedbackForm").addClass("Add");
		chainId=="";
		drawFeedback();
		createTagsTable();	
	});
});
// --- Завершение блока документ.реди
// --- Функции
function showMyEmptyCalls() { //Функция, отправляющая запрос по ws, получает данные JSON и отдает их на отрисовку draw()
	$("#MainForm").removeClass("col-md-6").addClass("col-md-12");
	sendWebSocketMessage("getMyEmptyCalls");
	if (sentCall) { $('#serviceMessage').text("Звонок отправлен");
					sentCall = false; } 
	else { $('#serviceMessage').text(""); }
	chainId = "";
	document.getElementById("CallForm").innerHTML = '';
	fillInfo("remove","Мои звонки", "");
	getWebsocketMessage(function(emptyCallsInfo){ draw(emptyCallsInfo); });
	$("#SubForm").addClass("Add");
}
//Стандартная отрисовка после нажатия на кнопку бокового меню, для удобства читабельности. Форма звонка(вкл\выкл), текст заголовка страницы, текст основного меню
function fillInfo(callForm, headerText, MainForm) {
	$("#MainForm").removeClass("col-md-12").addClass("col-md-6");
	$("#SubForm").removeClass("Add");
	$("#FeedbackForm").removeClass("Add");
	if (callForm==="add") { $("#CallForm").addClass("Add"); } 
	else { $("#CallForm").removeClass("Add"); }
	document.getElementById("HeaderText").innerHTML = headerText;
	document.getElementById("MainForm").innerHTML = MainForm;
	document.getElementById("Hello").innerHTML = '';
}
function getComments(){ // отрисовка комментариев
		idNumber = idSaver = $('#IDforComments').val(); // номер ID
		if (idNumber!=""){ // если не пустой
		$.get(getCommentsURL+idNumber).done(function (data) { // запрос
				document.getElementById("forComments").innerHTML = '';
				$('#IDforComments').removeClass("box-shadow");
				var outputComments = thead = tbot = ''; // обнуление инфы и объявление переменных
				var addComment = '<div class="row"><div class="col-lg-12">' +
					'<label for="addCommentBlock">Добавить комментарий</label></div></div>' +
					'<div class="row"><div class="col-lg-12"><div class="input-group"><textarea class="form-control" id="addCommentBlock" rows="3"></textarea>'+
					'<span class="input-group-addon btn btn-success" onclick=postComment()>+</span>'+
					'</div></div></div>'; // поле добавления комментария
				if (data.length != 0) { // если есть комментарии
					thead = '<div class="row"><div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th >Агент</th><th>Комментарий</th></tr></thead><tbody>'; // шапка
					tbot = '</tbody></table></div></div>'; // низ
					for (var i = 0; i < data.length; i++) { // тело
						var message = data[i].message;
						var nametag = data[i].agent.username;
						var timetag = moment.unix(data[i].postTime/1000).format(comFormat);
						var elem = document.getElementById("div-table-content-"+i);
						var isLongEnough = (message.length > 140) ? "longMessage" : "" ;
						outputComments += '<tr class="table-row"><td>'+timetag +'\n'+ nametag +'</td><td class="breakable"><div class="table-content '+isLongEnough+'" onclick=changeHeight('+i+') id="div-table-content-'+i+'">'+message+'</div></td></tr>';
					} // отрисовка комментариев
				} 
				else { outputComments='На данной учетной записи еще не оставляли комментариев'; } // если комментариев нет
				document.getElementById("forComments").innerHTML = thead + outputComments + tbot + addComment;
			})
		}
		else { $('#IDforComments').addClass("box-shadow"); }
}
function changeHeight(i){ // изменить высоту, если переполнено
	var elem = document.getElementById("div-table-content-"+i);
	var scrollHeight = elem.scrollHeight;
	var maxHeight = elem.style.maxHeight;
	maxHeight = maxHeight.substring(0, maxHeight.length-2);
	if (maxHeight > 60) {elem.style.maxHeight = 60 + 'px';elem.style.color = "blue"}
	else if (scrollHeight>60) {elem.style.maxHeight = scrollHeight + 'px';elem.style.color = "black"}
}
function collectTagForGetCalls(data){ // сбор тэгов для отрисовки в звонках пользователя
	var tags = "";
	for (var i=0;i<data.length;i++){ // цикл для сборки тэгов
	tags +=data[i].value + ' '; // сборка тэгов
}
return tags;
}
function collectAdditionalInfo(data, type){ // сбор дополнительной информации
	var additionalInfo = "";
	if (data.type == "EMPTY"){additionalInfo+="<span class='pull-right box-shadow addSpace'><a title='Информация еще не заполнена'>Не заполнен</a></span>";}
	else {
	var userID = data.avitoUserId; 
	var questionID = data.questionId;
	var catID = data.shopCategoryId; // переменные. Названия говорят сами за себя
	if (data.out == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Исходящий звонок'>Исх</a></span>";} // если исходяшка
	if (data.manager == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Менеджер'>М</a></span>";} // если менеджер
	if (userID == -1) { additionalInfo = "<span class='pull-right box-shadow addSpace'>"+Questions[questionID-1]+"</span>";} // частник
	else {additionalInfo += "<span class='pull-right box-shadow-blue addSpace'>"+Questions[questionID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>  "+Categories[catID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>ID:<a href='https://adm.avito.ru/users/user/info/"+userID+"' target=_blank>"+userID+"</a></span>"} // обычный звонок				
	if (type == "feedback") {}
	else {
	if (data.type == "FULL_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow-blue addSpace'><a title='Заполненный звонок с тэгом feedback'>F</a></span>"} // заполненный фидбек
	if (data.type == "EMPTY_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow addSpace'><a title='Незаполненный звонок с тэгом feedback'>F</a></span>"}} // пустой
	}
	return additionalInfo;
}
function clearData() { // Очистка данных в боковой форме
	$('#IDNum').removeClass("box-shadow");
	$('#questButtonGroup').removeClass("box-shadow");
	$('#catButtonGroup').removeClass("box-shadow");
	$('#serviceMessage').text("");
	$('#label-cat-1').removeClass('active').siblings().removeClass('active');
	$('input:radio[name=category]').each(function () { $(this).prop('checked', false); });
	$('#label-quest-1').removeClass('active').siblings().removeClass('active');
	$('input:radio[name=question]').each(function () { $(this).prop('checked', false); });
	$('label[name=addTags]').each(function () { $(this).removeClass('active'); });
	$('input:checkbox[name=addTags]').each(function () { $(this).prop('checked', false); });
	$('#IDNum').val("");
	$('#callComments').val("");
	$('#IsManagerAndNoID').removeClass("Add");
	if ($("#IsManager").prop("checked")) {
		$("#IsManager").prop("checked", false);
		$("#IsManager").bootstrapToggle('off');
	}
	if ($("#IsHappyToggler").prop("checked")){
		$("#IsHappyToggler").prop("checked", false);
		$("#IsHappyToggler").bootstrapToggle('off');
	}
}
function fillData(dataArray) { //Отправка данных из боковой формы на сервер
	var updateCall = {
			"agentId": agentId,
			"chainId": dataArray[0],
			"avitoUserId": dataArray[1],
			"questId": dataArray[2],
			"shopCategoryId": dataArray[3],
			"type": dataArray[5],
			"isManager": dataArray[4],
			"tags":  dataArray[6],
			"comments":  dataArray[7]
    }
	console.log(updateCall);
	RestPost(updateCall, updateEmptyCalls);
}
function change_call(CallInfo) { // Добавление стиля выбранного звонка
	console.log(CallInfo);
	var idd = '#divAddButton'+CallInfo[1]; // id + div, для сброса стилей
	var feedId = '#feedbackCall'+CallInfo[1]; // id + feedback, для сброса стилей
	tagBuffer = $(feedId).attr("value"); // сохранить сюда тэги
	$(idd).addClass('active').siblings().removeClass('active');
	$(feedId).addClass('active').siblings().removeClass('active'); // ИСПРАВИТЬ
	if ((CallInfo[0]!=chainId)&&(chainId!="")) { clearData(); } // если изменился звонок - очистить
	chainId = CallInfo[0];
	additionalTags =$(feedId).attr("name");
	var comments = (!($("#feedback-com"+CallInfo[1]).text()=="null" || $("#feedback-com"+CallInfo[1]).text()== "" ));
	if (comments) {$("#feedbackComment").val($("#feedback-com"+CallInfo[1]).text());}
}
function collectTags (feedOrCall){ // Проверка тегов, от фидбека или обычного звонка
	var choice = feedOrCall; 
	tagsString = "";
	$('input:checkbox[name='+choice+']').each( function (){ if ($(this).prop("checked")){tagsString +="{\"id\":" +$(this).attr("value") +"},";}}); // добавление инфы по тэгам
	var happyCheck = ($("#IsHappyToggler").prop("checked")) ? "{\"id\":" + unhappy +"}" : "{\"id\":" + happy +"}"; // добавление "счастья" клиента
	tagsString= "[" + tagsString + happyCheck + "]";
}
function postComment () { // отправка комментария
	var comment = {
        "avitoUserId":idSaver,
        "postTime": new Date().getTime(),
        "message": $('#addCommentBlock').val()
    }
	$('#addCommentBlock').removeClass("box-shadow"); 
	$('#IdforComments').removeClass("box-shadow"); // очистка
	var correctInfo = true; // проверка. По умолчанию - true
	if (idSaver == "") { correctInfo = false; 
	$('#IdforComments').addClass("box-shadow");}
	if ($('#addCommentBlock').val()== ""){ correctInfo = false; 
	$('#addCommentBlock').addClass("box-shadow"); } // если что-то не так - false + подсветка
	if (correctInfo){	// если все норм - отправка
	RestPost(comment, postCommentURL);
	setTimeout(function() {getComments();}, 800); 
	}
}
function  draw(data) { // отрисовка пустых звонков
	sorting(data.emptyCallList, "startTime"); // сортировка в обратном порядке
	agentId = data.agentId;
	agentName = data.agentName;
	console.log(data); 
	var nametag = data.agentName; // заполнение данных
	var outputEmptyCalls = '';
	if (data.emptyCallList.length==0){document.getElementById("MainForm").innerHTML = "Все звонки заполнены";} // если пусто - заглушка
	else { // иначе отрисовка звонков
		dayOrEmpty = "empty"; // для обновления страницы в дальнейшем
		var audioURL,audiosrc,chain; // переменные
		for (var i = 0; i < data.emptyCallList.length; i++) { // основной цикл заполнения инфы
			chain = data.emptyCallList[i].chainId;
			audiosrc = data.emptyCallList[i].comId;
            timetag = moment.unix(data.emptyCallList[i].startTime/1000).format(dateFormat); // определение переменных
			iJump = 0;
			var nextCall = collectMultipleCalls(data.emptyCallList, i, "short");
			var margin = (nextCall == "") ? "" : "no-margin-top";
			CallInfo = [chain, i, false];
			var audioURL = '<audio id="audio'+i+'" onplay=change_call('+JSON.stringify(CallInfo)+') src="' + oktell + audiosrc + '" class="audio-call '+margin+'" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>'; // аудио-тэг
			outputEmptyCalls += '<div id="divAddButton' +i+'" onclick=change_call('+JSON.stringify(CallInfo)+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag +'</span><br>' + nextCall + audioURL  + '</div>'; // основное заполнение
			i+=iJump;
		}
		document.getElementById("MainForm").innerHTML = outputEmptyCalls;
	}
	$("audio").each(function(){ //Функция по остановке всех остальных аудио-файлов
		$(this).bind("play",stopAll).bind("click",stopAll);
	});
}
function stopAll(e){ //Функция по остановке всех остальных аудио-файлов, stackoverflow спс
	var currentElementId=$(e.currentTarget).attr("id");
	$("audio").each(function(){
		var $this=$(this);
		var elementId=$this.attr("id");
		if (elementId!=currentElementId){$this[0].pause();}
	});
}
function updateNotes() { // обновление заметок
	var updateAgentNotes = {
        "id": agentId,
        "notes": $('#noteArea').val()
        }
	RestPost(updateAgentNotes, updateNotesURL);
} 
function getNotes() { // получение заметок
	$.get(getNotesURL+agentId).done(function (data) {$('#noteArea').val(data.notes);}
)}
function drawAdditionalTags(){ // отрисовка дополнительных тэгов
	$.get(tagGroupURL).done(function (data) { // запрос
		var ourID = outputTags = "";
		for (var i = 0; i<data.length;i++){ // цикл для нахождения тэгов un|happy и основной группы
			if 	(data[i].name == "Main") {ourID=data[i].id;}
			if  (data[i].name == "User satisfaction") { happy = data[i].tags[0].id; unhappy = data[i].tags[1].id;}
		}
		var iterations = Math.ceil(data[ourID].tags.length/4); // определяет количество строк
		var length = data[ourID].tags.length; // и количество тэгов
		var nextLine = 0;
				for (var i = 0; i<iterations;i++){ // цикл для строк
					if (length>=(i+1)*4) {nextLine=4;} // если количество тэгов больше чем цикл итерации*4 - рисуй полную строку из 4 элементов
					else {nextLine = length%4;} // если меньше - все что осталось
					outputTags += (nextLine>2) ?'<div class="btn-group col-lg-12" data-toggle="buttons" id=addTags-'+i+'>':"";
					for (j=0;j<nextLine;j++){ // цикл для тэгов
						var id = data[ourID].tags[i*4+j].id; // для сокращения
						if (nextLine < 3) switch(nextLine) {
						case 1:  // если один тэг, отступ, чтоб красиво
						outputTags +='<div class="btn-group col-lg-8 col-lg-offset-4" data-toggle="buttons" id=addTags-'+i+'>';	
						outputTags+='<label class="btn btn-avito-tags col-lg-6" name="addTags" id="label-tag-'+id+'">'+
									'<input type="checkbox" id="tag-'+id+'" name="addTags" autocomplete="off" value="'+id+'">'+data[ourID].tags[i*4+j].name +'</label>';
						break;
						case 2: // если два тэга, отступ, чтоб красиво
						if(j==0) {outputTags+='<div class="btn-group col-lg-8 col-lg-offset-2" data-toggle="buttons" id=addTags-'+i+'>';}
						outputTags+='<label class="btn btn-avito-tags col-lg-6" name="addTags" id="label-tag-'+id+'">'+
									'<input type="checkbox" id="tag-'+id+'" name="addTags" autocomplete="off" value="'+id+'">'+data[ourID].tags[i*4+j].name +'</label>';
						break;
						}
						else {outputTags+=	'<label class="btn btn-avito-tags col-lg-'+12/nextLine+'" name="addTags" id="label-tag-'+id+'">'+
											'<input type="checkbox" id="tag-'+id+'" name="addTags" autocomplete="off" value="'+id+'">'+data[ourID].tags[i*4+j].name +'</label>';
						}
					}
					outputTags +='</div>';
				}
				document.getElementById("additionalTagsDiv").innerHTML = outputTags;
			})
}