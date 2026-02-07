import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  LifeBuoy, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  activeView: 'list' | 'verification' | 'new_submissions';
  onViewChange: (view: 'list' | 'verification' | 'new_submissions') => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  toggleCollapse, 
  activeView, 
  onViewChange,
  pendingCount 
}) => {
  const [isMcuExpanded, setIsMcuExpanded] = useState(true);

  return (
    <div 
      className={`
        h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-y-auto hidden lg:flex transition-all duration-300 z-20
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && <Logo />}
          <button 
            onClick={toggleCollapse}
            className={`
              p-1.5 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors border border-transparent hover:border-gray-100
              ${isCollapsed ? 'mx-auto' : ''}
            `}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            isCollapsed={isCollapsed}
            onClick={() => onViewChange('list')}
            isActive={activeView === 'list'}
          />
          
          {!isCollapsed && (
            <div className="pt-4 pb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3">Layanan</span>
            </div>
          )}
          
          <div className="space-y-1">
             <div 
               onClick={() => !isCollapsed && setIsMcuExpanded(!isMcuExpanded)}
               className={`
                 flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors
                 ${isCollapsed ? 'justify-center' : 'justify-between'}
               `}
             >
                <div className="flex items-center gap-3">
                  <Activity size={18} className={isMcuExpanded && !isCollapsed ? 'text-blue-600' : 'text-gray-500'} />
                  {!isCollapsed && <span className="text-sm font-semibold">Medical Checkup</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-200 ${isMcuExpanded ? 'rotate-180' : ''}`} 
                  />
                )}
             </div>
             
             {isMcuExpanded && !isCollapsed && (
               <div className="pl-10 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                  <NavItem 
                    label="Daftar Peserta" 
                    isActive={activeView === 'list'} 
                    onClick={() => onViewChange('list')}
                    isSubItem 
                  />
                  <div 
                    onClick={() => onViewChange('new_submissions')}
                    className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-sm font-medium transition-colors ${activeView === 'new_submissions' ? 'bg-blue-50 text-blue-700' : 'text-gray-600'}`}
                  >
                     <span>Pengajuan Baru</span>
                     <span className={`${activeView === 'new_submissions' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'} text-[10px] px-2 py-0.5 rounded-full font-bold`}>{pendingCount}</span>
                  </div>
               </div>
             )}
          </div>

          <NavItem icon={<Users size={18} />} label="Users" hasChevron={!isCollapsed} isCollapsed={isCollapsed} />
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-1 border-t border-gray-100">
        <NavItem icon={<LifeBuoy size={18} />} label="Support" isCollapsed={isCollapsed} />
        <NavItem icon={<Settings size={18} />} label="Pengaturan" isCollapsed={isCollapsed} />
        
        <div className={`pt-6 mt-6 border-t border-gray-100 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <img 
              src="https://picsum.photos/100/100?random=1" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-none mb-1">Olivia Rhye</span>
                <span className="text-xs text-gray-500 truncate w-32">olivia@untitledui.com</span>
              </div>
            )}
          </div>
          {!isCollapsed && <LogOut size={18} className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />}
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasChevron?: boolean;
  isSubItem?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, hasChevron, isSubItem, isCollapsed, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 text-sm font-semibold
        ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
        ${isCollapsed ? 'justify-center' : 'justify-between'}
      `}
      title={isCollapsed ? label : undefined}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </div>
      {hasChevron && !isCollapsed && <ChevronDown size={16} className="text-gray-400" />}
    </div>
  );
};