// src/Components/UI/ThemeSwitcher.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    FaCog, FaPalette, FaFont, FaSun, FaMoon, FaTimes,
    FaCheck, FaKeyboard, FaRedo, FaChevronLeft, FaChevronRight,
    FaEye, FaDownload, FaUpload, FaHeart
} from 'react-icons/fa';
import { useTheme } from '@u/useTheme';

type ColorTheme = 'light' | 'dark' | 'purple' | 'red' | 'olive';
type FontTheme = 'default' | 'future' | 'vintage';

interface ThemeInfo {
    name: string;
    description: string;
    icon: string;
    preview: {
        primary: string;
        background: string;
        surface: string;
        text: string;
        accent: string;
    };
}

interface FontInfo {
    name: string;
    description: string;
    icon: string;
    example: string;
    className: string;
}

const COLOR_THEMES: Record<ColorTheme, ThemeInfo> = {
    light: {
        name: 'Light Theme',
        description: 'Clean und professionell für den täglichen Gebrauch',
        icon: '☀️',
        preview: {
            primary: '#2563eb',
            background: '#ffffff',
            surface: '#f8fafc',
            text: '#1e293b',
            accent: '#0ea5e9'
        }
    },
    dark: {
        name: 'Dark Theme',
        description: 'Cyberpunk-inspiriert für nächtliche Sessions',
        icon: '🌙',
        preview: {
            primary: '#00ffff',
            background: '#0a0a0f',
            surface: '#1a1a2e',
            text: '#ffffff',
            accent: '#8000ff'
        }
    },
    purple: {
        name: 'Purple Theme',
        description: 'Kreativ und verspielt für Designer',
        icon: '💜',
        preview: {
            primary: '#9333ea',
            background: '#faf5ff',
            surface: '#f3e8ff',
            text: '#581c87',
            accent: '#c084fc'
        }
    },
    red: {
        name: 'Red Theme',
        description: 'Kraftvoll und energisch für Produktivität',
        icon: '❤️',
        preview: {
            primary: '#dc2626',
            background: '#fef2f2',
            surface: '#fee2e2',
            text: '#7f1d1d',
            accent: '#f87171'
        }
    },
    olive: {
        name: 'Olive Theme',
        description: 'Natürlich und beruhigend für entspanntes Arbeiten',
        icon: '🌿',
        preview: {
            primary: '#65a30d',
            background: '#f7f8f3',
            surface: '#ecfccb',
            text: '#365314',
            accent: '#84cc16'
        }
    }
};

const FONT_THEMES: Record<FontTheme, FontInfo> = {
    default: {
        name: 'Default',
        description: 'Inter - Modern Sans-Serif',
        icon: '📝',
        example: 'The quick brown fox jumps over the lazy dog',
        className: 'font-theme-default'
    },
    future: {
        name: 'Future',
        description: 'JetBrains Mono - Tech Monospace',
        icon: '🚀',
        example: 'THE.QUICK.BROWN.FOX.JUMPS.OVER.LAZY.DOG',
        className: 'font-theme-future'
    },
    vintage: {
        name: 'Vintage',
        description: 'Playfair Display - Classical Serif',
        icon: '📜',
        example: 'The Quick Brown Fox Jumps Over the Lazy Dog',
        className: 'font-theme-vintage'
    }
};

export const ThemeSwitcher: React.FC = () => {
    const { colorTheme, fontTheme, setColorTheme, setFontTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'advanced'>('colors');
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
    const [previewMode, setPreviewMode] = useState<ColorTheme | null>(null);
    const switcherRef = useRef<HTMLDivElement>(null);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            // Global shortcut to open theme switcher
            if ((event.ctrlKey || event.metaKey) && event.key === 't') {
                event.preventDefault();
                setIsOpen(!isOpen);
                return;
            }

            // Only handle shortcuts when switcher is open
            if (!isOpen) return;

            switch (event.key) {
                case 'Escape':
                    setIsOpen(false);
                    setPreviewMode(null);
                    break;

                case 'Tab':
                    event.preventDefault();
                    setActiveTab(prev => {
                        if (prev === 'colors') return 'fonts';
                        if (prev === 'fonts') return 'advanced';
                        return 'colors';
                    });
                    break;

                case 'ArrowLeft':
                    event.preventDefault();
                    if (activeTab === 'colors') {
                        const themes = Object.keys(COLOR_THEMES) as ColorTheme[];
                        const currentIndex = themes.indexOf(colorTheme);
                        const newIndex = currentIndex > 0 ? currentIndex - 1 : themes.length - 1;
                        const newTheme = themes[newIndex];
                        setPreviewMode(newTheme);
                    }
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    if (activeTab === 'colors') {
                        const themes = Object.keys(COLOR_THEMES) as ColorTheme[];
                        const currentIndex = themes.indexOf(colorTheme);
                        const newIndex = currentIndex < themes.length - 1 ? currentIndex + 1 : 0;
                        const newTheme = themes[newIndex];
                        setPreviewMode(newTheme);
                    }
                    break;

                case 'Enter':
                    if (previewMode) {
                        setColorTheme(previewMode);
                        setPreviewMode(null);
                    }
                    break;

                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    event.preventDefault();
                    if (activeTab === 'colors') {
                        const themes = Object.keys(COLOR_THEMES) as ColorTheme[];
                        const index = parseInt(event.key) - 1;
                        if (themes[index]) {
                            setColorTheme(themes[index]);
                        }
                    }
                    break;

                case 'h':
                case 'H':
                    event.preventDefault();
                    setShowKeyboardHelp(!showKeyboardHelp);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [isOpen, activeTab, colorTheme, previewMode, setColorTheme, showKeyboardHelp]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setPreviewMode(null);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleColorThemeSelect = (theme: ColorTheme) => {
        setColorTheme(theme);
        setPreviewMode(null);
    };

    const handlePreview = (theme: ColorTheme) => {
        setPreviewMode(theme);
        // Apply preview temporarily
        document.documentElement.setAttribute('data-theme', theme);
    };

    const cancelPreview = () => {
        setPreviewMode(null);
        // Restore current theme
        document.documentElement.setAttribute('data-theme', colorTheme);
    };

    const exportThemeSettings = () => {
        const settings = {
            colorTheme,
            fontTheme,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(settings, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `theme-settings-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importThemeSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settings = JSON.parse(e.target?.result as string);
                if (settings.colorTheme && COLOR_THEMES[settings.colorTheme]) {
                    setColorTheme(settings.colorTheme);
                }
                if (settings.fontTheme && FONT_THEMES[settings.fontTheme]) {
                    setFontTheme(settings.fontTheme);
                }
            } catch (error) {
                console.error('Error importing theme settings:', error);
            }
        };
        reader.readAsText(file);
    };

    const renderColorThemes = () => (
        <div className="theme-grid">
            {Object.entries(COLOR_THEMES).map(([key, theme]) => {
                const isActive = colorTheme === key;
                const isPreviewing = previewMode === key;

                return (
                    <div
                        key={key}
                        className={`theme-card ${isActive ? 'active' : ''} ${isPreviewing ? 'previewing' : ''}`}
                        onClick={() => handleColorThemeSelect(key as ColorTheme)}
                        onMouseEnter={() => handlePreview(key as ColorTheme)}
                        onMouseLeave={cancelPreview}
                    >
                        <div className="theme-preview-window">
                            <div
                                className="preview-header"
                                style={{ background: theme.preview.primary }}
                            >
                                <div className="preview-dots">
                                    <span style={{ background: '#ff5f56' }}></span>
                                    <span style={{ background: '#ffbd2e' }}></span>
                                    <span style={{ background: '#27ca3f' }}></span>
                                </div>
                            </div>
                            <div
                                className="preview-body"
                                style={{
                                    background: theme.preview.background,
                                    color: theme.preview.text
                                }}
                            >
                                <div
                                    className="preview-sidebar"
                                    style={{ background: theme.preview.surface }}
                                >
                                    <div
                                        className="sidebar-item active"
                                        style={{ background: theme.preview.primary }}
                                    ></div>
                                    <div className="sidebar-item"></div>
                                    <div className="sidebar-item"></div>
                                </div>
                                <div className="preview-content">
                                    <div
                                        className="content-card"
                                        style={{ background: theme.preview.surface }}
                                    >
                                        <div
                                            className="card-accent"
                                            style={{ background: theme.preview.accent }}
                                        ></div>
                                        <div className="card-lines">
                                            <div className="line long"></div>
                                            <div className="line medium"></div>
                                            <div className="line short"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="theme-info">
                            <div className="theme-header">
                                <span className="theme-icon">{theme.icon}</span>
                                <h3 className="theme-name">{theme.name}</h3>
                                {isActive && <FaCheck className="active-indicator" />}
                            </div>
                            <p className="theme-description">{theme.description}</p>

                            <div className="color-palette">
                                <div
                                    className="color-swatch"
                                    style={{ background: theme.preview.primary }}
                                    title="Primary"
                                ></div>
                                <div
                                    className="color-swatch"
                                    style={{ background: theme.preview.accent }}
                                    title="Accent"
                                ></div>
                                <div
                                    className="color-swatch"
                                    style={{ background: theme.preview.surface }}
                                    title="Surface"
                                ></div>
                                <div
                                    className="color-swatch"
                                    style={{ background: theme.preview.text }}
                                    title="Text"
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderFontThemes = () => (
        <div className="font-grid">
            {Object.entries(FONT_THEMES).map(([key, font]) => {
                const isActive = fontTheme === key;

                return (
                    <div
                        key={key}
                        className={`font-card ${isActive ? 'active' : ''}`}
                        onClick={() => setFontTheme(key as FontTheme)}
                    >
                        <div className="font-preview">
                            <span className="font-icon">{font.icon}</span>
                            <div className={`font-example ${font.className}`}>
                                {font.example}
                            </div>
                        </div>

                        <div className="font-info">
                            <div className="font-header">
                                <h3 className="font-name">{font.name}</h3>
                                {isActive && <FaCheck className="active-indicator" />}
                            </div>
                            <p className="font-description">{font.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderAdvancedSettings = () => (
        <div className="advanced-settings">
            <div className="settings-section">
                <h3>
                    <FaDownload />
                    Export & Import
                </h3>
                <div className="settings-actions">
                    <button
                        className="btn btn-outline"
                        onClick={exportThemeSettings}
                    >
                        <FaDownload />
                        Export Settings
                    </button>

                    <label className="btn btn-outline">
                        <FaUpload />
                        Import Settings
                        <input
                            type="file"
                            accept=".json"
                            onChange={importThemeSettings}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>

            <div className="settings-section">
                <h3>
                    <FaEye />
                    Preview Mode
                </h3>
                <p className="settings-description">
                    Hover über Theme-Karten für eine Live-Vorschau. Verwende die Pfeiltasten
                    zur Navigation und Enter zum Bestätigen.
                </p>
            </div>

            <div className="settings-section">
                <h3>
                    <FaKeyboard />
                    Keyboard Shortcuts
                </h3>
                <div className="shortcuts-grid">
                    <div className="shortcut-item">
                        <kbd>Ctrl/Cmd + T</kbd>
                        <span>Theme Switcher öffnen/schließen</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>1-5</kbd>
                        <span>Direkte Theme-Auswahl</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Tab</kbd>
                        <span>Zwischen Tabs wechseln</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>← →</kbd>
                        <span>Theme-Navigation</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Enter</kbd>
                        <span>Vorschau bestätigen</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Esc</kbd>
                        <span>Schließen</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>H</kbd>
                        <span>Hilfe ein/ausblenden</span>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3>
                    <FaHeart />
                    Über das Theme System
                </h3>
                <p className="settings-description">
                    Unser Theme-System nutzt CSS Custom Properties für dynamisches Theming
                    ohne Page-Reload. Alle Themes sind vollständig responsiv und
                    accessibility-optimiert.
                </p>
                <div className="theme-stats">
                    <div className="stat">
                        <strong>5</strong> Color Themes
                    </div>
                    <div className="stat">
                        <strong>3</strong> Font Themes
                    </div>
                    <div className="stat">
                        <strong>15</strong> CSS Variables
                    </div>
                </div>
            </div>
        </div>
    );

    const renderKeyboardHelp = () => (
        <div className="keyboard-help-overlay">
            <div className="keyboard-help">
                <div className="help-header">
                    <h3>
                        <FaKeyboard />
                        Keyboard Shortcuts
                    </h3>
                    <button
                        className="btn btn-icon btn-ghost"
                        onClick={() => setShowKeyboardHelp(false)}
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="help-content">
                    <div className="help-section">
                        <h4>Navigation</h4>
                        <div className="help-shortcuts">
                            <div><kbd>Tab</kbd> Zwischen Tabs wechseln</div>
                            <div><kbd>← →</kbd> Theme-Navigation</div>
                            <div><kbd>Enter</kbd> Auswahl bestätigen</div>
                            <div><kbd>Esc</kbd> Schließen</div>
                        </div>
                    </div>
                    <div className="help-section">
                        <h4>Themes</h4>
                        <div className="help-shortcuts">
                            <div><kbd>1</kbd> Light Theme</div>
                            <div><kbd>2</kbd> Dark Theme</div>
                            <div><kbd>3</kbd> Purple Theme</div>
                            <div><kbd>4</kbd> Red Theme</div>
                            <div><kbd>5</kbd> Olive Theme</div>
                        </div>
                    </div>
                    <div className="help-section">
                        <h4>Global</h4>
                        <div className="help-shortcuts">
                            <div><kbd>Ctrl/Cmd + T</kbd> Theme Switcher</div>
                            <div><kbd>H</kbd> Diese Hilfe</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="theme-switcher-container" ref={switcherRef}>
            {/* Trigger Button */}
            <button
                className="theme-switcher-trigger"
                onClick={() => setIsOpen(!isOpen)}
                title="Theme Switcher (Ctrl+T)"
            >
                <FaPalette />
                <span className="trigger-badge">{colorTheme}</span>
            </button>

            {/* Main Panel */}
            {isOpen && (
                <div className="theme-switcher-panel">
                    <div className="panel-header">
                        <div className="header-left">
                            <h2>
                                <FaPalette />
                                Theme Switcher
                            </h2>
                            <span className="theme-status">
                                {COLOR_THEMES[colorTheme].name} • {FONT_THEMES[fontTheme].name}
                            </span>
                        </div>
                        <div className="header-actions">
                            <button
                                className="btn btn-icon btn-ghost"
                                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                                title="Keyboard Shortcuts (H)"
                            >
                                <FaKeyboard />
                            </button>
                            <button
                                className="btn btn-icon btn-ghost"
                                onClick={() => setIsOpen(false)}
                                title="Schließen (Esc)"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    <div className="panel-tabs">
                        <button
                            className={`tab ${activeTab === 'colors' ? 'active' : ''}`}
                            onClick={() => setActiveTab('colors')}
                        >
                            <FaPalette />
                            Colors
                        </button>
                        <button
                            className={`tab ${activeTab === 'fonts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('fonts')}
                        >
                            <FaFont />
                            Fonts
                        </button>
                        <button
                            className={`tab ${activeTab === 'advanced' ? 'active' : ''}`}
                            onClick={() => setActiveTab('advanced')}
                        >
                            <FaCog />
                            Advanced
                        </button>
                    </div>

                    <div className="panel-content">
                        {activeTab === 'colors' && renderColorThemes()}
                        {activeTab === 'fonts' && renderFontThemes()}
                        {activeTab === 'advanced' && renderAdvancedSettings()}
                    </div>

                    {previewMode && (
                        <div className="preview-banner">
                            <div className="preview-info">
                                <FaEye />
                                <span>Vorschau: {COLOR_THEMES[previewMode].name}</span>
                            </div>
                            <div className="preview-actions">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleColorThemeSelect(previewMode)}
                                >
                                    <FaCheck />
                                    Übernehmen
                                </button>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={cancelPreview}
                                >
                                    <FaTimes />
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="panel-footer">
                        <div className="footer-info">
                            <kbd>Ctrl+T</kbd> zum Öffnen • <kbd>H</kbd> für Hilfe • <kbd>Esc</kbd> zum Schließen
                        </div>
                    </div>
                </div>
            )}

            {/* Keyboard Help Overlay */}
            {showKeyboardHelp && renderKeyboardHelp()}
        </div>
    );
};