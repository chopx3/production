$(document).ready(function() {
	var timeStart = 0, timeEnd = 0;//moment().endOf('day').unix()*1000
	$('#statistic').click(function() {
		var options = {
			header : "Статистика",
			mainFormWidth: 12
		}
		fillInfo(options);
		var menuStatistic = '<div class="row">'+
	'<div class="col-md-4" data-toggle="buttons" id="statTimeButtonGroup">'+
	'<label for="" onclick=changeDateYesterday()  class="btn btn-default"><input type="radio"  name="statTime" id="yesterday">Вчера</label>'+
	'<label for="" onclick=changeDateToday() class="btn btn-default active"><input type="radio"  name="statTime" id="today">Сегодня</label>'+
	'<label for="" onclick=changeDateWeek() class="btn btn-default"><input type="radio"  name="statTime" id="week">Неделя</label>'+
	'<label for="" onclick=changeDateMonth() class="btn btn-default"><input type="radio"  name="statTime" id="month">Месяц</label>'+
	'</div>'+
	'</div>' +
	'<div class=row id=flex>'+
	'</div>';
	document.getElementById("mainForm").innerHTML = menuStatistic;
	changeDateToday();
	});
	
});
function changeDateYesterday(){
	timeStart = moment().startOf('day').subtract(1, 'days');
	timeEnd = moment().startOf('day');
	drawFlexBoxItems(timeStart,timeEnd)
}
function changeDateToday(){
	timeStart = moment().startOf('day');
	timeEnd = moment().startOf('day').add(1,'days');
	drawFlexBoxItems(timeStart,timeEnd)
}
function changeDateWeek(){
	timeStart = moment().startOf('week').add(1,'days');
	timeEnd = moment().endOf('week').add(1,'days');
	drawFlexBoxItems(timeStart,timeEnd)
}
function changeDateMonth(){
	timeStart = moment().startOf('month').subtract(180, 'days');
	timeEnd = moment().endOf('month').subtract(150, 'days');
	drawFlexBoxItems(timeStart,timeEnd)
}
function timeInCall(data){
	var outputInfo = {};
	var totalCallsTime = 0, totalHoldTime = 0, holdCounter = 0;
	var totalCalls = getUniqueData(data, "chainId");
	for (var i = 0; i < data.length; i++) {
		var fullResult = multipleCalls(data, i);
		totalCallsTime +=fullResult.callTime;
		holdCounter += fullResult.holdC;
		totalHoldTime +=fullResult.holdTime;
		i+=fullResult.iJump;
	}
	outputInfo.holdTime = totalHoldTime;
	outputInfo.holdCounter = holdCounter;
	outputInfo.callTime = totalCallsTime;
	outputInfo.calls = totalCalls;
	outputInfo.averageCall = (totalCalls>0) ? totalCallsTime/totalCalls : 0;
	return outputInfo;
}
function ajax(options) {
  return new Promise(function(resolve, reject) {
    $.ajax(options).done(resolve).fail(reject);
  });
}
function collectData(timeStart, timeEnd){
	var URL = dayCallsURL;
	var collectedData = [];
	return ajax({ url: dayCallsURL+timeStart+"/"+timeEnd })
	.then(function(result) { 
	return info = timeInCall(result);})
	.then(function (info){
		var totalTime = new moment.duration(info.callTime);
		var averageTime = new moment.duration(info.averageCall);
		collectedData = [timeConverter(totalTime), info.calls, info.holdCounter, timeConverter(averageTime)];
		return collectedData;
	});					
}
function timeConverter(time){
	const hourS = 3600;
	const hourM = 60;
	const dayH = 24;
	const dayM = hourM * dayH;
	const dayS = dayM * 60;
	var days = 	Math.floor(time.asDays());
	var hours = Math.floor(time.asHours())-days*24;
	var minutes = Math.floor(time.asMinutes()) - hours*hourM - days*dayM;
	var seconds = Math.floor(time.asSeconds()) - minutes*60 - hours*hourS - days*dayS;
	return (days>0) ? "Дней: " + days+", часов: " + hours + ", минут: " + minutes +", секунд: " + seconds : (hours>0) ? "Часов: " + hours + ", минут: " + minutes +", секунд: " + seconds: (minutes>0) ? "Минут: " + minutes+", секунд: " + seconds : "Cекунд: " + seconds;
}
function drawFlexBoxItems(timeStart,timeEnd){
	collectData(timeStart, timeEnd)
	.then(function (collectedData){
	var dataArray = collectedData; 
	var iconArray = ["fa-hourglass-end", "fa-headphones", "fa-pause-circle-o", "fa-clock-o"];
	var headerArray = ["Время в разговоре", "Количество звонков", "Количество холдов", "Среднее время разговора"];
	var flexBody = "";
	for (var i = 0; i<iconArray.length; i++){
		flexBody += 
		'<div class="flexElement element-'+i+'">'+
		'	<div class="flexElement__icon element-'+i+'__icon"><i class ="fa '+iconArray[i]+' fa-fw"></i></div>'+
		'	<div class="flexElement__header element-'+i+'__header">'+headerArray[i]+'</div>'+
		'	<div class="flexElement__number element-'+i+'__number">'+dataArray[i]+'</div>'+
		'</div>';
	}
	document.getElementById("flex").innerHTML = '<div class="flexItems">'+ flexBody + '</div>';
});
}
function multipleCalls(data, i){ 
	let iJump = 0;
	var result={};
	var data = data;
	for (var j = i; j< data.length; j++){ // пробежка по массиву от элемента до конца массива
		if (j+1<=data.length-1){ // проверка, не конец ли это массива, чтобы без переполнения
			if (data[j].chainId == data[j+1].chainId){ iJump++; } else break;	// звонков с одной учетной записи и переводов. Если да и chainId совпал - +в прыжок
	}																											// если нет - break из цикла
	else break;} // если дальше ничего нет - break
	var holdTime = 0, holdCounter = 0; 
	var callTime = data[i].timeEnd - data[i].timeStart;
	for (var j =i+iJump; j>i; j--){ // а потом идет в обратную сторону
			holdTime += (data[j-1].timeStart - data[j].timeEnd)/1000;
			holdCounter++;
			var minutes = Math.floor(holdTime/60);
			var seconds = holdTime - minutes*60;
			callTime += data[j].timeEnd - data[j].timeStart; 
	}
	result.holdTime = holdTime;
	result.holdC = holdCounter;
	result.callTime = callTime;
	result.iJump = iJump
return result;	
}