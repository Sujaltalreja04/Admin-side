import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 600;
`;

const Button = styled.button`
  background: linear-gradient(135deg,#14532d 0%,rgb(54, 128, 45) 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 20px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(20, 112, 22, 0.3);
  }
`;

function Login({ onLogin }) {
  const handleLogin = () => {
    onLogin({ username: 'Admin', id: 1 });
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome to Admin Panel</Title>
        <Button onClick={handleLogin}>Enter Admin Panel</Button>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login; 