<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>fireCatcher</title>
    <link rel="icon" href="${pageContext.request.contextPath}/resources/img/favicon.ico">
    <meta http-equiv="content-type" content="text/html; charset=cp1251">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/jquery-dateFormat.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/navbar.js" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/sidebar.css">
    <script src="${pageContext.request.contextPath}/resources/js/webSocket.js"></script>
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/colours.css" type="text/css" id="colours" disabled=disabled/>

</head>
<body>

<body>

<div id="wrapper">

    <div id="sidebar-wrapper">
        <ul class="sidebar-nav container-fluid">
            <li><a href="#" id="my_calls">Мои звонки</a></li>
            <li><a href="#" id="user_calls">Звонки клиента</a></li>
            <li><a href="#" id="comments">Комментарии<span class="glyphicon glyphicon-triangle-right glyph pull-right" aria-hidden="true" id="glyphCom"></span></a></li>
            <li><a href="#" id="notes">Заметки<span class="glyphicon glyphicon-triangle-right glyph pull-right" aria-hidden="true" id="glyphNote"></span> </a></li>
            <li><a href="#" id="feedback">Feedback</a></li>
            <li><a href="#" id="oktell">Oktell</a></li>
			<li><a href="#" id="magic">Magic</a></li>
            <li><a href="${pageContext.request.contextPath}/j_spring_security_logout" id="logout">Выйти</a></li>
            <label id="websocketStatus">Статус </label>
        </ul>
    </div>
	
    <div id="SubForm" class="form-group col-lg-4 container-fluid">
        <div class="row">
            <div class="form-group col-lg-2 text-center">
                <input type="number" class="form-control" id="IDNum" placeholder="ID учетной записи">
            </div>
            <div id="CloseSubForm" class="btn-group col-lg-8" data-toggle="buttons">
                <button type="button" id="2299" class="btn btn-danger btn-avito-red-2 pull-right"><span class="glyphicon glyphicon-remove" ></span>   Частник</button>
            </div>
        </div>
        <label>Категория учетной записи</label>

         <div class="row">
            <div class="btn-group col-lg-12" data-toggle="buttons" id="catButtonGroup">
                <label class="btn btn-primary btn-avito-blue col-lg-3" id="label-cat-1" >
                    <input type="radio" name="category" id="cat-1" autocomplete="off" value="1">Недвижимость
                </label>
                <label class="btn btn-primary btn-avito-red col-lg-3" id="label-cat-2">
                    <input type="radio" name="category" id="cat-2" autocomplete="off" value="2"> Транспорт
                </label>
                <label class="btn btn-primary btn-avito-green col-lg-2" id="label-cat-3">
                    <input type="radio" name="category" id="cat-3" autocomplete="off" value="3"> Работа
                </label>
                <label class="btn btn-primary btn-avito-purple col-lg-2" id="label-cat-4">
                    <input type="radio" name="category" id="cat-4" autocomplete="off" value="4"> Услуги
                </label>
                <label class="btn btn-primary btn-avito-gray col-lg-2" id="label-cat-5">
                    <input type="radio" name="category" id="cat-5" autocomplete="off" value="5"> General
                </label>
            </div>
        </div>
        <label>Категория вопроса</label>


        <div class="row">
            <div class="btn-group col-lg-12" data-toggle="buttons" id="questButtonGroup">
                <label class="btn btn-primary col-lg-3" id="label-quest-1">
                    <input type="radio" name="question" id="quest-1" autocomplete="off" value="1"> Блокировки
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-2">
                    <input type="radio" name="question" id="quest-2" autocomplete="off" value="2"> Платные услуги
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-3">
                    <input type="radio" name="question" id="quest-3" autocomplete="off" value="3"> Автозагрузка
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-4">
                    <input type="radio" name="question" id="quest-4" autocomplete="off" value="4"> Технические
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-5">
                    <input type="radio" name="question" id="quest-5" autocomplete="off" value="5"> Другие вопросы
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-6">
                    <input type="radio" name="question" id="quest-6" autocomplete="off" value="6"> Жалобы
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-7">
                    <input type="radio" name="question" id="quest-7" autocomplete="off" value="7"> Рекламные
                </label>
                <label class="btn btn-primary col-lg-3" id="label-quest-8">
                    <input type="radio" name="question" id="quest-8" autocomplete="off" value="8"> Несколько
                </label>

            </div>
        </div>
        <div>
            <span><br/></span>
        </div>
        <div class="row">
            <div class="col-lg-12">              
                    <input type="checkbox" data-toggle="toggle" id="IsManager" data-on="Менеджер" data-off="Клиент" data-offstyle="info avito-blue toggler" data-onstyle="danger avito-red toggler" data-width="130">              
                    
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <label>Дополнительные тэги</label>
                <div class="btn-group btn-group-justified" data-toggle="buttons">
                    <label class="btn btn-avito-tags" id="label-tag-1">
                        <input type="checkbox" id="tag-1" name="addTags" autocomplete="off" value="lf"> Listing Fees
                    </label>
                    <label class="btn btn-avito-tags" id="label-tag-2" title="Вопросы про платные услуги">
                        <input type="checkbox" id="tag-2" name="addTags" autocomplete="off" value="vas"> Платные услуги
                    </label>
                    <label class="btn btn-avito-tags" id="label-tag-3" title="Добавление размещений в подписку и общие вопросы про подписку">
                        <input type="checkbox" id="tag-3" name="addTags" autocomplete="off" value="subs"> Подписка
                    </label>
                    <label class="btn btn-avito-tags" id="label-tag-4" title="Пользователь передает какую-либо полезную информацию">
                        <input type="checkbox" id="tag-4" name="addTags" autocomplete="off" value="feedback" > Feedback
                    </label>
                </div>
            </div>
        </div>
		<div class="form-group">
            <label for="comment" id="serviceMessage"></label>
			
        </div>
		<div class="row">
            <div class="col-lg-12">
			<button type="button" id="sendDataButton" class="btn btn-success btn-avito-green-2 pull-right col-lg-3" value="addTags">Отправить</button>
			</div>
		</div>
    </div>

    <!-- Feedback -->
    <div id="FeedbackForm" class="form-group col-lg-5 container-fluid">
        <div class="row">
            <label id="TagLabel">Тэги по категориям</label>
        </div>
        <div class="btn-group col-lg-12" name="feedback-tags" data-toggle="buttons" id="feedback-tagButtonGroup">
            <div class="row">
                <label>Инфологическая модель</label>
                <div class="row">
                    <label class="btn btn-avito-tags col-lg-6" id="feed-tag-1">
                        <input type="checkbox" name="feedTags" id="model_geo" autocomplete="off" value="model_geo"> Добавить регион или город
                    </label>
                    <label class="btn btn-avito-tags col-lg-6" id="feed-tag-2">
                        <input type="checkbox" name="feedTags" id="model_cat" autocomplete="off" value="model_cat"> Добавить категорию/раздел
                    </label>
                </div>
            </div>
            <div class="row">
                <label>Поиск на сайте</label>
                <div class="row">
                    <label class="btn btn-avito-tags col-lg-3" id="feed-tag-3" title="Возможность выделять несколько фильтров сразу, добавление новых фильтров, поиск по удаленности, сортировка">
                        <input type="checkbox" name="feedTags" id="search_filters" autocomplete="off" value="search_filters"> Фильтры
                    </label>
                    <label class="btn btn-avito-tags col-lg-3" id="feed-tag-4" title="Поиск работает не так, как хочется">
                        <input type="checkbox" name="feedTags" id="search_problems" autocomplete="off" value="search_problems"> Проблемы
                    </label>
                    <label class="btn btn-avito-tags col-lg-6" id="feed-tag-5" title="Сортировка, поиск, выделение, уведомления, комментарии в избранном или сохраненных поисках">
                        <input type="checkbox" name="feedTags" id="search_favourite" autocomplete="off" value="search_favourite"> Избранное и сохраненные
                    </label>
                </div>
            </div>
            <div class="row">
                <label>Работа с объявлениями</label>
                <div class="row">
                    <label class="btn btn-avito-tags col-lg-3" id="feed-tag-6" title="Вид объявления, число просмотров, новые показатели, которые можно отображать на объявлении">
                        <input type="checkbox" name="feedTags" id="item_inside" autocomplete="off" value="item_inside"> Содержимое
                    </label>
                    <label class="btn btn-avito-tags col-lg-5" id="feed-tag-7" title="Процесс подачи, обязательные поля, подсказки по подаче, категории, контактная информация в объявлении, изменение информации после публикации или блокировки">
                        <input type="checkbox" name="feedTags" id="item_add" autocomplete="off" value="item_add"> Подача и редактирование
                    </label>
                    <label class="btn btn-avito-tags col-lg-2" id="feed-tag-8" title="Возможность оставлять комментарии, давать оценку объявлениям и продавцам">
                        <input type="checkbox" name="feedTags" id="item_review" autocomplete="off" value="item_review"> Отзывы
                    </label>
                    <label class="btn btn-avito-tags col-lg-2" id="feed-tag-9" title="LF / VAS: механика, кошелек, стоимость">
                        <input type="checkbox" name="feedTags" id="item_lf" autocomplete="off" value="item_lf_vas"> LF VAS
                    </label>
                </div>
            </div>
            <div class="row">
                <label>Работа с сайтом</label>
                <div class="row">
                    <label class="btn btn-avito-tags col-lg-5" id="feed-tag-10" title="Массовые активации, кнопки наверх/вперед/назад, отличие просмотренных объявлений от непросмотренных, личные комментарии к объявлениям (для себя), неудобство навигации, поиск по своим объявлениям, все объявления от одного пользователя">
                        <input type="checkbox" name="feedTags" id="site_navigation" autocomplete="off" value="site_navigation"> Навигация и юзабилити
                    </label>
                    <label class="btn btn-avito-tags col-lg-3" id="feed-tag-11" title="Приложение для других платформ, для iPad, технические моменты приложения">
                        <input type="checkbox" name="feedTags" id="site_mobile" autocomplete="off" value="site_mobile"> Mobile
                    </label>
                    <label class="btn btn-avito-tags col-lg-4" id="feed-tag-12" title="Уведомления в мессенджере, ссылки, копирование текста, пересылка файлов">
                        <input type="checkbox" name="feedTags" id="site_messenger" autocomplete="off" value="site_messenger"> Мессенджер
                    </label>
                </div>
                <div class="row">
                    <label class="btn btn-avito-tags col-lg-6" id="feed-tag-13" title="Двухэтапная аутентификация, подтверждение по телефону, улучшенные пароли">
                        <input type="checkbox" name="feedTags" id="site_safety" autocomplete="off" value="site_safety"> Безопасность
                    </label>
                    <label class="btn btn-avito-tags col-lg-6" id="feed-tag-14">
                        <input type="checkbox" name="feedTags" id="site_other" value="site_other" autocomplete="off"> Остальные
                    </label>
                </div>
            </div>

            <div class="row">
                <div class="form-group">
                    <div class="row">
                        <label for="feedbackComment" id="commentLabel">Поле для комментария</label>
                        <textarea class="form-control" rows="5" id="feedbackComment" maxlength="2048"></textarea>
                    </div>
                </div>
            </div>

        </div>
        <div class="btn-group" data-toggle="buttons" id="sendFeedback">
            <div class="row">
				<label id="serviceFeedbackMessage"></label>
                <button type="button" id="sendFeedbackButton" class="btn btn-success" value="feedTags">Сохранить</button>
            </div>
        </div>
    </div>
	
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="col-lg-12">
			
                <h1 id="HeaderText"></h1>
                <div class="row">
                    <div id="CallForm" class="form-group col-md-6">
                    </div>
                </div>
                <div class="row">
                    <p id="MainForm" class="col-lg-10">
                    <div id="Hello">
                        <h1>Здравствуй, ${username} !</h1>
                    </div>				
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
			<div id="noteForm" class="form-group col-lg-3">
				<div class="row">
					<h1>Заметки</h1>
				</div>
				<div class="row">
					<textarea class="form-control" id="noteArea"></textarea>
				</div>
			</div>
			<div id="commentForm" class="form-group col-lg-3">
				<div class="row ">
					<h1>Комментарии</h1>
				</div>
				<div class="row">
					
						<div class="input-group goButton">
							<input type="number" class="form-control" id="IDforComments" placeholder="ID учетной записи" autofocus>
							<span class="input-group-addon btn btn-success" id="IDSubmitComments" onclick=getComments()>GO</span>
						</div>
					
				</div>
				<div class="row" id="forComments">
				</div>
			</div>
<script>
    (function() {
        document.getElementById("oktell").onclick = function() {
            var wnd = window.open("http://web_api:s7cgr3Ev@192.168.3.10:4055/download/", "hello", "width=200,height=200");

            wnd.onerror = function(){
                wnd.document.write("Соединение с октелл...");
                wnd.alert("error");
            };
            setTimeout(function() {
                wnd.close();
            }, 1500);
            return false;
        };
    })();
</script>
<script>
    setTimeout(jQuery(function(){
        jQuery('#my_calls').click();
    }, 2500));

</script>
</body>

</html>
