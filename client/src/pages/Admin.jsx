import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  async function submit(event) {
    event.preventDefault();
    try {
      await login(Object.fromEntries(new FormData(event.currentTarget)));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  }
  
  if (user) return <Navigate to="/admin" />;
  
  return (
    <>
      <PageHeader title="Admin sign in">Saileela Management Console</PageHeader>
      <section className="section">
        <form className="shell form-card narrow" onSubmit={submit}>
          <label className="field">
            <span>Username</span>
            <input name="username" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input name="password" type="password" required />
          </label>
          <button className="button primary">Sign in</button>
          <p>{error}</p>
        </form>
      </section>
    </>
  );
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({ donations: [], announcements: [], yatra: null, volunteers: [], gallery: [] });
  const [error, setError] = useState('');

  if (!user) return <Navigate to="/admin/login" />;

  useEffect(() => {
    loadData();
  }, [activeTab]);

  async function loadData() {
    try {
      if (activeTab === 'overview') {
        const res = await api.get('/donations');
        setData(d => ({ ...d, donations: res.data.donations || [] }));
      } else if (activeTab === 'yatra') {
        const res = await api.get('/operations/yatra');
        setData(d => ({ ...d, yatra: res.data.status }));
      } else if (activeTab === 'announcements') {
        const res = await api.get('/operations/announcements');
        setData(d => ({ ...d, announcements: res.data.announcements || [] }));
      } else if (activeTab === 'volunteers') {
        const res = await api.get('/operations/volunteers');
        setData(d => ({ ...d, volunteers: res.data.volunteers || [] }));
      } else if (activeTab === 'gallery') {
        const res = await api.get('/operations/gallery');
        setData(d => ({ ...d, gallery: res.data.gallery || [] }));
      }
    } catch (err) {
      setError('Could not load data.');
    }
  }

  async function updateYatra(e) {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(e.currentTarget));
      payload.isLive = payload.isLive === 'on';
      await api.post('/operations/yatra', payload);
      alert('Yatra Status Updated');
      loadData();
    } catch(err) {
      alert('Failed to update');
    }
  }

  async function createAnnouncement(e) {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(e.currentTarget));
      payload.published = payload.published === 'on';
      payload.pinned = payload.pinned === 'on';
      await api.post('/operations/announcements', payload);
      alert('Announcement created');
      e.target.reset();
      loadData();
    } catch(err) {
      alert('Failed to create');
    }
  }

  async function updateVolunteerStatus(id, newStatus) {
    try {
      await api.patch(`/operations/volunteers/${id}`, { status: newStatus });
      loadData();
    } catch(err) {
      alert('Failed to update status');
    }
  }

  async function uploadImage(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      await api.post('/operations/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Image uploaded successfully');
      e.target.reset();
      loadData();
    } catch(err) {
      alert('Upload failed');
    }
  }

  async function toggleGallery(id) {
    try {
      await api.patch(`/operations/gallery/${id}`);
      loadData();
    } catch(err) {
      alert('Failed to update status');
    }
  }

  return (
    <>
      <PageHeader title="Saileela CMS">Central Command & Live Operations</PageHeader>
      <section className="section">
        <div className="shell admin-grid">
          <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ fontWeight: activeTab === 'overview' ? 'bold' : 'normal', textAlign: 'left', padding: '12px' }} onClick={() => setActiveTab('overview')}>Dashboard Overview</button>
            <button style={{ fontWeight: activeTab === 'yatra' ? 'bold' : 'normal', textAlign: 'left', padding: '12px' }} onClick={() => setActiveTab('yatra')}>Yatra Live Control</button>
            <button style={{ fontWeight: activeTab === 'announcements' ? 'bold' : 'normal', textAlign: 'left', padding: '12px' }} onClick={() => setActiveTab('announcements')}>Announcements</button>
            <button style={{ fontWeight: activeTab === 'volunteers' ? 'bold' : 'normal', textAlign: 'left', padding: '12px' }} onClick={() => setActiveTab('volunteers')}>Volunteer Approvals</button>
            <button style={{ fontWeight: activeTab === 'gallery' ? 'bold' : 'normal', textAlign: 'left', padding: '12px' }} onClick={() => setActiveTab('gallery')}>Gallery CMS</button>
            <button onClick={logout} style={{ marginTop: '20px', color: '#a83226', textAlign: 'left', padding: '12px' }}>Sign out</button>
          </aside>
          
          <div className="admin-content">
            {error && <p style={{color: '#a83226'}}>{error}</p>}
            
            {activeTab === 'overview' && (
              <div className="form-card">
                <h2>Donations</h2>
                <div className="stats" style={{ marginBottom: '20px' }}>
                  <div><strong>{data.donations.length}</strong><span>Total Donations</span></div>
                </div>
                {data.donations.length ? (
                  <table>
                    <thead><tr><th>Receipt</th><th>Donor</th><th>Amount</th><th>Status</th></tr></thead>
                    <tbody>
                      {data.donations.map((item) => (
                        <tr key={item._id}>
                          <td>{item.receiptNumber}</td><td>{item.donorName}</td><td>₹{item.amount}</td><td>{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : <p className="muted">No donations found.</p>}
              </div>
            )}

            {activeTab === 'yatra' && (
              <div className="form-card">
                <h2>Yatra Control Center</h2>
                <form onSubmit={updateYatra} style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
                  <label className="field"><span>Current Day</span><input name="currentDay" type="number" defaultValue={data.yatra?.currentDay} /></label>
                  <label className="field"><span>Current Location</span><input name="currentLocation" defaultValue={data.yatra?.currentLocation} /></label>
                  <label className="field"><span>Next Halt</span><input name="nextLocation" defaultValue={data.yatra?.nextLocation} /></label>
                  <label className="field"><span>Distance Covered (KM)</span><input name="distanceCoveredKm" type="number" defaultValue={data.yatra?.distanceCoveredKm} /></label>
                  <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="checkbox" name="isLive" defaultChecked={data.yatra?.isLive} />
                    <strong>Status LIVE ●</strong>
                  </label>
                  <button className="button primary">Update Yatra</button>
                </form>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="form-card">
                <h2>Create Announcement</h2>
                <form onSubmit={createAnnouncement} style={{ display: 'grid', gap: '15px', maxWidth: '500px', marginBottom: '40px' }}>
                  <label className="field"><span>Title</span><input name="title" required /></label>
                  <label className="field"><span>Message</span><textarea name="message" required></textarea></label>
                  <label className="field"><span>Priority</span>
                    <select name="priority" style={{ padding: '12px', border: '1px solid #dfc9a7', background: '#fffdf8' }}>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                    </select>
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="published" defaultChecked /> Published</label>
                    <label style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><input type="checkbox" name="pinned" /> Pinned</label>
                  </div>
                  <button className="button primary">Publish Announcement</button>
                </form>

                <h2>Recent Announcements</h2>
                {data.announcements.map(ann => (
                  <div key={ann._id} style={{ padding: '15px', border: '1px solid #dfc9a7', marginBottom: '10px', borderRadius: '4px', background: ann.pinned ? '#fff9ec' : '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{ann.pinned ? '📌 ' : ''}{ann.title}</strong>
                      <span style={{ fontSize: '0.8rem', color: ann.published ? 'green' : '#a83226', fontWeight: 'bold' }}>{ann.published ? 'Published' : 'Draft'}</span>
                    </div>
                    <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: '#765f55' }}>{ann.message}</p>
                  </div>
                ))}
                {!data.announcements.length && <p className="muted">No announcements found.</p>}
              </div>
            )}

            {activeTab === 'volunteers' && (
              <div className="form-card">
                <h2>Volunteer Applications</h2>
                <div className="stats" style={{ marginBottom: '20px' }}>
                  <div><strong>{data.volunteers.length}</strong><span>Total Applications</span></div>
                  <div><strong>{data.volunteers.filter(v => v.status === 'pending').length}</strong><span>Pending Review</span></div>
                </div>
                {data.volunteers.length ? (
                  <table>
                    <thead><tr><th>Name</th><th>Seva</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {data.volunteers.map((v) => (
                        <tr key={v._id}>
                          <td><strong>{v.name}</strong><br/><small>{v.phone}</small></td>
                          <td>{v.sevaCategory}<br/><small>{v.availability}</small></td>
                          <td>{v.city}</td>
                          <td>
                            <span style={{ 
                              padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem',
                              background: v.status === 'approved' ? '#d4edda' : v.status === 'rejected' ? '#f8d7da' : '#fff3cd',
                              color: v.status === 'approved' ? '#155724' : v.status === 'rejected' ? '#721c24' : '#856404'
                            }}>
                              {v.status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            {v.status === 'pending' && (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => updateVolunteerStatus(v._id, 'approved')} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                                <button onClick={() => updateVolunteerStatus(v._id, 'rejected')} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Reject</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : <p className="muted">No volunteer applications yet.</p>}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="form-card">
                <h2>Upload to Gallery</h2>
                <form onSubmit={uploadImage} style={{ display: 'grid', gap: '15px', maxWidth: '500px', marginBottom: '40px' }}>
                  <label className="field"><span>Image Title</span><input name="title" required /></label>
                  <label className="field"><span>Caption</span><textarea name="caption"></textarea></label>
                  <label className="field"><span>Image File</span><input type="file" name="image" accept="image/*" required /></label>
                  <button className="button primary">Upload Image</button>
                </form>

                <h2>Published Images</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  {data.gallery.map(item => (
                    <div key={item._id} style={{ border: '1px solid #dfc9a7', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                      <img src={item.imagePath} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <div style={{ padding: '15px' }}>
                        <h4 style={{ margin: '0 0 5px', fontSize: '1rem' }}>{item.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <span style={{ fontSize: '0.8rem', color: item.published ? 'green' : 'red', fontWeight: 'bold' }}>{item.published ? 'Live' : 'Hidden'}</span>
                          <button onClick={() => toggleGallery(item._id)} style={{ background: 'none', border: '1px solid #dfc9a7', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Toggle</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {!data.gallery.length && <p className="muted">No images in gallery.</p>}
              </div>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
}
