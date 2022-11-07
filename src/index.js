import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import App from './App';
import Toast from "./components/Toast"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <App />
        <Toast />
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
);
