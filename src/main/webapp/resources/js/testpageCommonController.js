var host = "http://"+location.host+"/firecatcher/api";
var statURL = host+"/stat/find/";
var allAgentsUrl = host +"/agent/find";
var addAgentUrl = host +"/agent/save";
var updAgentUrl = host +"/agent/update";
var tagUrl = host+"/tags/find";
var addTagUrl = host+"/tags/save";
var updTagUrl = host+"/tags/update";
var tagGroupUrl = host+"/taggroup/find";
var addTagGroupUrl = host+"/taggroup/save";
var updTagGroupUrl = host+"/taggroup/update";
var changeTagGroup = host +"/tags/group";
var getQuestionsUrl = host + "/call/find/questions/";
var getCatsUrl = host+"/category/find";
var tempValue;
var tagGroupsArray = [];
var optionsReturn = "";
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
var getQuestionsInfoUrl = host+"/question/find";
var feedbackUrl = host + "/call/find/type/";
var oktell = "http://"+location.host+"/firecatcher/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
var admAvito = '<a href="https://adm.avito.ru/users/user/info/';
function drawInfo(value){
	$("#updateWrapper").removeClass("active");
	var addInfoBody = addInfoFooterFunc=updInfoBody=updInfoFooterFunc=addInfoHeaderValue=updInfoHeaderValue=updInfoFooterFuncSecond= "";
	if (value=="agents"){
		addInfoHeaderValue = 'Добавить агента';
		updInfoHeaderValue = 'Изменить информацию об агенте';
		addInfoBody = 
	'<div class=row><label class="rightLabel">username</label><input type="text" class="form-control inputTextField" id=addTextField1></div>'+
'<div class=row><label class="rightLabel">OktellLogin</label><input type="text" class="form-control inputTextField" id=addTextField2></div>';
		addInfoFooterFunc = "infoCheck(\'add\', \'agents\')";
		updInfoBody = 
				'<div class=row><label 	class="rightLabel">username</label>	<input type="text" 	class="form-control inputTextField" id=updTextField1></div>'+
				'<div class=row><label 	class="rightLabel">OktellLogin</label>	<input type="text" 	class="form-control inputTextField" id=updTextField2></div>'+
				'<div class=row><label 	class="rightLabel">Роль</label>'+
						'<div class="btn-group inputTextField" role="group" aria-label="Basic example" data-toggle=buttons>'+
							'<label class="btn btn-primary active">'+
							'<input type="radio" name="options" id="optionUser" autocomplete="off" checked>User'+
							'</label>'+
							'<label class="btn btn-primary">'+
							'<input type="radio" name="options" id="optionAdmin" autocomplete="off"> Admin'+
							'</label>'+
						'</div>'+
				'</div>';
	
	updInfoFooterFunc = "infoCheck(\'upd\', \'agents\')";
	}
	if (value=="tags"){
		var options = optionsReturn;
		addInfoHeaderValue = 'Добавить тэг';
		updInfoHeaderValue = 'Изменить информацию о тэге';
		addInfoFooterFunc = "infoCheck(\'add\', \'tags\')";
		updInfoFooterFuncSecond = '<button class="btn btn-primary" onclick="ChangeTagGroup()">Изменить группу</button>';
		updInfoFooterFunc = "infoCheck(\'upd\', \'tags\')";
		addInfoBody = 
		'<div class=row><label class="rightLabel">Тэг		</label><input type="text" class="form-control inputTextField" 	id=addTextField1>	</div>'		+
		'<div class=row><label class="rightLabel">Название	</label><input type="text" class="form-control inputTextField" 	id=addTextField2>	</div>'+
		'<div class=row><label class="rightLabel">Описание	</label><input type="text" class="form-control inputTextField" 	id=addTextField3>	</div>';
		updInfoBody = 
		'<div class=row><label class="rightLabel">Тэг		</label><input type="text" class="form-control inputTextField" 	id=updTextField1>	</div>'+
		'<div class=row><label class="rightLabel">Название	</label><input type="text" class="form-control inputTextField" 	id=updTextField2>	</div>'+
		'<div class=row><label class="rightLabel">Описание	</label><input type="text" class="form-control inputTextField" 	id=updTextField3>	</div>'+
		'<div class=row><label class="rightLabel">Группа тегов</label><select class="form-control inputTextField" id="exampleSelect1">'+
		options+ '</select>	</div>';

	}
	if (value=="group"){
		addInfoHeaderValue = 'Добавить группу тэгов';
		updInfoHeaderValue = 'Изменить информацию о группе тэгов'; 
		addInfoFooterFunc = "infoCheck(\'add\', \'group\')";		
		updInfoFooterFunc = "infoCheck(\'upd\', \'group\')";
		addInfoBody = 
		'<div class=row><label class="rightLabel">Название	</label><input type="text" class="form-control inputTextField" id=addTextField1>	</div>'+
		'<div class=row><label class="rightLabel">Описание	</label><input type="text" class="form-control inputTextField" id=addTextField2>	</div>';
		updInfoBody = 
		'<div class=row><label class="rightLabel">Название	</label><input type="text" class="form-control inputTextField" id=updTextField2>	</div>'+
		'<div class=row><label class="rightLabel">Описание	</label><input type="text" class="form-control inputTextField" id=updTextField3>	</div>';
	}
	if (value=="stat"){
	updInfoBody=
	'<form action="" method="get">'+
	'<input type="text" name="daterange" value="01-01-2015 - 01-31-2015" />'+
	'</p>'+
	'</form>'+
	'<button class="btn btn-info" id="yesterday" >Вчера</button>'+
	'<button class="btn btn-info" id="today">Сегодня</button>'+
	'<button class="btn btn-info" id="week">Неделя</button>'+
	'<button class="btn btn-info" id="month">Месяц</button>';
	addInfoBody=
	'<div class=row><label class="rightLabel">Звонки</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="categories" onclick="getInfo(\'categories\')">Категория</button><button class="btn btn-primary catButtons" value="users" onclick="getInfo(\'users\')">Users</button><button class="btn btn-primary catButtons" value="questions" onclick="getInfo(\'questions\')">Вопросы</button></div></div>'+
	'<div class=row><label class="rightLabel">Агенты</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="empty" onclick="getInfo(\'empty\')" >Незаполненные</button><button class="btn btn-primary catButtons" value="agents" onclick="getInfo(\'agents\')" id="allCalls"> Всего</button></div></div>'+
	'<div class=row><label class="rightLabel">Другие</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="managers" onclick="getInfo(\'managers\')">Менеджер</button><button class="btn btn-primary catButtons" value="outcomings" onclick="getInfo(\'outcomings\')">Исходящие</button></div></div>'+
	'<div class=row><label class="rightLabel">Feedback</label><div class="inputTextField"><button class="btn btn-primary catButtons" value="empty_feedback" onclick="getInfo(\'empty_feedback\')" >Незаполненные</button><button class="btn btn-primary catButtons" value="full_feedback" onclick="getInfo(\'full_feedback\')" id="allCalls"> Заполненные</button></div></div>';
	addInfoFooterFunc = updInfoFooterFunc = "";
	addInfoHeaderValue = "Выбор категории звонка";
	updInfoHeaderValue =  'Выберите период:';
	}
	var addInfoHeader = "<label>"+addInfoHeaderValue+"</label>";
	var updInfoHeader = "<label>"+updInfoHeaderValue+"</label>";
	var addInfoFooter = (value !="stat") ? '<button class="btn btn-success" onclick="'+addInfoFooterFunc+'">Добавить</button>' : "";
	var updInfoFooter = (value !="stat") ? '<button class="btn btn-success" onclick="'+updInfoFooterFunc+'">Изменить информацию</button>'+updInfoFooterFuncSecond : "";
	document.getElementById("updBody").innerHTML 	= updInfoBody;
	document.getElementById("updFooter").innerHTML 	= updInfoFooter;
	document.getElementById("updHeader").innerHTML 	= updInfoHeader;
	document.getElementById("addBody").innerHTML 	= addInfoBody;
	document.getElementById("addFooter").innerHTML 	= addInfoFooter;
	document.getElementById("addHeader").innerHTML 	= addInfoHeader;
};
function infoCheck(value, type){
	var check = true;
	var firstField = 	"#"+value+"TextField1";
	var secondField = 	"#"+value+"TextField2";
	if (type != "agents") {
	var thirdField = 	"#"+value+"TextField3";
	if($(thirdField).val()==""){$(thirdField).addClass("box-shadow"); check = false;}	}
	$(firstField).removeClass("box-shadow");
	$(secondField).removeClass("box-shadow");
	if($(firstField).val()==""){$(firstField).addClass("box-shadow");check = false;}
	if($(secondField).val()==""){$(secondField).addClass("box-shadow"); check = false;}
	if(check){
		if (type == "agents"){
		var URL;
		var infoToServer;
		if(value=="upd"){
		var role = ($('#optionAdmin').is(':checked'))?roleAdmin:roleUser;
		infoToServer ={
		"id":idNum,
        "username": $(firstField).val(),
        "oktellLogin":$(secondField).val(),
		"roles": JSON.parse(role)
		};
		URL = updAgentUrl;
		}
		else {
		infoToServer ={
        "username": $(firstField).val(),
        "oktellLogin":$(secondField).val()
		};
		URL=addAgentUrl; 
		}
		console.log(infoToServer);
		console.log(URL);
		}
		
		if (type == "tags"){
		if(value=="upd"){
		infoToServer ={
		"id":idNum,
        "value": $(firstField).val(),
        "name":$(secondField).val(),
		"description": $(thirdField).val(),
		};
		URL = updTagUrl;
		}
		else {
		infoToServer ={
		"value":$(firstField).val(),
        "name": $(secondField).val(),
		"description": $(thirdField).val()
		};
		URL=addTagUrl; 
		}			
		}
		if (type == "group") {
			if(value=="upd"){
				infoToServer ={
						"id":idNum,
						"name": $(secondField).val(),
						"description": $(thirdField).val()
						};
		URL = updTagGroupUrl;
			}
			else {
				infoToServer ={
				"name": $(firstField).val(),
				"description": $(secondField).val()
				};
				URL=addTagGroupUrl; 
				}	
		}
		RestPost(infoToServer, URL);
		fillInfo(type);
	}
}
function fillInfo(type){
	if (type == "agents") 	{fillAgents()}
	else {fillTags(type)}
}
function updateInfo(id, nameTag, loginShort, desc){
	idNum = id;
	$("#updTextField1").val(nameTag);
	$("#updTextField2").val(loginShort);
	$("#updTextField3").val(desc);
	$("#updateWrapper").addClass("active");
}
$(document).ready(function() {
	fillAgents();
	getTagGroups();
	$('li.hl').click(function(){
		$('li.hl').removeClass('highlight');
		$(this).toggleClass('highlight');
	});
	$("#searchButton").click(function(event){
		$("tr.table-row").each(function () { $(this).removeClass('search'); });
		$("#searchField").removeClass("error");
		event.preventDefault();
		try{
		var target_top= $('#'+$("#searchField").val()).offset().top;
		$('html, body').animate({scrollTop:target_top-50}, 'slow');		
		$('#'+$("#searchField").val()).addClass("search");
		}
		catch(err){
		$("#searchField").addClass("error");
		}
	});
	$('#searchField').keypress(function (e) {
 console.log("clicked");
 var key = e.which;
 if(key == 13)   {
   jQuery('#searchButton').click();
  }
});
})