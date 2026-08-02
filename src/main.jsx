import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const cases = [
  {
    id: 1,
    name: 'Именительный',
    short: 'Nominative',
    arabic: 'الرفع',
    question: 'Кто? Что?',
    description: 'للتحدث عن الفاعل أو موضوع الجملة.',
    example: 'Мама читает книгу.',
    accent: '#60a5fa'
  },
  {
    id: 2,
    name: 'Родительный',
    short: 'Genitive',
    arabic: 'الجر',
    question: 'Кого? Чего?',
    description: 'للتعبير عن الملكية أو النفي أو الجزء.',
    example: 'Нет книги у Миши.',
    accent: '#34d399'
  },
  {
    id: 3,
    name: 'Дательный',
    short: 'Dative',
    arabic: 'الإعطاء',
    question: 'Кому? Чему?',
    description: 'للدلالة على المفعول إليه أو الفائدة.',
    example: 'Я дал другу книгу.',
    accent: '#f59e0b'
  },
  {
    id: 4,
    name: 'Винительный',
    short: 'Accusative',
    arabic: 'المفعول',
    question: 'Кого? Что?',
    description: 'للدلالة على الشيء المباشر الذي تتلقاه الفعل.',
    example: 'Я вижу дом.',
    accent: '#f472b6'
  },
  {
    id: 5,
    name: 'Творительный',
    short: 'Instrumental',
    arabic: 'الآلة/الوسيلة',
    question: 'Кем? Чем?',
    description: 'للتعبير عن الأداة أو الشريك أو الطريقة.',
    example: 'Я пишу ручкой.',
    accent: '#a78bfa'
  },
  {
    id: 6,
    name: 'Предложный',
    short: 'Prepositional',
    arabic: 'الظرفي',
    question: 'О ком? О чём?',
    description: 'للدلالة على المكان أو الموضوع أو الكلام.',
    example: 'Я говорю о школе.',
    accent: '#fb923c'
  }
];

function App() {
  const [activeCaseId, setActiveCaseId] = useState(cases[0].id);
  const activeCase = cases.find((item) => item.id === activeCaseId) || cases[0];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020617 0%, #111827 100%)',
        color: '#f8fafc',
        fontFamily: 'Cairo, Tajawal, system-ui, sans-serif',
        padding: '2rem',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '32px',
          padding: '2rem',
          background: 'rgba(15, 23, 42, 0.88)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.35)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: '0 0 0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#818cf8' }}>
              Russian with Mazi
            </p>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>دليل الحالات الروسية بصري وتفاعلي</h1>
          </div>
          <div style={{ border: '1px solid rgba(129,140,248,0.35)', borderRadius: '999px', padding: '0.6rem 1rem', color: '#cbd5e1' }}>
            عربي • Русский • English
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {cases.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCaseId(item.id)}
              style={{
                border: item.id === activeCase.id ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '18px',
                padding: '1rem',
                textAlign: 'right',
                background: item.id === activeCase.id ? 'rgba(129, 140, 248, 0.16)' : 'rgba(15, 23, 42, 0.7)',
                color: '#f8fafc',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{ color: item.accent, fontWeight: 700 }}>{item.short}</div>
              <div style={{ marginTop: '0.35rem', fontSize: '1.05rem', fontWeight: 700 }}>{item.name}</div>
              <div style={{ marginTop: '0.25rem', color: '#cbd5e1' }}>{item.arabic}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', borderRadius: '24px', padding: '1.5rem', background: 'rgba(2, 6, 23, 0.72)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: activeCase.accent, fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {activeCase.short}
          </div>
          <h2 style={{ margin: '0.35rem 0 0.5rem', fontSize: '1.6rem' }}>{activeCase.name}</h2>
          <p style={{ margin: '0 0 0.75rem', color: '#cbd5e1', lineHeight: 1.8 }}>{activeCase.description}</p>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ color: '#818cf8', fontWeight: 700 }}>السؤال</div>
              <div style={{ marginTop: '0.35rem', fontSize: '1.15rem', fontWeight: 700 }}>{activeCase.question}</div>
            </div>
            <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ color: '#818cf8', fontWeight: 700 }}>مثال</div>
              <div style={{ marginTop: '0.35rem', fontSize: '1.15rem', fontWeight: 700 }}>{activeCase.example}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
