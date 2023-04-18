import style from './CategoryList.module.scss';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { subcategoriesSelector } from '../../../store/selectors';
import { useState } from 'react';
import Link from 'next/link';
type sub = {
  id: number, 
  Name: string, 
  Categories_id: number
};

type SubProps = {
  label: string;
}

const SubcategoryList = ({ label }: SubProps) => {
  const {state, contents} = useRecoilValueLoadable(subcategoriesSelector);
  
  if(state === 'hasValue') {
    return (
      <div className={style.height}>
        <ul className={style.category__sublist}>
          <div className={style.category__label}>{label}</div>
          {contents?.map(({ id, Name }: any) =>
            <li
              key={id}
              className={style.category__subitem}>
              <Link href={"/search?Subcategory="+id}>
                {Name}</Link></li>
          )}
        </ul>
      </div>
    )
  }
  if(state === 'loading') {
    <div style={{width: 270, background: '#fff'}}></div>
  }

  return <></>
}

export default SubcategoryList;