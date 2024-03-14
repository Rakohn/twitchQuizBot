import QuestionNotFoundError from "../../../Database/Repository/Error/QuestionNotFoundError.js";
import QuizRepository from "../../../Database/Repository/QuizRepository.js";
import NoAnswerError from "../../../Entity/Error/NoAnswerError.js";
import QuizEndEvent from "../../../Event/QuizEndEvent.js";
import getText, { sleep } from "../../../Service/Utils.js";
import Quiz from "../../Quiz.js";

/**
 * Class QuizLaunchAdapter
 *
 * @author GRem
 *
 * @todo Replace console.log by log file writing
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
            && message === '!quiz';
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

            client.say(target, getText.t('start'));
            client.say(target, getText.t('rulesAlert'));
            await sleep(3000);

            client.say(target, question.content);
            await sleep(3000);

            for (const answer of question.answers) {
                client.say(target, "!" + answer.answerPrefix + " " + answer.propose);
            }

            const endEvent = new QuizEndEvent(target, client);

            setTimeout(endEvent.onTimeout.bind(endEvent), 20000);

            try {
                this.repository.setQuizAsSubmitted(question.id);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            if (error instanceof QuestionNotFoundError) {
                message = getText.t("emptyTriviaStock");
            } else if (error instanceof NoAnswerError) {
                message = getText.t("triviaWithNoSetAnswer");
            } else {
                message = getText.t("triviaFetchError");
            }

            console.log(error);

            client.say(target, message);
        }
    }
}