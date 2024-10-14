const { Telegraf } = require("telegraf");
const express = require("express");
const app = express();
app.use(express.json());

const web_link = "https://monkeycity.netlify.app";
const community_link = "https://t.me/monkeycity_community";

// Ambil token dari environment variable
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
    const startPayload = ctx.startPayload;
    const urlSent = ${web_link}?ref=${startPayload};
    const user = ctx.message.from;
    const userName = user.username ? @${user.username} : user.first_name;
    ctx.replyWithMarkdown(`*Hey, ${userName}! I am @monkey_city_bot, Welcome to Monkey!*
Mine Monkey cryptocurrency easily and earn Monkey tokens.

Start mining now and be among the biggest players earning Monkey tokens daily.

Got friends, relatives, co-workers?
Bring them all into the game.
More squad power, more Monkey tokens.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🕹️ Let'go!", web_app: { url: urlSent } }],
                [{ text: "Join Community", url: community_link }]
            ],
            in: true
        },
    });
});

bot.launch();

// Gunakan PORT dari environment Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Menangani sinyal untuk menghentikan bot dengan aman
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));