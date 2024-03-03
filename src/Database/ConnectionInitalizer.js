import mysql from 'mysql2/promise';
import ConnectionError from './Error/ConnectionError';

/**
 * ConnectionInitializer
 *
 * @author Grem
 */
export default class ConnectionInitializer
{
    static connection;

    static async initialize()
    {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                database: process.env.DB_NAME
            });
        } catch (error) {
            throw new ConnectionError(error.message, error);
        }
    }
}