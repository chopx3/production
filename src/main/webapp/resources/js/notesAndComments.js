$(document).ready(function() {//Блок комментариев
	$('#IDforComments').keypress(function (e) { // обработка нажатия клавиши enter для вывода информации (при нажатии)
	var key = e.which;
	if (key == 13)   { getComments(); }
	});
	$('#comments').click(function() { //Кнопка "Комментарии". Выключение заметок, переключение комментариев, тоже самое с треугольниками.
		addButton();
		$("#noteForm").removeClass("On");
		$("#commentForm").toggleClass("On");
		$('#glyphCom').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');	
		$('#glyphNote').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});	//Блок заметок
	$('#notes').click(function(){ //Кнопка "Заметки", тоже самое, что в комментах, только наоборот + подгрузка заметок
		$("#noteForm").toggleClass("On");
		$("#commentForm").removeClass("On");
		getNotes();
		$('#glyphNote').toggleClass('glyphicon-triangle-right').toggleClass('glyphicon-triangle-left');
		$('#glyphCom').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-left');
	});
	$('#noteArea').change(function(e){ // обновить заметки при внесении каких-либо изменений
	updateNotes();
	});

})
function getComments(){ // отрисовка комментариев
		idNumber = idSaver = $('#IDforComments').val(); // номер ID
		if (idNumber!=""){ // если не пустой
		$.get(getCommentsURL+idNumber).done(function (data) { // запрос
				document.getElementById("forComments").innerHTML = '';
				$('#IDforComments').removeClass("box-shadow");
				var outputComments = thead = tbot = ''; // обнуление инфы и объявление переменных
				var addComment = '<div class="row"><div class="col-lg-12">' +
					'<label for="addCommentBlock">Добавить комментарий</label></div></div>' +
					'<div class="row"><div class="col-lg-12"><div class="input-group"><textarea class="form-control" id="addCommentBlock" rows="3"></textarea>'+
					'<span class="input-group-addon btn btn-success" onclick=postComment()>+</span>'+
					'</div></div></div>'; // поле добавления комментария
				if (data.length != 0) { // если есть комментарии
					thead = '<div class="row"><div class="table-scroll col-lg-12"><table id="commentTable" class="table table-striped table-hover" ><thead><tr><th >Агент</th><th>Комментарий</th></tr></thead><tbody>'; // шапка
					tbot = '</tbody></table></div></div>'; // низ
					for (var i = 0; i < data.length; i++) { // тело
						var message = data[i].message;
						var nametag = data[i].agent.username;
						var timetag = moment.unix(data[i].postTime/1000).format(comFormat);
						var elem = document.getElementById("div-table-content-"+i);
						var isLongEnough = (message.length > 140) ? "longMessage" : "" ;
						outputComments += '<tr class="table-row"><td>'+timetag +'\n'+ nametag +'</td><td class="breakable"><div class="table-content '+isLongEnough+'" onclick=changeHeight('+i+') id="div-table-content-'+i+'">'+message+'</div></td></tr>';
					} // отрисовка комментариев
				} 
				else { outputComments='На данной учетной записи еще не оставляли комментариев'; } // если комментариев нет
				document.getElementById("forComments").innerHTML = thead + outputComments + tbot + addComment;
			})
		}
		else { $('#IDforComments').addClass("box-shadow"); }
}
function changeHeight(i){ // изменить высоту, если переполнено
	var elem = document.getElementById("div-table-content-"+i); // вылавливание элемента
	var scrollHeight = elem.scrollHeight; // проверка "высоты" скролла элемента
	var maxHeight = elem.style.maxHeight; // проверка максимальной высота, для повторного сворачивания
	maxHeight = maxHeight.substring(0, maxHeight.length-2); // дичь для выцепления пикселей при проверке
	if (maxHeight > 60) {elem.style.maxHeight = 60 + 'px';elem.style.color = "blue"} // изменение высоты и цвета
	else if (scrollHeight>60) {elem.style.maxHeight = scrollHeight + 'px';elem.style.color = "black"} // и обратно
}
function postComment () { // отправка комментария
	var comment = {
        "avitoUserId":idSaver,
        "postTime": new Date().getTime(),
        "message": $('#addCommentBlock').val()
    }
	$('#addCommentBlock').removeClass("box-shadow"); 
	$('#IdforComments').removeClass("box-shadow"); // очистка
	var correctInfo = true; // проверка. По умолчанию - true
	if (idSaver == "") { correctInfo = false; 
	$('#IdforComments').addClass("box-shadow");}
	if ($('#addCommentBlock').val()== ""){ correctInfo = false; 
	$('#addCommentBlock').addClass("box-shadow"); } // если что-то не так - false + подсветка
	if (correctInfo){	// если все норм - отправка
	RestPost(comment, postCommentURL);
	setTimeout(function() {getComments();}, 800); 
	}
}
function updateNotes() { // обновление заметок
	var updateAgentNotes = {
        "id": agentId,
        "notes": $('#noteArea').val()
        }
	RestPost(updateAgentNotes, updateNotesURL);
} 
function getNotes() { // получение заметок
	$.get(getNotesURL+agentId).done(function (data) {$('#noteArea').val(data.notes);}
)}