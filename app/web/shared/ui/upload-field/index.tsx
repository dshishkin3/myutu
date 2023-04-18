import Image from "next/image";
import React, { ChangeEvent, FC, ReactNode } from "react";

import styles from "./style.module.scss";

type FeedbackUploadFieldProps = {
  value: string;
  name: string;
  id: string;
  className?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  required?: boolean;
};

export const FeedbackUploadField: FC<FeedbackUploadFieldProps> = ({
  value,
  name,
  id,
  handleChange,
  children,
  required,
}) => {
  return (
    <>
      <label className={styles.file}>
        <input
          type="file"
          name={name}
          id={id}
          className={styles.input}
          onChange={handleChange}
          required={required}
        />

        <span className={styles.span}>
          <>{children}</>
        </span>
        {value && (
          <span className={styles.span_preview}>
            <>
              {name === "Video" ? (
                <video src={value} controls className={styles.file__video}>
                  Your browser doesnt support HTML5 video tag.
                </video>
              ) : (
                <Image
                  src={value}
                  alt="load image"
                  layout="fill"
                  className={styles.file__img}
                />
              )}
            </>
          </span>
        )}
      </label>
    </>
  );
};
