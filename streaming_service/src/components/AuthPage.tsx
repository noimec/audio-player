import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { login, registerUser } from '../api/auth';
import { FormInput } from './FormInput';
import { loginFields, registerFields } from '../data/FormData';
import { Button } from './ui/button';
import type {
  FormData,
  LoginFormData,
  RegisterFormData,
} from '../types/components';
import { LoginIcon } from './icons/login';
import { RegisterIcon } from './icons/register';

export const AuthPage: FC = () => {
  const [authState, setAuthState] = useState<'Login' | 'Register'>('Register');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const fields = authState === 'Register' ? registerFields : loginFields;

  const handleSwitchAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAuthState((prevState) =>
      prevState === 'Register' ? 'Login' : 'Register',
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (authState === 'Register') {
      const token = await registerUser(data as RegisterFormData);
      if (token) {
        navigate('/');
      }
    } else {
      const token = await login(data as LoginFormData);
      if (token) {
        navigate('/');
      }
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[320px] border p-8 rounded-lg border-[#AAAAAA]"
      >
        <h1 className="m-0 mb-4 text-center">{authState}</h1>
        <div className="flex justify-center mb-6">
          <Button
            variant="close"
            onClick={handleSwitchAuth}
            svg={authState === 'Register' ? <LoginIcon /> : <RegisterIcon />}
            text={`Switch to ${
              authState === 'Register' ? 'Login' : 'Register'
            }`}
          />
        </div>

        {fields.map(({ id, label, type, validation }) => (
          <FormInput
            key={id}
            id={id as keyof FormData}
            label={label}
            type={type}
            register={register}
            error={errors[id as keyof FormData]}
            validation={validation}
          />
        ))}

        <Button
          type="submit"
          variant="submit"
          svg={authState === 'Register' ? <RegisterIcon /> : <LoginIcon />}
          text="Submit"
        />
      </form>
    </main>
  );
};
