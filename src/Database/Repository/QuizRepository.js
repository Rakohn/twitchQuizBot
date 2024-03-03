import ConnectionInitializer from "../ConnectionInitalizer.js";

export default class QuizRepository
{
    async getRandomQuiz()
    {
        let connection = await ConnectionInitializer.getConnection();
        let [result] = await connection.execute("SELECT * FROM question");

        return result;
    }
}