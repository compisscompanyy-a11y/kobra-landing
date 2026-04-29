import { z } from "zod";

/**
 * Schema for the public contact form payload.
 * Mirrors the fields rendered by components/ui/ContactForm.tsx.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(120, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Email no válido."),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  product: z
    .string()
    .trim()
    .min(1, "Selecciona un servicio.")
    .max(120),
  message: z
    .string()
    .trim()
    .max(5000, "Mensaje demasiado largo.")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot field. Real users leave it blank; bots fill it.
   * Server treats any non-empty value as spam and silently 200s.
   */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
