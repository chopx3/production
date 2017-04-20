var tagUrl = "http://192.168.10.132:8080/firecatcher/api/tags/find";
var addTagUrl = "http://192.168.10.132:8080/firecatcher/api/tags/save";
var updTagUrl = "http://192.168.10.132:8080/firecatcher/api/tags/update";
function fillTags(){
		drawInfo("tags");
		$("#addWrapper").addClass("active");
		$.get(tagUrl)
		.done(function (data) {
			var info = data;
			var tbody ="";
			var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">id</th><th class="col-lg-2">value</th><th class=col-lg-3>name</th><th class="col-lg-5">description</th><th class="col-lg-1">edit</th></tr></thead><tbody>';
			var tbot = '</tbody></table></div>';
			for(var i=0;i<info.length;i++){
				var id = info[i].id;
				var value = info[i].value;
				var name = info[i].name;
				var description = info[i].description;
				dataArray = [id, value, name, description];
				tbody += "<tr id="+value+">"+
					"<td>"+id+"</td>"+
					"<td>"+value+"</td>"+
					"<td>"+name+"</td>"+
					"<td>"+description+"</td>"+
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
function TagCheck(value){
	var check = true;
	var nameField = "#"+value+"Tag";
	var loginField = "#"+value+"ShortName";
	var descField = "#"+value+"Desc";
	$(nameField).removeClass("box-shadow");
	$(loginField).removeClass("box-shadow");
	$(descField).removeClass("box-shadow");
	if($(nameField).val()==""){$(nameField).addClass("box-shadow");check = false;}
	if($(loginField).val()==""){$(loginField).addClass("box-shadow"); check = false;}
	if($(descField).val()==""){$(descField).addClass("box-shadow"); check = false;}
	if(check){
		var URL;
		var AgentInfo;
		if(value=="upd"){
		TagInfo ={
		"id":idNum,
        "name": $(nameField).val(),
        "value":$(loginField).val(),
		"description": $(descField).val()
		};
		URL = updTagUrl;
		}
		else {
		TagInfo ={
        "name": $(nameField).val(),
        "value":$(loginField).val(),
		"description": $(descField).val()
		};
		URL=addTagUrl; 
		}
		console.log(TagInfo);
		console.log(URL);
		RestPost(TagInfo, URL);
		fillTags();
	}
}
$(document).ready(function() {

})