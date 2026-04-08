import React from 'react';
import logo from '../../assets/chat-agent-logo.svg';
import image from '../../assets/image.png';

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E3F2FD',
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
                    alignItems: 'center',
                    padding: '36px 28px',
                    flexShrink: 0,
                }}>
                    {/* Logo + Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', alignSelf: 'flex-start' }}>
                        <div style={{
                            width: '40px', height: '40px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.16)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <img src={logo} alt="ChatAgent logo" style={{ width: '26px', height: '26px' }} />
                        </div>
                        <span style={{ fontSize: '17px', fontWeight: 600, color: '#fff' }}>{title}</span>
                    </div>

                    {/* Center Logo - Large */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={image} alt="ChatAgent large image" style={{ width: '200px', height: '200px', opacity: 0.9, borderRadius: "15px"}} />
                    </div>

                    {/* Tagline + dots */}
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px' }}>
                            {subtitle}
                        </p>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
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