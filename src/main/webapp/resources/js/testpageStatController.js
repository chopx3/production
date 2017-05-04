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
	$.get(statURL+tempValue+"/total/"+timeStart+'/'+timeEnd)
			.done(function (data) {
				var totalInfo = data;
				tableFiller(totalInfo, tempValue);
			})
			.fail(function () {
					console.log("---");
				}
			);
}

function tableFiller(data, additional)
{
	document.getElementById("secondTable").innerHTML = "";
	var outputComments = '';
	var message = '';
	var count = '';
	var id = '';
	//console.log(data);
	var finalForm = data;
	console.log(finalForm);
	var forEmptyCalls = '';
	var thead = '';
	var tbot = '';
	
	var sum = 0;
	var firstColumn = finalForm.fields[0];
	console.log(firstColumn);
	var secondColumn = finalForm.fields[1];
	console.log(secondColumn);
	tbot = '</tbody></table></div></div>';
	if (additional=='users')
	{
		var thirdColumn = finalForm.fields[2];
		thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-4">' + firstColumn + '</th><th class="col-lg-4">' + secondColumn + '</th><th class="col-lg-4">' + thirdColumn + '</th></tr></thead><tbody>';
		for (var i = 0; i < finalForm.columns.length; i++) {
		
		message = finalForm.columns[i].field;
		count = finalForm.columns[i].total;
		sum += parseInt(count);
		id = finalForm.columns[i].user_id;
		outputComments += '<tr><td>'+message+'</td><td class="breakable" >'+id+'</td><td>'+count+'</td></tr>'
	}
		var codeForSum = "<tr><td class=sum>"+ "Всего" +"</td><td class=sum>"+sum+"</td>";
		document.getElementById("allAgentsTable").innerHTML = thead +codeForSum+ outputComments + tbot;
	}
	
	else {
	thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-6">' + firstColumn + '</th><th class="col-lg-6">' + secondColumn + '</th></tr></thead><tbody>';
	for (var i = 0; i < finalForm.columns.length; i++) {
		var questionAdd =(additional == "questions") ? "<button class='btn btn-primary btn-sm pull-right' onclick=getQuestions(\""+finalForm.columns[i].id+"\")>show</button>" : "";
		message = finalForm.columns[i].field;
		count = finalForm.columns[i].total;
		sum += parseInt(count);
		
		outputComments += '<tr><td>'+message+'</td><td class="breakable" >'+count+questionAdd+'</td></tr>'
	}
	var codeForSum = "<tr><td class=sum>"+ "Всего" +"</td><td class=sum>"+sum+"</td>";
	document.getElementById("allAgentsTable").innerHTML = thead +codeForSum+ outputComments + tbot;
	}
}
