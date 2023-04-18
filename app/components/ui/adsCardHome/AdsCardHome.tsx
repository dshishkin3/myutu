import Image from "next/image";
import Link from "next/link";

import { IAds } from "../../../models/models";

import { formatToPrice } from "../../../shared/format";

import style from "./AdsCardHome.module.scss";

import imageStub from "../../../assets/images/imageStub.svg";

type AdsCardHomeProps = {
  ads: IAds;
};

const AdsCardHome = ({ ads }: AdsCardHomeProps) => {
  const {
    id,
    targetId,
    addressLine,
    date,
    description,
    name,
    preview,
    price,
    targeted,
    typeAds,
  } = ads;

  const formatedPrice = formatToPrice(price);

  return (
    <Link href={`/ad/${id}`}>
      <a className={style.card}>
        <div className={style.card__img}>
          <Image
            src={preview || imageStub}
            alt={description}
            layout="fill"
            objectFit={"contain"}
            priority
            style={{ backgroundColor: "#fff" }}
          />
        </div>
        <div className={style.card__info}>
          <h5 className={style.card__label}>{name}</h5>
          <div className={style.card__address}>{addressLine}</div>
          <div className={style.card__time}>{date}</div>
          <div className={style.card__price}>{formatedPrice}</div>
        </div>
      </a>
    </Link>
  );
};

export default AdsCardHome;
