import QuizLaunchAdapter from "./MessageAdapter/QuizLaunchAdapter.js";
import MessageHandler from "./MessageHandler.js";
import QuizAnwswerAdpater from "./MessageAdapter/QuizAnswerAdapter.js";
import { Client } from "tmi.js";

/**
 * Class MessageHandlerFactory
 *
 * @author GRem
 */
export default class MessageHandlerFactory
{
    /**
     * @param {Client} client
     * @returns  {MessageHandler}
     */
    static create(client)
    {
        let adapters = [];
        adapters.push(new QuizLaunchAdapter());
        adapters.push(new QuizAnwswerAdpater());

        return new MessageHandler(adapters, client);
    }
}