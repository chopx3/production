<html>
<head>
</head>
<body>
<h2>Hello World!</h2>

hi ${hello}

<script>
    var request = new XMLHttpRequest();
    var host = "http://192.168.11.87:8085/";
//    var host = "http://192.168.10.132:8080/";

function getEmptyCallsByAgentId (agentId) {
    request.open("get",host+"shoptracker/rest/call/getemptycalls?userid="+agentId, true);
    request.send();
    request.onload = function () {
        console.log(request.responseText);
    }
}
function getcallsBytags (tags) { // принимает теги как regexp (tag1|tag2|...) TODO поправить на будущее
    request.open("get",host+"/shoptracker/rest/call/feedback/get?tags="+tags, true);
    request.send();
    request.onload = function () {
        console.log(request.responseText);
    }
}
</script>

<form action="http://192.168.11.87:8085/shoptracker/rest/oktell/savecallrecord" method="get">
    <input type="text" name="Bstr">Bstr<br>
    <input type="text" name="IDChain">IDChain<br>
    <input type="text" name="IDConn">IDConn<br>
    <input type="text" name="TimeStart" value="1485257154">TimeStart<br>
    <input type="text" name="TimeStop" value="1485257450">TimeStop<br>
    <input type="text" name="Astr">Astr<br>
    <input type="text" name="ReasonStart">ReasonStart<br>
    <button type="submit" value="submit">send</button>

</form>

Update call form

<form action="http://192.168.11.87:8085/shoptracker/rest/call/update" method="get">
    <input type="text" name="uAgentId">uAgentId<br>
    <input type="text" name="uChainId">uChainId<br>
    <input type="text" name="uAvitoUserId">uAvitoUserId<br>
    <input type="text" name="question">question<br>
    <input type="text" name="shop_category">shop_category<br>
    <input type="text" name="isManager">isManager<br>
    <input type="text" name="tags">Tags<br>
    <button type="submit" value="submit">update</button>

</form>

Feedback form
Put feedback
<form action="http://192.168.11.87:8085/shoptracker/rest/call/feedback/put" method="get">
    <input type="text" name="comment">comment<br>
    <input type="text" name="tags">tags<br>
    <input type="text" name="userId">userId<br>
    <input type="text" name="chainId">chainId<br>
    <button type="submit" value="submit">put feedback</button>
</form>
    Get feedback
    <form action="http://192.168.11.87:8085/shoptracker/rest/call/feedback/get" method="get">
        <input type="text" name="tags">tags<br>
        <button type="submit" value="submit">get feedback</button>
    </form>
</body>
</html>
