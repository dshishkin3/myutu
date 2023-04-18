import { adsSearchApi } from "app/store/services/adsSearch";
import { cookie } from "app/utils/helpers/cookies.helpers";
import ProfileAd from "app/web/features/profile/ui/ads/ProfileAd/ProfileAd";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import style from "./style.module.scss";
import { RootState } from "app/store/store";
import { useSelector } from "react-redux";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";
import { favoritesApi } from "app/store/services/favorites";

import fill_favorites from "app/assets/images/heart-fill.svg";
import favorite from "app/assets/images/ad_favorite.svg";
import { Ad } from "app/web/entities/ad";

const AdsHome: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const authSliceState = useSelector(
    (state: RootState) => state.authentication
  );

  const router = useRouter();

  const { data = [], isSuccess } = adsSearchApi.useGetNewAdsQuery({
    city: profile.city.name,
    userId: profile.id,
  }, {
    refetchOnFocus: true
  });


  return (
    <div className={style.ads_home}>
      <div className={style.ads_home__title_block}>
        <h1 className={style.ads_home__title}>Лента рекомендаций</h1>
        <button
          className={style.ads_home__button}
          onClick={() =>
            router.push(authSliceState.isLoggedIn ? "/ad" : "/auth")
          }
        >
          Разместить объявление
        </button>
      </div>
      <div className={style.ads_home__ads}>
        {isSuccess &&
          data.map((key: any) => (<Ad key={key.id} {...key} />))
        }

        {!isSuccess &&
          [...Array(50)].map((key, index) => (
            <ContentLoader
              key={key}
              speed={2}
              width={266}
              height={350}
              viewBox="0 0 266 350"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="8" ry="8" width="266" height="180" />
              <rect x="0" y="197" rx="5" ry="5" width="84" height="18" />
              <rect x="0" y="225" rx="5" ry="5" width="216" height="20" />
              <rect x="0" y="250" rx="5" ry="5" width="139" height="20" />
              <rect x="0" y="280" rx="3" ry="3" width="92" height="14" />
              <rect x="0" y="304" rx="3" ry="3" width="168" height="14" />
              <rect x="0" y="331" rx="3" ry="3" width="84" height="14" />
              <rect x="95" y="327" rx="3" ry="3" width="74" height="23" />
            </ContentLoader>
          ))}
      </div>
    </div>
  );
};

export default AdsHome;
