// Основной js файл для админ\фидбека, отвечает за отрисовку звонков и тэгов
var catNum = 6; // дефолтное значение для категории, 6=все категории
var Call = Comment = Tags = ""; 
$(document).ready(function() {
	getCategories();
	$('input[name="category"]').change(function(e){
		catNum = $(this).attr("value");
	});
	createTagsTable();
});
function getCalls(){ // Получить список всех звонков и вывести их в поле, после проверки условий
	var timeStart = moment(startDate, "DD-MM-YYYY").unix()*1000;
	var timeEnd = moment(endDate, "DD-MM-YYYY").unix()*1000;
	var URL = ($("#toggle-trigger").prop("checked"))? updatedForFeedbackURL : fullFeedbackURL;
		$.get(URL+timeStart+"/"+timeEnd+"/") // Получение полного списка
			.done( function (data) {
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
							if( (catNum==6||catNum==feedbackInfo[i].shopCategoryId-1) && tagCheck ){ // если подходит категория или выбраны все категории и тэг есть в мапе	
							timetag = moment(feedbackInfo[i].timeStart).format(dateFormat); // дата, стандартный вид
							userID = feedbackInfo[i].avitoUserId;
							Tags = "<div class='tags col-lg-3'><label class='might-overflow'>" + tagCollector + "</label></div>"; // блок тэгов, 1\4 экрана, класс "переполнение"
							Comment = "<div id='comment"+ i +"' class='col-lg-4 comments'> <textarea class='form-control cursor-def' id='noteArea' disabled>"+ feedbackInfo[i].comments +"</textarea> </div> "; // блок комментов, 1\3 экрана, отключены
							var multipleCallsInfo = {
								data: feedbackInfo,
								counter: i
							};
							console.log(multipleCallsInfo);
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
	TagActiveChecker(); 
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