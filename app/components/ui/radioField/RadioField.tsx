import { ChangeEvent } from 'react';

import style from './RadioField.module.scss';

type RadioFieldProps = {
  value: string;
  id: string;
  name: string;
  label?: string;
  className?: string;
  checked?: boolean;
  required?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioField = ({ id, value, name, label, checked, handleChange, required, className = '' }: RadioFieldProps) => {
  
  return (
    <div className={style.container}>
      <input 
        value={value}
        type="radio"
        name={name} 
        id={id}
        className={`${style.radio} ${style[className]}`}
        checked={checked}
        onChange={handleChange}
        required={required} />
      <label htmlFor={id} className={style.label}>{label}</label>
    </div>
  )
}

export default RadioField;