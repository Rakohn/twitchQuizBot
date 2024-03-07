import QuestionFactory from "../../Entity/Factory/QuestionFactory.js";
import Question from "../../Entity/Question.js";
import ConnectionInitializer from "../ConnectionInitalizer.js";
import QuestionNotFoundError from "./Error/QuestionNotFoundError.js";

/**
 * Class QuizRepository
 *
 * @author GRem
 */
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
            "   ON q.id = a.question_id\n" +
            "ORDER BY a.answer_prefix"
        );

        if (!Array.isArray(result) || result.length === 0) {
            throw new QuestionNotFoundError("An error occurs in DB");
        }

        return QuestionFactory.create(result);
    }
}
