import axios from 'axios';

import { config } from '../config';

const {
  twitter: { BEARER_TOKEN, URL_TWEETS_ELON },
} = config;

interface AvgPrice {
  min: number;
  price: string;
}

export const getCurrentPrice = async (
  abbreviation: string
): Promise<string | undefined> => {
  const symbol = `${abbreviation}USDT`;

  try {
    const res = await axios.get<AvgPrice>(
      'https://api3.binance.com/api/v3/avgPrice',
      { params: { symbol } }
    );

    if (res.status !== 400) {
      return res.data.price;
    }

    return undefined;
  } catch (e) {
    return e.message;
  }
};

interface TweetElonData {
  id: number;
  text: string;
}

interface TweetsElonData {
  data: TweetElonData[];
}

export const tweetElon = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<TweetsElonData>(URL_TWEETS_ELON, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
