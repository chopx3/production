
'use strict';


var websocket;
var websocketUrl = "ws://localhost:8085/websocket/start";



startConnection();

function startConnection() {
    websocket = new WebSocket(websocketUrl);
    websocket.onopen=function () {
        document.getElementById("websocketStatus").innerHTML = "Online";
    };
}

setInterval(function () {

        websocket.send("getMyEmptyCalls");
        websocket.onmessage = function (message) {
            console.log(message.data);
        }
        websocket.onclose = function () {
            document.getElementById("websocketStatus").innerHTML = "Offline";
        }

        websocket.onerror = function (err) {
            document.getElementById("websocketStatus").innerHTML = "Error. "+err;
    }

}, 10);
