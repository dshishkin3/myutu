import type { NextPage } from "next";
import style from "./profile.module.scss";
import { useRouter } from "next/router";

import { ProfileInfo, ProfileMenu } from "app/web/features/profile";
import { menu } from "app/web/features/profile/ui/menu/Menu";
import {
  ProfileFavorites,
  UserProfileFeedback,
  UserProfileSetting,
  ProfileDeals,
  UserProfileAbout,
  UserProfileEdit,
} from "app/web/widgets/profile";
import { ProfileAds } from "app/web/features/profile/ui/ads/ProfileAds";

type ProfilePageProps = {
  type?: string;
};

const Profile: NextPage<ProfilePageProps> = ({ type }) => {
  const router = useRouter();

  return (
    <div>
      <div className={`breadcrumb ${style.breadcrumbProfile}`}>
        <div onClick={() => router.push("/")} className="breadcrumb__item">
          Главная
          <span>-</span>
        </div>
        <div className="breadcrumb__item breadcrumb__item--active">
          Мой профиль
        </div>
      </div>

      <div className={`page__title ${style.page__titleProfile}`}>
        {/* динамеческая подгрузка выбранного таба */}
        {menu.find((item) => item.key === router.query.type)?.title}
        {type === "edit" && "Редактирование"}
      </div>

      <div className={style.profile__content}>
        <div className={style.section__wrapper}>
          <ProfileInfo />
          <ProfileMenu />
        </div>

        {type === "myads" && <ProfileAds />}
        {type === "deals" && <ProfileDeals />}
        {type === "favorites" && <ProfileFavorites />}
        {type === "settings" && <UserProfileSetting />}
        {type === "feedback" && <UserProfileFeedback />}
        {type === "about" && <UserProfileAbout />}
        {type === "edit" && <UserProfileEdit />}
      </div>
    </div>
  );
};

Profile.getInitialProps = ({ query }) => {
  return {
    ...query,
  };
};

export default Profile;
