const ViberBot = require('viber-bot').Bot,
    BotEvents = require('viber-bot').Events,
    TextMessage = require('viber-bot').Message.Text,
    express = require('express')
const app = express();

module.exports = {
    Keyboard: require(__dirname + '/keyboard-message')
};
if (!"4e7600646567e092-f49608b799d24b2e-57b664085c36ff76") {
    console.log('Could not find bot account token key.');
    return;
}
if (!"https://2d7e-212-1-76-102.ngrok.io") {
    console.log('Could not find exposing url');
    return;
}

const bot = new ViberBot({
    authToken: "4e7600646567e092-f49608b799d24b2e-57b664085c36ff76",
    name: "TestViberBot86",
    avatar: "https://hi-news.ru/wp-content/uploads/2014/09/291082_10150399764264169_32074004168_8065767_897175744_o1-750x563.jpg"
});
bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    response.send(new TextMessage(`Привет`));
});
const port = process.env.PORT || 3000;
app.use("/viber/webhook", bot.middleware());
app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${"https://2d7e-212-1-76-102.ngrok.io"}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});

