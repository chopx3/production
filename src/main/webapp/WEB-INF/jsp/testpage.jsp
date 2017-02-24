<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
<h2>Hello World!</h2>

hi ${hello}

<script>
    var request = new XMLHttpRequest();
//    var host = "http://192.168.10.49:8080/avito";
    var host = "http://192.168.10.132:8080/avito";

function getEmptyCallsByAgentId (agentId) {
    request.open("get",host+"/rest/call/getemptycalls?userid="+agentId, true);
    request.send();
    request.onload = function () {
        console.log(request.responseText);
    }
}
function getcallsBytags (tags) { // принимает теги как regexp (tag1|tag2|...) TODO поправить на будущее
    request.open("get",host+"/rest/call/feedback/get?tags="+tags, true);
    request.send();
    request.onload = function () {
        console.log(request.responseText);
    }
}
    var saveURL ="http://192.168.10.49:8080/avito/rest/oktell/savecallrecord";
    var updateURL ="http://192.168.10.49:8080/avito/rest/call/update";

    function getNewCall(){ var newCall = {
        "Bstr": "30",
        "IDChain": "ABCD-ABCD-3",
        "IDConn": String(Math.round(new Date().getTime() / 1000.0)),
        "starttime": String(Math.round(new Date().getTime() / 1000.0)),
        "stoptime": String(Math.round(new Date().getTime() / 1000.0)),
        "Astr": "2035",
        "ReasonStart": "1"
    }
     return newCall;
    }

    function getUpdateCall(){ var updateCall = {
        "uAgentId": "30",
        "uChainId": "ABCD-ABCD-3",
        "uAvitoUserId": String(Math.round(new Date().getTime() / 1000.0)),
        "question": String(Math.round(new Date().getTime() / 1000.0)),
        "shop_category": String(Math.round(new Date().getTime() / 1000.0)),
        "tags": "feedback",
        "isManager": "0"
    }
        return updateCall;
    }


    var RestPost = function(senddata) {

        var aData;
        var aUrl
        for (var n =0; n < 3; n++){

            if (senddata == 'save'){
                aData = getNewCall();
                aUrl = saveURL;
            }
            else {
                aData = getUpdateCall();
                aUrl = updateURL;
            }

        setTimeout( function () {
            $.ajax({
                url: aUrl,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                data: aData, //Stringified Json Object
                async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
                cache: false,    //This will force requested pages not to be cached by the browser
                processData: false, //To avoid making query String instead of JSON
                success: function (resposeJsonObject) {
                    // Success Action
                },
                error: function (message) {
                    alert(message)
                }
            });
        }, 500+n);
        }
    }

</script>

<form action="http://192.168.10.132:8080/avito/rest/oktell/savecallrecord" method="get">
    <%--<form action="http://192.168.10.49:8080/avito/rest/oktell/savecallrecord" method="get">--%>
    <input type="text" name="Bstr" value="Okunev Dmitry">Bstr<br>
    <input type="text" name="IDChain" value="ABCD-ABCD-3">IDChain<br>
    <input type="text" name="IDConn">IDConn<br>
    <input type="text" id="starttime" name="TimeStart" value="0">TimeStart<br>
    <input type="text" id="stoptime" name="TimeStop" value="0">TimeStop<br>
    <input type="text" name="Astr" value=2035>Astr<br>
    <input type="text" name="ReasonStart" value="1">ReasonStart<br>
    <button type="submit" value="submit">send</button>

</form>

Update call form

<form action="http://192.168.10.132:8080/avito/rest/call/update" method="get">
    <%--<form action="http://192.168.10.49:8080/avito/rest/call/update" method="get">--%>
    <input type="text" name="uAgentId" value="30">uAgentId<br>
    <input type="text" name="uChainId" value="ABCD-ABCD-3">uChainId<br>
    <input type="text" name="uAvitoUserId" value="1939992">uAvitoUserId<br>
    <input type="text" name="question" value="2">question<br>
    <input type="text" name="shop_category" value="2">shop_category<br>
    <input type="text" name="isManager">isManager<br>
    <input type="text" name="tags" value="feedback">Tags<br>
    <button type="submit" value="submit">update</button>

</form>

Feedback form
<br>
Put feedback
<form action="http://192.168.10.132:8080/avito/rest/call/feedback/put" method="get">
    <%--<form action="http://192.168.10.49:8080/avito/rest/call/feedback/put" method="get">--%>
    <input type="text" name="comment">comment<br>
    <input type="text" name="tags">tags<br>
    <input type="text" name="agentId" value="30">agentId<br>
    <input type="text" name="chainId" value="ABCD-ABCD-3">chainId<br>
    <button type="submit" value="submit">put feedback</button>
</form>
    Get feedback
<form action="http://192.168.10.132:8080/avito/rest/call/feedback/all/get" method="get">
    <%--<form action="http://192.168.10.49:8080/avito/rest/call/feedback/get" method="get">--%>
        <input type="text" name="tags">tags<br>
        <button type="submit" value="submit">get feedback</button>
    </form>

<script>
    var stopTime = Math.round(new Date().getTime()/1000.0);
    document.getElementById("stoptime").value=stopTime;
    document.getElementById("starttime").value=stopTime-300;
</script>


</body>
</html>
