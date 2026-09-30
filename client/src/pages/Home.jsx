import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Notice from '../components/Notice';
import Seo from '../components/Seo';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Home() {
  const { t } = useLanguage();
  const [yatra, setYatra] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get('/operations/yatra').then(res => setYatra(res.data.status)).catch(console.error);
    api.get('/operations/announcements').then(res => setAnnouncements(res.data.announcements)).catch(console.error);
  }, []);
  return (
    <>
      <Seo />
      
      {/* Hero Section */}
      <section className="hero" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 20px' }}>
        <div className="shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', margin: '10px 0', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            SAILEELA PALKHI
          </h1>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 20px', color: '#f3c76e', fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
            मुंबई → शिर्डी
          </h2>
          <p className="hero-copy" style={{ fontSize: '1.6rem', margin: '15px auto 40px', fontWeight: '800', letterSpacing: '0.1em' }}>
            श्रद्धा • सबुरी • सेवा
          </p>
          <div className="actions" style={{ justifyContent: 'center', gap: '20px' }}>
            <Link className="button primary" to="/register" style={{ fontSize: '1.2rem', padding: '16px 36px', borderRadius: '4px' }}>JOIN PALKHI</Link>
            <Link className="button outline" to="/donate" style={{ fontSize: '1.2rem', padding: '16px 36px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>DONATE</Link>
          </div>
        </div>
      </section>

      {/* Live Yatra Status */}
      <section className="section" style={{ background: '#321a18', color: '#fffaf1', textAlign: 'center' }}>
        <div className="shell">
          <p className="eyebrow" style={{ color: '#f3c76e', fontSize: '1rem', letterSpacing: '0.2em' }}>🔴 YATRA LIVE</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', fontSize: '1.6rem', fontWeight: '800', marginTop: '40px' }}>
            {yatra?.isLive ? (
              <>
                <div style={{ background: 'rgba(243, 199, 110, 0.1)', padding: '24px 40px', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(243,199,110,0.2)' }}>
                  <span style={{ fontSize: '0.9rem', color: '#f3c76e', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Location (Day {yatra.currentDay || 1})</span>
                  {yatra.currentLocation || 'Updating...'}
                </div>
                <div style={{ color: '#f3c76e', fontSize: '1.2rem' }}>↓</div>
                <div style={{ background: 'rgba(243, 199, 110, 0.1)', padding: '24px 40px', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(243,199,110,0.2)' }}>
                  <span style={{ fontSize: '0.9rem', color: '#f3c76e', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next Halt</span>
                  {yatra.nextLocation || 'Updating...'}
                </div>
                <div style={{ color: '#f3c76e', fontSize: '1.2rem' }}>↓</div>
                <div style={{ background: 'rgba(243, 199, 110, 0.25)', padding: '24px 40px', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '2px solid #f3c76e', color: '#f3c76e' }}>
                  Shirdi
                </div>
              </>
            ) : (
              <div style={{ background: 'rgba(243, 199, 110, 0.1)', padding: '24px 40px', borderRadius: '16px', border: '1px solid rgba(243,199,110,0.2)' }}>
                <p style={{ margin: 0, fontSize: '1.2rem', color: '#f3c76e' }}>Yatra has not commenced yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <section className="section" style={{ background: '#fff9ec', borderBottom: '1px solid #dfc9a7' }}>
          <div className="shell">
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '30px' }}>TODAY'S UPDATE</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '700px', margin: '0 auto' }}>
              {announcements.map(ann => (
                <div key={ann._id} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #dfc9a7', borderLeft: ann.priority === 'high' ? '4px solid #a83226' : '4px solid #c59a4b', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {ann.pinned ? '📌 ' : ''}{ann.title}
                    {ann.priority === 'high' && <span style={{ fontSize: '0.8rem', background: '#a83226', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>URGENT</span>}
                  </h3>
                  <p style={{ margin: 0, color: '#3c1f1b', fontSize: '1.05rem', lineHeight: '1.6' }}>{ann.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Walk With Sai */}
      <section className="section paper" style={{ textAlign: 'center' }}>
        <div className="shell">
          <p className="eyebrow">WALK WITH SAI</p>
          
          <div className="cards" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px', marginTop: '40px' }}>
            <Link className="card" to="/schedule" style={{ flex: '1', minWidth: '280px', textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Palkhi</h3>
              <p className="muted">Walk alongside the divine chariot</p>
            </Link>
            <Link className="card" to="/seva" style={{ flex: '1', minWidth: '280px', textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Seva</h3>
              <p className="muted">Serve the devotees and society</p>
            </Link>
            <div className="card" style={{ flex: '1', minWidth: '280px', textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Bhajan</h3>
              <p className="muted">Sing praises of Sai</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Timeline */}
      <section className="section" style={{ textAlign: 'center', background: '#fffdf8' }}>
        <div className="shell">
          <p className="eyebrow">THE JOURNEY</p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '800px', margin: '60px auto', fontSize: '1.4rem', fontWeight: '800', color: '#a83226', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '4px', background: '#dfc9a7', zIndex: 0, transform: 'translateY(-50%)' }}></div>
            <span style={{ background: '#fffdf8', padding: '0 15px', zIndex: 1, color: '#3c1f1b' }}>Mumbai</span>
            <span style={{ background: '#fffdf8', padding: '0 10px', zIndex: 1, color: '#dfc9a7', fontSize: '1.2rem' }}>●</span>
            <span style={{ background: '#fffdf8', padding: '0 10px', zIndex: 1, color: '#dfc9a7', fontSize: '1.2rem' }}>●</span>
            <span style={{ background: '#fffdf8', padding: '0 10px', zIndex: 1, color: '#dfc9a7', fontSize: '1.2rem' }}>●</span>
            <span style={{ background: '#fffdf8', padding: '0 10px', zIndex: 1, color: '#dfc9a7', fontSize: '1.2rem' }}>●</span>
            <span style={{ background: '#fffdf8', padding: '0 15px', zIndex: 1, color: '#a83226' }}>Shirdi</span>
          </div>
        </div>
      </section>

      {/* Seva Icons */}
      <section className="section paper" style={{ textAlign: 'center' }}>
        <div className="shell">
          <p className="eyebrow">SUPPORT SEVA</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '3.5rem', margin: '40px 0', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
            <span title="Jal Seva">💧</span>
            <span title="Annadan">🍚</span>
            <span title="Medical Seva">🩺</span>
            <span title="General Seva">🙏</span>
          </div>
          <Link className="button primary" to="/donate" style={{ fontSize: '1.1rem', padding: '14px 32px' }}>₹ Donate Now</Link>
        </div>
      </section>

      {/* Closing Mantra */}
      <section className="section" style={{ textAlign: 'center', padding: '60px 0' }}>
        <div className="shell">
          <h2 style={{ color: '#a83226', fontSize: '3rem', margin: 0, fontFamily: '"Noto Serif Devanagari", serif' }}>ॐ साई राम</h2>
        </div>
      </section>
    </>
  );
}
