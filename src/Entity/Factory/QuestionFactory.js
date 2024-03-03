import Answer from "../Answer.js";
import Question from "../Question.js";

export default class QuestionFactory
{
    /**
     *
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
        console.log(question);return;
    }
}