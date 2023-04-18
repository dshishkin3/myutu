import { FC, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { RootState } from "app/store/store";
import { formatterPrice, IAd } from "../../model";
import { AdButton } from "app/web/shared/ui";

import ad_deliveryinfo from "app/assets/images/ad_deliveryinfo.svg";
import hide_tel from "app/assets/images/hide-tel.svg";

import styles from "./style.module.scss";
import { setSnackbar } from "app/store/slices/snackbar.slice";

interface IInfoProps {
  ad: IAd;
  openModalDeal: () => void;
}

export const Buy: FC<IInfoProps> = ({ ad, openModalDeal }) => {
  // показать/закрыть номер
  const [openTel, setOpenTel] = useState(false);

  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );

  const dispatch = useDispatch();

  // копировать номер
  const onShareHandler = () => {
    navigator.clipboard.writeText(ad?.authorInfo.userPhone);
    dispatch(
      setSnackbar({ show: true, label: "Номер скопирован!", type: true })
    );
  };

  return (
    <div className={styles.buy}>
      <div className={styles.buy__price}>
        <p>{formatterPrice.format(ad?.price).split(",")[0]} ₽</p>{" "}
        <span>/ шт</span>
      </div>
      <div className={styles.buy__views}>
        {ad?.views !== 0 ? (
          <p>Просмотрено {ad?.views} раз</p>
        ) : (
          <p>Просмотров нет</p>
        )}
      </div>
      <div className={styles.buy__delivery}>
        <p>
          Условия доставки:{" "}
          <span>{ad?.costDelivery === 0 ? "Бесплатно" : "Платно"}</span>
        </p>
        {ad?.costDelivery !== 0 && (
          <div className={styles.buy__delivery_info}>
            <p className={styles.buy__delivery_infoPrice}>
              Стоимость доставки: <span>{ad?.costDelivery} ₽</span>
            </p>
            <div className={styles.buy__delivery_infoImg}>
              <Image src={ad_deliveryinfo} width={20} height={20} alt="info" />
              <p>Доставка осуществляется продавцом</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.buy__buttons}>
        {!ad?.isAuthor &&
          (!openTel ? (
            <AdButton
              background="linear-gradient(90deg, #2AC6FA 0%, #0C8AFF 100%)"
              color="#fff"
              margin="0px 0px 12px 0px"
              onClick={() => setOpenTel(true)}
            >
              Позвонить
            </AdButton>
          ) : (
            <AdButton
              border="1.5px solid #2AC6FA"
              background="none"
              color="black"
              margin="0px 0px 12px 0px"
              onClick={onShareHandler}
              fontWeight={600}
            >
              <div className={styles.buy__buttons_hidePhone}>
                <Image src={hide_tel} width={24} height={24} alt="hide-icon" />
                {ad?.authorInfo.userPhone}
              </div>
            </AdButton>
          ))}

        {isLoggedIn && !ad?.isAuthor && (
          <AdButton
            background="none"
            color="#2AC6FA"
            border="1px solid #2AC6FA"
            // onClick={openModalDeal}
          >
            Совершить сделку
          </AdButton>
        )}

        {!isLoggedIn && (
          <Link href="/auth">
            <AdButton
              background=" linear-gradient(90deg, rgba(42, 198, 250, 0.1) 0%, rgba(12, 138, 255, 0.1) 100%)"
              color="#2AC6FA"
            >
              Авторизируйтесь для покупки
            </AdButton>
          </Link>
        )}
      </div>
    </div>
  );
};
