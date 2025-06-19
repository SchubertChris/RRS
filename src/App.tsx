// src/App.tsx

import React, { useEffect, useState } from 'react';
import '@s/_Index.scss';
import { ThemeTestPage } from '@p/ThemeTestPage';
import { useTheme } from '@u/useTheme';

function App() {
  const { colorTheme, fontTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showShortcutInfo, setShowShortcutInfo] = useState(false);

  // App initialization - kurzer Loading für smooth theme transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Global keyboard shortcuts für Shortcut-Info
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      // Shortcut-Info mit Ctrl/Cmd + /
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        setShowShortcutInfo(true);
        setTimeout(() => setShowShortcutInfo(false), 4000);
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Loading Screen
  if (!isLoaded) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <div className="loading-icon">🎨</div>
          <div className="loading-text">Theme wird geladen...</div>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Main Content */}
      <ThemeTestPage />

      {/* Global Keyboard Shortcuts Info */}
      {showShortcutInfo && (
        <div className="shortcut-info glass-effect">
          <h3 className="shortcut-title">⌨️ Keyboard Shortcuts</h3>
          <div className="shortcut-list">
            <div className="shortcut-item">
              <kbd>T</kbd>
              <span>Toggle Theme</span>
            </div>
            <div className="shortcut-item">
              <kbd>1-5</kbd>
              <span>Quick Theme Switch</span>
            </div>
            <div className="shortcut-item">
              <kbd>D</kbd>
              <span>Dark Theme</span>
            </div>
            <div className="shortcut-item">
              <kbd>L</kbd>
              <span>Light Theme</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl+/</kbd>
              <span>Show Shortcuts</span>
            </div>
          </div>
        </div>
      )}

      {/* Development Theme Status (nur in Development Mode) */}
      {import.meta.env.DEV && (
        <div className="dev-theme-status">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">
              {colorTheme} | {fontTheme}
            </span>
          </div>
        </div>
      )}

      {/* Global Styles für App-spezifische Komponenten */}
      <style jsx>{`
        .app-loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
          color: var(--color-text-primary);
        }

        .loading-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: pulse 2s infinite;
        }

        .loading-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 2rem;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-border);
          border-top: 3px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .shortcut-info {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: var(--shadow-modal);
          z-index: 1100;
          max-width: 300px;
          animation: slideInRight 300ms ease-out;
        }

        .shortcut-title {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .shortcut-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .shortcut-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .shortcut-item kbd {
          background: var(--color-background-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: inherit;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          min-width: 2rem;
          text-align: center;
        }

        .dev-theme-status {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          box-shadow: var(--shadow-sm);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 150ms ease-out;
        }

        .dev-theme-status:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
          animation: pulse 2s infinite;
        }

        .status-text {
          font-weight: 500;
          text-transform: capitalize;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1); 
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.1); 
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;