'use strict';
// var webSocketHost = "192.168.10.132:8080/avito";
var webSocketHost = "192.168.9.91:8080/avito";
var websocket;
var websocketUrl = "ws://"+webSocketHost+"/websocket/start";


startConnection();

function startConnection() {
    websocket = new WebSocket(websocketUrl);
    websocket.onopen = function () {
        document.getElementById("websocketStatus").innerHTML = "Online";
        console.log("Websocket connected");
        websocket.onmessage =function (webSocketMessage) {
            console.log(webSocketMessage.data)
        }
        websocket.send("ping");
    };
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

            case "Ok": console.log(webSocketMessage.data);
                break;
            case "Exist empty calls": console.log("empty calls"); showMyEmptyCalls();
                break;
            case "pong":
                setTimeout(
                    function () {
                        websocket.send("ping")
                    }, 1000);
                console.log("pong");
                break;
            default: console.log("before draw"); callback(JSON.parse(webSocketMessage.data));
                break;
        }
    }
}



function setWebSocketStatus(status) {
    document.getElementById("websocketStatus").innerHTML = status;
    document.getElementById("websocketStatus").style.color = "red";
}