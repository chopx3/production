'use strict';
// var webSocketHost = "192.168.10.132:8080";
var webSocketHost = "192.168.11.87:8085";
var websocket;
var websocketUrl = "ws://"+webSocketHost+"/shoptracker/websocket/start";


startConnection();

function startConnection() {
    websocket = new WebSocket(websocketUrl);
    websocket.onopen = function () {
        document.getElementById("websocketStatus").innerHTML = "Online";
        console.log("Websocket connected");
        websocket.onmessage =function (webSocketMessage) {
            console.log(webSocketMessage.data)
        }
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
            case "Exist empty calls": showMyEmptyCalls();
                break;
            case "pong":
                setTimeout(
                    function () {
                        websocket.send("ping")
                    }, 1000);
                console.log("pong");
                break;
            default: callback(JSON.parse(webSocketMessage.data));
                break;
        }
    }
}



function setWebSocketStatus(status) {
    document.getElementById("websocketStatus").innerHTML = status;
    document.getElementById("websocketStatus").style.color = "red";
}