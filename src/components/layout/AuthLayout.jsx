import React from 'react';

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f2f5',
            fontFamily: "'Segoe UI', sans-serif",
        }}>
            <div style={{
                display: 'flex',
                width: '860px',
                minHeight: '520px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                background: '#fff',
            }}>
                {/* Left panel */}
                <div style={{
                    width: '240px',
                    background: '#0068ff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '36px 28px',
                    flexShrink: 0,
                }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '34px', height: '34px',
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span style={{ fontSize: '17px', fontWeight: 600, color: '#fff' }}>{title}</span>
                    </div>

                    {/* Tagline + dots */}
                    <div>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px' }}>
                            {subtitle}
                        </p>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ height: '4px', width: '20px', borderRadius: '2px', background: '#fff' }} />
                            <div style={{ height: '4px', width: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
                            <div style={{ height: '4px', width: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
                        </div>
                    </div>
                </div>

                {/* Right panel */}
                <div style={{
                    flex: 1,
                    padding: '44px 48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;