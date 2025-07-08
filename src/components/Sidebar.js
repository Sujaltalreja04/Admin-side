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
  FaStar
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #e1e5e9;
  box-shadow: 2px 0 16px rgba(34, 197, 94, 0.08);
  overflow-y: auto;
  position: relative;
  border-radius: 0 20px 20px 0;
`;

const SidebarHeader = styled.div`
  padding: 36px 24px 24px 24px;
  border-bottom: 1px solid #e1e5e9;
  text-align: center;
  background: white;
  border-radius: 0 0 20px 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #16a34a;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const NavSection = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  color: #999;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 15px 20px;
  font-weight: 600;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  border-radius: 8px;
  margin: 2px 0;
  &:hover {
    background: #e0f7ef;
    border-left-color: #22c55e;
    color: #14532d;
  }
  ${props => props.active && `
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    border-left-color: #22c55e;
    .icon {
      color: white;
    }
  `}
`;

const Icon = styled.div`
  font-size: 18px;
  margin-right: 12px;
  color: #666;
  width: 20px;
  text-align: center;
`;

const Label = styled.span`
  font-weight: 500;
  font-size: 0.95rem;
`;

const Badge = styled.span`
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
  font-weight: bold;
`;

const UserSection = styled.div`
  padding: 20px;
  border-top: 1px solid #e1e5e9;
  background: #f8f9fa;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
`;

const UserDetails = styled.div`
  flex: 1;
  
  h4 {
    margin: 0;
    font-size: 0.9rem;
    color: #333;
  }
  
  p {
    margin: 2px 0 0 0;
    font-size: 0.8rem;
    color: #666;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
  }
`;

function Sidebar({ activeSection, onSectionChange }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaHome />,
      section: 'Main'
    },
    {
      id: 'expert-profile',
      label: 'Expert Profile',
      icon: <FaUser />,
      section: 'Management'
    },
    {
      id: 'expert-booking',
      label: 'Expert Booking',
      icon: <span role="img" aria-label="booking">📖</span>,
      section: 'Management'
    },
    {
      id: 'expert-review',
      label: 'Expert Review',
      icon: <FaStar />,
      section: 'Management'
    },
    {
      id: 'site-content',
      label: 'Site Content',
      icon: <FaFileAlt />,
      section: 'Management'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FaChartBar />,
      section: 'Reports'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <FaUsers />,
      section: 'Reports',
      badge: '3',
      route: '/users'
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
        <Logo>Admin Panel</Logo>
        <Subtitle>Dashboard</Subtitle>
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
            </NavItem>
          ))}
        </NavSection>
      ))}
      <UserSection>
        <UserInfo>
          <UserAvatar>A</UserAvatar>
          <UserDetails>
            <h4>Admin User</h4>
            <p>Administrator</p>
          </UserDetails>
        </UserInfo>
        <LogoutButton>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </UserSection>
    </SidebarContainer>
  );
}

export default Sidebar; 