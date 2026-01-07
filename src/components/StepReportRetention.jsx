import React, { useState } from 'react'

function StepReportRetention({ formData, updateFormData, nextStep, prevStep }) {
    const [error, setError] = useState('')

    const handleDurationChange = (e) => {
        updateFormData({ retentionDuration: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.reportRetention) {
            setError('Lütfen rapor saklama tercihinizi belirtiniz')
            return
        }
        if (formData.reportRetention === 'yes' && !formData.retentionDuration) {
            setError('Lütfen saklama süresini seçiniz')
            return
        }
        nextStep()
    }

    // Generate week options (1 to 12)
    const weekOptions = Array.from({ length: 12 }, (_, i) => i + 1)

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-section">
                <h2 className="section-title">Rapor Saklama Tercihi</h2>

                <div className="form-group">
                    <label className="question-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
                        Sızma Testi Raporu Şirketimizde Saklansın mı?
                    </label>

                    <div className="radio-group">
                        <label className={`radio-card ${formData.reportRetention === 'yes' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="reportRetention"
                                value="yes"
                                checked={formData.reportRetention === 'yes'}
                                onChange={(e) => {
                                    updateFormData({
                                        reportRetention: e.target.value,
                                        retentionDuration: formData.retentionDuration
                                    })
                                    setError('')
                                }}
                            />
                            <div className="radio-indicator"></div>
                            <div className="radio-content">
                                <span className="radio-label">Evet, Saklansın</span>
                            </div>
                        </label>

                        <label className={`radio-card ${formData.reportRetention === 'no' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="reportRetention"
                                value="no"
                                checked={formData.reportRetention === 'no'}
                                onChange={(e) => {
                                    updateFormData({
                                        reportRetention: e.target.value,
                                        retentionDuration: ''
                                    })
                                    setError('')
                                }}
                            />
                            <div className="radio-indicator"></div>
                            <div className="radio-content">
                                <span className="radio-label">Hayır, Saklanmasın</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Conditional Content based on selection */}
                {formData.reportRetention === 'yes' && (
                    <div className="conditional-section fade-in" style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label htmlFor="retentionDuration">
                                Ne kadar saklanmasını istiyorsunuz?
                                <span className="required">*</span>
                            </label>
                            <p className="section-description" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                                (Sızma testi raporları en fazla 3 ay saklanabilmektedir.)
                            </p>
                            <select
                                id="retentionDuration"
                                value={formData.retentionDuration || ''}
                                onChange={handleDurationChange}
                                className="form-select"
                                style={{ maxWidth: '300px' }}
                            >
                                <option value="">Süre Seçiniz</option>
                                {weekOptions.map(week => (
                                    <option key={week} value={`${week} hafta`}>
                                        {week} Hafta
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {formData.reportRetention === 'no' && (
                    <div style={{
                        marginTop: '1.5rem',
                        backgroundColor: 'var(--background)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '4px solid var(--secondary-color)'
                    }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Doğrulama testleri istendi ise doğrulama testleri sonunda rapor silinir,
                            istenmedi ise final rapor firma ile paylaşıldıktan sonra rapor silinir.
                        </p>
                    </div>
                )}

                {error && <div className="error-message mt-3">{error}</div>}
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

export default StepReportRetention
