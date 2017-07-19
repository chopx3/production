var audioURL=additionalInfo=callsData="";
var addURL = "/all";
$(document).ready(function() {
$('#clientCalls').click(function() { //Кнопка "Звонки пользователя"
		fillInfo("add","Звонки пользователя", ""); // заполнение инфы
		addButton(); // отображение кнопки
		$("#MainForm").removeClass("col-md-6").addClass("col-md-12"); // для отображения информации во весь экран(тэги+коммент)
	});
	var qs = getQueryStrings();
	if (qs.calls) {setTimeout(function(){ $("#clientCalls").trigger("click");$("#IDforInfo").val(qs.id); $("#IDSubmit").trigger('click'); }, 1000);
		 console.log("clicked");}	
})
function getCalls(){ // Функция для вывода информации по ID пользователя	
	idNumber = idSaver = $('#IDforInfo').val(); // сохранение информации
	$("#onlyMyCallsDiv").addClass("Add");
		$.get(getCallsURL + idNumber+addURL).done(function (data) { // Вывод всех звонков
			callsData = data; // временная переменная, для махинаций с данными
			sorting(callsData, "timeStart"); // сортировка
			document.getElementById("MainForm").innerHTML = ''; // очистка формы
			if (data.length != 0 && idNumber != '') { // если есть звонки и ID не пробел	
				drawClientCalls(1); // отрисовать первую страницу при первом нажатии
			}
			else {document.getElementById("MainForm").innerHTML ='Звонки не обнаружены :(';} // звонков нет
				})
}
function drawClientCalls(pageNumber){ // отрисовка собственно звонков
	var numberOfPages=(Math.ceil(callsData.length / 50) > 20) ? 20 : Math.ceil(callsData.length / 50); // переменная для количества страниц
	var pageBody=pageLineStart=pageLineEnd=pagination=""; // создание переменных для отрисовки строки пагинации
	if(numberOfPages > 1){ // если страница не одна
	for (var i=1;i<=numberOfPages;i++){ // цикл для отрисовки страниц
		var activePage = ( i== pageNumber ) ? "class=active" : ""; // добавление класса .active для текущей страницы
		pageBody+='<li '+activePage+'><a href="#" onclick=drawClientCalls('+i+')>'+i+'</a></li>'; // отрисовка страниц в линии
	}
	var isFirstPage = (pageNumber == 1) ? "class=disabled" : "onclick=drawClientCalls("+(pageNumber-1)+")"; // проверка - первая ли это страница
	var isLastPage = (pageNumber == numberOfPages ) ? "class=disabled" : "onclick=drawClientCalls("+(pageNumber+1)+")"; // или последняя
	pageLineStart = '<div class=row>						'+
	'<div class=col-lg-12>									'+
	'<nav aria-label="Page navigation" class=col-lg-6>						'+
	'	<ul class="pagination" id=paginationUL>				'+
	'		<li>											'+
	'		  <a href="#" '+isFirstPage+'>					'+
	'			<span aria-hidden="true">&laquo;</span>		'+
	'		  </a>											'+
	'		</li>'; // стартовая часть линии
	pageLineEnd = 
	'		<li>											'+
	'		  <a href="#" '+isLastPage+'>					'+
	'			<span aria-hidden="true">&raquo;</span>		'+
	'		  </a>											'+
	'		</li>											'+
	'	</ul>												'+
	'</nav></div></div>'; // и конечная
	}
	pagination = pageLineStart + pageBody + pageLineEnd;
	var endIndex = (pageNumber == Math.ceil(callsData.length / 50)) ? callsData.length : 50*pageNumber; // проверка для последнего элемента отрисовка, 50 звонков или до конца списка
	outputCalls = ""; // обнуление 
	for (var i = 50*(pageNumber-1); i < endIndex; i++) { //цикл отрисовки звонков
					additionalInfo = collectAdditionalInfo(callsData[i], "full"); // сбор дополнительной информации			
					var audiotag = callsData[i].comId;
					var nametag = callsData[i].agent.username;
					var timetag = moment.unix(callsData[i].timeStart/1000).format(dateFormat); // заполнение переменных
					var yourCall = (agentName == nametag) ? "yourCall" : ""; // подсветка "твоих" звонков
					var isItSameAgent = (i+1<=endIndex-1) ? nametag == callsData[i+1].agent.username : false ; // ????? надо думать
					var multipleCallsInfo = {
								data: callsData,
								counter: i,
								isItSameAgent : isItSameAgent
							};
					var nextCall = collectMultipleCalls(multipleCallsInfo); // склейка звонков
					var margin = (nextCall == "") ? "" : "no-margin-top"; // отступы при нескольких звонках, сложная схема
					var commentBox = (callsData[i].comments == null || callsData[i].comments == "") ? "" : "<textarea style='height:"+(78.4+iJump*36)+"px;' class='form-control commentBox col-lg-4' disabled>"+callsData[i].comments+"</textarea>"; // если есть комментарии - выводи их в поле справа
					var tagLabel = (callsData[i].tags.length == 0) ? "" : "<div class='tags col-lg-2'><label class='might-overflow'>" + collectTagForGetCalls(callsData[i].tags) + "</label></div>";  // если есть тэги - справа
					audioURL = '<audio class="audio-call '+margin+'" src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>'; 
					outputCalls += '<div class="row col-lg-12"><div class="call col-lg-6 '+yourCall+'" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span>'+additionalInfo+'<br>' + nextCall + audioURL  + '</div>'+commentBox+tagLabel+'</div>'; // основная часть формирования звонка
					i+=iJump; //прыжок, если есть звонки с тем же ID
				}
	document.getElementById("MainForm").innerHTML =pagination + outputCalls + pagination; // финальный результат, линия пагинации + звонки
}
function collectTagForGetCalls(data){ // сбор тэгов для отрисовки в звонках пользователя
	var tags = "";
	for (var i=0;i<data.length;i++){ // цикл для сборки тэгов
	tags +=data[i].value + ' '; // сборка тэгов
}
return tags;
}
function addButton() { // Отрисовка кнопки для вывода звонков
	document.getElementById("CallForm").innerHTML =	'<div class="row">'+
			'<div class="col-lg-8">'+
			'<div class="input-group goButton">'+
			 '<input type="number" class="form-control" id="IDforInfo" placeholder="ID учетной записи" autofocus>'+
			 '<span class="input-group-addon btn btn-success" id="IDSubmit" onclick=getCalls()>GO</span>'+
			'</div>'+
			'</div>'+
			'<div class="col-lg-4" id="onlyMyCallsDiv"> '+                         
			'<input type="checkbox" data-toggle="toggle" id="onlyMyCallsToggle" data-on="Мои звонки" data-off="Все звонки" data-offstyle="info btn-avito-blue" data-onstyle="success btn-avito-green" data-width=130>  '+                              
			'</div>'+
			'</div>'; 
$('#IDforInfo').keypress(function (e) { // ловить нажатие энтера
 var key = e.which;
 if (key == 13) {getCalls();}
});
$('#onlyMyCallsToggle').bootstrapToggle();
$(function(){
	$('#onlyMyCallsToggle').change(function() {
	addURL = ($('#onlyMyCallsToggle').prop("checked")) ? "/agent/"+agentId+"" : "/all" ;
	getCalls();
	console.log(addURL);})
})
}