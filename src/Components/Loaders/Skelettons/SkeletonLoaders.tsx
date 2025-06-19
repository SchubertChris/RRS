// src/Components/Loaders/Skelettons/SkeletonLoaders.tsx

import React from 'react';
import './SkeletonLoaders.scss';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

export const SkeletonBox: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '20px',
    borderRadius = '4px',
    className = ''
}) => (
    <div
        className={`skeleton skeleton-box ${className}`}
        style={{ width, height, borderRadius }}
    />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
    lines = 3,
    className = ''
}) => (
    <div className={`skeleton-text ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
            <SkeletonBox
                key={i}
                height="16px"
                width={i === lines - 1 ? '70%' : '100%'}
                className="skeleton-line"
            />
        ))}
    </div>
);

export const SkeletonAvatar: React.FC<{ size?: string; className?: string }> = ({
    size = '40px',
    className = ''
}) => (
    <SkeletonBox
        width={size}
        height={size}
        borderRadius="50%"
        className={`skeleton-avatar ${className}`}
    />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`skeleton-card ${className}`}>
        <SkeletonBox height="200px" borderRadius="8px 8px 0 0" className="skeleton-image" />
        <div className="skeleton-card-content">
            <SkeletonBox height="24px" width="80%" className="skeleton-title" />
            <SkeletonText lines={2} className="skeleton-description" />
            <div className="skeleton-card-footer">
                <SkeletonBox height="36px" width="120px" className="skeleton-button" />
                <SkeletonBox height="16px" width="60px" className="skeleton-price" />
            </div>
        </div>
    </div>
);

export const SkeletonHeader: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`skeleton-header ${className}`}>
        <div className="skeleton-nav">
            <SkeletonBox height="32px" width="120px" className="skeleton-logo" />
            <div className="skeleton-nav-items">
                {Array.from({ length: 4 }, (_, i) => (
                    <SkeletonBox key={i} height="20px" width="80px" className="skeleton-nav-item" />
                ))}
            </div>
            <SkeletonBox height="36px" width="100px" className="skeleton-button" />
        </div>
    </div>
);

export const SkeletonProfile: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`skeleton-profile ${className}`}>
        <SkeletonAvatar size="80px" />
        <div className="skeleton-profile-info">
            <SkeletonBox height="28px" width="200px" className="skeleton-name" />
            <SkeletonBox height="18px" width="150px" className="skeleton-role" />
            <SkeletonText lines={3} className="skeleton-bio" />
        </div>
    </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
    rows = 5,
    columns = 4,
    className = ''
}) => (
    <div className={`skeleton-table ${className}`}>
        <div className="skeleton-table-header">
            {Array.from({ length: columns }, (_, i) => (
                <SkeletonBox key={i} height="20px" className="skeleton-th" />
            ))}
        </div>
        <div className="skeleton-table-body">
            {Array.from({ length: rows }, (_, i) => (
                <div key={i} className="skeleton-table-row">
                    {Array.from({ length: columns }, (_, j) => (
                        <SkeletonBox key={j} height="16px" className="skeleton-td" />
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export const SkeletonDashboard: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`skeleton-dashboard ${className}`}>
        <SkeletonHeader />
        <div className="skeleton-dashboard-content">
            <div className="skeleton-stats">
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="skeleton-stat-card">
                        <SkeletonBox height="48px" width="48px" className="skeleton-stat-icon" />
                        <SkeletonBox height="32px" width="80px" className="skeleton-stat-number" />
                        <SkeletonBox height="16px" width="100px" className="skeleton-stat-label" />
                    </div>
                ))}
            </div>
            <div className="skeleton-main-content">
                <div className="skeleton-charts">
                    <SkeletonBox height="300px" className="skeleton-chart" />
                    <SkeletonBox height="300px" className="skeleton-chart" />
                </div>
                <div className="skeleton-tables">
                    <SkeletonTable rows={6} columns={5} />
                </div>
            </div>
        </div>
    </div>
);

// Themed Skeleton Components
export const SkeletonShowcase: React.FC = () => {
    return (
        <div className="skeleton-showcase">
            <div className="showcase-section">
                <h3>Card Skeletons</h3>
                <div className="skeleton-grid">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>

            <div className="showcase-section">
                <h3>Profile Skeletons</h3>
                <div className="skeleton-profiles">
                    <SkeletonProfile />
                    <SkeletonProfile />
                </div>
            </div>

            <div className="showcase-section">
                <h3>Table Skeleton</h3>
                <SkeletonTable rows={4} columns={6} />
            </div>

            <div className="showcase-section">
                <h3>Dashboard Skeleton</h3>
                <SkeletonDashboard />
            </div>
        </div>
    );
};