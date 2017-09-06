$(document).ready(function() {
	$('#statistic').click(function() {
		var options = {
			header : "Статистика",
			mainFormWidth: 12
		}
		fillInfo(options);
		var menuStatistic = '<div class="row">'+
	'<div class="btn-group col-md-4" data-toggle="buttons" id="statTimeButtonGroup">'+
	'<label for="" class="btn btn-default"><input type="radio" name="statTime" id="">Вчера</label>'+
'<label for="" class="btn btn-default"><input type="radio" name="statTime" id="">Сегодня</label>'+
'<label for="" class="btn btn-default"><input type="radio" name="statTime" id="">Неделя</label>'+
'<label for="" class="btn btn-default"><input type="radio" name="statTime" id="">Месяц</label>'+
'</div>'+
'</div>';
		document.getElementById("mainForm").innerHTML = menuStatistic;
	let timeStart = 1491339600000;//moment().startOf('day').unix()*1000;
	let timeEnd = 1491426000000;//moment().endOf('day').unix()*1000
	collectData(timeStart, timeEnd);
	});
	
});
function timeInCall(data){
	var totalCallsTime = 0;
	var totalHoldTime = 0;
	for (var i = 0; i < data.length; i++) {
		var fullResult = multipleCalls(data, i);
		totalCallsTime +=fullResult.callTime;
		console.log(fullResult);
		i+=fullResult.iJump;
	}
	return totalCallsTime;
}
function collectData(timeStart, timeEnd){
	var URL = dayCallsURL;
				$.get(URL+timeStart+"/"+timeEnd).done(function (data) {
							var totalTime = new moment.duration(timeInCall(data));
							console.log(totalTime.asHours())	;
							console.log(totalTime.asMinutes())	;
					})				
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