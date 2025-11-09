import instance from './axios';

export const register = async (email, firstName, lastName, password) => {
  const response = await instance.post('/api/register/', {
    email,
    first_name: firstName,
    last_name: lastName,
    password,
    password_confirm: password
  });
  
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
  }
  
  return response.data;
};

export const login = async (email, password) => {
  const response = await instance.post('/api/login/', {
    email,
    password
  });
  
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
  }
  
  return response.data;
};

export const logout = async () => {
  try {
    await instance.post('/api/logout/');
  } finally {
    localStorage.removeItem('token');
  }
};

export const getProfile = async () => {
  const response = await instance.get('/api/profile/');
  return response.data;
};

export const updateProfile = async (email, firstName, lastName) => {
  const response = await instance.patch('/api/profile/', {
    first_name: firstName,
    last_name: lastName
  });
  return response.data;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
