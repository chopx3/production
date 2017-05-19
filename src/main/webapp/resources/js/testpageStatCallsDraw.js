var Categories = Questions = [];
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
function getQuestionsInfo () { // получить массив вопросов
	$.get(getQuestionsInfoURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Questions[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}}
)}
function getCats () {// получить массив категорий
	$.get(getCatsURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Categories[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}}
)}
function getQuestions(value){ // добавить звонки по нажатию на show в статистике(вопросы)
		var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
		var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000; // установка времени для запроса
		$.get(getQuestionsURL +value+"/" + timeStart+"/" + timeEnd).done(function (data) { // запрос
					document.getElementById("secondTable").innerHTML = ""; 
					outputCalls =''; // очистка данных
					var callsInfo = data; 
						for (var i = 0; i < callsInfo.length; i++) { // цикл для построения списка звонков
							var audiotag = callsInfo[i].comId;
							var nametag = callsInfo[i].agent.username;
                            var timetag = moment.unix(callsInfo[i].timeStart/1000).format(dateFormat); // заполнение данных
							var audioURL = '<audio class="audio-call" src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>';
							outputCalls += '<div class="call col-lg-9" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span><span class="pull-right box-shadow-blue addSpace">'+ Questions[(callsInfo[i].questionId-1)] +'</span><span class="pull-right box-shadow-blue addSpace">'+ Categories[(callsInfo[i].shopCategoryId-1)] +'</span><span class="pull-right box-shadow-blue addSpace" >ID:'+admAvito+callsInfo[i].avitoUserId+'" target=_blank>'+ callsInfo[i].avitoUserId +'</a></span><br>' + audioURL + '</div>'; // получившийся код
						}					 
					document.getElementById("secondTable").innerHTML = outputCalls;
				})
}