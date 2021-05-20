import './config';
import { Telegraf } from 'telegraf';

import { getCurrentPrice } from './api';
import { getAbbreviation } from './utils/getAbbreviation';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

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

bot.launch();
