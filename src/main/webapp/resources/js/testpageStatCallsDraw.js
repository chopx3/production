var Categories = [];
var Questions = [];
function getQuestionsInfo () {
	$.get(getQuestionsInfoUrl)
	 .done(
	 function (data) {
		// console.log(data);
		 var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Questions[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}
		 }
)}
function getCats () {//типа юмор, Categories -> Cats, смешно, да?
	$.get(getCatsUrl)
	 .done(
	 function (data) {
		// console.log(data);
		 var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Categories[i]=(desc.length>=20)? desc.substr(0,20)+"...": desc;
		}
		 }
)}
function getQuestions(value){
		var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
		var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000;
		$.get(getQuestionsUrl +value+"/" + timeStart+"/" + timeEnd)
			.done(
				function (data) {
					document.getElementById("secondTable").innerHTML = "";
					outputCalls ='';
					var callsInfo = data;
					if (callsInfo.length != 0) {
						for (var i = 0; i < callsInfo.length; i++) {
							var audiotag = callsInfo[i].comId;
							var nametag = callsInfo[i].agent.username;
                            var timetag = moment.unix(callsInfo[i].timeStart/1000).format(dateFormat);
							var audioURL = '<audio class="audio-call" src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>';
							outputCalls += '<div class="call col-lg-9" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span><span class="pull-right box-shadow-blue addSpace">'+ Questions[(callsInfo[i].questionId-1)] +'</span><span class="pull-right box-shadow-blue addSpace">'+ Categories[(callsInfo[i].shopCategoryId-1)] +'</span><span class="pull-right box-shadow-blue addSpace" >ID:<a href="https://adm.avito.ru/users/user/info/'+callsInfo[i].avitoUserId+'" target=_blank>'+ callsInfo[i].avitoUserId +'</a></span><br>' + audioURL + '</div>';
						}
					} else {
						outputCalls ='На данной учетной записи еще не было звонков';
					}
					document.getElementById("secondTable").innerHTML = outputCalls;
				})
			.fail(
				function () {
					console.log("---");
				});
}