import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const STUDENT_ROUTES = ['/dashboard', '/profile', '/proposals', '/subscription'];
const COMPANY_ROUTES = ['/company'];
const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/login', '/register'];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;
  const role = (session?.user as any)?.role;
  const isLoggedIn = !!session?.user;

  // Se logado tentando acessar login/register → redireciona ao dashboard
  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    const dest = role === 'COMPANY' ? '/company/dashboard' : role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
    return NextResponse.redirect(new URL(dest, nextUrl));
  }

  // Rotas protegidas para aluno
  if (STUDENT_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', nextUrl));
    if (role !== 'STUDENT' && role !== 'ADMIN')
      return NextResponse.redirect(new URL('/', nextUrl));
  }

  // Rotas protegidas para empresa
  if (COMPANY_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', nextUrl));
    if (role !== 'COMPANY' && role !== 'ADMIN')
      return NextResponse.redirect(new URL('/', nextUrl));
  }

  // Rotas admin
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', nextUrl));
    if (role !== 'ADMIN') return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
