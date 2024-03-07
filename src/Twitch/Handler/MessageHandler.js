import { Client } from "tmi.js";

/**
 * Class MessageHandler
 *
 * @author GRem
 */
export default class MessageHandler
{
    /**
     * @param {Iterable} adapters
     * @param {Client} client
     */
    constructor(adapters, client)
    {
        this.adapters = adapters;
        this.client = client;
    }

    /**
     * @param {string} target
     * @param {object} context
     * @param {string} message
     * @param {boolean} self
     * @returns {void}
     */
    onMessage(target, context, message, self)
    {
        if (self) {
            return;
        }

        for (const adapter of this.adapters) {
            if (adapter.support(context, message)) {
                adapter.handle(target, context, message, this.client);
            }
        }
    }
}