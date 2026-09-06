import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Notice from '../components/Notice';
import Seo from '../components/Seo';

const journeyMarks = ['Palkhi Darshan', 'Naam-smaran', 'Bhajans and devotional music', 'Dindi participation', 'Community meals and prasad', 'Drinking-water support', 'Medical assistance', 'Rest and support facilities', 'Collective seva', 'Devotional celebrations'];

export default function Home() {
  const { t } = useLanguage();
  return <><Seo/>
    <section className="hero"><div className="shell hero-content"><div><p className="eyebrow">SAILEELA PALKHI · श्रद्धा • सबुरी • सेवा</p><h1>{t('hero')}</h1><p className="hero-copy">Mumbai to Shirdi, with Sai's blessings. A devotional journey that brings Sai devotees together through faith, discipline, devotion and seva.</p><div className="actions"><Link className="button primary" to="/register">Join the Palkhi</Link><Link className="button outline" to="/register">Register as a Devotee</Link><Link className="button outline" to="/schedule">Track the Yatra</Link></div><p className="hero-note">ॐ साई राम 🙏</p></div><img className="hero-logo" src="/logo.png" alt="Saileela Palkhi Sai Baba logo"/></div></section>
    <section className="section"><div className="shell split"><div><p className="eyebrow">WELCOME TO SAILEELA PALKHI</p><h2>One Palkhi. Thousands of footsteps. One feeling: Sai.</h2></div><div className="rich-copy"><p>Saileela Palkhi represents the spirit of collective devotion.</p><p>Beginning from Mumbai, the Palkhi journey towards Shirdi brings Sai devotees together through padyatra, bhajan, naam-smaran, seva and fellowship.</p><p>It is not simply a journey from one city to another. It is a journey inward.</p><p>Every step carries faith. Every chant carries devotion. Every act of seva carries Sai's message.</p><p className="marathi-line">श्रद्धा आणि सबुरी घेऊन, साईंच्या चरणी.</p></div></div></section>
    <section className="section paper"><div className="shell"><div className="section-heading"><p className="eyebrow">THE JOURNEY TO SHIRDI</p><h2>From Mumbai to the sacred land of Shirdi</h2><p>From the streets of Mumbai to Shirdi, devotees walk together with the Palkhi, carrying the name and remembrance of Shri Sai Baba.</p></div><div className="pill-grid">{journeyMarks.map((item) => <span key={item}>{item}</span>)}</div><div className="route-band"><strong>Lalbaug, Mumbai</strong><span>→</span><strong>Shirdi, Maharashtra</strong></div></div></section>
    <section className="section"><div className="shell cards"><Link className="card" to="/schedule"><span>01</span><h3>Walk With Sai</h3><p>Follow the Palkhi, route announcements and verified live updates.</p></Link><Link className="card" to="/seva"><span>02</span><h3>Seva Is the Heart</h3><p>Support water, food, medical, rest, cleanliness and volunteer seva.</p></Link><Link className="card" to="/register"><span>03</span><h3>Register as a Devotee</h3><p>Create your registration and receive digital pass information where enabled.</p></Link></div></section>
    <section className="section paper"><div className="shell"><Notice title="Verified information policy">Annual route, halt locations, timings, donation details and live statistics are published only after confirmation from the authorized Saileela administration.</Notice></div></section>
  </>;
}
