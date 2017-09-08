function openAngry(){ // отрисовка таблицы агентов
		document.getElementById("secondTable").innerHTML = ""; // обнуление инфы во второй таблице, дополнительной 
		drawInfo("angry"); // отрисовка дополнительных боковых кнопок
		$("#addWrapper").addClass("active").removeClass("higher"); // поставить их на обычные позиции
		$.get(getAllAngryUsers).done(function (data) { // запрос к базе по всем агентам
			var info = data;
			var tbody =""; 
			var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-3">id</th><th class="col-lg-3">ticket</th><th class="col-lg-4">email</th><th class="col-lg-1">active</th><th class="col-lg-1">edit</th></tr></thead><tbody>'; // шапка таблицы
			var tbot = '</tbody></table></div>'; // низ таблицы
			for(var i=0;i<info.length;i++){ // для всех тэгов
				var id = info[i].avitoid; 
				var email = info[i].email;
				var ticket = info[i].ticket;
				var active = info[i].active;
				dataArray = [id, email, ticket, active]; // массив, который будет передаваться
				tbody += "<tr id="+id+" class='table-row'>"+
					"<td>"+id+"</td>"+
					"<td>"+ticket+"</td>"+
					"<td>"+email+"</td>"+
					"<td>"+active+"</td>"+
					'<td><button class="btn btn-sm btn-info" onclick=\"updateInfo(\''+dataArray[0]+'\',\''+dataArray[1]+'\',\''+dataArray[2]+'\',\''+dataArray[3]+'\')\">edit</button></td>'+
				"</tr>"; // строка таблицы с кнопкой и данными, дополняемая в цикле
			}			
			document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot; // объединение 
		})
}