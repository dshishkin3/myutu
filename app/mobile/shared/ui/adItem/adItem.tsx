import React from "react";
import styles from "./AdItem.module.scss";

interface AdItemProps {
    preview: string;
    name: string;
    address: string;
    price: number;
    date: string;
    adId: string;
    auth: number;
    favoriteActon?: boolean;
    favorite?: boolean;
    chip?: string;
    chipColor?: string;
    chipTextColor?: string;
    onPress?: () => void;
}

const AdItem: React.FC<AdItemProps> = ({
    preview,
    name,
    address,
    price,
    date,
    chip,
    chipColor = "#2ac6fa",
    chipTextColor = "#fff",
    onPress,
}) => {
    return (
        <div className={styles.wrapper} onClick={onPress}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={preview} alt="Ad" />{" "}
                <div className={styles.heartWrapper}></div>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.price}>{price} ₽</p>
                <p className={styles.title}>{name}</p>
                <p className={styles.address}>{address}</p>
                <div className={styles.cardBottom}>
                    <p className={styles.cardDate}>{date}</p>
                    <div className={styles.separator} />
                    {chip && (
                        <p
                            className={styles.cardType}
                            style={{
                                backgroundColor: chipColor,
                                color: chipTextColor,
                            }}
                        >
                            {chip}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdItem;
