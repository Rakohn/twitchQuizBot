export default class QuizLaunchAdapter
{
    support(context, message)
    {
        return context.username === 'gremlive' && message.trim() === '!quiz';
    }
}