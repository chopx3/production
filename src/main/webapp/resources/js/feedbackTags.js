var lengthOfTagGroup = "";
var outputTags="";
function createTagsTable(){
	$.get(tagGroupUrl)
			.done(
				function (data) {
	var finalForm = data;
	//console.log(data);
	var string;
	var coreHeader = '<div class="tag-form">' +
							'<div class="tag-form-header">'+
							'<span>Тэги по категориям</span>'+
							'</div>'+
						'<div class="tag-form-container">';
	var coreFooter = '</div></div>';
	var tagGroups = finalForm.length;
	var columnsArray = [finalForm.length];
	
	var columnFinal = "";
	for (var columns = 0; columns<tagGroups;columns++){
		if (finalForm[columns].name!="Main"&&finalForm[columns].tags.length>0){
		var columnsHead = '<div class="container-column">'+	
				'<div class="container-column-group">'	+				
					'<ul class="group-list">'+
						'<label class="group-header">'+
						finalForm[columns].name + '</label>';
		
		var columnsBody = "";
		for (var colTags = 0; colTags<finalForm[columns].tags.length;colTags++){
			var value = finalForm[columns].tags[colTags].value;
			var id = finalForm[columns].tags[colTags].id;
			var name = finalForm[columns].tags[colTags].name;
			if (finalForm[columns].name!="Main") {columnsBody+='<li class="group-list-item">'+
					'<input type="checkbox" id="tags-checkbox-1" value="'+value+'" class="group-list-checkbox">' +
					'<label for="tags-checkbox-'+(colTags+1) + '" id="label-checkbox-'+id + '" class="tag-label" name="info-label" value="'+id+'" title="'+ finalForm[columns].tags[colTags].description+ '"><span>'+name+'</span></label></li>';}
		}
		var columnsTail = '</ul></div></div>';
		columnsArray[columns] = columnsHead + columnsBody + columnsTail;
		columnFinal += columnsArray[columns];
		}
	}
	var serviceMessage = 	"<div>"+
							"<label id='serviceFeedbackMessage'></label>"+
							"</div>";
	var commentBox = 	"<div id=commentBox class='input-group'>"+
							"<textarea class='form-control' rows='4' id='feedbackComment' maxlength='2048'></textarea>"+
							"<span class='input-group-addon btn btn-success' onclick=feedbackCorrectInfo()>Save</span>" +
						"</div>"
	document.getElementById("FeedbackForm").innerHTML = coreHeader+columnFinal+coreFooter+commentBox+serviceMessage;
	$('label.tag-label').click(function(){
		$(this).toggleClass("blueOne");
		var forcheck = "#" + $(this).attr("for");
		$(forcheck).prop('checked', true);
	})
				})
			.fail(
				function () {
					console.log("---");
				});
}

function feedbackCorrectInfo() {
lengthOfTagGroup = 0;
outputTags ="";
	$('label[name=info-label]').each(function (){
	if($(this).hasClass('blueOne'))
	{
		outputTags += "{\"id\":" +$(this).attr("value") +"},";
		lengthOfTagGroup++;
	}
})
outputTags= "[" + additionalTags + outputTags.substring(0, outputTags.length - 1)+"]";
//console.log(outputTags);
isInfoCorrect();
}


function isInfoCorrect(){
var commentVal, tagVal;
$('#feedbackComment').css({ "box-shadow": ""});
$('div.tag-form').css({"box-shadow": ""});
//console.log(chainId);
//Выделение красным неправильно введенных данных
if (chainId=="") {
	$('#serviceFeedbackMessage').text("Выберите звонок").css({"color":"red"});
	tagVal = false;
	commentVal=false;
		} else  {
			if(lengthOfTagGroup>0) {
				tagVal = true;
			} else {
				tagVal = false;
				$('div.tag-form').css({"box-shadow": "inset 0 0 0.5em red"});
			}
			if ($('#feedbackComment').val()!="") {
				commentVal=true;
			} else {
				commentVal=false;
				$('#feedbackComment').css({ "box-shadow": "inset 0 0 0.5em red"});
			}
			if(tagVal&&commentVal) {
				$('#serviceFeedbackMessage').text("").css({"color":"black"});
				postFeedback();
				setTimeout(function(){
					clearFeedback();
					drawFeedback();
				}, 800);
				//console.log("--:");
			} else {
				$('#serviceFeedbackMessage').text("Введены не все данные").css({"color":"red"});
			}
		}
		//console.log(commentVal + ' ' + tagVal);
	
}