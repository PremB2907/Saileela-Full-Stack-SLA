import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import './styles.css';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><HelmetProvider><BrowserRouter><LanguageProvider><AuthProvider><App/></AuthProvider></LanguageProvider></BrowserRouter></HelmetProvider></React.StrictMode>);
