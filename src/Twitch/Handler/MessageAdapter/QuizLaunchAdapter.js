import QuestionNotFoundError from "../../../Database/Repository/Error/QuestionNotFoundError.js";
import QuizRepository from "../../../Database/Repository/QuizRepository.js";
import NoAnswerError from "../../../Entity/Error/NoAnswerError.js";

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
        try{
            this.repository.getRandomQuiz();
        } catch (error) {
            if (error instanceof QuestionNotFoundError) {
                message = "On a plus de question en stock patron !";
            } else if (error instanceof NoAnswerError) {
                message = "On a un léger problème patron qui requiert votre attention.";
            } else {
                message = "C'est le bordayle patron, rien ne va annulez tout !";
            }

            client.say(target, message);
        }


    }
}