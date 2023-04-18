import { ChangeEvent, ReactNode } from 'react';

import style from './RadioField.module.scss';

type RadioFieldInLabelProps = {
  type?: string;
  name: string;
  className?: string;
  children: ReactNode;
  checked?: boolean;
  value: string | number;
  required?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioFieldInLabel = ({ type = 'radio', name, children, checked, value, handleChange, required, className = '' }: RadioFieldInLabelProps) => {
    return (
      <div className={`${style.full} ${style[className]}`}>
        <label className={style.label__btn}>
          <input 
            value={value}
            type={type}
            name={name}
            className={style.radio__btn} 
            defaultChecked={checked}
            onChange={handleChange}
            required={required}
          />
          { children }
        </label>
      </div>
    )
}

export default RadioFieldInLabel;