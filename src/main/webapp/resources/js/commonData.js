// Общие URL
var host = "http://"+location.host + "/firecatcher/api/"; // Основной хост URL
var oktell = "http://"+location.host + "/firecatcher/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1="; // Октелл
var allAgentsURL = 								host + "agent/all"; // Поиск всех агентов в базе
var addAgentURL = 								host + "agent/add"; // Добавление нового агента в базу
var updateAgentURL = 							host + "agent/update"; // Обновление информации об агенте
var updateNotesURL = 							host + "agent/notes/update"; // Обновление заметок
var getNotesURL = 								host + "agent/"; // Найти определенного агента + найти его заметки
var getAllAngryUsers = 					  host + "angry/all"; // Найти всех злых пользователей
var addAngryUserURL =							host + "angry/add"; // Найти всех злых пользователей
var updateAngryUserURL =					host + "angry/update"; // Найти всех злых пользователей
var getAngryUser = 								host + "angry/"; // Найти всех злых пользователей
var getCallsByQuestionURL=				host + "call/question/"; // Найти звонки по вопросу
var getCallsByQuestionandTypeURL=	host + "call/catandtype/"; // Найти звонки по вопросу
var getCallsURL = 								host + "call/user/"; // вывести список звонков по ID клиента
var emptyFeedbackURL = 						host + "call/type/empty_feedback/1/"; // пустые фидбеки
var dayCallsURL = 								host + "call/agent/"; // звонки за указанный период по авторизованному агенту
var updateEmptyCallsURL=					host + "call/update"; // обновить информацию в звонке
var feedbackSaveURL = 						host + "call/feedback"; // обновить информацию о фидбеке
var fullFeedbackURL = 						host + "call/type/full_feedback/";// URL для заполненных фидбеков
var updatedForFeedbackURL=				host + "call/type/updated/"; // // URL для обновленных звонков с тэгами
var getCategoriesURL = 						host + "category/all"; // URL для категорий
var addCategoriesURL		=					host + "category/add"; // URL для добавления категорий
var updateCategoriesURL	=					host + "category/update"; // URL для обновления категорий
var getCommentsURL = 							host + "comment/user/"; // URL для комментариев по учетке
var postCommentURL = 							host + "comment/add"; //  сохранение комментария
var getQuestionsURL = 						host + "question/all"; // URL по вопросам в базе
var addQuestionURL			=					host + "question/add"; // URL для добавления вопроса
var updateQuestionURL		=					host + "question/update"; // URL для обновления вопроса
var getRepremURL				=					host + "premium/avitoid/"; // URL для получения Reprem данных
var updateRepremURL				=				host + "premium/update"; // URL для обновления Reprem данных
var updateRepremActiveURL				=	host + "premium/updateActive"; // URL для обновления Reprem данных
var addRepremURL				=					host + "premium/add"; // URL для добавления Reprem данных
var getAllRepremUsersURL =				host + "premium/all" // URL для отображения всех премиум пользователей
var statURL = 										host + "stat/"; // статистика
var tagGroupURL = 								host + "taggroup/all"; // список групп тэгов
var addTagGroupURL = 							host + "taggroup/add"; // добавить группу тэгов
var updTagGroupURL = 							host + "taggroup/update"; // обновить информацию по группе тэгов
var tagURL = 											host + "tag/all"; // список тэгов
var addTagURL = 									host + "tag/add"; // добавить тэг
var updTagURL = 									host + "tag/update"; // обновить тэг
var changeTagGroupURL = 					host + "tag/changeGroup"; // изменить группу в тэге
// Общие переменные
var Categories = []; // массив для категорий
var Questions = []; // и для вопросов. На звонки
var dateFormat = 'DD.MM.YYYY HH:mm:ss'; // формат даты 
var iJump; // для объединения звонков, прыжок на это количество в цикле
// Общие функции
var RestPost = function(sendData, url) { // стандартная функция пост отправки данных
            $.ajax({
                url: url,
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(sendData), //Stringified Json Object
                async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
                cache: false,    //This will force requested pages not to be cached by the browser
                processData: false, //To avoid making query String instead of JSON
                success: function (resposeJsonObject) { /* Success Action */  },
                error: function (message) { alert(message) }
            });
    };
function sorting(json, key) { // функция сортировки json'а со звонками в обратном порядке. stackoverflow. Сортирует по ключу.
    function sortByKey(a, b) {
        var x = parseInt(a[key]);
        var y = parseInt(b[key]);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
    json.sort(sortByKey);
}
function getQuestions() { // получить массив вопросов, если длина больше 20 - обрезать
	$.get(getQuestionsURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].shortName;
			Questions[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}}
)}
function getCategories() {// получить массив категорий, если длина больше 20 - обрезать
	$.get(getCategoriesURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Categories[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}}
)}
function collectMultipleCalls(options){ // функция отрисовки нескольких звонков, проверяет до конца списка, пока не находит звонок, chainId которого не совпадает -> break
	iJump = 0;
	var result="";
	var onPlay = options.onPlayInfo || "";
	var data = options.data;
	var i = options.counter;
	var isItSameAgent = options.isItSameAgent || true;
	for (var j = i; j< data.length; j++){ // пробежка по массиву от элемента до конца массива
		if (j+1<=data.length-1){ // проверка, не конец ли это массива, чтобы без переполнения
			if (data[j].chainId == data[j+1].chainId && isItSameAgent){ iJump++; } else break;	// звонков с одной учетной записи и переводов. Если да и chainId совпал - +в прыжок
	}																											// если нет - break из цикла
	else break;} // если дальше ничего нет - break
	for (var j =i+iJump; j>i; j--){ // а потом идет в обратную сторону и добавляет звонки в общий звонок в хронологическом порядке
			var margin = (j!= i+iJump) ? "no-margin-top" : ""; // магия для отступа в звонках. У первого звонка только срабатывает, чтобы не было отступа
			var holdTime = (data[j-1].timeStart - data[j].timeEnd)/1000;
			var minutes = Math.floor(holdTime/60);
			var seconds = holdTime - minutes*60;
			var tempAudio = data[j].comId; // наверное, так удобней, но чот не уверен
			result += '<div><audio '+onPlay+' class="audio-call with-hold '+margin+'" src="'+oktell + tempAudio + '" controls></audio><a href="'+oktell+ tempAudio +'" target="_blank"></a><span class="label-primary myLabel hold-span" title="'+minutes+':' + seconds +'">H</span></div>'; // финальный вывод
	}
return result;	
}
function getUniqueData(data, param) { // подсчет уникальных звонков в фидбеке, stackoverflow продакшн.
  var variables = {};
	var count = 0;
    $.each(data, function(){
        if (!variables[this[param]]){
            variables[this[param]] = [];    
       count++;}
    });
    return count;
}
$(document).ready(function() { // загрузка информации о вопросах и о категориях для отображения на звонках
	getQuestions();
	getCategories();
})