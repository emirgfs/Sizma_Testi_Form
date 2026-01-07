import React, { useState } from 'react'
import { TEST_SERVICES } from '../constants'


function StepTestSelection({ formData, updateFormData, nextStep, prevStep }) {
    const [errors, setErrors] = useState({})



    const handleCheckboxChange = (testId) => {
        const currentTests = formData.selectedTests || []
        const updatedTests = currentTests.includes(testId)
            ? currentTests.filter(id => id !== testId)
            : [...currentTests, testId]

        updateFormData({ selectedTests: updatedTests })

        // Hata mesajını temizle
        if (errors.selectedTests && updatedTests.length > 0) {
            setErrors({})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const selectedTests = formData.selectedTests || []

        if (selectedTests.length === 0) {
            setErrors({ selectedTests: 'Lütfen en az bir test hizmeti seçiniz' })
            return
        }

        nextStep()
    }

    const isChecked = (testId) => {
        return (formData.selectedTests || []).includes(testId)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-section">
                <h2 className="section-title">Test Hizmetlerini Seçiniz</h2>
                <p className="section-description" style={{ color: 'red' }}>
                    Talep etmek istediğiniz sızma testi hizmetlerini seçiniz. Sonraki adımlarda seçtiğiniz testler için detaylı bilgiler isteyeceğiz.
                </p>

                {errors.selectedTests && (
                    <div className="error-banner">
                        {errors.selectedTests}
                    </div>
                )}

                <div className="checkbox-group">
                    {TEST_SERVICES.map((service) => (
                        <label
                            key={service.id}
                            className={`checkbox-card ${isChecked(service.id) ? 'checked' : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked(service.id)}
                                onChange={() => handleCheckboxChange(service.id)}
                            />
                            <div className="checkbox-content">
                                <div className="checkbox-header">
                                    <span className="checkbox-icon">
                                        {isChecked(service.id) ? '✓' : ''}
                                    </span>
                                    <span className="checkbox-label">{service.label}</span>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>

                {formData.selectedTests && formData.selectedTests.length > 0 && (
                    <div className="selected-summary">
                        <strong>{formData.selectedTests.length}</strong> test hizmeti seçildi
                    </div>
                )}
            </div>

            <div className="form-navigation">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={prevStep}
                >
                    ← Geri
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    İlerle →
                </button>
            </div>
        </form>
    )
}

export default StepTestSelection
