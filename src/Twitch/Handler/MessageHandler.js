export default class MessageHandler
{
    /**
     * @param {Iterable} adapters
     */
    constructor(adapters, client)
    {
        this.adapters = adapters;
        this.client = client;
    }

    /**
     *
     * @param {string} target
     * @param {object} context
     * @param {string} message
     * @param {boolean} self
     * @returns
     */
    onMessage(target, context, message, self)
    {
        if (self) {
            return;
        }

        for (const adapter of this.adapters) {
            if (adapter.support(context, message)) {
                adapter.handle(target, context, message, client);
            }
        }
    }
}