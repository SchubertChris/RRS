import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className = ''
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Focus modal
            setTimeout(() => {
                modalRef.current?.focus();
            }, 100);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === overlayRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <div
            ref={overlayRef}
            className={`modal-overlay ${className}`}
            onClick={handleBackdropClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1050,
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? 'visible' : 'hidden',
                transition: 'all 300ms ease-out'
            }}
        >
            <div
                ref={modalRef}
                className={`modal-content ${sizeClasses[size]}`}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                style={{
                    backgroundColor: 'var(--color-surface, #ffffff)',
                    borderRadius: 'var(--border-radius-default, 0.5rem)',
                    boxShadow: 'var(--shadow-modal, 0 20px 40px rgba(0, 0, 0, 0.15))',
                    border: '1px solid var(--color-border, #e5e7eb)',
                    width: '90vw',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)',
                    transition: 'all 300ms ease-out'
                }}
            >
                {/* Header */}
                {title && (
                    <div
                        className="modal-header"
                        style={{
                            padding: '1.5rem 1.5rem 1rem 1.5rem',
                            borderBottom: '1px solid var(--color-border, #e5e7eb)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <h2
                            id="modal-title"
                            style={{
                                margin: 0,
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary, #1f2937)'
                            }}
                        >
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary, #6b7280)',
                                padding: '0.25rem',
                                borderRadius: '0.25rem',
                                transition: 'all 150ms ease-out'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-background-secondary, #f9fafb)';
                                e.currentTarget.style.color = 'var(--color-text-primary, #1f2937)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--color-text-secondary, #6b7280)';
                            }}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Body */}
                <div
                    className="modal-body"
                    style={{
                        padding: title ? '1rem 1.5rem 1.5rem 1.5rem' : '1.5rem',
                        maxHeight: title ? 'calc(90vh - 80px)' : 'calc(90vh - 3rem)',
                        overflowY: 'auto'
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};