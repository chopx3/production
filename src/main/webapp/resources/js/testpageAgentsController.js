
var roleUser = '[{ "id":2,"name":"ROLE_USER" }]';
var roleAdmin = '[{ "id":1,"name":"ROLE_ADMIN" }]';
var idNum;
var dataArray = [];
function fillAgents(){
		drawInfo("agents");
		$("#addWrapper").addClass("active").removeClass("higher");
		$.get(allAgentsUrl)
		.done(function (data) {
			var info = data;
			var tbody ="";
			var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">id</th><th class="col-lg-5">username</th><th class=col-lg-5>OktellLogin</th><th class="col-lg-1">edit</th></tr></thead><tbody>';
			var tbot = '</tbody></table></div>';
			for(var i=0;i<info.length;i++){
				var id = info[i].id;
				var login = info[i].oktellLogin;
				var name = info[i].username;
				var notes = info[i].notes;
				dataArray = [id, name, login, id];
				
				tbody += "<tr id="+name+">"+
					"<td>"+id+"</td>"+
					"<td>"+name+"</td>"+
					"<td>"+login+"</td>"+
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
function AgentCheck(value){
	var check = true;
	var nameField = "#"+value+"Name";
	var loginField = "#"+value+"Login";
	$(nameField).removeClass("box-shadow");
	$(loginField).removeClass("box-shadow");
	if($(nameField).val()==""){$(nameField).addClass("box-shadow");check = false;}
	if($(loginField).val()==""){$(loginField).addClass("box-shadow"); check = false;}
	if(check){
		var URL;
		var AgentInfo;
		if(value=="upd"){
		var role = ($('#optionAdmin').is(':checked'))?roleAdmin:roleUser;
		AgentInfo ={
		"id":idNum,
        "username": $(nameField).val(),
        "oktellLogin":$(loginField).val(),
		"roles": JSON.parse(role)
		};
		URL = updAgentUrl;
		}
		else {
		AgentInfo ={
        "username": $(nameField).val(),
        "oktellLogin":$(loginField).val()
		};
		URL=addAgentUrl; 
		}
		console.log(AgentInfo);
		console.log(URL);
		RestPost(AgentInfo, URL);
		fillAgents();
	}
}
$(document).ready(function() {
	$("#searchButton").click(function(event){
		event.preventDefault();
		var target_top= $('#'+$("#searchField").val()).offset().top;
		$('html, body').animate({scrollTop:target_top-50}, 'slow');
	});
	$('#searchField').keypress(function (e) {
 console.log("clicked");
 var key = e.which;
 if(key == 13)   {
   jQuery('#searchButton').click();
  }
});
})