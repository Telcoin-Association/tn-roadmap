// src/security/PasswordGate.tsx
import { useEffect, useMemo, useState } from "react";

const EXPECTED_HEX_SHA256 = "37f74fb8178d9ba6aa33f082c216a2ff4463d975c1b24f10e96c41fadcb4d9cd"; // sha256("association1!$")
const STORAGE_KEY = "tn_auth_sha256";
const MAX_ATTEMPTS = 8;

async function sha256Hex(input: string) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function PasswordGate(props: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    setOk(saved === EXPECTED_HEX_SHA256);
  }, []);

  const onSubmit = useMemo(() => {
    return async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setError("");
      const form = evt.currentTarget;
      const fd = new FormData(form);
      const pwd = String(fd.get("password") ?? "");
      const hex = await sha256Hex(pwd);
      if (hex === EXPECTED_HEX_SHA256) {
        sessionStorage.setItem(STORAGE_KEY, hex);
        setOk(true);
      } else {
        const attempts = Number(sessionStorage.getItem(STORAGE_KEY + ":attempts") ?? 0) + 1;
        sessionStorage.setItem(STORAGE_KEY + ":attempts", String(attempts));
        setError("Incorrect password.");
        if (attempts >= MAX_ATTEMPTS) {
          setError("Too many attempts. Please reload the page and try again later.");
          (evt.target as HTMLFormElement).querySelector("button")?.setAttribute("disabled","true");
        }
      }
      (form.querySelector('input[type="password"]') as HTMLInputElement)?.focus();
      (form.querySelector('input[type="password"]') as HTMLInputElement).value = "";
    };
  }, []);

  if (ok) return <>{props.children}</>;

  return (
    <div className="gate-overlay" data-section="password-gate" aria-live="polite">
      <div className="gate-card" role="dialog" aria-modal="true" aria-labelledby="gate-title">
        <h1 id="gate-title" className="gate-title">Restricted preview</h1>
        <p className="gate-sub">Enter the access password to continue.</p>
        <form onSubmit={onSubmit} className="gate-form" autoComplete="off">
          <input
            type="password"
            name="password"
            inputMode="text"
            placeholder="Password"
            className="gate-input"
            aria-label="Password"
            required
          />
          <button type="submit" className="gate-btn">Unlock</button>
        </form>
        {error ? <p className="gate-error">{error}</p> : null}
        <p className="gate-note">For review only. Do not share.</p>
      </div>
    </div>
  );
}
