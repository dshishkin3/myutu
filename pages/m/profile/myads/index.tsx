import React, { useState } from "react";
import styles from "./my-ads.module.scss";
import { transfersApi } from "app/store/services/transfer";
import Card from "app/components/mobile/Card/Card";
import adsBlank from "app/assets/images/adsBlank.svg";
import Header from "app/components/mobile/widgets/Header/Header";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";
import { useRouter } from "next/router";

interface IStatus {
  active: {
    text: string;
    colorText: string;
    backgroundText: string;
  };
  moderated: {
    text: string;
    colorText: string;
    backgroundText: string;
  };
  archive: {
    text: string;
    colorText: string;
    backgroundText: string;
  };
  rejected: {
    text: string;
    colorText: string;
    backgroundText: string;
  };
}

const status: IStatus = {
  moderated: {
    text: "Активно",
    colorText: "white",
    backgroundText: "#24DD7D",
  },
  active: {
    text: "В работе",
    colorText: "#555555",
    backgroundText: "#E4E7FE",
  },
  archive: {
    text: "В архиве",
    colorText: "#FFFFFF",
    backgroundText: "#555555",
  },
  rejected: {
    text: "Отклонено",
    colorText: "#FFFFFF",
    backgroundText: "#FD5839",
  },
};

const Index = () => {
  // Покупка / Продажа
  const [typeAds, setTypeAds] = useState<string>("PRODUCT");
  // Активные / На модерации / Архив / Отклонено
  const [type, setType] = useState<string>("moderated");
  const [tab, setTab] = useState<number>(1);

  const { data } = transfersApi.useGetMyAdsQuery({
    type,
    typeAds,
  });
  const router = useRouter();
  console.log(data, "MY transfersApi / MY transfersApi / MY transfersApi");

  return (
    <div className={styles.container}>
      <Header title="Мои объявления" />
      <div className={styles.content}>
        <div className={styles.hat}>
          <div
            className={`${styles.hat__buy} ${
              tab === 1 ? styles.activeBuy : null
            }`}
            onClick={() => {
              setTypeAds("PRODUCT");
              setTab(1);
            }}
          >
            <span>Покупка</span>
          </div>
          <div
            className={`${styles.hat__sale} ${
              tab === 2 ? styles.activeSale : null
            }`}
            onClick={() => {
              setTypeAds("REQUEST");
              setTab(2);
            }}
          >
            <span>Продажа</span>
          </div>
        </div>
        <div className={styles.list}>
          <span
            className={`${styles.list__status} ${
              type === "moderated" ? styles.activeStatus : null
            }`}
            onClick={() => {
              setType("moderated");
            }}
          >
            Активные
          </span>
          <span
            className={`${styles.list__status} ${
              type === "active" ? styles.activeStatus : null
            }`}
            onClick={() => {
              setType("active");
            }}
          >
            На модерации
          </span>
          <span
            className={`${styles.list__status} ${
              type === "archive" ? styles.activeStatus : null
            }`}
            onClick={() => {
              setType("archive");
            }}
          >
            Архив
          </span>
          <span
            className={`${styles.list__status} ${
              type === "rejected" ? styles.activeStatus : null
            }`}
            onClick={() => {
              setType("rejected");
            }}
          >
            Отклонено
          </span>
        </div>
        <>
          {data && data.length > 0 ? (
            <div className={styles.ads}>
              {data &&
                data.map((item: any) => (
                  <Card
                    inFavorites={item.inFavorites}
                    key={item.id}
                    id={item.id}
                    preview={checkingManyPhotos(item.preview).preview}
                    price={item.price}
                    name={item.name}
                    adressLine={item.addressLine}
                    addingDate={item.placementDate}
                    status={status[type as keyof IStatus].text}
                    statusColor={status[type as keyof IStatus].backgroundText}
                    statusTextColor={status[type as keyof IStatus].colorText}
                  />
                ))}
            </div>
          ) : (
            <div className={styles.ads__blank}>
              <img src={adsBlank.src} alt="cat" />
              <span>Здесь будет Ваш список размещенных объявлений</span>
              <span></span>
            </div>
          )}
        </>
        <div
          className={styles.ads__button}
          onClick={() => router.push("/m/ad")}
        >
          <button>Разместить объявление</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
