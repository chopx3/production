<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
  <title> Админка </title>
	<link rel="icon" href="${pageContext.request.contextPath}/resources/img/admin.ico">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/testpageCommonController.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/commonData.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/testpageAgentsController.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/testpageStatController.js" type="text/javascript"charset="utf-8"></script>
  <script src="${pageContext.request.contextPath}/resources/js/calendar.js" type="text/javascript" charset="utf-8"></script>
  <script src="${pageContext.request.contextPath}/resources/js/testpageTagsController.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/testpageQuestionsController.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/testpageCategoriesController.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/testpageAngryUsers.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/rePremFiles.js"></script>      
  <link href="${pageContext.request.contextPath}/resources/css/testPage.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/calls.css" rel="stylesheet">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
</head>
<body>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand">Админка</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav topbar">
          <li class="hl highlight"><a href="#" onclick=openAgents()>Агенты </a></li>
          <li class="hl"><a href="#" onclick=openTags("tags")>Тэги</a></li>
          <li class="hl"><a href="#" onclick=openTags("group")>Группы тэгов</a></li>
          <li class="hl"><a href="#" onclick=openQuestions()>Вопросы</a></li>
          <li class="hl"><a href="#" onclick=openCategories()>Категории</a></li>
          <li class="hl"><a href="#" onclick=openStat()>Статистика</a></li>
          <li class="hl"><a href="#" onclick=openAngry()>Злость</a></li>
	        <li class="hl"><a href="http://192.168.10.132/firecatcher/admin/feedback">Feedback</a></li>
        </ul>
          <form class="navbar-form navbar-left" onSubmit="return false;">
            <div id=searchBar>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Поиск" id=searchField>
                <span class="input-group-btn">
		              <button class="btn btn-secondary" type="button" id=searchButton>Поиск</button>
		            </span>
              </div>
            </div>
          </form>
          <div class="form-group navbar-right noMargin">
          <label for="exampleInputFile">Файл для загрузки</label>
          <input type="file" class="form-control-file" id="files" aria-describedby="fileHelp" name="files[]">
          </div>
      </div> <!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
<div id="wrapper" class="col-lg-12 container-fluid">
  <div id="infoWrapper" class="col-lg-12">
    <div class="row">
      <div id="allAgentsTable" class="col-lg-8"></div>
		  <div id="secondTable" class="col-lg-8"></div>
        <div id="updateAgent" class="col-lg-4">
          <div id=updateWrapper class="roundPlusShadow col-lg-4">
            <div id=updHeader></div>
            <div id=updBody class="form-group form-body"></div>
            <div id=updFooter class=Footer></div>
          </div>
          <div id=addWrapper class="roundPlusShadow col-lg-4">
            <div id=addHeader></div>
            <div id=addBody class="form-group form-body"></div>
            <div id=addFooter class=Footer></div>
          </div>
        </div>
      </div>
  </div>
</div>
</body>
</html>