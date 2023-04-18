import React, { useEffect } from "react";
import Image from "next/image";

import ProfileAd from "app/web/features/profile/ui/ads/ProfileAd/ProfileAd";
import { Ad } from "app/web/entities/ad";

import { favoritesApi } from "app/store/services/favorites";

import empty_favorites from "app/assets/images/empty_favorites.svg";

import styles from "./ProfileFavorites.module.scss";

export const ProfileFavorites = () => {
  const favorites = favoritesApi.useGetFavoritesQuery("", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={styles.favorites}>
      {favorites.data && favorites.data.length < 1 ? (
        <div className={styles.empty}>
          <Image
            src={empty_favorites}
            width={493}
            height={477}
            alt="empty_favorites"
          />
          <p>
            Здесь будет Ваш список <br /> добавленного в избранное
          </p>
        </div>
      ) : (
        <div className={styles.ads__list}>
          {favorites.data &&
            favorites.data.map((item: any) => (
              <Ad
                key={item.id}
                name={item.name}
                price={item.price}
                date={item.addingDate}
                preview={item.preview}
                views={item.views}
                id={item.adId}
                tab={item.type === "PRODUCT" ? 0 : 1}
                targeted={item.targetStarted}
                addressLine={item.adressLine}
                typeAds={item.type}
                inFavorites={true}
              />
            ))}
        </div>
      )}
    </div>
  );
};
