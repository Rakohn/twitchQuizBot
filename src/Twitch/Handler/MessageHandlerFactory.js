import QuizLaunchAdapter from "./MessageAdapter/QuizLaunchAdapter";
import MessageHandler from "./MessageHandler";

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