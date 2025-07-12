import React from 'react';
import styled from 'styled-components';
import { 
  FaHome, 
  FaUser, 
  FaFileAlt, 
  FaChartBar, 
  FaCog, 
  FaUsers,
  FaSignOutAlt,
  FaStar,
  FaBell,
  FaShieldAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 280px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255,255,255,0.2);
  box-shadow: 8px 0 32px rgba(0,0,0,0.1);
  overflow-y: auto;
  position: relative;
  border-radius: 0 24px 24px 0;
  animation: slideInFromLeft 0.5s ease-out;
`;

const SidebarHeader = styled.div`
  padding: 32px 24px 24px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  background: rgba(255,255,255,0.05);
  border-radius: 0 0 20px 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, #ec4899, #a5b4fc);
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, #6366f1, #ec4899, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
`;

const NavSection = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  color: rgba(255,255,255,0.5);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0 0 16px 24px;
  font-weight: 700;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  border-radius: 0 12px 12px 0;
  margin: 2px 0;
  position: relative;
  
  &:hover {
    background: rgba(255,255,255,0.1);
    border-left-color: #6366f1;
    color: #f8fafc;
    transform: translateX(4px);
    
    .icon {
      color: #6366f1;
      transform: scale(1.1);
    }
  }
  
  ${props => props.active && `
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2));
    border-left-color: #6366f1;
    color: #f8fafc;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #6366f1, #ec4899);
    }
    
    .icon {
      color: #6366f1;
    }
  `}
`;

const Icon = styled.div`
  font-size: 18px;
  margin-right: 12px;
  color: rgba(255,255,255,0.7);
  width: 20px;
  text-align: center;
  transition: all 0.3s ease;
`;

const Label = styled.span`
  font-weight: 500;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.9);
`;

const Badge = styled.span`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 12px;
  margin-left: auto;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  animation: pulse 2s ease-in-out infinite;
`;

const UserSection = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  border-radius: 0 0 24px 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  margin-right: 12px;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #6366f1, #ec4899, #a5b4fc);
    z-index: -1;
    opacity: 0.7;
  }
`;

const UserDetails = styled.div`
  flex: 1;
  
  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: #f8fafc;
    font-weight: 600;
  }
  
  p {
    margin: 2px 0 0 0;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  position: absolute;
  top: 2px;
  right: 2px;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  animation: pulse 2s ease-in-out infinite;
`;

function Sidebar({ activeSection, onSectionChange }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaHome />,
      section: 'Overview'
    },
    {
      id: 'expert-profile',
      label: 'Expert Profiles',
      icon: <FaUser />,
      section: 'Content Management'
    },
    {
      id: 'expert-booking',
      label: 'Bookings',
      icon: <span role="img" aria-label="booking">📅</span>,
      section: 'Content Management'
    },
    {
      id: 'expert-review',
      label: 'Reviews',
      icon: <FaStar />,
      section: 'Content Management'
    },
    {
      id: 'site-content',
      label: 'Site Content',
      icon: <FaFileAlt />,
      section: 'Content Management'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FaChartBar />,
      section: 'Insights'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <FaUsers />,
      section: 'Insights',
      badge: '3',
      route: '/users'
    },
    {
      id: 'moderation',
      label: 'Moderation',
      icon: <FaShieldAlt />,
      section: 'System',
      badge: '2'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <FaBell />,
      section: 'System'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FaCog />,
      section: 'System',
      route: '/settings'
    }
  ];

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo>StackIt</Logo>
        <Subtitle>Admin Panel</Subtitle>
      </SidebarHeader>
      
      {Object.entries(groupedItems).map(([section, items]) => (
        <NavSection key={section}>
          <SectionTitle>{section}</SectionTitle>
          {items.map(item => (
            <NavItem
              key={item.id}
              active={activeSection === item.id}
              onClick={() => {
                if (item.route) navigate(item.route);
                else onSectionChange(item.id);
              }}
            >
              <Icon className="icon">{item.icon}</Icon>
              <Label>{item.label}</Label>
              {item.badge && <Badge>{item.badge}</Badge>}
              }
            </NavItem>
          ))}
        </NavSection>
      ))}
      
      <UserSection>
        <UserInfo>
          <UserAvatar>
            A
            <StatusIndicator />
          </UserAvatar>
          <UserDetails>
            <h4>Admin User</h4>
            <p>Super Administrator</p>
          </UserDetails>
        </UserInfo>
        <LogoutButton>
          <FaSignOutAlt />
          Sign Out
        </LogoutButton>
      </UserSection>
    </SidebarContainer>
  );
}

export default Sidebar;