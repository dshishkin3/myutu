import React, { useState } from "react";
import styles from "./Card.module.scss";
import like from "app/assets/images/like.svg";
import likeFull from "app/assets/images/likeFull.svg";
import Link from "next/link";
import { transfersApi } from "app/store/services/transfer";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";
import { adsSearchApi } from "app/store/services/adsSearch";

type ICard = {
    id?: string;
    inFavorites?: boolean;
    // isCompleted?: boolean;
    statusColor?: string;
    statusTextColor?: string;
    status: string;
    preview: string;
    price: number;
    name: string;
    adressLine: string;
    addingDate: string;
};

const Card = ({
    id,
    inFavorites,
    // isCompleted,
    statusColor,
    statusTextColor,
    status,
    preview,
    price,
    name,
    adressLine,
    addingDate,
}: ICard) => {
    return (
        <div className={styles.card}>
            <>
                <Link href={`/m/ad/${id}`}>
                    <div className={styles.card__up}>
                        <img
                            className={styles.card__preview}
                            src={preview}
                            alt="ads"
                        />
                        {inFavorites ? (
                            <img
                                className={styles.like}
                                src={likeFull.src}
                                alt="like"
                            />
                        ) : (
                            <img
                                className={styles.like}
                                src={like.src}
                                alt="like"
                            />
                        )}
                    </div>
                </Link>
                <div className={styles.card__down}>
                    <i className={styles.price}>{price} ₽</i>
                    <span className={styles.name}>{name}</span>
                    <p>{adressLine}</p>
                    <div className={styles.card__down__last}>
                        <span>{addingDate}</span>
                        <span>|</span>
                        <div
                            className={styles.card__down__last__status}
                            style={{ backgroundColor: statusColor }}
                        >
                            <span style={{ color: statusTextColor }}>
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Card;
