import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaChartBar, 
  FaUsers, 
  FaCog, 
  FaBell,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import ExpertProfile from './ExpertProfile';
import ExpertReview from './ExpertReview';
import SiteContent from './SiteContent';
import Card3D from './Card3D';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { fetchExperts } from '../utils/api';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import Booking from './Booking';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: none;
  background-color: transparent;
`;

const CenteredMainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: none;
  background-color: transparent;
`;

const BigCard = styled.div`
  background: white;
  border-radius: 32px;
  padding: 64px 48px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.12);
  min-width: 700px;
  max-width: 1100px;
  width: 100%;
  margin: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 98vw;
    padding: 32px 8px;
  }
`;

const ContentArea = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  min-height: 500px;
  @media (max-width: 768px) {
    padding: 18px 10px;
    border-radius: 12px;
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    color: #333;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  background: white;
  border: 2px solid #e1e5e9;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }
  
  .icon {
    font-size: 24px;
    color: #667eea;
  }
  
  span {
    font-weight: 600;
    color: #333;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Number = styled.div`
  font-size: 2.6rem;
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 6px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;
const Modal3D = styled(Card3D)`
  min-width: 800px;
  max-width: 95vw;
  min-height: 400px;
  max-height: 80vh;
  overflow-y: auto;
  background: rgb(37, 39, 50);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.35), 0 2px 8px 0 rgba(0,0,0,0.22);
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  color: #fff;
  font-size: 1rem;
`;
const Th = styled.th`
  background: rgb(37, 39, 50);
  color: #ffd700;
  font-weight: 700;
  padding: 14px 10px;
  text-align: left;
  border-bottom: 2px solid #22223b;
`;
const Td = styled.td`
  padding: 12px 10px;
  border-bottom: 1px solid #33364d;
  color: #fff;
  font-size: 1rem;
  vertical-align: middle;
`;
const Tr = styled.tr`
  &:hover {
    background: rgba(34, 197, 94, 0.08);
    transition: background 0.2s;
  }
`;
const ProfileImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #667eea;
  background: #22223b;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 24px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.18);
  &:hover { background: #c0392b; }
`;

const LargeChartWrapper = styled.div`
  width: 80vw;
  max-width: 1100px;
  height: 60vh;
  margin: 32px auto 0 auto;
  background: rgb(37, 39, 50);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 1.5px 6px 0 rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;

// Add styled components for the booked expert list table
const BookingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
`;
const BookingTh = styled.th`
  color: #20511a;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 16px 12px;
  background: #fff;
  border-bottom: 2px solid #eaeaea;
  text-align: left;
`;
const BookingTd = styled.td`
  color: #222;
  font-size: 1.1rem;
  padding: 14px 12px;
  border-bottom: 1px solid #f3f3f3;
`;
const BookingTr = styled.tr``;
const BookingHighlightTr = styled.tr`
  background: #f8f6d8;
`;

function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showExperts, setShowExperts] = useState(true);
  const [showLargePie, setShowLargePie] = useState(false);
  const [showLargeBar, setShowLargeBar] = useState(false);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperts()
      .then(data => {
        setExperts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch experts');
        setLoading(false);
      });
  }, []);

  // Pie chart data
  const getCategoryData = () => {
    const counts = {};
    experts.forEach(expert => {
      const cat = expert.CATEGORY || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };
  const categoryData = getCategoryData();
  const COLORS = ['#22c55e', '#667eea', '#f59e42', '#e74c3c', '#4a4e69', '#ffd700'];

  // Bar chart fake data
  const fakeBarData = [
    { name: 'Mon', experts: 2 },
    { name: 'Tue', experts: 4 },
    { name: 'Wed', experts: 1 },
    { name: 'Thu', experts: 5 },
    { name: 'Fri', experts: 3 },
    { name: 'Sat', experts: 6 },
    { name: 'Sun', experts: 2 },
  ];

  // Bar chart real data (if you want to use it)
  const getNewExpertsData = () => {
    const days = Array.from({ length: 7 }).map((_, i) =>
      format(subDays(new Date(), 6 - i), 'EEE')
    );
    if (!experts.length || !experts[0].CREATED_AT) {
      return days.map(dayLabel => ({ date: dayLabel, experts: 0 }));
    }
    return days.map((dayLabel, i) => {
      const dayDate = subDays(new Date(), 6 - i);
      const count = experts.filter(expert => {
        if (!expert.CREATED_AT) return false;
        const regDate = typeof expert.CREATED_AT === 'string'
          ? parseISO(expert.CREATED_AT)
          : expert.CREATED_AT;
        return isSameDay(regDate, dayDate);
      }).length;
      return { date: dayLabel, experts: count };
    });
  };
  // const newExpertsData = getNewExpertsData(); // Use fakeBarData for now

  // Table rendering
  const renderTable = () => (
    <div style={{ width: '100%', margin: '0 auto', marginTop: 32 }}>
      <Modal3D style={{ minWidth: 800, maxWidth: '95vw', minHeight: 400, margin: '0 auto' }}>
        <h2 style={{ color: '#ffd700', marginBottom: 18 }}>Expert List</h2>
        {loading ? (
          <div style={{ color: '#fff', padding: 32 }}>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red', padding: 32 }}>{error}</div>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>Profile</Th>
                <Th>Name</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Rating</Th>
                <Th>Location</Th>
              </Tr>
            </thead>
            <tbody>
              {experts.slice(0, 16).map(expert => (
                <Tr key={expert.ID}>
                  <Td>
                    {expert.IMAGE ? (
                      <ProfileImg src={expert.IMAGE} alt={expert.NAME} />
                    ) : (
                      <ProfileImg as="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                        {expert.NAME ? expert.NAME.charAt(0).toUpperCase() : 'E'}
                      </ProfileImg>
                    )}
                  </Td>
                  <Td>{expert.NAME}</Td>
                  <Td>{expert.TITLE}</Td>
                  <Td>{expert.CATEGORY}</Td>
                  <Td>{expert.RATING}</Td>
                  <Td>{expert.LOCATION}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal3D>
    </div>
  );

  // Large pie chart rendering
  const renderLargePie = () => (
    <LargeChartWrapper>
      <ResponsiveContainer width="60%" height="90%">
        <PieChart>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </LargeChartWrapper>
  );

  // Large bar chart rendering
  const renderLargeBar = () => (
    <LargeChartWrapper>
      <ResponsiveContainer width="80%" height="90%">
        <BarChart data={fakeBarData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#33364d" />
          <XAxis dataKey="name" stroke="#fff" fontSize={16} />
          <YAxis stroke="#fff" fontSize={16} />
          <Tooltip />
          <Bar dataKey="experts" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </LargeChartWrapper>
  );

  // Card click handlers
  const handleShowExperts = () => {
    setShowExperts(true);
    setShowLargePie(false);
    setShowLargeBar(false);
  };
  const handleShowLargePie = () => {
    setShowExperts(false);
    setShowLargePie(true);
    setShowLargeBar(false);
  };
  const handleShowLargeBar = () => {
    setShowExperts(false);
    setShowLargePie(false);
    setShowLargeBar(true);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'expert-profile':
        return <ExpertProfile />;
      case 'expert-booking':
        return <Booking />;
      case 'expert-review':
        return <ExpertReview />;
      case 'site-content':
        return <SiteContent />;
      default:
        return (
          <div style={{ padding: '32px 24px' }}>
            <DashboardGrid>
              {/* Card 1: Total Experts */}
              <Card3D accent="linear-gradient(135deg, #22c55e 0%, #14532d 100%)" style={{ cursor: 'pointer' }} onClick={handleShowExperts}>
                <Title>Total Experts</Title>
                <Number>{loading ? '...' : experts.length}</Number>
              </Card3D>
              {/* Card 2: Total Reviews */}
              <Card3D accent="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                <Title>Total Reviews</Title>
                <Number>{loading ? '...' : experts.reduce((sum, expert) => sum + (parseInt(expert.REVIEWS, 10) || 0), 0)}</Number>
              </Card3D>
              {/* Card 3: Pie Chart of Categories (no label) */}
              <Card3D accent="linear-gradient(135deg, #f59e42 0%, #e74c3c 100%)" style={{ cursor: 'pointer' }} onClick={handleShowLargePie}>
                <Title>Expert Categories</Title>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card3D>
              {/* Card 4: Bar Chart Card (fake data, no label) */}
              <Card3D accent="linear-gradient(135deg, #22223b 0%, #4a4e69 100%)" style={{ cursor: 'pointer' }} onClick={handleShowLargeBar}>
                <Title>New Experts (This Week)</Title>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={fakeBarData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#33364d" />
                    <XAxis dataKey="name" stroke="#fff" fontSize={12} />
                    <YAxis stroke="#fff" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="experts" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card3D>
            </DashboardGrid>
            {/* Large chart/table area below cards */}
            {showExperts && renderTable()}
            {showLargePie && renderLargePie()}
            {showLargeBar && renderLargeBar()}
          </div>
        );
    }
  };

  return (
    <DashboardContainer>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <CenteredMainContent>
        <BigCard>
          {renderContent()}
        </BigCard>
      </CenteredMainContent>
    </DashboardContainer>
  );
}

export default Dashboard; 