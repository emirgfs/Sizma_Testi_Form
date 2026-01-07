import React, { useState } from 'react'
import StepCustomerInfo from './components/StepCustomerInfo'
import StepVerification from './components/StepVerification'
import StepReportRetention from './components/StepReportRetention'
import StepTestSelection from './components/StepTestSelection'
import StepServiceDetails from './components/StepServiceDetails'
import { TEST_SERVICES } from './constants'


function App() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        // Müşteri Bilgileri
        musteriUnvani: '',
        musteriAdresi: '',
        yetkiliAdSoyad: '',
        email: '',
        telefon: '',
        title: '',
        // Doğrulama ve Saklama
        verificationRequest: '',
        reportRetention: '',
        retentionDuration: '',
        // Test Seçimleri
        selectedTests: []
        // Diğer detaylar dinamik olarak eklenecek
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Temel adımlar: 1. Müşteri Bilgileri, 2. Doğrulama, 3. Rapor Saklama, 4. Test Seçimi
    // Sonraki adımlar seçilen testlere göre dinamik olacak
    const baseSteps = 4

    // Seçilen testlerin listesi (Sırasıyla adım olacaklar)
    const selectedTestIds = formData.selectedTests || []

    const totalSteps = baseSteps + selectedTestIds.length

    const updateFormData = (data) => {
        setFormData(prev => ({ ...prev, ...data }))
    }

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1)
        } else {
            // Son adımda ise formu gönder
            handleSubmit()
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        try {
            // n8n Webhook'a veri gönderimi
            const webhookUrl = 'https://n8n.dkmcdepo.com/webhook-test/be88f31d-c939-4e4d-b29a-3c5eac5f7356'

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    selectedTests: formData.selectedTests.join(', '),
                    submissionDate: new Date().toISOString()
                })
            })

            if (response.ok) {
                setIsSubmitted(true)
            } else {
                throw new Error('Webhook sunucusu hata döndürdü')
            }
        } catch (error) {
            console.error('Form gönderimi başarısız:', error)
            alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const getTestServiceById = (id) => {
        return TEST_SERVICES.find(service => service.id === id)
    }

    const renderStep = () => {
        // Adım 1: Müşteri Bilgileri
        if (currentStep === 1) {
            return (
                <StepCustomerInfo
                    formData={formData}
                    updateFormData={updateFormData}
                    nextStep={nextStep}
                    isSubmitting={false}
                />
            )
        }

        // Adım 2: Doğrulama Testi
        if (currentStep === 2) {
            return (
                <StepVerification
                    formData={formData}
                    updateFormData={updateFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )
        }

        // Adım 3: Rapor Saklama
        if (currentStep === 3) {
            return (
                <StepReportRetention
                    formData={formData}
                    updateFormData={updateFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )
        }

        // Adım 4: Test Seçimi
        if (currentStep === 4) {
            return (
                <StepTestSelection
                    formData={formData}
                    updateFormData={updateFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )
        }

        // Adım 5+: Seçilen testlerin detay formları
        // Hangi testin sırası olduğunu bulalım
        const testIndex = currentStep - 5 // 5. adım 0. indexli test için
        if (testIndex >= 0 && testIndex < selectedTestIds.length) {
            const testId = selectedTestIds[testIndex]
            const service = getTestServiceById(testId)

            if (service) {
                return (
                    <StepServiceDetails
                        key={testId} // Key önemli, bileşenin yeniden render edilmesi için
                        serviceId={testId}
                        serviceLabel={service.label}
                        updateFormData={updateFormData}
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )
            }
        }

        return <div>Bilinmeyen Adım</div>
    }

    if (isSubmitted) {
        return (
            <div className="container">
                <div className="form-card">
                    <div className="success-message">
                        <h2>✓ Talebiniz Alındı</h2>
                        <p>Sızma testi talebiniz başarıyla gönderildi.</p>
                        <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="form-card">
                <div className="form-header">
                    <h1>Sızma Testi Talep Formu</h1>
                    {currentStep === 1 && (
                        <p style={{ color: 'red' }}>
                            Bu form, sızma testine tabi tutulacak varlıkların genel yapısını ve adetlerini
                            anlayarak çalışmanın ihtiyaç duyduğu eforu doğru şekilde belirlemek amacıyla
                            hazırlanmıştır. Paylaşılan bilgiler doğrultusunda oluşturulacak teklifin kabul
                            edilmesi halinde, testin detaylarının netleştirileceği kapsam belirleme aşamasına
                            geçilecektir.
                        </p>
                    )}
                </div>

                <div className="step-indicator">
                    Adım {currentStep} / {totalSteps}
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>

                {renderStep()}
            </div>
        </div>
    )
}

export default App
