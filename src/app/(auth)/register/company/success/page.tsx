import Link from 'next/link';
import { Clock, Building2 } from 'lucide-react';

export default function CompanySuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '3rem', textAlign: 'center' }}>
        <div style={{ width: '4rem', height: '4rem', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Building2 size={28} color="var(--accent-sky)" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Cadastro enviado!
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Recebemos o cadastro da sua empresa. Nossa equipe irá verificar as informações em até 24 horas.
        </p>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '2rem', textAlign: 'left' }}>
          <Clock size={18} color="var(--accent-sky)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '0.95rem' }}>Aguardando verificação</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Você receberá um e-mail quando seu cadastro for aprovado. Após aprovação, poderá publicar vagas e buscar candidatos.
            </p>
          </div>
        </div>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-sky)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '8px', width: '100%' }}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
