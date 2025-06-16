import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`bg-glass-bg border border-glass-stroke rounded-2xl shadow-xl backdrop-blur-md p-4 sm:p-6 ${className}`}
        >
            {children}
        </div>
    );
};

export default GlassCard;
