import React from 'react'
import { TEST_SERVICES } from '../constants'

function StepSummary({ formData, prevStep, handleSubmit, isSubmitting }) {
    // Helper to find service label
    const getServiceLabel = (id) => {
        const service = TEST_SERVICES.find(s => s.id === id)
        return service ? service.label : id
    }

    // Label mapping for user - friendly display
    const LABEL_MAPPING = {
        // Genel
        methodology: 'Test Metodolojisi',
        testSchedule: 'Test Zamanlaması',
        testLocation: 'Test Lokasyonu',
        testCityDistrict: 'Lokasyon Detayı',

        // Internet Pentest
        totalAssetCount: 'Toplam Varlık Sayısı',
        firewallWafLbCount: 'Firewall/WAF/LB Sayısı',
        nasStorageCount: 'NAS/Storage Sayısı',
        virtualServerCount: 'Sanal Sunucu Sayısı',
        specialServerCount: 'Özel Sunucu (AD/DNS/Mail) Sayısı',
        webAppCount: 'Web Uygulama/API Sayısı',
        otherAssetCount: 'Diğer Varlık Sayısı',

        // Web App Pentest
        totalWebAppCount: 'Toplam Web Uygulama Sayısı',
        webApplicationCount: 'Web Uygulama Sayısı',
        webServerCount: 'Web Sunucu Sayısı',
        pageForumCount: 'Sayfa & Forum Sayısı',
        endpointCount: 'Endpoint Sayısı',
        apiCount: 'API Sayısı',

        // Local Network
        localNetworkCount: 'Network Sayısı',
        localActiveHostCount: 'Aktif Host Sayısı',
        routerSwitchCount: 'Router/Switch Sayısı',
        firewallWafLbDdosCount: 'Güvenlik Cihazı Sayısı',
        apWifiRouterCount: 'Kablosuz Cihaz Sayısı',
        serverSystemCount: 'Sunucu Sistemleri Sayısı',
        pcLaptopCount: 'PC/Laptop Sayısı',
        mobileDeviceCount: 'Mobil Cihaz Sayısı',
        otherDeviceCount: 'Diğer Cihaz Sayısı',

        // Wireless
        wirelessNetworkCount: 'Kablosuz Ağ (SSID) Sayısı',
        isHotspotTest: 'Hotspot Testi İsteniyor mu?',
        hotspotCount: 'Hotspot Sayısı',
        isWirelessClientTest: 'Kablosuz İstemci Testi İsteniyor mu?',
        wirelessClientCount: 'Kablosuz İstemci Sayısı',

        // Mobile App
        mobileAppPlatfoms: 'Platformlar',
        mobileAppCount: 'Mobil Uygulama Sayısı',
        testEnvironment: 'Test Ortamı',

        // Social Engineering
        socialEngPersonCount: 'Test Edilecek Kişi Sayısı',
        socialEngScenarios: 'Senaryolar',

        // DoS/DDoS
        dosDdosTargetCount: 'Hedef Sistem Sayısı',
        dosDdosBandwidth: 'Bant Genişliği',
        dosDdosBandwidthUnit: 'Bant Genişliği Birimi',
        dosDdosAttackCount: 'Atak Senaryo Sayısı',

        // Web Load Test
        loadTestAppCount: 'Yük Testi Uygulama Sayısı',
        loadTestScenarioCount: 'Senaryo Sayısı',
        loadTestConcurrentUsers: 'Anlık Kullanıcı Sayısı',
        loadTestRoleCount: 'Rol Sayısı',
        loadTestEnvironment: 'Test Ortamı',

        // ICS/SCADA
        icsTestEnvAvailable: 'Test Ortamı Var mı?',
        icsProductionTestRequested: 'Üretim Ortamında Test?',
        icsServerCount: 'Sunucu Sayısı',
        icsAppCount: 'Uygulama Sayısı',
        icsWorkstationCount: 'İş İstasyonu Sayısı',
        icsRouterCount: 'Router Sayısı',
        icsRtuTypeCount: 'RTU Tip Sayısı',
        icsPlcTypeCount: 'PLC Tip Sayısı',
        icsRelayTypeCount: 'Röle Tip Sayısı',
        icsPlcCount: 'PLC Sayısı',
        icsRtuIedCount: 'RTU/IED Sayısı',
        icsHmiCount: 'HMI Sayısı',
        icsScadaServerCount: 'SCADA Sunucu Sayısı',
        icsHistorianCount: 'Historian Sayısı',
        icsEngWorkstationCount: 'Mühendislik İstasyonu Sayısı',
        icsOpcServerCount: 'OPC Sunucu Sayısı',
        icsOtherComponentName: 'Diğer Bileşen Adı',
        icsOtherComponentCount: 'Diğer Bileşen Sayısı',
        icsNetworkStructure: 'Ağ Yapısı',
        icsItOtAccess: 'IT-OT Erişimi',
        icsRemoteAccessMethods: 'Uzaktan Erişim Yöntemleri',
        icsWirelessUsed: 'Kablosuz Teknoloji Kullanımı',

        // Source Code
        sourceCodeAppCount: 'Uygulama Sayısı',
        sourceCodeLineCount: 'Kod Satır Sayısı (LOC)',
        sourceCodeFileCount: 'Dosya Sayısı',
        sourceCodeTechStack: 'Teknoloji Yığını',

        // VoIP
        voipSystemType: 'VoIP Sistem Türü',
        voipExtensionCount: 'Abone/Dahili Sayısı',
        voipInternetAccess: 'İnternet Erişimi',
        voipTestEnvironment: 'Test Ortamı'
    }

    // Helper to render key-value pairs from an object (ignoring empty/null)
    const renderDetails = (details) => {
        if (!details) return null
        return Object.entries(details).map(([key, value]) => {
            // Skip empty values or internal keys if needed
            if (value === '' || value === null || value === undefined) return null

            // Use mapped label if available, otherwise format camelCase
            const label = LABEL_MAPPING[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

            return (
                <div key={key} className="summary-detail-item" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>{label}: </span>
                    <span style={{ color: '#1e293b' }}>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</span>
                </div>
            )
        })
    }

    return (
        <div className="form-section">
            <h2 className="section-title">Özet ve Onay</h2>
            <p className="section-subtitle">
                Lütfen bilgilerinizi kontrol ediniz. Eksik veya hatalı bir bilgi varsa "Geri" butonunu kullanarak düzeltebilirsiniz.
            </p>

            <div className="summary-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Müşteri Bilgileri */}
                <div className="summary-block" style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #cbd5e1' }}>
                        Firma ve İletişim Bilgileri
                    </h3>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <p><strong>Firma Ünvanı:</strong> {formData.musteriUnvani}</p>
                        <p><strong>Adres:</strong> {formData.musteriAdresi}</p>
                        <p><strong>Yetkili Kişi:</strong> {formData.yetkiliAdSoyad}</p>
                        <p><strong>E-posta:</strong> {formData.email}</p>
                        <p><strong>Telefon:</strong> {formData.telefon}</p>
                        {formData.title && <p><strong>Ünvan:</strong> {formData.title}</p>}
                    </div>
                </div>

                {/* Sızma Testi Doğrulama ve Rapor */}
                <div className="summary-block" style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #cbd5e1' }}>
                        Genel Tercihler
                    </h3>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <p><strong>Doğrulama Testi Talep Durumu:</strong> {formData.verificationRequest || '-'}</p>
                        <p><strong>Rapor Saklama Tercihi:</strong> {formData.reportRetention || '-'}</p>
                        {formData.retentionDuration && <p><strong>Saklama Süresi:</strong> {formData.retentionDuration}</p>}
                    </div>
                </div>

                {/* Seçilen Hizmetler ve Detayları */}
                <div className="summary-block" style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #cbd5e1' }}>
                        Seçilen Hizmetler ve Detaylar
                    </h3>
                    {formData.selectedTests && formData.selectedTests.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {formData.selectedTests.map(serviceId => {
                                const details = formData[serviceId]
                                return (
                                    <div key={serviceId} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid #e9ecef' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#2563eb', marginBottom: '0.5rem' }}>
                                            {getServiceLabel(serviceId)}
                                        </h4>
                                        <div>
                                            {/* Detayları renderDetails fonksiyonu ile göster */}
                                            {renderDetails(details) || (
                                                <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>Detay girilmedi.</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p>Herhangi bir hizmet seçilmedi.</p>
                    )}
                </div>

            </div>

            <div className="form-navigation" style={{ marginTop: '2rem' }}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={prevStep}
                    disabled={isSubmitting}
                >
                    Geri
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Gönderiliyor...' : 'Onayla ve Gönder'}
                </button>
            </div>
        </div>
    )
}

export default StepSummary
