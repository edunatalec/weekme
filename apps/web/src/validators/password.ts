import { z } from "zod";

export const passwordValidator = z
  .string({ message: "Obrigatório" })
  .min(8, "Precisa ter no mínimo 8 caracteres")
  .max(20, "Precisa ter no máximo 20 caracteres");
