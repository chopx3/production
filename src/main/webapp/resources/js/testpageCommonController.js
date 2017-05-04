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
var tempValue;
var tagGroupsArray = [];
var optionsReturn = "";
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
var getCatsUrl = host+"/category/find";
var getQuestionsInfoUrl = host+"/question/find"
var oktell = "http://"+host+"/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1=";
function drawInfo(value){
	$("#updateWrapper").removeClass("active");
	var addInfoBody, addInfoFooter, updInfoBody, updInfoFooter, addInfoHeader, updInfoHeader;
	if (value=="agents"){
		addInfoHeader = '<label>Добавить агента</label>';
		updInfoHeader = '<label>Изменить информацию об агенте</label>';
		addInfoBody = 
	'<div class=row><label class="updLabel">username</label><input type="text" class="form-control upd-text" id=addName></div>'+
'<div class=row><label class="updLabel">OktellLogin</label><input type="text" class="form-control upd-text" id=addLogin></div>';
		addInfoFooter = '<button class="btn btn-success" onclick="AgentCheck(\'add\')">Добавить агента</button>';
		updInfoBody = 
				'<div class=row><label 	class="updLabel">username</label>	<input type="text" 	class="form-control upd-text" id=updName></div>'+
				'<div class=row><label 	class="updLabel">OktellLogin</label>	<input type="text" 	class="form-control upd-text" id=updLogin></div>'+
				'<div class=row><label 	class="updLabel">Роль</label>'+
						'<div class="btn-group upd-text" role="group" aria-label="Basic example" data-toggle=buttons>'+
							'<label class="btn btn-primary active">'+
							'<input type="radio" name="options" id="optionUser" autocomplete="off" checked>User'+
							'</label>'+
							'<label class="btn btn-primary">'+
							'<input type="radio" name="options" id="optionAdmin" autocomplete="off"> Admin'+
							'</label>'+
						'</div>'+
				'</div>';
	updInfoFooter = '<button class="btn btn-success" onclick="AgentCheck(\'upd\')">Изменить информацию</button>';		
	}
	if (value=="tags"){
		var options = optionsReturn;
		addInfoHeader = '<label>Добавить тэг</label>';
		updInfoHeader = '<label>Изменить информацию о тэге</label>';
		addInfoBody = 
'<div class=row><label class="updLabel">Тэг</label><input type="text" class="form-control upd-text" id=addShortName>	</div>'		+
'<div class=row><label class="updLabel">Название		</label><input type="text" class="form-control upd-text" id=addTag>	</div>'+
'<div class=row><label class="updLabel">Описание</label><input type="text" class="form-control upd-text" id=addDesc>	</div>';
		updInfoBody = 
		'<div class=row><label class="updLabel">Тэг</label><input type="text" class="form-control upd-text" id=updShortName>	</div>'+
		'<div class=row><label class="updLabel">Название		</label><input type="text" class="form-control upd-text" id=updTag>	</div>'+
		'<div class=row><label class="updLabel">Описание</label><input type="text" class="form-control upd-text" id=updDesc>	</div>'+'<div class=row><label class="updLabel">Группа тегов</label><select class="form-control upd-text" id="exampleSelect1">'+
options+ '</select>	</div>';
		addInfoFooter = '<button class="btn btn-success" onclick="TagCheck(\'add\')">Добавить тэг</button>';
		updInfoFooter = '<button class="btn btn-success" onclick="TagCheck(\'upd\')">Изменить информацию</button><button class="btn btn-primary" onclick="ChangeTagGroup()">Изменить группу</button>';
	}
	if (value=="group"){
		addInfoHeader = '<label>Добавить группу тэгов</label>';
		updInfoHeader = '<label>Изменить информацию о группе тэгов</label>'; 
		addInfoBody = 
'<div class=row><label class="updLabel">Название		</label><input type="text" class="form-control upd-text" id=addTag>	</div>'+
'<div class=row><label class="updLabel">Описание</label><input type="text" class="form-control upd-text" id=addDesc>	</div>';
		updInfoBody = 
		'<div class=row><label class="updLabel">Название		</label><input type="text" class="form-control upd-text" id=updTag>	</div>'+
		'<div class=row><label class="updLabel">Описание</label><input type="text" class="form-control upd-text" id=updDesc>	</div>';
		addInfoFooter = '<button class="btn btn-success" onclick="TagCheck(\'add\')">Добавить группу тэгов</button>';
		updInfoFooter = '<button class="btn btn-success" onclick="TagCheck(\'upd\')">Изменить информацию</button>';
	}
	if (value=="stat"){
	updInfoHeader =  '';
	updInfoBody=
	'<form action="" method="get">'+
	'<p><big>Выберите период:</big><br>'+
	'<input type="text" name="daterange" value="01-01-2015 - 01-31-2015" />'+
	'</p>'+
	'</form>'+
	'<button class="btn btn-info" id="yesterday" >Вчера</button>'+
	'<button class="btn btn-info" id="today">Сегодня</button>'+
	'<button class="btn btn-info" id="week">Неделя</button>'+
	'<button class="btn btn-info" id="month">Месяц</button>';
	updInfoFooter = "";
	addInfoHeader = "<label>Выбор категории звонка</label>";
	addInfoBody=
	'<div class=row><label class="updLabel">Звонки</label><div class="upd-text"><button class="btn btn-primary catButtons" value="categories" onclick="getInfo(\'categories\')">Категория</button><button class="btn btn-primary catButtons" value="users" onclick="getInfo(\'users\')">Users</button><button class="btn btn-primary catButtons" value="questions" onclick="getInfo(\'questions\')">Вопросы</button></div></div>'+
	'<div class=row><label class="updLabel">Агенты</label><div class="upd-text"><button class="btn btn-primary catButtons" value="agents\/empty" onclick="getInfo(\'agents\/empty\')" >Незаполненные</button><button class="btn btn-primary catButtons" value="agents" onclick="getInfo(\'agents\')" id="allCalls"> Всего</button></div></div>'+
	'<div class=row><label class="updLabel">Другие</label><div class="upd-text"><button class="btn btn-primary catButtons" value="managers" onclick="getInfo(\'managers\')">Менеджер</button><button class="btn btn-primary catButtons" value="outcomings" onclick="getInfo(\'outcomings\')">Исходящие</button></div></div>';
	addInfoFooter = "";
	}
	document.getElementById("updBody").innerHTML = updInfoBody;
	document.getElementById("updFooter").innerHTML = updInfoFooter;
	document.getElementById("updHeader").innerHTML = updInfoHeader;
	document.getElementById("addBody").innerHTML = addInfoBody;
	document.getElementById("addFooter").innerHTML = addInfoFooter;
	document.getElementById("addHeader").innerHTML = addInfoHeader;
};

function updateInfo(id, nameTag, loginShort, desc){
	idNum = id;
	$("#updName").val(nameTag);
	$("#updLogin").val(loginShort);
	$("#updTag").val(nameTag);
	$("#updShortName").val(loginShort);
	$("#updDesc").val(desc);
	$("#updateWrapper").addClass("active");
}
$(document).ready(function() {
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