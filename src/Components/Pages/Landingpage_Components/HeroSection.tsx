// src/Components/Pages/Landingpage_Components/HeroSection.tsx

import React from 'react';

interface HeroSectionProps {
    onOpenThemes: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenThemes }) => {
    return (
        <section className="hero-section hero-gradient">
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Erlebe Design
                        <br />
                        <span className="hero-title-accent title-gradient">wie nie zuvor</span>
                    </h1>

                    <p className="hero-subtitle">
                        Entdecke eine neue Dimension der Benutzeroberfläche mit unseren dynamischen
                        Themes und personalisierbaren Design-Optionen. Perfekte Harmonie zwischen
                        Ästhetik und Funktionalität.
                    </p>

                    <div className="hero-actions">
                        <button
                            onClick={onOpenThemes}
                            className="btn btn-primary btn-large btn-glow"
                        >
                            🎨 Themes entdecken
                        </button>

                        <button className="btn btn-secondary btn-large btn-outline">
                            📖 Mehr erfahren
                        </button>
                    </div>

                    {/* Hero Stats */}
                    <div className="hero-stats">
                        <div className="stat-card">
                            <div className="stat-number">5</div>
                            <div className="stat-label">Color Themes</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">3</div>
                            <div className="stat-label">Font Themes</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">∞</div>
                            <div className="stat-label">Kombinationen</div>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-graphic">
                        {/* Floating Theme Preview Cards */}
                        <div className="floating-card card-1 glass-effect">
                            <div className="card-header">
                                <div className="card-dots">
                                    <span className="dot dot-red"></span>
                                    <span className="dot dot-yellow"></span>
                                    <span className="dot dot-green"></span>
                                </div>
                                <div className="card-title">Light Theme</div>
                            </div>
                            <div className="card-content">
                                <div className="demo-text-line"></div>
                                <div className="demo-text-line short"></div>
                                <div className="demo-button primary"></div>
                            </div>
                        </div>

                        <div className="floating-card card-2 glass-effect">
                            <div className="card-header dark">
                                <div className="card-dots">
                                    <span className="dot dot-red"></span>
                                    <span className="dot dot-yellow"></span>
                                    <span className="dot dot-green"></span>
                                </div>
                                <div className="card-title">Dark Theme</div>
                            </div>
                            <div className="card-content dark">
                                <div className="demo-text-line dark"></div>
                                <div className="demo-text-line short dark"></div>
                                <div className="demo-button dark"></div>
                            </div>
                        </div>

                        <div className="floating-card card-3 glass-effect">
                            <div className="palette-preview">
                                <div className="color-circle color-blue" title="Blue"></div>
                                <div className="color-circle color-purple" title="Purple"></div>
                                <div className="color-circle color-red" title="Red"></div>
                                <div className="color-circle color-olive" title="Olive"></div>
                            </div>
                            <div className="palette-label">Color Themes</div>
                        </div>

                        <div className="floating-card card-4 glass-effect">
                            <div className="font-preview">
                                <div className="font-sample font-default">Aa</div>
                                <div className="font-sample font-mono">Aa</div>
                                <div className="font-sample font-serif">Aa</div>
                            </div>
                            <div className="font-label">Font Themes</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="hero-bg-elements">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
                <div className="bg-gradient bg-gradient-1"></div>
                <div className="bg-gradient bg-gradient-2"></div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-arrow">
                    <span>↓</span>
                </div>
                <div className="scroll-text">Scroll für mehr</div>
            </div>
        </section>
    );
};