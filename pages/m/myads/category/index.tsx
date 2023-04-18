import React, { useState } from "react";
import styles from "./style.module.scss";
import Router, { useRouter } from "next/router";
import { usersApi } from "app/store/services/users";
import { cookie } from "app/utils/helpers/cookies.helpers";
import location from "app/assets/images/location.svg";
import Header from "app/components/mobile/widgets/Header/Header";
import icon_category from "app/assets/images/icon_category.svg";
import icon_ads from "app/assets/images/icon_ads.svg";
import CardCategory from "app/mobile/widgets/cardCategory";
import { infoApi } from "app/store/services/info";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

const Index = () => {
    const router = useRouter();

    const { data } = infoApi.useGetAllCategoriesQuery("", {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const { categories, filteredSubcategories, subcategoryName } = useSelector(
        (state: RootState) => state.header
    );

    console.log(categories, "categories");

    return (
        <>
            <div className={styles.container}>
                <Header title={"Все категории"} />
                <div className={styles.search}>
                    <form>
                        <label>
                            <input
                                type="text"
                                placeholder="Поиск по категориям"
                                // value={}
                                // onChange={(e) => e.target.value}
                            />
                        </label>
                    </form>
                </div>
                <div className={styles.content}>
                    <div className={styles.content__position}>
                        {categories.map((item: any) => (
                            <CardCategory
                                id={item.id}
                                key={item.id}
                                name={item.name}
                                title={item.name}
                                filePath={item.filePath}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.content__section}>
                    <div
                        className={styles.content__section__item}
                        onClick={() => router.push("/m/myads/category")}
                    >
                        <img src={icon_category.src} alt="" />
                        <span>Категории</span>
                    </div>
                    <div
                        className={styles.content__section__item}
                        onClick={() => router.push("/m/profile/myads")}
                    >
                        <img src={icon_ads.src} alt="" />
                        <span>Мои объявления</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
