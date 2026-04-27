import type { StudentPlan, AccountStatus } from '@prisma/client';

export function calculateAccountExpiry(
  enrollmentYear: number,
  enrollmentMonth: number,
  courseDurationMonths: number
): Date {
  const enrollmentDate = new Date(enrollmentYear, enrollmentMonth - 1, 1);
  const expiryDate = new Date(enrollmentDate);
  expiryDate.setMonth(expiryDate.getMonth() + courseDurationMonths);
  return expiryDate;
}

export function getAccountStatus(expiresAt: Date, plan: StudentPlan): AccountStatus {
  const now = new Date();
  const daysUntilExpiry = Math.floor(
    (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (plan !== 'FREE') return 'ALUMNI';
  if (daysUntilExpiry < 0) return 'EXPIRED';
  if (daysUntilExpiry <= 60) return 'EXPIRING_SOON';
  return 'ACTIVE';
}

export function getTimeRemainingText(expiresAt: Date): string {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  if (diff < 0) return 'Conta expirada';

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0)
    return `${years} ano${years > 1 ? 's' : ''} e ${remainingMonths} mês${remainingMonths > 1 ? 'es' : ''} restantes`;
  if (years > 0)
    return `${years} ano${years > 1 ? 's' : ''} restante${years > 1 ? 's' : ''}`;
  return `${months} mês${months > 1 ? 'es' : ''} restante${months > 1 ? 's' : ''}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}
