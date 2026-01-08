import React from 'react'

function StepServiceDetails({ serviceId, serviceLabel, formData, updateFormData, nextStep, prevStep }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        nextStep()
    }

    // Generic handler for nested object updates for specific services
    const handleComplexChange = (field, value) => {
        const currentData = formData[serviceId] || {}
        updateFormData({
            [serviceId]: {
                ...currentData,
                [field]: value
            }
        })
    }

    // Helper to safely get value
    const getVal = (field) => {
        return (formData[serviceId] && formData[serviceId][field]) || ''
    }

    let methodologyOptions = [
        {
            label: 'Black/Siyah Box',
            description: 'Sadece teste tabi varlıklara erişim için gerekli ip:port gibi en temel bilgiler paylaşılır.'
        },
        {
            label: 'Gray/Gri Box',
            description: 'Teste tabi varlıklara kısıtlı yetkili kullanıcı erişim bilgileri paylaşılır.'
        },
        {
            label: 'White/Beyaz Box',
            description: 'Teste tabi varlıklara tam yetkili kullanıcı erişim bilgileri paylaşılır.'
        }
    ]

    if (serviceId === 'localNetworkPenetrationTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Yalnızca iç ağa erişim sağlanacaktır. Sistem, mimari ve güvenlik kontrolleri hakkında ön bilgi paylaşılmayacaktır'
            },
            {
                label: 'Gray/Gri Box',
                description: 'İç ağdaki güvenlik katmanları hakkında sınırlı bilgilendirme sağlanacaktır. (Ör: MAC / ACL kontrolleri hakkında bilgi paylaşılacaktır, NAC kullanımı mevcutsa ürün ve uygulanan güvenlik politikaları hakkında bilgilendirme yapılacaktır)'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test için kullanılacak VPN / PC erişimleri whitelist (IP / MAC / ACL) ile yetkilendirilecektir. (Ör: NAC altyapısı üzerinden gerekli erişim izinleri sağlanacaktır)'
            }
        ]
    } else if (serviceId === 'wirelessNetworkPenetrationTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, yalnızca teste tabi tutulacak kablosuz ağlara (SSID) erişim sağlanarak gerçekleştirilecektir. Kablosuz ağlara ilişkin temel SSID bilgileri paylaşılacak olup, altyapı ve güvenlik yapılandırmaları hakkında ek bir bilgilendirme yapılmayacaktır.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, Hotspot / Captive Portal kullanılan çözümler hakkında bilgilendirme sağlanarak ve kablosuz ağlarda uygulanan güvenlik önlemleri ve sıkılaştırma yapılandırmaları hakkında sınırlı teknik bilgi paylaşımı ile gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test kapsamında, teste tabi tutulacak Hotspot / Captive Portal ve SSID’ler için uygulanmış güvenlik sıkılaştırmalarından gerekli görülenler için kontrollü istisnalar tanımlanacak ve test süresince ilgili erişim izinleri sağlanacaktır.'
            }
        ]
    } else if (serviceId === 'mobileAppPenetrationTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, mobil uygulamaya herhangi bir teknik dokümantasyon veya ön bilgi paylaşılmadan, son kullanıcı bakış açısıyla gerçekleştirilecektir.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, mobil uygulamanın mimarisi, kullanılan servisler ve güvenlik mekanizmaları hakkında sınırlı bilgilendirme sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test, mobil uygulamaya ait kaynak kod, konfigürasyonlar ve güvenlik kontrolleri hakkında kapsamlı bilgi paylaşımı yapılarak ve gerekli erişimler sağlanarak gerçekleştirilecektir.'
            }
        ]
    } else if (serviceId === 'socialEngineeringTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, yalnızca teste tabi tutulacak personele ait e-posta adresi, telefon numarası ve ad–soyad/unvan gibi temel bilgiler kullanılarak gerçekleştirilecektir. Güvenlik altyapısı ve kontrolleri hakkında herhangi bir ön bilgi paylaşılmayacaktır.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, kurumda kullanılan e-posta güvenlik çözümleri ve ilgili güvenlik yapılandırmaları hakkında sınırlı bilgilendirme sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test kapsamında, kullanılan güvenlik çözümleri üzerinde test için kullanılacak saldırgan e-posta adresleri için whitelist tanımlamaları yapılacak ve spam, phishing veya benzeri filtrelerden kontrollü istisnalar sağlanacaktır.'
            }
        ]
    } else if (serviceId === 'dosDdosTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, hedef sistemler hakkında herhangi bir teknik bilgi veya ön yapılandırma paylaşılmadan, harici saldırgan bakış açısıyla gerçekleştirilecektir.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, hedef sistemlerin mimarisi ve kullanılan koruyucu güvenlik çözümleri (Firewall, DDoS Mitigation, WAF vb.) hakkında sınırlı bilgilendirme sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test kapsamında, kullanılan DoS/DDoS koruma mekanizmaları üzerinde test için gerekli whitelist, eşik değer (threshold) veya kontrollü istisnalar tanımlanarak ve ilgili ekiplerle koordinasyon sağlanarak gerçekleştirilecektir.'
            }
        ]
    } else if (serviceId === 'webAppLoadTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, web uygulamasına ilişkin herhangi bir teknik bilgi paylaşılmadan, son kullanıcı bakış açısıyla gerçekleştirilecektir.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, web uygulamasının genel mimarisi ve altyapısı hakkında sınırlı bilgilendirme sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test, web uygulamasına ait altyapı ve uygulama bileşenleri için gerekli kontrollü yapılandırmalar ve istisnalar tanımlanarak gerçekleştirilecektir.'
            }
        ]
    } else if (serviceId === 'icsScadaTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, EKS/SCADA ortamına ilişkin herhangi bir teknik dokümantasyon veya ön bilgi paylaşılmadan, harici saldırgan bakış açısıyla gerçekleştirilecektir.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, EKS/SCADA mimarisi ve kullanılan ağ segmentasyonu, güvenlik katmanları ve erişim kontrolleri hakkında sınırlı bilgilendirme sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test, EKS/SCADA ortamına ait ağ diyagramları, sistem bileşenleri ve güvenlik kontrolleri hakkında kapsamlı bilgilendirme yapılarak ve test için gerekli kontrollü erişim izinleri sağlanarak gerçekleştirilecektir.'
            }
        ]
    } else if (serviceId === 'sourceCodeAnalysis') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, uygulamaya ait kaynak kod veya mimari bilgi paylaşılmadan, yalnızca uygulamanın çalışma mantığı ve dış davranışı üzerinden gerçekleştirilecektir.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, uygulamaya ait sınırlı mimari bilgi ve örnek yapılandırmalar sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test, uygulamaya ait tam kaynak kod, yapılandırma dosyaları ve güvenlik kontrolleri paylaşılarak gerçekleştirilecektir.'
            }
        ]
    } else if (serviceId === 'voipPenetrationTest') {
        methodologyOptions = [
            {
                label: 'Black/Siyah Box',
                description: 'Test, VoIP altyapısına ilişkin herhangi bir teknik bilgi veya yapılandırma paylaşılmadan, harici saldırgan bakış açısıyla gerçekleştirilecektir.'
            },
            {
                label: 'Gray/Gri Box',
                description: 'Test, kullanılan VoIP altyapısı ve uygulanan temel güvenlik kontrolleri (ör. ağ segmentasyonu, kimlik doğrulama yöntemleri) hakkında sınırlı bilgilendirme sağlanarak gerçekleştirilecektir.'
            },
            {
                label: 'White/Beyaz Box',
                description: 'Test, VoIP altyapısına ait sistem bileşenleri, yapılandırmalar ve güvenlik kontrolleri hakkında kapsamlı bilgilendirme yapılarak ve test için gerekli kontrollü erişim izinleri sağlanarak gerçekleştirilecektir.'
            }
        ]
    }

    const scheduleOptions = [
        'Mesai saatleri içerisinde yapılabilir.',
        'Mesai saatleri dışında yapılmalıdır.'
    ]

    // Helper component for styled small inputs with suffix
    const renderStyledInput = (label, field) => (
        <div className="mini-input-group">
            <label title={label}>{label}</label>
            <div className="mini-input-row">
                <input
                    type="number"
                    min="0"
                    value={getVal(field)}
                    onChange={(e) => handleComplexChange(field, e.target.value)}
                    placeholder="0"
                />
                <span className="suffix-text">Adet</span>
            </div>
        </div>
    )

    const renderMethodologySection = () => (
        <div className="methodology-section">
            <label className="section-label" style={{ marginBottom: '1rem' }}>
                Test Metodolojisini/Yöntemini Seçiniz
            </label>
            <div className="radio-group" style={{ marginTop: 0 }}>
                {methodologyOptions.map((option) => (
                    <div
                        key={option.label}
                        className={`radio-card ${getVal('methodology') === option.label ? 'selected' : ''}`}
                        onClick={() => handleComplexChange('methodology', option.label)}
                    >
                        <div className="radio-indicator"></div>
                        <div className="radio-content">
                            <span className="radio-label">{option.label}</span>
                            <p className="radio-description">{option.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderScheduleSection = () => (
        <div className="schedule-section">
            <label className="section-label" style={{ marginBottom: '1rem' }}>
                Test Çalışması ...
            </label>
            <div className="radio-group" style={{ marginTop: 0 }}>
                {scheduleOptions.map((option) => (
                    <div
                        key={option}
                        className={`radio-card ${getVal('testSchedule') === option ? 'selected' : ''}`}
                        onClick={() => handleComplexChange('testSchedule', option)}
                    >
                        <div className="radio-indicator"></div>
                        <div className="radio-content">
                            <span className="radio-label">{option}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderTestLocationSection = () => (
        <div className="location-section" style={{ marginTop: '1rem' }}>
            <label className="section-label" style={{ marginBottom: '1rem' }}>
                Test Lokasyonu
            </label>
            <div className="radio-group" style={{ marginTop: 0 }}>
                <div
                    className={`radio-card ${getVal('testLocation') === 'Yerinden' ? 'selected' : ''}`}
                    onClick={() => handleComplexChange('testLocation', 'Yerinden')}
                >
                    <div className="radio-indicator"></div>
                    <div className="radio-content">
                        <span className="radio-label">Yerinden</span>
                        <p className="radio-description">Test çalışması, belirtilen adreste fiziksel olarak gerçekleştirilecektir.</p>
                    </div>
                </div>
                <div
                    className={`radio-card ${getVal('testLocation') === 'Uzaktan' ? 'selected' : ''}`}
                    onClick={() => handleComplexChange('testLocation', 'Uzaktan')}
                >
                    <div className="radio-indicator"></div>
                    <div className="radio-content">
                        <span className="radio-label">Uzaktan</span>
                        <p className="radio-description">
                            {serviceId === 'wirelessNetworkPenetrationTest'
                                ? 'Test çalışması, uzaktan erişim modeli ile gerçekleştirilecektir. Bu kapsamda; kurum tarafından tahsis edilmiş bir bilgisayar ve VPN erişimi sağlanması veya tahsis edilmiş bilgisayar ile birlikte destek personeli desteği gerekmektedir.'
                                : serviceId === 'localNetworkPenetrationTest'
                                    ? 'Uzaktan (VPN erişimi) veya (kurum tarafından tahsis edilecek PC / RDP)'
                                    : 'Test çalışması, uzaktan (VPN vb. yöntemlerle) gerçekleştirilecektir.'}
                        </p>
                    </div>
                </div>
            </div>

            {getVal('testLocation') === 'Yerinden' && (
                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Test Çalışması Yapılacak Lokasyon
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Örn: İstanbul / Kadıköy"
                        value={getVal('testCityDistrict')}
                        onChange={(e) => handleComplexChange('testCityDistrict', e.target.value)}
                        required
                    />
                </div>
            )}
        </div>
    )

    const renderInternetPenetrationTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* Top Section: Total Asset Count */}
                <div className="total-section">
                    <label className="section-label">
                        İnternet üzerinden hizmet veren ve sızma testine tabi tutmak istediğiniz tüm varlıklarınızın adedi
                    </label>
                    <p className="section-helper-text">
                        (Örneğin: firewall/waf, mail sunucu, dns sunucu, active directory/fileserver, Linux/Windows Server, Web App/API, vb. varlıklarınızın toplam adedi.)
                    </p>

                    <div className="form-group mb-0">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Toplam Varlık Adeti
                        </label>
                        <div className="total-input-wrapper">
                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={getVal('totalAssetCount')}
                                onChange={(e) => handleComplexChange('totalAssetCount', e.target.value)}
                                className="form-control"
                                required
                            />
                            <span className="suffix-text" style={{ fontSize: '1rem' }}>Adet</span>
                        </div>
                    </div>
                </div>

                {/* Wrapper for Breakdown Header & Box to keep them close */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        <span>Bunların içerisinde:</span>
                    </div>

                    <div className="breakdown-section">
                        <div className="breakdown-grid">
                            {renderStyledInput('Firewall/WAF/LB', 'firewallWafLbCount')}
                            {renderStyledInput('NAS/Storage', 'nasStorageCount')}
                            {renderStyledInput('Sanal Sunucu', 'virtualServerCount')}
                            {renderStyledInput('FileServer/AD/DNS/Mail Sunucu', 'specialServerCount')}
                            {renderStyledInput('WEB APP/API', 'webAppCount')}
                            {renderStyledInput('Diğer Varlık', 'otherAssetCount')}
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderWebAppPenetrationTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* Top Section: Total Count */}
                <div className="total-section">
                    <label className="section-label">
                        Teste tabi tutmak istediğiniz Web Uygulama/Sunucu Toplam Adet
                    </label>

                    <div className="form-group mb-0">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Toplam Varlık Adeti
                        </label>
                        <div className="total-input-wrapper">
                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={getVal('totalWebAppCount')}
                                onChange={(e) => handleComplexChange('totalWebAppCount', e.target.value)}
                                className="form-control"
                                required
                            />
                            <span className="suffix-text" style={{ fontSize: '1rem' }}>Adet</span>
                        </div>
                    </div>
                </div>

                {/* Wrapper for Breakdown Header & Box */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        <span>Bunların içerisinde:</span>
                    </div>

                    <div className="breakdown-section">
                        <div className="breakdown-grid">
                            {renderStyledInput('Web Uygulama', 'webApplicationCount')}
                            {renderStyledInput('Web Sunucu', 'webServerCount')}
                            {renderStyledInput('Toplam Sayfa & Forum', 'pageForumCount')}
                            {renderStyledInput('Endpoint', 'endpointCount')}
                            {renderStyledInput('API', 'apiCount')}
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderLocalNetworkPenetrationTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. Kısım: Genel Network Bilgileri */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                            <line x1="6" y1="6" x2="6.01" y2="6"></line>
                            <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                        <span>Genel Network Bilgileri</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        <div className="form-group">
                            <p className="section-helper-text" style={{ marginBottom: '1rem' }}>
                                (Örn: 1 adet network → 192.168.0.0/24, 2 adet network → 192.168.10.0/24 ve 10.10.10.0/24)
                            </p>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Toplam Network Sayısı
                            </label>
                            <div className="mini-input-row" style={{ maxWidth: '200px', marginBottom: '1rem' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('localNetworkCount')}
                                    onChange={(e) => handleComplexChange('localNetworkCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Adet</span>
                            </div>
                        </div>

                        <div className="form-group mb-0" style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Tüm Networklerdeki Toplam Aktif Host Sayısı
                            </label>
                            <div className="total-input-wrapper" style={{ maxWidth: '300px' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('localActiveHostCount')}
                                    onChange={(e) => handleComplexChange('localActiveHostCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Adet</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Kısım: Cihaz Dağılımı */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H18a2.5 2.5 0 0 1 0 5H16.5"></path>
                            <path d="M4 15h3"></path>
                            <path d="M17 15h3"></path>
                            <rect x="7" y="12" width="10" height="8" rx="1"></rect>
                        </svg>
                        <span>Tüm Networklerdeki Cihaz Dağılımı</span>
                    </div>

                    <div className="breakdown-section">
                        <div className="breakdown-grid">
                            {renderStyledInput('Router/Switch', 'routerSwitchCount')}
                            {renderStyledInput('Firewall/WAF/LB/DDoS Koruma', 'firewallWafLbDdosCount')}
                            {renderStyledInput('NAS/Storage', 'nasStorageCount')}
                            {renderStyledInput('AP/Wi-Fi Router', 'apWifiRouterCount')}
                            {renderStyledInput('Sunucu Sistemleri', 'serverSystemCount')}
                            {renderStyledInput('PC / Laptop', 'pcLaptopCount')}
                            {renderStyledInput('Mobil Telefon / Tablet', 'mobileDeviceCount')}
                            {renderStyledInput('Diğer Cihazlar', 'otherDeviceCount')}
                        </div>
                    </div>
                </div>

                {renderTestLocationSection()}

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderWirelessNetworkPenetrationTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. Kısım: Genel Bilgiler */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                            <line x1="12" y1="20" x2="12.01" y2="20"></line>
                        </svg>
                        <span>Kablosuz Ağ Bilgileri</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div className="form-group mb-0">
                            <label className="text-sm font-semibold text-gray-700" style={{ marginBottom: '0.5rem', display: 'block' }}>
                                Teste Tabi Tutulacak Kablosuz Ağ Adeti
                            </label>
                            <div className="total-input-wrapper" style={{ maxWidth: '150px' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('wirelessNetworkCount')}
                                    onChange={(e) => handleComplexChange('wirelessNetworkCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Adet</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Kısım: Test Kapsamı */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Test Kapsamı ve Gereksinimler</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        {/* Hotspot/Captive Portal Question */}
                        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #efefef' }}>
                            <label className="section-label" style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'inline-block' }}></span>
                                Hotspot/Captive Portal Test İsteniyor mu?
                            </label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Evet', 'Hayır'].map((option) => (
                                    <div
                                        key={option}
                                        className={`radio-card ${getVal('isHotspotTest') === option ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('isHotspotTest', option)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.6rem', justifyContent: 'center' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <span className="radio-label">{option}</span>
                                    </div>
                                ))}
                            </div>
                            {getVal('isHotspotTest') === 'Evet' && (
                                <div className="form-group mb-0" style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Hotspot/Captive Portal Sayısı
                                    </label>
                                    <div className="total-input-wrapper" style={{ maxWidth: '300px', backgroundColor: 'white' }}>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('hotspotCount')}
                                            onChange={(e) => handleComplexChange('hotspotCount', e.target.value)}
                                            className="form-control"
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Wireless Client Pentest Question */}
                        <div>
                            <label className="section-label" style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'inline-block' }}></span>
                                Kablosuz Ağa Bağlı Cihazlara Sızma Testinde Bulunulması İsteniyor mu?
                            </label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Evet', 'Hayır'].map((option) => (
                                    <div
                                        key={option}
                                        className={`radio-card ${getVal('isWirelessClientTest') === option ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('isWirelessClientTest', option)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.6rem', justifyContent: 'center' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <span className="radio-label">{option}</span>
                                    </div>
                                ))}
                            </div>

                            {getVal('isWirelessClientTest') === 'Evet' && (
                                <div className="form-group mb-0" style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Kablosuz Ağa Bağlı Toplam Host Sayısı
                                    </label>
                                    <div className="total-input-wrapper" style={{ maxWidth: '300px', backgroundColor: 'white' }}>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('wirelessClientCount')}
                                            onChange={(e) => handleComplexChange('wirelessClientCount', e.target.value)}
                                            className="form-control"
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {renderTestLocationSection()}
                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderGenericForm = () => {
        const value = getVal('details')
        return (
            <div className="form-section">
                <h2 className="section-title">Detay: {serviceLabel}</h2>
                <div className="info-box">
                    <p>Bu hizmet için detaylı bilgi formu buraya gelecek.</p>
                    <p className="note">
                        Seçilen hizmet: <strong>{serviceLabel}</strong>
                    </p>
                </div>

                <div className="service-detail-container">
                    <div className="form-group">
                        <label>
                            Ek Açıklamalar (Opsiyonel)
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder={`${serviceLabel} için belirtmek istediğiniz detaylar...`}
                                value={value}
                                onChange={(e) => handleComplexChange('details', e.target.value)}
                            ></textarea>
                        </label>
                    </div>

                    {renderMethodologySection()}
                    {renderScheduleSection()}
                </div>
            </div>
        )
    }

    const renderMobileAppPenetrationTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">


                {/* 1. Kısım: Genel Bilgiler */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                        <span>Genel Bilgiler</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div className="form-group mb-0">
                            <label className="text-sm font-semibold text-gray-700" style={{ marginBottom: '0.5rem', display: 'block' }}>
                                Teste Tabi Tutulacak Mobil Uygulama Sayısı
                            </label>
                            <div className="total-input-wrapper" style={{ maxWidth: '150px' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('mobileAppCount')}
                                    onChange={(e) => handleComplexChange('mobileAppCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Adet</span>
                            </div>
                        </div>

                        {/* Test Ortamı Soru */}
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Test Ortamı</label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Canlı (Production) ortam', 'Test / Pre-prod ortam'].map((env) => (
                                    <div
                                        key={env}
                                        className={`radio-card ${getVal('mobileTestEnvironment') === env ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('mobileTestEnvironment', env)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{env}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 2. Kısım: Platform Seçimi */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        <span>Platform Seçimi ve Uygulama Adetleri</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        <div className="breakdown-grid">
                            <div className="mini-input-group">
                                <label>Android Uygulama Adedi</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('androidAppCount')}
                                        onChange={(e) => handleComplexChange('androidAppCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                            <div className="mini-input-group">
                                <label>iOS Uygulama Adedi</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('iosAppCount')}
                                        onChange={(e) => handleComplexChange('iosAppCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontSize: '0.9rem' }}>
                                Diğer Platformlar
                            </label>
                            <div className="breakdown-grid">
                                <div className="mini-input-group">
                                    <label>Platform Adı</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="text"
                                            placeholder="Örn: HarmonyOS"
                                            value={getVal('otherPlatformName')}
                                            onChange={(e) => handleComplexChange('otherPlatformName', e.target.value)}
                                            style={{ textAlign: 'left' }}
                                        />
                                    </div>
                                </div>
                                <div className="mini-input-group">
                                    <label>Uygulama Adedi</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('otherPlatformCount')}
                                            onChange={(e) => handleComplexChange('otherPlatformCount', e.target.value)}
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Kısım: Teknik Detaylar */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                        <span>Uygulama Teknik Detayları</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="mini-input-group">
                                <label>Kullanıcı Profil / Rol Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('mobileUserRoleCount')}
                                        onChange={(e) => handleComplexChange('mobileUserRoleCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                            <div className="mini-input-group">
                                <label>Uygulama Ekran Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('mobileScreenCount')}
                                        onChange={(e) => handleComplexChange('mobileScreenCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                            <div className="mini-input-group">
                                <label>Sayfa & Form Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('mobilePageFormCount')}
                                        onChange={(e) => handleComplexChange('mobilePageFormCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">
                                IPA/APK Dosyası Sağlanabiliyor mu?
                            </label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Evet', 'Hayır'].map((option) => (
                                    <div
                                        key={option}
                                        className={`radio-card ${getVal('isIpaApkAvailable') === option ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('isIpaApkAvailable', option)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{option}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderSocialEngineeringTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. Kısım: Test Yöntemleri */}
                {/* Tek Kısım: Test Kapsamı */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>Test Kapsamı</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div className="form-group mb-0">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Test Ortamı Seçimi
                            </label>
                            <div className="checkbox-group" style={{ flexDirection: 'row', gap: '1rem' }}>
                                {['E-posta', 'Telefon'].map((method) => (
                                    <div
                                        key={method}
                                        className={`checkbox-card ${(getVal('socialEngineeringMethods') || []).includes(method) ? 'checked' : ''
                                            }`}
                                        onClick={() => {
                                            const currentMethods = getVal('socialEngineeringMethods') || []
                                            const newMethods = currentMethods.includes(method)
                                                ? currentMethods.filter((m) => m !== method)
                                                : [...currentMethods, method]
                                            handleComplexChange('socialEngineeringMethods', newMethods)
                                        }}
                                        style={{ flex: 1, padding: '0.75rem' }}
                                    >
                                        <div className={`checkbox-icon ${(getVal('socialEngineeringMethods') || []).includes(method) ? 'checked' : ''
                                            }`} style={{ width: '20px', height: '20px', fontSize: '0.75rem' }}>
                                            ✓
                                        </div>
                                        <span className="checkbox-label" style={{ fontSize: '1rem' }}>{method}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                            <div className="mini-input-group" style={{ flex: 1 }}>
                                <label>Teste Tabi Kullanıcı Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('socialEngineeringUserCount')}
                                        onChange={(e) => handleComplexChange('socialEngineeringUserCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Kişi</span>
                                </div>
                            </div>
                            <div className="mini-input-group" style={{ flex: 1 }}>
                                <label>Senaryo Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('socialEngineeringScenarioCount')}
                                        onChange={(e) => handleComplexChange('socialEngineeringScenarioCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderDosDdosTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. Kısım: Varlık Bilgisi */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        <span>Test Detayları</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        <div className="form-group mb-0">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Teste Tabi Tutulacak Varlık Adeti
                            </label>
                            <div className="total-input-wrapper" style={{ maxWidth: '150px' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('dosDdosAssetCount')}
                                    onChange={(e) => handleComplexChange('dosDdosAssetCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Adet</span>
                            </div>
                        </div>
                        <div style={{ margin: '1.5rem 0', borderBottom: '1px solid #e2e8f0' }}></div>
                        {/* Layer Selection */}
                        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">
                                Teste Tabi Tutulacak Layer
                            </label>
                            <div className="checkbox-group" style={{ flexDirection: 'row', gap: '1rem' }}>
                                {['Layer 3', 'Layer 4', 'Layer 7'].map((layer) => (
                                    <div
                                        key={layer}
                                        className={`checkbox-card ${(getVal('dosDdosLayers') || []).includes(layer) ? 'checked' : ''
                                            }`}
                                        onClick={() => {
                                            const currentLayers = getVal('dosDdosLayers') || []
                                            const newLayers = currentLayers.includes(layer)
                                                ? currentLayers.filter((l) => l !== layer)
                                                : [...currentLayers, layer]
                                            handleComplexChange('dosDdosLayers', newLayers)
                                        }}
                                        style={{ flex: 1, padding: '0.75rem' }}
                                    >
                                        <div className={`checkbox-icon ${(getVal('dosDdosLayers') || []).includes(layer) ? 'checked' : ''
                                            }`} style={{ width: '20px', height: '20px', fontSize: '0.75rem' }}>
                                            ✓
                                        </div>
                                        <span className="checkbox-label" style={{ fontSize: '1rem' }}>{layer}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bandwidth and Attack Count */}
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div className="mini-input-group" style={{ flex: 1 }}>
                                <label>Atak Bant Genişliği</label>
                                <div className="mini-input-row" style={{ padding: 0, overflow: 'hidden' }}>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('dosDdosBandwidth')}
                                        onChange={(e) => handleComplexChange('dosDdosBandwidth', e.target.value)}
                                        style={{ border: 'none', flex: 1, padding: '0.75rem' }}
                                    />
                                    <div style={{ display: 'flex', borderLeft: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                                        <select
                                            value={getVal('dosDdosBandwidthUnit') || 'Mbps'}
                                            onChange={(e) => handleComplexChange('dosDdosBandwidthUnit', e.target.value)}
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                                padding: '0 0.75rem',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                color: '#475569',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                height: '100%'
                                            }}
                                        >
                                            <option value="Mbps">Mbps</option>
                                            <option value="Gbps">Gbps</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mini-input-group" style={{ flex: 1 }}>
                                <label>Atak Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('dosDdosAttackCount')}
                                        onChange={(e) => handleComplexChange('dosDdosAttackCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderLoadTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* Tek Kısım: Yük Testi Detayları */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        <span>Yük Testi Detayları</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div className="form-group mb-0" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Yük Testi Yapılacak Web Uygulama Sayısı
                            </label>
                            <div className="total-input-wrapper" style={{ maxWidth: '150px' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('loadTestAppCount')}
                                    onChange={(e) => handleComplexChange('loadTestAppCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Adet</span>
                            </div>
                        </div>

                        <div style={{ paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block" style={{ color: '#2563eb' }}>Her Bir Uygulama İçin</label>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div className="mini-input-group">
                                    <label>Test Edilecek Senaryo Sayısı</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('loadTestScenarioCount')}
                                            onChange={(e) => handleComplexChange('loadTestScenarioCount', e.target.value)}
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                                <div className="mini-input-group">
                                    <label>Max Kullanıcı Sayısı</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('loadTestConcurrentUsers')}
                                            onChange={(e) => handleComplexChange('loadTestConcurrentUsers', e.target.value)}
                                        />
                                        <span className="suffix-text">Kişi</span>
                                    </div>
                                </div>
                                <div className="mini-input-group">
                                    <label>Kullanıcı Profil / Rol Sayısı</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('loadTestRoleCount')}
                                            onChange={(e) => handleComplexChange('loadTestRoleCount', e.target.value)}
                                        />
                                        <span className="suffix-text">Rol</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Test Ortamı */}
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Test Ortamı</label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Test / Pre-prod ortam', 'Canlı (Production) ortam'].map((env) => (
                                    <div
                                        key={env}
                                        className={`radio-card ${getVal('loadTestEnvironment') === env ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('loadTestEnvironment', env)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{env}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderIcsScadaTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. Test Ortamı Bilgileri */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                        </svg>
                        <span>Test Ortamı Bilgileri</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {['Test Ortamı Mevcut mu?', 'Üretim Ortamındaki Sistemler Üzerinde Test Yapılması İsteniyor mu?'].map((label, idx) => {
                                const key = idx === 0 ? 'icsTestEnvAvailable' : 'icsProductionTestRequested'
                                return (
                                    <div key={key}>
                                        <label className="text-sm font-semibold text-gray-700 mb-3 block">
                                            {label}
                                        </label>
                                        <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                            {['Evet', 'Hayır'].map((option) => (
                                                <div
                                                    key={option}
                                                    className={`radio-card ${getVal(key) === option ? 'selected' : ''}`}
                                                    onClick={() => handleComplexChange(key, option)}
                                                    style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                                >
                                                    <div className="radio-indicator"></div>
                                                    <div className="radio-content">
                                                        <span className="radio-label">{option}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* 2. Test Kapsamındaki Sistem Sayıları */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        </svg>
                        <span>Test Kapsamındaki Sistem Sayıları</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                            {[
                                { label: 'Sunucu Sayısı', key: 'icsServerCount' },
                                { label: 'Uygulama Sayısı', key: 'icsAppCount' },
                                { label: 'Workstation Sayısı', key: 'icsWorkstationCount' },
                                { label: 'Router Sayısı', key: 'icsRouterCount' }
                            ].map((item) => (
                                <div className="mini-input-group" key={item.key}>
                                    <label>{item.label}</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal(item.key)}
                                            onChange={(e) => handleComplexChange(item.key, e.target.value)}
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Endüstriyel Cihaz Tipleri */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                            <line x1="6" y1="6" x2="6.01" y2="6"></line>
                            <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                        <span>Endüstriyel Cihaz Tipleri (Farklı Tip Sayısı)</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                            {[
                                { label: 'RTU', key: 'icsRtuTypeCount' },
                                { label: 'PLC', key: 'icsPlcTypeCount' },
                                { label: 'Röle', key: 'icsRelayTypeCount' }
                            ].map((item) => (
                                <div className="mini-input-group" key={item.key}>
                                    <label>{item.label}</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal(item.key)}
                                            onChange={(e) => handleComplexChange(item.key, e.target.value)}
                                        />
                                        <span className="suffix-text">Tip</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Sistem Bileşenleri */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span>Sistem Bileşenleri (Adet Bazlı)</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {[
                                { label: 'PLC', key: 'icsPlcCount' },
                                { label: 'RTU / IED', key: 'icsRtuIedCount' },
                                { label: 'HMI', key: 'icsHmiCount' },
                                { label: 'SCADA Sunucusu', key: 'icsScadaServerCount' },
                                { label: 'Historian', key: 'icsHistorianCount' },
                                { label: 'Engineering Workstation', key: 'icsEngWorkstationCount' },
                                { label: 'OPC / OPC UA Server', key: 'icsOpcServerCount' }
                            ].map((item) => (
                                <div className="mini-input-group" key={item.key}>
                                    <label>{item.label}</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal(item.key)}
                                            onChange={(e) => handleComplexChange(item.key, e.target.value)}
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontSize: '0.9rem' }}>Diğer Bileşenler</label>
                            <div className="breakdown-grid">
                                <div className="mini-input-group">
                                    <label>Bileşen Adı</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="text"
                                            placeholder="Örn: Switch, Firewall"
                                            value={getVal('icsOtherComponentName')}
                                            onChange={(e) => handleComplexChange('icsOtherComponentName', e.target.value)}
                                            style={{ textAlign: 'left' }}
                                        />
                                    </div>
                                </div>
                                <div className="mini-input-group">
                                    <label>Adet</label>
                                    <div className="mini-input-row">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={getVal('icsOtherComponentCount')}
                                            onChange={(e) => handleComplexChange('icsOtherComponentCount', e.target.value)}
                                        />
                                        <span className="suffix-text">Adet</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Ağ Mimarisi ve Segmentasyon */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span>Ağ Mimarisi ve Segmentasyon</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">IT – OT Ağ Yapısı</label>
                            <div className="radio-group" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                                {['IT – OT Ayrılmıştır', 'OT DMZ Bulunmaktadır', 'Flat (Tek Segment) Yapı', 'Bilinmiyor'].map((structure) => (
                                    <div
                                        key={structure}
                                        className={`radio-card ${getVal('icsNetworkStructure') === structure ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('icsNetworkStructure', structure)}
                                        style={{ minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{structure}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">IT → OT Erişimi Mevcut mu?</label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Evet', 'Hayır', 'Bilinmiyor'].map((option) => (
                                    <div
                                        key={option}
                                        className={`radio-card ${getVal('icsItOtAccess') === option ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('icsItOtAccess', option)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{option}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Uzaktan Erişim Yöntemleri */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        <span>Uzaktan Erişim Yöntemleri</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <div className="checkbox-group" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                            {['VPN', 'Jump Server', 'Vendor Remote Access', 'Uzaktan Erişim Yok'].map((method) => (
                                <div
                                    key={method}
                                    className={`checkbox-card ${(getVal('icsRemoteAccessMethods') || []).includes(method) ? 'checked' : ''
                                        }`}
                                    onClick={() => {
                                        const currentMethods = getVal('icsRemoteAccessMethods') || []
                                        const newMethods = currentMethods.includes(method)
                                            ? currentMethods.filter((m) => m !== method)
                                            : [...currentMethods, method]
                                        handleComplexChange('icsRemoteAccessMethods', newMethods)
                                    }}
                                    style={{ width: '100%', padding: '0.75rem' }}
                                >
                                    <div className={`checkbox-icon ${(getVal('icsRemoteAccessMethods') || []).includes(method) ? 'checked' : ''
                                        }`} style={{ width: '20px', height: '20px', fontSize: '0.75rem' }}>
                                        ✓
                                    </div>
                                    <span className="checkbox-label" style={{ fontSize: '1rem' }}>{method}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 7. Kablosuz İletişim */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                            <line x1="12" y1="20" x2="12.01" y2="20"></line>
                        </svg>
                        <span>Kablosuz İletişim</span>
                    </div>
                    <div className="breakdown-section" style={{ padding: '1rem' }}>
                        <label className="text-sm font-semibold text-gray-700 mb-3 block">
                            EKS Sisteminde Kablosuz Ağ Teknolojileri Kullanılmakta mıdır?
                        </label>
                        <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                            {['Evet', 'Hayır'].map((option) => (
                                <div
                                    key={option}
                                    className={`radio-card ${getVal('icsWirelessUsed') === option ? 'selected' : ''}`}
                                    onClick={() => handleComplexChange('icsWirelessUsed', option)}
                                    style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                >
                                    <div className="radio-indicator"></div>
                                    <div className="radio-content">
                                        <span className="radio-label">{option}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderSourceCodeAnalysisForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. Uygulama ve Kod Bilgileri */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        <span>Uygulama ve Kod İstatistikleri</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        <div className="breakdown-grid">
                            <div className="mini-input-group">
                                <label>Uygulama Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('sourceCodeAppCount')}
                                        onChange={(e) => handleComplexChange('sourceCodeAppCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                            <div className="mini-input-group">
                                <label>Kod Satırı Sayısı (LOC)</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('sourceCodeLineCount')}
                                        onChange={(e) => handleComplexChange('sourceCodeLineCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Satır</span>
                                </div>
                            </div>
                            <div className="mini-input-group">
                                <label>Dosya Sayısı</label>
                                <div className="mini-input-row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={getVal('sourceCodeFileCount')}
                                        onChange={(e) => handleComplexChange('sourceCodeFileCount', e.target.value)}
                                    />
                                    <span className="suffix-text">Adet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Teknoloji Stack */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                            <line x1="6" y1="6" x2="6.01" y2="6"></line>
                            <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                        <span>Kullanılan Teknolojiler</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        <div className="form-group mb-0">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Programlama Dilleri, Framework ve Teknolojiler
                            </label>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Örn: Java (Spring Boot), React, PostgreSQL, Redis vb."
                                value={getVal('sourceCodeTechStack')}
                                onChange={(e) => handleComplexChange('sourceCodeTechStack', e.target.value)}
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-2">
                                Lütfen projede kullanılan tüm ana teknolojileri, dilleri ve kütüphaneleri belirtiniz.
                            </p>
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderVoipPenetrationTestForm = () => (
        <div className="form-section">
            <h2 className="section-title">Detay: {serviceLabel}</h2>

            <div className="service-detail-container">
                {/* 1. VoIP Sistem Detayları */}
                <div style={{ marginBottom: '1rem' }}>
                    <div className="breakdown-header" style={{ marginBottom: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>VoIP Sistemi Detayları</span>
                    </div>

                    <div className="breakdown-section" style={{ padding: '1.5rem' }}>
                        {/* Sistem Türü */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">VoIP Sistemi Türü</label>
                            <div className="radio-group" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                                {['On-prem IP PBX', 'Cloud / Hosted VoIP', 'Hibrit (On-prem + Cloud)'].map((type) => (
                                    <div
                                        key={type}
                                        className={`radio-card ${getVal('voipSystemType') === type ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('voipSystemType', type)}
                                        style={{ minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kullanıcı Sayısı */}
                        <div className="form-group mb-0" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Kullanıcı / Dahili Numara Sayısı
                            </label>
                            <div className="total-input-wrapper" style={{ maxWidth: '200px' }}>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={getVal('voipExtensionCount')}
                                    onChange={(e) => handleComplexChange('voipExtensionCount', e.target.value)}
                                    className="form-control"
                                />
                                <span className="suffix-text">Kişi</span>
                            </div>
                        </div>

                        {/* Erişim */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">İnternet Üzerinden Erişim Var mı?</label>
                            <div className="radio-group" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                                {['Evet (Internet’e açık)', 'VPN ile erişim', 'Hayır (sadece iç ağ)'].map((access) => (
                                    <div
                                        key={access}
                                        className={`radio-card ${getVal('voipInternetAccess') === access ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('voipInternetAccess', access)}
                                        style={{ minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{access}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ortam */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Test Ortamı</label>
                            <div className="radio-group" style={{ marginTop: 0, flexDirection: 'row', gap: '1rem' }}>
                                {['Canlı ortam', 'Test / Lab ortamı'].map((env) => (
                                    <div
                                        key={env}
                                        className={`radio-card ${getVal('voipTestEnvironment') === env ? 'selected' : ''}`}
                                        onClick={() => handleComplexChange('voipTestEnvironment', env)}
                                        style={{ flex: 1, minHeight: 'auto', padding: '0.75rem' }}
                                    >
                                        <div className="radio-indicator"></div>
                                        <div className="radio-content">
                                            <span className="radio-label">{env}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {renderMethodologySection()}
                {renderScheduleSection()}
            </div>
        </div>
    )

    const renderServiceForm = () => {
        switch (serviceId) {
            case 'internetPenetrationTest':
                return renderInternetPenetrationTestForm()
            case 'webAppPenetrationTest':
                return renderWebAppPenetrationTestForm()
            case 'localNetworkPenetrationTest':
                return renderLocalNetworkPenetrationTestForm()
            case 'wirelessNetworkPenetrationTest':
                return renderWirelessNetworkPenetrationTestForm()
            case 'mobileAppPenetrationTest':
                return renderMobileAppPenetrationTestForm()
            case 'socialEngineeringTest':
                return renderSocialEngineeringTestForm()
            case 'dosDdosTest':
                return renderDosDdosTestForm()
            case 'webAppLoadTest':
                return renderLoadTestForm()
            case 'icsScadaTest':
                return renderIcsScadaTestForm()
            case 'sourceCodeAnalysis':
                return renderSourceCodeAnalysisForm()
            case 'voipPenetrationTest':
                return renderVoipPenetrationTestForm()
            default:
                return renderGenericForm()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {renderServiceForm()}

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

export default StepServiceDetails
