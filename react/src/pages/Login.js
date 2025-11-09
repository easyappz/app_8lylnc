import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await login(values.email, values.password);
      setUser(data.user);
      message.success('Вход выполнен успешно!');
      navigate('/');
    } catch (error) {
      if (error.response?.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach(key => {
          const errorMessage = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
          message.error(errorMessage);
        });
      } else {
        message.error('Ошибка входа. Проверьте данные и попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Login.js" className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2} className="text-center mb-6">Вход</Title>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Почта"
            rules={[
              { required: true, message: 'Пожалуйста, введите почту!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              Войти
            </Button>
          </Form.Item>

          <div className="text-center">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
