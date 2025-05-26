import React from 'react';

import './src/styles/layout/minimal-layout.css';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

/**
 * @component
 * A basic layout component with minimal styling. Primarily for pages featuring immersive 3D content.
 */
const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full h-full bg-surface text-text">
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow px-4 md:px-8 lg:px-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MinimalLayout;