import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, memo, FC, MouseEvent } from "react";

import fill_favorites from "app/assets/images/heart-fill.svg";
import favorite from "app/assets/images/ad_favorite.svg";

import style from "./style.module.scss";
import { favoritesApi } from "app/store/services/favorites";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

// eslint-disable-next-line react/display-name
export const Ad: FC<any> = memo(
  ({ id, preview, price, name, addressLine, placementDate, typeAds, inFavorites = false }) => {
    const router = useRouter();
    const authSliceState = useSelector((state: RootState) => state.authentication);
    const [deleteFromFav] = favoritesApi.useDeleteFromFavoritesMutation();
    const [addToFavoritesQuery] = favoritesApi.useAddToFavoritesMutation();
    const { token } = useSelector((state: RootState) => state.authentication);
    const [isFavorite, setIsFavorite] = useState<boolean>(inFavorites);

    // удалить избранное
    const favoritesHandler = async (e: MouseEvent) => {
      e.stopPropagation();
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        await deleteFromFav({
          userId: token,
          adId: id,
        }).unwrap();
        setIsFavorite(false);
      } else {
        await addToFavoritesQuery({
          userId: token,
          adId: id
        })
        setIsFavorite(true);
      }
    };

    const getTypeAds = (typeAdsString: string) => {
      switch (typeAdsString) {
        case "REQUEST": {
          return "Хочу купить";
        }
        case "PRODUCT": {
          return "Продажа";
        }
        case "SEARCH_OFFER": {
          return "Клиент";
        }
        case "SEARCH_CLIENT": {
          return "Мастер";
        }
        case "VACANSY": {
          return "Вакансия";
        }
        case "RESUME": {
          return "Резюме";
        }
        case "ARCHIVE": {
          return "В архиве";
        }
        case "ACTIVE": {
          return "В работе";
        }
        case "CANCEL": {
          return "Отменено";
        }
      }
    };
    return (
      <div className={style.ad_item} onClick={() => router.push("/ad/" + id)}>
        {authSliceState.isLoggedIn &&
          <div
            className={style.ad_item__favorites}
            onClick={(e) => favoritesHandler(e)}
          >
            {isFavorite && <Image src={fill_favorites} width={18} height={18} alt="heart" />}
            {!isFavorite && <Image src={favorite} width={18} height={18} alt="heart" />}
          </div>
        }
        <img
          src={checkingManyPhotos(preview).preview}
          alt="Фото объявления"
          className={style.ad_item__image}
          style={{ objectFit: "cover" }}
        />
        <span className={style.ad_item__price}>{price} ₽</span>
        <span className={style.ad_item__name}>{name.substr(0, 61)}...</span>
        <span className={style.ad_item__address}>{addressLine}</span>
        <div className={style.ad_item__bottom}>
          <span className={style.ad_item__date}>{placementDate}</span>
          <span
            className={`${style.ad_item__status} ${style["ad__status__" + typeAds.toLowerCase()]
              }`}
          >
            {getTypeAds(typeAds)}
          </span>
        </div>
      </div>
    );
  }
);


