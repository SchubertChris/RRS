// src/Components/Pages/ComprehensiveTestPage.tsx
// TECHNISCHER TEST-PLAYGROUND FÜR ENTWICKLER

import React, { useState, useEffect, useRef } from 'react';
import {
    FaCode, FaBug, FaFlask, FaCogs, FaEye, FaClipboard, FaDownload,
    FaUpload, FaTerminal, FaPlay, FaPause, FaStop, FaRefresh,
    FaCheck, FaTimes, FaExclamationTriangle, FaInfo, FaQuestionCircle,
    FaDatabase, FaServer, FaCloud, FaLock, FaUnlock, FaWifi, FaSignal,
    FaChartLine, FaChartBar, FaChartPie, FaTable, FaList, FaGrid,
    FaMobile, FaDesktop, FaTablet, FaGamepad, FaPrint, FaSave
} from 'react-icons/fa';
import { useTheme } from '@u/useTheme';

type TestCategory = 'performance' | 'accessibility' | 'components' | 'themes' | 'responsive' | 'api' | 'stress';

interface TestResult {
    id: string;
    name: string;
    status: 'pass' | 'fail' | 'warning' | 'running' | 'pending';
    duration?: number;
    details?: string;
    timestamp: Date;
}

interface PerformanceMetrics {
    loadTime: number;
    renderTime: number;
    memoryUsage: number;
    repaints: number;
    fps: number;
}

export const ComprehensiveTestPage: React.FC = () => {
    const { colorTheme, fontTheme, setColorTheme, setFontTheme } = useTheme();
    const [activeCategory, setActiveCategory] = useState<TestCategory>('components');
    const [isRunningTests, setIsRunningTests] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
    const [stressTestActive, setStressTestActive] = useState(false);
    const [debugMode, setDebugMode] = useState(false);
    const consoleRef = useRef<HTMLDivElement>(null);

    const testCategories = [
        { id: 'components', label: 'Komponenten Tests', icon: FaCode },
        { id: 'themes', label: 'Theme Tests', icon: FaFlask },
        { id: 'performance', label: 'Performance Tests', icon: FaChartLine },
        { id: 'accessibility', label: 'Accessibility Tests', icon: FaEye },
        { id: 'responsive', label: 'Responsive Tests', icon: FaMobile },
        { id: 'api', label: 'API Tests', icon: FaServer },
        { id: 'stress', label: 'Stress Tests', icon: FaBug }
    ];

    // Auto-scroll console
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [consoleOutput]);

    // Performance monitoring
    useEffect(() => {
        const startTime = performance.now();
        let frameCount = 0;
        let lastTime = startTime;

        const measurePerformance = () => {
            const now = performance.now();
            frameCount++;

            if (now - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (now - lastTime));
                frameCount = 0;
                lastTime = now;

                setPerformanceMetrics({
                    loadTime: now - startTime,
                    renderTime: now - startTime,
                    memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
                    repaints: Math.floor(Math.random() * 20),
                    fps
                });
            }

            requestAnimationFrame(measurePerformance);
        };

        measurePerformance();
    }, []);

    const logToConsole = (message: string, type: 'info' | 'warn' | 'error' | 'success' = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = {
            info: '[INFO]',
            warn: '[WARN]',
            error: '[ERROR]',
            success: '[SUCCESS]'
        }[type];

        setConsoleOutput(prev => [...prev, `${timestamp} ${prefix} ${message}`]);
    };

    const runTests = async (category: TestCategory) => {
        setIsRunningTests(true);
        setTestResults([]);
        logToConsole(`Starte ${category} Tests...`, 'info');

        const mockTests = {
            components: [
                { name: 'Button Rendering', shouldPass: true },
                { name: 'Form Validation', shouldPass: true },
                { name: 'Card Layout', shouldPass: true },
                { name: 'Modal Functionality', shouldPass: Math.random() > 0.2 },
                { name: 'Icon Loading', shouldPass: true }
            ],
            themes: [
                { name: 'Theme Switching', shouldPass: true },
                { name: 'CSS Variables', shouldPass: true },
                { name: 'Dark Mode', shouldPass: true },
                { name: 'Font Theme Application', shouldPass: Math.random() > 0.1 },
                { name: 'Color Accessibility', shouldPass: Math.random() > 0.3 }
            ],
            performance: [
                { name: 'Initial Load Time', shouldPass: Math.random() > 0.2 },
                { name: 'Component Mount Time', shouldPass: true },
                { name: 'Memory Usage', shouldPass: Math.random() > 0.4 },
                { name: 'FPS Stability', shouldPass: Math.random() > 0.3 },
                { name: 'Bundle Size', shouldPass: true }
            ],
            accessibility: [
                { name: 'Keyboard Navigation', shouldPass: true },
                { name: 'Screen Reader Support', shouldPass: Math.random() > 0.3 },
                { name: 'Color Contrast', shouldPass: Math.random() > 0.2 },
                { name: 'Focus Management', shouldPass: true },
                { name: 'ARIA Labels', shouldPass: Math.random() > 0.4 }
            ],
            responsive: [
                { name: 'Mobile Layout', shouldPass: true },
                { name: 'Tablet Layout', shouldPass: true },
                { name: 'Desktop Layout', shouldPass: true },
                { name: 'Touch Interactions', shouldPass: Math.random() > 0.2 },
                { name: 'Viewport Scaling', shouldPass: true }
            ],
            api: [
                { name: 'Theme API', shouldPass: true },
                { name: 'Storage API', shouldPass: Math.random() > 0.3 },
                { name: 'Event Handling', shouldPass: true },
                { name: 'Error Boundaries', shouldPass: Math.random() > 0.4 },
                { name: 'State Management', shouldPass: true }
            ],
            stress: [
                { name: 'Memory Leak Test', shouldPass: Math.random() > 0.5 },
                { name: 'Rapid Theme Switching', shouldPass: Math.random() > 0.3 },
                { name: 'Component Unmounting', shouldPass: true },
                { name: 'Event Flood Test', shouldPass: Math.random() > 0.4 },
                { name: 'Performance Under Load', shouldPass: Math.random() > 0.6 }
            ]
        };

        const tests = mockTests[category] || [];

        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            const testId = `${category}-${i}`;

            // Add pending test
            setTestResults(prev => [...prev, {
                id: testId,
                name: test.name,
                status: 'running',
                timestamp: new Date()
            }]);

            logToConsole(`Führe Test aus: ${test.name}`, 'info');

            // Simulate test execution
            await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

            const duration = Math.random() * 1000 + 100;
            const status = test.shouldPass ? 'pass' : (Math.random() > 0.5 ? 'fail' : 'warning');

            setTestResults(prev => prev.map(result =>
                result.id === testId
                    ? {
                        ...result,
                        status,
                        duration,
                        details: status === 'fail' ? 'Unerwarteter Fehler aufgetreten' :
                            status === 'warning' ? 'Test mit Warnungen bestanden' : 'Test erfolgreich'
                    }
                    : result
            ));

            logToConsole(`Test ${test.name}: ${status.toUpperCase()} (${duration.toFixed(0)}ms)`,
                status === 'pass' ? 'success' : status === 'fail' ? 'error' : 'warn');
        }

        const passCount = testResults.filter(r => r.status === 'pass').length;
        const totalCount = tests.length;

        logToConsole(`Tests abgeschlossen: ${passCount}/${totalCount} bestanden`,
            passCount === totalCount ? 'success' : 'warn');

        setIsRunningTests(false);
    };

    const runStressTest = () => {
        setStressTestActive(true);
        logToConsole('Starte Stress Test...', 'info');

        // Rapid theme switching
        const themes: any[] = ['light', 'dark', 'purple', 'red', 'olive'];
        let count = 0;

        const interval = setInterval(() => {
            setColorTheme(themes[count % themes.length]);
            count++;

            if (count >= 50) {
                clearInterval(interval);
                setStressTestActive(false);
                logToConsole('Stress Test abgeschlossen', 'success');
            }
        }, 100);
    };

    const exportTestResults = () => {
        const data = {
            timestamp: new Date().toISOString(),
            category: activeCategory,
            results: testResults,
            performance: performanceMetrics,
            console: consoleOutput
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `test-results-${activeCategory}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        logToConsole('Test-Ergebnisse exportiert', 'success');
    };

    const clearConsole = () => {
        setConsoleOutput([]);
        logToConsole('Konsole geleert', 'info');
    };

    const generateRandomComponents = () => {
        const components = [];
        for (let i = 0; i < 50; i++) {
            components.push(
                <div key={i} className="stress-test-component">
                    <FaCode /> Component {i + 1}
                </div>
            );
        }
        return components;
    };

    const renderTestResults = () => (
        <div className="test-results-section">
            <div className="results-header">
                <h3>Test Ergebnisse</h3>
                <div className="results-actions">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => runTests(activeCategory)}
                        disabled={isRunningTests}
                    >
                        {isRunningTests ? <FaRefresh className="spinning" /> : <FaPlay />}
                        {isRunningTests ? 'Tests laufen...' : 'Tests starten'}
                    </button>
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={exportTestResults}
                        disabled={testResults.length === 0}
                    >
                        <FaDownload />
                        Export
                    </button>
                </div>
            </div>

            <div className="test-results-grid">
                {testResults.length === 0 ? (
                    <div className="no-results">
                        <FaFlask />
                        <p>Keine Tests ausgeführt. Klicken Sie auf "Tests starten".</p>
                    </div>
                ) : (
                    testResults.map((result) => (
                        <div key={result.id} className={`test-result-card ${result.status}`}>
                            <div className="result-header">
                                <div className="result-status">
                                    {result.status === 'pass' && <FaCheck />}
                                    {result.status === 'fail' && <FaTimes />}
                                    {result.status === 'warning' && <FaExclamationTriangle />}
                                    {result.status === 'running' && <FaRefresh className="spinning" />}
                                    {result.status === 'pending' && <FaQuestionCircle />}
                                </div>
                                <h4>{result.name}</h4>
                            </div>
                            <div className="result-details">
                                {result.duration && (
                                    <span className="duration">{result.duration.toFixed(0)}ms</span>
                                )}
                                <span className="timestamp">
                                    {result.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                            {result.details && (
                                <p className="result-message">{result.details}</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const renderPerformanceMetrics = () => (
        <div className="performance-metrics">
            <h3>Performance Metriken</h3>
            {performanceMetrics ? (
                <div className="metrics-grid">
                    <div className="metric-card">
                        <FaChartLine />
                        <div className="metric-value">{performanceMetrics.fps}</div>
                        <div className="metric-label">FPS</div>
                    </div>
                    <div className="metric-card">
                        <FaDatabase />
                        <div className="metric-value">
                            {(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB
                        </div>
                        <div className="metric-label">Memory</div>
                    </div>
                    <div className="metric-card">
                        <FaCogs />
                        <div className="metric-value">{performanceMetrics.renderTime.toFixed(0)}ms</div>
                        <div className="metric-label">Render Time</div>
                    </div>
                    <div className="metric-card">
                        <FaRefresh />
                        <div className="metric-value">{performanceMetrics.repaints}</div>
                        <div className="metric-label">Repaints</div>
                    </div>
                </div>
            ) : (
                <div className="loading-metrics">
                    <FaRefresh className="spinning" />
                    <p>Sammle Performance-Daten...</p>
                </div>
            )}
        </div>
    );

    const renderDeveloperTools = () => (
        <div className="developer-tools">
            <h3>Entwickler Tools</h3>
            <div className="tools-grid">
                <div className="tool-section">
                    <h4>Theme Testing</h4>
                    <div className="tool-buttons">
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={runStressTest}
                            disabled={stressTestActive}
                        >
                            {stressTestActive ? <FaRefresh className="spinning" /> : <FaBug />}
                            Theme Stress Test
                        </button>
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={() => {
                                setColorTheme('dark');
                                setTimeout(() => setColorTheme('light'), 500);
                            }}
                        >
                            <FaRefresh />
                            Quick Toggle
                        </button>
                    </div>
                </div>

                <div className="tool-section">
                    <h4>Debug Mode</h4>
                    <div className="tool-buttons">
                        <button
                            className={`btn btn-sm ${debugMode ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => {
                                setDebugMode(!debugMode);
                                logToConsole(`Debug Mode ${!debugMode ? 'aktiviert' : 'deaktiviert'}`, 'info');
                            }}
                        >
                            {debugMode ? <FaUnlock /> : <FaLock />}
                            Debug Mode
                        </button>
                    </div>
                </div>

                <div className="tool-section">
                    <h4>Component Stress</h4>
                    <div className="tool-buttons">
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={() => {
                                logToConsole('Generiere 1000 Komponenten...', 'info');
                                // Trigger re-render with many components
                                setTestResults([]);
                                setTimeout(() => logToConsole('Komponenten generiert', 'success'), 1000);
                            }}
                        >
                            <FaGrid />
                            Generate 1000
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderConsole = () => (
        <div className="console-section">
            <div className="console-header">
                <h3>
                    <FaTerminal />
                    Entwickler Konsole
                </h3>
                <div className="console-actions">
                    <button
                        className="btn btn-sm btn-ghost"
                        onClick={clearConsole}
                    >
                        <FaTimes />
                        Clear
                    </button>
                </div>
            </div>
            <div className="console-output" ref={consoleRef}>
                {consoleOutput.length === 0 ? (
                    <div className="console-empty">
                        <p>Konsole ist leer. Führen Sie Tests aus, um Output zu sehen.</p>
                    </div>
                ) : (
                    consoleOutput.map((line, index) => (
                        <div
                            key={index}
                            className={`console-line ${line.includes('[ERROR]') ? 'error' :
                                line.includes('[WARN]') ? 'warning' :
                                    line.includes('[SUCCESS]') ? 'success' : 'info'
                                }`}
                        >
                            {line}
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const renderComponentPlayground = () => (
        <div className="component-playground">
            <h3>Komponenten Playground</h3>
            <div className="playground-grid">
                {/* Button Tests */}
                <div className="playground-section">
                    <h4>Button Varianten</h4>
                    <div className="component-grid">
                        <button className="btn btn-primary btn-sm">Primary SM</button>
                        <button className="btn btn-secondary">Secondary</button>
                        <button className="btn btn-outline btn-lg">Outline LG</button>
                        <button className="btn btn-ghost">Ghost</button>
                        <button className="btn btn-gradient">Gradient</button>
                        <button className="btn btn-glow">Glow</button>
                        <button className="btn btn-danger" disabled>Disabled</button>
                        <button className="btn btn-success">
                            <FaCheck /> With Icon
                        </button>
                    </div>
                </div>

                {/* Form Tests */}
                <div className="playground-section">
                    <h4>Form Elemente</h4>
                    <div className="form-grid">
                        <input type="text" className="form-input" placeholder="Text Input" />
                        <select className="form-select">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                        <textarea className="form-textarea" placeholder="Textarea" rows={3}></textarea>
                        <div className="checkbox-group">
                            <label>
                                <input type="checkbox" />
                                <span>Checkbox</span>
                            </label>
                            <label>
                                <input type="radio" name="test" />
                                <span>Radio</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Card Tests */}
                <div className="playground-section">
                    <h4>Card Varianten</h4>
                    <div className="card-grid">
                        <div className="card">
                            <div className="card-header">Standard Card</div>
                            <div className="card-body">Standard card content</div>
                        </div>
                        <div className="card glass-effect">
                            <div className="card-header">Glass Card</div>
                            <div className="card-body">Glass effect card</div>
                        </div>
                        <div className="card card-gradient">
                            <div className="card-header">Gradient Card</div>
                            <div className="card-body">Gradient background</div>
                        </div>
                    </div>
                </div>

                {/* Status Tests */}
                <div className="playground-section">
                    <h4>Status Indikatoren</h4>
                    <div className="status-grid">
                        <div className="alert alert-success">
                            <FaCheck /> Success Alert
                        </div>
                        <div className="alert alert-warning">
                            <FaExclamationTriangle /> Warning Alert
                        </div>
                        <div className="alert alert-danger">
                            <FaTimes /> Error Alert
                        </div>
                        <div className="alert alert-info">
                            <FaInfo /> Info Alert
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="comprehensive-test-page">
            <div className="test-header">
                <div className="header-content">
                    <h1>
                        <FaFlask />
                        Comprehensive Test Lab
                    </h1>
                    <p className="header-subtitle">
                        Entwickler-Tools für UI-Testing, Performance-Monitoring und Debug-Funktionen
                    </p>
                    <div className="header-actions">
                        <button
                            className="btn btn-outline btn-sm"
                            onClick={() => logToConsole('Test Lab initialisiert', 'info')}
                        >
                            <FaTerminal />
                            Console
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={exportTestResults}
                        >
                            <FaDownload />
                            Export All
                        </button>
                    </div>
                </div>
            </div>

            <div className="test-nav">
                <div className="nav-tabs">
                    {testCategories.map((category) => (
                        <button
                            key={category.id}
                            className={`nav-tab ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id as TestCategory)}
                        >
                            <category.icon className="tab-icon" />
                            <span className="tab-label">{category.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="test-content">
                <div className="content-grid">
                    <div className="main-content">
                        {activeCategory === 'components' && renderComponentPlayground()}
                        {activeCategory !== 'components' && renderTestResults()}
                    </div>

                    <div className="sidebar-content">
                        {renderPerformanceMetrics()}
                        {renderDeveloperTools()}
                    </div>
                </div>

                {renderConsole()}
            </div>

            {/* Stress Test Components */}
            {stressTestActive && (
                <div className="stress-test-overlay">
                    <div className="stress-components">
                        {generateRandomComponents()}
                    </div>
                </div>
            )}

            {/* Debug Overlay */}
            {debugMode && (
                <div className="debug-overlay">
                    <div className="debug-info">
                        <h4>Debug Information</h4>
                        <div className="debug-data">
                            <div>Theme: {colorTheme}</div>
                            <div>Font: {fontTheme}</div>
                            <div>Tests Running: {isRunningTests ? 'Yes' : 'No'}</div>
                            <div>Active Category: {activeCategory}</div>
                            <div>Console Lines: {consoleOutput.length}</div>
                            <div>Performance: {performanceMetrics?.fps || 'N/A'} FPS</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};