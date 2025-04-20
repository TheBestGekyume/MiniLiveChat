import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Settings } from 'lucide-react';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <aside id="sidebar">
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'}>
          <Home size={24} />
          <span>Início</span>
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'}>
          <MessageSquare size={24} />
          <span>Chat Geral</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'}>
          <Settings size={24} />
          <span>Configurações</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
