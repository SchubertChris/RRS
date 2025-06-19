// src/Components/Pages/ThemeTestPage.tsx

import React, { useState } from 'react';
import { ThemeSwitcher } from '@c/UI/ThemeSwitcher';
import {
    FaHome, FaUser, FaCog, FaHeart, FaStar, FaShoppingCart,
    FaSearch, FaBell, FaDownload, FaUpload, FaPlay, FaPause,
    FaEdit, FaTrash, FaEye, FaEyeSlash, FaLock, FaUnlock,
    FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook,
    FaSpinner, FaCircleNotch, FaBars, FaTimes, FaChevronDown,
    FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes as FaClose,
    FaList
} from 'react-icons/fa';

export const ThemeTestPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        category: 'general',
        notifications: true,
        theme: 'auto'
    });
    const [showModal, setShowModal] = useState(false);
    const [gridView, setGridView] = useState<'grid' | 'list'>('grid');

    // Demo-Daten für Cards
    const cardData = [
        {
            id: 1,
            title: 'Moderne Webentwicklung',
            description: 'Entdecken Sie die neuesten Trends und Technologien in der Webentwicklung mit React, TypeScript und modernen CSS-Frameworks.',
            image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg',
            category: 'Development',
            author: 'Max Mustermann',
            date: '2024-12-19',
            likes: 42,
            comments: 8,
            tags: ['React', 'TypeScript', 'CSS']
        },
        {
            id: 2,
            title: 'UI/UX Design Prinzipien',
            description: 'Lernen Sie die fundamentalen Prinzipien des modernen UI/UX Designs und wie Sie benutzerfreundliche Interfaces gestalten.',
            image: 'https://cdn.pixabay.com/photo/2016/11/29/06/15/plans-1867745_960_720.jpg',
            category: 'Design',
            author: 'Anna Schmidt',
            date: '2024-12-18',
            likes: 67,
            comments: 15,
            tags: ['UI', 'UX', 'Design']
        },
        {
            id: 3,
            title: 'Dark Mode Implementierung',
            description: 'Eine vollständige Anleitung zur Implementierung von Dark Mode in modernen Web-Anwendungen mit CSS Custom Properties.',
            image: 'https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_960_720.jpg',
            category: 'Tutorial',
            author: 'Tom Weber',
            date: '2024-12-17',
            likes: 89,
            comments: 23,
            tags: ['CSS', 'Themes', 'Dark Mode']
        },
        {
            id: 4,
            title: 'Performance Optimierung',
            description: 'Best Practices für die Performance-Optimierung von React-Anwendungen und moderne Build-Tools.',
            image: 'https://cdn.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_960_720.jpg',
            category: 'Performance',
            author: 'Lisa Johnson',
            date: '2024-12-16',
            likes: 134,
            comments: 31,
            tags: ['Performance', 'React', 'Optimization']
        },
        {
            id: 5,
            title: 'Responsive Design',
            description: 'Moderne Techniken für responsives Design mit CSS Grid, Flexbox und Mobile-First Ansätzen.',
            image: 'https://cdn.pixabay.com/photo/2016/11/29/20/22/phone-1869510_960_720.jpg',
            category: 'CSS',
            author: 'David Kim',
            date: '2024-12-15',
            likes: 76,
            comments: 12,
            tags: ['CSS', 'Responsive', 'Mobile']
        },
        {
            id: 6,
            title: 'JavaScript ES2024',
            description: 'Die neuesten Features von JavaScript ES2024 und wie Sie diese in Ihren Projekten einsetzen können.',
            image: 'https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198_960_720.jpg',
            category: 'JavaScript',
            author: 'Sarah Miller',
            date: '2024-12-14',
            likes: 98,
            comments: 19,
            tags: ['JavaScript', 'ES2024', 'Modern JS']
        }
    ];

    const navigationItems = [
        { id: 'overview', label: 'Übersicht', icon: FaHome },
        { id: 'buttons', label: 'Buttons', icon: FaPlay },
        { id: 'forms', label: 'Formulare', icon: FaEdit },
        { id: 'cards', label: 'Cards & Grids', icon: FaBars },
        { id: 'loaders', label: 'Loaders', icon: FaSpinner },
        { id: 'themes', label: 'Themes', icon: FaCog },
        { id: 'components', label: 'Komponenten', icon: FaStar }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate form submission
        setTimeout(() => {
            setIsLoading(false);
            setShowModal(true);
        }, 2000);
    };

    const LoadingSpinner = ({ type = 'spinner' }: { type?: 'spinner' | 'dots' | 'pulse' | 'skeleton' }) => {
        switch (type) {
            case 'dots':
                return (
                    <div className="loading-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                );
            case 'pulse':
                return <div className="loading-pulse"></div>;
            case 'skeleton':
                return (
                    <div className="skeleton-loader">
                        <div className="skeleton-line skeleton-title"></div>
                        <div className="skeleton-line skeleton-text"></div>
                        <div className="skeleton-line skeleton-text short"></div>
                    </div>
                );
            default:
                return <FaSpinner className="loading-spinner" />;
        }
    };

    const renderOverview = () => (
        <div className="overview-section">
            <div className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="gradient-text">Design System</span> Showcase
                    </h1>
                    <p className="hero-description">
                        Entdecken Sie unser umfassendes Design-System mit modernen Themes,
                        Komponenten und interaktiven Elementen für die perfekte Benutzererfahrung.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg">
                            <FaPlay className="btn-icon" />
                            Demo starten
                        </button>
                        <button className="btn btn-outline btn-lg">
                            <FaGithub className="btn-icon" />
                            Dokumentation
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.png"
                        alt="Design System" className="hero-img" />
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🎨</div>
                    <h3 className="stat-number">5</h3>
                    <p className="stat-label">Design Themes</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🧩</div>
                    <h3 className="stat-number">50+</h3>
                    <p className="stat-label">UI Komponenten</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⚡</div>
                    <h3 className="stat-number">99%</h3>
                    <p className="stat-label">Performance Score</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📱</div>
                    <h3 className="stat-number">100%</h3>
                    <p className="stat-label">Responsive</p>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">
                        <FaStar />
                    </div>
                    <h3>Moderne Themes</h3>
                    <p>5 verschiedene Design-Themes mit Dark/Light Mode Unterstützung und nahtlosem Switching.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">
                        <FaCog />
                    </div>
                    <h3>Konfigurierbar</h3>
                    <p>Vollständig anpassbare Komponenten mit CSS Custom Properties und SCSS-Variablen.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">
                        <FaHeart />
                    </div>
                    <h3>Benutzerfreundlich</h3>
                    <p>Intuitive Bedienung mit Keyboard-Shortcuts und Accessibility-Features.</p>
                </div>
            </div>
        </div>
    );

    const renderButtons = () => (
        <div className="buttons-section">
            <h2 className="section-title">Button Variationen</h2>

            <div className="button-showcase">
                <div className="button-group">
                    <h3>Primary Buttons</h3>
                    <div className="buttons-row">
                        <button className="btn btn-primary btn-sm">Small</button>
                        <button className="btn btn-primary">Default</button>
                        <button className="btn btn-primary btn-lg">Large</button>
                        <button className="btn btn-primary btn-xl">Extra Large</button>
                    </div>
                </div>

                <div className="button-group">
                    <h3>Button Styles</h3>
                    <div className="buttons-row">
                        <button className="btn btn-primary">
                            <FaHeart className="btn-icon" />
                            Primary
                        </button>
                        <button className="btn btn-secondary">
                            <FaStar className="btn-icon" />
                            Secondary
                        </button>
                        <button className="btn btn-outline">
                            <FaDownload className="btn-icon" />
                            Outline
                        </button>
                        <button className="btn btn-ghost">
                            <FaEdit className="btn-icon" />
                            Ghost
                        </button>
                    </div>
                </div>

                <div className="button-group">
                    <h3>Status Buttons</h3>
                    <div className="buttons-row">
                        <button className="btn btn-success">
                            <FaCheck className="btn-icon" />
                            Success
                        </button>
                        <button className="btn btn-warning">
                            <FaExclamationTriangle className="btn-icon" />
                            Warning
                        </button>
                        <button className="btn btn-danger">
                            <FaTimes className="btn-icon" />
                            Danger
                        </button>
                        <button className="btn btn-info">
                            <FaInfoCircle className="btn-icon" />
                            Info
                        </button>
                    </div>
                </div>

                <div className="button-group">
                    <h3>Special Effects</h3>
                    <div className="buttons-row">
                        <button className="btn btn-gradient">
                            <FaStar className="btn-icon" />
                            Gradient
                        </button>
                        <button className="btn btn-glow">
                            <FaHeart className="btn-icon" />
                            Glow Effect
                        </button>
                        <button className="btn btn-glass">
                            <FaEye className="btn-icon" />
                            Glass
                        </button>
                        <button className="btn btn-neon">
                            <FaPlay className="btn-icon" />
                            Neon
                        </button>
                    </div>
                </div>

                <div className="button-group">
                    <h3>Loading States</h3>
                    <div className="buttons-row">
                        <button className="btn btn-primary" disabled>
                            <FaSpinner className="btn-icon spinning" />
                            Loading...
                        </button>
                        <button className="btn btn-secondary" disabled>
                            <FaCircleNotch className="btn-icon spinning" />
                            Processing
                        </button>
                        <button className="btn btn-outline" disabled>
                            <LoadingSpinner type="dots" />
                            Saving
                        </button>
                    </div>
                </div>

                <div className="button-group">
                    <h3>Icon Buttons</h3>
                    <div className="buttons-row">
                        <button className="btn btn-icon">
                            <FaHeart />
                        </button>
                        <button className="btn btn-icon btn-primary">
                            <FaShoppingCart />
                        </button>
                        <button className="btn btn-icon btn-success">
                            <FaCheck />
                        </button>
                        <button className="btn btn-icon btn-danger">
                            <FaTrash />
                        </button>
                        <button className="btn btn-icon btn-ghost">
                            <FaCog />
                        </button>
                    </div>
                </div>

                <div className="button-group">
                    <h3>Social Media Buttons</h3>
                    <div className="buttons-row">
                        <button className="btn btn-social btn-github">
                            <FaGithub className="btn-icon" />
                            GitHub
                        </button>
                        <button className="btn btn-social btn-twitter">
                            <FaTwitter className="btn-icon" />
                            Twitter
                        </button>
                        <button className="btn btn-social btn-linkedin">
                            <FaLinkedin className="btn-icon" />
                            LinkedIn
                        </button>
                        <button className="btn btn-social btn-instagram">
                            <FaInstagram className="btn-icon" />
                            Instagram
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderForms = () => (
        <div className="forms-section">
            <h2 className="section-title">Formular Komponenten</h2>

            <div className="form-showcase">
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="demo-form">
                        <div className="form-header">
                            <h3>Kontakt Formular</h3>
                            <p>Testen Sie alle Formular-Komponenten in verschiedenen Themes</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                <FaUser className="label-icon" />
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Ihr vollständiger Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <FaBell className="label-icon" />
                                E-Mail Adresse *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="ihre@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category" className="form-label">
                                <FaCog className="label-icon" />
                                Kategorie
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="general">Allgemeine Anfrage</option>
                                <option value="support">Support</option>
                                <option value="feedback">Feedback</option>
                                <option value="business">Business</option>
                                <option value="technical">Technische Frage</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                <FaEdit className="label-icon" />
                                Nachricht *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="form-textarea"
                                placeholder="Ihre Nachricht..."
                                rows={5}
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <div className="form-row">
                                <div className="form-col">
                                    <label className="form-checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="notifications"
                                            checked={formData.notifications}
                                            onChange={handleInputChange}
                                            className="form-checkbox"
                                        />
                                        <span className="checkbox-custom"></span>
                                        E-Mail Benachrichtigungen erhalten
                                    </label>
                                </div>
                                <div className="form-col">
                                    <label className="form-radio-group-label">Theme Präferenz:</label>
                                    <div className="form-radio-group">
                                        <label className="form-radio-label">
                                            <input
                                                type="radio"
                                                name="theme"
                                                value="light"
                                                checked={formData.theme === 'light'}
                                                onChange={handleInputChange}
                                                className="form-radio"
                                            />
                                            <span className="radio-custom"></span>
                                            Light
                                        </label>
                                        <label className="form-radio-label">
                                            <input
                                                type="radio"
                                                name="theme"
                                                value="dark"
                                                checked={formData.theme === 'dark'}
                                                onChange={handleInputChange}
                                                className="form-radio"
                                            />
                                            <span className="radio-custom"></span>
                                            Dark
                                        </label>
                                        <label className="form-radio-label">
                                            <input
                                                type="radio"
                                                name="theme"
                                                value="auto"
                                                checked={formData.theme === 'auto'}
                                                onChange={handleInputChange}
                                                className="form-radio"
                                            />
                                            <span className="radio-custom"></span>
                                            Auto
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn btn-outline">
                                <FaTimes className="btn-icon" />
                                Zurücksetzen
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="btn-icon spinning" />
                                        Wird gesendet...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload className="btn-icon" />
                                        Absenden
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="form-examples">
                    <h4>Weitere Input-Typen</h4>

                    <div className="input-examples">
                        <div className="form-group">
                            <label className="form-label">Search Input</label>
                            <div className="input-with-icon">
                                <FaSearch className="input-icon" />
                                <input type="search" className="form-input" placeholder="Suchen..." />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password Input</label>
                            <div className="input-with-icon">
                                <FaLock className="input-icon" />
                                <input type="password" className="form-input" placeholder="Passwort" />
                                <button type="button" className="input-action">
                                    <FaEye />
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Number Range</label>
                            <input type="range" className="form-range" min="0" max="100" defaultValue="50" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">File Upload</label>
                            <div className="file-upload-area">
                                <FaUpload className="upload-icon" />
                                <p>Datei hier ablegen oder klicken zum Auswählen</p>
                                <input type="file" className="file-input" multiple />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCards = () => (
        <div className="cards-section">
            <div className="section-header">
                <h2 className="section-title">Cards & Grid Layouts</h2>
                <div className="view-controls">
                    <button
                        className={`btn btn-icon ${gridView === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setGridView('grid')}
                        title="Grid View"
                    >
                        <FaBars />
                    </button>
                    <button
                        className={`btn btn-icon ${gridView === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setGridView('list')}
                        title="List View"
                    >
                        <FaList />
                    </button>
                </div>
            </div>

            <div className={`cards-grid ${gridView}`}>
                {cardData.map((card) => (
                    <div key={card.id} className="card">
                        <div className="card-image">
                            <img src={card.image} alt={card.title} />
                            <div className="card-overlay">
                                <button className="btn btn-icon btn-ghost">
                                    <FaHeart />
                                </button>
                                <button className="btn btn-icon btn-ghost">
                                    <FaEye />
                                </button>
                                <button className="btn btn-icon btn-ghost">
                                    <FaShoppingCart />
                                </button>
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="card-meta">
                                <span className="card-category">{card.category}</span>
                                <span className="card-date">{card.date}</span>
                            </div>

                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-description">{card.description}</p>

                            <div className="card-tags">
                                {card.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="card-footer">
                            <div className="card-author">
                                <div className="author-avatar">
                                    <FaUser />
                                </div>
                                <span className="author-name">{card.author}</span>
                            </div>

                            <div className="card-stats">
                                <span className="stat">
                                    <FaHeart /> {card.likes}
                                </span>
                                <span className="stat">
                                    <FaEdit /> {card.comments}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="special-cards">
                <h3>Spezielle Card-Typen</h3>

                <div className="special-cards-grid">
                    <div className="card card-glass">
                        <div className="card-content">
                            <h4>Glass Effect Card</h4>
                            <p>Mit Glasmorphismus-Effekt für moderne Optik.</p>
                        </div>
                    </div>

                    <div className="card card-gradient">
                        <div className="card-content">
                            <h4>Gradient Card</h4>
                            <p>Mit dynamischen Farbverläufen und Animationen.</p>
                        </div>
                    </div>

                    <div className="card card-neon">
                        <div className="card-content">
                            <h4>Neon Glow Card</h4>
                            <p>Mit Neon-Effekten für Dark Theme.</p>
                        </div>
                    </div>

                    <div className="card card-minimal">
                        <div className="card-content">
                            <h4>Minimal Card</h4>
                            <p>Reduziertes Design für fokussierte Inhalte.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLoaders = () => (
        <div className="loaders-section">
            <h2 className="section-title">Loading Animationen</h2>

            <div className="loaders-showcase">
                <div className="loader-group">
                    <h3>Spinner Loaders</h3>
                    <div className="loaders-row">
                        <div className="loader-demo">
                            <FaSpinner className="spinner" />
                            <p>Spin Loader</p>
                        </div>
                        <div className="loader-demo">
                            <FaCircleNotch className="spinner" />
                            <p>Circle Loader</p>
                        </div>
                        <div className="loader-demo">
                            <div className="spinner-custom"></div>
                            <p>Custom Spinner</p>
                        </div>
                    </div>
                </div>

                <div className="loader-group">
                    <h3>Dots & Pulse Loaders</h3>
                    <div className="loaders-row">
                        <div className="loader-demo">
                            <LoadingSpinner type="dots" />
                            <p>Dots Loader</p>
                        </div>
                        <div className="loader-demo">
                            <LoadingSpinner type="pulse" />
                            <p>Pulse Loader</p>
                        </div>
                        <div className="loader-demo">
                            <div className="wave-loader">
                                <div className="wave"></div>
                                <div className="wave"></div>
                                <div className="wave"></div>
                            </div>
                            <p>Wave Loader</p>
                        </div>
                    </div>
                </div>

                <div className="loader-group">
                    <h3>Progress Bars</h3>
                    <div className="progress-demos">
                        <div className="progress-item">
                            <label>Linear Progress</label>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div className="progress-item">
                            <label>Striped Progress</label>
                            <div className="progress-bar striped">
                                <div className="progress-fill" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                        <div className="progress-item">
                            <label>Animated Progress</label>
                            <div className="progress-bar animated">
                                <div className="progress-fill" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="loader-group">
                    <h3>Skeleton Loaders</h3>
                    <div className="skeleton-demos">
                        <div className="skeleton-card">
                            <div className="skeleton-header">
                                <div className="skeleton-avatar"></div>
                                <div className="skeleton-info">
                                    <div className="skeleton-line skeleton-name"></div>
                                    <div className="skeleton-line skeleton-meta"></div>
                                </div>
                            </div>
                            <div className="skeleton-content">
                                <div className="skeleton-line skeleton-title"></div>
                                <div className="skeleton-line skeleton-text"></div>
                                <div className="skeleton-line skeleton-text short"></div>
                            </div>
                        </div>

                        <div className="skeleton-list">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="skeleton-list-item">
                                    <div className="skeleton-circle"></div>
                                    <div className="skeleton-content">
                                        <div className="skeleton-line skeleton-title"></div>
                                        <div className="skeleton-line skeleton-text"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="loader-group">
                    <h3>Interactive Loading States</h3>
                    <div className="interactive-loaders">
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsLoading(!isLoading)}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="btn-icon spinning" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <FaPlay className="btn-icon" />
                                    Start Loading
                                </>
                            )}
                        </button>

                        <div className="loading-states">
                            <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
                                <div className="loading-content">
                                    <div className="spinner-large"></div>
                                    <p>Lädt Daten...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderThemes = () => (
        <div className="themes-section">
            <h2 className="section-title">Theme System</h2>

            <div className="theme-switcher-demo">
                <h3>Theme Switcher</h3>
                <ThemeSwitcher />
            </div>

            <div className="theme-previews">
                <h3>Theme Vorschau</h3>
                <div className="theme-preview-grid">
                    {['light', 'dark', 'purple', 'red', 'olive'].map(theme => (
                        <div key={theme} className={`theme-preview theme-${theme}`}>
                            <div className="preview-header">
                                <h4>{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</h4>
                            </div>
                            <div className="preview-content">
                                <div className="preview-buttons">
                                    <button className="btn btn-primary btn-sm">Primary</button>
                                    <button className="btn btn-secondary btn-sm">Secondary</button>
                                </div>
                                <div className="preview-text">
                                    <p className="text-primary">Primary Text</p>
                                    <p className="text-secondary">Secondary Text</p>
                                </div>
                                <div className="preview-card">
                                    <div className="card-header">Card Example</div>
                                    <div className="card-body">
                                        <p>Theme demonstration content</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="theme-features">
                <h3>Theme Features</h3>
                <div className="features-list">
                    <div className="feature-item">
                        <FaCheck className="feature-icon" />
                        <div>
                            <h4>CSS Custom Properties</h4>
                            <p>Dynamisches Theme-Switching ohne Page-Reload</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <FaCheck className="feature-icon" />
                        <div>
                            <h4>SCSS Variables Integration</h4>
                            <p>Vollständig integriert in das SCSS Build-System</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <FaCheck className="feature-icon" />
                        <div>
                            <h4>Accessibility Support</h4>
                            <p>Prefers-color-scheme Unterstützung für System-Themes</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <FaCheck className="feature-icon" />
                        <div>
                            <h4>Performance Optimiert</h4>
                            <p>Minimale Runtime-Kosten durch CSS-basierte Implementierung</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderComponents = () => (
        <div className="components-section">
            <h2 className="section-title">UI Komponenten</h2>

            <div className="components-showcase">
                <div className="component-group">
                    <h3>Navigation</h3>
                    <div className="component-demo">
                        <nav className="demo-nav">
                            <div className="nav-brand">
                                <FaHome />
                                Brand
                            </div>
                            <ul className="nav-menu">
                                <li><a href="#" className="nav-link active">Home</a></li>
                                <li><a href="#" className="nav-link">About</a></li>
                                <li><a href="#" className="nav-link">Services</a></li>
                                <li><a href="#" className="nav-link">Contact</a></li>
                            </ul>
                            <div className="nav-actions">
                                <button className="btn btn-icon">
                                    <FaSearch />
                                </button>
                                <button className="btn btn-icon">
                                    <FaBell />
                                </button>
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="component-group">
                    <h3>Badges & Tags</h3>
                    <div className="component-demo">
                        <div className="badges-demo">
                            <span className="badge badge-primary">Primary</span>
                            <span className="badge badge-secondary">Secondary</span>
                            <span className="badge badge-success">Success</span>
                            <span className="badge badge-warning">Warning</span>
                            <span className="badge badge-danger">Danger</span>
                            <span className="badge badge-info">Info</span>
                        </div>
                        <div className="tags-demo">
                            <span className="tag">React</span>
                            <span className="tag">TypeScript</span>
                            <span className="tag">SCSS</span>
                            <span className="tag">Design</span>
                        </div>
                    </div>
                </div>

                <div className="component-group">
                    <h3>Alerts & Notifications</h3>
                    <div className="component-demo">
                        <div className="alert alert-success">
                            <FaCheck className="alert-icon" />
                            <div>
                                <strong>Erfolg!</strong> Ihre Nachricht wurde erfolgreich gesendet.
                            </div>
                            <button className="alert-close">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="alert alert-warning">
                            <FaExclamationTriangle className="alert-icon" />
                            <div>
                                <strong>Warnung!</strong> Bitte überprüfen Sie Ihre Eingaben.
                            </div>
                        </div>
                        <div className="alert alert-danger">
                            <FaTimes className="alert-icon" />
                            <div>
                                <strong>Fehler!</strong> Es ist ein unerwarteter Fehler aufgetreten.
                            </div>
                        </div>
                        <div className="alert alert-info">
                            <FaInfoCircle className="alert-icon" />
                            <div>
                                <strong>Info:</strong> Neue Features sind verfügbar.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="component-group">
                    <h3>Tooltips & Popovers</h3>
                    <div className="component-demo">
                        <div className="tooltips-demo">
                            <button className="btn btn-primary tooltip" data-tooltip="Das ist ein Tooltip">
                                Hover für Tooltip
                            </button>
                            <button className="btn btn-secondary tooltip" data-tooltip="Tooltip unten" data-position="bottom">
                                Unten
                            </button>
                            <button className="btn btn-outline tooltip" data-tooltip="Tooltip links" data-position="left">
                                Links
                            </button>
                            <button className="btn btn-ghost tooltip" data-tooltip="Tooltip rechts" data-position="right">
                                Rechts
                            </button>
                        </div>
                    </div>
                </div>

                <div className="component-group">
                    <h3>Borders & Shadows</h3>
                    <div className="component-demo">
                        <div className="borders-shadows-demo">
                            <div className="demo-box border-rounded">
                                <h4>Rounded Border</h4>
                                <p>border-radius: 0.5rem</p>
                            </div>
                            <div className="demo-box shadow-sm">
                                <h4>Small Shadow</h4>
                                <p>box-shadow: small</p>
                            </div>
                            <div className="demo-box shadow-md">
                                <h4>Medium Shadow</h4>
                                <p>box-shadow: medium</p>
                            </div>
                            <div className="demo-box shadow-lg">
                                <h4>Large Shadow</h4>
                                <p>box-shadow: large</p>
                            </div>
                            <div className="demo-box glow-effect">
                                <h4>Glow Effect</h4>
                                <p>CSS glow animation</p>
                            </div>
                            <div className="demo-box glass-effect">
                                <h4>Glass Effect</h4>
                                <p>Glassmorphism style</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="theme-test-page">
            <header className="page-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <span className="title-icon">🎨</span>
                        Design System Showcase
                    </h1>
                    <p className="page-subtitle">
                        Umfassende UI-Komponenten mit modernen Themes
                    </p>
                </div>
                <div className="header-actions">
                    <ThemeSwitcher />
                </div>
            </header>

            <nav className="page-navigation">
                <div className="nav-container">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            <item.icon className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <main className="page-content">
                <div className="content-container">
                    {activeSection === 'overview' && renderOverview()}
                    {activeSection === 'buttons' && renderButtons()}
                    {activeSection === 'forms' && renderForms()}
                    {activeSection === 'cards' && renderCards()}
                    {activeSection === 'loaders' && renderLoaders()}
                    {activeSection === 'themes' && renderThemes()}
                    {activeSection === 'components' && renderComponents()}
                </div>
            </main>

            {/* Modal Demo */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Formular erfolgreich gesendet!</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="success-icon">
                                <FaCheck />
                            </div>
                            <p>Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.</p>
                        </div>
                        <div className="modal-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowModal(false)}
                            >
                                Verstanden
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="page-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Design System</h4>
                        <p>Moderne UI-Komponenten für React-Anwendungen</p>
                    </div>
                    <div className="footer-section">
                        <h4>Features</h4>
                        <ul>
                            <li>5 Theme-Varianten</li>
                            <li>50+ UI-Komponenten</li>
                            <li>TypeScript Support</li>
                            <li>SCSS Integration</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Kontakt</h4>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="#" className="social-link">
                                <FaTwitter />
                            </a>
                            <a href="#" className="social-link">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Design System Showcase. Erstellt mit ❤️ und React.</p>
                </div>
            </footer>
        </div>
    );
};