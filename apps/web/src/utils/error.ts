export const getErrorMessage = (error: any): string => {
  return error instanceof Error
    ? error.message
    : "Algo deu errado!. Por favor, tente novamente mais tarde.";
};
