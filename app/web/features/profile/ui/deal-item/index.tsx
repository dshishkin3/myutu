import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

import { cookie } from "app/utils/helpers/cookies.helpers";
import { formatToPrice } from "app/shared/format";

import { IDeal } from "../../model";

import style from "./style.module.scss";

export const DealItem = ({
  name,
  id,
  buyerNumber,
  sellerNumber,
  state,
  tab,
  price,
  addressLine,
  date,
  type,
  update,
  onUpdate,
  preview,
}: IDeal) => {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const canReview =
    type !== "bookedFromUserOrdersList" && state === "COMPLETED";
  const numberPhone =
    type !== "bookedFromUserOrdersList"
      ? "+" + sellerNumber
      : "+" + buyerNumber;

  const router = useRouter();

  const alertHandle = (state: boolean) => {
    if (state) {
      type !== "bookedFromUserOrderList" ? cancelOrder(id) : completeOrder(id);
    }
  };

  const cancelOrder = (id: string) => {
    fetch(
      `${process.env.api_root}/transfer/cancellOrder/{"IdUser":"${cookie.get(
        "t"
      )}","IdOrder":"${id}"}`,
      {
        method: "post",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        onUpdate(update + 1);
      });
  };
  // Обработчик сделки завершено
  const completeOrder = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.api_root}/transfer/completeOrder/{"IdUser":"${cookie.get(
          "t"
        )}","IdOrder":"${id}"}`,
        { method: "POST" }
      );
      const resData = await res.json();
      onUpdate(update + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.card} onClick={() => router.push(`/ad/${id}`)}>
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
              {tab === 0 && type === "bookedByUserOrdersList" ? (
                <span className={style.info__typeAds_buy}>Покупка</span>
              ) : (
                <span className={style.info__typeAds_archive}>В архиве</span>
              )}
            </div>
          </div>
          {/* <div className={style.info__views}>{viewsFormat(views)}</div> */}
        </div>
      </div>
      {/* кнопки и попапы. (редактировать, архив и тд)  пока не буду убирать на всякий случай*/}
      {/* <div className={style["card-buttons"]}>
      <div className={style["ad-actions"]}>
        <div
          className={style["ad-actions__edit"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
      
          <Link href={"/ad/edit/" + id}>Редактировать</Link>
        </div>
        {tab !== 3 && (
          <div
            className={style["ad-actions__more"]}
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(true);
            }}
          >
            ···
          </div>
        )}

        {isVisible && (
          <div
            className={style["ad-actions__menu"]}
            ref={ref}
            onClick={(e) => e.stopPropagation()}
          >
            <span onClick={tab === 2 ? adInActive : adInArchive}>
              {tab === 2 ? "В активное" : "В архив"}
            </span>
            <span>Удалить</span>
          </div>
        )}
      </div> */}
      {/* {isCanTarget && (
        <div
          className={s["target__action"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Запустить таргет
        </div>
      )} */}
      {/* </div> */}
    </div>
  );
};
