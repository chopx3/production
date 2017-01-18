 var chainId="";
 var commentOrCallHandler;
 var idSaver;
 var dataArray;
 var sentCall=false;
 var httpHost = "192.168.10.132:8080";


 var getCommentsURL = "http://"+httpHost+'/shoptracker/rest/comment/get?userid=';
 var getCallsURL = "http://"+httpHost+"/shoptracker/rest/call/getcallsforaccount?userid=";
 var updateEmptyCalls = "http://"+httpHost +"/shoptracker/rest/call/update";

 $(document).ready(function() {
	 var commentsInfo = null;
	 var callsInfo = null;
	 var emptyCallsInfo = null;
	 var outputCalls;
	 var questNum="1";
	 var catNum="1";
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
					dataArray = [chainId, -1, 9, 6, false];
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
								dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked")];
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
				 $('#my_calls').click(function() {
					 showMyEmptyCalls();
			});

//Кнопка "Мои звонки"
	 function showMyEmptyCalls() {

		 websocket.send("getMyEmptyCalls");
		 if(sentCall) {
			 $('#serviceMessage').text("Звонок отправлен");
			 sentCall = false;
		 } else {
			 $('#serviceMessage').text("");
		 }
		 chainId = "";
		 document.getElementById("CallForm").innerHTML = '';
		 fillInfo("remove","Мои звонки", "");

		 websocket.onmessage = function (webSocketMessage) {
			 var emptyCallsInfo = JSON.parse(webSocketMessage.data);
			 draw(emptyCallsInfo);
		 };
		 websocket.onclose = function () {
			 document.getElementById("websocketStatus").innerHTML = "Offline";
		 };

		 websocket.onerror = function (err) {
			 document.getElementById("websocketStatus").innerHTML = "Error. "+err;
		 };
		 $("#SubForm").addClass("Add");
	 }


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
});

 // --- Завершение блока документ.реди

 // --- Функции

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
		$.get(getCommentsURL+idNumber+'&time=1483457133166')
		.done(function (data) {
			document.getElementById("MainForm").innerHTML = '';
			var commentsInfo = data;
			var commentsAsJSON = JSON.stringify(commentsInfo.result);
			var parsedComments = JSON.parse(JSON.parse(commentsAsJSON));
			var outputComments = '';
			if (parsedComments.records.length != 0) {
			for (var i = 0; i < parsedComments.records.length; i++) {
					var message = parsedComments.records[i][0];
					var nametag = parsedComments.records[i][1];
					var timetag = $.format.date(new Date().setTime(parsedComments.records[i][2]), 'dd/MM/yyyy@HH:mm:ss');				
					outputComments += '<div class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag + ' ' + nametag + '</span><p>' + message + '</p></div>';			
				}
			} else {
				outputComments='На данной учетной записи еще не оставляли комментариев';
			}
			document.getElementById("MainForm").innerHTML = outputComments;
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
				uChainId: dataArray[0],
				uAvitoUserId: dataArray[1],
				question : dataArray[2],
				shop_category : dataArray[3],
				isManager : dataArray[4]
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

// Добавление стиля выбранного звонка
function change_call(chain, i) {
	var idd = '#divAddButton'+i;
	$("#SubForm").addClass("Add");
	$(idd).addClass('woop').siblings().removeClass('woop');
	chainId = chain;
	clearData();
}

// Отрисовка пустых звонков
function  draw(emptyCallsInfo) {

	var nametag = emptyCallsInfo.agentName;
	var oktell = "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=";
	var outputEmptyCalls = '';

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