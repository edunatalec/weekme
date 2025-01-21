export const encodeStringToBase64 = (data: string): string => {
  return Buffer.from(data, 'utf-8').toString('base64');
};

export const decodeBase64ToString = (data: string): string => {
  return Buffer.from(data, 'base64').toString('utf-8');
};
