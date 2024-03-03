import QuestionFactory from "../../Entity/Factory/QuestionFactory.js";
import ConnectionInitializer from "../ConnectionInitalizer.js";

export default class QuizRepository
{
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

        return QuestionFactory.create(result);
    }
}
