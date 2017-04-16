var catNum = 6;
var httpHost = location.host+'/firecatcher';
var Call = "";
var Comment = "";
var Tags = "";
var Categories = [];
var getCatsUrl = "http://"+httpHost+"/api/category/find";
var oktell = "http://"+httpHost+"/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
var getFeedbackForAgent = "http://"+httpHost+"/api/call/find/type/full_feedback/";
$(document).ready(function() {
	getCats();
	$('input[name="category"]').change(function(e){
		catNum = $(this).attr("value");
	});
});
function getCats () {//типа юмор, Categories -> Cats, смешно, да?
	$.get(getCatsUrl)
	 .done(
	 function (data) {
		 console.log(data);
		 var catInfo = data;
		for (var i=0;i<catInfo.length;i++){
			Categories[i]=catInfo[i].description;
		}
		console.log(Categories);
		 }
)}

function smth(){
		TagConsole();
		calendarConsole();
		console.log(catNum);
		getCalls();
	};
function getCalls(){
	console.log(startDate + "," + endDate);
	var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000;
	console.log(timeStart + "," + timeEnd);
	idNumber = $('#IDforInfo').val();
	idSaver = $('#IDforInfo').val();
		$.get(getFeedbackForAgent+timeStart+"/"+timeEnd+"/")
			.done(
				function (data) {
					Call ='';
					var callsInfo =  data;
					document.getElementById("MainForm").innerHTML = '';
					var callInfo = [];
					var parsedCalls = data;
					console.log(parsedCalls);
					if (parsedCalls.length != 0) {
						for (var i = 0; i < parsedCalls.length; i++) {
							/*for (var j = 0; j< parsedCalls.fields.length;j++) {																
									callInfo[j] = parsedCalls.records[i][j];
								}	*/
							var tagCollector ="";
							var tagCheck=false;
							activeTagsCheck = activeTags.slice(0).fill(0);
							var negTagCheck = true;
							var tagCount=0;
							for (var j=0;j<parsedCalls[i].tags.length;j++){
								tagCollector +=parsedCalls[i].tags[j].value + ' ';
								if(activeTags[(parsedCalls[i].tags[j].id)+1]==1){tagCount++;activeTagsCheck[(parsedCalls[i].tags[j].id)+1]=1;}
								}
								var bitNum1 = activeTags.join('');
								var bitNum2 = activeTagsCheck.join('');
								var trueChecker = bitNum1&bitNum2;
								if($("#toggle-trigger").prop("checked")){tagCheck=(bitNum1==trueChecker&&tagCount>0);
								}
								else{tagCheck=(tagCount>0)}
								
								console.log(activeTags+" " + bitNum1);
								console.log(activeTagsCheck+" " + bitNum2);
							if((catNum==6||catNum==parsedCalls[i].shopCategoryId-1)&&tagCheck){	
							timetag = moment(parsedCalls[i].timeStart).format("DD/MM/YYYY HH:mm:ss");
							audioURL = '<audio id="audio'+i+'" src="' + oktell + parsedCalls[i].comId + '" controls></audio><a href="'+ oktell + parsedCalls[i].chainId +'" target="_blank">' + '</a>';
							
							Tags = "<div class='tags col-lg-3'><label class='might-overflow'>" + tagCollector + "</label></div>";
							Comment = "<div id='comment"+ i +"' class='col-lg-4 comments'> <textarea class='form-control cursor-def' id='noteArea' disabled>"+ parsedCalls[i].comments +"</textarea> </div> ";
							Call += '<div id="feedbackCall' +i+'" class="history col-lg-5" data-time="'+timetag+'" data-sign="'+parsedCalls[i].agent.username+'" value="'+ tagCollector +'"><span class="history-info">'+ timetag +' '+ parsedCalls[i].agent.username +  '</span><span class="pull-right" style="border:1px solid transparent; border-radius:8px; padding: 0px 2px;box-shadow: inset 0 0 0.2em black;">'+ Categories[(parsedCalls[i].shopCategoryId-1)] +'</span><br>' + audioURL + '</div>'+Comment + Tags;
							}
								else {i++;}							
						}
					} else {
						outputCalls ='На данной учетной записи еще не было звонков';
					}
					document.getElementById("MainForm").innerHTML = Call;
				}
				)
			.fail(
				function () {
					console.log("---");
				});
}	
