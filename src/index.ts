import express, { Request, Response } from 'express';
import { Telegraf } from 'telegraf';

import { config } from './config';
import { getCurrentPrice, tweetElon } from './api';
import { getAbbreviation } from './utils/getAbbreviation';

require('newrelic');

const {
  telegram: { BOT_TOKEN },
} = config;

if (BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Te doy la bienvenida ${ctx.message.from.first_name}`);
});

bot.help((ctx) => {
  ctx.reply(
    'Robin Crypto Manual 🏹 \n\n - /crypto - Give the current price of the crypto you enter. Example: /crypto BTC'
  );
});

bot.command('crypto', async (ctx) => {
  const abbvs = getAbbreviation(ctx.message.text);
  const price = await getCurrentPrice(abbvs);

  if (price) {
    ctx.reply(`${abbvs}: ${price} 💸`);
  } else {
    ctx.reply('Esa abreviación no existe 😳');
  }
});

bot.command('elon', async (ctx) => {
  const data = await tweetElon();
  const { text } = data[0];
  ctx.reply(`Este es el último Tweet de Elon Musk 🚀 \n\n ${text}`);
});

if (process.env.NODE_ENV === 'production') {
  bot.telegram.setWebhook(
    'https://crypto-bot-telegram.herokuapp.com/secret-path'
  );

  const app = express();

  app.get('/', (_req: Request, res: Response) => {
    console.log('Endpoint was hitted');
    res.send('This is the telegram crypto bot App');
  });

  // Set the bot API endpoint
  app.use(bot.webhookCallback('/secret-path'));

  app.listen(process.env.PORT || 3000, () => {
    console.log('App is running!');
  });
} else if (process.env.NODE_ENV === 'development') {
  bot.launch();
}
