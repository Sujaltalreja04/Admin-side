import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  padding: 28px 24px;
  margin: 0 0 24px 0;
  transition: all 0.3s ease;
  position: relative;
  min-width: 220px;
  min-height: 120px;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ accent }) => accent || 'linear-gradient(90deg, #6366f1, #ec4899)'};
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.3);
  }
`;

const Card3D = ({ children, accent }) => <CardWrapper accent={accent}>{children}</CardWrapper>;

export default Card3D;