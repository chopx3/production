<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>fireCatcher</title>
    <meta charset ="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/downloaderJS.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery-dateFormat.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/calendar_daterange.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/tags-form-controller.js"></script>
    <link href="${pageContext.request.contextPath}/resources/css/colours.css" disabled rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/css/sidebarFeedback.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/css/tags-form-fix.css" rel="stylesheet">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
	<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
</head>
<body>
<script>

</script>
<script type="text/javascript">
    $(function() {

        StartCalendar();
		jQuery('#today').click();
    });
</script>
<div id="wrapper">
    <nav class="navbar navbar-default add-height" >
        <div class="container-fluid">

            <div>
                <ul class="nav navbar-nav add-height">

                    <li class="col-lg-3 li-centered">

                        <p class="same-height">Категория вопроса</p>
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
                    <li class="dropdown li-centered col-lg-1 full-height" id="tag-dropdown" ><a href="#" class="dropdown-toggle full-height" data-toggle="dropdown" >Тэги<span class="caret"><span></a>
                        <div class="dropdown-menu tag-form">


                            <div class="tag-form-header">
                                <span>Справка</span>
                            </div>
                            <div class="tag-form-container">
                                <div class="container-column">
                                    <div class="container-column-group">
                                        <ul class="group-list">
                                            <label class="group-header">Инфологическая модель</label>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-1" value="model_geo" class="group-list-checkbox">
                                                <label for="tags-checkbox-1" id="label-checkbox-1" name="info-label" value="model_geo"><span>model_geo</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-2" value="model_cat" class="group-list-checkbox">
                                                <label for="tags-checkbox-2" id="label-checkbox-2" name="info-label" value="model_cat"><span>model_cat</span></label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="container-column-group">
                                        <ul class="group-list">
                                            <label class="group-header">Работа с сайтом</label>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-3" value="site_navigation" class="group-list-checkbox">
                                                <label for="tags-checkbox-3" id="label-checkbox-3" name="info-label" value="site_navigation"><span>site_navigation</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-4" value="site_mobile" class="group-list-checkbox">
                                                <label for="tags-checkbox-4" id="label-checkbox-4" name="info-label" value="site_mobile"><span>site_mobile</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-5" value="site_messenger" class="group-list-checkbox">
                                                <label for="tags-checkbox-5" id="label-checkbox-5" name="info-label" value="site_messenger"><span>site_messenger</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-6" value="site_safety" class="group-list-checkbox">
                                                <label for="tags-checkbox-6" id="label-checkbox-6" name="info-label" value="site_safety"><span>site_safety</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-7" value="site_other" class="group-list-checkbox">
                                                <label for="tags-checkbox-7" id="label-checkbox-7" name="info-label" value="site_other"><span>site_other</span></label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="container-column">
                                    <div class="container-column-group">
                                        <ul class="group-list">
                                            <label class="group-header">Поиск на сайте</label>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-8" value="search_filters" class="group-list-checkbox">
                                                <label for="tags-checkbox-8" id="label-checkbox-8" name="info-label" value="search_filters"><span>search_filters</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-9" value="search_problems" class="group-list-checkbox">
                                                <label for="tags-checkbox-9" id="label-checkbox-9" name="info-label" value="search_problems"><span>search_problems</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-10" value="search_favourite" class="group-list-checkbox">
                                                <label for="tags-checkbox-10" id="label-checkbox-10" name="info-label" value="search_favourite"><span>search_favourite</span></label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="container-column-group">
                                        <ul class="group-list">
                                            <label class="group-header">Работа с объявлениями</label>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-11" value="item_inside" class="group-list-checkbox">
                                                <label for="tags-checkbox-11" id="label-checkbox-11" name="info-label" value="item_inside"><span>item_inside</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-12" value="item_add" class="group-list-checkbox">
                                                <label for="tags-checkbox-12" id="label-checkbox-12" name="info-label" value="item_add"><span>item_add</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-13" value="item_review" class="group-list-checkbox">
                                                <label for="tags-checkbox-13" id="label-checkbox-13" name="info-label" value="item_review"><span>item_review</span></label>
                                            </li>
                                            <li class="group-list-item">
                                                <input type="checkbox" id="tags-checkbox-14" value="item_lf" class="group-list-checkbox">
                                                <label for="tags-checkbox-14" id="label-checkbox-14" name="info-label" value="item_lf"><span>item_lf</span></label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="tag-form-footer">
                                <button class="btn btn-danger btn-avito-red" id="tags-clear-button" title="">Сброс</button>
                                <button class="btn btn-info" id="tags-all-button" title="">Все</button>
								<label onclick="toggle()"><input id="toggle-trigger" type="checkbox" data-toggle="toggle" data-on="Все" data-off="Один из"data-width="85"></label>
<script>
function toggle() {
    $('#toggle-trigger').bootstrapToggle('toggle');
	console.log($("#toggle-trigger").prop("checked"));
  }
</script>								
                            </div>
                        </div>
                    </li>
                    <li class="col-lg-4 li-centered">
                        <p>Всего тэгов: <b id="tagCounterPlace"> 0 </b> Выбранные тэги: <b id="tagNamesPlace">  </b></p>
                    </li>
                    <li class="col-lg-1 pull-right full-height">
                        <button class="btn btn-info col-lg-12 full-height" id="start-button" title="" onclick=smth()>GO</button>
                    </li>
                </ul>

            </div>

        </div>
    </nav>﻿
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="col-lg-12">
                <div class="row">
                    <p id="MainForm" class="col-lg-12">
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

</html>