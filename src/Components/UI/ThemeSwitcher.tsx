import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useTheme, type ColorTheme, type FontTheme } from '../../Utils/useTheme';

interface ThemeSwitcherProps {
    isOpen: boolean;
    onClose: () => void;
}

const COLOR_THEME_INFO = {
    light: {
        name: 'Light',
        description: 'Clean & Professional',
        preview: '#ffffff',
        accent: '#2563eb'
    },
    dark: {
        name: 'Dark',
        description: 'Modern & Sleek',
        preview: '#030712',
        accent: '#3b82f6'
    },
    purple: {
        name: 'Purple',
        description: 'Creative & Playful',
        preview: '#faf5ff',
        accent: '#9333ea'
    },
    red: {
        name: 'Red',
        description: 'Bold & Energetic',
        preview: '#fef2f2',
        accent: '#dc2626'
    },
    olive: {
        name: 'Olive',
        description: 'Natural & Organic',
        preview: '#f7f8f3',
        accent: '#707a69'
    }
};

const FONT_THEME_INFO = {
    default: {
        name: 'Default',
        description: 'Sans-serif, professional',
        example: 'The quick brown fox'
    },
    future: {
        name: 'Future',
        description: 'Monospace, tech-style',
        example: 'THE QUICK BROWN FOX'
    },
    vintage: {
        name: 'Vintage',
        description: 'Serif, classical',
        example: 'The Quick Brown Fox'
    }
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isOpen, onClose }) => {
    const { colorTheme, fontTheme, setColorTheme, setFontTheme, resetThemes } = useTheme();
    const [activeTab, setActiveTab] = useState<'colors' | 'fonts'>('colors');

    // Keyboard shortcuts
    useEffect(() => {
        if (!isOpen) return;

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key >= '1' && event.key <= '5') {
                const index = parseInt(event.key) - 1;
                const themes: ColorTheme[] = ['light', 'dark', 'purple', 'red', 'olive'];
                if (themes[index]) {
                    setColorTheme(themes[index]);
                }
            }

            if (event.key === 'Tab' || event.key === 'ArrowRight') {
                event.preventDefault();
                setActiveTab(prev => prev === 'colors' ? 'fonts' : 'colors');
            }

            if (event.key === 'r' || event.key === 'R') {
                resetThemes();
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [isOpen, setColorTheme, resetThemes]);

    const ThemeCard: React.FC<{
        theme: ColorTheme;
        isActive: boolean;
        onClick: () => void;
    }> = ({ theme, isActive, onClick }) => {
        const info = COLOR_THEME_INFO[theme];

        return (
            <button
                onClick={onClick}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    border: `2px solid ${isActive ? info.accent : 'var(--color-border, #e5e7eb)'}`,
                    borderRadius: '0.75rem',
                    background: 'var(--color-surface, #ffffff)',
                    cursor: 'pointer',
                    transition: 'all 200ms ease-out',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isActive ? 'var(--shadow-hover, 0 8px 25px rgba(0, 0, 0, 0.15))' : 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1))'
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.borderColor = info.accent;
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'var(--color-border, #e5e7eb)';
                    }
                }}
            >
                {/* Preview Circle */}
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${info.preview} 0%, ${info.accent} 100%)`,
                        marginBottom: '0.75rem',
                        border: '3px solid var(--color-border, #e5e7eb)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '20px',
                            height: '20px',
                            background: info.accent,
                            borderRadius: '50%',
                            opacity: 0.8
                        }}
                    />
                </div>

                {/* Theme Info */}
                <h3
                    style={{
                        margin: '0 0 0.25rem 0',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary, #1f2937)'
                    }}
                >
                    {info.name}
                </h3>
                <p
                    style={{
                        margin: 0,
                        fontSize: '0.75rem',
                        color: 'var(--color-text-secondary, #6b7280)',
                        textAlign: 'center'
                    }}
                >
                    {info.description}
                </p>

                {isActive && (
                    <div
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            background: info.accent,
                            color: 'white',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: 500
                        }}
                    >
                        Active
                    </div>
                )}
            </button>
        );
    };

    const FontCard: React.FC<{
        theme: FontTheme;
        isActive: boolean;
        onClick: () => void;
    }> = ({ theme, isActive, onClick }) => {
        const info = FONT_THEME_INFO[theme];

        return (
            <button
                onClick={onClick}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem 1rem',
                    border: `2px solid ${isActive ? 'var(--color-primary, #2563eb)' : 'var(--color-border, #e5e7eb)'}`,
                    borderRadius: '0.75rem',
                    background: 'var(--color-surface, #ffffff)',
                    cursor: 'pointer',
                    transition: 'all 200ms ease-out',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isActive ? 'var(--shadow-hover, 0 8px 25px rgba(0, 0, 0, 0.15))' : 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1))'
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.borderColor = 'var(--color-primary, #2563eb)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'var(--color-border, #e5e7eb)';
                    }
                }}
            >
                {/* Font Preview */}
                <div
                    className={`font-theme-${theme}`}
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: theme === 'future' ? 700 : theme === 'vintage' ? 400 : 500,
                        marginBottom: '0.75rem',
                        color: 'var(--color-text-primary, #1f2937)',
                        textAlign: 'center',
                        lineHeight: 1.2
                    }}
                >
                    {info.example}
                </div>

                {/* Font Info */}
                <h3
                    style={{
                        margin: '0 0 0.25rem 0',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary, #1f2937)'
                    }}
                >
                    {info.name}
                </h3>
                <p
                    style={{
                        margin: 0,
                        fontSize: '0.75rem',
                        color: 'var(--color-text-secondary, #6b7280)',
                        textAlign: 'center'
                    }}
                >
                    {info.description}
                </p>

                {isActive && (
                    <div
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            background: 'var(--color-primary, #2563eb)',
                            color: 'white',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: 500
                        }}
                    >
                        Active
                    </div>
                )}
            </button>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="🎨 Theme Switcher" size="xl">
            <div style={{ minHeight: '400px' }}>
                {/* Tabs */}
                <div
                    style={{
                        display: 'flex',
                        borderBottom: '1px solid var(--color-border, #e5e7eb)',
                        marginBottom: '1.5rem'
                    }}
                >
                    <button
                        onClick={() => setActiveTab('colors')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            background: 'none',
                            color: activeTab === 'colors' ? 'var(--color-primary, #2563eb)' : 'var(--color-text-secondary, #6b7280)',
                            borderBottom: activeTab === 'colors' ? '2px solid var(--color-primary, #2563eb)' : '2px solid transparent',
                            cursor: 'pointer',
                            fontWeight: activeTab === 'colors' ? 600 : 400,
                            transition: 'all 150ms ease-out'
                        }}
                    >
                        🎨 Color Themes
                    </button>
                    <button
                        onClick={() => setActiveTab('fonts')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            background: 'none',
                            color: activeTab === 'fonts' ? 'var(--color-primary, #2563eb)' : 'var(--color-text-secondary, #6b7280)',
                            borderBottom: activeTab === 'fonts' ? '2px solid var(--color-primary, #2563eb)' : '2px solid transparent',
                            cursor: 'pointer',
                            fontWeight: activeTab === 'fonts' ? 600 : 400,
                            transition: 'all 150ms ease-out'
                        }}
                    >
                        🔤 Font Themes
                    </button>
                </div>

                {/* Color Themes */}
                {activeTab === 'colors' && (
                    <div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}
                        >
                            {(Object.keys(COLOR_THEME_INFO) as ColorTheme[]).map((theme) => (
                                <ThemeCard
                                    key={theme}
                                    theme={theme}
                                    isActive={colorTheme === theme}
                                    onClick={() => setColorTheme(theme)}
                                />
                            ))}
                        </div>

                        <div
                            style={{
                                padding: '1rem',
                                background: 'var(--color-background-secondary, #f9fafb)',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                color: 'var(--color-text-secondary, #6b7280)'
                            }}
                        >
                            💡 <strong>Tip:</strong> Use keyboard shortcuts 1-5 to quickly switch themes!
                        </div>
                    </div>
                )}

                {/* Font Themes */}
                {activeTab === 'fonts' && (
                    <div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}
                        >
                            {(Object.keys(FONT_THEME_INFO) as FontTheme[]).map((theme) => (
                                <FontCard
                                    key={theme}
                                    theme={theme}
                                    isActive={fontTheme === theme}
                                    onClick={() => setFontTheme(theme)}
                                />
                            ))}
                        </div>

                        <div
                            style={{
                                padding: '1rem',
                                background: 'var(--color-background-secondary, #f9fafb)',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                color: 'var(--color-text-secondary, #6b7280)'
                            }}
                        >
                            📝 <strong>Font Examples:</strong><br />
                            • Default: Clean, professional sans-serif<br />
                            • Future: Monospace with cyber effects<br />
                            • Vintage: Classical serif with elegant styling
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--color-border, #e5e7eb)'
                    }}
                >
                    <button
                        onClick={resetThemes}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--color-border, #e5e7eb)',
                            background: 'var(--color-surface, #ffffff)',
                            color: 'var(--color-text-secondary, #6b7280)',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 150ms ease-out'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-background-secondary, #f9fafb)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-surface, #ffffff)';
                        }}
                    >
                        🔄 Reset to Default
                    </button>

                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary, #9ca3af)' }}>
                        Press <kbd style={{ padding: '0.125rem 0.25rem', background: 'var(--color-background-secondary, #f9fafb)', borderRadius: '0.25rem' }}>ESC</kbd> to close
                    </div>
                </div>
            </div>
        </Modal>
    );
};