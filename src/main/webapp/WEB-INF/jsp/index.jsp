<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>fireCatcher</title>
    <link id=favicon rel="icon" href="${pageContext.request.contextPath}/resources/img/favicon.ico">
    <meta http-equiv="content-type" content="text/html; charset=cp1251">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/calendar.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/commonData.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/navbar.js" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath}/resources/js/todayCallsController.js" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath}/resources/js/fireFeedback.js" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath}/resources/js/webSocket.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/clientCalls.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/notesAndComments.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/sidebar.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/callform.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/NotesAndComments.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/feedbackTagsMain.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/feedbackTagsFirecatcher.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/calls.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/standartAdditionalColours.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/mainWorkPlace.css">
    <link rel="stylesheet" href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" >
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/colours.css" id="colours" disabled=disabled/>
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
</head>

<body>

<div id="wrapper">

    <div id="sidebar-wrapper" class="col-md-2">
        <ul class="sidebar-nav container-fluid">
            <li class="hl"><a href="#" id="emptyCalls"><i class ="fa fa-phone menuIcons fa-fw"></i><span>Незаполненные</span><span class="badge mybadge" id=emptyCallsBadge>0</span></a></li>
			<li class="hl"><a href="#" id="dayCalls"><i class ="fa  fa-headphones fa-fw menuIcons"></i><span>Звонки за день</span></a></li>
            <li class="hl"><a href="#" id="clientCalls"><i class ="fa fa-address-book menuIcons fa-fw"></i><span>Звонки клиента</span></a></li>
            <li><a href="#" id="comments"><i class ="fa fa-commenting menuIcons fa-fw"></i><span>Комментарии</span><span class="glyphicon glyphicon-triangle-right glyph pull-right" aria-hidden="true" id="glyphCom"></span></a></li>
            <li><a href="#" id="notes"><i class ="fa fa-sticky-note menuIcons fa-fw"></i><span>Заметки</span><span class="glyphicon glyphicon-triangle-right glyph pull-right" aria-hidden="true" id="glyphNote"></span> </a></li>
            <li class="hl"><a href="#" id="feedback"><i class ="fa fa-pencil menuIcons fa-fw"></i><span>Feedback</span><span class="badge mybadge" id=emptyFeedbackBadge>0</span></a></li>
			<li><a href="#" id="magic"><i class ="fa fa-magic menuIcons fa-fw"></i><span>Magic</span></a></li>
            <li><a href="${pageContext.request.contextPath}/j_spring_security_logout" id="logout"><i class ="fa  fa-times-circle menuIcons fa-fw"></i><span>Выйти</span></a></li>
            <label id="websocketStatus">Cтатус </label>
        </ul>
    </div>
	
    <div id="SubForm" class="form-group col-md-5 container-fluid">
        <div class="row">
            <div class="form-group col-md-6 text-center">
                <input type="number" class="form-control" id="IDNum" placeholder="ID учетной записи">
            </div>
            <div id="CloseSubForm" class="btn-group col-md-5" data-toggle="buttons">
                <button type="button" id="private" class="btn btn-danger btn-avito-red-2 pull-right">Частник   <span class="glyphicon glyphicon-remove pull-right" ></span></button>
            </div>
        </div>
        <label>Категория учетной записи</label>

         <div class="row">
            <div class="btn-group col-md-12" data-toggle="buttons" id="catButtonGroup">
                <label class="btn btn-primary box-shadow-cat btn-avito-blue col-md-3" id="label-cat-1" >
                    <input type="radio" name="category" id="cat-1" autocomplete="off" value="1">Недвижимость
                </label>
                <label class="btn btn-primary box-shadow-cat btn-avito-red col-md-3" id="label-cat-2">
                    <input type="radio" name="category" id="cat-2" autocomplete="off" value="2"> Транспорт
                </label>
                <label class="btn btn-primary box-shadow-cat btn-avito-green col-md-2" id="label-cat-3">
                    <input type="radio" name="category" id="cat-3" autocomplete="off" value="3"> Работа
                </label>
                <label class="btn btn-primary box-shadow-cat btn-avito-purple col-md-2" id="label-cat-4">
                    <input type="radio" name="category" id="cat-4" autocomplete="off" value="4"> Услуги
                </label>
                <label class="btn btn-primary box-shadow-cat btn-avito-gray col-md-2" id="label-cat-5">
                    <input type="radio" name="category" id="cat-5" autocomplete="off" value="5"> General
                </label>
            </div>
        </div>
        <label>Категория вопроса</label>


        <div class="row">
            <div class="btn-group col-md-12" data-toggle="buttons" id="questButtonGroup">
            </div>
        </div>
        <div>
            <span><br/></span>
        </div>
        <div class="row">
					 <div class="col-md-3" id="IsManagerDiv">                          
                    <input type="checkbox" data-toggle="toggle" id="IsManager" data-on="Менеджер" data-off="Клиент" data-offstyle="info btn-avito-blue toggler" data-onstyle="danger btn-avito-red toggler" data-width="130">                                
					</div>
			        <div class="col-md-3 col-md-offset-1 btn-group" data-toggle="buttons" id="IsManagerAndNoID">    
                    <label class="btn btn-primary " id="openQuestionLabel">
                    <input type="checkbox" name="question" id="openQuestion" autocomplete="off" value="8"> Без ID
					</label>          
					</div>
					<div class="btn-group pull-right" data-toggle="buttons" id="isUserHappy">    
                    <input type="checkbox" data-toggle="toggle" id="IsHappyToggler" data-on="Unhappy<i class='glyphicon glyphicon-fire pull-right' style='margin-top:3px'></i>" data-off="Happy <i class='glyphicon glyphicon-heart pull-right' style='margin-top:3px'></i>" data-offstyle="success btn-avito-green toggler" data-onstyle="danger btn-avito-red toggler" data-width="130">   
					</div>
        </div>

        <div class="row">          
                <label class=col-lg-12>Дополнительные тэги</label>
                <div id=additionalTagsDiv>              
                </div>
        </div>
		<div class="row" id=sendAndServiceRow>
            <div class="col-md-12">
			<label for="comment" id="serviceMessage"></label>
			<button type="button" id="sendDataButton" class="btn btn-success btn-avito-green-2 pull-right col-md-3" value="addTags">Отправить</button>
			</div>
		</div>
		<div class="row">
            <div class="col-md-12">
			<textarea class="form-control" rows=5 id=callComments placeholder="Поле для комментария (необязательное)"></textarea>
			</div>
		</div>
    </div>

    <div id="FeedbackForm" class="form-group container-fluid col-md-5">
    </div>
	
    <div id="page-content-wrapper">
        <div class="container-fluid col-md-offset-2">
                <h1 id="HeaderText"></h1>
                <div class="row">
                    <div id="CallForm" class="form-group col-md-6">
                    </div>
                </div>
                <div class="row">
                    <p id="MainForm" class="col-md-6">
                    <div id="Hello">
                        <h1>Здравствуй, ${username} !</h1>
                    </div>				
                    </p>
                </div>
            
        </div>
    </div>
</div>
			<div id="noteForm" class="form-group col-md-4 col-md-offset-2">
				<div class="row">
					<h1>Заметки</h1>
					
				</div>
				<div class="row">
					<textarea class="form-control" id="noteArea"></textarea>
				</div>
			</div>
			<div id="commentForm" class="form-group col-md-4 col-md-offset-2">
				<div class="row ">
					<h1>Комментарии</h1>
				</div>
				<div class="row">
					
						<div class="input-group goButton" id="IdCommentRow">
							<input type="number" class="form-control" id="IDforComments" placeholder="ID учетной записи" autofocus>
							<span class="input-group-addon btn btn-success" id="IDSubmitComments" onclick=getComments()>GO</span>
						</div>
					
				</div>
				<div class="row" id="forComments">
				</div>
			</div>
<script>
    setTimeout(jQuery(function(){
        jQuery('#emptyCalls').click();
    }, 2500));
</script>
</body>

</html>
