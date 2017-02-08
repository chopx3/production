
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Авторизация</title>
    <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/css/signin.css" rel="stylesheet">
    <link rel="icon" href="${pageContext.request.contextPath}/resources/favicon-32x32.png">
    <%--<%response.sendRedirect("http://www.mydomain.com/somethingelse/index.jsp");%>--%>
</head>


<body>
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
            <form class="form-signin" name="form_login" action="/avito/j_spring_security_check" method="post">
                <h2 class="form-signin-heading">Авторизация</h2>
                <c:if test ="${not empty error}">
                    ${error}
                </c:if>
                <input type="text" name="user_login" id="inputEmail" class="form-control" placeholder="Логин" required autofocus>
                <br>
                <input type="password" name="password_login" id="inputPassword" class="form-control" placeholder="Пароль" required>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="remember_me" value="remember-me"> Запомнить
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit"> Войти</button>
            </form>
        </div>
    </div>
</div>


</body>
</html>


