var getQuestionsInfoUrl = host+"/api/question/find";
var getCatsUrl = host+"/api/category/find";
var Categories = [];
var Questions = [];
$(document).ready(function() {
	$('#dayCalls').click(function() {
			getQuestionsInfo();
			getCats();
			fillInfo("remove","Звонки за сегодня", "");
			drawDayCalls();
			$("#SubForm").addClass("Add");
		});
})
function getQuestionsInfo () {
	$.get(getQuestionsInfoUrl)
	 .done(
	 function (data) {
		// console.log(data);
		 var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Questions[i]=(desc.length>=18)? desc.substr(0,16)+"..": desc;
		}
		 }
)}
function getCats () {//типа юмор, Categories -> Cats, смешно, да?
	$.get(getCatsUrl)
	 .done(
	 function (data) {
		 var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Categories[i]=(desc.length>=20)? desc.substr(0,20)+"...": desc;
		}
		 }
)}
function drawDayCalls(){
	/* var timeStart = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(moment().add(1,'days').format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000; */
	var timeStart = moment(moment().subtract(40,'days').format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(moment().subtract(39,'days').format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000;
	$.get(dayCallsURL+"/"+timeStart+"/"+timeEnd)
			.done(function (data) {
	sorting(data, 'timeStart');
	var nametag = agentId = "";
	var outputEmptyCalls = '';
	if(data.length==0){
		document.getElementById("MainForm").innerHTML = "Сегодня еще не было звонков";
	}
	else {
		var audioURL,audiosrc,chain, userID, questionID, catID, additionalInfo;
		for (var i = 0; i < data.length; i++) {
			additionalInfo = "";
			
			if (data[i].type == "EMPTY") { additionalInfo = "<span class='pull-right box-shadow addSpace'>Не заполнен</span>";}
			else { 
				userID = data[i].avitoUserId; questionID = data[i].questionId; catID = data[i].shopCategoryId;
				if (userID == -1) { additionalInfo = "<span class='pull-right box-shadow addSpace'>"+Questions[questionID-1]+"</span>";}
				else {additionalInfo += "<span class='pull-right box-shadow-blue addSpace'>"+Questions[questionID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>  "+Categories[catID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>ID: <a href='https://adm.avito.ru/users/user/info/"+userID+"' target=_blank>"+userID+"</a></span>"}
			}
			if (data[i].type == "FULL_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow-blue addSpace'><a title='Заполненный звонок с тэгом feedback'>F</a></span>"}
			if (data[i].type == "EMPTY_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow addSpace'><a title='Незаполненный звонок с тэгом feedback'>F</a></span>"}
			
			agentId = data[i].agent.agentId;
			nametag = data[i].agent.username;
			chain = data[i].chainId;
			audiosrc = data[i].comId;
			//<span class="pull-right">'+ userID +'</span><span class="pull-right">'+ Questions[questionID-1] +'</span><span class="pull-right">'+ Categories[catID-1] +'</span>
            timetag = moment.unix(data[i].timeStart/1000).format(dateFormat);
			var audioURL = '<audio id="audio'+i+'" onplay=change_call("'+chain+'",'+i+') src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>';
			outputEmptyCalls += '<div id="divAddButton' +i+'" onclick=change_call("'+chain+'",'+i+') class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +'\t\t</span>'+ additionalInfo+'<br>' + audioURL + '</div>';
		}
		document.getElementById("MainForm").innerHTML = outputEmptyCalls;
	}
//Функция по остановке всех остальных аудио-файлов
	$("audio").each(function(){
		$(this).bind("play",stopAll);
	});

			})
}