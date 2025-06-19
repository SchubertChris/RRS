// src/Components/Pages/ThemeTestPage.tsx

import React, { useState } from 'react';
import { ThemeSwitcher } from '@c/UI/ThemeSwitcher';
import { HeroSection } from './Landingpage_Components/HeroSection';
import { ThemeShowcase } from './Landingpage_Components/ThemeShowcase';
import { DesignShowcase } from './Landingpage_Components/DesignShowcase';

export const ThemeTestPage: React.FC = () => {
    const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);

    const features = [
        {
            icon: '🎨',
            title: 'Dynamische Themes',
            description: 'Wähle aus verschiedenen Farbpaletten und Schriftarten für das perfekte Design-Erlebnis.'
        },
        {
            icon: '⚡',
            title: 'Blitzschnell',
            description: 'Optimierte Performance und reibungslose Animationen für eine erstklassige Benutzererfahrung.'
        },
        {
            icon: '📱',
            title: 'Responsive Design',
            description: 'Funktioniert perfekt auf allen Geräten - vom Smartphone bis zum Desktop.'
        },
        {
            icon: '🛡️',
            title: 'Sicher & Zuverlässig',
            description: 'Moderne Sicherheitsstandards und höchste Verfügbarkeit für deine Anwendungen.'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Mueller',
            role: 'UI/UX Designerin',
            content: 'Die Theme-Optionen sind fantastisch! Endlich kann ich meine Arbeitsoberfläche perfekt an meine Bedürfnisse anpassen.',
            rating: 5
        },
        {
            name: 'Michael Schmidt',
            role: 'Frontend Entwickler',
            content: 'Besonders die Keyboard-Shortcuts sind genial. Das spart so viel Zeit im Entwicklungsprozess.',
            rating: 5
        },
        {
            name: 'Anna Weber',
            role: 'Product Managerin',
            content: 'Das Dark Theme ist perfekt für lange Arbeitstage. Meine Augen sind deutlich weniger müde.',
            rating: 5
        }
    ];

    return (
        <div className="theme-test-page">
            {/* Navigation */}
            <nav className="navbar glass-effect">
                <div className="navbar-container">
                    <div className="navbar-brand">
                        🎨 ThemeTest
                    </div>

                    <div className="navbar-nav">
                        {['Features', 'Testimonials', 'Showcase', 'Kontakt'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="nav-link"
                            >
                                {item}
                            </a>
                        ))}

                        <button
                            onClick={() => setIsThemeSwitcherOpen(true)}
                            className="btn btn-primary btn-gradient"
                        >
                            🎨 Themes
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <HeroSection onOpenThemes={() => setIsThemeSwitcherOpen(true)} />

            {/* Theme Showcase */}
            <ThemeShowcase />

            {/* Features Section */}
            <section id="features" className="section section-padded">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title title-gradient">Warum unsere Themes?</h2>
                        <p className="section-subtitle">
                            Jedes Detail wurde sorgfältig durchdacht, um dir die bestmögliche
                            Benutzererfahrung zu bieten.
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card card-hover">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">
                                    {feature.title}
                                </h3>
                                <p className="feature-description">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Showcase */}
            <DesignShowcase />

            {/* Testimonials Section */}
            <section id="testimonials" className="section section-alt">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Was unsere Nutzer sagen</h2>
                        <p className="section-subtitle">
                            Tausende von Entwicklern und Designern vertrauen bereits auf unsere Themes.
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card glass-light">
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="star">★</span>
                                    ))}
                                </div>
                                <blockquote className="testimonial-content">
                                    "{testimonial.content}"
                                </blockquote>
                                <div className="testimonial-author">
                                    <div className="author-name">{testimonial.name}</div>
                                    <div className="author-role">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section hero-gradient">
                <div className="container text-center">
                    <div className="cta-content">
                        <h2 className="cta-title">
                            Bereit für das perfekte Theme?
                        </h2>
                        <p className="cta-subtitle">
                            Teste alle Themes kostenlos und finde deinen perfekten Stil.
                        </p>
                        <button
                            onClick={() => setIsThemeSwitcherOpen(true)}
                            className="btn btn-cta btn-large btn-glow"
                        >
                            🎨 Jetzt Theme-Switcher öffnen
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-brand">
                        🎨 ThemeTest
                    </div>
                    <div className="footer-links">
                        {['Datenschutz', 'Impressum', 'AGB', 'Support'].map((item) => (
                            <a key={item} href="#" className="footer-link">
                                {item}
                            </a>
                        ))}
                    </div>
                    <p className="footer-copyright">
                        © 2025 ThemeTest. Alle Rechte vorbehalten.
                    </p>
                </div>
            </footer>

            {/* Theme Switcher Modal */}
            <ThemeSwitcher
                isOpen={isThemeSwitcherOpen}
                onClose={() => setIsThemeSwitcherOpen(false)}
            />
        </div>
    );
};