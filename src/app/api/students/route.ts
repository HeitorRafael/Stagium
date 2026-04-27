import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { calculateAccountExpiry } from '@/lib/utils/dates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email, password, fullName, phone, city, state, bio,
      institutionId, courseId, currentSemester, enrollmentPeriod,
      enrollmentYear, enrollmentMonth, linkedinUrl, githubUrl, portfolioUrl,
    } = body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 400 });
    }

    const institution = await prisma.institution.findUnique({ where: { id: institutionId } });
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!institution || !course) {
      return NextResponse.json({ error: 'Instituição ou curso inválido' }, { status: 400 });
    }

    const emailDomain = email.split('@')[1];
    if (emailDomain !== institution.domain) {
      return NextResponse.json(
        { error: `Use seu e-mail institucional (@${institution.domain})` },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const accountExpiresAt = calculateAccountExpiry(enrollmentYear, enrollmentMonth, course.durationMonths);
    const expectedGraduationDate = accountExpiresAt;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'STUDENT',
        student: {
          create: {
            fullName,
            phone: phone || null,
            city,
            state,
            bio: bio || null,
            institutionId,
            courseId,
            currentSemester,
            enrollmentPeriod,
            enrollmentYear,
            enrollmentMonth,
            expectedGraduationDate,
            accountExpiresAt,
            linkedinUrl: linkedinUrl || null,
            githubUrl: githubUrl || null,
            portfolioUrl: portfolioUrl || null,
          },
        },
      },
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Student register error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
