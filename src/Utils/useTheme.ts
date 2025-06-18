import { useState, useEffect } from 'react';

export type ColorTheme = 'light' | 'dark' | 'purple' | 'red' | 'olive';
export type FontTheme = 'default' | 'future' | 'vintage';

interface ThemeState {
    colorTheme: ColorTheme;
    fontTheme: FontTheme;
}

interface UseThemeReturn {
    colorTheme: ColorTheme;
    fontTheme: FontTheme;
    setColorTheme: (theme: ColorTheme) => void;
    setFontTheme: (theme: FontTheme) => void;
    toggleTheme: () => void;
    resetThemes: () => void;
}

const COLOR_THEMES: ColorTheme[] = ['light', 'dark', 'purple', 'red', 'olive'];
const FONT_THEMES: FontTheme[] = ['default', 'future', 'vintage'];

const DEFAULT_THEME_STATE: ThemeState = {
    colorTheme: 'light',
    fontTheme: 'default'
};

export const useTheme = (): UseThemeReturn => {
    const [themeState, setThemeState] = useState<ThemeState>(() => {
        // Load from localStorage or use defaults
        const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
        const savedFontTheme = localStorage.getItem('fontTheme') as FontTheme;

        return {
            colorTheme: COLOR_THEMES.includes(savedColorTheme) ? savedColorTheme : DEFAULT_THEME_STATE.colorTheme,
            fontTheme: FONT_THEMES.includes(savedFontTheme) ? savedFontTheme : DEFAULT_THEME_STATE.fontTheme
        };
    });

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;

        // Remove all existing theme classes
        COLOR_THEMES.forEach(theme => root.classList.remove(`theme-${theme}`));
        FONT_THEMES.forEach(theme => root.classList.remove(`font-theme-${theme}`));

        // Remove data attributes
        root.removeAttribute('data-theme');
        root.removeAttribute('data-font-theme');

        // Apply current themes
        root.setAttribute('data-theme', themeState.colorTheme);
        root.setAttribute('data-font-theme', themeState.fontTheme);
        root.classList.add(`theme-${themeState.colorTheme}`);
        root.classList.add(`font-theme-${themeState.fontTheme}`);

        // Save to localStorage
        localStorage.setItem('colorTheme', themeState.colorTheme);
        localStorage.setItem('fontTheme', themeState.fontTheme);
    }, [themeState]);

    const setColorTheme = (theme: ColorTheme) => {
        setThemeState(prev => ({ ...prev, colorTheme: theme }));
    };

    const setFontTheme = (theme: FontTheme) => {
        setThemeState(prev => ({ ...prev, fontTheme: theme }));
    };

    const toggleTheme = () => {
        const currentIndex = COLOR_THEMES.indexOf(themeState.colorTheme);
        const nextIndex = (currentIndex + 1) % COLOR_THEMES.length;
        setColorTheme(COLOR_THEMES[nextIndex]);
    };

    const resetThemes = () => {
        setThemeState(DEFAULT_THEME_STATE);
    };

    return {
        colorTheme: themeState.colorTheme,
        fontTheme: themeState.fontTheme,
        setColorTheme,
        setFontTheme,
        toggleTheme,
        resetThemes
    };
};