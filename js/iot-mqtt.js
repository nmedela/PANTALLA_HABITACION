var clientId = "ws" + Math.random()

// Create a client instance
client = new Paho.MQTT.Client("192.168.100.99", 9001, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connectOptions = { onFailure: onFailures }
// connect the client
client.connect({ onSuccess: onConnect });


// called when the client connects
console.log("try to connect")
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Conectado mqtt-WebSocket");

  client.subscribe("sound/status");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

function pubVolInc() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "volume_inc" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}
function pubVolDec() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "volume_dec" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function handleLightPower(){
  elementSound = document.getElementById("light_power")
  if(elementSound.classList.contains('off')){
    pubLightOn()
  }else{
    pubLightOff()
  }
}

function handleSoundPower(){
  elementSound = document.getElementById("sound_power")
  if(elementSound.classList.contains('off')){
    pubSoundOn()
  }else{
    pubSoundOff()
  }
}

function handleMute(){
  console.log("pasa mute")
  elementSound = document.getElementById("sound_mute")
  if(elementSound.classList.contains('pressed')){
    pubMuteOn()
  }else{
    pubMuteOff()
  }
}

function pubLightOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "power_on" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}

function pubLightOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "power_off" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}

function pubSoundOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "power_on" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubSoundOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "power_off" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubMuteOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "mute_on" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubMuteOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "mute_off" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubLightOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "power_on" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}
function pubLightOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", value: "power_off" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
    window.location.reload()
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName + " - " + message.payloadString);
  if (message.destinationName == "sound/status") {
    statusSound = JSON.parse(message.payloadString)
    document.getElementById("vol_status").textContent = statusSound.volume
    if (statusSound.active) {
      elementSound = document.getElementById("sound_power")
      elementSound.classList.remove('off');
      elementSound.className += "on";
    } else {
      elementSound = document.getElementById("sound_power")
      elementSound.classList.remove('on');
      elementSound.className += "off";
    }

    if(statusSound.mute){
      elementSoundMute = document.getElementById("sound_mute")
      elementSoundMute.classList.remove('pressed');
    }else{
      elementSoundMute = document.getElementById("sound_mute")
      elementSound.className += "pressed";

    }
  }
}
function onFailures() {
  console.log("connectionOption.onFailure:");
  window.location.reload()
}