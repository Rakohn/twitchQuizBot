import { Client } from "tmi.js";
import Quiz from "../Twitch/Quiz.js";
import getText from "../Service/Utils.js";

/**
 * Class QuizEndEvent
 *
 * @author GRem
 */
export default class QuizEndEvent
{
    /**
     * @param {string} target
     * @param {Client} client
     */
    constructor(target, client)
    {
        this.target = target;
        this.client = client;
    }

    /**
     * @returns {void}
     */
    onTimeout()
    {
        Quiz.end();

        this.client.say(this.target, getText.t("triviaEndAlert"));
        this.client.say(
            this.target,
            getText.t("rightAnswerAlert") + Quiz.question.answers[Quiz.question.expectedAnswerPrefix - 1].propose
        );

        if (Quiz.question.answerPrecision) {
            this.client.say(this.target, Quiz.question.answerPrecision);
        }

        if (!Quiz.hasWinner()) {
            this.client.say(this.target, getText.t("noWinnerAlert"));
        } else {
            Quiz.winners.forEach((user, index) => {
                this.client.say(this.target, (index + 1) + " " + user);
            });

            this.client.say(this.target, getText.t('congrats'));
        }

        Quiz.reset();
    }
}