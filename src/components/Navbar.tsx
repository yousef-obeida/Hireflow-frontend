/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Bell, HelpCircle, Plus } from 'lucide-react';

interface NavbarProps {
  id?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ id }) => {
  return (
    <nav
      id={id ?? 'hireflow-navbar'}
      className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 md:px-12 w-full h-16 bg-white/80 backdrop-blur-md border-b border-[#e2e8f0]/30 shadow-subtle select-none"
    >
      <div className="flex items-center gap-4 md:gap-10">
        <span className="text-xl font-bold text-[#0058bc]">Hireflow</span>
        
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            className="pl-10 pr-4 py-2 bg-[#f0f3ff] rounded-full border-none focus:ring-2 focus:ring-[#0058bc]/10 w-64 text-xs transition-all outline-none"
            placeholder="Search spec components..."
          />
        </div>

        {/* Icons */}
        <button
          className="p-2 text-[#414755] hover:bg-[#f0f3ff] rounded-full transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>

        <button
          className="p-2 text-[#414755] hover:bg-[#f0f3ff] rounded-full transition-colors"
          title="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

        {/* Action Button */}
        <button
          onClick={() => alert('Launching Create Job dialog template')}
          className="bg-[#0058bc] hover:bg-[#0070eb] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer select-none shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Job</span>
        </button>
      </div>
    </nav>
  );
};
