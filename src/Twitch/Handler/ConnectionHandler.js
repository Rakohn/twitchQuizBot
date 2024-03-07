/**
 * Class ConnectionHandler
 *
 * @author GRem
 */
export default class ConnectionHandler
{
    /**
     * @param {string} address
     * @param {string} port
     */
    static onConnectedEvent(address, port)
    {
        console.log(address, port);
        console.log("Youhou ça marche !");
    }
}