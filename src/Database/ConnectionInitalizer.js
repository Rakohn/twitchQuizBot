import mysql from 'mysql2/promise';
import ConnectionError from './Error/ConnectionError.js';

/**
 * ConnectionInitializer
 *
 * @author Grem
 */
export default class ConnectionInitializer
{
    /** @type {import('mysql2').Connection} */
    static connection = null;

    /**
     * @returns {void}
     */
    static async initialize()
    {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                database: process.env.DB_NAME,
                namedPlaceholders: true
            });
        } catch (error) {
            throw new ConnectionError(error.message, error);
        }
    }

    /**
     * @returns {import('mysql2').Connection}
     */
    static async getConnection()
    {
        if (this.connection === null) {
            await this.initialize();
        }

        return this.connection;
    }
}