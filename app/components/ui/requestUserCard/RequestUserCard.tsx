import Image from 'next/image';
import { IRequestUser } from '../../../models/models';

import { formatToPrice } from '../../../shared/format';

import style from './RequestUserCard.module.scss';

import imageStub from '../../../assets/images/imageStubSmall.svg';
import Link from 'next/link';

type RequestUserCardProps = {
  requestItem: IRequestUser;
}

const RequestUserCard = ({ requestItem }: RequestUserCardProps) => {

  const { id, AddressLine, Date, Description, Name, Preview, Price, TypeAds } = requestItem;

  const formatedPrice = formatToPrice(Price);
  
  return (
    <Link href={"/ad/"+id}>
      <div className={style.card}>
        <div className={style.card__img}>
          <Image src={Preview || imageStub} alt={Description || Name} layout="fill" style={{borderRadius: 100}}/>
        </div>
        <div className={style.card__info}>
          <h5 className={style.card__label}>{Name}</h5>
          <p className={style.card__descr}>{AddressLine}</p>
          <p className={style.card__descr}>{Date}</p>
          <div className={style.card__price}>{formatedPrice}</div>
        </div>
      </div>
    </Link>
  )
};

export default RequestUserCard;