var outputTags = "";
var tagCounter=0;
//var activeTags = [];
//var activeTagsCheck = [];
var tagsMap;
$(document).ready(function() {
TagActiveChecker();
$('.dropdown-menu.tag-form').on('click', function(event){
    //The event won't be propagated to the document NODE and 
    // therefore events delegated to document won't be fired
    event.stopPropagation();
});



});
function toggle() {
    $("#toggle-trigger").bootstrapToggle("toggle");
	console.log($("#toggle-trigger").prop("checked"));
  }	
function clickOnLabel(id){
		outputTags="";
		$("#label-checkbox-"+id).toggleClass("blueOne");
		var forcheck = "#" + $(this).attr("for");
		$(forcheck).prop('checked', true);
		TagActiveChecker();
	}
function checkAllButton(){
	console.log("clicked");
	tagCounter = 0;
	outputTags="";
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', true); });
	$('label[name=info-label]').addClass('blueOne');
	TagActiveChecker();
}
function clearButton(){
	tagCounter = 0;
	outputTags="";
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', false); });
	$('label[name=info-label]').removeClass('blueOne');
// console.log(outputTags);
TagActiveChecker();
}
function TagWatcher(){
$('#tagCounterPlace').text(tagCounter);
$('#tagNamesPlace').text(outputTags);
}
function TagActiveChecker(){ //Переписать
tagsMap = new Map();
outputTags = "";
tagCounter = 0;
$('label[name=info-label]').each(function () { if($(this).hasClass('blueOne')){
	outputTags += $("#"+$(this).attr("for")).attr("value") + " ";
	tagCounter++;
	tagsMap.set($(this).attr("value"), $("#"+$(this).attr("for")).attr("value"));
}})
console.log(tagsMap);
TagWatcher();
}
function TagConsole(){
	// console.log("Всего тегов: "+tagCounter+". Выбранные теги: "+outputTags);
}