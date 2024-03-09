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

    /**
     * @param {object} context
     * @param {string} message
     * @returns {boolean}
     */
    support(context, message)
    {
        return !Quiz.isInProgress()
            && context.username === process.env.AUTHORIZED_USER
            && message.trim() === '!quiz';
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

            client.say(target, question.content);
            question.answers.forEach(answer => {
                client.say(target, "!" + answer.answerPrefix + " " + answer.propose);
            });

            const endEvent = new QuizEndEvent(target, client);

            setTimeout(endEvent.onTimeout.bind(endEvent), 20000);

            try {
                this.repository.setQuizAsSubmitted(question.id);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            if (error instanceof QuestionNotFoundError) {
                message = "On a plus de question en stock patron !";
            } else if (error instanceof NoAnswerError) {
                message = "On a un léger problème, patron, qui requiert votre attention.";
            } else {
                message = "C'est le bordayle patron, rien ne va, annulez tout !";
            }

            console.log(error);

            client.say(target, message);
        }
    }
}