import React, { useState } from "react";
import styles from "./favorites.module.scss";
import cat from "app/assets/images/cat.svg";
import Card from "app/components/mobile/Card/Card";
import Header from "app/components/mobile/widgets/Header/Header";
import { favoritesApi } from "app/store/services/favorites";
import { useRouter } from "next/router";
import { transfersApi } from "app/store/services/transfer";

const Index = () => {
    const { data } = favoritesApi.useGetFavoritesQuery("", {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    console.log(data, "favorites favorites");

    return (
        <div className={styles.container}>
            <Header title="Избранное" />
            <>
                {data && data.length > 0 ? (
                    <div className={styles.contentFav}>
                        <div className={styles.containerFav}>
                            {data &&
                                data.map((item: any) => (
                                    <Card
                                        inFavorites
                                        key={item.adId}
                                        id={item.adId}
                                        preview={item.preview}
                                        price={item.price}
                                        name={item.name}
                                        adressLine={item.adressLine}
                                        addingDate={item.addingDate}
                                        status={
                                            item.type === "PRODUCT"
                                                ? "Покупка"
                                                : "Продажа"
                                        }
                                        statusColor={
                                            item.type === "PRODUCT"
                                                ? "#24DD7D"
                                                : "#05A2D6"
                                        }
                                        statusTextColor={"white"}
                                    />
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <img src={cat.src} alt="cat" />
                        <span>
                            Здесь будет Ваш список добавленного в избранное
                        </span>
                        <span></span>
                    </div>
                )}
            </>
        </div>
    );
};

export default Index;
