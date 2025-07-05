# Mikro Frontend Üniversite Dashboard Kurulum Dokümantasyonu

## Proje Yapısı

Bu proje Module Federation kullanarak geliştirilmiş mikro frontend mimarisi içerir:

```
dashboard-microfrontends/
├── packages/
│   ├── shell/                # Container App (Port: 3000)
│   ├── user-card/            # User Card Mikro Frontend (Port: 3001)  
│   └── content-bar/          # Content Bar Mikro Frontend (Port: 3002)
├── docs/
│   └── SETUP.md              # Bu dosya
└── README.md                 # Ana proje dokümantasyonu
```

## Özellikler

### Shell (Container) App
- Ana layout ve routing yönetimi
- Header/navigation menu
- Mikro frontend orchestration
- Module Federation host
- Port: 3000

### User Card Mikro Frontend
- Kullanıcı profil kartı (avatar, isim, email, rol)
- Notification drawer (açılır/kapanır bildirim paneli)
- Notification badge ve okunmamış sayacı
- Öğrenci istatistikleri
- Hızlı erişim menüleri
- Port: 3001

### Content Bar Mikro Frontend
- Öğrenci listesi görünümü
- Filtreleme seçenekleri (tüm/yerli/yabancı öğrenciler)
- Card layout ile öğrenci bilgileri
- Durum badge'leri (aktif/beklemede/pasif)
- Öğrenci tipi göstergeleri (yerli/yabancı)
- Hover efektleri ve interaktif butonlar
- Port: 3002

## Teknoloji Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Webpack 5 with Module Federation
- **Styling**: Tailwind CSS
- **State Management**: Zustand (shared across microfrontends)
- **Development**: Hot Module Replacement
- **Code Quality**: ESLint + Prettier

## Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adım 1: Bağımlılıkları Yükle

Ana dizinde:
```bash
npm install
```

Her mikro frontend için ayrı ayrı:
```bash
# Shell App
cd packages/shell
npm install

# User Card
cd packages/user-card  
npm install

# Content Bar
cd packages/content-bar
npm install
```

### Adım 2: Geliştirme Sunucularını Başlat

Her mikro frontend için ayrı terminal açın:

```bash
# Terminal 1 - Shell App
cd packages/shell
npm run dev
# http://localhost:3000

# Terminal 2 - User Card
cd packages/user-card
npm run dev  
# http://localhost:3001

# Terminal 3 - Content Bar
cd packages/content-bar
npm run dev
# http://localhost:3002
```

**Önemli**: Mikro frontend'lerin doğru çalışması için tüm sunucuların aynı anda çalışıyor olması gerekir.

### Adım 3: Uygulamayı Görüntüle

Ana uygulama: http://localhost:3000

## Geliştirme

### State Yönetimi
- Zustand store'u tüm mikro frontend'ler arasında paylaşılır
- Mock veriler DashboardProvider'da tanımlanır
- Bildirim yönetimi, öğrenci filtreleme gibi işlevler global state'te

### Yeni Mikro Frontend Ekleme

1. `packages/` altında yeni klasör oluştur
2. `webpack.config.js` dosyasında Module Federation ayarları yap
3. `package.json` ve bağımlılıkları ekle
4. Shell app'te remote olarak tanımla

### Styling
- Tailwind CSS kullanılır
- Her mikro frontend kendi stilleri ile birlikte gelir
- Tutarlılık için ortak design token'lar kullanılır

## Production Build

```bash
# Her mikro frontend için
npm run build
```

Çıktılar `dist/` klasörlerinde oluşturulur.

## Sorun Giderme

### Module Federation Hataları
- Tüm sunucuların çalıştığından emin olun
- Port çakışması olup olmadığını kontrol edin
- Browser cache'ini temizleyin

### Styling Sorunları  
- Tailwind CSS konfigürasyonlarını kontrol edin
- PostCSS ayarlarının doğru olduğundan emin olun

### State Senkronizasyonu
- Zustand store'unun tüm mikro frontend'lerde aynı versiyonu kullandığından emin olun
- Shared dependencies'lerin singleton olarak ayarlandığını kontrol edin

## Mimari Kararlar

### Mikro Frontend Bölümlendirme
- **User Card**: Kullanıcı ile ilgili tüm işlevler (profil, bildirimler, istatistikler)
- **Content Bar**: Öğrenci yönetimi ve listeleme işlevleri
- **Shell**: Ortak layout ve navigasyon

### State Paylaşımı
- Global state Zustand ile yönetilir
- Her mikro frontend kendi local state'ini de tutabilir
- Props drilling yerine context/store pattern kullanılır

### Styling Stratejisi
- Tailwind utility-first approach
- Component-level CSS modules kullanılmaz
- Design system tutarlılığı için CSS variables

Bu dokümantasyon mikro frontend mimarisinin temellerini açıklar ve geliştirme sürecinde rehberlik eder.