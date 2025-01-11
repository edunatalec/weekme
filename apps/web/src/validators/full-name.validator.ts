import { z } from "zod";

export const fullNameValidator = z.string({ message: "Obrigatório" }).refine(
  (value) => {
    const words = value.trim().split(/\s+/);

    const hasTwoWords = words.length >= 2;

    return hasTwoWords && words.every((word) => word.length >= 3);
  },
  {
    message:
      "Precisa ter no mínimo duas palavras, e cada palavra deve ter pelo menos 3 caracteres",
  },
);
