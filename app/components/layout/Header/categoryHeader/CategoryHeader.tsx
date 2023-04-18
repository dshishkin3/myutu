import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import useOutside from '../../../../hooks/useOutside';

import { getAllCategories } from '../../../../services/category.api';
import { ICategory } from '../../../../models/models';

import CategoryList from '../../../ui/categoryList/CategoryList';

import style from './CategoryHeader.module.scss';

import search from '../../../../assets/images/search.svg';
import close from '../../../../assets/images/close.svg';


const Category = () => {
  const [ categories, setCategories ] = useState<ICategory[] | undefined>([]);

  useEffect(() => {
    let isApiSubscribed  = true;

    const fetchCategories = async () => {
      const data = await getAllCategories()

      if (isApiSubscribed) {
        setCategories(data)
      }
    }

    fetchCategories();

    return () => {
      isApiSubscribed = false;
    }
  }, [])

  const { ref, isVisible, setIsVisible } = useOutside(false);

  const handleClick = () => setIsVisible(!isVisible);

  return (
    <div className={style.category__container} ref={ref}>
      <button 
        className={style.category}
        onClick={handleClick}>
        <Image
          src={isVisible ? close : search}
          alt={isVisible ? "close icon" : "search icon"}
          width={20}
          height={20}
        />
        <span>Все категории</span>
      </button>

      <CategoryList isVisible={isVisible} categories={categories} />
    </div>
  )
};

export default Category;