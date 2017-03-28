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
    var host = "http://10.10.38.8:8080/avito";
//    var host = "http://192.168.10.132:8080/avito";

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
    var saveURL =host+"/oktell/call/save";
    var updateURL =host+"/rest/call/update";
    var saveChainURL =host+"/oktell/chain/save";
    var saveChainsURL =host+"/oktell/chains/save";

   var newCall = {
        "bStr": "Okunev Dmitry",
        "chainId": "ABCD-ABCD-3",
        "comId": "ABCD-ABCD-3-"+Math.round(new Date().getTime() / 1000.0),
        "timeStart": Math.round(new Date().getTime() / 1000.0),
        "timeEnd": Math.round(new Date().getTime() / 1000.0),
        "aStr": "2035",
        "reasonStart": 1

    }

    var updateCall = {
        "uAgentId": "30",
        "uChainId": "ABCD-ABCD-3",
        "uAvitoUserId": 1939992,
        "question": 2,
        "shop_category": 1,
        "tags": "feedback",
        "isManager": "0"
    }
    var jsonPostOktell =  {
        "chainId": "123",
        "commutations": [
            {
                "comId": "dsda",
                "timeStart": 123123,
                "timeEnd": 123321,
                "aStr": "vasya",
                "bStr": "petya",
                "reasonStart": 1
            },
            {
                "comId": "dsdx",
                "timeStart": 123521,
                "timeEnd": 123921,
                "aStr": "vasya",
                "bStr": "petya",
                "reasonStart": 5
            }
        ]
    }

    var jsonTest =  {
        "chainId": "123"
    }




    var RestPost = function(sendData, url) {

        console.log(url)
        console.log(sendData)

            $.ajax({
                url: url,
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(sendData), //Stringified Json Object
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
    }

</script>

<%--<form action="http://192.168.10.132:8080/avito/rest/oktell/savecallrecord" method="get">--%>
    <form action="http://10.10.38.8:8080/avito/rest/oktell/savecallrecord" method="get">
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

<%--<form action="http://192.168.10.132:8080/avito/rest/call/update" method="get">--%>
    <form action="http://10.10.38.8:8080/avito/rest/call/update" method="get">
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
<%--<form action="http://192.168.10.132:8080/avito/rest/call/feedback/put" method="get">--%>
    <form action="http://10.10.38.8:8080/avito/rest/call/feedback/put" method="get">
    <input type="text" name="comment">comment<br>
    <input type="text" name="tags">tags<br>
    <input type="text" name="agentId" value="30">agentId<br>
    <input type="text" name="chainId" value="ABCD-ABCD-3">chainId<br>
    <button type="submit" value="submit">put feedback</button>
</form>
    Get feedback
<%--<form action="http://192.168.10.132:8080/avito/rest/call/feedback/all/get" method="get">--%>
    <form action="http://10.10.38.8:8080/avito/rest/call/feedback/get" method="get">
        <input type="text" name="tags">tags<br>
        <button type="submit" value="submit">get feedback</button>
    </form>

<script>
    var stopTime = Math.round(new Date().getTime()/1000.0);
    document.getElementById("stoptime").value=stopTime;
    document.getElementById("starttime").value=stopTime-300;
</script>


<button onclick="RestPost(newCall,saveURL)">save call</button>
<button onclick="RestPost(jsonPostOktell, saveChainURL)">save chain</button>
<button onclick="RestPost(jsonPostOktell, saveChainsURL)">save chains</button>

</body>
</html>
