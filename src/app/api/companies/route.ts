import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email, password, cnpj, companyName, sector, size,
      website, linkedinUrl, city, state, isRemoteFriendly, description,
      contactName, contactRole, contactPhone,
    } = body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 400 });
    }

    const existingCnpj = await prisma.company.findUnique({ where: { cnpj } });
    if (existingCnpj) {
      return NextResponse.json({ error: 'CNPJ já cadastrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'COMPANY',
        company: {
          create: {
            companyName,
            cnpj,
            sector,
            size,
            website: website || null,
            linkedinUrl: linkedinUrl || null,
            city,
            state,
            isRemoteFriendly: isRemoteFriendly ?? false,
            description: description || null,
            contactName,
            contactRole,
            contactPhone: contactPhone || null,
          },
        },
      },
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Company register error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
