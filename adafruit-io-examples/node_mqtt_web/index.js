var express = require('express');
var app = express(); 
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;
const request = require('request'); //npm install --save request

app.use(express.static(__dirname+"/public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');

    
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  request('https://io.adafruit.com/api/v2/sugrueca/feeds/default.emoji/data', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    io.emit('prevData', body);  
    });
});

http.listen(port, function(){
  console.log('Listening on *:'+port);
});


//-------- Adafruit + MQTT

var username = 'sugrueca';
var key = 'ed52791436c043e08fedaf7109a3b193';
var feed = 'happiness';
var feed2 = 'emoji';

//-------- request previous data




// include mqtt with feed we want to use
var mqtt = require('mqtt');
var client = mqtt.connect('mqtts://io.adafruit.com',{
  port: 8883,
  username: username,
  password: key
});

var my_topic_name = username + '/f/' + feed;
var my_topic_name2 = username + '/f/' + feed2;



//my_topic_name = username + '/f/' + feed;

// connect to adafruit io


// create event callback that triggers when receive new data
client.on('connect', () => {
  console.log('MQTT connect.');
  client.subscribe(my_topic_name);
  client.subscribe(my_topic_name2);
  client.subscribe(topic_all);
});

// if an error occurs 
client.on('error', (error) => {
    console.log('MQTT Client Errored');
    console.log(error);
});

// this is where data is received
client.on('message',  (topic, message) => {
  console.log(topic);
  if(topic == my_topic_name) {
    try{
      console.log(message.toString()); 
      io.emit('message', message.toString());    
    }catch(error){
      console.log(error);
    }
  } 
  else if(topic == my_topic_name2) {
    try{
      console.log(message.toString()); 
      io.emit('message2', message.toString());
    }catch(error){
      console.log(error);
    }
  } 
  

});