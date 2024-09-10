import cn from "classnames";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { LoginFormData, RegisterFormData, FormData } from "../../types";
import { login, registerUser } from "../../api/auth";
import { FormInput } from "../FormInput";
import { loginFields, registerFields } from "../../data/FormData";
import { Button } from "../UI/Button";
import { LoginIcon, RegisterIcon } from "../../assets/svg";

export const AuthPage: FC = () => {
  const [authState, setAuthState] = useState<"Login" | "Register">("Register");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const fields = authState === "Register" ? registerFields : loginFields;

  const handleSwitchAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAuthState((prevState) =>
      prevState === "Register" ? "Login" : "Register"
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (authState === "Register") {
      const token = await registerUser(data as RegisterFormData);
      if (token) {
        navigate("/");
      }
    } else {
      const token = await login(data as LoginFormData);
      if (token) {
        navigate("/");
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
            className={cn("bg-[#fc6d3e] text-white p-2 rounded-lg opacity-90")}
            onClick={handleSwitchAuth}
            svg={authState === "Register" ?  <LoginIcon /> : <RegisterIcon />}
          >
            <span className="mr-1">
              Switch to {authState === "Register" ? "Login" : "Register"}
            </span>
          </Button>
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
          className="bg-blue-500 text-white p-2 rounded-lg"
          svg={authState === "Register" ? <RegisterIcon /> : <LoginIcon />}
        >
          <span className="mr-1">Submit</span>
        </Button>
      </form>
    </main>
  );
};
