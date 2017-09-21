var birthdays = 
[{"date":"14-5", "fcID": 94},
{"date":"29-4", "fcID": 87},
{"date":"22-11", "fcID": 116},
{"date":"15-4", "fcID": 15},
{"date":"23-11", "fcID": 115},
{"date":"19-12", "fcID": 102},
{"date":"2-10", "fcID": 89},
{"date":"20-12", "fcID": 68},
{"date":"8-12", "fcID": 90},
{"date":"6-9", "fcID": 117},
{"date":"29-2", "fcID": 10},
{"date":"16-7", "fcID": 4},
{"date":"4-7", "fcID": 10},
{"date":"6-3", "fcID": 65},
{"date":"28-11", "fcID": 2},
{"date":"7-8", "fcID": 72},
{"date":"23-1", "fcID": 97},
{"date":"3-2", "fcID": 79},
{"date":"23-10", "fcID": 141},
{"date":"5-3", "fcID": 99},
{"date":"6-10", "fcID": 86},
{"date":"23-6", "fcID": 33},
{"date":"17-11", "fcID": 20},
{"date":"20-1", "fcID": 74},
{"date":"23-6", "fcID": 75},
{"date":"13-11", "fcID": 78},
{"date":"7-8", "fcID": 36},
{"date":"12-2", "fcID": 7},
{"date":"17-11", "fcID": 100},
{"date":"30-3", "fcID": 98},
{"date":"23-11", "fcID": 119},
{"date":"31-12", "fcID": 121},
{"date":"31-7", "fcID": 85},
{"date":"10-6", "fcID": 120},
{"date":"1-6", "fcID": 14},
{"date":"2-11", "fcID": 16},
{"date":"30-6", "fcID": 29},
{"date":"31-12", "fcID": 142},
{"date":"3-5", "fcID": 143},
{"date":"14-8", "fcID": 144}];

function alert(state){
	if (state){ 	$(".bdayAlert").addClass('Add'); }
	else { $(".bdayAlert").removeClass('Add');}
}
$(document).ready(function() {
var goodDay = isTodayAGoodDay();
if (goodDay){
	console.log(collectAgentBDays());
	$(".achievment-block>label").after('<div class="bday" onmouseover=alert(1) onmouseleave=alert(0)><i class="fa fa-inverse fa-fw achievment fa-birthday-cake" id="bdayIcon" style="display: block; font-size: 35px; position:fixed; bottom: 150px; left:10px;"></i><label class="achievment" id="bdayCounter" style="display: block; font-size: 15px; position:fixed; bottom: 150px; left:50px;">'+goodDay+'</label></div>');
			var string = "";
		collectAgentBDays()
		.then(function (array){
		Promise.all(array).then(function (result){
			$(".bday").after("<div class='bdayAlert'> Сегодня день рождения у:<br>" + result + "<div>");
		})
		});
}
})
function collectAgentBDays(){
	return new Promise(function(resolve, reject) {
  var agentBDaysArray = [];
	birthdays.forEach(function(data){
	if(data.date == moment().format("D-M")){
		agentBDaysArray.push((ajax({ url: getNotesURL+ data.fcID}).then(function(agent) {return agent.russianName})));
	}
})
	resolve(agentBDaysArray);
});	
}
function isTodayAGoodDay(){
var isTodayAGoodDay = 0;
birthdays.forEach(function(data){
	if(data.date == moment().format("D-M")){
		isTodayAGoodDay++;
	}
});
return isTodayAGoodDay;
}