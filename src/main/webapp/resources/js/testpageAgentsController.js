
var roleUser = '[{ "id":2,"name":"ROLE_USER" }]';
var roleAdmin = '[{ "id":1,"name":"ROLE_ADMIN" }]';
var idNum;
var dataArray = [];
function fillAgents(){
		document.getElementById("secondTable").innerHTML = "";
		drawInfo("agents");
		$("#addWrapper").addClass("active").removeClass("higher");
		$.get(allAgentsUrl)
		.done(function (data) {
			var info = data;
			var tbody ="";
			var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">id</th><th class="col-lg-5">username</th><th class=col-lg-4>OktellLogin</th><th class="col-lg-1">Роль</th><th class="col-lg-1">edit</th></tr></thead><tbody>';
			var tbot = '</tbody></table></div>';
			for(var i=0;i<info.length;i++){
				var id = info[i].id;
				var login = info[i].oktellLogin;
				var name = info[i].username;
				var notes = info[i].notes;
				var role = (info[i].roles.length > 0)? info[i].roles[0].id : 0;
				var userRole = (role == 0) ? "Undefined" : (role == 1) ? "Admin" : "User";
				dataArray = [id, name, login, id];
				
				tbody += "<tr id="+name+" class='table-row'>"+
					"<td>"+id+"</td>"+
					"<td>"+name+"</td>"+
					"<td>"+login+"</td>"+
					"<td>"+userRole+"</td>"+
					'<td><button class="btn btn-sm btn-info" onclick=\"updateInfo(\''+dataArray[0]+'\',\''+dataArray[1]+'\',\''+dataArray[2]+'\',\''+dataArray[3]+'\')\">edit</button></td>'+
				"</tr>";
			}
			
			var fullTable = thead + tbody + tbot;
			document.getElementById("allAgentsTable").innerHTML = fullTable;
		})
		.fail(function () {
				console.log("---");
			}
		);
}

$(document).ready(function() {
	
})