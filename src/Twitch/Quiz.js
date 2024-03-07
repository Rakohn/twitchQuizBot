import Question from "../Entity/Question.js";
/**
 * Class Quiz
 *
 * @author GRem
 */
export default class Quiz
{
    /** @type {Question}  */
    static question = null;
    /** @type {boolean} */
    static inProgress = false;
    /** @type {Array} */
    static winners = [];
    /** @type {Array} */
    static players = [];

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

    /**
     * @returns {void}
     */
    static reset()
    {
        this.question = null;
        this.inProgress = false;
        this.winners = [];
        this.players = [];
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

    /**
     * @param {string} username
     * @returns {boolean}
     */
    static hasAlreadyPlayed(username)
    {
        return this.players.includes(username);
    }

    /**
     * @param {string} username
     */
    static addPlayer(username)
    {
        this.players.push(username);
    }
}