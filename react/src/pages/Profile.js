import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import { getProfile, updateProfile } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        form.setFieldsValue({
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name
        });
        setUser(data);
      } catch (error) {
        message.error('Ошибка загрузки профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form, setUser]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const data = await updateProfile(
        values.email,
        values.firstName,
        values.lastName
      );
      setUser(data);
      message.success('Профиль успешно обновлен!');
    } catch (error) {
      if (error.response?.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach(key => {
          const errorMessage = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
          message.error(errorMessage);
        });
      } else {
        message.error('Ошибка обновления профиля. Попробуйте снова.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div data-easytag="id1-react/src/pages/Profile.js" className="flex items-center justify-center" style={{ minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div data-easytag="id2-react/src/pages/Profile.js" className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <Title level={2} className="text-center mb-6">Профиль</Title>
          <Form
            form={form}
            name="profile"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Почта"
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
                disabled
              />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="Имя"
              rules={[
                { required: true, message: 'Пожалуйста, введите имя!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Имя"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Фамилия"
              rules={[
                { required: true, message: 'Пожалуйста, введите фамилию!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Фамилия"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={saving}
                size="large"
                block
              >
                Сохранить изменения
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
