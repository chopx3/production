

var checker = "";
var dataArray = [];
function getTagGroups(){
			$.get(tagGroupUrl)
				.done(function (data) {
					var info = data;
					for (var i = 0;i<info.length;i++){
						tagGroupsArray[i] = info[i].name;
						optionsReturn +='<option value='+info[i].id+'>'+info[i].name+'</option>';
					}				
				})				
}
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
function drawTable(info, isGroup){
var forInfo=forHL="";	
			for(var i=0;i<info.length;i++){
				var id = info[i].id;
				if(isGroup) {var value = "group";forHL="class=groupTag";}
				else {var value = info[i].value;forHL="";}
				var name = info[i].name;
				var description = info[i].description;
				
				dataArray = [id, name,value , description];
				forInfo += "<tr id=\""+value+"\" "+ " "+forHL+" class='table-row'>"+
					"<td>"+id+"</td>"+
					"<td>"+value+"</td>"+
					"<td>"+name+"</td>"+
					"<td>"+description+"</td>";
					if(isGroup||checker == 'tags') {forInfo+='<td><button class="btn btn-sm btn-info" onclick=\"updateInfo(\''+dataArray[0]+'\',\''+dataArray[1]+'\',\''+dataArray[2]+'\',\''+dataArray[3]+'\')\">edit</button></td>'+
					"</tr>";}
					else {forInfo +='<td></td></tr>';}
				
				if (isGroup){
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
		"description": $(descField).val(),
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
function ChangeTagGroup(){
		TagInfo ={
        "id": idNum,
        "value": $("#exampleSelect1").val()
		};
		URL=changeTagGroup; 
		console.log(TagInfo)
		RestPost(TagInfo, URL);
}
$(document).ready(function() {

})