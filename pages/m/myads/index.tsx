import React, { useEffect, useState } from "react";
import styles from "./my-ads.module.scss";
import icon_category from "app/assets/images/icon_category.svg";
import icon_ads from "app/assets/images/icon_ads.svg";
import Card from "app/components/mobile/Card/Card";
import { adsSearchApi } from "app/store/services/adsSearch";
import ModalMenu from "app/mobile/shared/ui/modalMenu";
import CitySelection from "app/mobile/features/ads/citySelection";
import AdItem from "app/mobile/shared/ui/adItem/adItem";
import Filter from "app/mobile/features/ads/filter";
import SearchMobile from "app/mobile/shared/ui/searchMobile";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";
import { useDispatch } from "react-redux";
import { RootState } from "app/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ButtonHeaderLocation } from "app/mobile/shared/ui/button-header-location";
import { toggleIsOpenModalCity } from "app/web/features/header";

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isModalFilter, setIsModalFilter] = useState<boolean>(false);
    const [isModalSearch, setIsModalSearch] = useState<boolean>(false);
    const authSliceState = useSelector(
        (state: RootState) => state.authentication
    );
    const profile = useSelector((state: RootState) => state.profile);

    const { data } = adsSearchApi.useGetNewAdsQuery({
        city: "",
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authentication
    );
    console.log(isLoggedIn, "Залогинился / не залогинился (profile)");
    // открыть попап города
    const openPopupCity = () => {
        dispatch(toggleIsOpenModalCity(true));
        document.body.style.overflow = "hidden";
    };

    return (
        <>
            <div className={styles.container}>
                <>
                    <div className={styles.header}>
                        <div className={styles.header__content}>
                            <div onClick={() => setIsModalActive(true)}>
                                <ButtonHeaderLocation
                                    text={profile.city.name || "Выберите город"}
                                    onClick={openPopupCity}
                                />
                            </div>
                        </div>
                    </div>
                </>

                <>
                    <div className={styles.search}>
                        <form>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Поиск по объявлениям"
                                    // value={}
                                    // onChange={(e) => e.target.value}
                                    onClick={() => setIsModalSearch(true)}
                                />
                            </label>
                        </form>
                        {/* <div className={styles.position}>
                        <img src={rowColumn.src} alt="rowColumn" />
                        <img
                            src={filter.src}
                            alt=""
                            onClick={() => setIsModalFilter(true)}
                        />
                    </div> */}
                    </div>
                </>

                <div className={styles.section}>
                    <div
                        className={styles.section__content}
                        onClick={() => router.push("/m/myads/category")}
                    >
                        <img src={icon_category.src} alt="" />
                        <span>Категории</span>
                    </div>
                    <div
                        className={styles.section__content}
                        onClick={() => router.push("/m/profile/myads")}
                    >
                        <img src={icon_ads.src} alt="" />
                        <span>Мои объявления</span>
                    </div>
                </div>

                <div className={styles.content}>
                    <p>Лента рекомендаций</p>
                    <div className={styles.content__position}>
                        {data &&
                            data.map((item: any, index: number) => (
                                <Card
                                    inFavorites={item.inFavorites}
                                    key={index}
                                    id={item.id}
                                    preview={
                                        checkingManyPhotos(item.preview).preview
                                    }
                                    price={item.price}
                                    name={item.name}
                                    adressLine={item.addressLine}
                                    addingDate={item.placementDate}
                                    status={
                                        item.typeAds === "PRODUCT"
                                            ? "Продажа"
                                            : "Хочу купить"
                                    }
                                    statusColor={
                                        item.typeAds === "PRODUCT"
                                            ? "#05A2D6"
                                            : "#C57AFF"
                                    }
                                    statusTextColor={"white"}
                                />
                            ))}
                    </div>
                    <div className={styles.content__button}>
                        <button
                            onClick={() =>
                                router.push(
                                    authSliceState.isLoggedIn
                                        ? "/m/ad"
                                        : "/m/auth"
                                )
                            }
                        >
                            Разместить объявление
                        </button>
                    </div>
                </div>

                <>
                    <ModalMenu
                        active={isModalActive}
                        setActive={() => setIsModalActive(false)}
                    >
                        <CitySelection
                            setActive={() => setIsModalActive(false)}
                        />
                    </ModalMenu>
                </>

                <>
                    {isModalFilter && (
                        <Filter
                            activeFilter={isModalFilter}
                            setActiveFilter={() => setIsModalFilter(false)}
                        />
                    )}
                    {isModalSearch && (
                        <SearchMobile
                            activeSearch={isModalSearch}
                            setActiveSearch={() => setIsModalSearch(false)}
                        />
                    )}
                </>
            </div>
        </>
    );
};
export default Index;
