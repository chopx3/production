<%@ page language="java" contentType="text/html; charset=Cp1251" pageEncoding="Cp1251"%>
<!DOCTYPE html>
<html>
<head>
    <title>Avito Stats</title>
    <h2>WebSocket tester. Hello, ${username}</h2>
    <a href="/hello">Test WebSocket connection</a>
    <a href="/j_spring_security_logout">logout</a>
    <meta http-equiv="content-type" content="text/html; charset=cp1251">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/jquery-dateFormat.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/navbar.js" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/sidebar.css">

    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
    <link rel="icon" type="image/gif" href="${pageContext.request.contextPath}/resources/favicon.ico" />
</head>
<body>

<div id="wrapper">

    <div id="sidebar-wrapper">
        <ul class="sidebar-nav container-fluid">
            <li class="highlight"><a href="#" id="my_calls"> Мои звонки </a></li>
            <li><a href="#" id="user_calls"> Звонки пользователя </a></li>
            <li><a href="#" id="comments"> Комментарии </a></li>
            <li><a href="#" id="notes"> Заметки </a></li>
            <li><a href="#" id="feedback"> Feedback </a></li>
        </ul>
    </div>
    <div id="SubForm" class="form-group col-lg-4 container-fluid">
        <div class="row">

        </div>
        <div class="row">
            <div class="form-group col-lg-6 text-center">
                <input type="number" class="form-control" id="IDNum" placeholder="ID учетной записи">
            </div>
        </div>
        <label>Категория учетной записи</label>

        <div class="row">
            <div class="btn-group col-lg-12" data-toggle="buttons">
                <label class="btn btn-primary active col-lg-4">
                    <input type="radio" name="category" id="cat-1" autocomplete="off"> Недвижимость
                </label>
                <label class="btn btn-primary col-lg-2">
                    <input type="radio" name="category" id="cat-2" autocomplete="off"> Авто
                </label>
                <label class="btn btn-primary col-lg-2">
                    <input type="radio" name="category" id="cat-3" autocomplete="off"> Работа
                </label>
                <label class="btn btn-primary col-lg-2">
                    <input type="radio" name="category" id="cat-4" autocomplete="off"> Услуги
                </label>
                <label class="btn btn-primary col-lg-2">
                    <input type="radio" name="category" id="cat-5" autocomplete="off"> Gen
                </label>
            </div>
        </div>
        <label>Категория вопроса</label>


        <div class="row">
            <div class="btn-group col-lg-12" data-toggle="buttons">
                <label class="btn btn-primary active col-lg-3">
                    <input type="radio" name="question" id="quest-1" autocomplete="off"> Блокировки
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-2" autocomplete="off"> Платные
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-3" autocomplete="off"> Автозагрузка
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-4" autocomplete="off"> Технические
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-5" autocomplete="off"> Другие
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-6" autocomplete="off"> Жалобы
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-7" autocomplete="off"> Рекламные
                </label>
                <label class="btn btn-primary col-lg-3">
                    <input type="radio" name="question" id="quest-8" autocomplete="off"> Несколько
                </label>

            </div>
        </div>

        <div>
            <span><br/></span>
        </div>
        <div class="btn-group" data-toggle="buttons">
            <input type="checkbox" data-toggle="toggle" id="IsManager" data-on="Менеджер" data-off="Пользователь" data-offstyle="success" data-onstyle="danger">
        </div>
        <div id="2299CSS" class="btn-group pull-right" data-toggle="buttons">
            <button type="button" id="2299" class="btn btn-danger">Частник</button>
            <button type="button" id="sendDataButton" class="btn btn-success">Отправить</button>
        </div>



        <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="6" id="JsonText"></textarea>
        </div>
        <div id="CloseSubForm" class="btn-group col-lg-6" data-toggle="buttons">
            <button type="button" id="sendDataButton" class="btn btn-success">Закрыть</button>
        </div>
    </div>




    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="col-lg-12">
                <a href="#" class="btn btn-success" id="menu-toggle"> Раскрыть меню </a>
                <h1 id="HeaderText"></h1>
                <div class="row">
                    <div id="CallForm" class="form-group col-md-6">
                        <div class="row">
                            <div class="cell col-md-6" id="Cell">
                                <div class="form-group">
                                    <input type="number" class="form-control" id="IDforInfo" placeholder="ID учетной записи">
                                </div>
                            </div>
                            <div class="cell col-md-2" id="Cell">
                                <div id="submit" class="btn-group" data-toggle="buttons">
                                    <button type="button" id="IDSubmit" class="btn btn-primary">GO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" >
                    <p id="MainForm" class="col-lg-6">
                    </p>
                </div>

            </div>
        </div>
    </div>
</div>


<script>
    $( document ).ready(function() {
        jQuery('#menu-toggle').click();
        jQuery('#my_calls').click();
    });
</script>
</body>

</html>

