'use strict';
// var webSocketHost = "192.168.10.132:8080/avito";
var webSocketHost = "192.168.9.207:8080/avito";
var websocket;
var websocketUrl = "ws://"+webSocketHost+"/websocket/start";


startConnection();

function startConnection() {
    websocket = new WebSocket(websocketUrl);
}

function sendWebSocketMessage(message){
    websocket.send(message)
}

websocket.onerror = function (err) {
    setWebSocketStatus("Error");
    console.log(err);
};

websocket.onclose = function () {
    setWebSocketStatus("Offline");
};

function getWebsocketMessage(callback){
    websocket.onmessage = function (webSocketMessage) {

        switch (webSocketMessage.data){

            case "ok":
                websocket.send("ping");
                break;
            case "Exist empty calls": showMyEmptyCalls();
                break;
            case "pong":
                online();
                break;
            default: callback(JSON.parse(webSocketMessage.data));
                break;
        }
    }
}



function online() {
		$("#websocketStatus").text("Online");
            console.log("ok")
		}

function setWebSocketStatus(status) {
    document.getElementById("websocketStatus").innerHTML = status;
    document.getElementById("websocketStatus").style.color = "red";
}