var startDate, endDate, tempValue;
$(document).ready(function() { // при загрузке установить время, получить информацию о категориях и вопросах из базы
	var start=moment().format("DD-MM-YYYY");
	var end=moment().add(1,'days').format("DD-MM-YYYY");
	getCategories();
	getQuestionsInfo();
})
function openStat(){ // при нажатии на "статистика" очищается информация, добавляются кнопки, стартует календарь, нажимаются кнопки "Всего" и "Сегодня" и рисуются боковые панели
	document.getElementById("secondTable").innerHTML = "";
	drawInfo("stat");
	StartCalendar();
	jQuery('#allCalls').click();
	jQuery('#today').click();
	$("#addWrapper").addClass("active").addClass("higher");
	$("#updateWrapper").addClass("active");
}
function getInfo(value){ // получение статистики
	var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000; // получение времени
	if (value != 'date') {tempValue = value;$('.catButtons').each(function () { $(this).removeClass("activeButton"); }); $("[value="+tempValue+"]").addClass("activeButton");} // подсветка выбранной кнопки статистики
	var getURL = statURL+tempValue; // 
	$.get(getURL+"/"+timeStart+"/"+timeEnd).done(function (data) {
	document.getElementById("secondTable").innerHTML = ""; // очистка данных
	var outputComments = message = count = id = thead = codeForSum = additional = ''; // объявление переменных
	var tbot = '</tbody></table></div></div>'; // низ таблицы
	var firstColumn = data.fields[0].toLowerCase();
	var secondColumn = data.fields[1].toLowerCase(); // названия полей
	var sum = addSum = 0;	
	if (data.fields.length == 3){ // если кнопка "Пользователи"
		var thirdColumn = data.fields[2].toLowerCase(); // третье поле
		thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-4">' + firstColumn + '</th><th class="col-lg-4">' + secondColumn + '</th><th class="col-lg-4">' + thirdColumn + '</th></tr></thead><tbody>'; // третий столбец
		for (var i = 0; i < data.columns.length; i++) {		 // цикл отрисовки
			sorting(data.columns, "total");
			message = data.columns[i][firstColumn];
			count = parseInt(data.columns[i][secondColumn]);
			additional = parseInt(data.columns[i][thirdColumn]);
			sum += count;
			addSum += additional;
			var thirdTd = (tempValue == "byID") ? "<a href='https://adm.avito.ru/users/user/info/"+additional+"' target=_blank>"+additional+"</a>" : additional+"(" + Math.floor(additional/count*100) +"%)";
			codeForSum = (tempValue == "byID") ? "<tr><td class=sum>"+ "Всего" +"</td><td class=sum>"+sum+"</td></tr>" : "<tr><td class=sum>"+ "Всего" +"</td><td class=sum>"+sum+"</td><td class=sum>"+addSum+"(" + Math.floor(addSum/sum*100) +"%) </td></tr>"; // сумма
			outputComments += '<tr><td>'+message+'</td><td>'+count+'</td><td class="breakable">'+thirdTd+'</td></tr>';}
			//console.log(message+"\n"+count+"\n"+additional+"\n"+firstColumn+"\n"+secondColumn+"\n"+thirdColumn);
							}
		else {	thead = '<div class="row"><div class="table-scroll col-lg-8"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-6">' + firstColumn + '</th><th class="col-lg-6">' + secondColumn + '</th></tr></thead><tbody>'; // шапка
				 // если не фидбек
				for (var i = 0; i < data.columns.length; i++) { // отрисовка в цикле
				var questionAdd =(tempValue == "byQuestion") ? "<button class='btn btn-primary btn-sm pull-right' onclick=getQuestions(\""+data.columns[i][firstColumn]+"\")>show</button>" : "";
				if (tempValue != "byQuestion") {message =  data.columns[i][firstColumn];}
				else {message = Questions[data.columns[i][firstColumn] - 1];}
				count =  data.columns[i][secondColumn];
				sum += parseInt(count);			// счетчик суммы
				outputComments += '<tr><td>'+message+'</td><td class="breakable" >'+count+questionAdd+'</td></tr>';} // финальное, формирующееся в цикле, сообщение 
				codeForSum = "<tr><td class=sum>"+ "Всего" +"</td><td class=sum>"+sum+"</td></tr>"; // сумма
		}			
	document.getElementById("allAgentsTable").innerHTML = thead +codeForSum+ outputComments + tbot;	// финальный код
			})
}
function getQuestions(value){ // добавить звонки по нажатию на show в статистике(вопросы)
		var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
		var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000; // установка времени для запроса
		$.get(getQuestionsURL +value+"/" + timeStart+"/" + timeEnd).done(function (data) { // запрос
					document.getElementById("secondTable").innerHTML = ""; 
					outputCalls =''; // очистка данных
					var callsInfo = data; 
						for (var i = 0; i < callsInfo.length; i++) { // цикл для построения списка звонков
							var audiotag = callsInfo[i].comId;
							var nametag = callsInfo[i].agent.username;
                            var timetag = moment.unix(callsInfo[i].timeStart/1000).format(dateFormat); // заполнение данных
                            var multipleCallsInfo = {
								data: callsInfo,
								counter: i
							};
							var nextCall = collectMultipleCalls(multipleCallsInfo);
							var margin = (nextCall == "") ? "" : "no-margin-top";
							var audioURL = '<audio class="audio-call '+margin+'" src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>';
							outputCalls += '<div class="call col-lg-9" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span><span class="pull-right myLabel label label-primary">'+ Questions[(callsInfo[i].questionId-1)] +'</span><span class="pull-right myLabel label label-primary">'+ Categories[(callsInfo[i].shopCategoryId-1)] +'</span><span class="pull-right myLabel label label-primary" >ID:<a href="https://adm.avito.ru/users/user/info/'+callsInfo[i].avitoUserId+'" target=_blank>'+ callsInfo[i].avitoUserId +'</a></span><br>'+ nextCall + audioURL + '</div>'; // получившийся код
							i+=iJump;
						}					 
					document.getElementById("secondTable").innerHTML = outputCalls;
				})
}