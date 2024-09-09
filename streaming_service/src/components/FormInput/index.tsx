import { FC } from "react";
import { FormInputProps} from '../../types/index.ts'

export const FormInput: FC<FormInputProps> = ({
  id,
  label,
  type,
  register,
  error,
  validation,
}) => (
  <div className="flex flex-col mb-4">
    <label className="ml-3" htmlFor={id}>
      {label}
    </label>
    <input
      className="border rounded-lg px-2 py-2 my-1 border-[#AAAAAA]"
      type={type}
      id={id}
      {...register(id, validation)}
    />
    {error && <span className="text-[#fc6d3e]">{error.message}</span>}
  </div>
);
