var getQuestionsInfoUrl = host+"/api/question/find";
var getCatsUrl = host+"/api/category/find";
var Categories = [];
var Questions = [];
var fullCallInfo;
$(document).ready(function() {
	$('#dayCalls').click(function() {
			dayOrEmpty="day";
			clearData();
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
	 var timeStart = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(moment().add(1,'days').format("DD-MM-YYYY"), "DD-MM-YYYY").unix()*1000; 
	
	$.get(dayCallsURL+"/"+timeStart+"/"+timeEnd)
			.done(function (data) {
	sorting(data, 'timeStart');
	var nametag = agentId = "";
	var dayCalls = '';
	
	if(data.length==0){
		document.getElementById("MainForm").innerHTML = "Сегодня еще не было звонков";
	}
	else {
		agentId = data[0].agent.id;
		var audioURL,audiosrc,chain, com, userID, questionID, catID, additionalInfo;
		for (var i = 0; i < data.length; i++) {
			additionalInfo = "";
			if (data[i].out == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Исходящий звонок'>Исх</a></span>";}
			if (data[i].manager == true) { additionalInfo += "<span class='pull-right box-shadow-blue addSpace'><a title='Менеджер'>М</a></span>";}
			if (data[i].type == "EMPTY") { additionalInfo += "<span class='pull-right box-shadow addSpace'>Не заполнен</span>";}
			else { 
				userID = data[i].avitoUserId; questionID = data[i].questionId; catID = data[i].shopCategoryId;
				if (userID == -1) { additionalInfo = "<span class='pull-right box-shadow addSpace'>"+Questions[questionID-1]+"</span>";}
				else {additionalInfo += "<span class='pull-right box-shadow-blue addSpace'>"+Questions[questionID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>  "+Categories[catID-1]+"</span><span class='pull-right box-shadow-blue addSpace'>ID:<a href='https://adm.avito.ru/users/user/info/"+userID+"' target=_blank>"+userID+"</a></span>"}
			}
			if (data[i].type == "FULL_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow-blue addSpace'><a title='Заполненный звонок с тэгом feedback'>F</a></span>"}
			if (data[i].type == "EMPTY_FEEDBACK") { additionalInfo+= "<span class='pull-right box-shadow addSpace'><a title='Незаполненный звонок с тэгом feedback'>F</a></span>"}
			var tagArray = [];
			if (data[i].tags.length > 0) {
				sorting(data[i].tags, "id")
				var count = 0;
			for (var j = 0; j < data[i].tags.length; j++) {
				if (data[i].tags[j].id < 5){ tagArray[count] = data[i].tags[j].id; count++;}				
			}
			console.log(tagArray);
			}
			
			nametag = data[i].agent.username;
			chain = data[i].chainId;
			com = data[i].comId;
			audiosrc = data[i].comId;
			//<span class="pull-right">'+ userID +'</span><span class="pull-right">'+ Questions[questionID-1] +'</span><span class="pull-right">'+ Categories[catID-1] +'</span>
            timetag = moment.unix(data[i].timeStart/1000).format(dateFormat);
			fullCallInfo = [agentId, nametag, userID, chain, data[i].manager, questionID, catID, data[i].type, i, tagArray];
			var audioURL = '<audio id="audio'+i+'" onplay=setInfoToCallForm('+JSON.stringify(fullCallInfo)+') src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>';
			dayCalls += '<div id="divAddButton' +i+'" onclick=setInfoToCallForm('+JSON.stringify(fullCallInfo)+') class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +'\t\t</span>'+ additionalInfo+'<br>' + audioURL + '</div>';
		}
		document.getElementById("MainForm").innerHTML = dayCalls;
		console.log(fullCallInfo);
	}
//Функция по остановке всех остальных аудио-файлов
	$("audio").each(function(){
		$(this).bind("play",stopAll);
	});

			})
}
function setInfoToCallForm(fullCallInfo){
	var allTags = fullCallInfo[9];
	var idd = '#divAddButton'+fullCallInfo[8];
	var feedId = '#feedbackCall'+fullCallInfo[8];
	tagBuffer = $(feedId).attr("value");
	$(idd).addClass('woop').siblings().removeClass('woop');
	$(feedId).addClass('woop').siblings().removeClass('woop'); // ИСПРАВИТЬ
	if ((fullCallInfo[3]!=chainId)&&(chainId!=""))	{
		clearData();
	}
	chainId = fullCallInfo[3];
	additionalTags =$(feedId).attr("name");
	 console.log(chainId);
	if (fullCallInfo[7] != "EMPTY" && fullCallInfo[2] > 0) { 
	$('#label-quest-'+fullCallInfo[5]).addClass("active");  
	$("#quest-"+fullCallInfo[5]).prop('checked', true); 
	$('#label-cat-'+fullCallInfo[6]).addClass("active");  
	$("#cat-"+fullCallInfo[6]).prop('checked', true); 
	$("#IDNum").val(fullCallInfo[2]); 
	if (fullCallInfo[4]) {

		$("#IsManager").prop("checked", true);
		$("#IsManager").click();
	}
	if (allTags.length > 0) {
		for (var i = 0; i< allTags.length; i++)	{
			$('#label-tag-'+allTags[i]).addClass("active");  
			$("#tag-"+allTags[i]).prop('checked', true); 
		}
	}
	}
}