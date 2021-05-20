import axios from 'axios';

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
