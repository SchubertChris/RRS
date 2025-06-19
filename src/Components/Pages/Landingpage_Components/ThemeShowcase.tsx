// src/Components/Pages/Landingpage_Components/ThemeShowcase.tsx

import React, { useState } from 'react';
import { useTheme } from '@u/useTheme';

export const ThemeShowcase: React.FC = () => {
    const { colorTheme, fontTheme, setColorTheme, setFontTheme } = useTheme();
    const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<'colors' | 'fonts'>('colors');

    const colorThemes = [
        {
            key: 'light' as const,
            name: 'Light',
            description: 'Clean & Professional',
            icon: '☀️',
            primary: '#2563eb',
            background: '#ffffff',
            accent: '#f3f4f6',
            text: '#1f2937'
        },
        {
            key: 'dark' as const,
            name: 'Dark',
            description: 'Modern & Sleek',
            icon: '🌙',
            primary: '#3b82f6',
            background: '#030712',
            accent: '#1f2937',
            text: '#f9fafb'
        },
        {
            key: 'purple' as const,
            name: 'Purple',
            description: 'Creative & Playful',
            icon: '💜',
            primary: '#9333ea',
            background: '#faf5ff',
            accent: '#f3e8ff',
            text: '#581c87'
        },
        {
            key: 'red' as const,
            name: 'Red',
            description: 'Bold & Energetic',
            icon: '❤️',
            primary: '#dc2626',
            background: '#fef2f2',
            accent: '#fee2e2',
            text: '#7f1d1d'
        },
        {
            key: 'olive' as const,
            name: 'Olive',
            description: 'Natural & Organic',
            icon: '🌿',
            primary: '#707a69',
            background: '#f7f8f3',
            accent: '#eeefe7',
            text: '#3a3f36'
        }
    ];

    const fontThemes = [
        {
            key: 'default' as const,
            name: 'Default',
            description: 'Inter - Sans-serif, professional',
            example: 'The quick brown fox jumps',
            className: 'font-default'
        },
        {
            key: 'future' as const,
            name: 'Future',
            description: 'JetBrains Mono - Monospace, tech-style',
            example: 'THE QUICK BROWN FOX JUMPS',
            className: 'font-future'
        },
        {
            key: 'vintage' as const,
            name: 'Vintage',
            description: 'Playfair Display - Serif, classical',
            example: 'The Quick Brown Fox Jumps',
            className: 'font-vintage'
        }
    ];

    return (
        <section className="theme-showcase-section section-padded">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title title-gradient">Live Theme-Vorschau</h2>
                    <p className="section-subtitle">
                        Klicke auf ein Theme, um es sofort zu testen. Alle Änderungen werden automatisch gespeichert.
                    </p>
                </div>

                {/* Section Tabs */}
                <div className="showcase-tabs">
                    <button
                        className={`tab-button ${activeSection === 'colors' ? 'active' : ''}`}
                        onClick={() => setActiveSection('colors')}
                    >
                        🎨 Color Themes
                    </button>
                    <button
                        className={`tab-button ${activeSection === 'fonts' ? 'active' : ''}`}
                        onClick={() => setActiveSection('fonts')}
                    >
                        🔤 Font Themes
                    </button>
                </div>

                {/* Color Themes Grid */}
                {activeSection === 'colors' && (
                    <div className="theme-grid color-grid">
                        {colorThemes.map((theme) => (
                            <div
                                key={theme.key}
                                className={`theme-card ${colorTheme === theme.key ? 'active' : ''} ${hoveredTheme === theme.key ? 'hovered' : ''}`}
                                onClick={() => setColorTheme(theme.key)}
                                onMouseEnter={() => setHoveredTheme(theme.key)}
                                onMouseLeave={() => setHoveredTheme(null)}
                            >
                                {/* Theme Preview Window */}
                                <div className="theme-preview">
                                    <div
                                        className="preview-window"
                                        style={{
                                            background: theme.background,
                                            color: theme.text
                                        }}
                                    >
                                        {/* Window Header */}
                                        <div
                                            className="preview-header"
                                            style={{ background: theme.accent }}
                                        >
                                            <div className="preview-dots">
                                                <span style={{ background: '#ff5f56' }}></span>
                                                <span style={{ background: '#ffbd2e' }}></span>
                                                <span style={{ background: '#27ca3f' }}></span>
                                            </div>
                                            <div className="preview-title">{theme.name}</div>
                                        </div>

                                        {/* Window Content */}
                                        <div className="preview-content">
                                            <div
                                                className="preview-nav"
                                                style={{ background: theme.accent }}
                                            >
                                                <div className="nav-item active" style={{ background: theme.primary }}></div>
                                                <div className="nav-item"></div>
                                                <div className="nav-item"></div>
                                            </div>

                                            <div className="preview-body">
                                                <div className="preview-card" style={{ background: theme.accent }}>
                                                    <div className="card-line primary" style={{ background: theme.primary }}></div>
                                                    <div className="card-line secondary"></div>
                                                    <div className="card-line short"></div>
                                                </div>
                                                <div className="preview-button" style={{ background: theme.primary }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Theme Info */}
                                <div className="theme-info">
                                    <div className="theme-header">
                                        <span className="theme-icon">{theme.icon}</span>
                                        <h3 className="theme-name">{theme.name}</h3>
                                    </div>
                                    <p className="theme-description">{theme.description}</p>

                                    {/* Color Palette */}
                                    <div className="color-palette">
                                        <div
                                            className="color-swatch primary"
                                            style={{ background: theme.primary }}
                                            title="Primary Color"
                                        ></div>
                                        <div
                                            className="color-swatch background"
                                            style={{ background: theme.background, border: '1px solid #ccc' }}
                                            title="Background Color"
                                        ></div>
                                        <div
                                            className="color-swatch accent"
                                            style={{ background: theme.accent }}
                                            title="Accent Color"
                                        ></div>
                                    </div>

                                    {/* Active Indicator */}
                                    {colorTheme === theme.key && (
                                        <div className="active-indicator">
                                            <span className="active-badge">✓ Aktiv</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Font Themes Grid */}
                {activeSection === 'fonts' && (
                    <div className="theme-grid font-grid">
                        {fontThemes.map((theme) => (
                            <div
                                key={theme.key}
                                className={`font-theme-card ${fontTheme === theme.key ? 'active' : ''}`}
                                onClick={() => setFontTheme(theme.key)}
                            >
                                <div className="font-preview-large">
                                    <div className={`font-sample-large ${theme.className}`}>
                                        Aa
                                    </div>
                                </div>

                                <div className="font-info">
                                    <h3 className="font-name">{theme.name}</h3>
                                    <p className="font-description">{theme.description}</p>
                                    <div className={`font-example ${theme.className}`}>
                                        {theme.example}
                                    </div>
                                </div>

                                {fontTheme === theme.key && (
                                    <div className="active-indicator">
                                        <span className="active-badge">✓ Aktiv</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="theme-actions">
                    <div className="action-hint glass-light">
                        <span className="hint-icon">💡</span>
                        <span>
                            Nutze die Tastenkürzel <kbd>1-5</kbd> für schnellen Theme-Wechsel
                            oder <kbd>T</kbd> für Dark/Light Toggle
                        </span>
                    </div>

                    <div className="current-combination">
                        <h4>Aktuelle Kombination:</h4>
                        <div className="combination-preview">
                            <span className="current-color">{colorThemes.find(t => t.key === colorTheme)?.name}</span>
                            <span className="separator">+</span>
                            <span className="current-font">{fontThemes.find(t => t.key === fontTheme)?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};