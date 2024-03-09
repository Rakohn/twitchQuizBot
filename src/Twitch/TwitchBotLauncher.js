import tmi, { Client } from 'tmi.js';
import MessageHandlerFactory from './Handler/MessageHandlerFactory.js';
import ConnectionHandler from './Handler/ConnectionHandler.js';
import ExpiredRefreshTokenError from './Error/ExpiredRefreshTokenError.js';

/**
 * Class Twitch
 *
 * @author GRem
 */
export default class TwitchBotLauncher
{
    static options = {
        identity: {
            username: process.env.BOT_NAME,
            password: process.env.TWITCH_OAUTH_TOKEN
        },
        channels: [
            process.env.CHANNEL
        ]
    }

    static client = null;

    /**
     * Launch Twitch chat bot
     *
     * @returns {void}
     */
    static launch()
    {
        if (!this.client) {
            this.client = this.buildClient();
        }
    }

    /**
     * @returns {Client}
     */
    static getClient()
    {
        if (!this.client) {
            this.client = this.buildClient();
        }

        return this.client;
    }

    /**
     * @returns {void}
     */
    static buildClient()
    {
        const client = new tmi.client(this.options);
        const messageHandler = MessageHandlerFactory.create(client);

        client.on('message', messageHandler.onMessage.bind(messageHandler));
        client.on('connected', ConnectionHandler.onConnectedEvent);

        client.connect()
            .catch(error => {
                console.log('get refresh token');
                this.refreshAccessToken(client);
            });
    }

    /**
     * @param {Client} client
     */
    static refreshAccessToken(client)
    {
        const refreshAccessTokenOptions = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: process.env.TWITCH_REFRESH_TOKEN
        };

        const requestBody = {
            method: "POST",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(refreshAccessTokenOptions)
        };

        fetch(process.env.TWITCH_OAUTH_API_URL, requestBody)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                switch (response.status) {
                    case 401:
                        throw new ExpiredRefreshTokenError('Le refresh token est expiré');
                    default:
                        throw new Error("Une erreur inconnue est survenue pendant le rafraichissement de l'access token");
                }
            })
            .then(content => {
                process.env.TWITCH_OAUTH_TOKEN = 'oauth:' + content.access_token;
                client.getOptions().identity.password = process.env.TWITCH_OAUTH_TOKEN;

                client.connect()
                    .catch(error => {
                        console.log("Refresh token failed");
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            })
    }
}