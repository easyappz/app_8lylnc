import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import { getProfile } from '../api/auth';

const { Title, Text } = Typography;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        message.error('Ошибка загрузки профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div data-easytag="id1-react/src/pages/Home.js" className="flex items-center justify-center" style={{ minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div data-easytag="id2-react/src/pages/Home.js" className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <div className="text-center">
            <UserOutlined style={{ fontSize: '64px', color: '#1890ff', marginBottom: '24px' }} />
            <Title level={2}>Добро пожаловать!</Title>
            {user && (
              <div className="mt-4">
                <Text className="text-xl">
                  {user.first_name} {user.last_name}
                </Text>
                <br />
                <Text type="secondary" className="text-base">
                  {user.email}
                </Text>
              </div>
            )}
            <div className="mt-8">
              <Text className="text-gray-600">
                Это главная страница вашего приложения
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
