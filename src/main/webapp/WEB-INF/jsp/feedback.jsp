<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Feedback</title>
    <meta charset ="utf-8">
	<link rel="icon" href="${pageContext.request.contextPath}/resources/img/feedback.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/allURLs.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/adminFeedbackMain.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/calendar_daterange.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/adminFeedbackTags.js"></script>
    <link href="${pageContext.request.contextPath}/resources/css/adminFeedback.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/calls.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/css/feedback-tags-main.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/feedback-tags-admin.css" rel="stylesheet">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
	<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
</head>
<body>
<script type="text/javascript">
    $(function() {
        StartCalendar();
		jQuery('#today').click();
    });
</script>
<div id="wrapper" class=col-lg-12>
    <nav class="navbar navbar-default add-height" >
        <div class="container-fluid">
            <div>
                <ul class="nav navbar-nav add-height">					
                    <li class="col-lg-3 li-centered">					
                        <p class="same-height"><a href="/firecatcher/admin"><span class="glyphicon glyphicon-stats pull-left" style="font-size:30px;"></span></a>Категория вопроса</p>
                        <p><div class="row">
                        <div class="btn-group btn-group-justified col-lg-3" data-toggle="buttons" id="catButtonGroup">
                            <label class="btn btn-primary box-shadow btn-avito-blue active" id="label-cat-0">
                                <input type="radio" name="category" id="cat-0" autocomplete="off" value="6">All
                            </label>
							<label class="btn btn-primary box-shadow btn-avito-blue" id="label-cat-1" >
                                <input type="radio" name="category" id="cat-1" autocomplete="off" value="0">RE
                            </label>
                            <label class="btn btn-primary box-shadow btn-avito-red" id="label-cat-2">
                                <input type="radio" name="category" id="cat-2" autocomplete="off" value="1"> TR
                            </label>
                            <label class="btn btn-primary box-shadow btn-avito-green" id="label-cat-3">
                                <input type="radio" name="category" id="cat-3" autocomplete="off" value="2"> Job
                            </label>
                            <label class="btn btn-primary box-shadow btn-avito-purple" id="label-cat-4">
                                <input type="radio" name="category" id="cat-4" autocomplete="off" value="3"> Serv
                            </label>
                            <label class="btn btn-primary box-shadow btn-avito-gray" id="label-cat-5">
                                <input type="radio" name="category" id="cat-5" autocomplete="off" value="4"> Gen
                            </label>
                        </div>
                    </div> </p>
                    </li>
                    <li class="col-lg-3 li-centered">
                        <p><input type="text" name="daterange" value="" class="same-height"/></p>
                        <p><div class="btn-group">
                        <button class="btn btn-info" id="yesterday">Вчера</button>
                        <button class="btn btn-info" id="today">Сегодня</button>
                        <button class="btn btn-info" id="week">Неделя</button>
                        <button class="btn btn-info" id="month">Месяц</button>
                    </div></p>
                    </li>
                    <li class="dropdown li-centered col-lg-1 full-height" id="tag-dropdown"><a href="#" class="dropdown-toggle full-height" data-toggle="dropdown" >Тэги<span class="caret"><span></a>
                        <div class="dropdown-menu tag-form" id="Feedback">
						</div>
                    </li>
                    <li class="col-lg-4 li-centered">
                        <p>Всего тэгов: <b id="tagCounterPlace"> 0 </b> Выбранные тэги: <b id="tagNamesPlace">  </b></p>
                    </li>
                    <li class="col-lg-1 pull-right full-height">
                        <button class="btn btn-info col-lg-12 full-height" id="start-button" title="" onclick=getCalls()>GO</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>﻿
</div>
<div id="page-content-wrapper" class="col-lg-12">
	<div class="container-fluid ">
			<div class="row">
				<p id="MainForm" class="col-lg-12">
				</p>
			</div>
	</div>
</div>
</body>

</html>