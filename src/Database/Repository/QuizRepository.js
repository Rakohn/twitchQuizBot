import QuestionFactory from "../../Entity/Factory/QuestionFactory.js";
import Question from "../../Entity/Question.js";
import ConnectionInitializer from "../ConnectionInitalizer.js";
import QuestionNotFoundError from "./Error/QuestionNotFoundError.js";

export default class QuizRepository
{
    /**
     * @returns {Question}
     */
    async getRandomQuiz()
    {
        let connection = await ConnectionInitializer.getConnection();
        let [result] = await connection.execute(
            "WITH randomQuestion AS (SELECT * FROM question WHERE submit_at IS NULL ORDER BY RAND() LIMIT 1)" +
            "SELECT\n" +
            "   q.id,\n" +
            "   q.content,\n" +
            "   q.answer_precision,\n" +
            "   a.answer_prefix,\n" +
            "   a.is_answer,\n" +
            "   a.propose\n" +
            "FROM randomQuestion q\n" +
            "JOIN answer a\n" +
            "   ON q.id = a.question_id"
        );

        if (!result.isArray() || result.length === 0) {
            throw new QuestionNotFoundError("An error occurs in DB");
        }

        return QuestionFactory.create(result);
    }
}
