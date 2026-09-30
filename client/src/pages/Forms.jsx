import { useState } from 'react';
import { dbtApi, enquiryApi, registrationApi } from '../services/api';
import PageHeader from '../components/PageHeader';
import Notice from '../components/Notice';

function FormShell({ title, intro, children, onSubmit, status }) { return <><PageHeader title={title}>{intro}</PageHeader><section className="section"><div className="shell form-card"><form onSubmit={onSubmit}>{children}<button className="button primary" type="submit">Submit</button>{status && <p className="form-status">{status}</p>}</form></div></section></>; }
const Field = ({ label, name, type = 'text', required = false }) => <label className="field"><span>{label}</span><input name={name} type={type} required={required}/></label>;
export function Registration() { 
  const [status, setStatus] = useState(''); 
  const [passData, setPassData] = useState(null);
  
  async function submit(event) { 
    event.preventDefault(); 
    const data = Object.fromEntries(new FormData(event.currentTarget)); 
    data.consent = true; 
    try { 
      const { data: result } = await registrationApi.create(data); 
      setPassData({
        reg: result.registration,
        pass: result.pass
      });
      setStatus('Registration successful.'); 
    } catch (error) { 
      setStatus(error.response?.data?.message || 'Registration failed.'); 
    } 
  } 

  if (passData) {
    return (
      <>
        <PageHeader title="Welcome to the Palkhi">Your digital pass is ready.</PageHeader>
        <section className="section" style={{ background: '#fff9ec' }}>
          <div className="shell" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(74,35,20,0.15)', maxWidth: '400px', width: '100%', border: '1px solid #dfc9a7' }}>
              <div style={{ background: 'linear-gradient(125deg, #4b1f19, #8f2d25, #d65a2a)', padding: '24px', textAlign: 'center', color: '#fff' }}>
                <h2 style={{ margin: '0 0 5px', fontSize: '1.6rem', color: '#f9e8cb' }}>SAILEELA PALKHI</h2>
                <p style={{ margin: 0, opacity: 0.9, letterSpacing: '2px', fontSize: '0.85rem' }}>OFFICIAL PADAYATRI PASS</p>
              </div>
              <div style={{ padding: '30px', textAlign: 'center' }}>
                <div style={{ background: '#fffaf1', padding: '15px', borderRadius: '12px', border: '1px solid #dfc9a7', marginBottom: '25px', display: 'inline-block' }}>
                  <img src={passData.pass.qrDataUrl} alt="QR Code" style={{ width: '180px', height: '180px', display: 'block' }} />
                </div>
                <h3 style={{ margin: '0 0 5px', fontSize: '1.5rem', color: '#3c1f1b' }}>{passData.reg.fullName}</h3>
                <p style={{ margin: '0 0 15px', color: '#765f55', fontWeight: 'bold' }}>{passData.reg.registrationNumber}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'left', background: '#fffdf8', padding: '15px', borderRadius: '8px', border: '1px dashed #dfc9a7' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#765f55', textTransform: 'uppercase' }}>Blood Group</span>
                    <strong style={{ color: '#a83226' }}>{passData.reg.bloodGroup || 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#765f55', textTransform: 'uppercase' }}>Pass ID</span>
                    <strong style={{ color: '#3c1f1b' }}>{passData.pass.passNumber}</strong>
                  </div>
                </div>
              </div>
              <div style={{ background: '#3c1f1b', padding: '15px', textAlign: 'center', color: '#f3c76e', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Om Sai Ram 🙏
              </div>
            </div>
          </div>
          <div className="shell" style={{ textAlign: 'center', marginTop: '30px' }}>
            <button className="button outline" onClick={() => window.print()}>Save / Print Pass</button>
          </div>
        </section>
      </>
    );
  }

  return <><PageHeader title="Walk With the Palkhi">Register as a devotee for the Saileela Palkhi Padyatra.</PageHeader><section className="section"><div className="shell split"><div><h2>Registration includes</h2><ul><li>Devotee details</li><li>Emergency contact</li><li>Participation information</li><li>Digital registration/pass information where applicable</li></ul><Notice>Personal details should be accurate, and emergency contacts should be reachable.</Notice></div><div className="form-card"><form onSubmit={submit}><div className="form-grid"><Field label="Full name" name="fullName" required/><Field label="Mobile number" name="phone" required/><Field label="Email" name="email" type="email"/><Field label="Emergency contact" name="emergencyContact"/><Field label="Address" name="address"/><Field label="Blood group" name="bloodGroup"/><Field label="Date of birth" name="dateOfBirth" type="date"/></div><label className="consent"><input type="checkbox" required/> I confirm that my details are accurate and I will follow Palkhi guidelines.</label><button className="button primary" type="submit">Register as Devotee</button>{status && <p className="form-status">{status}</p>}</form></div></div></section></>; 
}
export function VerifyPass() { const [result, setResult] = useState(null); async function submit(event) { event.preventDefault(); const number = new FormData(event.currentTarget).get('passNumber'); try { const response = await registrationApi.verify(number); setResult(response.data); } catch (error) { setResult({ message: error.response?.data?.message || 'Pass not found.' }); } } return <><PageHeader title="Verify Palkhi Pass">Verify an issued pass through the official Saileela website.</PageHeader><section className="section"><div className="shell form-card"><form onSubmit={submit}><Field label="Pass number" name="passNumber" required/><button className="button primary" type="submit">Verify Pass</button></form>{result && <div className="notice"><strong>{result.success ? result.pass.registration.fullName : 'Verification result'}</strong><p>{result.success ? result.pass.passNumber : result.message}</p></div>}</div></section></>; }

export function VolunteerRegistration() {
  const [status, setStatus] = useState('');

  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      // POST to /api/operations/volunteers
      const response = await fetch('/api/operations/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Volunteer application submitted successfully! We will contact you soon.');
        event.target.reset();
      } else {
        setStatus(result.message || 'Submission failed.');
      }
    } catch (error) {
      setStatus('Could not submit application.');
    }
  }

  return (
    <>
      <PageHeader title="Seva Registration">Become a volunteer for the Saileela Palkhi.</PageHeader>
      <section className="section">
        <div className="shell split">
          <div>
            <h2>Seva Karaychi Aahe?</h2>
            <p>Join the dedicated team of volunteers who make the Palkhi journey possible. From serving food to medical assistance, every hand helps.</p>
            <ul>
              <li>Annadan (Food Service)</li>
              <li>Arogya (Medical)</li>
              <li>Swachhata (Cleanliness)</li>
              <li>Traffic & Crowd Control</li>
            </ul>
            <Notice>Volunteer approval is subject to committee verification.</Notice>
          </div>
          <div className="form-card">
            <form onSubmit={submit}>
              <div className="form-grid">
                <Field label="Full name" name="name" required />
                <Field label="Mobile number" name="phone" required />
                <Field label="Email" name="email" type="email" />
                <Field label="Age" name="age" type="number" required />
                <Field label="City" name="city" required />
                <label className="field">
                  <span>Preferred Seva Category</span>
                  <select name="sevaCategory" style={{ width: '100%', padding: '12px', border: '1px solid #dfc9a7', background: '#fffdf8' }} required>
                    <option value="Annadan">Annadan Seva</option>
                    <option value="Medical">Medical Seva</option>
                    <option value="Water">Jal Seva</option>
                    <option value="Crowd management">Crowd Management</option>
                    <option value="Cleanliness">Cleanliness (Swachhata)</option>
                    <option value="General">General Seva</option>
                  </select>
                </label>
                <Field label="Emergency Contact" name="emergencyContact" required />
                <Field label="Availability (e.g. Full 11 days, Weekends)" name="availability" required />
              </div>
              <button className="button primary" type="submit" style={{ marginTop: '20px' }}>Apply as Volunteer</button>
              {status && <p className="form-status" style={{ marginTop: '15px' }}>{status}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export function Contact() { const [status, setStatus] = useState(''); async function submit(event) { event.preventDefault(); try { await enquiryApi.contact(Object.fromEntries(new FormData(event.currentTarget))); setStatus('Message received.'); } catch (error) { setStatus(error.response?.data?.message || 'Could not send message.'); } } return <FormShell title="Connect With Saileela" intro="Use the official enquiry form for participation, registration, volunteering and seva questions." onSubmit={submit} status={status}><div className="form-grid"><Field label="Name" name="name" required/><Field label="Mobile" name="phone" required/><Field label="Email" name="email" type="email"/><label className="field full"><span>Message</span><textarea name="message" required/></label></div><p className="muted">Official email, phone, office address and social links will be displayed after verification.</p></FormShell>; }
export function Advertisement() { const [status, setStatus] = useState(''); async function submit(event) { event.preventDefault(); try { await enquiryApi.advertisement(Object.fromEntries(new FormData(event.currentTarget))); setStatus('Enquiry received.'); } catch (error) { setStatus(error.response?.data?.message || 'Could not send enquiry.'); } } return <><PageHeader title="Partnership enquiry">No verified sponsorship rate card is configured.</PageHeader><section className="section"><div className="shell"><Notice/><div className="form-card"><form onSubmit={submit}><div className="form-grid"><Field label="Name" name="name" required/><Field label="Mobile" name="phone" required/><Field label="Email" name="email" type="email"/><label className="field full"><span>Message</span><textarea name="message"/></label></div><button className="button primary">Send enquiry</button><p>{status}</p></form></div></div></section></>; }
export function DBT() { const [status, setStatus] = useState(''); async function submit(event) { event.preventDefault(); const form = new FormData(event.currentTarget); try { await dbtApi.submit(form); setStatus('Receipt submitted for review.'); } catch (error) { setStatus(error.response?.data?.message || 'Upload failed.'); } } return <><PageHeader title="Direct bank transfer">Contribute only through bank details published by authorized Saileela administration.</PageHeader><section className="section"><div className="shell"><Notice>Official bank details are not currently configured. Never transfer money using old documents or unverified accounts.</Notice><div className="form-card"><form onSubmit={submit} encType="multipart/form-data"><div className="form-grid"><Field label="Donor name" name="donorName" required/><Field label="Mobile" name="phone" required/><Field label="Email" name="email" type="email"/><Field label="Amount" name="amount" type="number" required/><Field label="Transaction reference" name="transactionReference" required/><label className="field"><span>Proof</span><input name="proof" type="file" accept=".jpg,.jpeg,.png,.pdf" required/></label></div><button className="button primary">Upload receipt</button><p>{status}</p></form></div></div></section></>; }
export function Tshirt() { return <><PageHeader title="Merchandise">No verified Saileela merchandise catalogue is configured.</PageHeader><section className="section"><div className="shell"><Notice>Old products, pricing and pickup instructions have been removed until an official catalogue is supplied.</Notice></div></section></>; }
