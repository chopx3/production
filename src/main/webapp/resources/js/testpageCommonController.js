function drawInfo(value){
	var addInfoBody, addInfoFooter, updInfoBody, updInfoFooter;
	if (value=="agents"){
		addInfoBody = 
	'<div class=row><label class="updLabel">Имя</label><input type="text" class="form-control upd-text" id=addName></div>'+
'<div class=row><label class="updLabel">Логин</label><input type="text" class="form-control upd-text" id=addLogin></div>';
		addInfoFooter = '<button class="btn btn-success" onclick="AgentCheck(\'add\')">Добавить агента</button>';
		updInfoBody = 
				'<div class=row><label 	class="updLabel">Имя</label>	<input type="text" 	class="form-control upd-text" id=updName></div>'+
				'<div class=row><label 	class="updLabel">Логин</label>	<input type="text" 	class="form-control upd-text" id=updLogin></div>'+
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
		addInfoBody = 
'<div class=row><label class="updLabel">Тэг		</label><input type="text" class="form-control upd-text" id=addTag>	</div>'+
'<div class=row><label class="updLabel">Название</label><input type="text" class="form-control upd-text" id=addShortName>	</div>'+
'<div class=row><label class="updLabel">Описание</label><input type="text" class="form-control upd-text" id=addDesc>	</div>';
		updInfoBody = 
		'<div class=row><label class="updLabel">Тэг		</label><input type="text" class="form-control upd-text" id=updTag>	</div>'+
		'<div class=row><label class="updLabel">Название</label><input type="text" class="form-control upd-text" id=updShortName>	</div>'+
		'<div class=row><label class="updLabel">Описание</label><input type="text" class="form-control upd-text" id=updDesc>	</div>';
		addInfoFooter = '<button class="btn btn-success" onclick="TagCheck(\'add\')">Добавить тэг</button>';
		updInfoFooter = '<button class="btn btn-success" onclick="TagCheck(\'upd\')">Изменить информацию</button>';
	}
	document.getElementById("updBody").innerHTML = updInfoBody;
	document.getElementById("updFooter").innerHTML = updInfoFooter;
	document.getElementById("addBody").innerHTML = addInfoBody;
	document.getElementById("addFooter").innerHTML = addInfoFooter;
};
function updateInfo(id, nameTag, loginShort, desc){
				console.log(dataArray[0]);
				console.log(dataArray[1]);
				console.log(dataArray[2]);
				console.log(dataArray[3]);
	idNum = id;
	$("#updName").val(nameTag);
	$("#updLogin").val(loginShort);
	$("#updTag").val(nameTag);
	$("#updShortName").val(loginShort);
	$("#updDesc").val(desc);
	$("#updateWrapper").addClass("active");
}
$(document).ready(function() {
})