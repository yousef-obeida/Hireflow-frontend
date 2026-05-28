/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Type, Palette, MousePointerClick, FileEdit, Award, Layout, HelpCircle, LogOut } from 'lucide-react';
import { useLogout } from '@/features/auth/api/auth.hooks';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  id?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  id,
}) => {
  const { mutate: handleLogout } = useLogout();
  const menuItems = [
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'buttons', label: 'Buttons', icon: MousePointerClick },
    { id: 'forms', label: 'Form Elements', icon: FileEdit },
    { id: 'badges', label: 'Badges & Status', icon: Award },
    { id: 'data', label: 'Data Display', icon: Layout },
  ];

  return (
    <aside
      id={id ?? 'hireflow-sidebar'}
      className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] sticky top-16 bg-white border-r border-[#e2e8f0]/40 p-6 overflow-y-auto"
    >
      {/* Brand Launcher Block */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#0058bc] rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0">
          <Layout className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h2 className="font-sans font-bold text-lg text-[#111c2d] leading-none">Hireflow</h2>
          <p className="text-[10px] text-[#717786] font-semibold tracking-wider uppercase mt-1">Recruitment Suite</p>
        </div>
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors text-xs font-semibold select-none ${
                isActive
                  ? 'bg-[#d0e1fb] text-[#263143]'
                  : 'text-[#414755] hover:bg-[#f0f3ff]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Secondary Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-gray-100 space-y-1.5">
        <button className="w-full flex items-center gap-3 text-[#414755] px-4 py-3 hover:bg-[#f0f3ff] rounded-xl text-left text-xs font-semibold select-none">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Help Center</span>
        </button>
        <button
          onClick={() => handleLogout()}
          className="w-full flex items-center gap-3 text-[#ba1a1a] px-4 py-3 hover:bg-[#ba1a1a]/5 rounded-xl text-left text-xs font-semibold select-none"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
