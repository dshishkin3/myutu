import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import { loggedUserID } from "app/store/atoms";
import useOutside from "app/hooks/useOutside";
import { IProfileAd } from "app/models/models";
import { formatToPrice } from "app/shared/format";
import heart from "app/assets/images/desktop_heart.svg";
import style from "./ProfileAd.module.scss";

const ProfileAd = ({
  name,
  price,
  id,
  date,
  views,
  preview,
  tab,
  targeted,
  list,
  setList,
  addressLine,
  typeAds,
}: IProfileAd & any) => {
  const IdUser = useRecoilValue(loggedUserID); // получаю id пользователя

  const router = useRouter();

  return (
    <div className={style.card} onClick={() => router.push(`/ad/${id}`)}>
      {router.query.type === "favorites" && (
        <div className={style.card__favorites}>
          <Image src={heart} width={18} height={18} alt="heart" />
        </div>
      )}
      <div className={style.img}>
        <Image
          src={
            preview ||
            "https://upload.myutu.ru/previews/mS8pfQJarwmwncFklzFICPmkn.jpg"
          }
          alt={name}
          layout="fill"
          priority
          objectFit={"contain"}
        />
        {/* {targeted && <div className={s.target__status}>Таргет запущен</div>} */}
      </div>
      <div className={style.info}>
        <div className={style.info__price}>{formatToPrice(price)}</div>
        <div className={style.info__name}>{name}</div>
        <div className={style.info__additionally}>
          <div className={style.info__address}>{addressLine}</div>
          <div className={style.info__footer}>
            <div className={style.info__date}>{date}</div>
            <div className={style.info__typeAds}>
              {/* Кнопка типа объявления */}
              {tab === 0 && typeAds === "PRODUCT" ? (
                <span className={style.info__typeAds_buy}>Покупка</span>
              ) : tab === 0 && typeAds === "REQUEST" ? (
                <span className={style.info__typeAds_sale}>Продажа</span>
              ) : tab === 1 ? (
                <span className={style.info__typeAds_process}>В обработке</span>
              ) : tab === 2 ? (
                <span className={style.info__typeAds_archive}>В архиве</span>
              ) : (
                <span className={style.info__typeAds_rejected}>Отклонено</span>
              )}
            </div>
          </div>
          {/* <div className={style.info__views}>{viewsFormat(views)}</div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileAd;
