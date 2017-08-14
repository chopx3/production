// Основной js файл для админ\фидбека, отвечает за отрисовку звонков и тэгов
var catNum = 6; // дефолтное значение для категории, 6=все категории
var Call = Comment = Tags = "";
var clientsFromBIBaseMap = new Map();
var clientsInFCBaseMap = new Map();
var clientsToAddFromBI = new Map();
var clientsFromBIBaseArray = [];
var clientsInFCBaseArray = [];
var result = [];
var counter = 0;
var finalCSVFile = [];
var headerNames = ["External_id", "name", "ADMIN Contact Name", "Phone from admin", "телефон1"];
var neededHeaders = ["avito_id", "username", "contact_person", "adm_phone", "contact_phone"]; 
$(document).ready(function() {
	getCategories();
	$('input[name="category"]').change(function(e){
		catNum = $(this).attr("value");
	});
	createTagsTable();
 $.get({
        type: "GET",
        url: "http://localhost:8080/firecatcher/resources/test/test.csv",
        dataType: "text",
        headers: { 
        Accept : "text/csv; charset=utf-8", // cp1251?
        "Content-Type": "text/csv; charset=utf-8"
        },
        success: function(data) {csvJSON(data);
        	getAllRepremUsers();}
     });	
 console.log(clientsInFCBaseMap);
 console.log(clientsFromBIBaseMap);
 setTimeout(function(){checkClientsToAdd(clientsInFCBaseMap, result);}, 1500);
 createCSV();
});
function csvJSON(csv){
  var lines=csv.split("\n");
  var mapResult = [];
  var headers=lines[0].split(";");
  for(var i=1;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(";");
    for(var j=0;j<headers.length;j++){
      if (headerNames.indexOf(headers[j])+1){
      obj[neededHeaders[headerNames.indexOf(headers[j])]] = currentline[j];
      }
      if (neededHeaders[headerNames.indexOf(headers[j])] === "avito_id"){
        clientsFromBIBaseMap.set(+currentline[j], "true");
      }
    }
    result.push(obj);
  }
  console.log(result);
}
function setActiveStatus(status, id){
	var client ={
                "avitoId" : id,
                "active"  : +status
              };
              RestPost(client, updateRepremActiveURL);
}
function getAllRepremUsers(){
$.get(getAllRepremUsersURL).done(function (data) {
  var info = data;
  for (var i = 0;i<info.length;i++){
  	if(clientsFromBIBaseMap.has(info[i].avitoId) != info[i].active){setActiveStatus(clientsFromBIBaseMap.has(info[i].avitoId), info[i].avitoId);}
  	  clientsInFCBaseMap.set(info[i].avitoId, true);
  }
  }) 
}
function checkClientsToAdd(map, array){
	console.log(map);
	console.log(array);
	for (var i=0; i<array.length; i++){
		if(!map.has(+array[i].avito_id) && +array[i].avito_id > 0){
			var newClient = {
				"avitoId" : array[i].avito_id,
				"admPhone" : array[i].adm_phone,
				"contactPerson" :  array[i].contact_person,
				"contactPhone" :  array[i].contact_phone,
				"username" :  array[i].username,
				"active" : 1
			}
			RestPost(newClient, addRepremURL);
		}
	}
}
function createCSV(){
	$.get(getAllRepremUsersURL).done(function (data) {
  var info = data;
  var arrayOfObjectsOfActiveUsers = [];
  var shortNumbers = [];
  var regExpMultilines = /(\r\n|\n|\r)\1{1,}/gm;
  var phoneRegExp = /(^7)([0-9]{10})/gm;
  for (var i = 0;i<info.length;i++){

  	var obj = {};
  	if (info[i].active){
  		var nameWOComma = (info[i].username).replace(",", ".");
  		var phone = (info[i].admPhone+"").replace(phoneRegExp, "$2");
			obj = {
				"Name" : info[i].avitoId + ", " + nameWOComma,
				"Phone" : +phone			
			}
			if (phone<1000000000){shortNumbers.push(obj);}
			arrayOfObjectsOfActiveUsers.push(obj);
			if (info[i].contactPhone > 0){
				var phone = (info[i].contactPhone+"").replace(phoneRegExp, "$2");
				obj = {
				"Name" : info[i].avitoId + ", " + nameWOComma,
				"Phone" : +phone			
				}
				if (phone<1000000000){shortNumbers.push(obj);}
			arrayOfObjectsOfActiveUsers.push(obj);	
			}
			if(info[i].additionalPhones !== null){
				if ((info[i].additionalPhones).replace(regExpMultilines, "") !== null && (info[i].additionalPhones).replace(regExpMultilines, "") !== "" && (info[i].additionalPhones).replace(regExpMultilines, "") !== " "){
					var numbers = (info[i].additionalPhones).replace(regExpMultilines, "\n").trim();
					var numbersArray = numbers.split("\n");
					for (var j=0;j<numbersArray.length; j++){
						var phone = (numbersArray[j]+"").replace(phoneRegExp, "$2");
						obj = {
						"Name" : info[i].avitoId + ", " + nameWOComma,
						"Phone" : +phone			
						}
						if (phone<1000000000){shortNumbers.push(obj);}
						arrayOfObjectsOfActiveUsers.push(obj);	
					}
				}		
			}			
  	}  	
  }
  var date = new Date();
  downloadCSV({
            data: dedupe(arrayOfObjectsOfActiveUsers),
            filename: "reprem-"+date.getHours()+"-"+date.getMinutes()+".csv"
        })
  })
}
function dedupe(arr) {
  return arr.reduce(function (p, c) {

    // create an identifying id from the object values
    var id = [c.Name, c.Phone].join('|');

    // if the id is not found in the temp array
    // add the object to the output array
    // and add the key to the temp array
    if (p.temp.indexOf(id) === -1) {
      p.out.push(c);
      p.temp.push(id);
    }
    return p;

  // return the deduped array
  }, { temp: [], out: [] }).out;
}
function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ';';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV(args) {
        var data, filename, link;

        var csv = convertArrayOfObjectsToCSV({
            data: args.data
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=cp1251,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
function getCalls(){ // Получить список всех звонков и вывести их в поле, после проверки условий
	var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000;
	var URL;
	if (catNum==6){URL = ($("#toggle-trigger").prop("checked"))? updatedForFeedbackURL : fullFeedbackURL;}
	else { var toggle = ($("#toggle-trigger").prop("checked")) ? "updated/" : "full_feedback/";
		URL = getCallsByQuestionandTypeURL + (parseInt(catNum)+1) + "/" + toggle;}
		$.get(URL+timeStart+"/"+timeEnd+"/").done( function (data) { // Получение полного списка
					Call ='';
					document.getElementById("MainForm").innerHTML = ''; // очистка основной формы
					var feedbackInfo = data;
					sorting(feedbackInfo, "timeStart");
					if (feedbackInfo.length != 0) { // Если не пустой выводи v					
						for (var i = 0; i < feedbackInfo.length; i++) { // 	 все строки
							var tagCollector =""; // строка со всеми тэгами в звонке, обнуление
							var tagCheck = false; // проверка на наличие выбранных для поиска тэгов, если true - звонок подходит
							sorting(feedbackInfo[i].tags, "id"); // сортировка тэгов по обратному порядку
							for (var j=0;j<feedbackInfo[i].tags.length;j++){ // цикл для сборки тэгов и проверки подходящих
								tagCollector +=feedbackInfo[i].tags[j].value + ' '; // сборка тэгов
								if (tagsMap.has(feedbackInfo[i].tags[j].id.toString())) {tagCheck=true;}// проверка, есть ли этот тэг в мапе, приведение к стрингу, если есть - тру
								}
							if( tagCheck ){ // если подходит категория или выбраны все категории и тэг есть в мапе	
							timetag = moment(feedbackInfo[i].timeStart).format(dateFormat); // дата, стандартный вид
							userID = feedbackInfo[i].avitoUserId;
							Tags = "<div class='tags col-lg-3'><label class='might-overflow'>" + tagCollector + "</label></div>"; // блок тэгов, 1\4 экрана, класс "переполнение"
							Comment = "<div id='comment"+ i +"' class='col-lg-4 comments'> <textarea class='form-control cursor-def' id='noteArea' disabled>"+ feedbackInfo[i].comments +"</textarea> </div> "; // блок комментов, 1\3 экрана, отключены
							var multipleCallsInfo = {
								data: feedbackInfo,
								counter: i
							};
							var nextCall = collectMultipleCalls(multipleCallsInfo); // 
							var margin = (nextCall == "") ? "" : "no-margin-top"; // отступы при нескольких звонках, сложная схема
							audioURL = '<audio class="audio-call '+margin+'" id="audio'+i+'" src="' + oktell + feedbackInfo[i].comId + '" controls></audio><a href="'+ oktell + feedbackInfo[i].chainId +'" target="_blank">' + '</a>'; // аудио тэг, уникальный id по номеру, ссылка на октелл
							Call += '<div class="row"><div id="feedbackCall' +i+'" class="call col-lg-5" data-time="'+timetag+'" data-sign="'+feedbackInfo[i].agent.username+'" value="'+ tagCollector +'"><span>'+ timetag +' '+ feedbackInfo[i].agent.username +  '</span><span class="pull-right myLabel label label-primary" >'+ Categories[(feedbackInfo[i].shopCategoryId-1)] +'</span><span class="pull-right myLabel label label-primary">ID:<a href="https://adm.avito.ru/users/user/info/'+userID+'" target=_blank>'+userID+'</a></span><br>'+nextCall + audioURL + '</div>'+Comment + Tags+'</div>';
							// полный блок звонка, новая строка, 5\12 экрана, время, агент, инфа о звонке, аудио тэг, комменты, тэги. Пополняется на каждом витке цикла
							i+=iJump; //прыжок, если есть звонки с тем же ID
							} // не подходит - следующий звонок							
						}
					}
					document.getElementById("MainForm").innerHTML = Call; // вся собранная информация в главную форму
				})
	}

function createTagsTable(){ // отрисовка блока с выбором тэгов
	tagCounter = 0; // количество
	outputTags=""; //текст
	tagActiveChecker(); 
	$.get(tagGroupURL).done( function (data) {//Построение списка
	var coreHeader = 		'<div class="tag-form-header">'+
							'<span>Тэги по категориям</span>'+
							'</div>'+
						'<div class="tag-form-container">'; // данные, в "шапке" блока
	var coreFooter = '</div>'; // закрытие блока tag-form-container
	var tagGroups = data.length; // количество групп тэгов
	var columnsArray = [];
	var columnFinal = oddColumns = oddDiv = ""; // итоговый текст, нечетные колонки, нечетный див
	var activeColumns = 0; // группы тэгов, подходящие под условия
	for (var columns = 0; columns<tagGroups;columns++){ // цикл, пробегается по всем группам тэгов
		if (data[columns].tags.length>0&&data[columns].name!="Unfiltered"){ // не выводит пустые группы и Unfiltered
			activeColumns++;
			if ((activeColumns%2)) {oddColumns= '<div class="container-column">'; oddDiv = '';} // если группа 1,3,5 ... То открывает столбец
			else {oddColumns = "";oddDiv = "</div>";}// 2,4,6 - закрывает столбец
			if ((activeColumns%2)&&columns==tagGroups-1) {oddColumns= '<div class="container-column" id=last-column>'; oddDiv = '</div>';$('#last-column').css({"display":"block"});}
			//если столбец открыт и блок данных последний - открывает столбец, закрывает его, последний блок отображает как отдельно стоящий(не флексит)
			else {coreFooter+='</div>';} // закрывает тэг-контейнер			
		var columnsHead = oddColumns +
				'<div class="container-column-group">'	+				
					'<ul class="group-list">'+
						'<label class="group-header">'+
						data[columns].name + '</label>';	// построение группы тэгов, шапка блока	
		var columnsBody = ""; // обнуление тела
		for (var colTags = 0; colTags<data[columns].tags.length;colTags++){ // цикл "накачки" тела, пробегается по всем тэгам, берет значение, номер и название
			var value = data[columns].tags[colTags].value;
			var id = data[columns].tags[colTags].id;
			var name = data[columns].tags[colTags].name;
			columnsBody+='<li class="group-list-item">'+
					'<input type="checkbox" id="tags-checkbox-'+id+'" value="'+value+'" class="group-list-checkbox">' +
					'<label for="tags-checkbox-'+id+ '" id="label-checkbox-'+id + '" class="tag-label" name="info-label" value="'+id+'" title="'+ data[columns].tags[colTags].description+ '" onclick=clickOnLabel('+id+')><span>'+name+'</span></label></li>';
		}
		var columnsTail = '</ul></div>'+oddDiv; // строит конец блока, завершает список, завершает столбец, если он четный
		columnsArray[columns] = columnsHead + columnsBody + columnsTail; // заносит в массив получившийся блок
		columnFinal += columnsArray[columns]; // добавляет в конечный результат
		}		
	}
	$('.tag-form').css({ "left": -(activeColumns)*4+"vw"}); // смещение влево на (количество строк * 4 процента ширины экрана)
	coreButtons = 		'<div class="tag-form-footer">'+ // блок с кнопками внизу
                        '<button class="btn btn-danger btn-avito-red" id="tags-clear-button" onclick=clearButton() title="">Сброс</button>'+
                        '<button class="btn btn-info" id="tags-all-button" onclick=checkAllButton() title="">Все</button>'+
						'<label onclick="toggle()"><input id="toggle-trigger" type="checkbox" data-toggle="toggle" data-on="Updated" data-off="Full-feedback"data-width="120"></label></div>';
	document.getElementById("Feedback").innerHTML = coreHeader+columnFinal+coreFooter+coreButtons; //вывели в блок
	toggle();toggle(); // дважды покликали, знаю тупо, но работает только так, грусть
				})	
}