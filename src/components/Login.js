import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.7;
    animation: float 8s ease-in-out infinite;
  }
  
  &::before {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #6366f1, #a5b4fc);
    top: 20%;
    left: 10%;
    animation-delay: -2s;
  }
  
  &::after {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #ec4899, #f472b6);
    bottom: 20%;
    right: 10%;
    animation-delay: -4s;
  }
`;

const LoginCard = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  padding: 48px;
  width: 100%;
  max-width: 420px;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #6366f1, #ec4899, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const Subtitle = styled.div`
  color: rgba(255,255,255,0.8);
  font-size: 1.1rem;
  margin-bottom: 32px;
  font-weight: 500;
`;

const Title = styled.h1`
  color: #f8fafc;
  margin-bottom: 32px;
  font-size: 1.8rem;
  font-weight: 600;
  opacity: 0.9;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 20px;
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
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Features = styled.div`
  margin-top: 24px;
  text-align: left;
  
  .feature {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    color: rgba(255,255,255,0.7);
    font-size: 0.9rem;
    
    &::before {
      content: '✨';
      margin-right: 8px;
    }
  }
`;

function Login({ onLogin }) {
  const handleLogin = () => {
    onLogin({ username: 'Admin', id: 1 });
  };

  return (
    <LoginContainer>
      <FloatingOrbs />
      <LoginCard className="fade-in-up">
        <Logo>StackIt</Logo>
        <Subtitle>Admin Panel</Subtitle>
        <Title>Welcome Back</Title>
        
        <Features>
          <div className="feature">Modern glassmorphism design</div>
          <div className="feature">Real-time analytics dashboard</div>
          <div className="feature">Advanced content moderation</div>
          <div className="feature">User management system</div>
        </Features>
        
        <Button onClick={handleLogin}>
          Enter Admin Panel
        </Button>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;