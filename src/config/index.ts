import dotenv from 'dotenv';

dotenv.config();

export const config = {
  twitter: {
    BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
    URL_TWEETS_ELON: process.env.TWITTER_URL_TWEETS_ELON,
  },
  telegram: {
    BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  },
};
