import { z } from 'zod';

const FREE_DOMAINS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];

export const companyStep1Schema = z
  .object({
    email: z
      .string()
      .email('E-mail inválido')
      .refine((email) => {
        const domain = email.split('@')[1];
        return !FREE_DOMAINS.includes(domain);
      }, 'Use um e-mail corporativo (sem gmail, hotmail, etc.)'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
    cnpj: z
      .string()
      .min(14, 'CNPJ inválido')
      .max(18, 'CNPJ inválido'),
    acceptTerms: z.boolean().refine((v) => v === true, 'Aceite os termos para continuar'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

export const companyStep2Schema = z.object({
  companyName: z.string().min(2, 'Nome obrigatório'),
  sector: z.string().min(1, 'Setor obrigatório'),
  size: z.enum(['MICRO', 'SMALL', 'MEDIUM', 'LARGE']),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  linkedinUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().min(2, 'Estado obrigatório'),
  isRemoteFriendly: z.boolean().default(false),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

export const companyStep3Schema = z.object({
  contactName: z.string().min(2, 'Nome do responsável obrigatório'),
  contactRole: z.string().min(2, 'Cargo obrigatório'),
  contactPhone: z.string().optional(),
});

export type CompanyStep1 = z.infer<typeof companyStep1Schema>;
export type CompanyStep2 = z.infer<typeof companyStep2Schema>;
export type CompanyStep3 = z.infer<typeof companyStep3Schema>;
