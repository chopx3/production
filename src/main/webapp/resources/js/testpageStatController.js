var startDate;
var endDate;

$(document).ready(function() {
	var start=moment().format("DD-MM-YYYY");
	var end=moment().add(1,'days').format("DD-MM-YYYY");
	getCats();
	getQuestionsInfo();
})
function openStat(){
	document.getElementById("secondTable").innerHTML = "";
	drawInfo("stat");
	StartCalendar();
	jQuery('#allCalls').click();
	jQuery('#today').click();
	$("#addWrapper").addClass("active").addClass("higher");
	$("#updateWrapper").addClass("active");
}
function getInfo(value){
	var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000;
	if (value != 'date') {tempValue = value;$('.catButtons').each(function () { $(this).removeClass("activeButton"); }); $("[value="+tempValue+"]").addClass("activeButton");}
	var getUrl = (value != "full_feedback" && value != "empty_feedback") ? statURL+tempValue+"/total/" : feedbackUrl + tempValue+"/";
	
	$.get(getUrl+timeStart+"/"+timeEnd)
			.done(function (data) {
				var totalInfo = data;
				tableFiller(totalInfo, tempValue);
			})
			.fail(function () {
					console.log("---");
				}
			);
}

function tableFiller(data, additional) {
	document.getElementById("secondTable").innerHTML = "";
	var outputComments = message = count = id = forEmptyCalls = thead = codeForSum = '';
	//console.log(data);
	var finalForm = data;
	var tbot = '</tbody></table></div></div>';
	var firstColumn = "Field";
	var secondColumn = "Total";
	if (additional != "full_feedback" && additional != "empty_feedback") {
	firstColumn = finalForm.fields[0];
	//console.log(firstColumn);
	secondColumn = finalForm.fields[1];
	//console.log(secondColumn);
	}
	var sum = 0;
	
	if (additional=='users'){
		var thirdColumn = finalForm.fields[2];
		thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-4">' + firstColumn + '</th><th class="col-lg-4">' + secondColumn + '</th><th class="col-lg-4">' + thirdColumn + '</th></tr></thead><tbody>';
		for (var i = 0; i < finalForm.columns.length; i++) {		
			message = finalForm.columns[i].field;
			count = finalForm.columns[i].total;
			sum += parseInt(count);
			id = finalForm.columns[i].user_id;
			outputComments += '<tr><td>'+message+'</td><td class="breakable" >'+id+'</td><td>'+count+'</td></tr>'
															}
							}
		else {
			thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-6">' + firstColumn + '</th><th class="col-lg-6">' + secondColumn + '</th></tr></thead><tbody>';
			if (additional != "full_feedback" && additional != "empty_feedback"){
			for (var i = 0; i < finalForm.columns.length; i++) {
			var questionAdd =(additional == "questions") ? "<button class='btn btn-primary btn-sm pull-right' onclick=getQuestions(\""+finalForm.columns[i].id+"\")>show</button>" : "";
			message = finalForm.columns[i].field;
			count = finalForm.columns[i].total;
			sum += parseInt(count);			
			outputComments += '<tr><td>'+message+'</td><td class="breakable" >'+count+questionAdd+'</td></tr>';
															}
			codeForSum = "<tr><td class=sum>"+ "Всего" +"</td><td class=sum>"+sum+"</td>";
			}
			else{
				outputComments = '<tr><td>'+additional+'</td><td class="breakable" >'+getUniqueFeedback(finalForm)+'</td></tr>';
			}			
		}			
	
	
	document.getElementById("allAgentsTable").innerHTML = thead +codeForSum+ outputComments + tbot;
		
}
function getUniqueFeedback(data) {
    var variables = {};
    var param = "chainId"
	var count = 0;
    $.each(data, function()
    {
        if (!variables[this[param]]){
            variables[this[param]] = [];    
       count++;}
    });

    return count;
}