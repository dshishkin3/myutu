import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./MainInfoBlock.module.scss";
import Button from "../../button/Button";
import { useRouter } from "next/router";
import likeHeart from "app/assets/images/likeHeart.svg";
import likeHeartFull from "app/assets/images/likeHeartFull.svg";
import arrow from "app/assets/images/arrow.svg";
import share from "app/assets/images/share.svg";
import editAds from "app/assets/images/editAds.svg";
import suitcaseAds from "app/assets/images/suitcaseAds.svg";
import closeAds from "app/assets/images/closeAds.svg";
import { transfersApi } from "app/store/services/transfer";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { usersApi } from "app/store/services/users";
import ModalMenu from "app/mobile/shared/ui/modalMenu";
import DealsCard from "app/mobile/features/ads/dealsCard";
import { favoritesApi } from "app/store/services/favorites";
import { cookie } from "app/utils/helpers/cookies.helpers";
import favorite from "app/assets/images/ad_favorite.svg";
import favorite_fill from "app/assets/images/ad_favorite-fill.svg";
//

interface MainInfoBlockProps {
    imageSource: string;
    units: string;
    name: string;
    price: string;
    views: string;
    deliveryType?: string;
}

const MainInfoBlock: React.FC<MainInfoBlockProps> = ({
    imageSource,
    price,
    views,
    units,
    name,
    deliveryType,
}) => {
    const router = useRouter();

    const adId = transfersApi.useGetAdQuery({
        id: router.query.id,
        userId: cookie.get("t"),
    });

    console.log(adId, "ВСЯ ИНФОРМАЦИЯ ПРО ОБЪЯВЛЕНИЕ");
    // console.log(data, "Информация о профиле");
    // console.log(isLoggedIn, "Залогинился / не залогинился");
    // console.log(router.query.id, "ID объявления");

    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authentication
    );

    const params = router.query;

    // состояние кнопки избранное
    const [addToFavorites, setAddToFavorites] = useState<boolean>(false);
    const [addToFav] = favoritesApi.useAddToFavoritesMutation();
    const [deleteFromFav] = favoritesApi.useDeleteFromFavoritesMutation();
    // кол-во отзывов
    const [countReviews, setCountReviews] = useState("");

    //Открывает вкладку сделки
    const [isModalDeals, setIsModalDeals] = useState<boolean>(false);

    const data = usersApi.useGetMyInfoQuery("");

    const { token } = useSelector((state: RootState) => state.authentication);

    const ad = transfersApi.useGetAdQuery({
        id: router.query.id,
        userId: token ? token : "",
    });

    // проверка, в избранных ли объявление
    useEffect(() => {
        if (ad.data && ad.data.inFavorites) {
            setAddToFavorites(true);
        }
    }, [ad]);

    // избранное
    const favoritesHandler = async () => {
        setAddToFavorites(!addToFavorites);
        if (!addToFavorites) {
            await addToFav({
                userId: cookie.get("t"),
                adId: params.id,
            }).unwrap();
        } else {
            await deleteFromFav({
                userId: cookie.get("t"),
                adId: params.id,
            }).unwrap();
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img
                    src={arrow.src}
                    alt="arrow"
                    onClick={() => router.back()}
                />
                <div className={style.header__right}>
                    {adId.data?.isAuthor && (
                        <img src={editAds.src} alt="editAds" />
                    )}
                    {/* {adId.data?.isAuthor && (
                        <img
                            src={suitcaseAds.src}
                            alt="suitcase"
                            onClick={() => setIsModalDeals(true)}
                        />
                    )} */}
                    <img src={share.src} alt="share" />
                    {!adId.data?.isAuthor ? (
                        <>
                            {isLoggedIn && (
                                <Image
                                    onClick={favoritesHandler}
                                    src={
                                        addToFavorites
                                            ? favorite_fill
                                            : favorite
                                    }
                                    width={24}
                                    height={24}
                                    alt="favorite"
                                />
                            )}
                        </>
                    ) : (
                        <img src={closeAds.src} alt="close" />
                    )}
                </div>
            </div>
            <div className={style.backgroundImg}>
                <img className={style.image} src={imageSource} width="100%" />
            </div>
            <div className={style.breadcrumbs}>
                <>
                    <p>{adId.currentData?.categoryData.categoryName}</p>
                    <span>·</span>
                    <p>{adId.currentData?.categoryData.subcategoryName}</p>
                </>
            </div>
            <div className={style.infoBlock}>
                <p className={style.name}>{name}</p>
                <p className={style.price}>
                    {price} ₽ <span className={style.units}>/ {units}</span>
                </p>
                <div className={style.termsOfDelivery}>
                    <div className={style.title}>
                        <p>Условия доставки:</p>
                        <span className={style.terms}>
                            {(deliveryType === "FEE" && "Платно") ||
                                ("FREE" && "Бесплатно") ||
                                ("NONE" && "Нет")}
                        </span>
                    </div>
                    {deliveryType === "FEE" && (
                        <span className={style.terms}>
                            Стоимость доставки: {adId.data?.costDelivery} ₽
                        </span>
                    )}
                </div>
                <p className={style.views}>Просмотрено {views} раз</p>
            </div>
            {!isLoggedIn && (
                <Button
                    className="filled"
                    text="Авторизируйтесь для покупки"
                    handleClick={() => router.push("/m/auth")}
                />
            )}
            {isModalDeals && (
                <ModalMenu
                    active={adId.data?.isAuthor}
                    setActive={() => setIsModalDeals(false)}
                >
                    <DealsCard setActive={() => setIsModalDeals(false)} />
                </ModalMenu>
            )}
        </div>
    );
};

export default MainInfoBlock;
