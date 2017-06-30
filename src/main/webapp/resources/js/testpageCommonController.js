var idNum;
function drawInfo(value){ // функция звполнения групп кнопок
	$("#updateWrapper").removeClass("active"); // скрыть обновление информации
	var addInfoBody = addInfoFooterFunc = updInfoBody = updInfoFooterFunc = addInfoHeaderValue = updInfoHeaderValue = updInfoFooterFuncSecond = ""; // обнуление 
	switch(value) {//заполнение информации, всего 6 полей. Шапка, тело и низ, для обновления и добавления инфы.
		case "agents":   //если значение = агент.
		addInfoHeaderValue = 'Добавить агента';
		updInfoHeaderValue = 'Изменить информацию об агенте';
		addInfoBody = 	'<div class=row><label class="leftLabel">username</label><input type="text" class="form-control inputTextField" id=addTextField1></div>'+
						'<div class=row><label class="leftLabel">OktellLogin</label><input type="text" class="form-control inputTextField" id=addTextField2></div>';
		addInfoFooterFunc = "infoCheck(\'add\', \'agents\')";
		updInfoBody = 	'<div class=row><label 	class="leftLabel">username</label>	<input type="text" 	class="form-control inputTextField" id=updTextField1></div>'+
						'<div class=row><label 	class="leftLabel">OktellLogin</label>	<input type="text" 	class="form-control inputTextField" id=updTextField2></div>'+
						'<div class=row><label 	class="leftLabel">Роль</label>'+
						'<div class="btn-group inputTextField" role="group" aria-label="Basic example" data-toggle=buttons>'+
							'<label class="btn btn-primary active">'+
							'<input type="radio" name="options" id="optionUser" autocomplete="off" checked>User'+
							'</label>'+
							'<label class="btn btn-primary">'+
							'<input type="radio" name="options" id="optionAdmin" autocomplete="off"> Admin'+
							'</label>'+
						'</div>'+
				'</div>'+
				'<div class=row><label 	class="leftLabel">Отдел</label>'+
						'<div class="btn-group inputTextField" role="group" aria-label="Basic example" data-toggle=buttons>'+
							'<label class="btn btn-primary active">'+
							'<input type="radio" name="department" id="departmentPro" autocomplete="off" checked>Pro'+
							'</label>'+
							'<label class="btn btn-primary">'+
							'<input type="radio" name="department" id="departmentFFC" autocomplete="off"> FFC'+
							'</label>'+
						'</div>'+
				'</div>';	
	updInfoFooterFunc = "infoCheck(\'upd\', \'agents\')";
	break;
	case "tags" : //если значение = тэг.
		var options = optionsReturn;
		addInfoHeaderValue = 'Добавить тэг';
		updInfoHeaderValue = 'Изменить информацию о тэге';
		addInfoFooterFunc = "infoCheck(\'add\', \'tags\')";
		updInfoFooterFuncSecond = '<button class="btn btn-primary" onclick="ChangeTagGroup()">Изменить группу</button>';
		updInfoFooterFunc = "infoCheck(\'upd\', \'tags\')";
		addInfoBody = 	'<div class=row><label class="leftLabel">Тэг		</label><input type="text" class="form-control inputTextField" 	id=addTextField1>	</div>'+
						'<div class=row><label class="leftLabel">Название	</label><input type="text" class="form-control inputTextField" 	id=addTextField2>	</div>'+
						'<div class=row><label class="leftLabel">Описание	</label><input type="text" class="form-control inputTextField" 	id=addTextField3>	</div>';
		updInfoBody = 	'<div class=row><label class="leftLabel">Тэг		</label><input type="text" class="form-control inputTextField" 	id=updTextField1>	</div>'+
						'<div class=row><label class="leftLabel">Название	</label><input type="text" class="form-control inputTextField" 	id=updTextField2>	</div>'+
						'<div class=row><label class="leftLabel">Описание	</label><input type="text" class="form-control inputTextField" 	id=updTextField3>	</div>'+
						'<div class=row><label class="leftLabel">Группа тегов</label><select class="form-control inputTextField" id="exampleSelect1">'+options+ '</select>	</div>';
	break;
	case "group":  //если значение = тэггруппа.
		addInfoHeaderValue = 'Добавить группу тэгов';
		updInfoHeaderValue = 'Изменить информацию о группе тэгов'; 
		addInfoFooterFunc = "infoCheck(\'add\', \'group\')";		
		updInfoFooterFunc = "infoCheck(\'upd\', \'group\')";
		addInfoBody = 	'<div class=row><label class="leftLabel">Название	</label><input type="text" class="form-control inputTextField" id=addTextField1>	</div>'+
						'<div class=row><label class="leftLabel">Описание	</label><input type="text" class="form-control inputTextField" id=addTextField2>	</div>';
		updInfoBody = 	'<div class=row><label class="leftLabel">Название	</label><input type="text" class="form-control inputTextField" id=updTextField2>	</div>'+
						'<div class=row><label class="leftLabel">Описание	</label><input type="text" class="form-control inputTextField" id=updTextField3>	</div>';
	break;
	case "stat":  //если значение = статистика.
	updInfoBody= '<form action="" method="get">'+
	'<input type="text" name="daterange" value="01-01-2015 - 01-31-2015" />'+
	'</form>'+
	'<button class="btn btn-info" id="yesterday" >Вчера</button>'+
	'<button class="btn btn-info" id="today">Сегодня</button>'+
	'<button class="btn btn-info" id="week">Неделя</button>'+
	'<button class="btn btn-info" id="month">Месяц</button>';
	addInfoBody= 	'<div class=row><label class="leftLabel">Звонки</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="byCategory" onclick="getInfo(\'byCategory\')">Категория</button><button class="btn btn-primary catButtons" value="byID" onclick="getInfo(\'byID\')">Users</button><button class="btn btn-primary catButtons" value="byQuestion" onclick="getInfo(\'byQuestion\')">Вопросы</button></div></div>'+
	'<div class=row><label class="leftLabel">Агенты</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="emptyCalls" onclick="getInfo(\'emptyCalls\')" >Незаполненные</button><button class="btn btn-primary catButtons" value="updatedCalls" onclick="getInfo(\'updatedCalls\')" id="allCalls"> Всего </button><button class="btn btn-primary catButtons" value="fullInfoByAgent" onclick="getInfo(\'fullInfoByAgent\')"> Вместе </button></div></div>'+
	'<div class=row><label class="leftLabel">Другие</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="manager" onclick="getInfo(\'manager\')">Менеджер</button><button class="btn btn-primary catButtons" value="outcomings" onclick="getInfo(\'outcomings\')">Исходящие</button><button class="btn btn-primary catButtons" value="feedback" onclick="getInfo(\'feedback\')" >Feedback</button></div></div>';
	addInfoFooterFunc = updInfoFooterFunc = "";
	addInfoHeaderValue = "Выбор категории звонка";
	updInfoHeaderValue =  'Выберите период:';
	break;
	}
	var addInfoHeader = "<label>"+addInfoHeaderValue+"</label>"; // добавление инфы в хедеры
	var updInfoHeader = "<label>"+updInfoHeaderValue+"</label>"; // добавление инфы в хедеры
	var addInfoFooter = (value !="stat") ? '<button class="btn btn-success" onclick="'+addInfoFooterFunc+'">Добавить</button>' : ""; // и в футер
	var updInfoFooter = (value !="stat") ? '<button class="btn btn-success" onclick="'+updInfoFooterFunc+'">Изменить информацию</button>'+updInfoFooterFuncSecond : ""; // и в футер
	document.getElementById("updBody").innerHTML 	= updInfoBody;
	document.getElementById("updFooter").innerHTML 	= updInfoFooter;
	document.getElementById("updHeader").innerHTML 	= updInfoHeader;
	document.getElementById("addBody").innerHTML 	= addInfoBody;
	document.getElementById("addFooter").innerHTML 	= addInfoFooter;
	document.getElementById("addHeader").innerHTML 	= addInfoHeader; // заполнение
};
function infoCheck(value, type){ // проверка информации и отправление данных, value = add или upd, type= agent, stat, tag, group
	var check = true;
	var firstField = 	"#"+value+"TextField1";
	var secondField = 	"#"+value+"TextField2";// присвоение значений. По умолчанию - данные верны, пока не доказно обратное.
	if (type != "agents") { // в тэгах и группе есть третье значение, объявление и проверка
	var thirdField = 	"#"+value+"TextField3";
	if($(thirdField).val()==""){$(thirdField).addClass("box-shadow"); check = false;}}
	$(firstField).removeClass("box-shadow");
	$(secondField).removeClass("box-shadow");
	if($(firstField).val()==""){$(firstField).addClass("box-shadow");check = false;}
	if($(secondField).val()==""){$(secondField).addClass("box-shadow"); check = false;} // проверка значений
	if(check){	var URL, infoToServer;	
		switch(value){ // сначала проверяется добавление это или обновление данных
		case 'add': 
					switch(type){ // а потом - каких именно данных
					case 'agents':
					infoToServer ={
					"username": $(firstField).val(),
					"oktellLogin":$(secondField).val()
					};
					URL=addAgentURL; 
					break;
					case 'tags':
					infoToServer ={
					"value":$(firstField).val(),
					"name": $(secondField).val(),
					"description": $(thirdField).val()
					};
					URL=addTagURL;
					break;
					case 'group':
					infoToServer ={
					"name": $(firstField).val(),
					"description": $(secondField).val()
					};
					URL=addTagGroupURL; 
					break;}
		break;
		case 'upd':
					switch(type){
					case 'agents':
					var role = ($('#optionAdmin').is(':checked'))?roleAdmin:roleUser;
					var department = ($('#departmentPro').is(':checked'))?"pro":"ffc";
					infoToServer ={
					"id":idNum,
					"username": $(firstField).val(),
					"oktellLogin":$(secondField).val(),
					"roles": JSON.parse(role),
					"department": department
					};
					URL = updateAgentURL;
					break;
					case 'tags':
					infoToServer ={
					"id":idNum,
					"value": $(firstField).val(),
					"name":$(secondField).val(),
					"description": $(thirdField).val(),
					};
					URL = updTagURL;
					break;
					case 'group':
					infoToServer ={
					"id":idNum,
					"name": $(secondField).val(),
					"description": $(thirdField).val()
					};
					URL = updTagGroupURL;
					break;}
		break;}	
		RestPost(infoToServer, URL); // запрос на сервер
		fillInfo(type); // обновление нужной страницы
	}
}
function fillInfo(type){ // обновление нужной страницы
	if (type == "agents") 	{fillAgents()}
	else {fillTags(type)}
}
function updateInfo(id, nameTag, loginShort, desc){ // добавление данных в поле обновления
	idNum = id;
	$("#updTextField1").val(nameTag);
	$("#updTextField2").val(loginShort);
	$("#updTextField3").val(desc);
	$("#updateWrapper").addClass("active");
}
$(document).ready(function() {
	fillAgents(); // стандартная страница при переходе в админку
	getTagGroups(); // для отображения групп в смене группы
	$('li.hl').click(function(){ // подсветка активного пункта навигации
		$('li.hl').removeClass('highlight');
		$(this).toggleClass('highlight');
	});
	$("#searchButton").click(function(event){ // поиск
		$("tr.table-row").each(function () { $(this).removeClass('search'); }); // очистить строки вывода от подсветки
		$("#searchField").removeClass("error"); // обнулить класс у строки поиска
		event.preventDefault(); 
		try{ 	var target_top= $('#'+$("#searchField").val()).offset().top; // поиск смещения относительно поля
				$('html, body').animate({scrollTop:target_top-50}, 'slow');	 // модная анимация пролета к этой строке	
				$('#'+$("#searchField").val()).addClass("search"); // выделение строки
		}
		catch(err){ $("#searchField").addClass("error"); } // ошибка
	});
	$('#searchField').keypress(function (e) { // обработки нажатия энтер
	 var key = e.which; 
	 if(key == 13)   {jQuery('#searchButton').click(); }
});
})