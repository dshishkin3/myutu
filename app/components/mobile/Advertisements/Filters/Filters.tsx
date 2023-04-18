import SelectField from 'app/components/ui/SelectField';
import React from 'react';
import styles from './Filters.module.scss';

const Filters = () => {
  const mockData = {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    onChange: (value: any) => console.log(value),
    value: '1',
    placeholder: 'Select an option',
    label: 'Select Label',
    contentEnd: <div>Content End</div>,
    name: 'select-name',
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Город</p>
      <div>
        <SelectField {...mockData} />
      </div>
      <p className={styles.title}>Стоимость, руб.</p>
      <div></div>
      <p className={styles.title}>Категория</p>
      <div></div>
      <p className={styles.title}>Подкатегория</p>
      <div></div>
      <p className={styles.title}>Хештеги</p>
      <div></div>
    </div>
  );
};

export default Filters;
