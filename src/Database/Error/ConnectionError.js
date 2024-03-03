/**
 * Class ConnectionError
 *
 * @author GRem
 */
export default class ConnectionError extends Error
{
    constructor(message, options)
    {
        super(message, options)
    }
}