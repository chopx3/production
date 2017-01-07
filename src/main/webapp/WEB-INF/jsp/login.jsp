
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<form name="form_login" action="/j_spring_security_check" method="post">
    <table>
        <tr>
            <td>Username</td>
            <td><input type="text" name="user_login" value=""/></td>
        </tr>
        <tr>
            <td>Password</td>
            <td><input type="password" name="password_login" value=""/></td>
            <td><input name="sumbit" type="submit" value="submit"/></td>
        </tr>
    </table>

    <input type="checkbox" name="remember_me"/>Remember me

</form>

<c:if test ="${not empty error}">
    ${error}
</c:if>

</body>
</html>
