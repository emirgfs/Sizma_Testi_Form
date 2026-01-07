import React, { useState } from 'react'

function StepVerification({ formData, updateFormData, nextStep, prevStep }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        // Default to 'no' if nothing selected for safety, although the UI encourages selection.
        // Or enforce selection if needed. Currently the user must select something.
        if (!formData.verificationRequest) {
            // Ideally show error but we will just prevent nextStep
            return
        }
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-section">
                <h2 className="section-title">Doğrulama Testi</h2>

                {/* Description Box */}
                <div style={{
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    borderLeft: '4px solid var(--primary-color)'
                }}>
                    <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        <strong>Doğrulama Testi:</strong> Sızma Testi çalışması neticesinde raporlanan bulguların kapatılıp kapatılmadığını teyit amaçlı yapılan test çalışmasıdır.
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        (Doğrulama çalışmasının istenmesi durumunda final rapor iletildikten en fazla 6 ay içerisinde çalışma talebi iletilmelidir.)
                    </p>
                </div>

                <div className="form-group">
                    <label className="question-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
                        Doğrulama Testi İsteniyor mu?
                    </label>
                    <div className="radio-group">
                        <label className={`radio-card ${formData.verificationRequest === 'yes' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="verificationRequest"
                                value="yes"
                                checked={formData.verificationRequest === 'yes'}
                                onChange={(e) => updateFormData({ verificationRequest: e.target.value })}
                            />
                            <div className="radio-indicator"></div>
                            <div className="radio-content">
                                <span className="radio-label">Evet</span>
                            </div>
                        </label>

                        <label className={`radio-card ${formData.verificationRequest === 'no' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="verificationRequest"
                                value="no"
                                checked={formData.verificationRequest === 'no'}
                                onChange={(e) => updateFormData({ verificationRequest: e.target.value })}
                            />
                            <div className="radio-indicator"></div>
                            <div className="radio-content">
                                <span className="radio-label">Hayır</span>
                            </div>
                        </label>
                    </div>
                </div>
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
                    disabled={!formData.verificationRequest}
                >
                    İlerle →
                </button>
            </div>
        </form>
    )
}

export default StepVerification
