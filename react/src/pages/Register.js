import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await register(
        values.email,
        values.firstName,
        values.lastName,
        values.password
      );
      setUser(data.user);
      message.success('Регистрация прошла успешно!');
      navigate('/');
    } catch (error) {
      if (error.response?.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach(key => {
          const errorMessage = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
          message.error(errorMessage);
        });
      } else {
        message.error('Ошибка регистрации. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Register.js" className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2} className="text-center mb-6">Регистрация</Title>
        <Form
          form={form}
          name="register"
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

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 8, message: 'Пароль должен содержать минимум 8 символов!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль (минимум 8 символов)"
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
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div className="text-center">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
