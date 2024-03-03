// import mysql from 'mysql2/promise';
// import tmi from 'tmi.js';

const tmiJs = require("tmi.js");

// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_NAME
// });

const options = {
    identity: {
        username: process.env.BOT_NAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL
    ]
};
console.log(options);
const client = new tmiJs.client(options);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(target, context, message, self) {
    if (self) {
        return;
    }

    console.log(context);

    const commandName = message.trim();

    if (commandName === '!dice') {
        setTimeout(() => {client.say(target, 'meuh')}, 5000);
        const num = rollDice();
        client.say(target, 'You roll a ' + num);
        console.log('dice rolled');
    } else {
        console.log('unkown command');
    }
}

function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

function onConnectedHandler (addr, port) {
    console.log('meu');
    console.log(addr, port);
    console.log(`* Connected to ${addr}:${port}`);
}