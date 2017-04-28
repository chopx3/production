var chainId="";
var commentOrCallHandler;
var idSaver;
var dataArray;
var feedbackArray = [];
var commentArray = [];
var sentCall=false;
var noteArray = [];
var httpHost = location.host+'/firecatcher';
var questNum=1;
var catNum=1;
var catTagNum="1";
var feedbackStr = "";
var agentId="";
var tagsString ="";
var getCommentsURL = "http://"+httpHost+'/api/comments/find/';
var getCallsURL = "http://"+httpHost+"/api/call/find/user/";
var updateEmptyCalls = "http://"+httpHost +"/api/call/update";
var postCommentUrl = "http://"+httpHost+'/api/comments/save';
var oktell = "http://"+httpHost+"/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
var feedbackUrl = "http://"+httpHost+"/api/call/feedback/save"
var getFeedbackForAgent = "http://"+httpHost+"/api/call/find/type/empty_feedback/1/";
var getNotesUrl = 'http://' + httpHost + '/api/agent/find/id/';
var updateNotesUrl = 'http://' + httpHost + '/api/agent/notes/update';
var tagBuffer="";
var tagGroupUrl = 'http://' + httpHost + '/api/taggroup/find';
var additionalTags;
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
var comFormat = 'DD.MM.YY HH:mm';
var RestPost = function(sendData, url) {
            $.ajax({
                url: url,
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(sendData), //Stringified Json Object
                async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
                cache: false,    //This will force requested pages not to be cached by the browser
                processData: false, //To avoid making query String instead of JSON
                success: function (resposeJsonObject) {
                    // Success Action
                },
                error: function (message) {
                    alert(message)
                }
            });
    };


$(document).ready(function() {
	var commentsInfo = null;
	var callsInfo = null;
	var emptyCallsInfo = null;
	var outputCalls;
	var isManager=false;
$('#IDforComments').keypress(function (e) {
 // console.log("clicked");
 var key = e.which;
 if(key == 13)   {
   getComments();
  }
});
$('#magic').click(function(){
if ($('#colours').prop("disabled")){
	// console.log(true);
	$('#colours').prop("disabled", false);
}
else {
	$('#colours').prop("disabled", true);
	// console.log(false);
}
});

//Вопрос
	$('input[name="question"]').change(function(e){
		questNum = $(this).attr("value");
	});

//Категория
	$('input[name="category"]').change(function(e){
		catNum = $(this).attr("value");
	});
//Заметки
	$('#noteArea').change(function(e){
		// console.log($('#noteArea').val());
		updateNotes();
	});
//Кнопка "Частник"
	$("#2299").click(function() {
		if (chainId=="") {
			$('#serviceMessage').text("Выберите звонок");
		} else {
			dataArray = [chainId, -1, 9, 6, false, "UPDATED"];
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
				//console.log($('input[value="4"]').is(':checked'));
				var isFeedback=($('#tag-feedback').is(':checked')) ?"EMPTY_FEEDBACK":"UPDATED";
			
				dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked"),isFeedback, JSON.parse(tagsString)];
				// console.log(dataArray);
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
	$('li.hl').click(function(){
		$('li.hl').removeClass('highlight');
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
		commentOrCallHandler = "comment";
		addButton();
		$("#noteForm").removeClass("Add");
		$("#commentForm").toggleClass("Add");
		$('#glyphCom').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');	
		$('#glyphNote').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});
//Кнопка "Заметки"
	$('#notes').click(function(){
		$("#noteForm").toggleClass("Add");
		getNotes();
		$("#commentForm").removeClass("Add");
		$('#glyphNote').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');
		$('#glyphCom').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});
//Кнопка "Фидбек"
	$('#feedback').click(function() {
		fillInfo("remove","Feedback", "");
		$("#FeedbackForm").addClass("Add");
		//clearFeedback();???
		chainId=="";
		drawFeedback();
		createTagsTable();	
	});
//

//Кнопка Сохранить на блоке Feedback
$('#sendFeedbackButton').click(function() {
		var commentVal, tagVal;
		$('#feedbackComment').css({ "border": ''});
		$('#TagLabel').css({"color":"black"});
		$('#commentLabel').css({"color":"black"});
		// console.log(chainId);
		//Выделение красным неправильно введенных данных
		if (chainId=="") {
			$('#serviceFeedbackMessage').text("Выберите звонок").css({"color":"red"});
			tagVal = false;
			commentVal=false;
		} else  {
			if($('[name="feedTags"]').is(':checked')) {
				tagVal = true;
			} else {
				tagVal = false;
				$('#TagLabel').css({"color":"red"});
			}
			if ($('#feedbackComment').val()!="") {
				commentVal=true;
			} else {
				commentVal=false;
				$('#commentLabel').css({"color":"red"});
				$('#feedbackComment').css({ "border": '#FF0000 1px solid'});
			}
			if(tagVal&&commentVal) {
				$('#serviceFeedbackMessage').text("").css({"color":"black"});
				collectTags($(this).attr("value"));
				postFeedback();
				setTimeout(function(){
					clearFeedback();
					drawFeedback();
				}, 800);
				// console.log("--:");
			} else {
				$('#serviceFeedbackMessage').text("Введены не все данные").css({"color":"red"});
			}
		}
		// console.log(commentVal + ' ' + tagVal);
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
		// console.log(emptyCallsInfo);
		draw(emptyCallsInfo);
	});
	$("#SubForm").addClass("Add");
}

//Стандартная отрисовка после нажатия на кнопку бокового меню, для удобства читабельности. Форма звонка(вкл\выкл), текст заголовка страницы, текст основного меню
function fillInfo(callForm, headerText, MainForm) {
	$("#SubForm").removeClass("Add");
	//$("#noteForm").removeClass("Add");
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


function getComments(){
		idNumber = $('#IDforComments').val();
		idSaver = $('#IDforComments').val();
		if (idNumber!="")
		{
			$('#IDforComments').css({ "border": ''});
		$.get(getCommentsURL+idNumber)
			.done(function (data) {
				document.getElementById("forComments").innerHTML = '';
				$('#IDforComments').css({ "border": ''});
				var commentsInfo = data;
				var outputComments = '';
				var thead = "";
				var tbot = "";
				var addComment = '<div class="row"><div class="col-lg-12">' +
					'<label for="addCommentBlock">Добавить комментарий</label></div></div>' +
					'<div class="row"><div class="col-lg-12"><div class="input-group"><textarea class="form-control" id="addCommentBlock" rows="3"></textarea>'+
					'<span class="input-group-addon btn btn-success" onclick=postComment()>+</span>'+
					'</div></div></div>';
				if (commentsInfo.length != 0) {
					thead = '<div class="row"><div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th >Агент</th><th>Комментарий</th></tr></thead><tbody>';
					tbot = '</tbody></table></div></div>';
					for (var i = 0; i < commentsInfo.length; i++) {
						var message = commentsInfo[i].message;
						var nametag = commentsInfo[i].agent.username;
                        var timetag = moment.unix(commentsInfo[i].postTime/1000).format(comFormat);

						outputComments += '<tr><td>'+timetag +'\n'+ nametag +'</td><td class="breakable" >'+message+'</td></tr>'
					}
				} else {
					outputComments='На данной учетной записи еще не оставляли комментариев';
				}
				document.getElementById("forComments").innerHTML = thead + outputComments + tbot + addComment;
			})
			.fail(function () {
					console.log("---");
				}
			);
		}
		else {
			$('#IDforComments').css({ "border": '1px solid red'});
		}
	}
// Функция для вывода информации по ID, звонки или комментарии.
function getCalls(){
	// console.log();
	idNumber = $('#IDforInfo').val();
	idSaver = $('#IDforInfo').val();
		$.get(getCallsURL + idNumber+"/0")
			.done(
				function (data) {
					outputCalls ='';
					var callsInfo = data;
					document.getElementById("MainForm").innerHTML = '';
					if (callsInfo.length != 0&&idNumber!='') {
						for (var i = 0; i < callsInfo.length; i++) {
							var audiotag = callsInfo[i].comId;
							var nametag = callsInfo[i].agent.username;
                            var timetag = moment.unix(callsInfo[i].timeStart/1000).format(dateFormat);
							var audioURL = '<audio src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>';
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
// Отрисовка кнопки для вывода комментариев\звонков
function addButton() {
	document.getElementById("CallForm").innerHTML =	'<div class="row">'
			+ '<div class="col-lg-8">'
			+ '<div class="input-group goButton">'
				+ '<input type="number" class="form-control" id="IDforInfo" placeholder="ID учетной записи" autofocus>'
				+ '<span class="input-group-addon btn btn-success" id="IDSubmit" onclick=getCalls()>GO</span>'
			+ '</div>'
			+ '</div>'
		+ '</div>'; 
$('#IDforInfo').keypress(function (e) {
 // console.log("clicked");
 var key = e.which;
 if(key == 13)  // the enter key code
  {
   getCalls();
  }
});
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
	$('label[name=addTags]').each(function () { $(this).removeClass('active'); });
	$('input:checkbox[name=addTags]').each(function () { $(this).prop('checked', false); });
	$('#IDNum').val("");

	if ($("#IsManager").prop("checked")) {
		$("#IsManager").click();
		$("#IsManager").prop("checked", false);
		$("#IsManager").click();
	}
}
function clearFeedback() {
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', false); });
	$('label[name=info-label]').removeClass('blueOne');
	$('#feedbackComment').val("");
	$('#serviceFeedbackMessage').text("").css({"color":"black"});
}
//Отправка данных из боковой формы на сервер
function fillData(dataArray) {
	var updateCall = {
			"agentId": agentId,
			"chainId": dataArray[0],
			"avitoUserId": dataArray[1],
			"questId": dataArray[2],
			"shopCategoryId": dataArray[3],
			"type": dataArray[5],
			"isManager": dataArray[4],
			"tags":  dataArray[6]
    }
	RestPost(updateCall, updateEmptyCalls);
}
function fortesting()
{
	// console.log(chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked"));
}
// Добавление стиля выбранного звонка
function change_call(chain, i) {
	var idd = '#divAddButton'+i;
	var feedId = '#feedbackCall'+i;
	tagBuffer = $(feedId).attr("value");
	$(idd).addClass('woop').siblings().removeClass('woop');
	$(feedId).addClass('woop').siblings().removeClass('woop'); // ИСПРАВИТЬ
	if ((chain!=chainId)&&(chainId!=""))
	{
		clearData();
	}
	chainId = chain;
	additionalTags =$(feedId).attr("name");
	// console.log(additionalTags);
	//fortesting();
}
//Проверка тегов
function collectTags (feedOrCall)
{
	// console.log(feedOrCall);
	var choice = feedOrCall;
	tagsString = "";
	$('input:checkbox[name='+choice+']').each(function ()
	{
		if ($(this).prop("checked"))
		{
			tagsString +="{\"id\":" +$(this).attr("value") +"},";
		}
	});
	tagsString= "[" + tagsString.substring(0, tagsString.length - 1) + "]";
	//console.log(tagsString+ $("#feedbackComment").val());
}
//Comments
function postComment () {
	var comment = {
        "avitoUserId":idSaver,
        "postTime": new Date().getTime(),
        "message": $('#addCommentBlock').val()
    }
	if (idSaver != "") {
		// console.log("I'm here");
		if ($('#addCommentBlock').val()!= "")
		{
		
	RestPost(comment, postCommentUrl);
	$('#addCommentBlock').css({ "border": ''});
	$('#IdforComments').css({ "border": ''});
	setTimeout(function() {
	getComments();
	}, 800);
	}
	else {
		$('#addCommentBlock').css({ "border": '1px solid red'});
	}
	}
	else {
		$('#IdforComments').css({ "border": '1px solid red'});
	}
}

// Отрисовка пустых звонков
function  draw(emptyCallsInfo) {
	agentId = emptyCallsInfo.agentId;
	var nametag = emptyCallsInfo.agentName;
	var outputEmptyCalls = '';
	if(emptyCallsInfo.emptyCallList.length==0)
	{
		document.getElementById("MainForm").innerHTML = "Все звонки заполнены";
	}
	else {
		var audioURL,addButton,audiosrc,chain;
		for (var i = 0; i < emptyCallsInfo.emptyCallList.length; i++) {
			chain = emptyCallsInfo.emptyCallList[i].chainId;
			audiosrc = emptyCallsInfo.emptyCallList[i].comId;
            timetag = moment.unix(emptyCallsInfo.emptyCallList[i].startTime/1000).format(dateFormat);
			addButton = '<a href="#"  class="btn btn-success" id="' + chain + '" onclick=change_call(this.id,'+i+') style="float:right;"> Выбрать </a>';
			var audioURL = '<audio id="audio'+i+'" onplay=change_call("'+chain+'",'+i+') src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>';
			outputEmptyCalls += '<div id="divAddButton' +i+'" onclick=change_call("'+chain+'",'+i+') class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +' '+nametag +'\t\t' + addButton + '</span><br>' + audioURL + '</div>';
		}
		document.getElementById("MainForm").innerHTML = outputEmptyCalls;
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
	var timeNow = moment().unix()*1000;
	// console.log(timeNow);
	$.get(getFeedbackForAgent+timeNow+"/")
	 .done(
	function (data) {
	var feedbackInfo = data;
	sorting(feedbackInfo, 'timeStart');
	var chainId = "";
	var outputEmptyCalls = "";
	// console.log(feedbackInfo);
	if(feedbackInfo.length==0) 	{
		document.getElementById("MainForm").innerHTML = "Все звонки заполнены";
		
	}
	else { 
		var callInfo = [];
		var timetag,audioURL;
		
		//var com_id, chain_id, user_id, timestamp, tags, comment, agent, shop_category, question;
		for (var i = 0; i < feedbackInfo.length; i++) {
			var tagCollector ="";
			for (var j=0;j<feedbackInfo[i].tags.length;j++){
				tagCollector +='{\"id\":' + feedbackInfo[i].tags[j].id + '},';
			}
            timetag = moment.unix(feedbackInfo[i].timeStart/1000).format(dateFormat);
			audioURL = '<audio id="audio'+i+'" src="' + oktell + feedbackInfo[i].comId + '" onplay=change_call("'+feedbackInfo[i].chainId+'",'+i+') controls></audio><a href="'+ oktell + feedbackInfo[i].chainId +'" target="_blank">' + '</a>';
			outputEmptyCalls += '<div id="feedbackCall' +i+'" onclick=change_call("'+feedbackInfo[i].chainId+'",'+i+') class="history" data-time="'+timetag+'" data-sign="'+feedbackInfo[i].agent.username+'" value="'+ feedbackInfo[i].type+'" name='+ tagCollector +'><span class="history-info">'+ timetag +' '+ feedbackInfo[i].agent.username + '</span><br>' + audioURL + '</div>';
		}
		document.getElementById("MainForm").innerHTML = outputEmptyCalls;		
	}
	$("audio").each(function(){
		$(this).bind("play",stopAll);
	});
	$("#feedbackCall0").bind("click",stopAll).siblings().bind("click",stopAll);
}
)}
function postFeedback () {
	var updateFeedbackCall = {
		"agentId": agentId,
		"chainId" : chainId,
        "comments":$('#feedbackComment').val(),
        "tags": JSON.parse(outputTags),
		"type": "FULL_FEEDBACK"
        }
		// console.log(updateFeedbackCall);
	RestPost(updateFeedbackCall, feedbackUrl);
}
function updateNotes() {
	var updateAgentNotes = {
        "id":agentId,
        "notes": $('#noteArea').val()
        }
	RestPost(updateAgentNotes, updateNotesUrl);
} 
function getNotes () {
	$.get(getNotesUrl+agentId)
	 .done(
	 function (data) {
		 // console.log(data);
		 var noteInfo = data.notes;
		$('#noteArea').val(noteInfo);
		 }
)}
function sorting(json_object, key_to_sort_by) {
    function sortByKey(a, b) {
        var x = a[key_to_sort_by];
        var y = b[key_to_sort_by];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }

    json_object.sort(sortByKey);
}





