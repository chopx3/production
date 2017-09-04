var fullCallInfo;
var onlyEmptyCalls = false;
var timeStart = tempDate = moment().startOf('day').unix()*1000;
var timeEnd = todayEnd = moment().endOf('day').unix()*1000;
$(document).ready(function() { // отрисовка кнопки и календаря + очистка данных + звонки\ feedback бейджи
	$('#dayCalls').click(function() { // при нажатии - выбрать звонки за день, очистить инфу, поменять заголовок, отрисовать данные
			dayOrEmpty="day";
			clearData();
			var todayStart = moment().startOf('day').unix()*1000;
			drawAdditionalTags();
			console.log(timeStart);
			startSingleCalendar(timeStart);
			var options = {
				header : "Звонки за <a href=# onclick=startSingleCalendar("+todayStart+") id=todayLink name='ourLink'>сегодня</a>, <input type='text' value="+moment.unix(timeStart/1000).format("DD-MM-YYYY")+" name='chooseDay' style='width:150px;'/> ",
				fillingFormOn : true
			}
			fillInfo(options); // отрисовать заголовок с ссылками на день
			console.log(timeStart);
			drawBadges(); // отрисовать незаполненные звонки, нужно ли
		});
})
function drawDayCalls(timeStart, timeEnd){ // функция отрисовки звонков
	$.get(dayCallsURL+"/"+timeStart+"/"+timeEnd).done(function (data) { // запрос к базе
	sorting(data, 'timeStart'); // сортировка
	var nametag = dayCalls = "";
	var sideCounter = 0;
	if(data.length==0){ document.getElementById("mainForm").innerHTML = "Звонки не обнаружены :("; } // если не пусто
	else {	
			var emptyCallsButton = '<div class="col-lg-4 Add" id="onlyEmptyCallsDiv"> '+                         
			'<input type="checkbox" data-toggle="toggle" id="onlyEmptyCallsToggle" data-on="Незаполненные" data-off="Все звонки" data-offstyle="info btn-avito-blue float-right" data-onstyle="danger btn-avito-red float-right" data-width=130 data-size="small">  '+                              
			'</div>';
			var audioURL, audiosrc, chain, additionalInfo; // рисуй
			for (var i = 0; i < data.length; i++) { // основной цикл
			additionalInfo = collectAdditionalInfo(data[i], "today");		
			var tagArray = [];
			if (data[i].tags.length > 0) { // если есть тэги
				sorting(data[i].tags, "id");
			for (var j = 0; j < data[i].tags.length; j++) {
				 tagArray[j] = data[i].tags[j].id;} // сохранить их в эту переменную, чтобы не потерять при перезаполнении
			}			
			nametag = data[i].agent.username;//
			chain = data[i].chainId;//
			audiosrc = data[i].comId; //
			fullCallInfo = [agentId, nametag, data[i].avitoUserId, chain, data[i].manager, data[i].questionId, data[i].shopCategoryId, data[i].type, i, tagArray]; // заполнение переменных, сохранение в массив
			var onPlay = ' onplay=\'setInfoToFillingForm('+JSON.stringify(fullCallInfo)+')\'';
			var multipleCallsInfo = {
								data: data,
								counter: i,
								onPlayInfo: onPlay
							};
			var nextCall = collectMultipleCalls(multipleCallsInfo);
			timetag = moment.unix(data[i+iJump].timeStart/1000).format(dateFormat);//
			var margin = (nextCall == "") ? "" : "no-margin-top";
			var audioURL = '<audio class="audio-call '+margin+'" id="audio'+i+'" '+ onPlay +'  src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>'; // аудио тэг
			if (onlyEmptyCalls){ if (data[i].type == "EMPTY") {dayCalls+='<div id="receivedCall' +i+'" onclick=setInfoToFillingForm('+JSON.stringify(fullCallInfo)+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +'\t\t</span><span style="display:none" id=commentHide'+i+'>'+data[i].comments+'</span>'+ additionalInfo+'<br>' + nextCall + audioURL  + '</div>';
				sideCounter++;
				}
				i+=iJump; 
				}
			else{
			dayCalls += '<div id="receivedCall' +i+'" onclick=setInfoToFillingForm('+JSON.stringify(fullCallInfo)+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +'\t\t</span><span style="display:none" id=commentHide'+i+'>'+data[i].comments+'</span>'+ additionalInfo+'<br>' + nextCall + audioURL  + '</div>'; // основное заполнение звонка - звонок+аудио+доп инфа
			i+=iJump;
		}
		}
		var callSumIf = (onlyEmptyCalls) ? sideCounter : getUniqueData(data, "chainId");
		console.log(callSumIf);
		console.log(sideCounter);
		var callsSum = '<div class="row"><div class="col-lg-8" style="margin-top:5px;">Количество звонков за выбранный день: '+callSumIf+'</div>'+emptyCallsButton+'</div>';
		document.getElementById("mainForm").innerHTML = callsSum + dayCalls;
		var isEnabled = (onlyEmptyCalls) ? 'on' : 'off';
		$('#onlyEmptyCallsToggle').bootstrapToggle(isEnabled);
		$('div.float-right').css("float", "right");
	}
	$(function(){
	$('#onlyEmptyCallsToggle').change(function() {
	onlyEmptyCalls = $('#onlyEmptyCallsToggle').prop("checked");
	setTimeout(function(){ drawDayCalls(timeStart, timeEnd);}, 450);}) 
})
	$("audio").each(function(){ //Функция по остановке всех остальных аудио-файлов
		$(this).bind("play",stopAll).bind("click",stopAll);
	});
			})
}
function setInfoToFillingForm(fullCallInfo){ // функция выставления информации из звонка в боковую форму
	clearData(); // очистка
	var allTags = fullCallInfo[9]; // ---
	var idd = '#receivedCall'+fullCallInfo[8]; // ---
	var feedId = '#feedbackCall'+fullCallInfo[8];   //заполнение инфы 
	$(idd).addClass('active').siblings().removeClass('active'); // ---
	$(feedId).addClass('active').siblings().removeClass('active'); // подсветка
	chainId = fullCallInfo[3]; // ---
	additionalTags =$(feedId).attr("name"); // ---
	questNum = fullCallInfo[5]; // ---
	catNum = fullCallInfo[6]; //заполнение инфы 
	if (fullCallInfo[7] != "EMPTY") { // если не пустой звонок и не частник
	$('#label-quest-'+fullCallInfo[5]).addClass("active");  // установи кнопки, комментарии и ID в эти значения
	$("#quest-"+fullCallInfo[5]).prop('checked', true);	 // установи кнопки, комментарии и ID в эти значения
	$('#label-cat-'+fullCallInfo[6]).addClass("active");   // установи кнопки, комментарии и ID в эти значения
	$("#cat-"+fullCallInfo[6]).prop('checked', true); // установи кнопки, комментарии и ID в эти значения
	var comments = ($("#commentHide"+fullCallInfo[8]).text()=="null") ? "" : $("#commentHide"+fullCallInfo[8]).text();
	$("#callComments").val(comments); // установи кнопки, комментарии и ID в эти значения
	$("#IDNum").val(fullCallInfo[2]); // установи кнопки, комментарии и ID в эти значения
	if (fullCallInfo[4]) { // если менеджер - переключатель на менеджера
		$("#IsManager").prop("checked", true);
		$("#IsManager").bootstrapToggle('on');
		$('#IsManagerAndNoID').addClass("Add");
	}
	if (allTags.length > 0) { // если есть тэги
		for (var i = 0; i< allTags.length; i++)	{ 
			if (allTags[i]==unhappy) {$("#IsHappyToggler").prop("checked", true);
										$("#IsHappyToggler").bootstrapToggle('on');} // переключатель счастливости клиента, если есть тэг
			$('#label-tag-'+allTags[i]).addClass("active"); 
			$("#tag-"+allTags[i]).prop('checked', true); // установка дополнительных тэгов в активное положение 
		}
	}
	}
	if (fullCallInfo[2] == -1){
		$('#private').addClass("focus");
		console.log("private");
	}
}