import type { Student } from '@prisma/client';

type StudentWithRelations = Student & {
  experiences: { id: string }[];
};

export function rankCandidates(students: StudentWithRelations[]): StudentWithRelations[] {
  return [...students].sort((a, b) => {
    if (a.plan === 'ALUMNI_PRO' && b.plan !== 'ALUMNI_PRO') return -1;
    if (b.plan === 'ALUMNI_PRO' && a.plan !== 'ALUMNI_PRO') return 1;

    const aProgress = getProgressMonths(a);
    const bProgress = getProgressMonths(b);
    if (bProgress !== aProgress) return bProgress - aProgress;

    return b.experiences.length - a.experiences.length;
  });
}

function getProgressMonths(student: Student): number {
  const start = new Date(student.enrollmentYear, student.enrollmentMonth - 1, 1);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export function getCourseProgressPercent(student: Student, courseDurationMonths: number): number {
  const progressMonths = getProgressMonths(student);
  return Math.min(100, Math.round((progressMonths / courseDurationMonths) * 100));
}
