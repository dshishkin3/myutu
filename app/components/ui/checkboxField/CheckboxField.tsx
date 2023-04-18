import { ChangeEvent, ReactNode } from 'react';
import style from './CheckboxField.module.scss';

type CheckboxFieldProps = {
  id: string;
  name: string;
  checked?: boolean;
  className?: string;
  children?: ReactNode;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField = ({ id, name, checked, children, handleChange, className = '' }: CheckboxFieldProps) => {
  return (
    <div className={style.container}>
      <input
        type="checkbox"
        name={name}
        id={id} 
        className={style.checkbox}
        defaultChecked={checked}
        onChange={handleChange}
      />
      { children }
    </div>
  )
}

export default CheckboxField