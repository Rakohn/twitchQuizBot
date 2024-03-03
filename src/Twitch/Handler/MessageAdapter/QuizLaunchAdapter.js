import QuizRepository from "../../../Database/Repository/QuizRepository.js";

/**
 * Class QuizLaunchAdapter
 *
 * @author GRem
 */
export default class QuizLaunchAdapter
{
    constructor()
    {
        this.repository = new QuizRepository();
    }

    support(context, message)
    {
        return context.username === 'gremlive' && message.trim() === '!quiz';
    }

    /**
     * @param {string} target
     * @param {object} context
     * @param {string} message
     * @param {import("tmi.js").Actions} client
     */
    handle(target, context, message, client)
    {
        this.repository.getRandomQuiz();
    }
}