var outputTags = "";
var tagCounter=0;
var activeTags = [];
var activeTagsCheck = [];
$(document).ready(function() {
TagActiveChecker();
$('label').click(function(){
		$(this).toggleClass("blueOne");
		var forcheck = "#" + $(this).attr("for");
		$(forcheck).prop('checked', true);
		TagActiveChecker();
	})
$("#tags-clear-button").click(function(){
	tagCounter = 0;
	outputTags="";
	var tagId = '#tags-checkbox-';
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', false); });
	$('label[name=info-label]').removeClass('blueOne');
console.log(outputTags);
TagActiveChecker();
})
$("#tags-all-button").click(function(){
	tagCounter = 0;
	outputTags="";
	var tagId = '#tags-checkbox-';
	$('input:checkbox[class=group-list-checkbox]').each(function () { $(this).prop('checked', true); });
	$('label[name=info-label]').addClass('blueOne');
	TagActiveChecker();
})
$('.dropdown-menu.tag-form').on('click', function(event){
    //The event won't be propagated to the document NODE and 
    // therefore events delegated to document won't be fired
    event.stopPropagation();
});



});
function TagWatcher()
{
$('#tagCounterPlace').text(tagCounter);
$('#tagNamesPlace').text(outputTags);
}
function TagActiveChecker() //Переписать
{
outputTags="";
tagCounter = 0;
var AllTags = 14;
activeTags[0]=0;

for (i=1;i<=AllTags;i++)
{
	var tagId = '#label-checkbox-' + i;
	if($(tagId).hasClass('blueOne'))
	{
		outputTags += $('#tags-checkbox-'+i).attr("value") + " ";
		tagCounter++;
		activeTags[i]=1;
	}
	else{activeTags[i]=0;}
}
console.log(activeTags);
TagWatcher();
}
function TagConsole()
{
	console.log("Всего тегов: "+tagCounter+". Выбранные теги: "+outputTags);
}