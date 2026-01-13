# Sızma Testi Talep Formu

Bu form, sızma testine tabi tutulacak varlıkların genel yapısını ve adetlerini anlayarak çalışmanın ihtiyaç duyduğu eforu doğru şekilde belirlemek amacıyla hazırlanmıştır.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. EmailJS yapılandırması:
   - [EmailJS](https://www.emailjs.com/) hesabı oluşturun
   - Yeni bir email servisi ekleyin
   - Email template oluşturun
   - `src/App.jsx` dosyasındaki aşağıdaki değerleri güncelleyin:
     - `YOUR_SERVICE_ID`
     - `YOUR_TEMPLATE_ID`
     - `YOUR_USER_ID`

## Geliştirme

Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresinde açılacaktır.

## Üretim

Üretim için build almak:
```bash
npm run build
```

Build önizlemesi:
```bash
npm run preview
```

## Özellikler

- ✅ Responsive tasarım
- ✅ Form validasyonu
- ✅ E-posta doğrulama (kurumsal e-posta kontrolü)
- ✅ Input sanitizasyonu
- ✅ EmailJS entegrasyonu
- ✅ Modern ve kullanıcı dostu arayüz

## Form Alanları

### Adım 1: Müşteri Bilgileri
- Müşteri Ünvanı (zorunlu)
- Müşteri Adresi (zorunlu)
- Yetkili Personel Ad Soyadı (zorunlu)
- Resmi E-mail Adresi (zorunlu)
- Telefon (opsiyonel)
- Ünvan (zorunlu)

## Teknolojiler

- React 18
- Vite
- EmailJS
- Vanilla CSS
# Sizma_Testi_Form
