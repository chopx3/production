// ==UserScript==
// @name Calls and comments
// @version 0.4
// @match https://adm.avito.ru/users/user/info/*
// @require http://code.jquery.com/jquery-latest.js
// @updateURL   https://raw.githubusercontent.com/chopx3/production/dev/src/main/webapp/resources/script/callscomments.js
// @downloadURL   https://raw.githubusercontent.com/chopx3/production/dev/src/main/webapp/resources/script/callscomments.js
// @require https://cdn.jsdelivr.net/momentjs/latest/moment.min.js
// @grant GM_xmlhttpRequest
// ==/UserScript==
var commentBlock = 
'<div class="comment-block" id="comment-block">'+
'  <div class="panel panel-default panel-comments">'+
'    <div class="panel-heading text-center" style="font-size: 16px; font-weight: bold;">Комментарии</div>'+
'    <div class="panel-body" id="forComments">'+
'    </div>'+
'    <div class="panel-footer">'+
'      <div class="row text-center">'+
'        <div class="col-md-5"><button class="btn btn-default close-comments-button">Закрыть</button></div>'+
'        <div class="col-md-7"><button class="btn btn-default firecatcher-button">Открыть в firecatcher</button></div>'+
'      </div>'+
'    </div>'+
'   </div>'+
'</div>';
var numOfCalls = iJump = 0;
var oktell = "http://192.168.10.132/firecatcher/oktell/calls?name=Avito_get_file_by_id_conn&startparam1=";
var sheet = document.createElement('style');
sheet.innerHTML = "#comment-block{"+ 
" z-index: 1;"+ 
" position: fixed;"+ 
" overflow-y: hidden;"+ 
" right: 1%;"+ 
" top: 6%;"+ 
" background : white;"+ 
" width: 30vw; "+     
" visibility : hidden;"+ 
" padding-top:4px;"+
" padding-top:4px;"+ 
" opacity: 0.5;"+ 
"}"+ 
"#comment-block.On{"+ 
" visibility : visible;"+ 
" overflow-y: hidden; "+ 
" overflow-x: hidden; "+ 
" background : #eee;"+ 
" border: solid 1px #f0f0f0;"+ 
" border-radius : 5px;"+ 
" z-index : 5;"+ 
" opacity : 1;"+ 
" transition:all linear 0.3s;"+ 
"}"+ 
"#addCommentBlock{"+ 
" overflow: auto;"+ 
" resize:none;"+ 
"}"+
".panel-comments{"+ 
" margin-bottom: 0 !important;"+ 
"}"+
".table-scroll{ "+ 
" height: 70vh;"+ 
" overflow: auto;"+ 
" margin: 0 0 20px;"+ 
" max-width: 750px;"+ 
"}"+ 
".breakable{"+ 
" word-break: break-all;"+ 
" word-wrap: break-word;"+ 
"}"+ 
"#commentForm h1{"+ 
" margin-left:3px;"+ 
"}";
//updated version
document.body.appendChild(sheet);
var userID = getId(window.location.href);
var login = URL = commentData = callData = "";
$(document).ready(function(){
if(window.location.href.indexOf('/user/info') != -1){
login = $('a.js-user-id').attr("data-user-id");
commentURL = "http://192.168.10.132/firecatcher/api/comment/user/" + login;
callURL = "http://192.168.10.132/firecatcher/api/call/user/"+login + "/all";
console.log(URL);
var comments = GM_xmlhttpRequest({
method: "GET",
headers: {"Accept": "application/json"},
url: commentURL,
onreadystatechange: function(res) {
},
onload: function(res) {
var numOfComments = JSON.parse(res.response).length;
commentData = JSON.parse(res.response);
$(".form-group.js-passwords").after(commentBlock);
if (numOfComments >0) {
$("#REpremium").after("<div class='unactive' style='color: rgb(92, 184, 92); cursor: pointer;' id='commentClick'>• Комментарии ("+numOfComments+") </div>");}
else {$("#REpremium").after("<div class='unactive' style='color:rgb(189, 189, 189); cursor: pointer;' id='commentClick'>• Комментарии("+numOfComments+") </div>");}
$("#commentClick").click(getComments);
$(".close-comments-button").click(function() {
   $("#comment-block").removeClass('On');
   });
$(".firecatcher-button").click(function() {
    var url = "http://192.168.10.132/firecatcher/?comments=true&id="+login;
    window.open(url, '_blank');
});  
}
});
var calls = GM_xmlhttpRequest({
method: "GET",
headers: {"Accept": "application/json"},
url: callURL,
onreadystatechange: function(res) {
},
onload: function(res) {
numOfCalls = JSON.parse(res.response).length;
if (numOfCalls >0) {
$("#commentClick").after("<div class='unactive' style='color: rgb(92, 184, 92); cursor: pointer;' id='callClick'>• Звонки("+numOfCalls+") </div>");}
else {$("#commentClick").after("<div class='unactive' style='color:rgb(189, 189, 189); cursor: pointer;' id='callClick'>• Звонки("+numOfCalls+") </div>");}
$("#callClick").click(function(){
var url = "http://192.168.10.132/firecatcher/?calls=true&id="+login;
window.open(url, '_blank');
});
}
}); 
}
});
function getId(url){
return url.substring(url.lastIndexOf('/')+1);
}
function getComments(zEvent){
$("#comment-block").toggleClass('On');
document.getElementById("forComments").innerHTML = '';
var outputComments = thead = tbot = ''; // обнуление инфы и объявление переменных
if (commentData.length !== 0) { // если есть комментарии
thead = '<div class="row"><div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th >Агент</th><th>Комментарий</th></tr></thead><tbody>'; // шапка
tbot = '</tbody></table></div></div>'; // низ
for (var i = 0; i < commentData.length; i++) { // тело
var message = commentData[i].message;
var nametag = commentData[i].agent.username;
var timetag = moment.unix(commentData[i].postTime/1000).format("DD.MM.YY HH:mm");
var elem = document.getElementById("div-table-content-"+i);
outputComments += '<tr class="table-row"><td>'+timetag +'\n'+ nametag +'</td><td class="breakable"><div class="table-content" id="div-table-content-'+i+'">'+message+'</div></td></tr>';
} // отрисовка комментариев
}
else { outputComments='<div class="text-center">На данной учетной записи еще не оставляли комментариев</div>'; } // если комментариев нет
document.getElementById("forComments").innerHTML = thead + outputComments + tbot;
}