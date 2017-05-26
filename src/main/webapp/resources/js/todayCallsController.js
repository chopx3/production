var fullCallInfo;
$(document).ready(function() { // получить вопросы и категории с базы
	getQuestionsInfo();
	getCats();
	$('#dayCalls').click(function() { // при нажатии - выбрать звонки за день, очистить инфу, поменять заголовок, отрисовать данные
			dayOrEmpty="day";
			clearData();
			drawAdditionalTags();
			fillInfo("remove","Звонки за сегодня", "");
			drawDayCalls();
			$("#SubForm").addClass("Add");
		});
})
function drawDayCalls(){ // функция отрисовки звонков
	var timeStart = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(moment().add(1,'days').format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000; // время для запроса 
	$.get(dayCallsURL+"/"+timeStart+"/"+timeEnd).done(function (data) { // запрос к базе
	sorting(data, 'timeStart'); // сортировка
	var nametag = dayCalls = "";	
	if(data.length==0){ document.getElementById("MainForm").innerHTML = "Сегодня еще не было звонков"; } // если не пусто
	else {	var audioURL, audiosrc, chain, additionalInfo; // рисуй
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
            timetag = moment.unix(data[i].timeStart/1000).format(dateFormat);//
			fullCallInfo = [agentId, nametag, data[i].avitoUserId, chain, data[i].manager, data[i].questionId, data[i].shopCategoryId, data[i].type, i, tagArray]; // заполнение переменных, сохранение в массив
			iJump = 0;
			var nextCall = collectMultipleCalls(data, i, "");
			var margin = (nextCall == "") ? "" : "no-margin-top";
			var audioURL = '<audio class="audio-call '+margin+'" id="audio'+i+'" onplay=setInfoToCallForm('+JSON.stringify(fullCallInfo)+') src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>'; // аудио тэг
			dayCalls += '<div id="divAddButton' +i+'" onclick=setInfoToCallForm('+JSON.stringify(fullCallInfo)+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +'\t\t</span><span style="display:none" id=commentHide'+i+'>'+data[i].comments+'</span>'+ additionalInfo+'<br>' + nextCall + audioURL  + '</div>'; // основное заполнение звонка - звонок+аудио+доп инфа
			i+=iJump;
		}
		document.getElementById("MainForm").innerHTML = dayCalls;
	}
	$("audio").each(function(){ //Функция по остановке всех остальных аудио-файлов
		$(this).bind("play",stopAll).bind("click",stopAll);
	});
			})
}
function setInfoToCallForm(fullCallInfo){ // функция выставления информации из звонка в боковую форму
	clearData(); // очистка
	var allTags = fullCallInfo[9]; // ---
	var idd = '#divAddButton'+fullCallInfo[8]; // ---
	var feedId = '#feedbackCall'+fullCallInfo[8];   //заполнение инфы 
	$(idd).addClass('active').siblings().removeClass('active'); // ---
	$(feedId).addClass('active').siblings().removeClass('active'); // подсветка
	chainId = fullCallInfo[3]; // ---
	additionalTags =$(feedId).attr("name"); // ---
	questNum = fullCallInfo[5]; // ---
	catNum = fullCallInfo[6]; //заполнение инфы 
	if (fullCallInfo[7] != "EMPTY" && fullCallInfo[2] > 0) { // если не пустой звонок и не частник
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
}