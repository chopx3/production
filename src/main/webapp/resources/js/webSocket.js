
'use strict';

var webSocketHost = "192.168.10.132:8080";
var websocket;
var websocketUrl = "ws://"+webSocketHost+"/shoptracker/websocket/start";


startConnection();


function startConnection() {
    websocket = new WebSocket(websocketUrl);
    websocket.onopen = function () {
        document.getElementById("websocketStatus").innerHTML = "Online";
        console.log("Websocket connected in WS script");
    };
}

websocket.onclose = function () {
    setWebSocketStatus("Offline");
}

websocket.onerror = function (err) {
    setWebSocketStatus("Error");
    console.log(err);
}

function closeConnection () {
    websocket.onclose = function () {
        console.log("websocket close in WS script");
        setWebSocketStatus("Offline");
    };

}

function setWebSocketStatus(status) {
    document.getElementById("websocketStatus").innerHTML = status;
    document.getElementById("websocketStatus").style.color = "red";
}