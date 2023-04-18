import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sections.module.scss';
import advertisements from '../../../../assets/images/advertisements.svg';
import categories from '../../../../assets/images/categories.svg';

const Sections = () => {
  return (
    <div className={styles.sections}>
      <Link href='/m/advertisements/categories'>
        <div className={styles.item}>
          <Image src={categories} alt='categories' />
          <p>Категории</p>
        </div>
      </Link>
      <Link href='/m/advertisements/my'>
        <div className={styles.item}>
          <Image src={advertisements} alt='advertisements' />
          <p>Мои объявления</p>
        </div>
      </Link>
    </div>
  );
};

export default Sections;
