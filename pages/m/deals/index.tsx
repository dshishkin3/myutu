import React, { useState, useEffect } from "react";
import styles from "./my-deals.module.scss";
import Header from "app/components/mobile/widgets/Header/Header";
import Card from "app/components/mobile/Card/Card";
import { ordersApi } from "app/store/services/orders";
import { RootState } from "app/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Index = () => {
    const [type, setType] = useState<any>(false);
    // Состояние в шапке (покупка / продажа)
    const [tab, setTab] = useState<string>("bookedByUserOrdersList");
    const deals = ordersApi.useGetOrdersQuery(tab);
    console.log(deals, "DEALS");

    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authentication
    );
    console.log(isLoggedIn, "Залогинился / не залогинился (profile)");
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Header title={"Мои сделки"} />
            <div className={styles.content}>
                <div className={styles.hat}>
                    <div
                        className={`${styles.hat__buy} ${
                            tab === "bookedByUserOrdersList"
                                ? styles.activeBuy
                                : null
                        }`}
                        onClick={() => {
                            setTab("bookedByUserOrdersList");
                        }}
                    >
                        <span>Покупка</span>
                    </div>
                    <div
                        className={`${styles.hat__sale} ${
                            tab === "bookedFromUserOrdersList"
                                ? styles.activeSale
                                : null
                        }`}
                        onClick={() => {
                            setTab("bookedFromUserOrdersList");
                        }}
                    >
                        <span>Продажа</span>
                    </div>
                </div>
                <div className={styles.list}>
                    <span
                        className={`${styles.list__status} ${
                            !type ? styles.activeStatus : null
                        }`}
                        onClick={() => {
                            setType(false);
                        }}
                    >
                        Активные
                    </span>
                    <span
                        className={`${styles.list__status} ${
                            type ? styles.activeStatus : null
                        }`}
                        onClick={() => {
                            setType(true);
                        }}
                    >
                        Завершенные
                    </span>
                </div>
                <div className={styles.positionCard}>
                    {deals.data &&
                        deals.data
                            .filter((item: any) => item.isCompleted === type)
                            .map((item: any, index: number) => (
                                <Card
                                    inFavorites={item.inFavorites}
                                    key={item.goodAd.id}
                                    id={item.goodAd.id}
                                    preview={item.goodAd.previewPath}
                                    price={item.price}
                                    name={item.goodAd.name}
                                    adressLine={item.goodAd.adress}
                                    addingDate={item.addingDate}
                                    status={
                                        item.isCompleted
                                            ? "В архиве"
                                            : "Покупка"
                                    }
                                    statusColor={
                                        item.isCompleted ? "#555555" : "#24DD7D"
                                    }
                                    statusTextColor={"white"}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};
export default Index;
