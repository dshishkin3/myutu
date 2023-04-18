import React, { useEffect, useState } from "react";
import Image from "next/image";

import { getData } from "app/services/profile.api";
import { transfersApi } from "app/store/services/transfer";

import ProfileAd from "./ProfileAd/ProfileAd";

import empty from "app/assets/images/empty_ad.svg";

import style from "./ProfileAds.module.scss";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";

const status = [
  {
    name: "Активное",
    type: "moderated",
  },
  {
    name: "На модерации",
    type: "active",
  },
  {
    name: "Архив",
    type: "archive",
  },
  {
    name: "Отклоненные",
    type: "rejected",
  },
];

export const ProfileAds = () => {
  const [typeAds, setTypeAds] = useState<string>("PRODUCT");
  const [tab, setTab] = useState<number>(0);
  const [list, setList] = useState([[], [], [], []]);
  const getMyAds: any = transfersApi.useGetMyAdsQuery({
    typeAds: typeAds,
    type: status[tab].type,
  });

  return (
    <div className={style.myads}>
      <div className={style.switch}>
        <div
          className={`${style.switch__item} ${style.switch__item_product} ${typeAds === "PRODUCT" && style["switch__item--active"]
            }`}
          onClick={() => setTypeAds("PRODUCT")}
        >
          Покупка
        </div>
        <div
          className={`${style.switch__item} ${typeAds === "REQUEST" && style["switch__item--active"]
            }`}
          onClick={() => setTypeAds("REQUEST")}
        >
          Продажа
        </div>
      </div>
      <div className={style.tabs}>
        {status.map((item, i) => (
          <div
            key={item.name}
            className={`${style.tabs__item} ${tab === i && style["tabs__item--active"]
              }`}
            onClick={() => setTab(i)}
          >
            {item.name}
            {/* счетчик кол-ва объявлений в статусах */}
            {/* <span
              className={`${style.tabs__count} ${
                tab === i && style["tabs__count--active"]
              }`}
            >
              {item.count}
            </span> */}
          </div>
        ))}
      </div>
      <div className={style.ads__list}>
        {getMyAds.data && getMyAds.data.length > 0 ? (
          getMyAds.data.map((item: any) => (
            <ProfileAd
              key={item.id}
              name={item.name}
              price={item.price}
              date={item.addingDate}
              preview={checkingManyPhotos(item.preview).preview}
              views={item.views}
              id={item.id}
              tab={tab}
              targeted={item.targetStarted}
              list={list}
              setList={setList}
              addressLine={item.addressLine}
              typeAds={typeAds}
            />
          ))
        ) : (
          <div className={style.ads__list_empty}>
            <Image src={empty} alt="empty" width={305} height={337} />
            <p>Здесь будет Ваш список размещенных объявлений</p>
          </div>
        )}
      </div>
    </div>
  );
};
