# STAGIUM — Plataforma de Conexão entre Estudantes e Empresas
## Documento Técnico Completo para Implementação via Claude Code

---

## 📌 VISÃO GERAL DO PRODUTO

**Nome do produto:** Stagium  
**Tagline:** *"Seu próximo passo começa aqui."*  
**Conceito:** Stagium é uma plataforma profissional de descoberta e conexão entre estudantes universitários e empresas que buscam estagiários. Não é um app de namoro, não é LinkedIn — é um currículo vivo e inteligente, onde a empresa pesquisa, analisa e entra em contato. O aluno cuida apenas do seu perfil; a empresa faz o trabalho ativo de busca.

**Posicionamento:** Sofisticado, jovem, confiável. Elegante como um portfólio, direto como um currículo, acessível como uma rede social moderna.

---

## 🎨 DESIGN SYSTEM — IDENTIDADE VISUAL

### Estética Diretriz
**Estilo:** "Academic Dark" — dark mode como padrão, com acentos vibrantes elétricos. Glassmorphism sutil em cards. Bento grid layout. Sem purple/white genérico.

### Paleta de Cores
```css
:root {
  /* Base */
  --bg-primary: #0A0F1E;        /* Azul-marinho profundo */
  --bg-secondary: #111827;      /* Superfície secundária */
  --bg-card: rgba(255,255,255,0.04); /* Cards glassmorphism */
  --bg-card-hover: rgba(255,255,255,0.07);

  /* Acentos */
  --accent-lime: #C8F135;       /* Verde lima elétrico — CTA principal */
  --accent-coral: #FF6B6B;      /* Coral — alertas, badges de prazo */
  --accent-sky: #38BDF8;        /* Sky blue — links, tags ativas */
  --accent-gold: #F5C518;       /* Dourado — premium, destacados */

  /* Texto */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #475569;

  /* Bordas */
  --border-default: rgba(255,255,255,0.08);
  --border-accent: rgba(200,241,53,0.3);

  /* Gradientes */
  --gradient-hero: linear-gradient(135deg, #0A0F1E 0%, #0F1B3D 50%, #0A1628 100%);
  --gradient-card: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
  --gradient-accent: linear-gradient(90deg, #C8F135, #38BDF8);
}
```

### Tipografia
```css
/* Importar no _app ou layout.tsx */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

--font-display: 'Syne', sans-serif;   /* Títulos, logos, headings */
--font-body: 'DM Sans', sans-serif;   /* Corpo de texto, labels, UI */
```

### Princípios de Design
- Cards com `backdrop-filter: blur(12px)` e bordas `rgba(255,255,255,0.08)`
- Bento grid nos dashboards (células de tamanhos variados em grid)
- Micro-animações suaves em hover (transform: translateY(-2px), 200ms ease)
- Gradiente mesh sutil no background do hero
- Progress bars e badges para gamificar completude de perfil
- Ícones: Lucide React (consistente, moderno, leve)
- Skeleton loading em todos os dados assíncronos

---

## 🛠️ STACK TECNOLÓGICA

### Frontend
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Estilização:** Tailwind CSS + CSS Variables customizadas
- **Componentes:** shadcn/ui (customizados com o design system acima)
- **Ícones:** lucide-react
- **Animações:** Framer Motion
- **Formulários:** React Hook Form + Zod (validação)
- **Estado Global:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Upload de arquivos:** Uploadthing

### Backend
- **API:** Next.js Route Handlers (API Routes no App Router)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (via Supabase ou Railway)
- **Autenticação:** NextAuth.js v5 (Auth.js)
- **Email:** Resend (transacional)
- **Jobs/Cron:** Vercel Cron Jobs (para checar expiração de contas)
- **Pagamento:** Stripe

### Infraestrutura
- **Deploy:** Vercel
- **Storage:** Uploadthing (CVs, fotos de perfil, logos)
- **DB Hosting:** Supabase (PostgreSQL gerenciado)

---

## 📁 ARQUITETURA DE PASTAS

```
stagium/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   ├── student/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── company/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (student)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── proposals/
│   │   │   │   └── page.tsx
│   │   │   ├── subscription/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (company)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── vacancies/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── candidates/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [studentId]/
│   │   │   │       └── page.tsx
│   │   │   ├── proposals/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (admin)/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── students/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── companies/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── institutions/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── subscriptions/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── students/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── companies/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── vacancies/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── proposals/
│   │   │   │   └── route.ts
│   │   │   ├── institutions/
│   │   │   │   └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts
│   │   │   ├── stripe/
│   │   │   │   ├── checkout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   └── cron/
│   │   │       └── check-expirations/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← Landing page pública
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/               ← shadcn/ui customizados
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── student/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── AccountTimer.tsx
│   │   │   └── ProposalCard.tsx
│   │   ├── company/
│   │   │   ├── VacancyCard.tsx
│   │   │   ├── CandidateCard.tsx
│   │   │   └── ProposalSender.tsx
│   │   ├── admin/
│   │   │   ├── StatsGrid.tsx
│   │   │   └── DataTable.tsx
│   │   └── shared/
│   │       ├── AccountStatusBanner.tsx
│   │       ├── PlanBadge.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── stripe.ts
│   │   ├── uploadthing.ts
│   │   ├── resend.ts
│   │   ├── validations/
│   │   │   ├── student.ts
│   │   │   ├── company.ts
│   │   │   └── vacancy.ts
│   │   └── utils/
│   │       ├── dates.ts       ← lógica do contador de expiração
│   │       ├── ranking.ts     ← lógica de ordenação de candidatos
│   │       └── cn.ts
│   │
│   ├── hooks/
│   │   ├── useStudent.ts
│   │   ├── useCompany.ts
│   │   └── useAccountTimer.ts
│   │
│   ├── store/
│   │   └── useAuthStore.ts
│   │
│   └── types/
│       ├── student.ts
│       ├── company.ts
│       └── vacancy.ts
│
├── public/
│   ├── logo.svg
│   └── og-image.png
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── prisma/schema.prisma
└── package.json
```

---

## 🗄️ BANCO DE DADOS — Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ──────────────────────────────────────
// INSTITUIÇÕES (Faculdades parceiras)
// ──────────────────────────────────────
model Institution {
  id          String   @id @default(cuid())
  name        String
  domain      String   @unique   // Ex: "fatec.sp.gov.br" — usado para validar e-mail
  city        String
  state       String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  courses     Course[]
  students    Student[]
}

// ──────────────────────────────────────
// CURSOS (com duração padrão em meses)
// ──────────────────────────────────────
model Course {
  id              String   @id @default(cuid())
  name            String
  durationMonths  Int      // Ex: ADS = 30 meses (2,5 anos), Engenharia = 60 meses
  area            String   // "Tecnologia", "Saúde", "Humanas", etc.
  institutionId   String
  institution     Institution @relation(fields: [institutionId], references: [id])

  students        Student[]
}

// ──────────────────────────────────────
// USUÁRIOS (base comum, NextAuth)
// ──────────────────────────────────────
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  password      String?   // hash bcrypt
  role          UserRole  @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  student       Student?
  company       Company?
  sessions      Session[]
  accounts      Account[]
}

enum UserRole {
  STUDENT
  COMPANY
  ADMIN
}

// NextAuth tables
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

// ──────────────────────────────────────
// ALUNOS
// ──────────────────────────────────────
model Student {
  id                String         @id @default(cuid())
  userId            String         @unique
  user              User           @relation(fields: [userId], references: [id])

  // Dados pessoais
  fullName          String
  avatarUrl         String?
  phone             String?
  city              String
  state             String
  linkedinUrl       String?
  githubUrl         String?
  portfolioUrl      String?        // URL livre para portfólio
  portfolioLinks    String[]       // Array de links adicionais (Behance, Dribbble, etc.)
  cvUrl             String?        // Upload de PDF do currículo
  bio               String?        @db.Text

  // Dados acadêmicos
  institutionId     String
  institution       Institution    @relation(fields: [institutionId], references: [id])
  courseId          String
  course            Course         @relation(fields: [courseId], references: [id])
  currentSemester   Int
  enrollmentPeriod  PeriodType     // MORNING | AFTERNOON | NIGHT
  enrollmentYear    Int            // Ano em que ingressou
  enrollmentMonth   Int            // Mês em que ingressou (1-12)
  expectedGraduationDate DateTime  // Calculado automaticamente na criação

  // Status e visibilidade
  profileStatus     ProfileStatus  @default(ACTIVE)
  isVisible         Boolean        @default(true)  // Pode se tornar invisível
  profileCompleteness Int          @default(0)     // 0-100, calculado

  // Assinatura / Monetização
  plan              StudentPlan    @default(FREE)
  planExpiresAt     DateTime?      // Para planos pagos
  stripeCustomerId  String?
  stripeSubId       String?

  // Validade da conta gratuita
  accountExpiresAt  DateTime       // = data de ingresso + durationMonths do curso
  accountStatus     AccountStatus  @default(ACTIVE)
  // ACTIVE = estudando | EXPIRED = formou sem pagar | ALUMNI = pagou após formar

  // Notificações
  emailNotifications Boolean       @default(true)
  lastSeenAt         DateTime?

  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  experiences       Experience[]
  skills            StudentSkill[]
  proposals         Proposal[]     @relation("StudentProposals")
}

enum PeriodType {
  MORNING
  AFTERNOON
  NIGHT
  ONLINE
}

enum ProfileStatus {
  ACTIVE
  PAUSED        // Aluno pausou o perfil temporariamente
  EXPIRED       // Conta gratuita expirada
  SUSPENDED     // Admin suspendeu
}

enum StudentPlan {
  FREE          // Gratuito durante o curso
  ALUMNI_BASIC  // R$ 19,90/mês — após formar, funcionalidades básicas
  ALUMNI_PRO    // R$ 39,90/mês — após formar, destaque + analytics
}

enum AccountStatus {
  ACTIVE
  EXPIRING_SOON // Menos de 60 dias para expirar
  EXPIRED
  ALUMNI        // Formou e está pagando para continuar
}

// ──────────────────────────────────────
// EXPERIÊNCIAS DO ALUNO
// ──────────────────────────────────────
model Experience {
  id           String         @id @default(cuid())
  studentId    String
  student      Student        @relation(fields: [studentId], references: [id])

  type         ExperienceType
  title        String         // Cargo / função
  organization String         // Empresa, projeto, instituição
  description  String?        @db.Text
  startDate    DateTime
  endDate      DateTime?      // null = atual
  isCurrent    Boolean        @default(false)

  // Para projetos acadêmicos/pessoais
  projectUrl   String?
  technologies String[]       // Array de tecnologias usadas

  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}

enum ExperienceType {
  INTERNSHIP       // Estágio
  JOB              // Emprego
  FREELANCE        // Freela
  ACADEMIC_PROJECT // Projeto acadêmico
  VOLUNTEER        // Voluntariado
  RESEARCH         // Iniciação científica
  COURSE           // Curso/certificação relevante
}

// ──────────────────────────────────────
// HABILIDADES DO ALUNO
// ──────────────────────────────────────
model Skill {
  id       String         @id @default(cuid())
  name     String         @unique
  category String         // "Programação", "Design", "Gestão", etc.

  students StudentSkill[]
}

model StudentSkill {
  studentId  String
  skillId    String
  level      SkillLevel    @default(BEGINNER)

  student    Student       @relation(fields: [studentId], references: [id])
  skill      Skill         @relation(fields: [skillId], references: [id])

  @@id([studentId, skillId])
}

enum SkillLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

// ──────────────────────────────────────
// EMPRESAS
// ──────────────────────────────────────
model Company {
  id              String        @id @default(cuid())
  userId          String        @unique
  user            User          @relation(fields: [userId], references: [id])

  // Dados da empresa
  companyName     String
  cnpj            String        @unique
  logoUrl         String?
  website         String?
  linkedinUrl     String?
  description     String?       @db.Text
  sector          String        // "Tecnologia", "Saúde", "Finanças", etc.
  size            CompanySize

  // Localização
  city            String
  state           String
  address         String?
  isRemoteFriendly Boolean      @default(false)

  // Responsável pelo cadastro
  contactName     String
  contactRole     String        // Cargo do responsável
  contactPhone    String?

  // Status e Plano
  plan            CompanyPlan   @default(FREE)
  planExpiresAt   DateTime?
  isVerified      Boolean       @default(false) // Admin verifica CNPJ
  isActive        Boolean       @default(true)
  stripeCustomerId String?
  stripeSubId     String?

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  vacancies       Vacancy[]
  proposals       Proposal[]    @relation("CompanyProposals")
}

enum CompanySize {
  MICRO      // 1-9
  SMALL      // 10-49
  MEDIUM     // 50-249
  LARGE      // 250+
}

enum CompanyPlan {
  FREE       // 3 vagas ativas, sem destaque
  BASIC      // R$ 149/mês — 10 vagas, busca avançada
  PRO        // R$ 349/mês — vagas ilimitadas, destaque, analytics
  ENTERPRISE // Sob consulta — convênio com faculdades
}

// ──────────────────────────────────────
// VAGAS
// ──────────────────────────────────────
model Vacancy {
  id                  String         @id @default(cuid())
  companyId           String
  company             Company        @relation(fields: [companyId], references: [id])

  title               String
  description         String         @db.Text
  requirements        String         @db.Text    // O que o estagiário precisa saber
  activities          String         @db.Text    // O que vai fazer no dia a dia
  
  // Remuneração — TRANSPARÊNCIA TOTAL (diferencial do produto)
  monthlyAllowance    Float          // Bolsa em reais
  transportVoucher    Boolean        @default(false)
  mealVoucher         Boolean        @default(false)
  healthPlan          Boolean        @default(false)
  otherBenefits       String?

  // Detalhes
  area                String         // Área de atuação
  workload            Int            // Horas semanais
  modality            WorkModality
  city                String?        // null se remoto
  state               String?

  // Possibilidade de efetivação — campo obrigatório, diferencial
  hiringPossibility   HiringPossibility
  hiringNotes         String?        // Contexto sobre efetivação

  // Público-alvo
  targetCourses       String[]       // Cursos desejados (pode ser vários)
  targetSemesters     Int[]          // Semestres mínimos aceitos
  targetAreas         String[]       // Áreas de formação aceitas

  // Status
  status              VacancyStatus  @default(ACTIVE)
  isHighlighted       Boolean        @default(false) // Plano Pro
  expiresAt           DateTime       // Data de encerramento da vaga
  
  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  proposals           Proposal[]
}

enum WorkModality {
  ONSITE
  HYBRID
  REMOTE
}

enum HiringPossibility {
  HIGH        // Alta possibilidade
  MEDIUM      // Média possibilidade
  LOW         // Baixa possibilidade
  NONE        // Sem possibilidade de efetivação
}

enum VacancyStatus {
  ACTIVE
  PAUSED
  CLOSED
  EXPIRED
}

// ──────────────────────────────────────
// PROPOSTAS (Empresa → Aluno)
// ──────────────────────────────────────
model Proposal {
  id          String         @id @default(cuid())
  companyId   String
  company     Company        @relation("CompanyProposals", fields: [companyId], references: [id])
  studentId   String
  student     Student        @relation("StudentProposals", fields: [studentId], references: [id])
  vacancyId   String?
  vacancy     Vacancy?       @relation(fields: [vacancyId], references: [id])

  message     String         @db.Text
  status      ProposalStatus @default(PENDING)

  // Metadados
  viewedAt    DateTime?      // Quando o aluno viu
  respondedAt DateTime?

  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

enum ProposalStatus {
  PENDING
  VIEWED
  INTERESTED    // Aluno marcou interesse
  DECLINED      // Aluno declinou (sem feedback detalhado, privacidade)
  HIRED         // Contratado — informado voluntariamente
}
```

---

## 🔐 LÓGICA DE NEGÓCIO CRÍTICA

### 1. Verificação de Estudante (Anti-fraude)

**Etapa 1 — E-mail Institucional (Gratuito e imediato):**
- O aluno cadastra com e-mail do domínio da instituição cadastrada no sistema
- Ex: `joao.silva@fatec.sp.gov.br`
- O sistema valida que o domínio do e-mail bate com um `Institution.domain` cadastrado
- Dispara verificação por e-mail (link de confirmação via Resend)

**Etapa 2 — Aprovação Manual por Admin (Fase inicial do produto):**
- Admin revisa novos cadastros e aprova manualmente
- Futuramente: integração com sistemas de matrículas das faculdades parceiras (ENTERPRISE plan)
- Campo `emailVerified` do NextAuth controla o acesso

```typescript
// lib/utils/dates.ts

/**
 * Calcula a data de expiração da conta gratuita do aluno
 * baseado no mês/ano de ingresso + duração do curso em meses
 */
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

/**
 * Retorna o status da conta baseado na data atual vs expiração
 */
export function getAccountStatus(expiresAt: Date, plan: StudentPlan): AccountStatus {
  const now = new Date();
  const daysUntilExpiry = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (plan !== 'FREE') return 'ALUMNI';
  if (daysUntilExpiry < 0) return 'EXPIRED';
  if (daysUntilExpiry <= 60) return 'EXPIRING_SOON';
  return 'ACTIVE';
}

/**
 * Retorna o texto amigável do tempo restante
 * Ex: "1 ano e 3 meses restantes"
 */
export function getTimeRemainingText(expiresAt: Date): string {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  if (diff < 0) return 'Conta expirada';

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) return `${years} ano${years > 1 ? 's' : ''} e ${remainingMonths} mês${remainingMonths > 1 ? 'es' : ''} restantes`;
  if (years > 0) return `${years} ano${years > 1 ? 's' : ''} restante${years > 1 ? 's' : ''}`;
  return `${months} mês${months > 1 ? 'es' : ''} restante${months > 1 ? 's' : ''}`;
}
```

### 2. Ordenação de Candidatos para Empresas

```typescript
// lib/utils/ranking.ts

/**
 * Ordenação de candidatos visíveis para empresas:
 * 1. Mais próximos do fim do curso primeiro (mais senioridade acadêmica)
 * 2. Desempate por número de experiências
 * 3. Alunos ALUMNI_PRO têm boost de posição (monetização)
 */
export function rankCandidates(students: Student[]): Student[] {
  return students.sort((a, b) => {
    // Boost para plano Alumni Pro (empresa paga para ver, aluno paga para ser visto)
    if (a.plan === 'ALUMNI_PRO' && b.plan !== 'ALUMNI_PRO') return -1;
    if (b.plan === 'ALUMNI_PRO' && a.plan !== 'ALUMNI_PRO') return 1;

    // Ordenar por tempo de curso (mais avançado aparece primeiro)
    const aProgress = getProgressMonths(a);
    const bProgress = getProgressMonths(b);
    if (bProgress !== aProgress) return bProgress - aProgress;

    // Desempate: mais experiências
    return b.experiences.length - a.experiences.length;
  });
}

function getProgressMonths(student: Student): number {
  const start = new Date(student.enrollmentYear, student.enrollmentMonth - 1, 1);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
}
```

### 3. Cron Job de Expiração
```typescript
// app/api/cron/check-expirations/route.ts
// Vercel Cron: roda todo dia às 2h da manhã

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const expiredStudents = await prisma.student.findMany({
    where: {
      accountExpiresAt: { lte: new Date() },
      plan: 'FREE',
      accountStatus: { not: 'EXPIRED' }
    }
  });

  for (const student of expiredStudents) {
    await prisma.student.update({
      where: { id: student.id },
      data: {
        accountStatus: 'EXPIRED',
        isVisible: false,  // Remove da listagem
        profileStatus: 'EXPIRED'
      }
    });
    // Enviar e-mail de expiração com CTA para assinar plano Alumni
    await sendExpirationEmail(student);
  }

  // Avisar alunos que vão expirar em 60 dias
  const expiringSoon = await prisma.student.findMany({
    where: {
      accountExpiresAt: {
        gte: new Date(),
        lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      },
      plan: 'FREE',
      accountStatus: { not: 'EXPIRING_SOON' }
    }
  });

  for (const student of expiringSoon) {
    await prisma.student.update({
      where: { id: student.id },
      data: { accountStatus: 'EXPIRING_SOON' }
    });
    await sendExpiringSoonEmail(student);
  }

  return Response.json({ processed: expiredStudents.length });
}
```

---

## 💰 MODELO DE MONETIZAÇÃO

### Planos do Aluno
| Plano | Preço | Quem | Benefícios |
|-------|-------|------|-----------|
| FREE | R$ 0 | Estudantes ativos | Perfil completo, receber propostas, visibilidade padrão |
| ALUMNI BASIC | R$ 19,90/mês | Recém-formados | Manter perfil ativo, receber propostas |
| ALUMNI PRO | R$ 39,90/mês | Recém-formados | Destaque na listagem, badge "Disponível", analytics de visualizações |

### Planos da Empresa
| Plano | Preço | Vagas Ativas | Recursos |
|-------|-------|-------------|---------|
| FREE | R$ 0 | 3 | Busca básica, ver candidatos |
| BASIC | R$ 149/mês | 10 | Filtros avançados, ver contatos |
| PRO | R$ 349/mês | Ilimitado | Destaque, analytics, exportar candidatos |
| ENTERPRISE | Sob consulta | Ilimitado | Convênio com faculdade, API, suporte dedicado |

### Convênio com Faculdades (B2B2C)
- Faculdades pagam mensalidade para ter sua instituição verificada e integrada
- Benefício para faculdade: dados de empregabilidade dos alunos, relatórios
- Plano Faculdade: R$ 499/mês por instituição ativa
- Receita passiva, escalonável

---

## 📄 PÁGINAS — DESCRIÇÃO DETALHADA

---

### 🌐 PÁGINA 1: LANDING PAGE PÚBLICA (`/`)

**Layout:** Full-page com scroll, seções alternadas, dark mode.

**Seção Hero:**
- Background com gradiente mesh animado (CSS, verde lima + azul profundo)
- Logo "STAGIUM" em Syne Bold, tamanho grande
- Headline principal (Syne 800): *"Seu perfil universitário. Sua próxima oportunidade."*
- Subheadline (DM Sans Regular): Texto curto explicando o conceito — conectar estudantes a empresas sem a frieza do LinkedIn e sem a superficialidade de apps de matchmaking
- Dois CTAs lado a lado:
  - Botão primário (bg `--accent-lime`, texto dark): **"Criar meu Perfil"** → `/register/student`
  - Botão secundário (border lime, texto lime): **"Sou Empresa"** → `/register/company`
- Abaixo: mini-stat animada: "X estudantes • Y empresas • Z vagas ativas" (números reais do DB)

**Seção Como Funciona (3 colunas Bento):**
- Card 1: Ícone GraduationCap — "Crie seu perfil acadêmico" — descrição breve
- Card 2: Ícone Building2 — "Empresas encontram você" — descrição breve
- Card 3: Ícone Handshake — "Receba propostas reais" — descrição breve
- Cada card: glassmorphism, borda sutil, hover com translateY

**Seção Para Estudantes:**
- Layout split: texto à esquerda, mockup do perfil à direita (screenshot ou ilustração SVG)
- Destaque para: gratuidade durante o curso, tempo restante visível, portfólio integrado

**Seção Para Empresas:**
- Layout invertido
- Destaque para: candidatos verificados (e-mail institucional), ordenação por senioridade, transparência total de benefícios

**Seção Depoimentos (quando houver dados):**
- Cards em carrossel horizontal com avatar, nome, curso/empresa, texto

**Seção Planos:**
- Tabs: "Para Estudantes" / "Para Empresas"
- Cards de plano com destaque visual no mais popular
- CTA em cada card

**Footer:**
- Logo + tagline
- Links: Sobre, Contato, Termos de Uso, Política de Privacidade
- Redes sociais

---

### 🔑 PÁGINA 2: LOGIN (`/login`)

**Layout:** Centralizado, split screen — lado esquerdo com branding, lado direito com formulário.

**Lado esquerdo (40% da tela, apenas desktop):**
- Background com gradiente `--gradient-hero`
- Logo grande
- Quote inspiracional rotativa sobre carreiras e estudos

**Formulário (direito, ou tela inteira no mobile):**
- Título: "Bem-vindo de volta"
- Subtítulo: "Entre com seu e-mail institucional ou corporativo"
- Campo Email (com detecção automática de role pelo domínio do e-mail)
- Campo Senha
- Link "Esqueci minha senha"
- Botão "Entrar" (lime, full-width)
- Separador "— ou —"
- Links: "Sou estudante, criar conta" / "Sou empresa, criar conta"
- Após login, redirecionar conforme `role`: STUDENT → `/dashboard`, COMPANY → `/company/dashboard`, ADMIN → `/admin/dashboard`

**Validações:**
- E-mail obrigatório e válido
- Senha mínimo 8 caracteres
- Mostrar erro claro se e-mail não verificado

---

### 📝 PÁGINA 3: CADASTRO DO ALUNO (`/register/student`)

**Layout:** Formulário multi-etapas com barra de progresso no topo (Step 1/4, 2/4...). Não recarrega a página entre etapas.

**Step 1 — Conta:**
- Campo: E-mail institucional
  - Validação em tempo real: verificar se o domínio existe na tabela `Institution`
  - Feedback: "✓ E-mail da FATEC Praia Grande detectado" ou "⚠ Domínio institucional não reconhecido"
- Campo: Senha
- Campo: Confirmar senha
- Checkbox: Aceitar Termos de Uso e Política de Privacidade
- Botão "Próximo"

**Step 2 — Dados Pessoais:**
- Nome completo
- Telefone (opcional, com máscara)
- Cidade e Estado (selects)
- Foto de perfil (upload opcional, preview imediato)
- Bio curta (textarea, 280 caracteres max, contador visível)

**Step 3 — Dados Acadêmicos:**
- Instituição (auto-preenchida pelo domínio do e-mail, mas confirmação visual)
- Curso (select, carregado por instituição)
- Semestre atual (1 ao máximo do curso)
- Período (Manhã / Tarde / Noite / EAD)
- Ano de ingresso (select: ano atual até 10 anos atrás)
- Mês de ingresso (select: Janeiro a Dezembro)
- Campo calculado visível: *"Previsão de formatura: Julho/2027 • Conta gratuita até esta data"*

**Step 4 — Perfil Profissional:**
- LinkedIn URL (opcional)
- GitHub URL (opcional)
- Portfólio URL principal (opcional)
- Links adicionais de portfólio: campo dinâmico, botão "+ Adicionar link" (max 5)
  - Cada link tem: URL + Label (ex: "Behance", "Dribbble", "Figma Community")
- Habilidades: input com autocomplete e seleção de nível (Iniciante / Intermediário / Avançado)
- Botão "Criar minha conta"

**Pós-cadastro:**
- Tela de confirmação: "Verifique seu e-mail institucional"
- Instruções claras sobre aprovação (e-mail enviado via Resend)

---

### 📝 PÁGINA 4: CADASTRO DA EMPRESA (`/register/company`)

**Layout:** Formulário em 3 etapas, similar ao do aluno.

**Step 1 — Conta:**
- E-mail corporativo (com domínio da empresa — não permitir gmail.com, hotmail.com etc. nesta fase)
- Senha + confirmação
- Aceite dos Termos
- CNPJ (com validação de formato)

**Step 2 — Dados da Empresa:**
- Razão social / Nome fantasia
- Logo (upload)
- Setor de atuação (select)
- Tamanho da empresa (MICRO / PEQUENA / MÉDIA / GRANDE)
- Website
- LinkedIn da empresa
- Cidade e Estado (sede)
- É remote-friendly? (toggle)
- Descrição da empresa (textarea, rica, 500 caracteres)

**Step 3 — Responsável:**
- Nome do responsável pelo cadastro
- Cargo do responsável
- Telefone de contato (com máscara)
- Botão "Criar conta da empresa"

**Pós-cadastro:**
- Aviso: "Seu cadastro será verificado em até 24h. Você receberá um e-mail quando estiver aprovado."
- Admin precisa verificar o CNPJ e aprovar manualmente antes de a empresa poder acessar

---

### 🎓 PÁGINA 5: DASHBOARD DO ALUNO (`/dashboard`)

**Layout:** Sidebar fixa à esquerda + conteúdo principal em Bento Grid.

**Sidebar:**
- Avatar + nome + badge do plano (FREE / ALUMNI PRO)
- Links de navegação com ícones:
  - 🏠 Dashboard
  - 👤 Meu Perfil
  - 💼 Propostas recebidas
  - ⭐ Assinatura
  - ⚙️ Configurações
- Na base da sidebar: AccountTimer (componente visual da validade)

**AccountTimer Component (destaque no sidebar):**
- Exibe: "X meses restantes de conta gratuita"
- Barra de progresso circular (percentual do curso completado)
- Cor muda conforme prazo: verde (> 6 meses), amarelo (60-180 dias), coral (< 60 dias)
- Quando EXPIRING_SOON: banner no topo da página com CTA para assinar

**Grid principal (Bento):**

*Célula grande (col-span-2): "Seu Perfil está X% completo"*
- Progress bar horizontal animada
- Checklist de itens faltantes: foto, bio, experiências, habilidades, portfólio
- Cada item clicável leva para o campo correspondente no edit

*Célula: "Propostas recebidas"*
- Número de propostas + badge "X novas"
- Preview das 2 mais recentes (nome da empresa, vaga, data)
- Link "Ver todas"

*Célula: "Empresas que visualizaram seu perfil" (apenas Alumni Pro)*
- Número de visualizações nos últimos 30 dias
- Gráfico simples de linha (TanStack Query + Recharts)
- Se plano FREE: célula com CTA desfocada e botão de upgrade

*Célula: "Suas Habilidades"*
- Tags das skills com nível visual
- Link "Editar habilidades"

*Célula: "Sua Validade"*
- Data de expiração formatada
- Texto amigável ("Faltam X meses")
- Se EXPIRING_SOON: botão "Renovar como Alumni"

*Célula: "Links do seu Portfólio"*
- Lista de links cadastrados com ícone de acesso
- Link "Gerenciar links"

---

### 👤 PÁGINA 6: PERFIL DO ALUNO - EDIÇÃO (`/profile/edit`)

**Layout:** Formulário longo com abas laterais para navegação entre seções.

**Abas:**
1. **Dados Pessoais** — foto, nome, bio, telefone, cidade
2. **Acadêmico** — confirmar curso, semestre atual (atualização manual)
3. **Experiências** — CRUD completo de experiências
4. **Habilidades** — adicionar/remover/ajustar nível
5. **Links & Portfólio** — LinkedIn, GitHub, portfólio, links extras
6. **Privacidade** — visibilidade do perfil, notificações por e-mail

**Aba Experiências (detalhe importante):**
- Lista de experiências cadastradas com cards
- Cada card exibe: tipo (badge colorido), cargo, empresa, período, botões Editar e Excluir
- Botão "+ Adicionar Experiência" abre modal com formulário completo:
  - Tipo de experiência (select com ícones: Estágio, Emprego, Freela, Projeto Acadêmico, Voluntariado, Pesquisa, Curso)
  - Cargo/Função
  - Empresa/Organização
  - Descrição (textarea rico)
  - Data início e Data fim (ou "Atual" toggle)
  - Se projeto: campo URL do projeto e campo de tecnologias (tags)
- Ordenação automática: mais recente primeiro
- Contador: "X experiências cadastradas" — visível para empresa, usado no ranking

---

### 👀 PÁGINA 7: PERFIL PÚBLICO DO ALUNO (`/profile/[studentId]`)

**Acesso:** Apenas empresas logadas podem ver. Alunos não veem perfis de outros alunos.

**Layout:** Single-page clean, como um currículo premium.

**Header:**
- Foto de perfil grande (ou avatar gerado com iniciais)
- Nome completo
- Curso + Instituição + Semestre atual
- Badges: período, cidade, tempo de curso ("4° semestre • 2 anos no curso")
- Badge especial se ALUMNI PRO: "⭐ Destaque"

**Seção Bio:**
- Texto da bio

**Seção Habilidades:**
- Tags agrupadas por categoria com nível visual (barras pequenas)

**Seção Experiências:**
- Timeline vertical elegante
- Cada experiência: ícone do tipo, cargo (bold), empresa, período, descrição, tecnologias (se projeto)
- Indicador visual de quantidade: "5 experiências" no topo da seção

**Seção Portfólio & Links:**
- Botões/cards para cada link: LinkedIn, GitHub, Portfólio, links extras
- Ícone + label + URL (sem mostrar URL completa, só o label)

**Barra lateral / Footer da página:**
- Informações de contato (e-mail institucional, se o aluno permitiu mostrar)
- Botão "Enviar Proposta" → abre modal de proposta
- Data do último acesso: "Visto há X dias" (privacidade: apenas admin vê a data exata)

---

### 💌 PÁGINA 8: PROPOSTAS DO ALUNO (`/proposals`)

**Layout:** Lista de propostas com filtros.

**Filtros (topo):**
- Status: Todas / Pendentes / Vistas / Com interesse / Recusadas

**Lista de Propostas:**
- Cada proposta em card:
  - Logo da empresa + nome
  - Vaga relacionada (se houver)
  - Data de envio
  - Status visual (badge colorido)
  - Mensagem da empresa (preview de 100 chars)
  - Botão "Ver detalhes" → modal

**Modal de detalhes:**
- Informações completas da empresa
- Vaga detalhada (se associada)
- Mensagem completa
- Dois botões: "Tenho interesse" e "Não tenho interesse"
- Link para ver perfil da empresa

**Estado vazio (nenhuma proposta):**
- Ilustração + texto encorajador + dica de como completar o perfil para aparecer mais

---

### 🏢 PÁGINA 9: DASHBOARD DA EMPRESA (`/company/dashboard`)

**Layout:** Sidebar + Bento Grid, estilo mais "corporativo" mas ainda no design system.

**Sidebar:**
- Logo da empresa + nome
- Links:
  - 📊 Dashboard
  - 📋 Minhas Vagas
  - 🔍 Buscar Candidatos
  - 📨 Propostas Enviadas
  - 🏢 Perfil da Empresa
  - 💎 Meu Plano
  - ⚙️ Configurações

**Bento Grid:**

*Célula grande: "Candidatos disponíveis na sua área"*
- Número total de alunos visíveis
- Filtros rápidos: Curso, Cidade, Com experiência
- Preview de 3-4 candidatos com link "Ver todos"

*Célula: "Suas Vagas Ativas"*
- Número de vagas + limite do plano (ex: "2/3 vagas no plano FREE")
- CTA "Criar nova vaga"
- Progresso visual do limite

*Célula: "Propostas enviadas"*
- Total de propostas
- X recebidas com interesse
- X pendentes

*Célula: "Candidatos com interesse nas suas vagas"*
- Alunos que marcaram interesse em alguma proposta
- Link "Ver candidatos"

*Célula: Upgrade do Plano (se FREE)*
- CTA para upgrade com benefícios listados

---

### 🔍 PÁGINA 10: BUSCA DE CANDIDATOS (`/company/candidates`)

**Layout:** Sidebar de filtros + grid de cards de candidatos.

**Filtros (sidebar esquerda):**
- **Instituição** (select multiple)
- **Curso** (select multiple, dependente da instituição)
- **Semestre mínimo** (slider ou select: 1°, 2°, 3°... 10°)
- **Área de formação** (checkboxes)
- **Cidade** (campo de texto)
- **Período** (Manhã / Tarde / Noite / EAD)
- **Com experiência** (toggle — filtra alunos com ao menos 1 experiência)
- **Número mínimo de experiências** (se toggle ativo: slider 1-10)
- **Habilidades** (input com autocomplete, multiplo)
- Botão "Aplicar filtros" + "Limpar"

**Grid de Candidatos (ordenação fixa: lógica de ranking):**
- Cada card exibe:
  - Avatar + nome (primeiro e último)
  - Curso + Semestre + Instituição
  - Cidade
  - Número de experiências (badge): "3 experiências"
  - Habilidades top 3 (tags)
  - Barra de progresso do curso ("60% concluído")
  - Tempo de validade restante ("1 ano e 2 meses")
  - Badge ALUMNI PRO se aplicável
  - Botão "Ver perfil completo"

**Ordenação informativa:**
- Texto explicativo discreto no topo: "Candidatos ordenados por tempo de curso — estudantes mais avançados aparecem primeiro"

**Paginação:** Infinite scroll ou paginação clássica (10 por página para plano FREE, 25 para BASIC, sem limite para PRO)

---

### 📋 PÁGINA 11: VAGAS DA EMPRESA (`/company/vacancies`)

**Layout:** Lista de vagas + botão de criar.

**Header:**
- Título "Minhas Vagas"
- Indicador: "X/Y vagas ativas (plano FREE)" com link para upgrade
- Botão "Nova Vaga" (desabilitado com tooltip se limite atingido)

**Lista:**
- Cards de vaga: título, área, modalidade, data de criação, status, número de propostas enviadas, candidatos que demonstraram interesse
- Ações: Editar, Pausar/Ativar, Excluir, Ver candidatos

---

### ➕ PÁGINA 12: CRIAR/EDITAR VAGA (`/company/vacancies/new`)

**Layout:** Formulário em uma única página, longa, com seções bem definidas.

**Seção 1 — Informações Básicas:**
- Título da vaga
- Área de atuação (select)
- Descrição completa da vaga (textarea rico — mínimo 100 caracteres)
- Atividades do dia a dia (textarea — o que o estagiário vai fazer)
- Requisitos (textarea — o que é esperado do candidato)

**Seção 2 — Remuneração e Benefícios (DESTAQUE — diferencial do produto):**
- Aviso informativo: *"A transparência nos benefícios é o que diferencia o Stagium. Candidates se inscrevem mais quando sabem o que esperar."*
- Campo obrigatório: Bolsa mensal (R$, numérico)
- Toggles booleanos (sim/não):
  - Vale transporte
  - Vale refeição / alimentação
  - Plano de saúde
- Campo livre: Outros benefícios (textarea opcional)

**Seção 3 — Detalhes do Estágio:**
- Carga horária semanal (20h ou 30h — select com opção personalizada)
- Modalidade (Presencial / Híbrido / Remoto)
- Cidade e Estado (apenas se não for 100% remoto)
- Data de encerramento da vaga (expiração automática)

**Seção 4 — Possibilidade de Efetivação (campo obrigatório, único no mercado):**
- Select: Alta / Média / Baixa / Não há previsão de efetivação
- Notas sobre efetivação (opcional): "Contextualize sua resposta. Isso ajuda o candidato a tomar decisão."

**Seção 5 — Público-alvo:**
- Cursos desejados (autocomplete, múltiplos)
- Semestres aceitos (ex: "a partir do 3° semestre")
- Aviso: "Não restringir demais amplia seu alcance de candidatos"

**Botão:** "Publicar Vaga" (roda validação completa antes de salvar)

---

### 📨 PÁGINA 13: ENVIAR PROPOSTA (`/company/candidates/[studentId]`)

**Layout:** Página de perfil do candidato (modo empresa) + painel lateral de proposta.

**Painel de proposta (sidebar direita ou modal):**
- Select: Vaga associada (ou "Proposta direta sem vaga específica")
- Textarea: Mensagem personalizada (mínimo 50 caracteres, máximo 1000)
- Dica: *"Seja específico sobre por que você acredita que este candidato é ideal para sua empresa."*
- Botão "Enviar Proposta"
- Aviso: empresa pode enviar apenas 1 proposta por aluno por vez

---

### 👑 PÁGINA 14: PAINEL ADMIN (`/admin/dashboard`)

**Acesso:** Apenas usuários com `role: ADMIN`.

**Layout:** Sidebar admin + conteúdo.

**Sidebar Admin:**
- Logo + "Painel Admin"
- Links:
  - 📊 Dashboard
  - 🎓 Estudantes
  - 🏢 Empresas
  - 🏫 Instituições
  - 💰 Assinaturas
  - ⚙️ Configurações

**Dashboard Admin — Bento de KPIs:**

*Células de métricas:*
- Total de estudantes ativos
- Total de empresas ativas
- Vagas publicadas (últimos 30 dias)
- Propostas enviadas (últimos 30 dias)
- MRR (Monthly Recurring Revenue) — soma das assinaturas
- Alunos expirando em 60 dias (CTA de ação)
- Empresas aguardando verificação

*Gráficos:*
- Linha: Cadastros por semana (últimas 12 semanas)
- Barra: Distribuição por instituição
- Pizza: Distribuição de planos (FREE vs pagos)

---

### 🎓 PÁGINA 15: GESTÃO DE ESTUDANTES (Admin) (`/admin/students`)

**Layout:** Tabela com filtros e ações.

**Filtros:**
- Busca por nome ou e-mail
- Instituição (select)
- Curso (select)
- Status da conta (ACTIVE / EXPIRING_SOON / EXPIRED / ALUMNI)
- Plano (FREE / ALUMNI_BASIC / ALUMNI_PRO)

**Tabela (colunas):**
- Avatar + Nome
- E-mail
- Instituição + Curso
- Semestre
- Validade da conta (com cor)
- Plano
- Status
- Data de cadastro
- Ações: Ver perfil, Editar, Suspender, Excluir

**Ações em massa:**
- Selecionar múltiplos → Exportar CSV, Enviar e-mail em massa

---

### 🏢 PÁGINA 16: GESTÃO DE EMPRESAS (Admin) (`/admin/companies`)

**Layout:** Similar à de estudantes.

**Tabela (colunas):**
- Logo + Nome
- CNPJ
- Setor
- Plano
- Vagas ativas
- Propostas enviadas
- Verificada (✓ / ✗)
- Data de cadastro
- Ações: Ver, Verificar/Remover verificação, Editar plano, Suspender

**Fila de verificação:**
- Seção separada no topo: "X empresas aguardando verificação"
- Cards rápidos para aprovar/rejeitar

---

### 🏫 PÁGINA 17: GESTÃO DE INSTITUIÇÕES (Admin) (`/admin/institutions`)

**Layout:** Lista de instituições com CRUD completo.

**Campos por instituição:**
- Nome da instituição
- Domínio do e-mail (ex: `fatec.sp.gov.br`) — campo crítico para validação de alunos
- Cidade e Estado
- Status (Ativa / Inativa)
- Número de cursos cadastrados
- Número de alunos ativos

**Formulário de Curso (modal):**
- Nome do curso
- Duração em meses (ex: ADS = 30)
- Área (select)
- Botão salvar

---

### 💎 PÁGINA 18: ASSINATURA DO ALUNO (`/subscription`)

**Layout:** Página de billing limpa.

**Seção atual:**
- Status da conta com visual claro
- Tempo restante (se FREE)
- Plano atual (badge)

**Cards de plano disponíveis (apenas quando expirando ou expirado):**

*Plano FREE (atual se ainda estudante):*
- "Você está no plano gratuito. Aproveite enquanto está estudando!"
- Validade calculada

*Plano Alumni Basic — R$ 19,90/mês:*
- Manter perfil ativo após formatura
- Receber propostas de empresas
- Visibilidade padrão na listagem
- Botão "Assinar Basic"

*Plano Alumni Pro — R$ 39,90/mês (destaque visual):*
- Tudo do Basic
- Aparecer antes de outros candidatos
- Badge "Destaque" no perfil
- Analytics de visualizações do perfil
- Botão "Assinar Pro"

**Integração Stripe:**
- Ao clicar em assinar: redirecionar para Stripe Checkout
- Webhook do Stripe atualiza `plan`, `stripeSubId`, `planExpiresAt` no banco

---

## ⚙️ VARIÁVEIS DE AMBIENTE

```env
# .env.local

# DB
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe Price IDs
STRIPE_PRICE_ALUMNI_BASIC="price_..."
STRIPE_PRICE_ALUMNI_PRO="price_..."
STRIPE_PRICE_COMPANY_BASIC="price_..."
STRIPE_PRICE_COMPANY_PRO="price_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@stagium.com.br"

# Upload
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# Cron
CRON_SECRET="..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚀 FASES DE IMPLEMENTAÇÃO

### FASE 1 — Fundação (Entregável: auth + DB funcionando)
1. Setup do projeto: `npx create-next-app@latest stagium --typescript --tailwind --app`
2. Instalar dependências: `prisma`, `@prisma/client`, `next-auth@beta`, `bcryptjs`, `zod`, `react-hook-form`, `@hookform/resolvers`, `lucide-react`, `framer-motion`, `zustand`, `@tanstack/react-query`, `uploadthing`, `@uploadthing/react`, `stripe`, `resend`, `recharts`
3. Instalar shadcn/ui: `npx shadcn@latest init`
4. Configurar `globals.css` com todas as CSS variables do design system
5. Configurar `tailwind.config.ts` com as cores e fontes customizadas
6. Criar `prisma/schema.prisma` com todo o schema acima
7. Rodar `npx prisma migrate dev --name init`
8. Criar `prisma/seed.ts` com: 2 instituições (FATEC Praia Grande + FATEC Santos), cursos para cada, 2 skills de cada área, 1 usuário admin
9. Configurar NextAuth em `lib/auth.ts` com CredentialsProvider
10. Criar `app/api/auth/[...nextauth]/route.ts`
11. Criar middleware de proteção de rotas (`middleware.ts`)

### FASE 2 — Onboarding de Alunos
1. Criar Landing page (`app/page.tsx`) com design system aplicado
2. Criar página de login (`app/(auth)/login/page.tsx`)
3. Criar formulário multi-step de cadastro de aluno com validação Zod
4. Criar API route de registro de aluno (`app/api/students/route.ts`)
5. Integrar Uploadthing para foto de perfil e CV
6. Criar e-mail de verificação via Resend
7. Criar tela de sucesso pós-cadastro
8. Criar página de edição de perfil com todas as abas
9. Criar CRUD de experiências (com modal)
10. Criar seleção de habilidades com autocomplete

### FASE 3 — Onboarding de Empresas
1. Criar formulário multi-step de cadastro de empresa
2. Criar API route de registro de empresa
3. Criar fila de verificação para admin aprovar empresa
4. Criar página de criar/editar vaga com todos os campos
5. Criar listagem de vagas da empresa

### FASE 4 — Core: Matching e Propostas
1. Criar página de busca de candidatos com filtros
2. Implementar lógica de ranking (`lib/utils/ranking.ts`)
3. Criar página de perfil público do aluno (visão empresa)
4. Criar sistema de envio de propostas
5. Criar página de propostas do aluno com status e ações
6. Criar notificação por e-mail ao receber/responder proposta

### FASE 5 — Admin Panel
1. Criar dashboard admin com KPIs
2. Criar tabela de gestão de estudantes com filtros e ações
3. Criar tabela de gestão de empresas com fila de verificação
4. Criar CRUD de instituições e cursos
5. Criar visão de assinaturas

### FASE 6 — Monetização
1. Configurar produtos e preços no Stripe
2. Criar página de assinatura do aluno
3. Implementar Stripe Checkout
4. Criar webhook do Stripe para atualizar banco
5. Implementar cron job de expiração de contas (`app/api/cron/check-expirations/route.ts`)
6. Criar AccountStatusBanner (banner amarelo/vermelho quando expirando)
7. Criar e-mails automáticos: expirando em 60 dias, expirado, proposta recebida

---

## 📦 PACKAGE.JSON — Dependências

```json
{
  "name": "stagium",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "@prisma/client": "^5.14.0",
    "next-auth": "^5.0.0-beta.19",
    "bcryptjs": "^2.4.3",
    "zod": "^3.23.8",
    "react-hook-form": "^7.52.0",
    "@hookform/resolvers": "^3.6.0",
    "lucide-react": "^0.396.0",
    "framer-motion": "^11.2.12",
    "zustand": "^4.5.2",
    "@tanstack/react-query": "^5.45.0",
    "uploadthing": "^6.13.2",
    "@uploadthing/react": "^6.7.2",
    "stripe": "^15.12.0",
    "resend": "^3.4.0",
    "recharts": "^2.12.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "date-fns": "^3.6.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-badge": "^0.0.1"
  },
  "devDependencies": {
    "prisma": "^5.14.0",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/bcryptjs": "^2.4.6",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "ts-node": "^10.9.2"
  }
}
```

---

## 🎯 REGRAS ESSENCIAIS PARA O CLAUDE CODE

1. **Design System primeiro:** Antes de qualquer página, configurar `globals.css` com todas as CSS variables. Nunca usar cores hardcoded, sempre `var(--nome-variavel)`.

2. **Dark mode é padrão:** O HTML/body deve ter `background: var(--bg-primary)` e `color: var(--text-primary)` desde o início.

3. **Fontes obrigatórias:** Importar Syne e DM Sans no `layout.tsx` raiz. Syne para todos os `h1`, `h2`, `h3`, `h4` e logo. DM Sans para tudo mais.

4. **Componentes shadcn:** Usar `npx shadcn@latest add [component]` para cada componente necessário, depois customizar com as CSS variables do projeto.

5. **Validação Zod + React Hook Form:** Todo formulário usa esses dois. Nunca validação manual.

6. **Prisma Client Singleton:** Criar `lib/prisma.ts` com o padrão singleton para evitar múltiplas instâncias em desenvolvimento.

7. **Sem exposição de dados sensíveis:** As API routes nunca retornam `password` ou `stripeCustomerId` para o frontend.

8. **Middleware de auth:** `middleware.ts` deve proteger todas as rotas `/dashboard`, `/company/*`, `/admin/*` verificando sessão e role.

9. **Skeleton loading em tudo:** Toda listagem que busca dados do servidor usa `Suspense` + skeleton para não travar a UI.

10. **Mobile first:** Todos os layouts devem funcionar em mobile. Sidebar vira drawer em telas menores que `lg`.

11. **Acessibilidade:** Todos os inputs têm `label` associado. Botões têm texto ou `aria-label`. Contraste mínimo WCAG AA.

12. **Ordenação de candidatos:** A função `rankCandidates()` DEVE ser aplicada em TODA listagem de alunos visível para empresas. Nunca retornar alunos em ordem aleatória ou por data de criação.

13. **Expiração de conta:** O AccountStatusBanner deve ser renderizado em TODOS os layouts do aluno. A verificação de `accountStatus` deve ser feita server-side no layout.

14. **E-mail de verificação obrigatório:** Nenhum aluno acessa o dashboard sem ter o e-mail verificado. Mostrar tela de "verifique seu e-mail" com botão de reenvio.

---

## 🔑 PROMPT DE INÍCIO PARA O CLAUDE CODE

Use este prompt ao iniciar o projeto:

```
Você vai construir o Stagium, uma plataforma de conexão entre estudantes universitários e empresas que buscam estagiários. Siga o documento técnico ao pé da letra.

REGRAS ABSOLUTAS:
- Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Prisma + PostgreSQL + NextAuth v5
- Design: Dark mode obrigatório, paleta com --bg-primary: #0A0F1E, --accent-lime: #C8F135, fontes Syne (display) + DM Sans (body)
- Nunca usar cores hardcoded — apenas CSS variables
- Nunca criar página sem responsividade mobile
- Sempre validar formulários com Zod

INÍCIO:
1. Criar o projeto com create-next-app
2. Configurar globals.css com todas as CSS variables
3. Configurar tailwind.config.ts com cores e fontes customizadas
4. Instalar todas as dependências do package.json
5. Criar o schema.prisma completo
6. Rodar a migration inicial
7. Criar o seed com dados iniciais
8. Implementar o NextAuth
9. Criar o middleware de proteção de rotas
10. Partir para a Landing Page

Não avance para a próxima fase sem a anterior estar completa e funcionando.
```

---

*Documento gerado para uso com Claude Code. Versão 1.0 — Stagium Platform*
