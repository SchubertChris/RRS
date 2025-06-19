// src/Components/Pages/Landingpage_Components/DesignShowcase.tsx

import React, { useState } from 'react';

export const DesignShowcase: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState<'buttons' | 'cards' | 'forms' | 'typography'>('buttons');

    const demoComponents = {
        buttons: {
            title: 'Button Variationen',
            description: 'Verschiedene Button-Styles zeigen die Theme-Anpassungen',
            icon: '🔘'
        },
        cards: {
            title: 'Card Komponenten',
            description: 'Cards mit verschiedenen Inhalten und Hover-Effekten',
            icon: '📋'
        },
        forms: {
            title: 'Formular Elemente',
            description: 'Eingabefelder und Steuerelemente im aktuellen Theme',
            icon: '📝'
        },
        typography: {
            title: 'Typografie & Schriften',
            description: 'Verschiedene Textgrößen und Font-Themes in Aktion',
            icon: '✍️'
        }
    };

    const ButtonDemo = () => (
        <div className="demo-buttons">
            <div className="button-row">
                <button className="btn btn-primary">Primary Button</button>
                <button className="btn btn-secondary">Secondary Button</button>
                <button className="btn btn-outline">Outline Button</button>
            </div>
            <div className="button-row">
                <button className="btn btn-ghost">Ghost Button</button>
                <button className="btn btn-gradient">Gradient Button</button>
                <button className="btn btn-glow">Glow Button</button>
            </div>
            <div className="button-row">
                <button className="btn btn-success">Success Button</button>
                <button className="btn btn-warning">Warning Button</button>
                <button className="btn btn-danger">Danger Button</button>
            </div>
            <div className="button-row">
                <button className="btn btn-small">Small</button>
                <button className="btn btn-medium">Medium</button>
                <button className="btn btn-large">Large</button>
            </div>
        </div>
    );

    const CardDemo = () => (
        <div className="demo-cards">
            <div className="card glass-effect">
                <div className="card-header">
                    <h4>Feature Card</h4>
                    <span className="card-badge">Neu</span>
                </div>
                <div className="card-content">
                    <p>Eine beispielhafte Beschreibung für diese Karte mit interessanten Inhalten und Features.</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary btn-small">Mehr erfahren</button>
                </div>
            </div>

            <div className="card glass-light">
                <div className="card-image gradient-placeholder"></div>
                <div className="card-content">
                    <h4>Image Card</h4>
                    <p>Karten mit Bildern passen sich perfekt an jedes Theme an und bieten konsistente Darstellung.</p>
                    <div className="card-tags">
                        <span className="tag">Design</span>
                        <span className="tag">Theme</span>
                    </div>
                </div>
            </div>

            <div className="card frosted">
                <div className="card-content">
                    <div className="stat-group">
                        <div className="stat-item">
                            <div className="stat-number">42</div>
                            <div className="stat-label">Projects</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">1.2k</div>
                            <div className="stat-label">Users</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">99%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const FormDemo = () => (
        <div className="demo-forms">
            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" placeholder="Ihr Name" />
                </div>
                <div className="form-group">
                    <label className="form-label">E-Mail</label>
                    <input type="email" className="form-input" placeholder="ihre@email.com" />
                </div>
                <div className="form-group">
                    <label className="form-label">Nachricht</label>
                    <textarea className="form-textarea" placeholder="Ihre Nachricht..." rows={3}></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Theme Präferenz</label>
                    <select className="form-select">
                        <option>Light Theme</option>
                        <option>Dark Theme</option>
                        <option>Purple Theme</option>
                        <option>Auto (System)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="checkmark"></span>
                        Newsletter abonnieren
                    </label>
                </div>
                <div className="form-group">
                    <label className="radio-group-label">Benachrichtigungen</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="notifications" className="form-radio" />
                            <span className="radio-mark"></span>
                            Alle
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="notifications" className="form-radio" />
                            <span className="radio-mark"></span>
                            Wichtige
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="notifications" className="form-radio" />
                            <span className="radio-mark"></span>
                            Keine
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const TypographyDemo = () => (
        <div className="demo-typography">
            <h1 className="typography-h1">Hauptüberschrift (H1)</h1>
            <h2 className="typography-h2">Zweite Überschrift (H2)</h2>
            <h3 className="typography-h3">Dritte Überschrift (H3)</h3>
            <h4 className="typography-h4">Vierte Überschrift (H4)</h4>

            <p className="lead-text">
                Dies ist ein Lead-Paragraph mit größerer Schrift und mehr Gewicht
                für wichtige Einleitungstexte und Zusammenfassungen.
            </p>

            <p className="body-text">
                Ein normaler Paragraph-Text zeigt, wie gut lesbar die gewählte
                Schriftart ist. Die Zeilenhöhe und der Kontrast sind für
                verschiedene Themes optimiert und bieten beste Lesbarkeit.
            </p>

            <blockquote className="blockquote">
                "Ein Zitat demonstriert die stilvolle Hervorhebung von
                wichtigen Aussagen im aktuellen Theme. Diese werden
                besonders hervorgehoben."
                <footer className="blockquote-footer">— Zitat Autor</footer>
            </blockquote>

            <div className="text-styles">
                <p>
                    <span className="text-bold">Fetter Text</span> •
                    <span className="text-italic">Kursiver Text</span> •
                    <span className="text-code">Code Text</span> •
                    <span className="text-underline">Unterstrichener Text</span> •
                    <span className="text-muted">Gedämpfter Text</span> •
                    <span className="text-highlight">Hervorgehobener Text</span>
                </p>
            </div>

            <div className="font-samples">
                <div className="font-sample-card">
                    <div className="font-label">Default (Inter)</div>
                    <div className="font-demo font-default">The quick brown fox jumps over the lazy dog</div>
                </div>
                <div className="font-sample-card">
                    <div className="font-label">Future (JetBrains Mono)</div>
                    <div className="font-demo font-future">THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</div>
                </div>
                <div className="font-sample-card">
                    <div className="font-label">Vintage (Playfair Display)</div>
                    <div className="font-demo font-vintage">The Quick Brown Fox Jumps Over The Lazy Dog</div>
                </div>
            </div>
        </div>
    );

    const renderDemo = () => {
        switch (activeDemo) {
            case 'buttons':
                return <ButtonDemo />;
            case 'cards':
                return <CardDemo />;
            case 'forms':
                return <FormDemo />;
            case 'typography':
                return <TypographyDemo />;
            default:
                return <ButtonDemo />;
        }
    };

    return (
        <section id="showcase" className="design-showcase-section section-padded">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title title-gradient">UI-Komponenten Showcase</h2>
                    <p className="section-subtitle">
                        Sieh dir an, wie verschiedene UI-Elemente in den verschiedenen Themes aussehen
                        und wie sie auf Interaktionen reagieren.
                    </p>
                </div>

                {/* Demo Navigation */}
                <div className="demo-nav">
                    {Object.entries(demoComponents).map(([key, demo]) => (
                        <button
                            key={key}
                            className={`demo-nav-item ${activeDemo === key ? 'active' : ''}`}
                            onClick={() => setActiveDemo(key as any)}
                        >
                            <span className="nav-icon">{demo.icon}</span>
                            <span className="nav-text">{demo.title}</span>
                        </button>
                    ))}
                </div>

                {/* Demo Content */}
                <div className="demo-content-wrapper">
                    <div className="demo-info glass-light">
                        <h3 className="demo-title">
                            {demoComponents[activeDemo].icon} {demoComponents[activeDemo].title}
                        </h3>
                        <p className="demo-description">
                            {demoComponents[activeDemo].description}
                        </p>
                    </div>

                    <div className="demo-showcase">
                        {renderDemo()}
                    </div>
                </div>

                {/* Interactive Features */}
                <div className="interactive-features">
                    <h3 className="features-title">Warum unsere Komponenten besonders sind</h3>
                    <div className="feature-grid">
                        <div className="interactive-card glass-effect">
                            <div className="feature-icon">🎨</div>
                            <h4>Live-Updates</h4>
                            <p>Alle Änderungen werden sofort angewendet - kein Neuladen erforderlich.</p>
                        </div>
                        <div className="interactive-card glass-effect">
                            <div className="feature-icon">💾</div>
                            <h4>Automatisches Speichern</h4>
                            <p>Deine Theme-Einstellungen werden automatisch gespeichert und wiederhergestellt.</p>
                        </div>
                        <div className="interactive-card glass-effect">
                            <div className="feature-icon">⌨️</div>
                            <h4>Keyboard Shortcuts</h4>
                            <p>Nutze Tastenkürzel für schnellen Zugriff auf alle Theme-Funktionen.</p>
                        </div>
                        <div className="interactive-card glass-effect">
                            <div className="feature-icon">📱</div>
                            <h4>Cross-Platform</h4>
                            <p>Funktioniert auf Desktop, Tablet und Mobile mit derselben Qualität.</p>
                        </div>
                        <div className="interactive-card glass-effect">
                            <div className="feature-icon">⚡</div>
                            <h4>Performance</h4>
                            <p>Optimierte Animationen und GPU-beschleunigte Effekte für beste Performance.</p>
                        </div>
                        <div className="interactive-card glass-effect">
                            <div className="feature-icon">🔧</div>
                            <h4>Anpassbar</h4>
                            <p>Jede Komponente kann individuell angepasst und erweitert werden.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};