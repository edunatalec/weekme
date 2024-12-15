export const postApi = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
  return `${baseUrl}${endpoint}`;
};
