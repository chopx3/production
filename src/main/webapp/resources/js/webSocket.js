'use strict';
var webSocketHost = location.host+'/firecatcher';
var websocket;
var websocketUrl = "ws://"+webSocketHost+"/websocket/start";
var wsCount = 0;
startConnection();
function startConnection() {
    websocket = new WebSocket(websocketUrl);
        websocket.onopen = function () {
            online();
        }
}
function sendWebSocketMessage(message){
    if(websocket.readyState === 1){
    websocket.send(message);
        wsCount=0
    } else {
        console.log("connect to websocket...")
        setTimeout(function () {
                sendWebSocketMessage(message)
        }, 1000);
    }
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
                online();
                websocket.send("ping");
                break;
            case "Exist empty calls": 
			dayOrEmpty = "empty";
			showMyEmptyCalls();
			console.log("getWebsocketMessage");
                break;
            case "pong":
                online();
                break;
            default:
                callback(JSON.parse(webSocketMessage.data));
				console.log("getWebsocketMessage empty");
                console.log(JSON.parse(webSocketMessage.data));
                break;
        }
    }
}
function online() {
		document.getElementById("websocketStatus").innerHTML = '<i class ="fa fa-power-off fa-fw"></i>' + "Online";
		document.getElementById("websocketStatus").style.fontSize = "16px";
            console.log("ok")
		}
function setWebSocketStatus(status) {
    document.getElementById("websocketStatus").innerHTML = '<i class ="fa fa-power-off fa-fw"></i>' + status;
    document.getElementById("websocketStatus").style.color = "red";
	document.getElementById("websocketStatus").style.fontSize = "20px";
}