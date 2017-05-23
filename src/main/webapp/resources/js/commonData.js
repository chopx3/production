// Общие URL
var host = "http://"+location.host + "/firecatcher/api/"; // Основной хост URL
var oktell = "http://"+location.host + "firecatcher/oktell/calls?name=Avito_get_file_by_id_conn&attachment=1&startparam1="; // Октелл
var allAgentsURL = 			host + "agent/find"; // Поиск всех агентов в базе
var addAgentURL = 			host + "agent/save"; // Добавление нового агента в базу
var updAgentURL = 			host + "agent/update"; // Обновление информации об агенте
var updateNotesURL = 		host + "agent/notes/update"; // Обновление заметок
var getNotesURL = 			host + "agent/find/id/"; // Найти определенного агента
var getQuestionsURL = 		host + "call/find/questions/"; // Найти звонки по вопросу
var callTypeURL = 			host + "call/find/type/"; // Тип звонка (empty\updated\empty_feedback\full_feedback)
var getCallsURL = 			host + "call/find/user/"; // вывести список звонков по ID клиента
var emptyFeedbackURL = 		host + "call/find/type/empty_feedback/1/"; // пустые фидбеки
var dayCallsURL = 			host + "call/find/agent/"; // звонки за сегодня по агенту
var updateEmptyCalls = 		host + "call/update"; // обновить информацию в звонке
var feedbackSaveURL = 		host + "call/feedback/save"; // обновить информацию о фидбеке
var fullFeedbackURL = 		host + "call/find/type/full_feedback/"; // // URL для заполненных фидбеков
var getCatsURL = 			host + "category/find"; // // URL для категорий
var getCommentsURL = 		host + "comments/find/"; // URL для комментариев по учетке
var postCommentURL = 		host + "comments/save"; //  сохранение комментария
var getQuestionsInfoURL = 	host + "question/find"; // URL по вопросам в базе
var statURL = 				host + "stat/find/"; // статистика
var tagGroupURL = 			host + "taggroup/find"; // список групп тэгов
var addTagGroupURL = 		host + "taggroup/save"; // добавить группу тэгов
var updTagGroupURL = 		host + "taggroup/update"; // обновить информацию по группе тэгов
var tagURL = 				host + "tags/find"; // список тэгов
var addTagURL = 			host + "tags/save"; // добавить тэг
var updTagURL = 			host + "tags/update"; // обновить тэг
var changeTagGroup = 		host + "tags/group"; // изменить группу в тэге
// Общие переменные
var Categories = [];
var Questions = [];
var dateFormat = 'DD.MM.YYYY HH:mm:ss';
var iJump;
// Общие функции
function sorting(json_object, key_to_sort_by) {
    function sortByKey(a, b) {
        var x = a[key_to_sort_by];
        var y = b[key_to_sort_by];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
    json_object.sort(sortByKey);
}
function getQuestionsInfo() { // получить массив вопросов
	$.get(getQuestionsInfoURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Questions[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}}
)}
function getCats() {// получить массив категорий
	$.get(getCatsURL).done(function (data) {
		var Info = data;
		for (var i=0;i<Info.length;i++){
			var desc = Info[i].description;
			Categories[i]=(desc.length>=20)? desc.substr(0,18)+"...": desc;
		}}
)}
function collectMultipleCalls(data, i, type){ // функция отрисовки нескольких звонков
	var result="";
	for (var j = i; j< data.length; j++){
		if (j+1<=data.length-1){
			var check = (type == "short") ? true : (data[j].agent.username == data[j+1].agent.username);
			if (data[j].chainId == data[j+1].chainId && check){
			var tempAudio = data[j+1].comId;
			result += '<audio class="audio-call no-margin-top" src="'+oktell + tempAudio + '" controls></audio><a href="'+oktell+ tempAudio +'" target="_blank"></a>';
			iJump++;
		} else break;
	}
	else break;}
return result;	
}
$(document).ready(function() {
	getQuestionsInfo();
	getCats();
})