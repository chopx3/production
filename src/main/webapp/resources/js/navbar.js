
var chainId="";
var commentOrCallHandler;
var idSaver;
var dataArray;
var tagsArray = [];
var commentArray = [];
var sentCall=false;
// var httpHost = "192.168.10.132:8080";
var httpHost = "192.168.11.87:8085";
var questNum="1";
var catNum="1";
var agentId='';
var tagsString;
var getCommentsURL = "http://"+httpHost+'/shoptracker/rest/comment/get?userid=';
var getCallsURL = "http://"+httpHost+"/shoptracker/rest/call/getcallsforaccount?userid=";
var updateEmptyCalls = "http://"+httpHost +"/shoptracker/rest/call/update";
var postCommentUrl = "http://"+httpHost+'/shoptracker/rest/comment/put';

$(document).ready(function() {
	var commentsInfo = null;
	var callsInfo = null;
	var emptyCallsInfo = null;
	var outputCalls;

	var isManager=false;

	//Вопрос
	$('input[name="question"]').change(function(e){
		questNum = e.target.id.substr(6,1);
	});

	//Категория
	$('input[name="category"]').change(function(e){
		catNum = e.target.id.substr(4,1);
	});

	//Кнопка "Частник"
	$("#2299").click(function() {
		if (chainId=="") {
			$('#serviceMessage').text("Выберите звонок");
		} else {
			// callTags();
			dataArray = [chainId, -1, 9, 6, false];
			//dataArray = [chainId, -1, 9, 6, false, tagsString];
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
		//callTags(tagsArray, 4);
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
				callTags();
				// dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked")];
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

	tagsArray.join(",")
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
	// Кнопка "Закрыть" внизу бокового меню
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
	});

//Стандартная отрисовка после нажатия на кнопку бокового меню, для удобства читабельности. Форма звонка(вкл\выкл), текст заголовка страницы, текст основного меню

});


// --- Завершение блока документ.реди
// --- Функции

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
		draw(emptyCallsInfo);
	});

	$("#SubForm").addClass("Add");
}

function fillInfo(callForm, headerText, MainForm) {
	$("#SubForm").removeClass("Add");
	if(callForm=="add") {
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
	var oktell = "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=";
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
							var audiotag = oktell+parsedCalls.records[i][0];
							var nametag = parsedCalls.records[i][1];
							var timetag = $.format.date(new Date().setTime(parsedCalls.records[i][2]), 'dd/MM/yyyy@HH:mm:ss');
							var audioURL = '<audio src="' + audiotag + '" controls></audio><a href="'+ audiotag +'" ta1rget="_blank">' + '<\/a>';
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

	console.log(dataArray[5]);
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
			isManager : dataArray[4],
			tags : dataArray[5].join(",")
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
	$("#SubForm").addClass("Add");
	/*
	 callTags();
	 console.log(tagsString);
	 */
	$(idd).addClass('woop').siblings().removeClass('woop');
	if ((chain!=chainId)&&(chainId!=""))
	{
		clearData();
	}
	chainId = chain;
	//fortesting();

}
//Проверка тегов
function callTags ()
{
	tagsString=[];
	$('input:checkbox[name=addTags]').each(function ()
	{
		if ($(this).prop("checked"))
		{
			tagsString.push(this.value);
		}
	});
	console.log()
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
	var oktell = "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=";
	var outputEmptyCalls = '';
	if(emptyCallsInfo.emptyCallList.length!=0)
	{
		for (var i = 0; i < emptyCallsInfo.emptyCallList.length; i++) {
			var chain = emptyCallsInfo.emptyCallList[i].chainId;
			var audiosrc = emptyCallsInfo.emptyCallList[i].comId;
			var timetag = $.format.date(new Date().setTime(emptyCallsInfo.emptyCallList[i].startTime), 'dd/MM/yyyy@HH:mm:ss');
			var addButton = '<a href="#"  class="btn btn-success" id="' + chain + '" onclick=change_call(this.id,'+i+') style="float:right;"> Выбрать </a>';
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
}