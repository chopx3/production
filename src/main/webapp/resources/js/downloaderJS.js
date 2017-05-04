var catNum = 6;
var httpHost = location.host+'/firecatcher';
var Call = "";
var Comment = "";
var Tags = "";
var Categories = [];
var getCatsUrl = "http://"+httpHost+"/api/category/find";
var oktell = "http://"+httpHost+"/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
var getFeedbackForAgent = "http://"+httpHost+"/api/call/find/type/full_feedback/";
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
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
		// console.log(data);
		 var catInfo = data;
		for (var i=0;i<catInfo.length;i++){
			Categories[i]=catInfo[i].description;
		}
		 }
)}

function getCalls(){
//	console.log(startDate + "," + endDate);
	var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000;
		$.get(getFeedbackForAgent+timeStart+"/"+timeEnd+"/")
			.done(
				function (data) {
					Call ='';
					document.getElementById("MainForm").innerHTML = '';
					var feedbackInfo = data;
					console.log(feedbackInfo);
					if (feedbackInfo.length != 0) {
						
						for (var i = 0; i < feedbackInfo.length; i++) {
							var tagCollector ="";
							var tagCheck=false;
							activeTagsCheck = activeTags.slice(0).fill(0);
							var negTagCheck = true;
							var tagCount=0;
							for (var j=0;j<feedbackInfo[i].tags.length;j++){
								tagCollector +=feedbackInfo[i].tags[j].value + ' ';
								if(activeTags[(feedbackInfo[i].tags[j].id)]==1){
								tagCount++;
								activeTagsCheck[(feedbackInfo[i].tags[j].id)]=1;
								}
								}
								console.log(activeTags);
								console.log(activeTagsCheck);
								var bitNum1 = activeTags.join('');
								var bitNum2 = activeTagsCheck.join('');
								var bitNum3 = bitNum1.slice(-14);
								var bitNum4 = bitNum2.slice(-14);
								var trueChecker = bitNum3&bitNum4;
								console.log(bitNum3);
								console.log(bitNum4);
								console.log(trueChecker);
								console.log(parseInt(trueChecker, 2));
								if($("#toggle-trigger").prop("checked")){tagCheck=(parseInt(bitNum1, 2)==trueChecker&&tagCount>0);
								}
								else{tagCheck=(tagCount>0)}
								
							if((catNum==6||catNum==feedbackInfo[i].shopCategoryId-1)&&tagCheck){	
							timetag = moment(feedbackInfo[i].timeStart).format(dateFormat);
							audioURL = '<audio id="audio'+i+'" src="' + oktell + feedbackInfo[i].comId + '" controls></audio><a href="'+ oktell + feedbackInfo[i].chainId +'" target="_blank">' + '</a>';
							
							Tags = "<div class='tags col-lg-3'><label class='might-overflow'>" + tagCollector + "</label></div>";
							Comment = "<div id='comment"+ i +"' class='col-lg-4 comments'> <textarea class='form-control cursor-def' id='noteArea' disabled>"+ feedbackInfo[i].comments +"</textarea> </div> ";
							Call += '<div id="feedbackCall' +i+'" class="history col-lg-5" data-time="'+timetag+'" data-sign="'+feedbackInfo[i].agent.username+'" value="'+ tagCollector +'"><span class="history-info">'+ timetag +' '+ feedbackInfo[i].agent.username +  '</span><span class="pull-right" style="border:1px solid transparent; border-radius:8px; padding: 0px 2px;box-shadow: inset 0 0 0.2em black;">'+ Categories[(feedbackInfo[i].shopCategoryId-1)] +'</span><br>' + audioURL + '</div>'+Comment + Tags;
							}
								else {i++;}							
						}
					}
					document.getElementById("MainForm").innerHTML = Call;
				}
				)
			.fail(
				function () {
					console.log("---");
				});
}
function sorting(json_object, key_to_sort_by) {
    function sortByKey(a, b) {
        var x = a[key_to_sort_by];
        var y = b[key_to_sort_by];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }

    json_object.sort(sortByKey);
}	
