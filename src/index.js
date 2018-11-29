const NodeSDK = require("rainbow-node-sdk");
const rainbowConfig = require("./rainbowConfig.json");
const LOG_ID = '[IDS-DRONE-RAINBOW] - ';

const PORT = 8889;
const HOST = '192.168.10.1';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');


client.bind(8001);
client.on('message', (msg) => {
    console.log(LOG_ID + 'Data received from Spider-Drone : ' + msg.toString());
});

const sendCommand = (command)=>{
    console.info(LOG_ID + 'sending command -> ' + command);
    return new Promise((resolve, reject)=>{
        let commandStr = new Buffer(command);
        client.send(commandStr, 0, commandStr.length, PORT, HOST, function(err) {
            if (err) {
                console.error(LOG_ID + 'Error on ' + command + ' ' + err);
                reject(err);
            } else {
                console.info(LOG_ID + 'Success ' + command);
                resolve();
            }
        });
    });
};

let nodeSDK = new NodeSDK(rainbowConfig);
const sendAnswer = (answer, message) => {
    if (message.type === "chat") {
        // noinspection JSIgnoredPromiseFromCall
        nodeSDK.im.sendMessageToJid(answer, message.fromJid);
    } else if (message.type === "groupchat") {
        // noinspection JSIgnoredPromiseFromCall
        nodeSDK.im.sendMessageToBubbleJid(answer, message.fromBubbleJid);
    }
};

const filterBubbleCommand = (msg) => {
    msg = msg.toLowerCase();
    switch (msg) {
        case 'rest spider': return 'land';
        case 'go spider': return 'takeoff';
        case 'go forward': return 'forward 100';
        case 'go back': return 'back 100';
        case 'go left': return 'left 100';
        case 'go right': return 'right 100';
        case 'go up': return 'up 60';
        case 'go down': return 'down 100';
        case 'turn back': return 'cw 180';
        case 'turn right': return 'cw 90';
        case 'turn left': return 'ccw 90';
        case 'flip': return 'flip f';
        case 'web': return 'flip b';
        case '360': return 'ccw 360';
        default: return '';
    }
};

const HELP_MSG = `
         - hi spider
         - go spider
         - go forward
         - go back
         - go left
         - go right
         - go up
         - go down
         - turn back
         - turn right
         - turn left
         - flip
         - web
         - 360
         - rest spider
`;


const filterCommand = (msg) => {
    msg = filterBubbleCommand(msg) || msg;
    switch (msg) {
        case 'p': return 'land';
        case 'w': return 'forward 100';
        case 'ww': return 'forward 200';
        case 's': return 'back 100';
        case 'ss': return 'cw 180';
        case 'a': return 'left 100';
        case 'd': return 'right 100';
        case 'q': return 'ccw 90';
        case 'e': return 'cw 90';
        case 'W': return 'up 60';
        case 'S': return 'down 100';
        case 'SS': return 'down 200';
        case 'f': return 'flip f';
        case 'F': return 'flip b';
        case '/': return 'stop';
        case ';': return 'stop';
        case '.': return 'stop';
        default: return msg;
    }
};


let isFreeToGo = false;
let MASTER_ID = null;

nodeSDK.events.on('rainbow_onmessagereceived', (message) => {
    if(message.cc){
        return console.debug(LOG_ID + 'skipping own message');
    }
    nodeSDK.im.markMessageAsRead(message);
    console.info(LOG_ID + `message received from user ${message.fromJid} on bubble ${message.fromBubbleJid}`);
    console.info(LOG_ID + message.content);

    if(message.content.toLowerCase() === 'help spider'){
        return sendAnswer(HELP_MSG, message);
    }
    if(message.content.toLowerCase() === 'i am your master' && !MASTER_ID) {
        MASTER_ID = message.fromJid;
        return sendAnswer("OK, you are my master.", message);
    } else if(message.content.toLowerCase() === 'i am your master'){
        return sendAnswer("I already have a master!", message);
    }

    if(message.fromJid === MASTER_ID){
        let command = filterCommand(message.content);
        isFreeToGo = command !== 'stop' && command !== 'free' ? isFreeToGo : command === 'free';
        if(command === 'stop' || command === 'free') return;
        return sendCommand(command).then(() => {
            sendAnswer("OK - " + command, message);
        });
    }
    if(message.content.toLowerCase().indexOf("spider") > -1 && !isFreeToGo){
        return sendAnswer("I am taking a nap, call me later.", message);
    }
    if(message.content.toLowerCase() === "hi spider" > -1 && isFreeToGo){
        return sendAnswer("Don't be afraid, the Spider has arrived!", message);
    }
    let command = filterBubbleCommand(message.content);
    if(!command){
        return;
    }
    if(!isFreeToGo){
        return sendAnswer("I am taking a nap, call me later.", message);
    }
    if(command === 'takeoff'){
        console.log(LOG_ID + 'go spider');
        return sendCommand('takeoff').then(() => {
            sendAnswer("With great power comes great responsibility!!", message);
        });
    }
    if(command === 'land'){
        console.log(LOG_ID + 'land');
        return sendCommand('land').then(() => {
            sendAnswer("Courtesy of your friendly neighborhood Spider-Drone!!", message);
        });
    }

    return sendCommand(command).then(() => {
        sendAnswer(`My spider sense is tingling! [${message.content}]`, message);
    });
});

nodeSDK.start().then(() => {
    console.info(LOG_ID + "SDK started");
    sendCommand('command').then(() => {
        isFreeToGo = true;
    });
}).catch((err) => {
    console.error("error", LOG_ID + "SDK start fail");
    console.error("error", err);
});
