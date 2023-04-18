import Image from "next/image";
import { ChangeEvent, ReactNode } from "react";

import style from './FileField.module.scss';

type FileFieldProps = {
  value: string;
  name: string;
  id: string;
  className?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  required?: boolean;
}

const FileField = ({ value, name, id, handleChange, children, required }: FileFieldProps) => {
  
  return (
    <>
      <label className={style.file}>
        <input type="file" name={name} id={id} className={style.input} onChange={handleChange} required={required} />

        <span className={style.span}>
          {value ?
            <>
              {name === 'Video' ? 
                <video src={value} controls className={style.file__video}>
                  Your browser doesnt support HTML5 video tag.
                </video>
                :
                <Image src={value} alt="load image" layout="fill" className={style.file__img} />
              }
            </>
            : 
            <>
              { children }
            </>
          }
        </span>
      </label>
    </>
  )
}

export default FileField;