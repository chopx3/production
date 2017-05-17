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
		document.getElementById("secondTable").innerHTML = "";
		checker = value;
		var tbody ="";
		drawInfo(checker);
		var tempUrl = tagUrl;
		var tempBoolean = false;
		$("#addWrapper").addClass("active").removeClass("higher");
		var thead = '<div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th class="col-lg-1">ID</th><th class="col-lg-2">Тэг</th><th class=col-lg-3>Название</th><th class="col-lg-5">Описание</th><th class="col-lg-1">edit</th></tr></thead><tbody>';
		var tbot = '</tbody></table></div>';
			if (checker=="group"){
				tempUrl = tagGroupUrl;
				tempBoolean = true;
			}
				$.get(tempUrl)
				.done(function (data) {
					var info = data;
					tbody = drawTable(info, tempBoolean);
			document.getElementById("allAgentsTable").innerHTML = thead + tbody + tbot;					
				})
}
function drawTable(info, isGroup){
var forInfo=forHL="";	
			for(var i=0;i<info.length;i++){
				var id = info[i].id;
				if(isGroup) {var value = "group";forHL="class=groupTag";}
				else {var value = info[i].value;forHL="";}
				var name = info[i].name;
				var description = info[i].description;
				
				dataArray = [id, value, name , description];
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