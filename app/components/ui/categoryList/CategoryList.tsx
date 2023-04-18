import Image from "next/image";
import { useState } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { subcategoriesSelector } from "../../../store/selectors";
import { categoryID } from "../../../store/atoms";

import SubcategoryList from "./SubcategoryList";

import { ICategory } from "../../../models/models";

import data from '../../../assets/categoryIcon.json';

type CategoryListProps = {
  categories: ICategory[] | undefined,
  isVisible: boolean
}

import style from './CategoryList.module.scss';

const CategoryList = ({ isVisible,categories }: CategoryListProps) => {

  const [ idCategory, setIdCategory ] = useState<number | null>(null);

  const [_, setCategoryID] = useRecoilState(categoryID);

  const handleClick = (id: number) => {
    setIdCategory(id);
    
    setCategoryID(id)
  }  

  const { categoryIcon } = data;

  const categoriesWithIcon = categories?.map(item => {
    const find = categoryIcon.find(el => el.name.toLowerCase().trim() === item.Name.toLowerCase().trim());

    return { ...item, icon: find?.icon }
  })
    
  const findCategory = categories?.find(item => item.id === idCategory);
  
  return (
    <div className={style.category__header} style={{ display: isVisible ? "flex": "none"}}>
      <div className={style.height}>
        <ul className={style.category__list}>
          {categoriesWithIcon && categoriesWithIcon.map(({ id, Name, icon }) => 
            <li 
              key={id}
              className={`${style.category__item} ${idCategory === id ? style.active : ''}`}
              onClick={() => handleClick(id)}
            >
              {icon !== undefined ? <Image src={icon} alt={Name} width={28} height={21} /> : null}
              {Name}
            </li>
          )}
      </ul>
      </div>
      
      {idCategory && <SubcategoryList label={findCategory ? findCategory.Name : ''} />}
    </div>
  )
}

export default CategoryList;