/* eslint-disable @next/next/no-img-element */
import Button from "app/components/mobile/button/Button";
import React, { useEffect } from "react";
import styles from "./ProfileInfo.module.scss";
import subscriptionsIcon from "../../../../assets/images/subscriptions.svg";
import diamond from "../../../../assets/images/diamond.svg";
import changeAvatar from "../../../../assets/images/changeAvatar.svg";
import Image from "next/image";
import { declineSapphire, declineSubscription } from "./utils";
import Link from "next/link";
import { usersApi } from "app/store/services/users";
import { useRouter } from "next/router";

const ProfileInfo: React.FC = () => {
    const { data, refetch } = usersApi.useGetMyInfoQuery("");

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className={styles.container}>
            {data ? (
                <div className={styles.block}>
                    <div className={styles.leftBlock}>
                        <div className={styles.imgWrapper}>
                            <img
                                className={styles.image}
                                alt="avatar"
                                src={data.image}
                                width={55}
                                height={55}
                            />
                            <Link href={"/m/profile/changeAvatar"}>
                                <div className={styles.changeAvatarIconWrapper}>
                                    <Image alt="" src={changeAvatar} />
                                </div>
                            </Link>
                        </div>
                        <p>{data.login}</p>
                    </div>
                    <div className={styles.rightBlock}>
                        <div className={styles.tile}>
                            <Image
                                src={subscriptionsIcon}
                                alt="Header logo picture"
                            />
                            <div>
                                <p className={styles.counter}>
                                    {data.subscriptions}
                                </p>
                                <p className={styles.title}>
                                    {/* {declineSubscription(subscriptions)} */}
                                    подписок
                                </p>
                            </div>
                        </div>
                        <div className={styles.tile}>
                            <Image src={diamond} alt="Header logo picture" />
                            <div>
                                <p className={styles.counter}>
                                    {data.saphires}
                                </p>
                                <p className={styles.title}>
                                    {/* {declineSapphire(sapphires)} */}
                                    сапфиров
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <Link href={"/m/profile/edit"}>
                <div>
                    <Button text="Редактировать профиль" />
                </div>
            </Link>
        </div>
    );
};

export default ProfileInfo;
