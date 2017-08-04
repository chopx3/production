var checker = optionsReturn = "";
var tagGroupsArray = [];
function getTagGroups(){ // заполнить группы тэгов для select смены группы тэга
			$.get(tagGroupURL).done(function (data) {
					var info = data;
					for (var i = 0;i<info.length;i++){
						tagGroupsArray[i] = info[i].name;
						optionsReturn +='<option value='+info[i].id+'>'+info[i].name+'</option>';
					}				
				})				
}
function openTags(value){ // функция отрисовки верха и низа таблицы
		document.getElementById("secondTable").innerHTML = "";
		var tbody =""; // обнуление параметров
		checker = value;
		drawInfo(checker); // боковые панели
		var tempURL = tagURL; // переменная ссылки, по умолчанию тэги, если не указано обратное(группы тэгов)
		var isGroup = false; // переменная "группы" тэгов, по умолчанию фолс(тэги), если не указано обратное(группа тэгов)
		$("#addWrapper").addClass("active").removeClass("higher");
		var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">ID</th><th class="col-lg-2">Тэг</th><th class=col-lg-3>Название</th><th class="col-lg-5">Описание</th><th class="col-lg-1">edit</th></tr></thead><tbody>';
		var tbot = '</tbody></table></div>'; // шапка и низ таблицы
			if (checker=="group"){ // если группа - меняются URL и переменная группы
				tempURL = tagGroupURL;
				isGroup = true;
			}
				$.get(tempURL).done(function (data) { // запрос
					tbody = drawTable(data, isGroup); // в данной переменной, после выполнения "пробега" будет вся информация
					document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot;	// итоговый результат	
				})
}
function drawTable(info, isGroup){ // рекурсивная функция отрисовки
		var forInfo=forHL="";	
		for(var i=0;i<info.length;i++){ // основной цикл отрисовки
			var id = info[i].id;
			if(isGroup) {var value = "group";forHL="class=groupTag";} // если группа - в поле value будет писаться group и добавь класс для выделения группы в таблице
			else {var value = info[i].value;forHL="";} // если нет - в поле value будет значение названия тэга и ничего не выделяется
			var name = info[i].name;
			var description = info[i].description; 
			dataArray = [id, value, name , description]; // заполнение переменных
			forInfo += "<tr id=\""+value+"\" "+ " "+forHL+" class='table-row'>"+
				"<td>"+id+"</td>"+
				"<td>"+value+"</td>"+
				"<td>"+name+"</td>"+
				"<td>"+description+"</td>"; // строки, заполняемые в цикле
				if(isGroup||checker == 'tags') {forInfo+='<td><button class="btn btn-sm btn-info" onclick=\"updateInfo(\''+dataArray[0]+'\',\''+dataArray[1]+'\',\''+dataArray[2]+'\',\''+dataArray[3]+'\')\">edit</button></td></tr>';} // вывод кнопки редактирования при выполнении условия
				else {forInfo +='<td></td></tr>';} // или нет
			if (isGroup){
			var tagForDraw = info[i].tags; 
			forInfo +=drawTable(tagForDraw,false); // если это группа тэгов, передать рекурсивно входящие в него тэги и параметр - НЕгруппа
			}
		}
return forInfo;
}
function changeTagGroup(){ // изменить группу тэгов, костыльный способ, через левую переменную
		TagInfo ={	"id": 		idNum,
					"value": 	$("#exampleSelect1").val()};
		var URL=changeTagGroupURL; 
		RestPost(TagInfo, URL);
}