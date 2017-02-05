<%@ page language="java" contentType="text/html; charset=windows-1251" pageEncoding="windows-1251"%>
<html>
<head>
    <title>GUI-stat</title>
    <meta charset ="windows-1251">
    <script src="${pageContext.request.contextPath}/resources/js/jquery-1.8.3.min.js" type=text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resources/js/calendar.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jszip-utils.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jszip.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resources/js/fileSaver.js" type="text/javascript"></script>


    <a href="/agents/">Back to index</a>
    <script>
        function showManager(){

            var x = new XMLHttpRequest();
            x.open("GET", getHost("managers"), true);

            if (x.statusText !=200)
                document.getElementById("response").innerHTML = "Error";
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Manager) ';
                document.getElementById("response").innerHTML = x.responseText;
            }
            x.send(null);
        }

        function showCategory(){
            var x = new XMLHttpRequest();
            x.open("GET", getHost("category"), true);
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Category) ';
                document.getElementById("response").innerHTML = x.responseText;
            }
            x.send(null);
        }
        function showUsers(){
            var x = new XMLHttpRequest();
            x.open("GET", getHost("users"), true);
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Users) ';
                document.getElementById("response").innerHTML = x.responseText;
            }
            x.send(null);
        }

        function showQuestions(){
            var x = new XMLHttpRequest();
            x.open("GET", getHost("questions"), true);
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Question) ';
                document.getElementById("response").innerHTML = x.responseText;
            }
            x.send(null);
        }

        function showOutComing(){

            document.getElementById("message").innerHTML = getPeriod() + ' (Outcoming) ';
            var x = new XMLHttpRequest();
            x.open("GET", getHost("outcoming"), true);
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Outcoming) ';
                document.getElementById("response").innerHTML = x.responseText;
            }
            x.send(null);
        }

        function showEmptyCalls(){

            document.getElementById("message").innerHTML = getPeriod() + ' (Empty calls) ';
            var x = new XMLHttpRequest();
            x.open("GET", getHost("emptycalls"), true);
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Empty calls) ';
                document.getElementById("response").innerHTML = x.responseText;
            }
            x.send(null);
        }
        function showFeedback(){
            var recordsByComId;
//            var host = "http://192.168.11.87:8085/shoptracker";
            var host = "http://192.168.10.132:8080/avito";
            document.getElementById("message").innerHTML = getPeriod() + ' (Feedback) ';
            var x = new XMLHttpRequest();
            x.open("GET", host+"/rest/call/feedback/get?tags=feedback|vas​", true);
            x.onload = function() {
                document.getElementById("message").innerHTML = getPeriod() + ' (Feedback) ';
                document.getElementById("response").innerHTML = x.responseText;
                 recordsByComId= JSON.parse(x.responseText).records;
                for(var i=0; i <recordsByComId.length; i++){
                    console.log(recordsByComId[i][0])
                }
            }
            x.send(null);
        }


        function getHost(variable){

            return 		"http://192.168.10.132:8080/avito/rest/stat/"+variable+"?from="+document.getElementById('from').value+
                    "&to="+document.getElementById('to').value;
        }

        function getPeriod(){
            return 		'Статистика за период с '+document.getElementById('from').value
                    + ' по '+
                    document.getElementById('to').value;
        }

    </script>
</head>

<body>

<form action="" method="get">
    <p><big>Выберите период:</big><br>
        с <input id="from" name="from" type="text" value="dd-mm-yyyy" pattern="^[\d]{2,2}-[\d]{2,2}-[\d]{4,4}$" aria-required="true" onfocus="this.select();lcs(this)"
                 onclick="event.cancelBubble=true;this.select();lcs(this)">
        по <input id="to" name ="to" type="text" value="dd-mm-yyyy" pattern="^[\d]{2,2}-[\d]{2,2}-[\d]{4,4}$" aria-required="true" onfocus="this.select();lcs(this)"
                  onclick="event.cancelBubble=true;this.select();lcs(this)">
    </p>
</form>


<button onclick="showManager()">Manager</button>
<button onclick="showCategory()">Category</button>
<button onclick="showUsers()">Useres</button>
<button onclick="showQuestions()">Questions</button>
<button onclick="showOutComing()">out. calls</button>
<button onclick="showEmptyCalls()">Empty calls</button>
<button onclick="showFeedback()">Feedback</button>


<div id="downloader_application">
    <h3>Please select your files</h3>
    <form action="#" id="download_form">
        <ul>
            <li>
                <label>
                    <input type="checkbox" data-url="/shoptracker/resources/js/downloader.js" checked />
                    downloader
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" data-url="/shoptracker/resources/js/navbar.js"  />
                    navbar
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" data-url="/shoptracker/resources/js/calendar.js" />
                    calendar
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" data-url="/shoptracker/resources/js/webSocket.js" />
                    webSocket
                </label>
            </li>
        </ul>

        <button type="submit" class="btn btn-primary">pack them !</button>
    </form>

    <div class="progress hide" id="progress_bar">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
        </div>
    </div>

    <p class="hide" id="result"></p>

</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/downloader.js"></script>

<p id="message"></p>
<p id="response"></p>


</body>
</html>