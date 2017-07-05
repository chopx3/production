<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/testpageAgentsController.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/testpageStatController.js" type="text/javascript"charset="cp1251"></script>
	<script src="${pageContext.request.contextPath}/resources/js/calendar.js" type="text/javascript" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath}/resources/js/testpageTagsController.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/testpageCommonController.js"></script>
	<link href="${pageContext.request.contextPath}/resources/css/testPage.css" rel="stylesheet">
	<script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
</head>
<body>
<script>
    var request = new XMLHttpRequest();
    var host = location.protocol + '//' + location.host;
//    var host = "http://192.168.10.132:8080/avito";

    var saveURL =host+"/firecatcher/oktell/call/save";
    var feedBackSaveURL =host+"/firecatcher/api/call/feedback/save";
    var updateURL =host+"/firecatcher/api/call/update";
    var saveChainURL =host+"/firecatcher/api/oktell/chain/save";
    var findFeedBackURL =host+"/firecatcher/api/call/feedback/find";
    var findByQuestionURL = host+"/firecatcher/api/call/find/questions/1491782400000/1491868800000"


    var ids=[{"id":17}, {"id":18}]

    var qIds=[7];

    var updateCall = {
        "id": 13430,
        "agentId": "2",
        "chainId": "D3170343-ED1F-4388-A51D-8361E2C4FAD3",
        "avitoUserId": 1939992,
        "questId": 2,
        "shopCategoryId": 1,
        "type": "EMPTY_FEEDBACK",
        "isManager": false,
        "tags":[{
            "id": 18
        },
            {
                "id": 1
            },
            {
                "id": 2
            },{
                "id": 3
            }]
    }

    var feedBackCAll = {
        "agentId":2,
        "chainId": "D3170343-ED1F-4388-A51D-8361E2C4FAD3",
        "comments": "какой-то угар...",
        "type": "FULL_FEEDBACK",
        "tags":[{
            "id": 18
        },
            {
                "id":16
            },
            {
                "id":17
            }]
    }


    var fakeCall =  {
        "chainId": "48258FE5-1646-4F10-BC9A-4CEBE64C548B",
        "commutations": [
            {
                "comId": "D0CFE4D4-64E1-4F8E-89B8-45EA47DC98CC",
                "timeStart": 1490703378,
                "timeEnd": 1490703388,
                "aStr": "asterisk",
                "bStr": "2331",
                "reasonStart": 2
            }
        ]
    }
    var fakeAgent =  {
        "chainId": "A0FBADDF-682A-4522-8020-6B5FD6C142C4",
        "commutations": [
            {
                "comId": "580C575F-9AB0-4B8C-996D-99075196A5DC",
                "timeStart": 1490709527,
                "timeEnd": 1490709788,
                "aStr": "8552926201",
                "bStr": "Kashtanova Anastasia",
                "reasonStart": 1
            }
        ]
    }
    var newCall =  {
        "chainId": "D3170343-ED1F-4388-A51D-8361E2C4FAD3",
        "commutations": [
            {
                "comId": "82A6C5sas84-A63D-409B-9D10-E6F15E61EB56",
                "timeStart": 1492178013,
                "timeEnd": 1492178113,
                "aStr": "5356, CallCenter",
                "bStr": "Okunev Dmitry",
                "reasonStart": 1
            }
        ]
    }
    var newCallHold =  {
        "chainId":"CC7A96B1-9DF1-41BE-ACF5-9203CFE0B6B8",
        "commutations":[
            {
                "comId":"D79C79D4-2DAA-4B55-9C46-D5B8446E3445",
                "timeStart":1472474023,
                "timeEnd":1472474101,
                "aStr":"9214158505, Звонок / Orange",
                "bStr":"Mokrousov Georgiy",
                "reasonStart":1
            },
            {
                "comId":"F6C7C60E-BDA1-4C9F-99B8-36952AF3186E",
                "timeStart":1472474451,
                "timeEnd":1472474645,
                "aStr":"9214158505, Звонок / Orange",
                "bStr":"Mokrousov Georgiy",
                "reasonStart":5
            },
            {
                "comId":"FE62474C-1762-435D-8650-5DFC1BE1A85E",
                "timeStart":1472475036,
                "timeEnd":1472475770,
                "aStr":"9214158505, Звонок / Orange",
                "bStr":"Mokrousov Georgiy",
                "reasonStart":5
            },
            {
                "comId":"853524D2-E7B2-4E93-BC76-133C0F552EB1",
                "timeStart":1472475997,
                "timeEnd":1472476406,
                "aStr":"9214158505, Звонок / Orange",
                "bStr":"Mokrousov Georgiy",
                "reasonStart":5
            }
        ]
    }
    var newCallHoldRedirect =  {
        "chainId": "292E2794-3BB9-4A7A-8A38-665041875378",
        "commutations": [
            {
                "comId": "9C751C9A-E57F-4035-8731-C42F1135B6C3",
                "timeStart": 1490709359,
                "timeEnd": 1490709391,
                "aStr": "8122759582, Звонок / Orange",
                "bStr": "Shmakov Ilya",
                "reasonStart": 1
            },
            {
                "comId": "5D3FB291-FA69-42AA-91FD-69E651946DE2",
                "timeStart": 1490709398,
                "timeEnd": 1490709424,
                "aStr": "Shmakov Ilya",
                "bStr": "Avtomonova Alena",
                "reasonStart": 5
            },
            {
                "comId": "E34DC283-9E24-4434-BA3D-C0E4C4440523",
                "timeStart": 1490709424,
                "timeEnd": 1490709459,
                "aStr": "8122759582, Звонок / Orange",
                "bStr": "Avtomonova Alena",
                "reasonStart": 2
            },
            {
                "comId": "3F88EFAF-7B88-4F51-83E9-CE9F512E285E",
                "timeStart": 1490709651,
                "timeEnd": 1490709671,
                "aStr": "8122759582, Звонок / Orange",
                "bStr": "Avtomonova Alena",
                "reasonStart": 5
            }
        ]
    }
    var newCallInsideRedirectSales =  {
        "chainId": "839722F9-1FCE-4531-8CED-ECD25D0B9D10",
        "commutations": [
            {
                "comId": "85A2C97D-64E5-458A-A16F-092B8CE83071",
                "timeStart": 1490698768,
                "timeEnd": 1490698809,
                "aStr": "4999684682, Звонок / Orange",
                "bStr": "Shmakov Ilya",
                "reasonStart": 1
            },
            {
                "comId": "ACF66651-B49C-4BE7-B905-65C0855870D3",
                "timeStart": 1490698814,
                "timeEnd": 1490698843,
                "aStr": "Shmakov Ilya",
                "bStr": "5900",
                "reasonStart": 5
            },
            {
                "comId": "B4B2FF28-1110-4B1B-AB7A-E184F787DBAF",
                "timeStart": 1490698843,
                "timeEnd": 1490698934,
                "aStr": "4999684682, Звонок / Orange",
                "bStr": "5900",
                "reasonStart": 2
            }
        ]
    }
    var newCallRedirectFromDoc =  {
        "chainId": "5363AABE-6777-4C88-8B5B-506A08D0A933",
        "commutations": [
            {
                "comId": "30253E8B-F152-439A-A90D-0097FDF7B295",
                "timeStart": 1490698336,
                "timeEnd": 1490698505,
                "aStr": "8126771151, Звонок / Orange",
                "bStr": "Strekha Olesya",
                "reasonStart": 1
            },
            {
                "comId": "D40878AF-B62C-4F6D-A2BF-F3CD908DDF3F",
                "timeStart": 1490698530,
                "timeEnd": 1490698577,
                "aStr": "Strekha Olesya",
                "bStr": "Andreeva Dariya",
                "reasonStart": 5
            },
            {
                "comId": "B8588A2E-6924-4AA5-B395-1F0FF3E240D4",
                "timeStart": 1490698577,
                "timeEnd": 1490698718,
                "aStr": "8126771151, Звонок / Orange",
                "bStr": "Andreeva Dariya",
                "reasonStart": 2
            }
        ]
    }
    var newCallRedirectToDoc =  {
        "chainId": "AD7A5921-DE26-4332-8759-2F113235324B",
        "commutations": [
            {
                "comId": "698134A0-9BAD-4D15-A5C7-35F030DCFF9F",
                "timeStart": 1490696716,
                "timeEnd": 1490696901,
                "aStr": "9184493333, Звонок / Orange",
                "bStr": "Bolotova Aleksandra",
                "reasonStart": 1
            },
            {
                "comId": "BAE5F660-0906-41E0-BAAE-05340553CE2D",
                "timeStart": 1490696915,
                "timeEnd": 1490696945,
                "aStr": "Bolotova Aleksandra",
                "bStr": "Yudenko Olga",
                "reasonStart": 5
            },
            {
                "comId": "F11E53A2-5A9B-4D54-B68B-156F6DA404FE",
                "timeStart": 1490696945,
                "timeEnd": 1490697099,
                "aStr": "9184493333, Звонок / Orange",
                "bStr": "Yudenko Olga",
                "reasonStart": 2
            }
        ]
    }
    var outCommingCall =  {
        "chainId": "935F7A64-DE04-454F-8022-A18DB3767889",
        "commutations": [
            {
                "comId": "3C6FFE2E-2CF5-4777-9350-6259133660EE",
                "timeStart": 1490697861,
                "timeEnd": 1490697929,
                "aStr": "Ovechkina Lidiya",
                "bStr": "78632565556",
                "reasonStart": 3
            }
        ]
    }
    var outCommingCallDoc =  {
        "chainId": "EA1B44F3-B122-4179-B4B6-B0B117C5FD6D",
        "commutations": [
            {
                "comId": "0A301795-72CA-4BF8-935A-CCFB5B178878",
                "timeStart": 1490696135,
                "timeEnd": 1490696144,
                "aStr": "Yudenko Olga",
                "bStr": "89216536025",
                "reasonStart": 3
            }
        ]
    }
    var newCallInsideRedirect =  {
        "chainId": "E10BE830-5E16-4127-935E-DD78B194D74C",
        "commutations": [
            {
                "comId": "1221B761-8EFF-4548-9C2D-3F6C01981292",
                "timeStart": 1490636805,
                "timeEnd": 1490636840,
                "aStr": "8126771151, Звонок / Orange",
                "bStr": "Savin Alexey",
                "reasonStart": 1
            },
            {
                "comId": "C117DE26-CA19-4397-82DF-EAAF25334A62",
                "timeStart": 1490636844,
                "timeEnd": 1490636865,
                "aStr": "Savin Alexey",
                "bStr": "Matsak Sergey",
                "reasonStart": 5
            },
            {
                "comId": "B2F44F38-1CA6-4FE9-8B3B-FC735AB84F07",
                "timeStart": 1490636865,
                "timeEnd": 1490636913,
                "aStr": "8126771151, Звонок / Orange",
                "bStr": "Matsak Sergey",
                "reasonStart": 2
            }
        ]
    }
    var postCommentURL = host+"/firecatcher/api/comments/save"

    var postAgentURL = host+"/firecatcher/api/agent/save"
    var updateAgentURL = host+"/firecatcher/api/agent/update"
    var updateAgentNotesURL = host+"/firecatcher/api/agent/notes/update"

    var comment = {
        "avitoUserId":1939992,
        "postTime": 1491502656000,
        "message": "api comment"
    }


    var newAgent ={
        "username":"tester",
        "password":"test",
        "oktellLogin":"Anton Test",
        "roles":[{ "id":2,
                    "name":"ROLE_USER"
                 }
        ]
    };

    var updateAgent ={
        "id":83,
        "username": "apetorov",
        "password": "test",
        "oktellLogin": "Anton Petorov",
        "roles":[{ "id": 1,
            "name": "ROLE_ADMIN"
        }
        ]
    };

    var updateAgentNotes = {
        "id":83,
        "notes": "DDD"
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

</script>
<!--
<%--<form action="http://192.168.10.132:8080/avito/rest/oktell/savecallrecord" method="get">--%>
    <form action="http://10.10.37.132:8080/avito/rest/oktell/savecallrecord" method="get">
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
    <form action="http://10.10.37.132:8080/avito/rest/call/update" method="get">
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
    <form action="http://10.10.37.132:8080/avito/rest/call/feedback/put" method="get">
    <input type="text" name="comment">comment<br>
    <input type="text" name="tags">tags<br>
    <input type="text" name="agentId" value="30">agentId<br>
    <input type="text" name="chainId" value="ABCD-ABCD-3">chainId<br>
    <button type="submit" value="submit">put feedback</button>
</form>
    Get feedback
<%--<form action="http://192.168.10.132:8080/avito/rest/call/feedback/all/get" method="get">--%>
    <form action="http://10.10.37.132:8080/avito/rest/call/feedback/get" method="get">
        <input type="text" name="tags">tags<br>
        <button type="submit" value="submit">get feedback</button>
    </form>

<script>
    var stopTime = Math.round(new Date().getTime()/1000.0);
    document.getElementById("stoptime").value=stopTime;
    document.getElementById("starttime").value=stopTime-300;
</script>

<button onclick="RestPost(updateCall, updateURL)">Update call</button>
<button onclick="RestPost(feedBackCAll, feedBackSaveURL)">save feedback call</button>
<button onclick="RestPost(fakeCall, saveChainURL)">fake call</button>
<button onclick="RestPost(fakeAgent, saveChainURL)">fake agent</button>
<button onclick="RestPost(newCall, saveChainURL)">new call</button>
<button onclick="RestPost(newCallHold, saveChainURL)">new hold-call</button>
<button onclick="RestPost(newCallHoldRedirect, saveChainURL)">newCallHoldRedirect</button>
<button onclick="RestPost(newCallInsideRedirect, saveChainURL)">newCallInsideRedirect</button>
<button onclick="RestPost(newCallRedirectFromDoc, saveChainURL)">newCallRedirectFromDoc</button>
<button onclick="RestPost(newCallRedirectToDoc, saveChainURL)">newCallRedirectToDoc</button>
<button onclick="RestPost(newCallInsideRedirectSales, saveChainURL)">newCallInsideRedirectSales</button>
<button onclick="RestPost(outCommingCall, saveChainURL)">outCommingCall</button>
<button onclick="RestPost(outCommingCallDoc, saveChainURL)">outCommingCallDoc</button>

<br>
<button onclick="RestPost(comment, postCommentURL)">putComment</button>

<br>
<button onclick="RestPost(newAgent, postAgentURL)">add Agent</button>
<button onclick="RestPost(updateAgent, updateAgentURL)">update Agent</button>
<button onclick="RestPost(updateAgentNotes, updateAgentNotesURL)">update notes</button>


<br>
<button onclick="RestPost(ids, findFeedBackURL)">findFeedback</button>

<br>
<button onclick="RestPost(qIds, findByQuestionURL)">find by question</button>
Old form
-->
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Админка</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav topbar">
        <li class="hl"><a href="#" onclick=fillAgents()>Агенты </a></li>
        <li class="hl"><a href="#" onclick=fillTags("tags")>Тэги</a></li>
		<li class="hl"><a href="#" onclick=fillTags("group")>Группы тэгов</a></li>
		<li class="hl"><a href="#" onclick=openStat()>Статистика</a></li>
      </ul>
      <form class="navbar-form navbar-left">
        <div id=searchBar>
			<div class="input-group">
			  <input type="text" class="form-control" placeholder="Username or value" id=searchField>
			  <span class="input-group-btn">
				<button class="btn btn-secondary" type="button" id=searchButton>Поиск</button>
			  </span>
			</div>
		</div>
      </form>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<!--


-->
<div id="wrapper" class="col-lg-12">
	<div id="agents" class="col-lg-12">
		<div class="row">
		<div id="allAgentsTable" class="col-lg-8">
			
		</div>
		<div id="updateAgent" class="col-lg-4">
			<div id=updateWrapper class="uniForm col-lg-4">
				<div id=updHeader>
				
				</div>
				<div id=updBody class="form-group form-body">
					
				</div>
				<div class=Footer id=updFooter>
				
				</div>
			</div>
			<div id=addWrapper class="uniForm col-lg-4">
				<div id=addHeader>
				
				</div>
				<div id=addBody class="form-group form-body">
					
				</div>
				<div class=Footer id=addFooter>
				
				</div>
			</div>
		</div>

		</div>
	</div>
</div>


</body>
</html>
