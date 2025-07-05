# Üniversite Dashboard - Mikro Frontend Mimarisi

Modern mikro frontend mimarisi kullanarak geliştirilmiş üniversite yönetim sistemi. Bu proje Module Federation teknolojisi ile React, TypeScript ve Tailwind CSS kullanarak ölçeklenebilir bir çözüm sunar.

## 🏗️ Mimari Genel Bakış

Bu proje üç ana mikro frontend'den oluşur:

### 📦 Shell (Container App) - Port 3000
- Ana layout ve routing yönetimi
- Header/navigation menu
- Mikro frontend orchestration
- Module Federation host olarak çalışır

### 👤 User Card Mikro Frontend - Port 3001
- Kullanıcı profil kartı (avatar, isim, email, rol)
- Bildirim paneli (açılır/kapanır)
- Bildirim badge'i ve okunmamış sayacı
- Öğrenci istatistikleri
- Hızlı erişim menüleri

### 📋 Content Bar Mikro Frontend - Port 3002
- Öğrenci listesi görünümü
- Filtreleme seçenekleri (tüm/yerli/yabancı)
- Card layout ile öğrenci bilgileri
- Durum göstergeleri
- İnteraktif butonlar ve hover efektleri

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone [repo-url]
cd dashboard-microfrontends
```

2. **Ana bağımlılıkları yükleyin**
```bash
npm install
```

3. **Her mikro frontend için bağımlılıkları yükleyin**
```bash
# Shell App
cd packages/shell && npm install

# User Card
cd packages/user-card && npm install

# Content Bar
cd packages/content-bar && npm install
```

4. **Geliştirme sunucularını başlatın**

Her mikro frontend için ayrı terminal açın:

```bash
# Terminal 1 - Shell App (Ana uygulama)
cd packages/shell
npm run dev
# 🌐 http://localhost:3000

# Terminal 2 - User Card
cd packages/user-card
npm run dev
# 🌐 http://localhost:3001

# Terminal 3 - Content Bar
cd packages/content-bar
npm run dev
# 🌐 http://localhost:3002
```

5. **Uygulamayı görüntüleyin**
Ana uygulama: http://localhost:3000

**⚠️ Önemli**: Tüm mikro frontend'lerin düzgün çalışması için hepsinin aynı anda çalışması gerekir.

## 🛠️ Teknoloji Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Mikro Frontend**: Webpack 5 Module Federation
- **Styling**: Tailwind CSS
- **State Management**: Zustand (paylaşımlı)
- **Build Tool**: Webpack 5
- **Development**: Hot Module Replacement
- **Code Quality**: ESLint + Prettier

## 📱 Responsive Tasarım

### Desktop Layout
```
┌─────────────── Header Menu (Full Width) ───────────────┐
├──────────────┬─────────────────────────────────────────┤
│              │                                         │
│  User Card   │         Content Bar                     │
│  (4 cols)    │         (8 cols)                        │
│              │                                         │
└──────────────┴─────────────────────────────────────────┘
```

### Mobile/Tablet Layout
```
┌─────────────── Header Menu ───────────────┐
├───────────────────────────────────────────┤
│              User Card                    │
├───────────────────────────────────────────┤
│                                           │
│             Content Bar                   │
│                                           │
└───────────────────────────────────────────┘
```

## 🎯 Özellikler

### ✅ Kullanıcı Yönetimi
- Profil bilgileri görüntüleme
- Avatar desteği
- Rol tabanlı erişim

### ✅ Öğrenci Yönetimi
- Öğrenci listesi ve filtreleme
- Yerli/Yabancı öğrenci ayrımı
- Durum takibi (aktif/beklemede/pasif)
- Öğrenci detay görüntüleme

### ✅ Bildirim Sistemi
- Real-time bildirimler
- Okunmamış sayacı
- Bildirim tiplerine göre ikonlar
- Zaman damgası ile görüntüleme

### ✅ Modern UI/UX
- Clean ve minimalist tasarım
- Hover efektleri
- Loading states
- Responsive tasarım
- Türkçe dil desteği

## 🏗️ Proje Yapısı

```
dashboard-microfrontends/
├── packages/
│   ├── shell/                    # Container App
│   │   ├── src/
│   │   │   ├── components/       # Header, LoadingSpinner
│   │   │   ├── providers/        # DashboardProvider
│   │   │   ├── styles/           # Global styles
│   │   │   ├── App.tsx           # Ana uygulama
│   │   │   └── index.tsx         # Entry point
│   │   ├── public/
│   │   ├── webpack.config.js     # Module Federation config
│   │   └── package.json
│   ├── user-card/               # User Card Mikro Frontend
│   │   ├── src/
│   │   │   ├── components/      # NotificationDrawer
│   │   │   ├── UserCard.tsx     # Ana component
│   │   │   └── index.tsx
│   │   ├── webpack.config.js
│   │   └── package.json
│   └── content-bar/             # Content Bar Mikro Frontend
│       ├── src/
│       │   ├── components/
│       │   ├── ContentBar.tsx   # Ana component
│       │   └── index.tsx
│       ├── webpack.config.js
│       └── package.json
├── docs/
│   └── SETUP.md                 # Detaylı kurulum dokümantasyonu
├── client/                      # Mevcut monolith (eski)
├── server/                      # Backend API
├── shared/                      # Paylaşılan tipler
└── README.md                    # Bu dosya
```

## 🔄 State Yönetimi

Zustand store kullanılarak tüm mikro frontend'ler arasında state paylaşılır:

```typescript
interface DashboardState {
  user: User | null;
  students: Student[];
  notifications: Notification[];
  isNotificationDrawerOpen: boolean;
  studentFilter: 'all' | 'local' | 'international';
  unreadNotificationCount: number;
  // Actions...
}
```

## 🚀 Production Build

```bash
# Her mikro frontend için
cd packages/[microfrontend-name]
npm run build
```

## 📊 Mock Data

Geliştirme amaçlı mock veriler kullanılır:
- **Kullanıcı**: Prof. Dr. Mehmet Özkan (Akademik Koordinatör)
- **Öğrenciler**: Çeşitli bölümlerden yerli ve yabancı öğrenciler
- **Bildirimler**: Farklı tip bildirimler (info, success, warning)

## 🛠️ Geliştirme

### Yeni Mikro Frontend Ekleme
1. `packages/` altında yeni klasör oluştur
2. Module Federation konfigürasyonu yap
3. Shell app'te remote olarak tanımla
4. Bağımlılıkları ve shared resources'ları ayarla

### Code Standards
- ESLint + Prettier konfigürasyonu
- Conventional Commits kullanımı
- TypeScript strict mode
- Component ve dosya isimlendirme kuralları

## 🐛 Sorun Giderme

### Module Federation Hataları
- Tüm sunucuların çalıştığından emin olun
- Port çakışması kontrolü yapın
- Browser cache'ini temizleyin

### Development Issues
- Node.js versiyonunu kontrol edin (18+)
- npm cache temizleyin: `npm cache clean --force`
- node_modules'ı yeniden yükleyin

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request açın

---

**Geliştirici Notu**: Bu proje modern mikro frontend mimarisinin pratik bir örneğidir. Module Federation, state paylaşımı ve responsive tasarım gibi konularda öğrenme amacıyla geliştirilmiştir.