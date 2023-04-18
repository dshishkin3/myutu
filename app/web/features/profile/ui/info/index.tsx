import React, { ChangeEvent, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { cookie } from "app/utils/helpers/cookies.helpers";
import { numberFormat } from "../../../../../utils/helpers/formatNumber.helpers";
import { formatWord } from "../../../../../utils/helpers/formatWord.helpers";

import { usersApi } from "app/store/services/users";
import { reviewsApi } from "app/store/services/reviews";
import { filesApi } from "app/store/services/files";
import { setProfile } from "app/store/slices/profileSlice";
import ProfileRate from "app/web/shared/ui/profile-rate";

import editProfile from "app/assets/images/editProfile.svg";
import profile_camera from "app/assets/images/profile_camera.svg";
import avatar_undefined from "app/assets/images/avatar_undefined.svg";

import styles from "./ProfileInfo.module.scss";

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const myInfo: any = usersApi.useGetMyInfoQuery("", { refetchOnFocus: true });
  const userPoints = usersApi.useGetUserPointsQuery("");
  const userReviews = reviewsApi.useGetUserReviewsQuery("");
  const [sellerGradeQuery] = reviewsApi.useLazyGetSellerGradeQuery();
  const [aboutUserReviews] = reviewsApi.useLazyGetAboutUserReviewsQuery();
  const [uploadPhotoQuery] = filesApi.useUploadPhotoMutation();
  const [updateUserQuery] = usersApi.useUpdateUserMutation();

  // средняя оценка продавца
  const [rate, setRate] = useState<number>(0);
  // отзывы о пользователе
  const [reviews, setReviews] = useState<number>(0);

  const router = useRouter();

  // Получение средней оценки продавца и отзывов о пользователе
  useLayoutEffect(() => {
    try {
      sellerGradeQuery("")
        .unwrap()
        .then((payload) => {
          setRate(payload);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      aboutUserReviews("")
        .unwrap()
        .then((payload) => {
          setReviews(payload.length);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    if (myInfo.data) dispatch(setProfile(myInfo.data));
  }, [myInfo]);

  // смена аватара
  const changeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0];
    const fD = new FormData();
    fD.append("file", file);
    fD.append("folder", "users_avatar");
    const payload = await uploadPhotoQuery(fD).unwrap();

    if (payload.state === "0000") {
      const data = await updateUserQuery({
        userId: cookie.get("t"),
        image: payload.link,
      }).unwrap();

      switch (data.state) {
        case "0000":
          router.reload();
          break;

        default:
          break;
      }
    }
  };

  if (!myInfo.data) return <></>;

  return (
    <div className={styles.user}>
      <div className={styles.profile}>
        <div className={styles.info}>
          {myInfo.data.image && (
            <label className={styles.avatar}>
              <Image
                src={myInfo.data.image ? myInfo.data.image : avatar_undefined}
                alt="avatar"
                priority
                style={{ borderRadius: 100 }}
                width={55}
                height={55}
                className={styles.img}
              />
              <div className={styles.img_upload}>
                <Image src={profile_camera} alt="profile_camera" width={20} />
                <input
                  type="file"
                  className={styles.uploadInput}
                  onChange={changeAvatar}
                />
              </div>
            </label>
          )}
          <div className={styles.login}>{myInfo.data.login}</div>
        </div>
        <div
          onClick={() => router.push("/profile/edit")}
          className={styles.editProfile}
        >
          <Image src={editProfile} alt="editProfile" />
        </div>
      </div>

      <div className={styles.rates}>
        <p className={styles.rates_number}>{rate !== 0 && rate}</p>
        <ProfileRate rate={rate} />
        <div className={styles.user__reviews}>
          {reviews} {formatWord(reviews, ["отзыв", "отзыва", "отзывов"])}
        </div>
      </div>
      <div className={styles.subs}>
        <div className={styles.subs__item}>
          <div className={styles.subs__count}>
            {numberFormat(myInfo.data.subscriptions)}
          </div>
          <div className={styles.subs__text}>
            {formatWord(myInfo.data.subscriptions, [
              "подписка",
              "подписки",
              "подписок",
            ])}
          </div>
        </div>
        <div className={styles.subs__item}>
          <div className={styles.subs__count}>
            {numberFormat(myInfo.data.subscribers)}
          </div>
          <div className={styles.subs__text}>
            {formatWord(myInfo.data.subscribers, [
              "подписчик",
              "подписчика",
              "подписчиков",
            ])}
          </div>
        </div>
      </div>
    </div>
  );
};
