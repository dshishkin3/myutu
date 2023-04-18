import Image from "next/image";

import { ICategory } from "../../../models/models";

import style from './CategoryCard.module.scss';
import Link from 'next/link';

type CategoryCardProps = {
  category: ICategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {

  const { id, Name, icon } = category;

  return (
    <Link href={`/search?catname=${Name}&catid=${id}`}>
    <div className={style.card}>
      {icon !== undefined ? 
        <div className={style.card__img}>
          <Image src={icon} alt={Name} width={50} height={50} /> 
        </div>
        : 
        null
      }
      <div className={style.card__logo}>{Name}</div>
    </div>
    </Link>
  )
}

export default CategoryCard;