import tmi from 'tmi.js';
import MessageHandler from './src/Twitch/Handler/MessageHandler.js';
import MessageHandlerFactory from './src/Twitch/Handler/MessageHandlerFactory.js';

const twitchOptions = {
    identity: {
        username: process.env.BOT_NAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL
    ]
};

const messageHandler = MessageHandlerFactory.create();
console.log(messageHandler instanceof MessageHandler);
const client = new tmi.client(twitchOptions);

client.on('message', messageHandler.onMessage.bind(messageHandler));
client.on('connected', onConnectedHandler);

client.connect();

function onConnectedHandler (addr, port) {
    console.log(addr, port);
    console.log(`* Connected to ${addr}:${port}`);
}