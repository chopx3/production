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
							var audioURL = '<audio src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>';
							outputCalls += '<div class="history col-lg-9" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +' '+nametag + '</span><span class="pull-right" style="border:1px solid transparent; border-radius:8px; padding: 0px 2px;box-shadow: inset 0 0 0.2em black;max-width:160px;overflow:hidden;">'+ Questions[(callsInfo[i].questionId-1)] +'</span><span class="pull-right" style="border:1px solid transparent; border-radius:8px; padding: 0px 2px;box-shadow: inset 0 0 0.2em black;">'+ Categories[(callsInfo[i].shopCategoryId-1)] +'</span><span class="pull-right" style="border:1px solid transparent; border-radius:8px; padding: 0px 2px;box-shadow: inset 0 0 0.2em black;">ID:'+ callsInfo[i].avitoUserId +'</span><br>' + audioURL + '</div>';
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