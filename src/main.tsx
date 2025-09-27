import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/theme.css';
import './index.css';
import './styles/microinteractions.css';
import './styles/password-gate.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const ACCESS_TOKEN_STORAGE_KEY = 'tn-roadmap::access-granted';
const PASSWORD = 'association1!$';

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

const isAccessGranted = () => {
  try {
    return window.sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const showPasswordGate = () => {
  const previouslyFocused = document.activeElement as HTMLElement | null;
  const overlay = document.createElement('div');
  overlay.id = 'password-gate-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'password-gate-title');
  overlay.setAttribute('aria-describedby', 'password-gate-description password-gate-error');

  const container = document.createElement('div');
  container.className = 'password-gate';
  container.tabIndex = -1;

  const title = document.createElement('h1');
  title.className = 'password-gate__title';
  title.id = 'password-gate-title';
  title.textContent = 'Restricted access';

  const description = document.createElement('p');
  description.className = 'password-gate__description';
  description.id = 'password-gate-description';
  description.textContent =
    'This preview is currently protected. Enter the access password to continue.';

  const form = document.createElement('form');
  form.className = 'password-gate__form';
  form.setAttribute('aria-labelledby', 'password-gate-title');
  form.setAttribute('aria-describedby', 'password-gate-description password-gate-error');
  form.noValidate = true;

  const label = document.createElement('label');
  label.className = 'password-gate__label';
  label.htmlFor = 'password-gate-input';

  const labelText = document.createElement('span');
  labelText.textContent = 'Password';

  const input = document.createElement('input');
  input.className = 'password-gate__input';
  input.id = 'password-gate-input';
  input.name = 'password';
  input.type = 'password';
  input.required = true;
  input.autocomplete = 'current-password';
  input.setAttribute('aria-required', 'true');

  const submit = document.createElement('button');
  submit.className = 'password-gate__submit';
  submit.type = 'submit';
  submit.textContent = 'Unlock';

  const error = document.createElement('p');
  error.className = 'password-gate__error';
  error.id = 'password-gate-error';
  error.textContent = 'Incorrect password. Please try again.';
  error.setAttribute('role', 'status');
  error.setAttribute('aria-live', 'assertive');
  error.hidden = true;

  label.append(labelText, input);
  form.append(label, submit);
  container.append(title, description, form, error);
  overlay.append(container);
  document.body.append(overlay);

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  container.focus();

  requestAnimationFrame(() => {
    input.focus();
  });

  const revealError = () => {
    error.hidden = false;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (value === PASSWORD) {
      window.sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, 'true');
      overlay.remove();
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
      renderApp();
    } else {
      revealError();
      input.value = '';
      input.focus();
    }
  });

  input.addEventListener('input', () => {
    if (!error.hidden) {
      error.hidden = true;
    }
  });
};

if (isAccessGranted()) {
  renderApp();
} else {
  showPasswordGate();
}
