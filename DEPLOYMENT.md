# MasterVango Website Deployment Guide

## Canlı Yayında Form Çalışması İçin Yapılması Gerekenler

### 1. Backend'i Canlı Sunucuya Yükleme

#### A. Sunucu Seçimi
- **Heroku** (ücretsiz tier kaldırıldı)
- **Railway** (ücretsiz)
- **Render** (ücretsiz)
- **Vercel** (ücretsiz)
- **Netlify Functions** (ücretsiz)

#### B. Railway ile Deployment (Önerilen)
```bash
# Railway CLI kurulumu
npm install -g @railway/cli

# Backend klasörüne git
cd backend

# Railway'e login ol
railway login

# Yeni proje oluştur
railway init

# Deploy et
railway up
```

#### C. Environment Variables Ayarlama
Railway dashboard'da şu değişkenleri ekleyin:
```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com
EMAIL_USER=tlgkrks654@gmail.com
EMAIL_PASS=vyau ombq ezfi
```

### 2. Frontend'i Güncelleme

#### A. Production API URL'ini Güncelleme
`src/App.js` dosyasında şu satırı bulun:
```javascript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Ve `.env` dosyası oluşturun:
```env
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

#### B. Build ve Deploy
```bash
# Production build
npm run build:prod

# Deploy
npm run deploy
```

### 3. CORS Ayarlarını Güncelleme

Backend'de `server.js` dosyasında production domain'lerinizi ekleyin:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com', 'https://www.your-frontend-domain.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

### 4. Test Etme

1. Frontend'i deploy edin
2. Form'u doldurup gönderin
3. Console'da hata olup olmadığını kontrol edin
4. Backend loglarını kontrol edin

### 5. Troubleshooting

#### Form Gönderilemiyor Hatası
- CORS ayarlarını kontrol edin
- API URL'inin doğru olduğundan emin olun
- Backend'in çalıştığından emin olun

#### Email Gönderilemiyor Hatası
- Gmail app password'in doğru olduğundan emin olun
- 2FA'nın açık olduğundan emin olun

### 6. Güvenlik Notları

- Gmail şifresini environment variable olarak saklayın
- Production'da console.log'ları kaldırın
- Rate limiting ekleyin
- Input validation ekleyin

## Hızlı Test

Deployment sonrası test için:
```bash
# Frontend test
curl -X POST https://your-backend-domain.railway.app/api/notify \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","surname":"User","email":"test@test.com","phone":"1234567890"}'
```

Bu komut başarılı olursa backend çalışıyor demektir.
