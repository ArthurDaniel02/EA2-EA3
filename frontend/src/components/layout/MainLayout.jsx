import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

const { Content, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); 


  const items = [
    { key: '/', icon: <HomeOutlined />, label: 'Home' },
    { key: '/professores', icon: <UserOutlined />, label: 'Professores' },
    { key: '/turmas', icon: <TeamOutlined />, label: 'Turmas' },
    { key: '/quests', icon: <TrophyOutlined />, label: 'Quests' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Sider collapsible breakpoint="lg" width={220}>

        <div style={{ height: 60, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '24px' }}>🛡️</span>
        </div>
        
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['/']} 
          selectedKeys={[location.pathname]}
          items={items} 
          onClick={(e) => navigate(e.key)} 
        />
      </Sider>

      <Layout>
        <Navbar />

        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px' }}>
            <Outlet />
          </div>
        </Content>

        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;