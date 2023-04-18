import React from 'react';
import styles from './AdList.module.scss';
import AdItem from './AdItem/AdItem';
import { AdItemProps } from '../types';

type AdListProps = {
  ads: AdItemProps[];
};

const AdList: React.FC<AdListProps> = ({ ads }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {ads.map((ad, index) => (
          <div className={styles.gridItem} key={index}>
            <AdItem {...ad} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdList;
