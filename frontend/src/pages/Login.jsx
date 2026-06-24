import { useState, useEffect } from "react";
import { login, getLoginBanner } from "../api.js";

const FEATURES = [
  { icon: "📹", text: "Bulk video posting from Google Drive or TikTok" },
  { icon: "👥", text: "Multi-user SaaS — each user has isolated data" },
  { icon: "⏰", text: "Smart scheduling with live follower & video stats" },
  { icon: "🔒", text: "Your data stays private in your own cloud" },
];

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [banner, setBanner]     = useState({});

  useEffect(() => { getLoginBanner().then(setBanner).catch(() => {}); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setLoading(true); setError("");
    try {
      const res = await login(username.trim(), password);
      if (res.success) onSuccess({ username: res.username, role: res.role, user_id: res.user_id });
      else setError(res.error || "লগইন ব্যর্থ হয়েছে");
    } catch { setError("সার্ভারে সংযোগ হচ্ছে না।"); }
    setLoading(false);
  };

  const buildLink = (type, raw) => {
    const v = (raw || "").trim(); if (!v) return "";
    if (/^https?:\/\//i.test(v)) return v;
    if (type === "telegram")  return `https://t.me/${v.replace(/^@/, "")}`;
    if (type === "whatsapp")  return `https://wa.me/${v.replace(/\D/g, "")}`;
    if (type === "messenger") return `https://m.me/${v.replace(/^@/, "")}`;
    return v;
  };

  const contacts = [
    { type: "telegram",  icon: "📨", color: "#229ED9", link: buildLink("telegram", banner.contact_telegram) },
    { type: "whatsapp",  icon: "💬", color: "#25D366", link: buildLink("whatsapp", banner.contact_whatsapp) },
    { type: "messenger", icon: "✉️", color: "#0084FF", link: buildLink("messenger", banner.contact_messenger) },
  ].filter(c => c.link);

  return (
    <div className="login-screen"
      style={banner.banner_url ? { backgroundImage: `url(${banner.banner_url})` } : {}}>
      <div className="login-overlay" />

      {contacts.length > 0 && (
        <div className="login-contact-icons">
          {contacts.map(c => (
            <a key={c.type} href={c.link} target="_blank" rel="noopener noreferrer"
              className="contact-icon-btn" style={{ "--icon-color": c.color }}>
              {c.icon}
            </a>
          ))}
        </div>
      )}

      <div className="login-page-wrap">
        {/* Left hero */}
        <div className="login-hero">
          <div className="login-logo">
            <span className="logo-icon" style={{ fontSize: 32 }}>🤖</span>
            <span className="logo-text" style={{ fontSize: 20 }}>AutoPost <b>Pro</b></span>
          </div>
          <h1 className="login-headline">Automate your Facebook video posting — on autopilot.</h1>
          <p className="login-hero-sub">
            Connect unlimited Pages, pull videos from Google Drive, and schedule posts that run 24/7 on the server — even when your PC is off.
          </p>
          <ul className="login-features">
            {FEATURES.map(f => (
              <li key={f.text}><span className="feat-icon">{f.icon}</span>{f.text}</li>
            ))}
          </ul>
          <div className="login-policy-links">
            <a href="#">Privacy Policy</a>{" · "}<a href="#">Terms of Service</a>
          </div>
        </div>

        {/* Right card */}
        <div className="login-right">
          <form className="login-card" onSubmit={handleSubmit}>
            <p className="login-welcome">Welcome back</p>
            <p className="login-subtitle">Sign in to your dashboard.</p>

            <label>Username</label>
            <input autoFocus placeholder="admin" value={username}
              onChange={e => setUsername(e.target.value)} />

            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} />

            {error && <p className="login-error">⚠️ {error}</p>}

            <button className="btn-primary full-width" style={{ marginTop: 18 }}
              type="submit" disabled={loading}>
              {loading ? "⏳ Signing in..." : "Login →"}
            </button>
          </form>

          {banner.contract_text && (
            <p className="login-contract-text"
              style={{ position:"static", transform:"none", marginTop:16, maxWidth:380 }}>
              {banner.contract_text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
