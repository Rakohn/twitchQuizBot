import Question from "../Entity/Question.js";

export default class Quiz
{
    /** @type {Question}  */
    static question = null;
    /** @type {boolean} */
    static inProgress = false;
    /** @type {Array} */
    static winners = [];

    /**
     * @param {Question} question
     * @returns {void}
     */
    static start(question)
    {
        this.question = question;
        this.inProgress = true;
    }

    /**
     * @returns {void}
     */
    static end()
    {
        this.inProgress = false;
    }

    static reset()
    {
        this.question = null;
        this.inProgress = false;
        this.winners = [];
    }

    /**
     * @returns {boolean}
     */
    static isInProgress()
    {
        return this.inProgress && this.question !== null;
    }

    /**
     * @param {string} user
     * @returns {void}
     */
    static addWinner(user)
    {
        this.winners.push(user);
    }

    /**
     * @returns {boolean}
     */
    static hasWinner()
    {
        return this.winners.length > 0;
    }
}