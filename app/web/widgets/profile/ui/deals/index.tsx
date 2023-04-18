import React, { useEffect, useState } from "react";

import { ordersApi } from "app/store/services/orders";

import { DealItem } from "app/web/features/profile";

import empty from "app/assets/images/empty_ad.svg";

import styles from "./ProfileDeals.module.scss";
import Image from "next/image";

export const ProfileDeals = () => {
  const [dealType, setDealType] = useState<string>("bookedByUserOrdersList");
  const [tab, setTab] = useState<number>(0);
  const [update, setUpdate] = useState(0);

  const [filteredDeals, setFilteredDeals] = useState([]);

  const orders = ordersApi.useGetOrdersQuery(dealType);

  useEffect(() => {
    if (orders.data) {
      setFilteredDeals(
        orders.data.filter((o: any) =>
          tab === 1 ? o.isCompleted : !o.isCompleted
        )
      );
    }
  }, [tab, orders.data]);

  return (
    <div className={styles.deals}>
      <div className={styles.switch}>
        <div
          className={`${styles.switch__item} ${styles.switch__item_product} ${
            dealType === "bookedByUserOrdersList" &&
            styles["switch__item--active"]
          }`}
          onClick={() => setDealType("bookedByUserOrdersList")}
        >
          Покупка
        </div>
        <div
          className={`${styles.switch__item} ${
            dealType === "bookedFromUserOrdersList" &&
            styles["switch__item--active"]
          }`}
          onClick={() => setDealType("bookedFromUserOrdersList")}
        >
          Продажа
        </div>
      </div>
      <div className={styles.tabs}>
        <div
          className={`${styles.tabs__item} ${
            tab === 0 && styles["tabs__item--active"]
          }`}
          onClick={() => setTab(0)}
        >
          Активные
        </div>
        <div
          className={`${styles.tabs__item} ${
            tab === 1 && styles["tabs__item--active"]
          }`}
          onClick={() => setTab(1)}
        >
          Завершенные
        </div>
      </div>
      <div className={styles.ads__list}>
        {/* нужно будет переписать это за кем то) */}
        {orders.data && filteredDeals.length > 0 ? (
          filteredDeals.map((item: any) => (
            <DealItem
              key={item.id}
              name={item.goodAd.name}
              id={item.id}
              orderDate={item.orderDate}
              orderTime={item.orderTime}
              userName={item.userName}
              userId={item.userId}
              userAvatar={item.userAvatar}
              buyerNumber={item.BuyerNumber}
              sellerNumber={item.SellerNumber}
              state={item.state}
              timesInterval={item.timesInterval}
              price={item.price}
              completed={item.completed}
              adId={item.goodAd.id}
              adName={item.goodAd.name}
              adPreview={item.goodAd.previewPath}
              type={dealType}
              update={update}
              onUpdate={(e: number) => setUpdate(e)}
              preview={item.preview}
              date={item.addingDate}
              addressLine={item.goodAd.adress}
              tab={tab}
            />
          ))
        ) : (
          <div className={styles.deals__empty}>
            <Image src={empty} alt="empty" width={305} height={337} />
            <p>Здесь будет Ваш список сделок</p>
          </div>
        )}
      </div>
    </div>
  );
};
