import { z } from "zod";

export const fullNameValidator = z.string({ message: "Obrigatório" }).refine(
  (value) => {
    const words = value.trim().split(/\s+/);

    const hasTwoWords = words.length >= 2;

    return hasTwoWords && words.some((word) => word.length >= 3);
  },
  {
    message:
      "O texto deve conter pelo menos duas palavras, sendo que uma delas deve ter no mínimo três caracteres.",
  },
);
