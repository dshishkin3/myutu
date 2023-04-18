import { FormEvent } from 'react';
import style from './InputFieldCustom.module.scss';

type InputFieldProps = {
  id?: string
  type: string;
  name: string;
  value?: string | number;
  placeholderText: string;
  className?: string;
  required?: boolean;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
}

const InputFieldSearch = ({ id, type, name, value, placeholderText, handleChange, required, className = '' }: InputFieldProps) => {

  return (
    <input 
      id={id}
      type={type}
      name={name}
      value={value}
      className={`${style.input} ${style[className]}`}
      placeholder={placeholderText}
      onChange={event => handleChange(event)}
      required={required}
    />
  )
}

export default InputFieldSearch;