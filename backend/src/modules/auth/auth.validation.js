import { z } from "zod";

const registerSchema = z.object({

  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum([
  "USER",
  "ADMIN"
])

});

const loginSchema = z.object({

  email: z.email(),

  password: z.string().min(6),

});
 
export { registerSchema, loginSchema };