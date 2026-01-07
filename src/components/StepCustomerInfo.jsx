import React, { useState } from 'react'

function StepCustomerInfo({ formData, updateFormData, nextStep, isSubmitting }) {
    const [errors, setErrors] = useState({})

    const validateEmail = (email) => {
        const personalEmailDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'yandex.com', 'mail.ru', 'aol.com', 'icloud.com',
            'protonmail.com', 'zoho.com', 'gmx.com'
        ]

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return 'Geçerli bir e-posta adresi giriniz'
        }

        const domain = email.split('@')[1]?.toLowerCase()
        if (personalEmailDomains.includes(domain)) {
            return 'Lütfen kurumsal e-posta adresi kullanınız'
        }

        return null
    }

    const validatePhone = (phone) => {
        if (!phone) return null // Telefon opsiyonel

        const phoneRegex = /^[0-9\s\-\+\(\)]+$/
        if (!phoneRegex.test(phone)) {
            return 'Geçerli bir telefon numarası giriniz'
        }

        return null
    }

    const sanitizeInput = (value) => {
        // XSS ve injection saldırılarını önlemek için temel sanitizasyon
        return value
            .replace(/[<>]/g, '') // HTML tag'lerini kaldır

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const sanitizedValue = sanitizeInput(value)

        updateFormData({ [name]: sanitizedValue })

        // Hata mesajını temizle
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}

        // Zorunlu alan kontrolleri
        if (!formData.musteriUnvani) {
            newErrors.musteriUnvani = 'Müşteri ünvanı zorunludur'
        }

        if (!formData.musteriAdresi) {
            newErrors.musteriAdresi = 'Müşteri adresi zorunludur'
        }

        if (!formData.yetkiliAdSoyad) {
            newErrors.yetkiliAdSoyad = 'Yetkili personel ad soyadı zorunludur'
        }

        if (!formData.email) {
            newErrors.email = 'E-posta adresi zorunludur'
        } else {
            const emailError = validateEmail(formData.email)
            if (emailError) {
                newErrors.email = emailError
            }
        }

        if (!formData.title) {
            newErrors.title = 'Ünvan zorunludur'
        }

        // Telefon validasyonu (opsiyonel ama girilmişse kontrol et)
        if (formData.telefon) {
            const phoneError = validatePhone(formData.telefon)
            if (phoneError) {
                newErrors.telefon = phoneError
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        nextStep()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="musteriUnvani">
                    Müşteri Ünvanı
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="musteriUnvani"
                    name="musteriUnvani"
                    value={formData.musteriUnvani}
                    onChange={handleChange}
                    className={errors.musteriUnvani ? 'error' : ''}
                    placeholder="Örn: ABC Teknoloji A.Ş."
                />
                {errors.musteriUnvani && (
                    <span className="error-message">{errors.musteriUnvani}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="musteriAdresi">
                    Müşteri Adresi
                    <span className="required">*</span>
                </label>
                <textarea
                    id="musteriAdresi"
                    name="musteriAdresi"
                    value={formData.musteriAdresi}
                    onChange={handleChange}
                    className={errors.musteriAdresi ? 'error' : ''}
                    placeholder="Tam adres bilgisi"
                    rows="3"
                />
                {errors.musteriAdresi && (
                    <span className="error-message">{errors.musteriAdresi}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="yetkiliAdSoyad">
                    Yetkili Personel Ad Soyadı
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="yetkiliAdSoyad"
                    name="yetkiliAdSoyad"
                    value={formData.yetkiliAdSoyad}
                    onChange={handleChange}
                    className={errors.yetkiliAdSoyad ? 'error' : ''}
                    placeholder="Örn: Ahmet Yılmaz"
                />
                {errors.yetkiliAdSoyad && (
                    <span className="error-message">{errors.yetkiliAdSoyad}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="email">
                    Resmi E-mail Adresi
                    <span className="required">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Örn: ahmet.yilmaz@sirket.com"
                />
                {errors.email && (
                    <span className="error-message">{errors.email}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="telefon">
                    Telefon
                </label>
                <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    className={errors.telefon ? 'error' : ''}
                    placeholder="Örn: +90 555 123 45 67"
                />
                {errors.telefon && (
                    <span className="error-message">{errors.telefon}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="title">
                    Ünvan
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Örn: BT Müdürü"
                />
                {errors.title && (
                    <span className="error-message">{errors.title}</span>
                )}
            </div>

            <div className="form-navigation">
                <div></div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading-spinner"></span>
                            Gönderiliyor...
                        </>
                    ) : (
                        'İlerle'
                    )}
                </button>
            </div>
        </form>
    )
}

export default StepCustomerInfo
