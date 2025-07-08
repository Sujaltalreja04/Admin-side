import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: ${({ accent }) => accent || 'rgb(37, 39, 50)'};
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 1.5px 6px 0 rgba(0,0,0,0.18);
  padding: 28px 24px;
  margin: 0 0 24px 0;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
  min-width: 220px;
  min-height: 120px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:hover {
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.35), 0 2px 8px 0 rgba(0,0,0,0.22);
    transform: translateY(-2px) scale(1.02);
  }
`;

const Card3D = ({ children, accent }) => <CardWrapper accent={accent}>{children}</CardWrapper>;

export default Card3D; 