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
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "set_input" }));
  message.destinationName = "sound/action";
  client.send(message);
  elementConnection = document.getElementById("connection")
  elementConnection.classList.add('connected')
}

function pubVolInc() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "volume_inc" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}
function pubVolDec() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "volume_dec" }));
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
    console.log("contiene pressed")
    pubMuteOff()
  }else{
    pubMuteOn()
  }
}

function handleLightDimmer(value){
  console.log("se apreto dimmer " + value)
  pubScene(value)
}

function pubLightOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "power_on" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}

function pubLightOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "power_off" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}

function pubScene(value) {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "scene_" + value }));
  message.destinationName = "light/action";
  message.qos = 0;
  client.send(message);
}

function pubSoundOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "power_on" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubSoundOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "power_off" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubMuteOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "mute_on" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubMuteOff() {
  console.log("entra al off")
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "mute_off" }));
  message.destinationName = "sound/action";
  message.qos = 0;

  client.send(message);
}

function pubLightOn() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "power_on" }));
  message.destinationName = "light/action";
  message.qos = 0;

  client.send(message);
}
function pubLightOff() {
  var message = new Paho.MQTT.Message(JSON.stringify({ type: "action", command: "power_off" }));
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
    document.getElementById("vol_status").textContent = 47 + statusSound.volume
    if (statusSound.active) {
      elementSound = document.getElementById("sound_power")
      elementSound.classList.remove('off');
      elementSound.classList.add("on");
    } else {
      elementSound = document.getElementById("sound_power")
      elementSound.classList.remove('on');
      elementSound.classList.add("off");
    }

    if(statusSound.mute){
      elementSoundMute = document.getElementById("sound_mute")
      elementSoundMute.classList.add('pressed');
    }else{
      console.log("mute está en off debería apagarse")
      elementSoundMute = document.getElementById("sound_mute")
      elementSoundMute.classList.remove('pressed');

    }
  }
  console.log("arrive message ", message)
  if (message.destinationName == "light/status") {
    statusLight = JSON.parse(message.payloadString)
    if (statusSound.active) {
      statusLight = document.getElementById("light_power")
      statusLight.classList.remove('off');
      statusLight.classList.add("on");
    } else {
      statusLight = document.getElementById("light_power")
      statusLight.classList.remove('on');
      statusLight.classList.add("off");
    }

  }
}
function onFailures() {
  console.log("connectionOption.onFailure:");
  window.location.reload()
}