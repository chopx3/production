 var chainId;
 var commentOrCallHandler;
 var idSaver;
 var dataArray;



 var websocket;
 var websocketUrl = "ws://localhost:8085/websocket/start";

 //192.168.10.132:8080/avito вставить вместо localhost:8085 для продакшн
 //update url calls http://192.168.10.132:8080/avito/rest/call/update


 var getCommentsURL = 'http://localhost:8085/rest/comment/get?userid=';
 var getCallsURL = 'http://localhost:8085/rest/call/getcallsforaccount?userid=';
 var updateEmptyCalls = "http://localhost:8085/rest/call/update";




 function startConnection() {
	 websocket = new WebSocket(websocketUrl);
	 websocket.onopen=function () {
		 // document.getElementById("websocketStatus").innerHTML = "Online";
		 console.log("Websocket connected");
	 };
 }






 $(document).ready(function() {
	 startConnection();
	 $("#menu-toggle").click( function (){
		$("#wrapper").toggleClass("menuDisplayed");
		$(this).text(function(i, text){
          return text === "Скрыть меню" ? "Раскрыть меню" : "Скрыть меню";
      })		
	});
	 var commentsInfo = null;
	 var callsInfo = null;
	 var emptyCallsInfo = null;
	 
	 var outputCalls;
	 var questNum="1";
	 var catNum="1";
	 var isManager=false;

$('input[name="question"]').change(function(e){
    questNum = e.target.id.substr(6,1);
});
$('input[name="category"]').change(function(e){
    catNum = e.target.id.substr(4,1);
});
$("#2299").click(function()
{
	dataArray = [chainId, -1, 9, 6, false];
	fillData(dataArray);
});
$('#sendDataButton').click(function()
{	
	$("#JsonText").val("");
	$('#IDNum').css({ "border": ''});	
	if ($('#IDNum').val()!="" && $('#IDNum').val()!="Введите ID")
	{
	dataArray = [chainId, $('#IDNum').val(), questNum, catNum, $("#IsManager").prop("checked")];
	fillData(dataArray);

	}
	else
	{
	$('#IDNum').css({ "border": '#FF0000 1px solid'});	
	$('#IDNum').attr('placeholder','Введите ID');
	}
	
});

$('li').click(function(){
      		$('li').removeClass('highlight');
           	$(this).toggleClass('highlight');
      });
//Переключение класса "Добавить звонок"			
$("#Adder").click(function()
			{	
				$("#SubForm").toggleClass("Add");			
			}
			);
$('#my_calls').click(function()
				{
				document.getElementById("CallForm").innerHTML = '';
				fillInfo("remove","Мои звонки");

						websocket.send("getMyEmptyCalls");
						websocket.onmessage = function (message) {

							var emptyCallsInfo = JSON.parse(message.data);

							console.log(emptyCallsInfo);
							console.log(emptyCallsInfo.agentName);
							draw(emptyCallsInfo);

						};
						websocket.onclose = function () {
							document.getElementById("websocketStatus").innerHTML = "Offline";
						};

						websocket.onerror = function (err) {
							document.getElementById("websocketStatus").innerHTML = "Error. "+err;
						};

			}
					);
					
$('#user_calls').click(function()
 {
	fillInfo("add","Звонки пользователя");
	
	commentOrCallHandler = "call";
	addButton();
	
 });				
$('#comments').click(function()
{
	fillInfo("add","Комментарии");
	commentOrCallHandler = "comment";
	addButton();
});
$('#CloseSubForm').click(function()
{
	$("#SubForm").removeClass("Add");
	$("#divAddButton0").removeClass('woop').siblings().removeClass('woop');	
});			
$('#notes').click(function()
{
	fillInfo("remove","Заметки");
});			
$('#feedback').click(function()
{
	fillInfo("remove","Feedback");			
});
function fillInfo(callForm, headerText)
{	
	$("#SubForm").removeClass("Add");
		if(callForm=="add")
		{
		$("#CallForm").addClass("inactive");
		}
		else
		{
		$("#CallForm").removeClass("inactive");
		}
	$("#HeaderText").text(headerText);
	document.getElementById("MainForm").innerHTML = '';
}
});
function getInfo(){
	idNumber = $('#IDforInfo').val();
	idSaver = $('#IDforInfo').val();
	if (commentOrCallHandler == "call")
	{
    $.get(
				getCallsURL + idNumber + '&time=1483813017000'
                ).done(
				 function (data) 
		{

	    	outputCalls ='';
      		var callsInfo = data;
			console.log(data);			
      		document.getElementById("MainForm").innerHTML = '';
      		var callsAsJSON = JSON.stringify(callsInfo.result);
			var parsedCalls = JSON.parse(JSON.parse(callsAsJSON));
			if (parsedCalls.records.length != 0&&idNumber!='')
			{			
			for (var i = 0; i < parsedCalls.records.length; i++) 
			{
			var audiotag = parsedCalls.records[i][0];
			var nametag = parsedCalls.records[i][1];
			var timetag = $.format.date(new Date().setTime(parsedCalls.records[i][2]), 'dd/MM/yyyy@HH:mm:ss');
			
			var audioURL = '<audio src="' + audiotag + '" controls></audio><a href="'+ audiotag +'" target="_blank">' + '<\/a>';
			outputCalls += '<div class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +' '+nametag + '</span><br>' + audioURL + '</div>';	
			}
			}
			else 
			{
			outputCalls ='На данной учетной записи еще не было звонков';	
			}
			
			document.getElementById("MainForm").innerHTML = outputCalls;
			
			
		}	
				 
                ).fail(
                    function () {
						console.log("---");
                            }

                );
	}
	if(commentOrCallHandler == "comment")
	{
		$.get(getCommentsURL+idNumber+'&time=1483457133166')
		.done(function (data) 
		{
			document.getElementById("MainForm").innerHTML = '';
			var commentsInfo = data;
			var commentsAsJSON = JSON.stringify(commentsInfo.result);
			var parsedComments = JSON.parse(JSON.parse(commentsAsJSON));
			var outputComments = '';
			if (parsedComments.records.length != 0)
			{			
			for (var i = 0; i < parsedComments.records.length; i++) 
				{
					var message = parsedComments.records[i][0];
					var nametag = parsedComments.records[i][1];
					var timetag = $.format.date(new Date().setTime(parsedComments.records[i][2]), 'dd/MM/yyyy@HH:mm:ss');				
					outputComments += '<div class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag + ' ' + nametag + '</span><p>' + message + '</p></div>';			
				}
			}
			else
			{
				outputComments='На данной учетной записи еще не оставляли комментариев';
			}
			document.getElementById("MainForm").innerHTML = outputComments;
			
		}					 
             )
				.fail(
                    function () {
						console.log("---");
                            }

                );
	}
}
function addButton()
{
	document.getElementById("CallForm").innerHTML =	'<div class="row">'
								+ '<div class="cell">'
									+ '<div class="form-group col-lg-6">'
										+ '<input type="number" class="form-control" id="IDforInfo" placeholder="ID учетной записи">'
									+ '</div>'
								+ '</div>'
								+ '<div class="cell">'				
									+ '<div id="submit" class="btn-group col-lg-6" data-toggle="buttons">'
										+ '<button type="button" id="IDSubmit" class="btn btn-primary" onclick=getInfo()>GO </button>'								  	
									+ '</div>'
								+ '</div>'
							+ '</div>';
}
function fillData(dataArray)
{
	$("#JsonText").val("uChainId:"+dataArray[0]+",\n"+
	"uAvitoUserId:"+dataArray[1]+",\n"+
	"question:"+dataArray[2]+",\n"+
	"shop_category:"+dataArray[3]+",\n"+
	"isManager:"+dataArray[4]);

		$.get(
			updateEmptyCalls, {
				uChainId: dataArray[0],
				uAvitoUserId: dataArray[1],
				question : dataArray[2],
				shop_category : dataArray[3],
				isManager : dataArray[4]
			}
		).done(
			function (response) {
				if (response.status != 'ok') {
					errorHandler(response.description);
				}
				callback(response);
			}
		).fail(
			function () {
				errorHandler('Ошибка соединения с сервером.');
			}
		);

}
 function reply_click(id,i)
{
	var idd = '#divAddButton'+i;
	console.log(id);
    $("#SubForm").addClass("Add");
    $(idd).addClass('woop').siblings().removeClass('woop');
	chainId = id;
}
function  draw(emptyCallsInfo) {
	alert(emptyCallsInfo.agentName);
	var nametag = emptyCallsInfo.agentName;
	var oktell = "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=";

	var outputEmptyCalls = '';

	for (var i = 0; i < emptyCallsInfo.emptyCallList.length; i++)
	{
		var chain = emptyCallsInfo.emptyCallList[i].chainId;
		var audiosrc = emptyCallsInfo.emptyCallList[i].comId;
		var timetag = $.format.date(new Date().setTime(emptyCallsInfo.emptyCallList[i].startTime), 'dd/MM/yyyy@HH:mm:ss');
		var addButton = '<a href="#"  class="btn btn-success" id="' + chain + '" onclick=reply_click(this.id,'+i+')> Добавить </a>';
		var audioURL = '<audio src="' + oktell + audiosrc + '" controls></audio><a href="'+ oktell + audiosrc +'" target="_blank">' + '<\/a>';
		outputEmptyCalls += '<div id="divAddButton' +i+'" class="history" data-time="'+timetag+'" data-sign="'+nametag+'"><span class="history-info">'+ timetag +' '+nametag +'\t\t' + addButton + '</span><br>' + audioURL + '</div>';
	}

	document.getElementById("MainForm").innerHTML = outputEmptyCalls;


}