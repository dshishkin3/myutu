import { ChangeEvent, FC } from "react";

import styles from "./style.module.scss";

type InputFieldProps = {
  id?: string;
  type: string;
  name: string;
  value?: string | number;
  defaultValue?: string;
  placeholderText: string;
  className?: string;
  required?: boolean;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly?: boolean;
  style?: React.CSSProperties;
  maxLength?: number;
  disable?: boolean;
};

export const InputField: FC<InputFieldProps> = ({
  id,
  type,
  name,
  value,
  defaultValue,
  placeholderText,
  handleChange,
  required,
  readonly,
  className = "",
  style,
  maxLength,
  disable,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      defaultValue={defaultValue}
      value={value}
      className={`${styles.input} ${styles[className]}`}
      placeholder={placeholderText}
      onChange={(event) => handleChange(event)}
      required={required}
      readOnly={readonly}
      style={style}
      maxLength={maxLength}
      disabled={disable}
    />
  );
};
