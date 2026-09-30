import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Notice from '../components/Notice';
import { siteApi } from '../services/api';

const sevaItems = [
  ['💧', 'Jal Seva', 'Providing drinking water, ORS, and hydration support to thousands of devotees walking under the sun.'],
  ['🍚', 'Annadan Seva', 'Fresh, hot meals served thrice a day (Breakfast, Lunch, Dinner) along the route for all padayatris.'],
  ['🩺', 'Arogya Seva', 'Mobile medical vans with doctors, physiotherapists, and first-aid for blisters, cramps, and emergencies.'],
  ['🛏️', 'Vishranti Seva', 'Arranging massive pandals, waterproof tents, and sleeping mats at every night halt for peaceful rest.'],
  ['🙏', 'Volunteer Seva', 'Dedicated karyakartas managing traffic, discipline, and assisting senior citizen devotees.'],
  ['🧹', 'Swachhata Seva', 'Eco-friendly disposal teams ensuring the route and halt locations are left cleaner than we found them.']
];

const itinerary = [
  { day: 1, route: 'Lalbaug, Mumbai to Thane', distance: '32 km', stay: 'Thane Municipal Ground' },
  { day: 2, route: 'Thane to Bhiwandi', distance: '18 km', stay: 'Bhiwandi Naka Pandal' },
  { day: 3, route: 'Bhiwandi to Padgha', distance: '22 km', stay: 'Padgha Village School' },
  { day: 4, route: 'Padgha to Shahapur', distance: '28 km', stay: 'Shahapur Maidan' },
  { day: 5, route: 'Shahapur to Kasara', distance: '25 km', stay: 'Kasara Ghat Base Camp' },
  { day: 6, route: 'Kasara to Igatpuri (Ghat Crossing)', distance: '18 km', stay: 'Igatpuri Railway Ground' },
  { day: 7, route: 'Igatpuri to Ghoti', distance: '12 km', stay: 'Ghoti Market Yard' },
  { day: 8, route: 'Ghoti to Nashik', distance: '35 km', stay: 'Panchavati, Nashik' },
  { day: 9, route: 'Nashik to Sinnar', distance: '30 km', stay: 'Sinnar MIDC Ground' },
  { day: 10, route: 'Sinnar to Pangri', distance: '25 km', stay: 'Pangri ZP School' },
  { day: 11, route: 'Pangri to Shirdi', distance: '15 km', stay: 'Shirdi Prasadalaya Ground (Arrival)' },
];

const faqs = [
  ['What is Saileela Palkhi?', 'Saileela Palkhi is an annual 250+ km Padyatra (foot pilgrimage) starting from Lalbaug, Mumbai, ending at the holy shrine of Shri Sai Baba in Shirdi.'],
  ['How many days does the journey take?', 'The journey typically takes 11 to 15 days depending on the weather and the pace of the Palkhi chariot.'],
  ['Is there an age limit to participate?', 'No, but we highly recommend that children under 12 and senior citizens with health conditions consult a doctor before undertaking this strenuous 250km walk.'],
  ['Where do we sleep and eat?', 'The Saileela Mandal provides massive waterproof pandals for night halts and serves fresh Annadan (meals) 3 times a day completely free of cost.'],
  ['What about my heavy luggage?', 'We provide luggage trucks (Samaan Gaadi). You only need to carry a small day-pack with your water bottle, medicines, and ID while walking. Your heavy bags will meet you at the night halt.'],
  ['What should I carry?', 'Carry 2 pairs of comfortable walking shoes (already broken in), cotton socks, ORS packets, personal medicines, raincoats/umbrellas, and light cotton clothing.'],
  ['Is there medical help available?', 'Yes, 3 mobile ambulances and a team of physiotherapists travel with the Palkhi 24/7 to treat blisters, muscle cramps, and emergencies.'],
];

export function About() { 
  return (
    <>
      <PageHeader title="About Saileela Palkhi">श्रद्धा • सबुरी • सेवा</PageHeader>
      
      <section className="section">
        <div className="shell split">
          <div>
            <p className="eyebrow">OUR STORY & HERITAGE</p>
            <h2>To walk with Sai</h2>
          </div>
          <div className="rich-copy">
            <p>For over two decades, the Saileela Palkhi has been a beacon of faith, discipline, and communal harmony. Originating from the vibrant streets of Lalbaug, Mumbai, this annual Padyatra to Shirdi is not just a physical journey of 250 kilometers—it is a spiritual transformation.</p>
            <p>What started as a small group of devoted friends walking to Shirdi with a photo of Shri Sai Baba has now blossomed into a massive procession of thousands of padayatris (foot-pilgrims). Cutting across caste, creed, and economic status, doctors walk beside daily-wage earners, and business owners serve food to students.</p>
            <p>Braving the intense heat of the highways, the torrential rains of the Kasara Ghats, and the physical exhaustion of walking 25-30 kilometers every day, the devotees are fueled by one single chant: <strong>"Om Sai Ram."</strong></p>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">OUR CORE PHILOSOPHY</p>
            <h2>Shraddha and Saburi</h2>
          </div>
          <div className="belief-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <article style={{ background: '#fff', padding: '30px', borderTop: '4px solid #c59a4b' }}>
              <span style={{ fontSize: '2rem', color: '#a83226', fontWeight: 'bold' }}>श्रद्धा</span>
              <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>Faith (Shraddha)</h3>
              <p>Complete, unwavering surrender to the Guru. When blisters form and muscles give up, it is Shraddha that takes the next step.</p>
            </article>
            <article style={{ background: '#fff', padding: '30px', borderTop: '4px solid #c59a4b' }}>
              <span style={{ fontSize: '2rem', color: '#a83226', fontWeight: 'bold' }}>सबुरी</span>
              <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>Patience (Saburi)</h3>
              <p>The endurance to weather the storms. Saburi is the quiet strength that teaches us to serve others before ourselves during the yatra.</p>
            </article>
          </div>
          <p className="marathi-line" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#a83226' }}>"श्रद्धा ठेवा. सबुरी ठेवा. साईवर विश्वास ठेवा."</p>
        </div>
      </section>
    </>
  ); 
}

export function Schedule() { 
  return (
    <>
      <PageHeader title="Mumbai to Shirdi Route">
        <strong>Lalbaug, Mumbai → Shirdi, Maharashtra</strong><br/>
        A 250+ KM test of endurance and devotion.
      </PageHeader>
      
      <section className="section paper">
        <div className="shell">
          <div className="route-band" style={{ marginBottom: '40px' }}>
            <strong>Lalbaug, Mumbai</strong><span>→</span><strong>Shirdi</strong>
          </div>
          
          <h2>Standard 11-Day Padyatra Itinerary</h2>
          <p className="muted" style={{ marginBottom: '30px' }}>Note: Dates and halts are subject to weather conditions and local police permissions.</p>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {itinerary.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', background: '#fff', padding: '20px', border: '1px solid #dfc9a7', borderRadius: '8px' }}>
                <div style={{ color: '#c59a4b', fontWeight: 'bold', fontSize: '1.2rem', borderRight: '2px solid #f4ead8' }}>Day {item.day}</div>
                <div style={{ paddingLeft: '20px' }}>
                  <h3 style={{ margin: '0 0 5px', color: '#a83226' }}>{item.route}</h3>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#765f55' }}>
                    <span><strong>Distance:</strong> {item.distance}</span>
                    <span><strong>Night Halt:</strong> {item.stay}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  ); 
}

export function Gallery() { 
  const [items, setItems] = useState([]); 
  useEffect(() => { 
    siteApi.content().then(({ data }) => setItems(data.gallery || [])).catch(() => {}); 
  }, []); 
  
  return (
    <>
      <PageHeader title="Moments of Sai Leela">Every photograph is a memory of faith.</PageHeader>
      <section className="section">
        <div className="shell">
          {items.length ? (
            <div className="gallery">
              {items.map((item) => (
                <figure key={item._id}>
                  <img src={item.imagePath} alt={item.altText || item.title}/>
                  <figcaption>{item.title}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <>
              <div className="gallery-topics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {['Palkhi Sohala', 'Kasara Ghat Padyatra', 'Maha Aarti', 'Annadan Seva', 'Medical Camps', 'Shirdi Arrival', 'Devotee Stories'].map((topic) => (
                  <article className="card" key={topic} style={{ background: '#fffaf1', padding: '30px', textAlign: 'center', border: '1px solid #dfc9a7' }}>
                    <h3 style={{ color: '#a83226' }}>{topic}</h3>
                    <p className="muted">Gallery album is being compiled and will be published shortly.</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  ); 
}

export function Seva() { 
  return (
    <>
      <PageHeader title="Seva">Seva is the heart of the journey.</PageHeader>
      <section className="section">
        <div className="shell section-heading">
          <p className="eyebrow">THE SPIRIT OF GIVING</p>
          <h2>From devotion to service</h2>
        </div>
        <div className="shell seva-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {sevaItems.map(([icon, title, description]) => (
            <article className="seva-card" key={title} style={{ background: '#fff', padding: '30px', border: '1px solid #dfc9a7', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '15px' }}>{icon}</span>
              <h3 style={{ color: '#a83226', margin: '0 0 10px' }}>{title}</h3>
              <p style={{ margin: 0, color: '#765f55', lineHeight: '1.6' }}>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  ); 
}

export function Committee() { 
  const members = [
    { name: 'Shri. Rameshwar Kadam', role: 'President', desc: 'Guiding the Palkhi vision for over 15 years.' },
    { name: 'Shri. Santosh Desai', role: 'Vice President', desc: 'Handling state police and municipal permissions.' },
    { name: 'Smt. Vaishali Shinde', role: 'Head of Annadan', desc: 'Managing the kitchen trucks and daily meals for 5000+ devotees.' },
    { name: 'Dr. Anand Joshi', role: 'Chief Medical Officer', desc: 'Leading the mobile ambulance and physiotherapy teams.' },
    { name: 'Shri. Prakash Mhatre', role: 'Route Coordinator', desc: 'Planning the safe passage through highways and Kasara Ghat.' },
  ];

  return (
    <>
      <PageHeader title="Core Committee">The invisible hands behind the massive execution.</PageHeader>
      <section className="section">
        <div className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {members.map(m => (
              <div key={m.name} style={{ background: '#fffaf1', padding: '25px', borderLeft: '4px solid #c59a4b', border: '1px solid #dfc9a7' }}>
                <h3 style={{ color: '#a83226', margin: '0 0 5px' }}>{m.name}</h3>
                <strong style={{ color: '#c59a4b', fontSize: '0.9rem', textTransform: 'uppercase' }}>{m.role}</strong>
                <p style={{ marginTop: '10px', color: '#555', fontSize: '0.95rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  ); 
}

export function FAQ() { 
  return (
    <>
      <PageHeader title="Frequently Asked Questions">Important information for padayatris walking with Sai.</PageHeader>
      <section className="section">
        <div className="shell faq-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map(([question, answer]) => (
            <details key={question} style={{ background: '#fff', marginBottom: '15px', border: '1px solid #dfc9a7', borderRadius: '6px', padding: '15px 20px', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#a83226' }}>{question}</summary>
              <p style={{ marginTop: '15px', lineHeight: '1.7', color: '#444' }}>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  ); 
}
