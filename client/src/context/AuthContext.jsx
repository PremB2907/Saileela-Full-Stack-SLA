import { createContext, useContext, useState } from 'react';
import { authApi } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) { const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('saileela_user') || 'null')); const login = async (credentials) => { const { data } = await authApi.login(credentials); localStorage.setItem('saileela_token', data.token); localStorage.setItem('saileela_user', JSON.stringify(data.user)); setUser(data.user); }; const logout = () => { localStorage.removeItem('saileela_token'); localStorage.removeItem('saileela_user'); setUser(null); }; return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>; }
export const useAuth = () => useContext(AuthContext);
