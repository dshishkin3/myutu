import Link from "next/link";
import React from "react";
import styles from "./Description.module.scss";

interface DescriptionProps {
  description: string;
  tags: any;
}

const Description: React.FC<DescriptionProps> = ({ description, tags }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Описание</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.hashtagsContainer}>
        {tags?.map((item: any, index: number) => (
          <p key={index} className={styles.hashtag}>
            #{item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Description;
