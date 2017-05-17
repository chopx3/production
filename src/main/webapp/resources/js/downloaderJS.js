var catNum = 6;
var host = "http://"+location.host+'/firecatcher';
var Call = "";
var Comment = "";
var Tags = "";
var Categories = [];
var getCatsUrl = host+"/api/category/find";
var oktell = host+"/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
var getFeedbackForAgent = host+"/api/call/find/type/full_feedback/";
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
var tagGroupUrl = host + '/api/taggroup/find';
$(document).ready(function() {
	getCats();
	$('input[name="category"]').change(function(e){
		catNum = $(this).attr("value");
	});
	createTagsTable();
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
							var negTagCheck = true;
							var tagCount=0;
							sorting(feedbackInfo[i].tags, "id");
							for (var j=0;j<feedbackInfo[i].tags.length;j++){
								tagCollector +=feedbackInfo[i].tags[j].value + ' ';
								if (tagsMap.has(feedbackInfo[i].tags[j].id.toString())){tagCheck=true;tagCount++}
								}								
							if((catNum==6||catNum==feedbackInfo[i].shopCategoryId-1)&&tagCheck){	
							timetag = moment(feedbackInfo[i].timeStart).format(dateFormat);
							audioURL = '<audio class="audio-call" id="audio'+i+'" src="' + oktell + feedbackInfo[i].comId + '" controls></audio><a href="'+ oktell + feedbackInfo[i].chainId +'" target="_blank">' + '</a>';
							userID = feedbackInfo[i].avitoUserId;
							Tags = "<div class='tags col-lg-3'><label class='might-overflow'>" + tagCollector + "</label></div>";
							Comment = "<div id='comment"+ i +"' class='col-lg-4 comments'> <textarea class='form-control cursor-def' id='noteArea' disabled>"+ feedbackInfo[i].comments +"</textarea> </div> ";
							Call += '<div class="row"><div id="feedbackCall' +i+'" class="call col-lg-5" data-time="'+timetag+'" data-sign="'+feedbackInfo[i].agent.username+'" value="'+ tagCollector +'"><span>'+ timetag +' '+ feedbackInfo[i].agent.username +  '</span><span class="pull-right box-shadow-blue addSpace" >'+ Categories[(feedbackInfo[i].shopCategoryId-1)] +'</span><span class="pull-right box-shadow-blue addSpace">ID:<a href="https://adm.avito.ru/users/user/info/'+userID+'" target=_blank>'+userID+'</a></span><br>' + audioURL + '</div>'+Comment + Tags+'</div>';
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
function createTagsTable(){
					tagCounter = 0;
					outputTags="";
					TagActiveChecker();
	$.get(tagGroupUrl)
			.done(
				function (data) {
					
	var finalForm = data;
	//console.log(data);
	var string;
	var coreHeader = 		'<div class="tag-form-header">'+
							'<span>Тэги по категориям</span>'+
							'</div>'+
						'<div class="tag-form-container">';
	var coreFooter = '</div>';
	var tagGroups = finalForm.length;
	var columnsArray = [];
	
	var columnFinal = oddColumns = oddDiv = "";
	var activeColumns = 0;
	for (var columns = 0; columns<tagGroups;columns++){
		if (finalForm[columns].name!="Main"&&finalForm[columns].tags.length>0&&finalForm[columns].name!="Unfiltered"){
			activeColumns++;
			if ((activeColumns%2)) {oddColumns= '<div class="container-column">'; oddDiv = '';}
			else {oddColumns = "";oddDiv = "</div>";}
			if ((activeColumns%2)&&columns==tagGroups-1) {oddColumns= '<div class="container-column" id=last-column>'; oddDiv = '</div>';$('#last-column').css({"display":"block"});}else {coreFooter+='</div>';}
			
		var columnsHead = oddColumns +
				'<div class="container-column-group">'	+				
					'<ul class="group-list">'+
						'<label class="group-header">'+
						finalForm[columns].name + '</label>';
		
		var columnsBody = "";
		for (var colTags = 0; colTags<finalForm[columns].tags.length;colTags++){
			var value = finalForm[columns].tags[colTags].value;
			var id = finalForm[columns].tags[colTags].id;
			var name = finalForm[columns].tags[colTags].name;
			columnsBody+='<li class="group-list-item">'+
					'<input type="checkbox" id="tags-checkbox-'+id+'" value="'+value+'" class="group-list-checkbox">' +
					'<label for="tags-checkbox-'+id+ '" id="label-checkbox-'+id + '" class="tag-label" name="info-label" value="'+id+'" title="'+ finalForm[columns].tags[colTags].description+ '" onclick=clickOnLabel('+id+')><span>'+name+'</span></label></li>';
		}
		var columnsTail = '</ul></div>'+oddDiv;
		columnsArray[columns] = columnsHead + columnsBody + columnsTail;
		columnFinal += columnsArray[columns];
		
		}		
	}
	$('.tag-form').css({ "left": -(activeColumns)*4+"vw"});
	coreButtons = 			'<div class="tag-form-footer">'+
                                '<button class="btn btn-danger btn-avito-red" id="tags-clear-button" onclick=clearButton() title="">Сброс</button>'+
                                '<button class="btn btn-info" id="tags-all-button" onclick=checkAllButton() title="">Все</button>'+
								'<label onclick="toggle()"><input id="toggle-trigger" type="checkbox" data-toggle="toggle" data-on="Все" data-off="Один из"data-width="85"></label>'+						
                            '</div>';
	document.getElementById("Feedback").innerHTML = coreHeader+columnFinal+coreFooter+coreButtons;
	toggle();toggle();
				})
			.fail(
				function () {
					console.log("---");
				});
	
}