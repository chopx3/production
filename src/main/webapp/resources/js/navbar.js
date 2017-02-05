var chainId="";
var commentOrCallHandler;
var idSaver;
var dataArray;
var feedbackArray = [];
var commentArray = [];
var sentCall=false;
var httpHost = "192.168.9.91:8080/avito";
// var httpHost = "192.168.10.132:8080/avito";
var questNum="1";
var catNum="1";
var catTagNum="1";
var feedbackStr = "";
var agentId='';
var tagsString ="";
var getCommentsURL = "http://"+httpHost+'/rest/comment/get?userid=';
var getCallsURL = "http://"+httpHost+"/rest/call/getcallsforaccount?userid=";
var updateEmptyCalls = "http://"+httpHost +"/rest/call/update";
var postCommentUrl = "http://"+httpHost+'/rest/comment/put';
var oktell = "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=";
var feedbackUrl = "http://"+httpHost+"/avito/rest/call/feedback/put"


$(document).ready(function() {
	var commentsInfo = null;
	var callsInfo = null;
	var emptyCallsInfo = null;
	var outputCalls;

	var isManager=false;

//Вопрос
	$('input[name="question"]').change(function(e){
		questNum = $(this).attr("value");
	});

//Категория
	$('input[name="category"]').change(function(e){
		catNum = $(this).attr("value");
	});
//
	$('input[name="feed-cat"]').change(function(e){
		catTagNum = $(this).attr("value");
	});

//Кнопка "Частник"
	$("#2299").click(function() {
		if (chainId=="") {
			$('#serviceMessage').text("Выберите звонок");
		} else {
			collectTags($(this).attr("value"));
			//dataArray = [chainId, -1, 9, 6, false];
			dataArray = [chainId, -1, 9, 6, false, tagsString];
			fillData(dataArray);
			sentCall = true;
			clearData();
			setTimeout(function() {
				showMyEmptyCalls()
			}, 800);
		}
	});
//Кнопка "Отправить"
	$('#sendDataButton').click(function() {
		var catVal, IDVal, questVal;
		$("#JsonText").val("");
		$('#IDNum').css({ "border": ''});
		$('#questButtonGroup').css({"border":""});
		$('#catButtonGroup').css({"border":""});
		//Выделение красным неправильно введенных данных
		if (chainId=="") {
			$('#serviceMessage').text("Выберите звонок");
		} else  {
			if ($('[name="category"]').is(':checked')) {
				catVal = true;
			} else 	{
				catVal = false;
				$('#catButtonGroup').css({"border":"1px solid red"});
			}
			if($('[name="question"]').is(':checked')) {
				questVal = true;
			} else {
				questVal = false;
				$('#questButtonGroup').css({"border":"1px solid red"});
			}
			if ($('#IDNum').val()!="" && $('#IDNum').val()!="Введите ID") {
				IDVal=true;
			} else {
				IDVal=false;
				$('#IDNum').css({ "border": '#FF0000 1px solid'});
				$('#IDNum').attr('placeholder','Введите ID');
			}
			if(questVal&&IDVal&&catVal) {
				$('#serviceMessage').text("");
				collectTags($(this).attr("value"));
				//dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked")];
				dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked"), tagsString];
				fillData(dataArray);
				clearData();
				sentCall=true;
				setTimeout(function(){
					showMyEmptyCalls()
				}, 800);
			} else {
				$('#serviceMessage').text("Введите корректные данные");
			}
		}
	});
//Подсветка бокового меню
	$('li').click(function(){
		$('li').removeClass('highlight');
		$(this).toggleClass('highlight');
	});

//Переключение класса "Добавить звонок"
	$("#Adder").click(function() {
		$("#SubForm").toggleClass("Add");
	});
//Кнопка "Мои звонки"
	$('#my_calls').click(function() {
		showMyEmptyCalls();

	});

//Кнопка "Звонки пользователя"
	$('#user_calls').click(function() {
		fillInfo("add","Звонки пользователя", "");
		commentOrCallHandler = "call";
		addButton();
	});
	//Кнопка "Комментарии"
	$('#comments').click(function() {
		fillInfo("add","Комментарии", "");
		commentOrCallHandler = "comment";
		addButton();
	});
// Кнопка "Закрыть" для формы заполнения звонка
	$('#CloseSubForm').click(function() {
		$("#SubForm").removeClass("Add");
		$("#divAddButton0").removeClass('woop').siblings().removeClass('woop');
	});
//Кнопка "Заметки"
	$('#notes').click(function(){
		fillInfo("remove","Заметки", "В разразботке");
	});
//Кнопка "Фидбек"
	$('#feedback').click(function() {
		fillInfo("remove","Feedback", "В разразботке");
		$("#FeedbackForm").addClass("Add");
		drawFeedback();
	});
//Кнопка Сохранить на блоке Feedback
	$('#sendFeedbackButton').click(function() {
		collectTags($(this).attr("value"));
	});

});

// --- Завершение блока документ.реди

// --- Функции

//Функция, отправляющая запрос по ws, получает данные JSON и отдает их на отрисовку draw()
function showMyEmptyCalls() {

	sendWebSocketMessage("getMyEmptyCalls");

	if(sentCall) {
		$('#serviceMessage').text("Звонок отправлен");
		sentCall = false;
	} else {
		$('#serviceMessage').text("");
	}
	chainId = "";
	document.getElementById("CallForm").innerHTML = '';
	fillInfo("remove","Мои звонки", "");

	getWebsocketMessage(function(emptyCallsInfo){
		console.log("before draw")
		draw(emptyCallsInfo);
	});

	$("#SubForm").addClass("Add");
}

//Стандартная отрисовка после нажатия на кнопку бокового меню, для удобства читабельности. Форма звонка(вкл\выкл), текст заголовка страницы, текст основного меню
function fillInfo(callForm, headerText, MainForm) {
	$("#SubForm").removeClass("Add");
	$("#FeedbackForm").removeClass("Add");
	if(callForm==="add") {
		$("#CallForm").addClass("inactive");
	} else {
		$("#CallForm").removeClass("inactive");
	}

	$("#HeaderText").text(headerText);
	document.getElementById("MainForm").innerHTML = MainForm;
	document.getElementById("Hello").innerHTML = '';
}

// Функция для вывода информации по ID, звонки или комментарии.
function getInfo(){
	idNumber = $('#IDforInfo').val();
	idSaver = $('#IDforInfo').val();
	if (commentOrCallHandler == "call") {
		$.get(getCallsURL + idNumber + '&time=14838130170000')
			.done(
				function (data) {
					outputCalls ='';
					var callsInfo = data;
					document.getElementById("MainForm").innerHTML = '';
					var callsAsJSON = JSON.stringify(callsInfo.result);
					var parsedCalls = JSON.parse(JSON.parse(callsAsJSON));
					if (parsedCalls.records.length != 0&&idNumber!='') {
						for (var i = 0; i < parsedCalls.records.length; i++) {
							var audiotag = parsedCalls.records[i][0];
							var nametag = parsedCalls.records[i][1];
							var timetag = $.format.date(new Date().setTime(parsedCalls.records[i][2]), 'dd/MM/yyyy@HH:mm:ss');
							var audioURL = '<audio src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" ta1rget="_blank">' + '<\/a>';
							outputCalls += '<div class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +' '+nametag + '</span><br>' + audioURL + '</div>';
						}
					} else {
						outputCalls ='На данной учетной записи еще не было звонков';
					}
					document.getElementById("MainForm").innerHTML = outputCalls;
				})
			.fail(
				function () {
					console.log("---");
				});
	}
	if(commentOrCallHandler == "comment") {
		$.get(getCommentsURL+idNumber+'&time=14838130170000')
			.done(function (data) {
				document.getElementById("MainForm").innerHTML = '';
				var commentsInfo = data;
				var commentsAsJSON = JSON.stringify(commentsInfo.result);
				var parsedComments = JSON.parse(JSON.parse(commentsAsJSON));
				var outputComments = '';
				var thead = "";
				var tbot = "";
				var addComment = '<div class="row"><div class="col-lg-8">' +
					'<label for="addCommentBlock">Добавить комментарий</label></div></div>' +
					'<div class="row"><div class="col-lg-8"><div class="input-group"><textarea class="form-control" id="addCommentBlock" rows="3"></textarea>'+
					'<span class="input-group-addon btn btn-success" onclick=postComment()>+</span>'+
					'</div></div></div>';
				if (parsedComments.records.length != 0) {
					thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th style="width: 150px">Агент</th><th>Комментарий</th></tr></thead><tbody>';
					tbot = '</tbody></table></div></div>';
					for (var i = 0; i < parsedComments.records.length; i++) {
						var message = parsedComments.records[i][0];
						var nametag = parsedComments.records[i][1];
						var timetag = $.format.date(new Date().setTime(parsedComments.records[i][2]), 'dd.MM.yyyy HH:mm');
						outputComments += '<tr><td style="width: 150px">'+timetag +'\n'+ nametag +'</td><td class="breakable" >'+message+'</td></tr>'
					}
				} else {
					outputComments='На данной учетной записи еще не оставляли комментариев';
				}
				document.getElementById("MainForm").innerHTML = thead + outputComments + tbot + addComment;
			})
			.fail(function () {
					console.log("---");
				}
			);
	}
}

// Отрисовка кнопки для вывода комментариев\звонков
function addButton() {
	document.getElementById("CallForm").innerHTML =	'<div class="row">'
		+ '<div class="cell">'
		+ '<div class="form-group col-lg-6">'
		+ '<input type="number" class="form-control" id="IDforInfo" placeholder="ID учетной записи">'
		+ '</div>'
		+ '</div>'
		+ '<div class="cell">'
		+ '<div id="submit" class="btn-group col-lg-6" data-toggle="buttons">'
		+ '<button type="button" id="IDSubmit" class="btn btn-primary" onclick=getInfo()>GO </button>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
}

// Очистка данных в боковой форме
function clearData() {
	$('#IDNum').css({ "border": ''});
	$('#questButtonGroup').css({"border":""});
	$('#catButtonGroup').css({"border":""});
	$('#serviceMessage').text("");
	$('#label-cat-1').removeClass('active').siblings().removeClass('active');
	$('input:radio[name=category]').each(function () { $(this).prop('checked', false); });
	$('#label-quest-1').removeClass('active').siblings().removeClass('active');
	$('input:radio[name=question]').each(function () { $(this).prop('checked', false); });
	$('#label-tag-1').removeClass('active').siblings().removeClass('active');
	$('input:checkbox[name=addTags]').each(function () { $(this).prop('checked', false); });
	$('#IDNum').val("");

	if ($("#IsManager").prop("checked")) {
		$("#IsManager").click();
		$("#IsManager").prop("checked", false);
		$("#IsManager").click();
	}
}

//Отправка данных из боковой формы на сервер
function fillData(dataArray) {
	$("#JsonText").val("uChainId:"+dataArray[0]+",\n"+
		"uAvitoUserId:"+dataArray[1]+",\n"+
		"question:"+dataArray[2]+",\n"+
		"shop_category:"+dataArray[3]+",\n"+
		"isManager:"+dataArray[4]);

	$.get(
		updateEmptyCalls, {
			uAgentId: agentId,
			uChainId: dataArray[0],
			uAvitoUserId: dataArray[1],
			question : dataArray[2],
			shop_category : dataArray[3],
			isManager : dataArray[4]//,
			//tags : dataArray[5]
		}
	).done(
		function (response) {
			if (response.status != 'ok') {
				errorHandler(response.description);
			}
			console.log(response);
		}
	).fail(
		function () {
			errorHandler('Ошибка соединения с сервером.');
		}
	);
}
function fortesting()
{
	console.log(chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked"));
}
// Добавление стиля выбранного звонка
function change_call(chain, i) {
	var idd = '#divAddButton'+i;
	var feedId = '#feedbackCall'+i;
	console.log(chain);
	//$("#SubForm").addClass("Add");
	/*
	 callTags();
	 console.log(tagsString);
	 */
	$(idd).addClass('woop').siblings().removeClass('woop');
	$(feedId).addClass('woop').siblings().removeClass('woop'); // ИСПРАВИТЬ
	if ((chain!=chainId)&&(chainId!=""))
	{
		clearData();
	}
	chainId = chain;
	//fortesting();
}
//Проверка тегов
function collectTags (feedOrCall)
{
	console.log(feedOrCall);
	var choice = feedOrCall;
	tagsString = "";
	$('input:checkbox[name='+choice+']').each(function ()
	{
		if ($(this).prop("checked"))
		{
			tagsString +=$(this).attr("value") + " ";
		}
	});
	console.log(tagsString);
}
//Comments
function postComment () {
	commentArray =[idSaver,new Date().getTime(),$('#addCommentBlock').val(), agentId];
	console.log(commentArray);

	$.post(
		postCommentUrl, {
			userid: commentArray[0],
			time: commentArray[1],
			message: commentArray[2],
			author: commentArray[3]
		}
	).done(
		function (response) {
			if (response.status != 'ok') {
				errorHandler(response.description);
			}
			console.log(response);
		}
	).fail(
		function () {
			errorHandler('Ошибка соединения с сервером.');
		}
	);
	getInfo();
}

// Отрисовка пустых звонков
function  draw(emptyCallsInfo) {
	agentId = emptyCallsInfo.agentId;
	console.log(agentId);
	var nametag = emptyCallsInfo.agentName;
	var outputEmptyCalls = '';
	if(emptyCallsInfo.emptyCallList.length!=0)
	{
		var audioURL,addButton,audiosrc,chain;
		for (var i = 0; i < emptyCallsInfo.emptyCallList.length; i++) {
			chain = emptyCallsInfo.emptyCallList[i].chainId;
			audiosrc = emptyCallsInfo.emptyCallList[i].comId;
			timetag = $.format.date(new Date().setTime(emptyCallsInfo.emptyCallList[i].startTime), 'dd/MM/yyyy@HH:mm:ss');
			addButton = '<a href="#"  class="btn btn-success" id="' + chain + '" onclick=change_call(this.id,'+i+') style="float:right;"> Выбрать </a>';
			var audioURL = '<audio id="audio'+i+'" onplay=change_call("'+chain+'",'+i+') src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>';
			outputEmptyCalls += '<div id="divAddButton' +i+'" onclick=change_call("'+chain+'",'+i+') class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +' '+nametag +'\t\t' + addButton + '</span><br>' + audioURL + '</div>';
		}
		document.getElementById("MainForm").innerHTML = outputEmptyCalls;
	}
	else
	{
		document.getElementById("MainForm").innerHTML = "Все звонки заполнены, молодец";

	}
//Функция по остановке всех остальных аудио-файлов
	$("audio").each(function(){
		$(this).bind("play",stopAll);
	});
}
function stopAll(e){
	var currentElementId=$(e.currentTarget).attr("id");
	$("audio").each(function(){
		var $this=$(this);
		var elementId=$this.attr("id");
		if(elementId!=currentElementId){
			$this[0].pause();
		}
	});
}
function drawFeedback() {
	/*$.get("http://192.168.11.87:8080/shoptracker/rest/call/feedback/get?tags=feedback")
	 .done(
	 function (data) {

	 var feedbackInfo = data;*/
	var outputEmptyCalls = "";
	var feedbackInfo = {"fields":[{"table":"calls","name":"com_id","type":"VARCHAR"},{"table":"calls","name":"avito_link","type":"BIGINT"},{"table":"calls","name":"time_begin","type":"BIGINT"},{"table":"calls","name":"tags","type":"VARCHAR"},{"table":"calls","name":"comments","type":"VARCHAR"},{"table":"users","name":"user_name","type":"VARCHAR"},{"table":"shop_category","name":"description","type":"VARCHAR"},{"table":"question","name":"description","type":"VARCHAR"}],"records":[["ABCD-ABCD-1fdszz",1939992,1485246354000,"vas ",null,"dokunev","Недвижимость","Блокировка (отклонение) объявления"],["ABCD-ABCD-1fdszs",1939992,1485421663000,"vas ",null,"dokunev","Недвижимость","Блокировка (отклонение) объявления"],["223AE161-C5B9-4221-9775-338241DDB7C3",1939992,1485425051000,"lf,vas","","dokunev","General","Платные услуги и Кошелек Avito"],["383977A6-E35C-4D6A-87A6-9997BDCEECAC",1939992,1485425051000,"lf,vas","","dokunev","General","Платные услуги и Кошелек Avito"]]};
	console.log(feedbackInfo);
	/*var feedbackInfoAsJSON = JSON.stringify(feedbackInfo);
	 console.log(feedbackInfoAsJSON);
	 var parsedFeedbackInfo = JSON.parse(JSON.parse(feedbackInfoAsJSON));
	 console.log(parsedFeedbackInfo);
	 */
	if(feedbackInfo.records.length!=0)
	{
		//var com_id, user_id, timestamp, tags, comment, agent;
		var callInfo = [];
		var timetag,audioURL;
		for (var i = 0; i < feedbackInfo.records.length; i++) {
			for (var j = 0; j< 6;j++) {
				callInfo[j] = feedbackInfo.records[i][j];
			}
			timetag = $.format.date(new Date().setTime(callInfo[2]), 'dd/MM/yyyy@HH:mm:ss');
			audioURL = '<audio id="audio'+i+'" src="' + oktell + callInfo[0] + '" onplay=change_call("'+callInfo[0]+'",'+i+') controls></audio><a href="'+ oktell + callInfo[0] +'" target="_blank">' + '</a>';
			outputEmptyCalls += '<div id="feedbackCall' +i+'" onclick=change_call("'+callInfo[0]+'",'+i+') class="history" data-time="'+timetag+'" data-sign="'+callInfo[5]+'"><span class="history-info">'+ timetag +' '+ callInfo[5] + '</span><br>' + audioURL + '</div>';
		}
		document.getElementById("MainForm").innerHTML = outputEmptyCalls;
	}
	else
	{
		document.getElementById("MainForm").innerHTML = "Все звонки заполнены, молодец";
	}
	$("audio").each(function(){
		$(this).bind("play",stopAll);
	});
	$("#feedbackCall0").bind("click",stopAll).siblings().bind("click",stopAll);
}
//)}
function postFeedback () {
	feedbackArray =[idSaver,new Date().getTime(),$('#addCommentBlock').val(), agentId];
	console.log(feedbackArray);
	/*

	 $.get(
	 feedbackUrl, {
	 comment: feedbackArray[0],
	 tags: feedbackArray[1],
	 userId: feedbackArray[2],
	 chainId: feedbackArray[3]
	 }
	 ).done(
	 function (response) {
	 if (response.status != 'ok') {
	 errorHandler(response.description);
	 }
	 console.log(response);
	 }
	 ).fail(
	 function () {
	 errorHandler('Ошибка соединения с сервером.');
	 }
	 );
	 */setTimeout(function() {
		drawFeedback();
	}, 800);
}