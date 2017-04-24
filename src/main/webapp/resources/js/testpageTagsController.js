var HostUrl = location.protocol+"//"+location.host+"/firecatcher/api/";
var tagUrl = HostUrl+"tags/find";
var addTagUrl = HostUrl+"tags/save";
var updTagUrl = HostUrl+"tags/update";
var tagGroupUrl = HostUrl+"taggroup/find";
var addTagGroupUrl = HostUrl+"taggroup/save";
var updTagGroupUrl = HostUrl+"taggroup/update";
var checker = "";
var dataArray = [];
function fillTags(value){
		checker = value;
		var tbody ="";
		drawInfo(checker);
		$("#addWrapper").addClass("active").removeClass("higher");
		var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">id</th><th class="col-lg-2">value</th><th class=col-lg-3>name</th><th class="col-lg-5">description</th><th class="col-lg-1">edit</th></tr></thead><tbody>';
		var tbot = '</tbody></table></div>';
		if (checker=="tags"){				
		$.get(tagUrl)
		.done(function (data) {
			var info = data;
			tbody = drawTable(info, false);
			document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot;
		});		
			}
			if (checker=="group"){
				$.get(tagGroupUrl)
				.done(function (data) {
					var info = data;
					tbody = drawTable(info, true);
			document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot;					
				})
			}
		//var fullTable = thead + tbody + tbot;
		//document.getElementById("allAgentsTable").innerHTML = fullTable;
}
function drawTable(info, group){
var forInfo=forHL="";	
			for(var i=0;i<info.length;i++){
				var id = info[i].id;
				if(group) {var value = "";forHL="class=groupTag";}
				else {var value = info[i].value;forHL="";}
				var name = info[i].name;
				var description = info[i].description;
				
				dataArray = [id, name,value , description];
				forInfo += "<tr id=\""+value+"\" "+ " "+forHL+">"+
					"<td>"+id+"</td>"+
					"<td>"+value+"</td>"+
					"<td>"+name+"</td>"+
					"<td>"+description+"</td>"+
					'<td><button class="btn btn-sm btn-info" onclick=\"updateInfo(\''+dataArray[0]+'\',\''+dataArray[1]+'\',\''+dataArray[2]+'\',\''+dataArray[3]+'\')\">edit</button></td>'+
				"</tr>";
				if (group){
				var tagForDraw = info[i].tags;
				forInfo +=drawTable(tagForDraw,false);
				}
			}
return forInfo;			
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
	if(checker=="tags"){if($(loginField).val()==""){$(loginField).addClass("box-shadow"); check = false;}}
	if($(descField).val()==""){$(descField).addClass("box-shadow"); check = false;}
	if(check){
		
		var URL;
		var AgentInfo;
		if(checker=="tags"){
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
		}
		else{
			if(value=="upd"){
				TagInfo ={
						"id":idNum,
						"name": $(nameField).val(),
						"description": $(descField).val()
						};
		URL = updTagGroupUrl;
			}
			else {
				TagInfo ={
				"name": $(nameField).val(),
				"value":$(loginField).val(),
				"description": $(descField).val()
				};
				URL=addTagGroupUrl; 
				}	
		}
		RestPost(TagInfo, URL);
		console.log(TagInfo+" "+URL);
		fillTags(checker);
	}
}
$(document).ready(function() {

})