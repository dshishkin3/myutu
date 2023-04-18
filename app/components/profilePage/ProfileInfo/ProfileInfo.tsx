import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ProfileInfo.module.scss";
import { IUserInfo } from "../../../models/models";
import Image from "next/image";
import { numberFormat } from "../../../utils/helpers/formatNumber.helpers";
import { formatWord } from "../../../utils/helpers/formatWord.helpers";

import editProfile from "app/assets/images/editProfile.svg";
import userTest from "app/assets/images/user_test.png";
import profile_camera from "app/assets/images/profile_camera.svg";
import { getAboutUserReviews, getSellerGrade } from "app/services/profile.api";

interface ProfileInfoProps extends IUserInfo {
    changeTab: Dispatch<SetStateAction<any>>;
}

const ProfileInfo = ({
    login,
    avatar,
    subscribers,
    subscriptions,
    sapphire,
    // rate,
    // reviews,
    changeTab,
}: ProfileInfoProps) => {
    // средняя оценка продавца
    const [rate, setRate] = useState<number>(0);
    // отзывы о пользователе
    const [reviews, setReviews] = useState<number>(0);

    // Получение средней оценки продавца и отзывов о пользователе
    useEffect(() => {
        getSellerGrade().then((json) => {
            setRate(json);
        });

        getAboutUserReviews().then((json) => {
            setReviews(json.length);
        });
    }, []);

    return (
        <div className={styles.user}>
            <div className={styles.profile}>
                <div className={styles.info}>
                    {avatar && (
                        <div className={styles.avatar}>
                            <Image
                                src={userTest}
                                alt="avatar"
                                priority
                                style={{ borderRadius: 100 }}
                                width={55}
                                height={55}
                                className={styles.img}
                            />
                            <div className={styles.img_upload}>
                                <Image
                                    src={profile_camera}
                                    alt="profile_camera"
                                    width={20}
                                />
                            </div>
                        </div>
                    )}
                    <div className={styles.login}>{login}</div>
                </div>
                <div className={styles.editProfile}>
                    <Image src={editProfile} alt="editProfile" />
                </div>
            </div>

            <div className={styles.rates}>
                <p className={styles.rates_number}>{rate}</p>
                <div className={styles.user__reviews}>
                    {reviews}{" "}
                    {formatWord(reviews, ["отзыв", "отзыва", "отзывов"])}
                </div>
            </div>
            <div className={styles.subs} onClick={changeTab}>
                <div className={styles.subs__item}>
                    <div className={styles.subs__count}>
                        {numberFormat(subscriptions)}
                    </div>
                    <div className={styles.subs__text}>
                        {formatWord(subscriptions, [
                            "подписка",
                            "подписки",
                            "подписок",
                        ])}
                    </div>
                </div>
                <div className={styles.subs__item}>
                    <div className={styles.subs__count}>
                        {numberFormat(subscribers)}
                    </div>
                    <div className={styles.subs__text}>
                        {formatWord(subscribers, [
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

export default ProfileInfo;
