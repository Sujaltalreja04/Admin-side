import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBell, FaTimes } from 'react-icons/fa';


const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Notification = styled.div`
  background: white;
  border-left: 5px solid #22c55e;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 18px 24px 18px 18px;
  min-width: 280px;
  display: flex;
  align-items: center;
  gap: 15px;
  animation: fadeIn 0.5s;
  position: relative;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Message = styled.div`
  flex: 1;
  color: #333;
  font-size: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    color: #e74c3c;
  }
`;

function Notifications({ notifications, onRemove }) {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        onRemove(notifications[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications, onRemove]);

  return (
    <NotificationContainer>
      {notifications.map(n => (
        <Notification key={n.id}>
          <FaBell style={{ color: '#22c55e', fontSize: '1.3rem' }} />
          <Message>{n.message}</Message>
          <CloseButton onClick={() => onRemove(n.id)}><FaTimes /></CloseButton>
        </Notification>
      ))}
    </NotificationContainer>
  );
}

export default Notifications; 