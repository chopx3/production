function openQuestions(){
	document.getElementById("secondTable").innerHTML = ""; // обнуление инфы во второй таблице, дополнительной 
		drawInfo("quest"); // отрисовка дополнительных боковых кнопок
		$("#addWrapper").addClass("active").removeClass("higher"); // поставить их на обычные позиции
		$.get(getQuestionsURL).done(function (data) { // запрос к базе по всем агентам
			var info = data;
			var tbody =""; 
			var thead = '<div class="table-scroll col-lg-12"><table id="questionTable" class="table table-striped table-hover"><thead><tr><th class="col-lg-1">id</th><th class="col-lg-5">description</th><th class="col-lg-3">shortname</th><th class="col-lg-2">isActive</th><th class="col-lg-1">edit</th></tr></thead><tbody>'; // шапка таблицы
			var tbot = '</tbody></table></div>'; // низ таблицы
			for(var i=0;i<info.length;i++){ // для всех тэгов
				var id = info[i].id; 
				var description = info[i].description;
				var shortname = info[i].shortName;
				var isActive = info[i].active;
				var isActiveHTML = (info[i].active) ? "<i style='color:green;'>Active<i>":"<i style='color:red;'>Disabled<i>";
				dataArray = [id, description, shortname, isActive]; // массив, который будет передаваться
				tbody += "<tr id="+shortname+" class='table-row'>"+
					"<td>"+id+"</td>"+
					"<td>"+description+"</td>"+
					"<td>"+shortname+"</td>"+
					"<td>"+isActiveHTML+"</td>"+
					"<td><button class='btn btn-sm btn-info' onclick=\'updateInfo(\""+dataArray[0]+"\","+JSON.stringify(dataArray[1])+",\""+dataArray[2]+"\",\""+dataArray[3]+"\")\'>edit</button></td>"+
				"</tr>"; // строка таблицы с кнопкой и данными, дополняемая в цикле
			}			
			document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot; // объединение 
		})
}