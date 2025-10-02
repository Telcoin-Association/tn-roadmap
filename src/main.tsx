import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/theme.css';
import './index.css';
import PasswordGate from './security/PasswordGate';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const gateEnabled = import.meta.env.VITE_ENABLE_PASSWORD_GATE === '1';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {gateEnabled ? (
      <PasswordGate>
        <App />
      </PasswordGate>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
