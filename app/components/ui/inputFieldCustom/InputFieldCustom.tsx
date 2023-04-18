import { ChangeEvent } from "react";
import style from "./InputFieldCustom.module.scss";

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
  dataAttr?: string;
};

const InputFieldCustom = ({
  id,
  type,
  name,
  value,
  defaultValue,
  placeholderText,
  handleChange,
  dataAttr,
  required,
  readonly,
  className = "",
}: InputFieldProps & any) => {
  return (
    <>
      {type !== "textarea" ? (
        <input
          id={id}
          type={type}
          name={name}
          defaultValue={defaultValue}
          value={value}
          className={`${style.input} ${style[className]}`}
          placeholder={placeholderText}
          onChange={(event) => handleChange(event)}
          required={required}
          readOnly={readonly}
        />
      ) : (
        <textarea
          name={name}
          id={id}
          value={value}
          className={`${style.input} ${style[className]}`}
          placeholder={placeholderText}
          onChange={(event) => handleChange(event)}
          required={required}
          readOnly={readonly}
        ></textarea>
      )}
    </>
  );
};

export default InputFieldCustom;
