import { FC } from "react";
import Image from "next/image";

import avatar from "app/assets/images/review_avatar.png";
import star from "app/assets/images/ad_stars.svg";
import close from "app/assets/images/closeModalMenu.svg";
import { reviewsApi } from "app/store/services/reviews";
import { IAd } from "app/web/widgets/ad/model";

import { AdButton, InputField } from "app/web/shared/ui";

import styles from "./style.module.scss";

interface IModalReview {
  active: boolean;
  setActive: () => void;
  ad: IAd;
  data: string[];
  grade: number;
  countReviews: string;
}

export const ModalReview: FC<IModalReview> = ({
  active,
  setActive,
  ad,
  data,
  grade,
  countReviews,
}) => {
  return (
    <>
      <div
        className={`${active ? styles.modal__active : styles.modal}`}
        onClick={setActive}
      >
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal__content_header}>
            <p>Оставить отзыв о продавце</p>
            <Image
              onClick={setActive}
              src={close}
              alt="close"
              width={16}
              height={16}
            />
          </div>
          <div className={styles.modal__content_user}>
            <Image
              src={ad?.authorInfo.userImage}
              alt="logo"
              width={55}
              height={55}
            />
            <p>{ad?.authorInfo.userName}</p>
          </div>
          <div className={styles.modal__content_grade}>
            <Image src={star} alt="logo" width={20} height={20} />
            <p>
              {grade === 0 ? "" : grade} <span>| {countReviews}</span>
            </p>
          </div>
          {!ad?.isAuthor && (
            <AdButton
              background="linear-gradient(90deg, #2AC6FA 0%, #0C8AFF 100%)"
              color="#fff"
              maxWidth={290}
            >
              Оставить отзыв
            </AdButton>
          )}
          {data.length > 0 && (
            <p className={styles.modal__content_reviewsTitle}>
              Отзывы пользователей
            </p>
          )}
          {data.map((review: any) => (
            <div key={review.id} className={styles.modal__content_reviews}>
              <Image src={review.image} alt="logo" width={45} height={45} />
              <div className={styles.modal__content_review}>
                <p className={styles.modal__content_review_name}>
                  {review.reviewAuthorLogin}
                </p>
                <p className={styles.modal__content_review_text}>
                  {review.text}
                </p>
                <div className={styles.modal__content_review_score}>
                  <p>Общая оценка:</p>
                  <Image src={star} alt="logo" width={20} height={20} />
                  <p>{review.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
