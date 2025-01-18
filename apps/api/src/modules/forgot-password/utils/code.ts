export const generateCode = (): string => {
  const code = Math.floor(Math.random() * 1_000_000);

  return code.toString().padStart(6, '0');
};
