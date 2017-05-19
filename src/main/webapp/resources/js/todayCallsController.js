var Categories = Questions = [];
var fullCallInfo;
$(document).ready(function() { // получить вопросы и категории с базы
	getQuestionsInfo();
	getCats();
	$('#dayCalls').click(function() { // при нажатии - выбрать звонки за день, очистить инфу, поменять заголовок, отрисовать данные
			dayOrEmpty="day";
			clearData();
			fillInfo("remove","Звонки за сегодня", "");
			drawDayCalls();
			$("#SubForm").addClass("Add");
		});
})
function getQuestionsInfo () { // вопросы
	$.get(getQuestionsInfoURL).done( function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Questions[i]=(desc.length>=18)? desc.substr(0,16)+"..": desc;
		} }
)}
function getCats () {//категории
	$.get(getCatsURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Categories[i]=(desc.length>=20)? desc.substr(0,20)+"...": desc;
		} }
)}
function drawDayCalls(){ // функция отрисовки звонков
	var timeStart = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(moment().add(1,'days').format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000; // время для запроса 
	$.get(dayCallsURL+"/"+timeStart+"/"+timeEnd).done(function (data) { // запрос к базе
	sorting(data, 'timeStart'); // сортировка
	var nametag = agentId = dayCalls = "";	
	if(data.length==0){ document.getElementById("MainForm").innerHTML = "Сегодня еще не было звонков"; } // если не пусто
	else {	agentId = data[0].agent.id; // рисуй
			var audioURL, audiosrc, chain, com, userID, questionID, catID, additionalInfo;
			for (var i = 0; i < data.length; i++) { // основной цикл
			additionalInfo = "";
			if (data[i].out == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Исходящий звонок'>Исх</a></span>";} // исходящий
			if (data[i].manager == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Менеджер'>М</a></span>";} // Менеджер
			if (data[i].type == "EMPTY") { additionalInfo += "<span class='pull-right box-shadow addSpace'>Не заполнен</span>";} // пустой
			else { 	userID = data[i].avitoUserId; questionID = data[i].questionId; catID = data[i].shopCategoryId; //заполненный звонок
					if (userID == -1) { additionalInfo = "<span class='pull-right box-shadow addSpace'>"+Questions[questionID-1]+"</span>";} // как частник
					else {additionalInfo += "<span class='pull-right box-shadow-blue addSpace'>"+Questions[questionID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>  "+Categories[catID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>ID:<a href='https://adm.avito.ru/users/user/info/"+userID+"' target=_blank>"+userID+"</a></span>"} // не как частник, основной блок добавления дополнительной информации
			}
			if (data[i].type == "FULL_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow-blue addSpace'><a title='Заполненный звонок с тэгом feedback'>F</a></span>"}
			if (data[i].type == "EMPTY_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow addSpace'><a title='Незаполненный звонок с тэгом feedback'>F</a></span>"}
			var tagArray = [];
			if (data[i].tags.length > 0) { // если есть тэги
				sorting(data[i].tags, "id");
			for (var j = 0; j < data[i].tags.length; j++) {
				 tagArray[j] = data[i].tags[j].id;} // сохранить их в эту переменную, чтобы не потерять при перезаполнении
			}			
			nametag = data[i].agent.username;//
			chain = data[i].chainId;//
			com = data[i].comId;//
			audiosrc = data[i].comId; //
            timetag = moment.unix(data[i].timeStart/1000).format(dateFormat);//
			fullCallInfo = [agentId, nametag, userID, chain, data[i].manager, questionID, catID, data[i].type, i, tagArray]; // заполнение переменных, сохранение в массив
			var audioURL = '<audio class="audio-call" id="audio'+i+'" onplay=setInfoToCallForm('+JSON.stringify(fullCallInfo)+') src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>'; // аудио тэг
			dayCalls += '<div id="divAddButton' +i+'" onclick=setInfoToCallForm('+JSON.stringify(fullCallInfo)+') class="call col-lg-12" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +'\t\t</span>'+ additionalInfo+'<br>' + audioURL + '</div>'; // основное заполнение звонка - звонок+аудио+доп инфа
		}
		document.getElementById("MainForm").innerHTML = dayCalls;
	}
	$("audio").each(function(){ //Функция по остановке всех остальных аудио-файлов
		$(this).bind("play",stopAll);
	});
			})
}
function setInfoToCallForm(fullCallInfo){ // функция выставления информации из звонка в боковую форму
	clearData(); // очистка
	var allTags = fullCallInfo[9]; // ---
	var idd = '#divAddButton'+fullCallInfo[8]; // ---
	var feedId = '#feedbackCall'+fullCallInfo[8];   // ---
	tagBuffer = $(feedId).attr("value");//заполнение инфы 
	$(idd).addClass('active').siblings().removeClass('active'); // ---
	$(feedId).addClass('active').siblings().removeClass('active'); // подсветка
	chainId = fullCallInfo[3]; // ---
	additionalTags =$(feedId).attr("name"); // ---
	questNum = fullCallInfo[5]; // ---
	catNum = fullCallInfo[6]; //заполнение инфы 
	if (fullCallInfo[7] != "EMPTY" && fullCallInfo[2] > 0) { // если не пустой звонок и не частник
	$('#label-quest-'+fullCallInfo[5]).addClass("active");   // ---
	$("#quest-"+fullCallInfo[5]).prop('checked', true);	 // ---
	$('#label-cat-'+fullCallInfo[6]).addClass("active");   // ---
	$("#cat-"+fullCallInfo[6]).prop('checked', true);  // ---
	$("#IDNum").val(fullCallInfo[2]); // установи кнопки и ID в эти значения
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