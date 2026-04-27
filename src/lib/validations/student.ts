import { z } from 'zod';

export const studentStep1Schema = z
  .object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((v) => v === true, 'Aceite os termos para continuar'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

export const studentStep2Schema = z.object({
  fullName: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  phone: z.string().optional(),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().min(2, 'Estado obrigatório'),
  bio: z.string().max(280, 'Bio deve ter no máximo 280 caracteres').optional(),
});

export const studentStep3Schema = z.object({
  institutionId: z.string().min(1, 'Selecione a instituição'),
  courseId: z.string().min(1, 'Selecione o curso'),
  currentSemester: z.number().min(1).max(12),
  enrollmentPeriod: z.enum(['MORNING', 'AFTERNOON', 'NIGHT', 'ONLINE']),
  enrollmentYear: z.number().min(2010).max(new Date().getFullYear()),
  enrollmentMonth: z.number().min(1).max(12),
});

export const studentStep4Schema = z.object({
  linkedinUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  githubUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  portfolioUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

export type StudentStep1 = z.infer<typeof studentStep1Schema>;
export type StudentStep2 = z.infer<typeof studentStep2Schema>;
export type StudentStep3 = z.infer<typeof studentStep3Schema>;
export type StudentStep4 = z.infer<typeof studentStep4Schema>;
