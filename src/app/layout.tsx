import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stagium — Seu próximo passo começa aqui',
  description:
    'Plataforma de conexão entre estudantes universitários e empresas que buscam estagiários.',
  keywords: ['estágio', 'estudantes', 'empresas', 'universidade', 'carreira'],
  openGraph: {
    title: 'Stagium',
    description: 'Seu próximo passo começa aqui.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
