import tmi from 'tmi.js';
import MessageHandler from './src/Twitch/Handler/MessageHandler.js';
import MessageHandlerFactory from './src/Twitch/Handler/MessageHandlerFactory.js';
import ConnectionHandler from './src/Twitch/Handler/ConnectionHandler.js';

const twitchOptions = {
    identity: {
        username: process.env.BOT_NAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL
    ]
};

const client = new tmi.client(twitchOptions);
const messageHandler = MessageHandlerFactory.create(client);

client.on('message', messageHandler.onMessage.bind(messageHandler));
client.on('connected', ConnectionHandler.onConnectedEvent);
client.connect();