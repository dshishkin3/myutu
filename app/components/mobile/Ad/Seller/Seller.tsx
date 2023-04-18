import { reviewsApi } from "app/store/services/reviews";
import { transfersApi } from "app/store/services/transfer";
import { RootState } from "app/store/store";
import { cookie } from "app/utils/helpers/cookies.helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Seller.module.scss";
import star from "app/assets/images/ad_stars.svg";
import { usersApi } from "app/store/services/users";

interface SellerProps {
    userName: string;
    userImage: string;
}

const Seller: React.FC<SellerProps> = ({ userName, userImage }) => {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.authentication);

    const ad = transfersApi.useGetAdQuery({
        id: router.query.id,
        userId: token ? token : "",
    });

    const adId = transfersApi.useGetAdQuery({
        id: router.query.id,
        userId: cookie.get("t"),
    });

    // средняя оценка продавца
    const { data: grade } = reviewsApi.useGetSellerGradeQuery({
        id: ad.data?.authorInfo.userId,
    });

    // отзывы о пользователе
    const { data: reviews = [] } = reviewsApi.useGetAboutUserReviewsQuery({
        id: ad.data?.authorInfo.userId,
    });

    // кол-во отзывов
    const [countReviews, setCountReviews] = useState("");

    // средняя оценка продавца
    useEffect(() => {
        getCountReviews();
    }, [reviews]);

    // кол-во отзывов
    const getCountReviews = () => {
        switch (reviews.length) {
            case 0:
                setCountReviews("Нет отзывов");
                break;

            case 1:
                setCountReviews("1 отзыв");
                break;

            case 1:
            case 2:
            case 3:
            case 4:
                setCountReviews(`${reviews.length} отзыва`);
                break;

            default:
                setCountReviews(`${reviews.length} отзывов`);
                break;
        }
    };

    const [subscribeUser, setSubscribeUser] = useState<boolean>(false);

    const [subscribe] = usersApi.useSubscribeMutation();
    const [unsubscribe] = usersApi.useUnsubscribeMutation();

    // проверка, в подписках ли продавец
    useEffect(() => {
        if (ad && ad.currentData?.subscribed) {
            setSubscribeUser(true);
        }
    }, [ad]);

    // подписаться/отписаться
    const subscribeHandler = async () => {
        setSubscribeUser(!subscribeUser);
        if (!subscribeUser) {
            await subscribe({
                subscriptionUserId: ad.currentData.authorInfo.userId,
                userId: token,
            }).unwrap();
        } else {
            await unsubscribe({
                subscriptionUserId: ad.currentData.authorInfo.userId,
                userId: token,
            }).unwrap();
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Продавец</h1>
            <div className={styles.userCard}>
                <div className={styles.userInfo}>
                    <img
                        className={styles.userInfo__ava}
                        src={userImage}
                        alt="ava"
                    />
                    <p className={styles.description}>{userName}</p>
                </div>
                <button onClick={subscribeHandler}>
                    {ad.currentData?.subscribed ? "Отписаться" : "Подписаться"}
                </button>
            </div>
            <div className={styles.review}>
                <div className={styles.review__stars}>
                    <Image src={star} alt="star" width={20} height={20} />
                    {grade},0 <span>| {countReviews}</span>
                </div>
            </div>
        </div>
    );
};

export default Seller;
