function getDashboardData()	{
//var URL = "https://adm.avito.ru/helpdesk/dashboard/pro";
//$.get(URL).done(function (data) { 
var data = '{"reactions":[{"id":365,"name":"Avito Delivery (почта)","target":10800,"reaction":249257,"now":1496062458},{"id":351,"name":"Общая","target":10800,"reaction":270736,"now":1496062458},{"id":363,"name":"Рекламные серисы","target":14400,"reaction":3848,"now":1496062458},{"id":945,"name":"Avito Delivery (форма)","target":10800,"reaction":200116,"now":1496062458},{"id":870,"name":"Auto Gold, Silver, Bronze","target":10800,"reaction":3314,"now":1496062458},{"id":706,"name":"Магазины (в УЗ есть менеджер)","target":14400,"reaction":98774,"now":1496062458},{"id":871,"name":"RE Gold, Silver, Bronze","target":10800,"reaction":79575,"now":1496062458},{"id":919,"name":"Silver General","target":14400,"reaction":3613,"now":1496062458},{"id":339,"name":"Магазины","target":14400,"reaction":267737,"now":1496062458},{"id":535,"name":"Re Premium","target":3600,"reaction":65714,"now":1496062458},{"id":354,"name":"Запросы менеджеров","target":28800,"reaction":3553,"now":1496062458},{"id":763,"name":"Gold General","target":10800,"reaction":93797,"now":1496062458}],"satisfactions":[{"id":2746,"name":"Ольга Долгова","four":3,"five":3},{"id":2749,"name":"Алексей Гребовод","four":1,"five":0},{"id":2827,"name":"Николай Голубихин","four":0,"five":0},{"id":2761,"name":"Тест про сапорт","four":0,"five":0},{"id":542,"name":"Кирилл Крымов","four":1,"five":0},{"id":2750,"name":"Светлана Нуштаева","four":0,"five":1},{"id":1706,"name":"Алексей Савин","four":0,"five":0},{"id":742,"name":"Ольга Изотова","four":0,"five":0},{"id":2276,"name":"Диана Пухм","four":0,"five":0},{"id":1744,"name":"Лидия Овечкина","four":0,"five":0},{"id":1684,"name":"Алена Гордеева","four":1,"five":0},{"id":1638,"name":"Ольга Комарова","four":0,"five":0},{"id":1584,"name":"Наталья Самодурова","four":1,"five":0}]}';
// } )
$("#allAgentsTable").removeClass("col-lg-8").addClass("col-lg-12");
$("#updateAgent").css({"display":"none"});
drawDashboardData(JSON.parse(data));
}
function sortingMarks(json_object) {
    function sortByKey(a, b) {
        var x = a["four"]+a["five"]*2;
        var y = b["four"]+b["five"]*2;
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
    json_object.sort(sortByKey);
}
function drawDashboardData(data){
	var react = data.reactions;
	sorting(react, "reaction");
	var satisf = data.satisfactions;
	sortingMarks(satisf);
	var firstColumn = "Очередь";
	var secondColumn = "Ожидание";
	var thirdColumn = "Реальность";
	var reactBody=satisfBody="";
	var reactHead = '<div class="row"><div class="col-lg-6"><table id="dashboardTableReactTime" class="table table-striped table-condensed table-hover" ><thead><tr><th class="col-lg-8">' + firstColumn + '</th><th class="col-lg-2 centered">' + secondColumn + '</th><th class="col-lg-2 centered">' + thirdColumn + '</th></tr></thead><tbody>'; 
	var bottomPart = '</tbody></table></div>';
	for (var i = 0; i< react.length; i++){
		var isReactionSlow = (react[i].reaction > react[i].target ) ? 'style="color:red;"' : 'style="color:green;"';
		var name = react[i].name;
		name=(name.length>=24)? name.substr(0,22)+"..": name;
		var targetInHours = react[i].target / 3600 + 'ч';
		var minutes = (Math.floor((react[i].reaction % 3600) / 60)>10) ? Math.floor((react[i].reaction % 3600) / 60) : "0" + Math.floor((react[i].reaction % 3600) / 60);
		var reactionHoursMinutes = Math.floor(react[i].reaction / 3600) + 'ч ' + minutes + 'м';
		reactBody+= '<tr><td>'+name+'</td><td class="centered bold">'+targetInHours+'</td><td class="centered bold" '+isReactionSlow+'>'+reactionHoursMinutes+'</td></tr>';
	}
	var satisfTableName = "Топ хороших оценок '4' и '5'";
	var satisfHead = '<div class="col-lg-6 pull-right"><table id="dashboardTableSatisfaction" class="table table-condensed table-hover" ><thead><tr><th colspan=2 class="col-lg-12">' + satisfTableName + '</th></tr></thead><tbody>';
	var maxMarkCount = satisf[0].four + satisf[0].five;
	for (var i=0; i<satisf.length; i++){
		var markCount = satisf[i].four + satisf[i].five;
		var four = satisf[i].four;
		var five = satisf[i].five;
		var percent = (markCount > 0) ? Math.ceil(markCount / maxMarkCount * 100): 0;
		if (four > 0 || five > 0){
		var fourProgress = (four > 0) ? '<div class="progress-bar" role="progressbar" aria-valuenow="'+Math.ceil(four / maxMarkCount * 100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.ceil(four / maxMarkCount * 100)+'%;"><span class="count bold">'+four+'</span></div>' : "";
		var fiveProgress = (five > 0) ? '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+Math.ceil(five / maxMarkCount * 100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.ceil(five / maxMarkCount * 100)+'%;"><span class="count bold">'+five+'</span></div>' : "";
		var progressBar = '<div class="progress">'+ fourProgress + fiveProgress + '</div>';
		satisfBody+='<tr ><td class="col-lg-6 noBottomBorderLine">'+satisf[i].name+'</td><td class="col-lg-6 noBottomBorderLine">'+progressBar+'</td></tr>';}
	}
	document.getElementById("allAgentsTable").innerHTML = reactHead + reactBody + bottomPart + satisfHead+satisfBody+ bottomPart + '</div>';
}