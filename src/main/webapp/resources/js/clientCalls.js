var audioURL=additionalInfo=callsData="";
var addURL = "/all";
var chosenPage = 0;
var repremInfoId = 0;
$(document).ready(function() {
$('#clientCalls').click(function() { //Кнопка "Звонки пользователя"
		fillInfo("add","Звонки пользователя", ""); // заполнение инфы
		addButton(); // отображение кнопки
		if (repremAgents.indexOf(agentId)== -1){ $(".reprem-button-activator").removeClass('Add');}
		$("#MainForm").removeClass("col-md-6").addClass("col-md-12"); // для отображения информации во весь экран(тэги+коммент)
	});
	var qs = getQueryStrings();
	if (qs.calls) {setTimeout(function(){ 
		$("#clientCalls").trigger("click");
		$("#IDforInfo").val(qs.id); 
		$("#IDSubmit").trigger('click'); }, 1000);}	
	if (qs.premium) {setTimeout(function(){ 
		$("#clientCalls").trigger("click");
		$("#IDforInfo").val(qs.id); 
		$("#IDSubmit").trigger('click');  
		}, 500);
		setTimeout(function(){ 
		  $(".reprem-button-activator").trigger("click");
		}, 1500);
		}
		$(".edit-button").click(function() {
			$(".reprem-text").each(function() {
				var index = $(this).attr('value');
				console.log(index);
				var classArray = document.getElementsByClassName("reprem-text-"+index);
				var savedValue = $(".reprem-label-"+index).text();
				if ($(this).hasClass('input-text')){
					classArray[0].innerHTML = '<input type="text" class="reprem-label-'+index+' form-control reprem-input input-text" name="'+index+'" value="'+savedValue+'">';
				}
				if ($(this).hasClass('input-number')){
					classArray[0].innerHTML = '<input type="number" class="reprem-label-'+index+' form-control reprem-input input-number" name="'+index+'" value="'+savedValue+'">';
				}
				if ($(this).hasClass('input-textarea')){
					console.log("poof");
					classArray[0].innerHTML = '<textarea class="reprem-label-'+index+' form-control reprem-input reprem-input-textarea" name="'+index+'" rows=2  value="'+savedValue+'">'+savedValue+'</textarea>';
				}
				oneActiveButton(".save-button");
			});
		});
		$(".save-button").click(function() {
			var premiumClientData = [];
			$(".reprem-input").each(function() {
				var index = $(this).attr('name');

				var classArray = document.getElementsByClassName("reprem-text-"+index);
				var savedValue = $(this).val();
				premiumClientData[index-1] = savedValue;
				if ($(this).hasClass('input-text')){
					classArray[0].innerHTML = '<label class="reprem-label-'+index+' reprem-label reprem-input input-text" name="'+index+'" value="'+savedValue+'">'+savedValue+'</label>';
				}
				if ($(this).hasClass('input-number')){
					classArray[0].innerHTML = '<label class="reprem-label-'+index+' reprem-label reprem-input input-text" name="'+index+'" value="'+savedValue+'">'+savedValue+'</label>';
				}
				if ($(this).hasClass('input-textarea')){
					console.log("poof");
					classArray[0].innerHTML = '<textarea class="reprem-label-'+index+' reprem-label form-control reprem-input reprem-input-textarea" name="'+index+'" rows=2  value="'+savedValue+'">'+savedValue+'</textarea>';
				}
			});
			var clientNewData = {
					"id" : repremInfoId,
					"avitoId" : premiumClientData[0],
					"username" : premiumClientData[1],
					"contactPerson" : premiumClientData[2],
					"comments" : premiumClientData[3],
					"admPhone" : premiumClientData[4],
					"contactPhone" : premiumClientData[5],
					"additionalPhones" : premiumClientData[6]
				};
				console.log(clientNewData);
				RestPost(clientNewData, updateRepremURL);
				oneActiveButton(".edit-button");
		});		 		 	
		$(".create-button").click(function(){
			var clientNewData = {
					"avitoId" : idSaver,
					"username" : "username",
					"admPhone" : "89000000000",
					"contactPhone" : "89000000001"
				};
				console.log(clientNewData);
				RestPost(clientNewData, addRepremURL);
				getRepremData(idSaver);
				oneActiveButton(".edit-button");
		})
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
				$(".reprem-button-activator").addClass('Add');
			}
			else {document.getElementById("MainForm").innerHTML ='Звонки не обнаружены :(';} // звонков нет
			if ($(".reprem-block").hasClass('Add')){
				getRepremData($("#IDforInfo").val());
			}	
			})
}
function drawClientCalls(pageNumber){ // отрисовка собственно звонков
	chosenPage = pageNumber;
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
	'<nav aria-label="Page navigation" class=col-lg-12>						'+
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
	'</nav></div>'; // и конечная
	}
	pagination = pageLineStart + pageBody + pageLineEnd;
	var endIndex = (pageNumber == Math.ceil(callsData.length / 50)) ? callsData.length : 50*pageNumber; // проверка для последнего элемента отрисовка, 50 звонков или до конца списка
	outputCalls = ""; // обнуление 
	for (var i = 50*(pageNumber-1); i < endIndex; i++) { //цикл отрисовки звонков
					additionalInfo = collectAdditionalInfo(callsData[i], "full"); // сбор дополнительной информации			
					var audiotag = callsData[i].comId;
					var nametag = callsData[i].agent.username;
					
					var yourCall = (agentName == nametag) ? "yourCall" : ""; // подсветка "твоих" звонков
					var isItSameAgent = (i+1<=endIndex-1) ? nametag == callsData[i+1].agent.username : false ; // ????? надо думать
					var multipleCallsInfo = {
								data: callsData,
								counter: i,
								isItSameAgent : isItSameAgent
							};
					var nextCall = collectMultipleCalls(multipleCallsInfo); // склейка звонков
					var timetag = moment.unix(callsData[i+iJump].timeStart/1000).format(dateFormat); // заполнение переменных
					var margin = (nextCall == "") ? "" : "no-margin-top"; // отступы при нескольких звонках, сложная схема
					audioURL = '<audio class="audio-call '+margin+'" src="'+oktell + audiotag + '" controls></audio><a href="'+oktell+ audiotag +'" target="_blank">' + '<\/a>'; 
				/*	if (options.reprem) {
						var commentBox=""; 
						var tagLabel="";
								outputCalls += (callsData[i].out) ? '<div class="row col-lg-12"><div class="call col-lg-6 '+yourCall+'" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span>'+additionalInfo+'<br>' + nextCall + audioURL  + '</div>'+commentBox+tagLabel+'</div>' : " " ; // основная часть формирования звонка
							}
					else {*/
						var commentBox = (callsData[i].comments == null || callsData[i].comments == "") ? "" : "<textarea style='height:"+(78.4+iJump*36)+"px;' class='form-control commentBox col-lg-4' disabled>"+callsData[i].comments+"</textarea>"; // если есть комментарии - выводи их в поле справа
						var tagLabel = (callsData[i].tags.length == 0) ? "" : "<div class='tags col-lg-2'><label class='might-overflow'>" + collectTagForGetCalls(callsData[i].tags) + "</label></div>";  // если есть тэги - справа
								outputCalls += '<div class="row col-lg-12"><div class="call col-lg-6 '+yourCall+'" data-time="'+timetag+'" data-sign="'+nametag+'"><span>'+ timetag +' '+nametag + '</span>'+additionalInfo+'<br>' + nextCall + audioURL  + '</div>'+commentBox+tagLabel+'</div>'; // основная часть формирования звонка
							//}		
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
			'<div class="col-lg-6">'+
			'<div class="input-group goButton">'+
			 '<input type="number" class="form-control" id="IDforInfo" placeholder="ID учетной записи" autofocus>'+
			 '<span class="input-group-addon btn btn-success" id="IDSubmit" onclick=getCalls()>GO</span>'+
			'</div>'+
			'</div>'+
			'<div class="col-lg-3"> '+  
			'<button type="button" class="btn btn-primary reprem-button-activator" data-toggle="button" aria-pressed="false" autocomplete="off">'+
  		'Premium'+
			'</button>'+
			'</div>'+
			'<div class="col-lg-3" id="onlyMyCallsDiv"> '+                         
			'<input type="checkbox" data-toggle="toggle" id="onlyMyCallsToggle" data-on="Мои звонки" data-off="Все звонки" data-offstyle="info btn-avito-blue float-right" data-onstyle="success btn-avito-green float-right" data-width=8vw>'                         
			'</div>'+
			'</div>';
$(".reprem-button-activator").click(function(){
		$(".reprem-block").toggleClass('Add');
		if ($(".reprem-block").hasClass('Add')){
			addURL = "/out";
		} else {
			addURL = ($('#onlyMyCallsToggle').prop("checked")) ? "/agent/"+agentId+"" : "/all" ;
		}
		getCalls();
		getRepremData($("#IDforInfo").val());
})			
$('#IDforInfo').keypress(function (e) { // ловить нажатие энтера
 var key = e.which;
 if (key == 13) {getCalls();}
});
$('#onlyMyCallsToggle').bootstrapToggle();
$('#onlyMyCallsDiv').css("float", "right");
$(function(){
	$('#onlyMyCallsToggle').change(function() {
	addURL = ($('#onlyMyCallsToggle').prop("checked")) ? "/agent/"+agentId+"" : "/all" ;
	getCalls();
	console.log(addURL);})
})
}
function getRepremData(id){
	var repremFields = ["avitoId", "username", "contactPerson", "comments", "admPhone", "contactPhone", "additionalPhones"];
	$.get(getRepremURL+id, function(data) {
		repremInfoId = data.id;
		console.log(data.id);
		if (data.avitoId>1){
		oneActiveButton(".edit-button");
		for (var i = 0; i < 7; i++) {
			var info = data[repremFields[i]];
			$(".reprem-label-"+(i+1)).text(info);
		}
	}
	else {
		oneActiveButton(".create-button");
		$(".reprem-label").text("");
		$(".reprem-label-1").text("Нет информации о клиенте");
		$(".reprem-input-textarea").text("");
	}
	});
}
function oneActiveButton(value){
		$(".reprem-button").addClass("hidden-button");
		$(value).removeClass("hidden-button");
}