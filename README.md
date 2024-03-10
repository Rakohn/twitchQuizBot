# Twitch Quiz Bot
This app provide a Twitch chat bot, proposing a quiz game with chat command line. Support English and French languages

## Requierments
* A Twitch developer account. [Create your developper account](https://dev.twitch.tv/)
* NodeJS 20+
* NPM 10+
* MySQL 8+

## Installation
Clone this repository.

Via HTTP:
```console
git clone https://github.com/Rakohn/twitchQuizBot.git
```
Via SSH:
```console
git clone git@github.com:Rakohn/twitchQuizBot.git
```
Install depedencies:
```console
npm install
```
Register a twitch application. [Tutorial is here](https://dev.twitch.tv/docs/authentication/register-app/)

Create authentication token. [Tutorial is here](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow)

Create your envrionment file from the .env file:
```console
# Twitch Bot
TWITCH_OAUTH_TOKEN=[twitch athentication token]
TWITCH_REFRESH_TOKEN=[twith refresh token]
TWITCH_OAUTH_API_URL=https://id.twitch.tv/oauth2/token
BOT_NAME=[twitch account name]
CHANNEL=[your twitch channel name]
CLIENT_ID=[you twitch registered application client ID]
CLIENT_SECRET=[your twitch registered application client secret]
AUTHORIZED_USER=[twitch username allowed to launch a new quiz]

# Database
DB_USERNAME=[MySQL user's login]
DB_PASSWORD=[MySQL user's password]
DB_HOST=[mysql host address]
DB_NAME=[the database name]

#Internalization
APP_LANGUAGE=[en/fr depending your language]
APP_FALLBACK_LANGUAGE=fr [this app is french first developped, so chose french as fallback language in case of missing translation entry]
```

Create your database and create tables. SQL Script available in install.sql file located in the project's root folder.

## Launch the app localy
Require nodemon to be installed in your environment
```console
npm run start
```

## How to use
When app is launched, just tape !quizz in the chatroom. It will display a random quiz load from the database and set it as submitted. Quiz set as submitted won't be played anymore.

To participate, players have to write a message in the chatroom, giving the answer number. For example : "!4". The exclamation point is mandatory. Players have 20 seconds to answer. After 20 seconds, the quiz end, the answer is displayed in chat room, followed by the winners list. Players can answer just once. The app won't check any other answer from them if they have already played.

## Futur improvement
- Add routes to handle tokens
- Check user status (has subscribed, has followed)
- Players permission (limit to follower/subsciber)