export default class MessageHandler
{
    /**
     * @param {Iterable} adapters
     */
    constructor(adapters)
    {
        this.adapters = adapters;
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

        for (const adapter in this.adapters) {
            if (adapter.support(context, message)) {
                adapter.handle(context, message);
            }
        }
    }
}