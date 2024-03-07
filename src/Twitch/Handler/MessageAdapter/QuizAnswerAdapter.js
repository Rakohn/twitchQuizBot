import { Client } from "tmi.js";
import Quiz from "../../Quiz.js";

/**
 * Class QuizAnwswerAdpater
 *
 * @author GRem
 */
export default class QuizAnwswerAdpater
{
    /**
     * @param {object} context
     * @param {string} message
     *
     * @returns {boolean}
     */
    support(context, message)
    {
        return Quiz.isInProgress()
            && message.trim().match(/^!\d+$/) !== null;
    }

    /**
     * @param {string} target
     * @param {object} context
     * @param {string} message
     * @param {Client} client
     *
     * @returns {void}
     */
    handle(target, context, message, client)
    {
        if (Quiz.hasAlreadyPlayed(context.username)) {
            return;
        }

        Quiz.addPlayer(username);

        if (Quiz.question.expectedAnswerPrefix === parseInt(message.substring(1))) {
            Quiz.addWinner(context.username);
        }
    }
}