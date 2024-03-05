import { Client } from "tmi.js";
import Quiz from "../Twitch/Quiz.js";

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

    onTimeout()
    {
        Quiz.end();

        let message = "C'est fini !\n" +
            "La bonne réponse était : " +
            Quiz.question.answers[Quiz.question.expectedAnswerPrefix - 1].propose + ".\n";

        if (!Quiz.hasWinner()) {
            message += "Personne n'a trouvé la bonne réponse";
        } else {
            Quiz.winners.forEach((user, index) => {
                message += (index + 1) + user + "\n\nBravo !";
            });
        }

        Quiz.reset();

        this.client.say(this.target, message)
    }
}