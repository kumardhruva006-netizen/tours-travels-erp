import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, DashboardOutlined, UserOutlined, ShoppingOutlined, CalendarOutlined, DollarOutlined, BoxOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Sider, Content, Header } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/dashboard') },
    { key: 'customers', icon: <UserOutlined />, label: 'Customers', onClick: () => navigate('/customers') },
    { key: 'packages', icon: <ShoppingOutlined />, label: 'Packages', onClick: () => navigate('/packages') },
    { key: 'bookings', icon: <CalendarOutlined />, label: 'Bookings', onClick: () => navigate('/bookings') },
    { key: 'payments', icon: <DollarOutlined />, label: 'Payments', onClick: () => navigate('/payments') },
    { key: 'inventory', icon: <BoxOutlined />, label: 'Inventory', onClick: () => navigate('/inventory') },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={250}>
        <div style={{ padding: '20px', color: 'white', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
          🌍 Tours & Travels ERP
        </div>
        <Menu theme="dark" mode="vertical" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Welcome, {user?.name}</div>
        </Header>
        <Content style={{ padding: '20px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
