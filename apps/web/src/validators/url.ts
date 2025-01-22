import { z } from "zod";

export const urlValidator = z
  .string({ message: "Obrigatório" })
  .url({ message: "Url inválida" });

export const optionalUrlValidator = z.preprocess(
  (value) => (value === "" ? null : value),
  urlValidator.optional().nullable(),
);
