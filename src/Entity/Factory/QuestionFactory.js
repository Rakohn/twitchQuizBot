import Answer from "../Answer.js";
import NoAnswerError from "../Error/NoAnswerError.js";
import Question from "../Question.js";

/**
 * Class QuestionFactory
 *
 * @author GRem
 */
export default class QuestionFactory
{
    /**
     * @param {Array} data
     */
    static create(data)
    {
        const question = new Question();
        const firstElement = data.shift();

        question.id = firstElement.id;
        question.content = firstElement.content;
        question.answerPrecision = firstElement.answer_precision;

        data.unshift(firstElement);

        for (const element of data) {
            const answer = new Answer();
            answer.answerPrefix = element.answer_prefix;
            answer.propose = element.propose;

            question.answers.push(answer);

            if (element.is_answer == 1) {
                question.expectedAnswerPrefix = element.answer_prefix;
            }
        }

        if (undefined === question.expectedAnswerPrefix) {
            throw new NoAnswerError('No answer binded to the question : ' + question.id);
        }

        return question;
    }
}