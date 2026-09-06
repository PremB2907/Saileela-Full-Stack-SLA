import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { About, Committee, FAQ, Gallery, Schedule, Seva } from './pages/ContentPages';
import { Advertisement, Contact, DBT, Registration, Tshirt, VerifyPass } from './pages/Forms';
import Donate from './pages/Donate';
import { AdminDashboard, AdminLogin } from './pages/Admin';
import NotFound from './pages/NotFound';
export default function App() { return <Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/schedule" element={<Schedule/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/glimpses" element={<Navigate to="/gallery" replace/>}/><Route path="/photo-booth" element={<Navigate to="/gallery" replace/>}/><Route path="/seva" element={<Seva/>}/><Route path="/social-work" element={<Navigate to="/seva" replace/>}/><Route path="/committee" element={<Committee/>}/><Route path="/register" element={<Registration/>}/><Route path="/verify-pass/:passNumber" element={<VerifyPass/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/contact" element={<Contact/>}/><Route path="/donate" element={<Donate/>}/><Route path="/dbt" element={<DBT/>}/><Route path="/advertise" element={<Advertisement/>}/><Route path="/tshirt" element={<Tshirt/>}/><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin/excel" element={<AdminDashboard/>}/><Route path="/admin" element={<AdminDashboard/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>; }
