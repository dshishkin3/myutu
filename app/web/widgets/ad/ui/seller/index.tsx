import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IAd } from "../../model";
import { AdButton } from "app/web/shared/ui";
import { usersApi } from "app/store/services/users";
import { RootState } from "app/store/store";

import star from "app/assets/images/ad_stars.svg";
import sellerLocation from "app/assets/images/ad_sellerLocation.svg";

import styles from "./style.module.scss";

interface ISellerProps {
  ad: IAd;
  openModalReview: () => void;
  grade: number;
  countReviews: string;
}

export const Seller: FC<ISellerProps> = ({
  ad,
  openModalReview,
  grade,
  countReviews,
}) => {
  // состояние кнопки подписки
  const [subscribeUser, setSubscribeUser] = useState<boolean>(false);

  const { isLoggedIn, token } = useSelector(
    (state: RootState) => state.authentication
  );

  const [subscribe] = usersApi.useSubscribeMutation();
  const [unsubscribe] = usersApi.useUnsubscribeMutation();

  // проверка, в подписках ли продавец
  useEffect(() => {
    if (ad && ad.subscribed) {
      setSubscribeUser(true);
    }
  }, [ad]);

  // подписаться/отписаться
  const subscribeHandler = async () => {
    setSubscribeUser(!subscribeUser);
    if (!subscribeUser) {
      await subscribe({
        subscriptionUserId: ad.authorInfo.userId,
        userId: token,
      }).unwrap();
    } else {
      await unsubscribe({
        subscriptionUserId: ad.authorInfo.userId,
        userId: token,
      }).unwrap();
    }
  };

  return (
    <div className={styles.seller}>
      <p className={styles.seller__title}>Продавец</p>
      <div className={styles.seller__user} onClick={openModalReview}>
        <Image
          src={ad?.authorInfo.userImage}
          alt="user"
          width={40}
          height={40}
          className={styles.seller__user_image}
        />
        <p className={styles.seller__user_name}>{ad?.authorInfo.userName}</p>
      </div>
      <div className={styles.seller__rating} onClick={openModalReview}>
        <Image src={star} alt="star" width={20} height={20} />
        <p className={styles.seller__rating_text}>
          {grade === 0 ? "" : grade} <span>| {countReviews}</span>
        </p>
      </div>

      {/* <div className={styles.seller__location}>
        <Image src={sellerLocation} alt="star" width={20} height={20} />
        <p className={styles.seller__location_text}>Город: Чебоксары</p>
      </div> */}
      {isLoggedIn && !ad?.isAuthor && (
        <AdButton
          background=" linear-gradient(90deg, rgba(42, 198, 250, 0.1) 0%, rgba(12, 138, 255, 0.1) 100%)"
          color="#2AC6FA"
          onClick={subscribeHandler}
          margin="18px 0px 0px 0px"
        >
          {subscribeUser ? "Отписаться" : "Подписаться"}
        </AdButton>
      )}
    </div>
  );
};
