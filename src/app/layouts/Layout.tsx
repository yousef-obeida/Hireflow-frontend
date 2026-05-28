/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';

export const Layout: React.FC = () => {
  // Local state for sidebar section selection, matching design system requirements
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div
      id="hireflow-root"
      className="min-h-screen bg-[#f9f9ff] text-[#111c2d] font-sans antialiased selection:bg-[#0058bc]/10 selection:text-[#0058bc]"
    >
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar
          activeSection={activeSection}
          onNavigate={(id) => setActiveSection(id)}
        />
        <main className="flex-1 px-4 sm:px-6 md:px-12 py-6 md:py-10 overflow-x-hidden w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
