import { z } from "zod";

export const urlValidator = z.string({ message: "Obrigatório" }).url();
