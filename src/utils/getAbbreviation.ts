export const getAbbreviation = (msg: string): string => {
  const msgArray = msg.split(' ');
  msgArray.shift();
  return msgArray.join(' ').toUpperCase();
};
