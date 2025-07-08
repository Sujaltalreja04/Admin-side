import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const COLORS = ['#667eea', '#764ba2', '#27ae60', '#e74c3c', '#f39c12'];

export function UsersBarChart({ data }) {
  return (
    <ChartContainer>
      <h3>User Registrations (Last 5 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#667eea" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ContentPieChart({ data }) {
  return (
    <ChartContainer>
      <h3>Content Types Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
} 