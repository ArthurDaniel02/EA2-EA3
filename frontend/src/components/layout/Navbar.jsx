import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header 
      style={{ 
        padding: '0 24px', 
        background: '#fff', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px #f0f1f2'
      }}
    >
      <h2 style={{ margin: 0, fontSize: '20px', color: '#1890ff' }}>
        🛡️ RPG Educacional
      </h2>
    </Header>
  );
}