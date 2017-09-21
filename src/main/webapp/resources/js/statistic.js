$(document).ready(function() {
	var timeStart = 0, timeEnd = 0;//moment().endOf('day').unix()*1000
	$('#statistic').click(function() {
		var options = {
			header : "Статистика",
			mainFormWidth: 12
		}
		fillInfo(options);
		var menuStatistic = '<div class="row">'+
	'<div class="col-md-6" data-toggle="buttons" id="statTimeButtonGroup">'+
	'<label for="" onclick=changeDateYesterday()  class="btn btn-default"><input type="radio"  name="statTime" id="yesterday">Вчера</label>'+
	'<label for="" onclick=changeDateToday() class="btn btn-default active"><input type="radio"  name="statTime" id="today">Сегодня</label>'+
	'<label for="" onclick=changeDateWeek() class="btn btn-default"><input type="radio"  name="statTime" id="week">Неделя</label>'+
	'<label for="" onclick=changeDateMonth() class="btn btn-default"><input type="radio"  name="statTime" id="month">Месяц</label>'+
	'<label for="" onclick=changeDateAlltime() class="btn btn-default"><input type="radio"  name="statTime" id="month">Все время <i class="fa fa-internet-explorer" aria-hidden="true"></i> </label>'+
	'</div>'+
	'</div>' +
	'<div class=row id=flex>'+
	'</div>';
	document.getElementById("mainForm").innerHTML = menuStatistic;
	changeDateToday();
	});
	var qs = getQueryStrings();
	if (qs.stat) {setTimeout(function(){ 
		$("#statistic").trigger("click");
		$("#"+qs.time+"").trigger('click'); }, 500);}	
});
function changeDateYesterday(){
	timeStart = moment().startOf('day').subtract(1, 'days');
	timeEnd = moment().startOf('day');
	drawFlexBoxItems(timeStart,timeEnd)
}
function changeDateAlltime(){
	timeStart = 1;
	timeEnd = moment().startOf('day').add(1,'days');
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
	timeStart = moment().startOf('month');
	timeEnd = moment().endOf('month');
	drawFlexBoxItems(timeStart,timeEnd)
}
function timeInCall(data){
	var outputInfo = {};
	var totalCallsTime = 0, totalHoldTime = 0, holdCounter = 0, longestCall = 0, user2299 = 0, maxEl = 0, maxCount = 1, manager = 0, longestHold = 0, longestHoldId = 0;
	var totalCalls = getUniqueData(data, "chainId");
	var totalUsers = getUniqueData(data, "avitoUserId");
	var modeMap = {};
	for (var i = 0; i < data.length; i++) {
		var fullResult = multipleCalls(data, i);
		longestCall = (fullResult.callTime>longestCall) ? fullResult.callTime : longestCall;
		if (fullResult.longestHold>longestHold && data[i].avitoUserId !== -1) {
			longestHold = fullResult.longestHold;
			longestHoldId = data[i].avitoUserId;
		}
		if (data[i].avitoUserId == -1) user2299++
		else if(data[i].avitoUserId !== null && data[i].avitoUserId !== 0){
		var el = data[i].avitoUserId;
	    if(modeMap[el] == null)
	        modeMap[el] = 1;
	    else
	        modeMap[el]++;  
	    if(modeMap[el] > maxCount)
	    {
	        maxEl = el;
	        maxCount = modeMap[el];
	    }
		}
		if (data[i].manager) manager++;
		totalCallsTime +=fullResult.callTime;
		holdCounter += fullResult.holdC;
		totalHoldTime +=fullResult.holdTime;
		i+=fullResult.iJump;
	}
	console.log(longestHoldId);
	outputInfo.holdTime = totalHoldTime;
	outputInfo.favUser = "ID: " + maxEl + ", звонки: "+ maxCount;
	outputInfo.holdCounter = holdCounter;
	outputInfo.callTime = totalCallsTime;
	outputInfo.calls = totalCalls;
	outputInfo.longestCall = longestCall;
	outputInfo.longestHold = longestHold;
	outputInfo.totalUsers = totalUsers;
	outputInfo.user2299 = user2299;
	outputInfo.manager = manager;
	outputInfo.averageHold = (holdCounter>0) ? totalHoldTime/holdCounter : 0;
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
	sorting(result, "timeStart");
	return info = timeInCall(result);})
	.then(function (info){
		var totalTime = new moment.duration(info.callTime);
		var averageHold = new moment.duration(info.averageHold);
		var averageTime = new moment.duration(info.averageCall);
		var longestCall = new moment.duration(info.longestCall);
		var longestHold = new moment.duration(info.longestHold);
		var totalHoldTIme = new moment.duration(info.holdTime);
		collectedData = [info.calls, timeConverter(totalTime), timeConverter(averageTime), timeConverter(longestCall), info.holdCounter,timeConverter(totalHoldTIme), timeConverter(averageHold), timeConverter(longestHold), info.totalUsers, info.user2299, info.favUser, info.manager];
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
	return (days>0) ? days+"д " + hours + "ч " + minutes +"м " + seconds + "c": (hours>0) ? hours + "ч " + minutes +"м " + seconds + "c": (minutes>0) ? minutes +"м " + seconds + "c" : seconds + "c";
}
function drawFlexBoxItems(timeStart,timeEnd){
	collectData(timeStart, timeEnd)
	.then(function (collectedData){
	var dataArray = collectedData; 
	var iconArray = ["fa-headphones", "fa-hourglass-end", "fa-clock-o", "fa-volume-control-phone", "fa-microphone-slash", "fa-hourglass-end", "fa-clock-o", "fa-question", "fa-users", "fa-ban", "fa-heart", "fa-rub"];
	var headerArray = ["Количество звонков", "Время в разговоре", "Среднее время разговора", "Самый длинный звонок", "Количество холдов", "Время в холде", "Среднее время холда", "Самый длинный холд", "Разных пользователей", "Частник", "Постоянный клиент", "Отдел продаж"];
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
	var holdTime = 0, holdCounter = 0, totalHoldTime = 0, longestHold = 0; 
	var callTime = data[i].timeEnd - data[i].timeStart;
	for (var j =i+iJump; j>i; j--){ // а потом идет в обратную сторону
			holdTime = (data[j-1].timeStart - data[j].timeEnd);
			longestHold = (holdTime>longestHold)? holdTime : longestHold;
			totalHoldTime += holdTime;
			holdCounter++;
			callTime += data[j].timeEnd - data[j].timeStart; 
	}
	result.holdTime = totalHoldTime;
	result.longestHold = longestHold;
	result.holdC = holdCounter;
	result.callTime = callTime;
	result.iJump = iJump
return result;	
}