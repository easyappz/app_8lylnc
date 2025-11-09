import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Главная',
      onClick: () => navigate('/')
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выход',
      onClick: handleLogout
    }
  ];

  return (
    <AntLayout data-easytag="id1-react/src/components/Layout.js" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
        <div style={{ color: 'white', fontSize: '20px', marginRight: '50px', fontWeight: 'bold' }}>
          Приложение
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '24px' }}>
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;
