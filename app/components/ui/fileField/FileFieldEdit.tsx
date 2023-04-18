import Image from "next/image";
import { ChangeEvent, ReactNode } from "react";

import style from './FileField.module.scss';

type FileFieldEditProps = {
  value: string;
  name: string;
  id: string;
  className?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const FileFieldEdit = ({ value, name, id, handleChange, children }: FileFieldEditProps) => {
  
  const accept = name === 'Video' ? '.mp4, .mov' : '.png, .jpg, .jpeg';

  return (
    <>
      <label className={style.file}>
        <input type="file" name={name} id={id} className={style.input} onChange={handleChange} accept={accept} />

        <span className={style.span}>
          {name === 'Video' ? 
            <video src={value} className={style.file__video}>
              Your browser doesnt support HTML5 video tag.
            </video>
            :
            <Image src={value} alt="edit image" layout="fill" priority className={style.file__img} />
          }
          <div className={style.span__bg}>
            { children }
          </div>
        </span>
      </label>
    </>
  )
}

export default FileFieldEdit;