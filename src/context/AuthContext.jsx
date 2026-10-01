import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: "CUST-001",
    name: "Lord Alistair Sterling",
    email: "a.sterling@kensington-trust.co.uk",
    tier: "Connoisseur Sovereign Tier",
    location: "London & Colombo",
    role: "client", // "client" | "admin"
    twoFactorEnabled: true,
    biometricsActive: true,
    lastLogin: "Today, 11:42 AM • Mayfair IP",
    phone: "+44 20 7946 0918",
    activeSessions: [
      { id: "sess-1", device: "Safari on Mac Studio (Mayfair, UK)", current: true, ip: "82.165.197.10" },
      { id: "sess-2", device: "Private Vault App (iPhone 16 Pro)", current: false, ip: "188.114.97.2" }
    ]
  });

  const { showToast } = useToast();

  const login = (email, password, role = "client") => {
    setUser({
      id: role === "admin" ? "ADM-001" : "CUST-001",
      name: role === "admin" ? "Chief Curator Dr. Senanayake" : "Lord Alistair Sterling",
      email: email || "a.sterling@kensington-trust.co.uk",
      tier: role === "admin" ? "Vault Master Admin" : "Connoisseur Sovereign Tier",
      location: "London & Geneva",
      role: role,
      twoFactorEnabled: true,
      biometricsActive: true,
      lastLogin: "Just now",
      phone: "+44 20 7946 0918",
      activeSessions: [
        { id: "sess-1", device: "Desktop Browser (Current)", current: true, ip: "192.168.1.1" }
      ]
    });
    showToast(role === "admin" ? "Authenticated to Vault Master Admin" : "Private Vault Session Authenticated", "success");
    return true;
  };

  const register = (formData) => {
    setUser({
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: formData.name || "Connoisseur Member",
      email: formData.email,
      tier: "Connoisseur Patron",
      location: formData.location || "International",
      role: "client",
      twoFactorEnabled: false,
      biometricsActive: false,
      lastLogin: "Just now",
      phone: formData.phone || "",
      activeSessions: [
        { id: "sess-1", device: "Desktop Browser (Current)", current: true, ip: "Local Session" }
      ]
    });
    showToast("Private Client Registration Lodged & Authenticated", "success");
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast("Vault Session Safely Terminated", "info");
  };

  const toggle2FA = () => {
    if (!user) return;
    const nextState = !user.twoFactorEnabled;
    setUser({ ...user, twoFactorEnabled: nextState });
    showToast(nextState ? "Two-Factor Authentication Active" : "Two-Factor Authentication Paused", "info");
  };

  const revokeSession = (sessionId) => {
    if (!user) return;
    setUser({
      ...user,
      activeSessions: user.activeSessions.filter(s => s.id !== sessionId)
    });
    showToast("Remote Session Revoked", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        toggle2FA,
        revokeSession,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
