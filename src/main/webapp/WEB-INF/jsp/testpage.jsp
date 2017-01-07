<html>
<head>
</head>
<body>
<h2>Hello World!</h2>

<script>
    var request = new XMLHttpRequest();

    request.open("get","http://localhost:8085/rest/call/getemptycalls?userid=1", true);
    request.send();
    request.onload = function () {
        console.log(request.responseText);
    }

</script>

<form action="http://192.168.9.145:8085/rest/oktell/savecallrecord" method="get">
    <input type="text" name="Bstr">Bstr<br>
    <input type="text" name="IDChain">IDChain<br>
    <input type="text" name="IDConn">IDConn<br>
    <input type="text" name="TimeStart">TimeStart<br>
    <input type="text" name="TimeStop">TimeStop<br>
    <input type="text" name="Astr">Astr<br>
    <input type="text" name="ReasonStart">ReasonStart<br>
    <button type="submit" value="submit">send</button>

</form>

hi ${hello}

</body>
</html>
