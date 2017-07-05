var roleUser = '[{ "id":2,"name":"ROLE_USER" }]';
var roleAdmin = '[{ "id":1,"name":"ROLE_ADMIN" }]';
function fillAgents(){ // отрисовка таблицы агентов
		document.getElementById("secondTable").innerHTML = ""; // обнуление инфы во второй таблице, дополнительной 
		drawInfo("agents"); // отрисовка дополнительных боковых кнопок
		$("#addWrapper").addClass("active").removeClass("higher"); // поставить их на обычные позиции
		$.get(allAgentsURL).done(function (data) { // запрос к базе по всем агентам
			var info = data;
			var tbody =""; 
			var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">id</th><th class="col-lg-4">username</th><th class="col-lg-4">OktellLogin</th><th class="col-lg-1">Отдел</th><th class="col-lg-1">Роль</th><th class="col-lg-1">edit</th></tr></thead><tbody>'; // шапка таблицы
			var tbot = '</tbody></table></div>'; // низ таблицы
			for(var i=0;i<info.length;i++){ // для всех тэгов
				var id = info[i].id; 
				var login = info[i].oktellLogin;
				var name = info[i].username;
				var department = info[i].department;
				//var notes = info[i].notes;
				var role = (info[i].roles.length > 0)? info[i].roles[0].id : 0; // есть ли роли у пользователя
				var userRole = (role == 0) ? "Undefined" : (role == 1) ? "Admin" : "User"; // не определена, админ или юзер
				dataArray = [id, name, login, id]; // массив, который будет передаваться
				tbody += "<tr id="+name+" class='table-row'>"+
					"<td>"+id+"</td>"+
					"<td>"+name+"</td>"+
					"<td>"+login+"</td>"+
					"<td>"+department+"</td>"+
					"<td>"+userRole+"</td>"+
					'<td><button class="btn btn-sm btn-info" onclick=\"updateInfo(\''+dataArray[0]+'\',\''+dataArray[1]+'\',\''+dataArray[2]+'\',\''+dataArray[3]+'\')\">edit</button></td>'+
				"</tr>"; // строка таблицы с кнопкой и данными, дополняемая в цикле
			}			
			document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot; // объединение 
		})
}