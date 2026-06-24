# 🚀 AutoPost Pro — সম্পূর্ণ সেটআপ গাইড

## 📁 প্রজেক্ট স্ট্রাকচার

```
AutoPostPro/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   │   └── Sidebar.jsx
│   │   └── pages/
│   │       ├── Dashboard.jsx
│   │       ├── Accounts.jsx
│   │       ├── Schedule.jsx
│   │       ├── Analytics.jsx
│   │       ├── AICaption.jsx
│   │       ├── Scraper.jsx
│   │       ├── Logs.jsx
│   │       └── Settings.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/               # Flask Python
    ├── app.py             # Main API server
    ├── platforms.py       # FB/IG/TikTok/YouTube posting
    ├── scraper.py         # yt-dlp video downloader
    ├── drive.py           # Google Drive integration
    ├── requirements.txt
    ├── Procfile
    └── .env.example
```

---

## 🖥️ BACKEND সেটআপ (Termux)

### ধাপ ১: ফাইল কপি করুন
```bash
cp -r AutoPostPro/backend ~/autopost-backend
cd ~/autopost-backend
```

### ধাপ ২: Dependencies ইন্সটল
```bash
pip install -r requirements.txt --break-system-packages
pip install yt-dlp --break-system-packages
```

### ধাপ ৩: .env ফাইল তৈরি করুন
```bash
cp .env.example .env
nano .env
```
নিচের তথ্য দিন:
```
TELEGRAM_BOT_TOKEN=আপনার_বট_টোকেন
TELEGRAM_CHAT_ID=আপনার_চ্যাট_আইডি
DEFAULT_CAPTION=AutoPost Pro দ্বারা প্রকাশিত 🚀
ANTHROPIC_API_KEY=আপনার_claude_api_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=একটা_শক্তিশালী_পাসওয়ার্ড
SECRET_KEY=একটা_র‍্যান্ডম_সিক্রেট_স্ট্রিং
```

### ধাপ ৪: Backend চালু করুন
```bash
python app.py
```
✅ Backend চলবে: http://localhost:5000

---

## 🌐 FRONTEND সেটআপ (Termux)

### ধাপ ১: ফাইল কপি করুন
```bash
cp -r AutoPostPro/frontend ~/
cd ~/frontend
```

### ধাপ ২: Dependencies ইন্সটল
```bash
npm install
```

### ধাপ ৩: Development চালু করুন
```bash
npm run dev
```

### ধাপ ৪: Build (Netlify Deploy এর জন্য)
```bash
npm run build
netlify deploy --prod --dir dist
```

---

## ☁️ BACKEND DEPLOY (Railway.app)

### ধাপ ১: GitHub-এ push করুন
```bash
cd ~/autopost-backend
git init
git add .
git commit -m "AutoPost Pro Backend"
git remote add origin https://github.com/আপনার-username/autopost-backend.git
git push -u origin main
```

### ধাপ ২: Railway তে Deploy
1. railway.app এ যান
2. "New Project" → "Deploy from GitHub"
3. আপনার repo বেছে নিন
4. Environment Variables যোগ করুন:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### ধাপ ৩: Frontend এ URL সেট করুন
`frontend/.env` ফাইল তৈরি করুন:
```
VITE_API_URL=https://your-app.railway.app/api
```

---

## 🔑 PLATFORM API সেটআপ

### Facebook & Instagram
1. developers.facebook.com → My Apps → Create App
2. Add Products: Facebook Login, Instagram Basic Display
3. Settings → Basic → App ID ও App Secret নিন
4. Graph API Explorer থেকে Access Token নিন
5. অ্যাপে Accounts → নতুন অ্যাকাউন্ট → Token পেস্ট করুন

### TikTok
1. developers.tiktok.com → My Apps
2. Content Posting API enable করুন
3. OAuth2 দিয়ে token নিন (scope: video.publish)

### YouTube
1. console.cloud.google.com → New Project
2. YouTube Data API v3 enable করুন
3. OAuth 2.0 credentials তৈরি করুন
4. Token নিন (scope: youtube.upload)

### Google Drive
1. console.cloud.google.com → Service Accounts
2. Drive API enable করুন
3. Service Account JSON download করুন
4. Settings পেজে JSON paste করুন

---

## 🤖 AI ক্যাপশন সেটআপ
AI ক্যাপশন ও SEO Title ফিচার backend থেকে Claude API ব্যবহার করে (`ANTHROPIC_API_KEY` লাগবে)।

## 🔐 Login ও Banner সেটআপ
- প্রথমবার `.env`-এর `ADMIN_USERNAME` / `ADMIN_PASSWORD` দিয়ে লগইন করুন
- Dashboard → Settings → "Login পেজ ব্র্যান্ডিং" থেকে banner image (URL অথবা আপলোড) ও Contract Details টেক্সট সেট করা যাবে
- Settings → "Admin Login তথ্য" থেকে username/password পরে বদলানো যাবে

---

## ✨ ফিচার সারসংক্ষেপ

| ফিচার | অবস্থা |
|-------|--------|
| Facebook পোস্টিং | ✅ সম্পূর্ণ |
| Instagram Reels | ✅ সম্পূর্ণ |
| TikTok পোস্টিং | ✅ সম্পূর্ণ |
| YouTube Shorts | ✅ সম্পূর্ণ |
| Google Drive ইন্টিগ্রেশন | ✅ সম্পূর্ণ |
| TikTok স্ক্রেপার | ✅ সম্পূর্ণ |
| YouTube স্ক্রেপার | ✅ সম্পূর্ণ |
| AI ক্যাপশন | ✅ সম্পূর্ণ |
| Telegram নোটিফিকেশন | ✅ সম্পূর্ণ |
| শিডিউল ম্যানেজার | ✅ সম্পূর্ণ |
| অ্যানালিটিক্স | ✅ সম্পূর্ণ |
| পোস্ট লগ | ✅ সম্পূর্ণ |
| Multi-account | ✅ সম্পূর্ণ |
| বাংলা UI | ✅ সম্পূর্ণ |
| Login Authentication | ✅ সম্পূর্ণ |
| Login Banner/Contract Branding | ✅ সম্পূর্ণ |
