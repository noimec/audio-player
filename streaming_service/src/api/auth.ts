import axios from 'axios';

import { setCookie } from '../utils';
import { LoginFormData, RegisterFormData } from '../types/components';

export const registerUser = async ({
  firstName,
  lastName,
  password,
  username,
}: RegisterFormData): Promise<string | undefined> => {
  try {
    const registerResponse = await axios.post(
      'http://localhost:3000/api/auth/register',
      {
        username,
        password,
        firstName,
        lastName,
      },
    );
    const { access_token } = registerResponse.data;

    setCookie('__session', access_token, 7);

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      alert('User is already exist');
    } else {
      console.error('Error during registration:', error);
    }
  }
};

export const login = async ({
  password,
  username,
}: LoginFormData): Promise<string | undefined> => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username,
      password,
    });
    const { access_token } = response.data;

    setCookie('__session', access_token, 7);

    return access_token;
  } catch (error) {
    console.error('Error during login:', error);
  }
};
