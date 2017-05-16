var chainId="";
var commentOrCallHandler;
var idSaver;
var dataArray;
var feedbackArray = [];
var commentArray = [];
var sentCall=false;
var noteArray = [];
var host = "http://"+location.host+"/firecatcher";
var questNum=1;
var catNum=1;
var catTagNum="1";
var feedbackStr = "";
var agentId="";
var tagsString ="";
var getCommentsURL = host+'/api/comments/find/';
var getCallsURL = host+"/api/call/find/user/";
var updateEmptyCalls = host +"/api/call/update";
var postCommentUrl = host+'/api/comments/save';
var oktell = host+"/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
var feedbackUrl = host+"/api/call/feedback/save"
var getFeedbackForAgent = host+"/api/call/find/type/empty_feedback/1/";
var getNotesUrl = host + '/api/agent/find/id/';
var updateNotesUrl = host + '/api/agent/notes/update';
var tagBuffer="";
var tagGroupUrl = host + '/api/taggroup/find';
var tagUrl = host + '/api/tags/find';
var dayCallsURL = host + '/api/call/find/agent/';
var additionalTags;
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
var comFormat = 'DD.MM.YY HH:mm';
var dayOrEmpty;
var isHappy = true;
var happy = unhappy = 0;
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
	drawAdditionalTags();
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
$('#openQuestionLabel').click(function(){
	$('#IDNum').val(100); 
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
	$('#IsManagerDiv').click(function(){
		if (!$("#IsManager").prop("checked")){
			console.log("wop");
		$('#IsManagerAndNoID').addClass("Add");
		}
		else {$('#IsManagerAndNoID').removeClass("Add");console.log("bop"); $('#IDNum').val(""); }
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
		$('#IDNum').removeClass("box-shadow");
		$('#questButtonGroup').removeClass("box-shadow");
		$('#catButtonGroup').removeClass("box-shadow");
		//Выделение красным неправильно введенных данных
		if (chainId=="") {
			$('#serviceMessage').text("Выберите звонок");
		} else  {
			if ($('[name="category"]').is(':checked')) {
				catVal = true;
			} else 	{
				catVal = false;
				$('#catButtonGroup').addClass("box-shadow");
			}
			if($('[name="question"]').is(':checked')) {
				questVal = true;
			} else {
				questVal = false;
				$('#questButtonGroup').addClass("box-shadow");
			}
			if ($('#IDNum').val()!="" && $('#IDNum').val()!="Введите ID") {
				IDVal=true;
			} else {
				IDVal=false;
				$('#IDNum').addClass("box-shadow");
				$('#IDNum').attr('placeholder','Введите ID');
			}
			if(questVal&&IDVal&&catVal) {
				$('#serviceMessage').text("");
				collectTags($(this).attr("value"));
				//console.log($('input[value="4"]').is(':checked'));
				var isFeedback=($('#tag-4').is(':checked')) ?"EMPTY_FEEDBACK":"UPDATED";
			
				dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked"),isFeedback, JSON.parse(tagsString)];
				// console.log(dataArray);
				fillData(dataArray);
				clearData();
				sentCall=true;
				if (dayOrEmpty == "empty"){
					setTimeout(function(){
					showMyEmptyCalls()
				}, 800);
				}
				else {
				setTimeout(function(){
					$("#dayCalls").click()
				}, 800);
				}
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
		dayOrEmpty = "empty";
		clearData();
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
		$("#noteForm").removeClass("On");
		$("#commentForm").toggleClass("On");
		$('#glyphCom').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');	
		$('#glyphNote').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});
//Кнопка "Заметки"
	$('#notes').click(function(){
		$("#noteForm").toggleClass("On");
		getNotes();
		$("#commentForm").removeClass("On");
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
	$("#FeedbackForm").removeClass("Add");
	if(callForm==="add") {
		$("#CallForm").addClass("Add");
	} else {
		$("#CallForm").removeClass("Add");
	}

	$("#HeaderText").text(headerText);
	document.getElementById("MainForm").innerHTML = MainForm;
	document.getElementById("Hello").innerHTML = '';
}


function getComments(){
		idNumber = $('#IDforComments').val();
		idSaver = $('#IDforComments').val();
		if (idNumber!=""){
			$('#IDforComments').removeClass("box-shadow");
		$.get(getCommentsURL+idNumber)
			.done(function (data) {
				document.getElementById("forComments").innerHTML = '';
				$('#IDforComments').removeClass("box-shadow");
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
			$('#IDforComments').addClass("box-shadow");
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
						var audioURL, userID, questionID, catID, additionalInfo;
						for (var i = 0; i < callsInfo.length; i++) {
							additionalInfo = "";
							if (data[i].out == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Исходящий звонок'>Исх</a></span>";}
							if (data[i].manager == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Менеджер'>М</a></span>";}
								userID = data[i].avitoUserId; questionID = data[i].questionId; catID = data[i].shopCategoryId;
								if (userID == -1) { additionalInfo = "<span class='pull-right box-shadow addSpace'>"+Questions[questionID-1]+"</span>";}
								else {additionalInfo += "<span class='pull-right box-shadow-blue addSpace'>"+Questions[questionID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>  "+Categories[catID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>ID:<a href='https://adm.avito.ru/users/user/info/"+userID+"' target=_blank>"+userID+"</a></span>"}
							
							if (data[i].type == "FULL_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow-blue addSpace'><a title='Заполненный звонок с тэгом feedback'>F</a></span>"}
							if (data[i].type == "EMPTY_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow addSpace'><a title='Незаполненный звонок с тэгом feedback'>F</a></span>"}
							var audiotag = callsInfo[i].comId;
							var nametag = callsInfo[i].agent.username;
                            var timetag = moment.unix(callsInfo[i].timeStart/1000).format(dateFormat);
							audioURL = '<audio class="audio-call" src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>';
							outputCalls += '<div class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span>'+additionalInfo+'<br>' + audioURL + '</div>';
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
	$(idd).addClass('active').siblings().removeClass('active');
	$(feedId).addClass('active').siblings().removeClass('active'); // ИСПРАВИТЬ
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
	var happyCheck = ($("#IsHappyToggler").prop("checked")) ? "{\"id\":" + unhappy +"}" : "{\"id\":" + happy +"}";
	tagsString= "[" + tagsString + happyCheck + "]";
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
	$('#addCommentBlock').removeClass("box-shadow");
	$('#IdforComments').removeClass("box-shadow");
	setTimeout(function() {
	getComments();
	}, 800);
	}
	else {
		$('#addCommentBlock').addClass("box-shadow");
	}
	}
	else {
		$('#IdforComments').addClass("box-shadow");
	}
}

// Отрисовка пустых звонков
function  draw(emptyCallsInfo) {
	sorting(emptyCallsInfo.emptyCallList, "startTime");
	agentId = emptyCallsInfo.agentId;
	var nametag = emptyCallsInfo.agentName;
	var outputEmptyCalls = '';
	if(emptyCallsInfo.emptyCallList.length==0)
	{
		document.getElementById("MainForm").innerHTML = "Все звонки заполнены";
	}
	else {
		dayOrEmpty = "empty";
		var audioURL,addButton,audiosrc,chain;
		for (var i = 0; i < emptyCallsInfo.emptyCallList.length; i++) {
			chain = emptyCallsInfo.emptyCallList[i].chainId;
			audiosrc = emptyCallsInfo.emptyCallList[i].comId;
            timetag = moment.unix(emptyCallsInfo.emptyCallList[i].startTime/1000).format(dateFormat);
			addButton = '<a href="#"  class="btn btn-success pull-right" id="' + chain + '" onclick=change_call(this.id,'+i+') "> Выбрать </a>';
			var audioURL = '<audio id="audio'+i+'" onplay=change_call("'+chain+'",'+i+') src="' + oktell + audiosrc + '" class="audio-call" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>';
			outputEmptyCalls += '<div id="divAddButton' +i+'" onclick=change_call("'+chain+'",'+i+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag +'\t\t' + addButton + '</span><br>' + audioURL + '</div>';
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
			audioURL = '<audio class="audio-call" id="audio'+i+'" src="' + oktell + feedbackInfo[i].comId + '" onplay=change_call("'+feedbackInfo[i].chainId+'",'+i+') controls></audio><a href="'+ oktell + feedbackInfo[i].chainId +'" target="_blank">' + '</a>';
			outputEmptyCalls += '<div id="feedbackCall' +i+'" onclick=change_call("'+feedbackInfo[i].chainId+'",'+i+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+feedbackInfo[i].agent.username+'" value="'+ feedbackInfo[i].type+'" name='+ tagCollector +'><span>'+ timetag +' '+ feedbackInfo[i].agent.username + '</span><br>' + audioURL + '</div>';
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
function drawAdditionalTags(){
	$.get(tagGroupUrl)
	.done(function (data) {
		var ourID = outputTags = "";

		for (var i = 0; i<data.length;i++){
			if 	(data[i].name == "Main") {ourID=data[i].id;}
			if  (data[i].name == "User satisfaction") { happy = data[i].tags[0].id; unhappy = data[i].tags[1].id;}
		}
		var iterations = Math.ceil(data[ourID].tags.length/4);
		var length = data[ourID].tags.length;
		var nextLine = 0;
				for (var i = 0; i<iterations;i++){
					if(length>=(i+1)*4) {nextLine=4;}
					else {nextLine = length%4;}
					
					for (j=0;j<nextLine;j++){
						var id = data[ourID].tags[i*4+j].id;
						outputTags+=	'<label class="btn btn-avito-tags col-lg-'+12/nextLine+'" name="addTags" id="label-tag-'+id+'">'+
										'<input type="checkbox" id="tag-'+id+'" name="addTags" autocomplete="off" value="'+id+'">'+data[ourID].tags[i*4+j].name +
										'</label>';
					}
				}
				document.getElementById("additionalTagsDiv").innerHTML = outputTags;
				console.log(happy);
				console.log(unhappy);
			})
}
