export default class ConnectionHandler
{
    static onConnectedEvent(address, port)
    {
        console.log(address, port);
        console.log("Youhou ça marche !");
    }
}