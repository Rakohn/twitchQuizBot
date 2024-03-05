import QuestionNotFoundError from "../../../Database/Repository/Error/QuestionNotFoundError.js";
import QuizRepository from "../../../Database/Repository/QuizRepository.js";
import NoAnswerError from "../../../Entity/Error/NoAnswerError.js";
import QuizEndEvent from "../../../Event/QuizEndEvent.js";
import Quiz from "../../Quiz.js";

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
    async handle(target, context, message, client)
    {
        try{
            const question = await this.repository.getRandomQuiz();

            Quiz.start(question);

            let message = question.content + "\n";
            question.answers.forEach(answer => {
                message += "!" + answer.answerPrefix + " " + answer.propose;
            });

            const endEvent = new QuizEndEvent(target, client);

            client.say(target, message);

            setTimeout(endEvent.onTimeout.bind(endEvent), 20000);
        } catch (error) {
            if (error instanceof QuestionNotFoundError) {
                message = "On a plus de question en stock patron !";
            } else if (error instanceof NoAnswerError) {
                message = "On a un léger problème, patron, qui requiert votre attention.";
            } else {
                message = "C'est le bordayle patron, rien ne va, annulez tout !";
                console.log(error);
            }

            client.say(target, message);
        }


    }
}