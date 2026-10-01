import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CurrencyProvider>
          <AuthProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </AuthProvider>
        </CurrencyProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
