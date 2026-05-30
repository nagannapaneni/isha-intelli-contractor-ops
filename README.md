# isha-intelli-contractor-ops
AI-powered contractor operations platform - field capture to back-office execution


## 📱 Interactive Prototype

**[View Live Prototype](https://htmlpreview.github.io/?https://github.com/nagannapaneni/isha-intelli-contractor-ops/blob/main/prototype.html)**

Explore the interactive mobile prototype featuring:
- 📊 **Dashboard**: Real-time KPIs, AI insights, and performance charts
- 🔧 **Jobs**: Active job tracking with status indicators
- 📸 **Capture**: Field data capture with recent activity log
- ✓ **Approvals**: Workflow approvals for overtime and purchases
- 👤 **Profile**: User settings and support access

---

## 🚀 Next Steps: Run on Android

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Android Phone** with Expo Go app ([Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Step 1: Clone the Repository
```bash
git clone https://github.com/nagannapaneni/isha-intelli-contractor-ops.git
cd isha-intelli-contractor-ops
```

### Step 2: Install Dependencies
```bash
# Install root dependencies
npm install

# Install mobile app dependencies
cd apps/mobile
npm install
```

### Step 3: Run on Android with Expo Go
```bash
# From apps/mobile directory
npx expo start
```

**On your Android phone:**
1. Open the **Expo Go** app
2. Scan the QR code displayed in your terminal
3. The app will load on your phone

### Step 4 (Optional): Build Android APK

**Install EAS CLI:**
```bash
npm install -g eas-cli
```

**Login to Expo:**
```bash
eas login
```

**Build APK:**
```bash
cd apps/mobile
eas build --platform android --profile preview
```

The APK will be available for download after 10-15 minutes.

---

## 📁 Project Structure

```
isha-intelli-contractor-ops/
├── apps/
│   ├── mobile/          # Expo React Native mobile app
│   └── web/             # Next.js admin dashboard
├── services/
│   └── api/             # Express API server
├── packages/
│   └── shared/          # Shared TypeScript types & utilities
├── prototype.html       # Interactive web prototype
└── README.md
```

---

## 🎯 Features

### Mobile App (React Native + Expo)
- ✅ 5 core screens: Dashboard, Jobs, Capture, Approvals, Profile
- ✅ Premium dark theme with gradient design
- ✅ AI-powered insights and route optimization
- ✅ Real-time job tracking and status updates
- ✅ Field data capture with photo uploads
- ✅ Approval workflows for overtime and purchases

### Web Dashboard (Next.js)
- 📊 Admin panel with analytics
- 📋 Job management and dispatch
- 💰 Invoice and billing management
- 👥 Crew and resource allocation
- 📈 Performance metrics and reporting

### API (Express + TypeScript)
- 🔐 JWT authentication
- 📡 RESTful endpoints
- 🗄️ PostgreSQL ready (future)
- 🔄 Real-time updates (future)

---

## 🛠️ Tech Stack

- **Mobile**: React Native, Expo, TypeScript
- **Web**: Next.js 14, React 18, TailwindCSS
- **API**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (planned)
- **Auth**: JWT (planned)
- **Deployment**: Vercel (web), EAS (mobile)

---

## 📝 Roadmap

- [ ] Database integration (PostgreSQL + Prisma)
- [ ] Authentication system (JWT + OAuth)
- [ ] Multi-tenancy support
- [ ] Real-time notifications (Socket.io)
- [ ] Photo/document upload (AWS S3)
- [ ] AI routing engine integration
- [ ] Push notifications
- [ ] Offline mode
- [ ] Play Store deployment

---

## 🤝 Contributing

This is a prototype project. For production deployment:
1. Configure environment variables
2. Set up PostgreSQL database
3. Configure authentication
4. Deploy API to your cloud provider
5. Build and deploy mobile app via EAS

---

## 📄 License

MIT License - feel free to use this as a template for your own contractor operations platform.
