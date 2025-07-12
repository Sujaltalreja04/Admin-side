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
  FaSearch,
  FaEye,
  FaHeart,
  FaComments,
  FaTrendingUp
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import ExpertProfile from './ExpertProfile';
import ExpertReview from './ExpertReview';
import SiteContent from './SiteContent';
import Card3D from './Card3D';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
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
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  background: none;
  background-color: transparent;
  padding: 24px;
  overflow-y: auto;
`;

const BigCard = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 32px;
  padding: 48px 32px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  min-width: 800px;
  max-width: 1400px;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.6s ease-out;
  
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 98vw;
    padding: 24px 16px;
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    background: linear-gradient(45deg, #6366f1, #ec4899, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 800;
    letter-spacing: -1px;
  }
  
  p {
    color: rgba(255,255,255,0.8);
    font-size: 1.2rem;
    margin: 0;
    font-weight: 500;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 28px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #6366f1, #ec4899)'};
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    background: rgba(255,255,255,0.15);
  }
`;

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${props => props.gradient || 'linear-gradient(135deg, #6366f1, #ec4899)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
`;

const StatNumber = styled.div`
  font-size: 2.4rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 8px;
  line-height: 1;
`;

const StatLabel = styled.div`
  color: rgba(255,255,255,0.7);
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: ${props => props.positive ? '#22c55e' : '#ef4444'};
  font-weight: 600;
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.15);
  }
  
  h3 {
    color: #f8fafc;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 32px;
`;

const ActionButton = styled.button`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 20px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  color: #f8fafc;
  
  &:hover {
    background: rgba(255,255,255,0.15);
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.2);
  }
  
  .icon {
    font-size: 28px;
    color: #6366f1;
  }
  
  span {
    font-weight: 600;
    font-size: 0.95rem;
  }
`;

const RecentActivity = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 24px;
  padding: 32px;
  margin-top: 32px;
  
  h3 {
    color: #f8fafc;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
  }
  
  .content {
    flex: 1;
    
    .action {
      color: #f8fafc;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .time {
      color: rgba(255,255,255,0.6);
      font-size: 0.85rem;
    }
  }
`;

function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
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

  // Chart data
  const categoryData = [
    { name: 'Technology', value: 35, color: '#6366f1' },
    { name: 'Business', value: 25, color: '#ec4899' },
    { name: 'Design', value: 20, color: '#22c55e' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  const activityData = [
    { name: 'Mon', users: 120, questions: 45, answers: 89 },
    { name: 'Tue', users: 150, questions: 52, answers: 95 },
    { name: 'Wed', users: 180, questions: 38, answers: 102 },
    { name: 'Thu', users: 200, questions: 61, answers: 87 },
    { name: 'Fri', users: 170, questions: 49, answers: 94 },
    { name: 'Sat', users: 140, questions: 33, answers: 76 },
    { name: 'Sun', users: 110, questions: 28, answers: 68 }
  ];

  const recentActivities = [
    { user: 'Sarah J.', action: 'Posted a new question about React hooks', time: '2 minutes ago' },
    { user: 'Mike C.', action: 'Answered a question about Node.js', time: '5 minutes ago' },
    { user: 'Emily D.', action: 'Upvoted an answer about CSS Grid', time: '8 minutes ago' },
    { user: 'David W.', action: 'Created a new tag: "machine-learning"', time: '12 minutes ago' },
    { user: 'Lisa B.', action: 'Reported inappropriate content', time: '15 minutes ago' }
  ];

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
          <div>
            <WelcomeSection>
              <h1>Welcome to StackIt</h1>
              <p>Your modern Q&A platform administration center</p>
            </WelcomeSection>

            <DashboardGrid>
              <StatCard gradient="linear-gradient(90deg, #6366f1, #8b5cf6)">
                <StatIcon gradient="linear-gradient(135deg, #6366f1, #8b5cf6)">
                  <FaUsers />
                </StatIcon>
                <StatNumber>{loading ? '...' : experts.length}</StatNumber>
                <StatLabel>Total Experts</StatLabel>
                <StatChange positive>
                  <FaTrendingUp /> +12% this week
                </StatChange>
              </StatCard>

              <StatCard gradient="linear-gradient(90deg, #ec4899, #f472b6)">
                <StatIcon gradient="linear-gradient(135deg, #ec4899, #f472b6)">
                  <FaComments />
                </StatIcon>
                <StatNumber>2,847</StatNumber>
                <StatLabel>Total Questions</StatLabel>
                <StatChange positive>
                  <FaTrendingUp /> +8% this week
                </StatChange>
              </StatCard>

              <StatCard gradient="linear-gradient(90deg, #22c55e, #16a34a)">
                <StatIcon gradient="linear-gradient(135deg, #22c55e, #16a34a)">
                  <FaHeart />
                </StatIcon>
                <StatNumber>5,234</StatNumber>
                <StatLabel>Total Answers</StatLabel>
                <StatChange positive>
                  <FaTrendingUp /> +15% this week
                </StatChange>
              </StatCard>

              <StatCard gradient="linear-gradient(90deg, #f59e0b, #d97706)">
                <StatIcon gradient="linear-gradient(135deg, #f59e0b, #d97706)">
                  <FaEye />
                </StatIcon>
                <StatNumber>18.2k</StatNumber>
                <StatLabel>Active Users</StatLabel>
                <StatChange positive>
                  <FaTrendingUp /> +5% this week
                </StatChange>
              </StatCard>
            </DashboardGrid>

            <ChartsSection>
              <ChartCard>
                <h3>
                  <FaChartBar style={{ color: '#6366f1' }} />
                  Weekly Activity
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(30,41,59,0.9)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)'
                      }} 
                    />
                    <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                    <Area type="monotone" dataKey="questions" stroke="#ec4899" fillOpacity={1} fill="url(#colorQuestions)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard>
                <h3>
                  <FaUsers style={{ color: '#ec4899' }} />
                  Expert Categories
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={categoryData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(30,41,59,0.9)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(20px)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </ChartsSection>

            <RecentActivity>
              <h3>
                <FaBell style={{ color: '#f59e0b' }} />
                Recent Activity
              </h3>
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index}>
                  <div className="avatar">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="content">
                    <div className="action">{activity.action}</div>
                    <div className="time">{activity.time}</div>
                  </div>
                </ActivityItem>
              ))}
            </RecentActivity>

            <QuickActions>
              <ActionButton onClick={() => setActiveSection('expert-profile')}>
                <div className="icon">
                  <FaUser />
                </div>
                <span>Manage Experts</span>
              </ActionButton>
              <ActionButton onClick={() => setActiveSection('expert-review')}>
                <div className="icon">
                  <FaStar />
                </div>
                <span>Review Content</span>
              </ActionButton>
              <ActionButton onClick={() => setActiveSection('site-content')}>
                <div className="icon">
                  <FaFileAlt />
                </div>
                <span>Site Content</span>
              </ActionButton>
              <ActionButton>
                <div className="icon">
                  <FaChartBar />
                </div>
                <span>View Analytics</span>
              </ActionButton>
            </QuickActions>
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