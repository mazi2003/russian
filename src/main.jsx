import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #020617 0%, #111827 100%)',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem'
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '2rem',
          background: 'rgba(15, 23, 42, 0.85)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
        }}
      >
        <p style={{ margin: '0 0 0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#818cf8' }}>
          Russian with Mazi
        </p>
        <h1 style={{ margin: '0 0 0.75rem', fontSize: '2rem' }}>The app is loading correctly.</h1>
        <p style={{ margin: 0, lineHeight: 1.7, color: '#cbd5e1' }}>
          This page is now mounted through Vite’s React entry point so it renders properly on Vercel.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
