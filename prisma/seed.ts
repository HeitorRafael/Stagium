import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Instituições
  const fatecPG = await prisma.institution.upsert({
    where: { domain: 'fatec.sp.gov.br' },
    update: {},
    create: {
      name: 'FATEC Praia Grande',
      domain: 'fatec.sp.gov.br',
      city: 'Praia Grande',
      state: 'SP',
    },
  });

  const fatecSantos = await prisma.institution.upsert({
    where: { domain: 'fatec.santos.sp.gov.br' },
    update: {},
    create: {
      name: 'FATEC Santos',
      domain: 'fatec.santos.sp.gov.br',
      city: 'Santos',
      state: 'SP',
    },
  });

  // Cursos FATEC Praia Grande
  const ads = await prisma.course.upsert({
    where: { id: 'ads-pg' },
    update: {},
    create: {
      id: 'ads-pg',
      name: 'Análise e Desenvolvimento de Sistemas',
      durationMonths: 30,
      area: 'Tecnologia',
      institutionId: fatecPG.id,
    },
  });

  await prisma.course.upsert({
    where: { id: 'redes-pg' },
    update: {},
    create: {
      id: 'redes-pg',
      name: 'Redes de Computadores',
      durationMonths: 30,
      area: 'Tecnologia',
      institutionId: fatecPG.id,
    },
  });

  // Cursos FATEC Santos
  await prisma.course.upsert({
    where: { id: 'si-santos' },
    update: {},
    create: {
      id: 'si-santos',
      name: 'Sistemas para Internet',
      durationMonths: 30,
      area: 'Tecnologia',
      institutionId: fatecSantos.id,
    },
  });

  await prisma.course.upsert({
    where: { id: 'logistica-santos' },
    update: {},
    create: {
      id: 'logistica-santos',
      name: 'Logística',
      durationMonths: 30,
      area: 'Gestão',
      institutionId: fatecSantos.id,
    },
  });

  // Skills iniciais
  const skillsData = [
    { name: 'JavaScript', category: 'Programação' },
    { name: 'TypeScript', category: 'Programação' },
    { name: 'Python', category: 'Programação' },
    { name: 'Java', category: 'Programação' },
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Banco de Dados' },
    { name: 'MySQL', category: 'Banco de Dados' },
    { name: 'Git', category: 'Ferramentas' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Figma', category: 'Design' },
    { name: 'Excel', category: 'Ferramentas' },
    { name: 'Power BI', category: 'Dados' },
  ];

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  // Admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@stagium.com.br' },
    update: {},
    create: {
      email: 'admin@stagium.com.br',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('Seed concluído com sucesso!');
  console.log('Admin: admin@stagium.com.br / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
