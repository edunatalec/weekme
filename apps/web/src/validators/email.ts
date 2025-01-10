import { z } from "zod";

export const emailValidator = z
  .string({ message: "Obrigatório" })
  .email("E-mail inválido");
