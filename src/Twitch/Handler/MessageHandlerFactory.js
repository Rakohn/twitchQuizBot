import QuizLaunchAdapter from "./MessageAdapter/QuizLaunchAdapter.js";
import MessageHandler from "./MessageHandler.js";

/**
 * Class MessageHandlerFactory
 *
 * @author GRem
 */
export default class MessageHandlerFactory
{
    static create()
    {
        let adapters = [];
        adapters.push(new QuizLaunchAdapter());

        return new MessageHandler(adapters);
    }
}