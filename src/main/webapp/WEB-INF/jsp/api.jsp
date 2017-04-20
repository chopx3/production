<%@ page language="java" contentType="text/html; charset=windows-1251" pageEncoding="windows-1251"%>
<html>
<head>
    <title>GUI-stat</title>
    <meta charset ="windows-1251">
    <script src="${pageContext.request.contextPath}/resources/js/jquery-1.8.3.min.js" type=text/javascript"></script>


    <script>
        var json;

        function showManager(){
            var totalString ="";
            var marginBefore="";
            var marginAfter="";
            var currentString="";
            var x = new XMLHttpRequest();
            x.open("GET", getHost(), true);

            if (x.statusText !=200)
                document.getElementById("response").innerHTML = "Error";
            x.onload = function() {
                json = JSON.parse(x.responseText);

                for (var i=0; i<json.length; i++) {
                    marginBefore="";
                    marginAfter="";
                    currentString ="";
                    for (var j = 0; j < json[i].level; j++) {
                        marginBefore = marginBefore + "*";
                    }
                    for (var k = json[i].name.length; k < 50; k++) {
                        marginAfter = marginAfter + "_";
                    }
                    currentString = marginBefore+json[i].name+marginAfter+
                            "<button onclick='findItems(5)'>"+json[i].itemsCount+"</button>" +"<br>";

                    totalString = totalString + currentString;
                }
                document.getElementById("response").innerHTML = totalString;
            }


            x.send(null);
        }

        function getHost(){

            return 		'http://10.10.37.132/firecatcher/api/category/nested/find/map';
        }

        function findItems(id){
            var host=location.protocol+"//"+location.host+"/firecatcher";
            var api = "/api/product/find/category/id/";
            var x = new XMLHttpRequest();
            x.open("GET", host+api+id, true);

            if (x.statusText !=200)
                document.getElementById("response").innerHTML = "Error";
            x.onload = function() {
                console.log(x.responseText)
            }
        };

    </script>
</head>

<body>


<button onclick="showManager()">Manager</button>


<p id="response"></p>


</body>
</html>