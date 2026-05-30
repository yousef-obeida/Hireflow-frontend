import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, HelpCircle, LogOut, User, Briefcase, Users, Calendar, Columns3 } from 'lucide-react';
import { useLogout } from '@/features/auth/api/auth.hooks';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { toast } from 'sonner';

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
  const { user } = useAuthStore();
  const { mutate: handleLogout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout ,path:'/dashboard'},
    { id: 'candidates', label: 'Candidates', icon: Users,path:'/candidates'},
    { id: 'job_openings', label: 'Job Openings', icon: Briefcase,path:'/jobs' },
    { id: 'recuirment_status', label: 'Recuirment Status', icon:Columns3,path:'/pipelines' },
  ];

  if (user?.role === 'hr') {
    menuItems.push({ id: 'interviews', label: 'Interviews', icon: Calendar ,path:'/interviews' });
  }

  if (user?.role === 'admin') {
    menuItems.push({ id: 'users', label: 'Users', icon: User,path:'/users'});
  }

  return (
    <aside
      id={id ?? 'hireflow-sidebar'}
      className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] sticky top-16 bg-white border-r border-[#e2e8f0]/40 p-6 overflow-y-auto"
    >
      {/* Brand Launcher Block */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-white border border-[#e2e8f0] rounded-2xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden p-2.5">
          <img src="/logo.png" alt="Hireflow Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-sans text-xl font-bold !text-[#0058bc] leading-none" style={{ color: '#0058bc', fontWeight: 'bold' }}>
          Hireflow
        </span>
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path 
            ? location.pathname.startsWith(item.path) 
            : activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (item.path) {
                  navigate(item.path);
                }
              }}
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
        <button 
          onClick={() => toast.info('Contact support@hireflow.com if you need any help')}
          className="w-full flex items-center gap-3 text-[#414755] px-4 py-3 hover:bg-[#f0f3ff] rounded-xl text-left text-xs font-semibold select-none"
        >
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
