import Image from "next/image";
import Router, { useRouter } from "next/router";
import AuthHeader from "./authHeader/AuthHeader";
import logoPic from "app/assets/images/logo.svg";
import style from "./style.module.scss";
import { CategoryModal } from "app/web/features/header/ui/category-modal";
import { infoApi } from "app/store/services/info";
import { RootState } from "app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ButtonHeaderCategory, ButtonHeaderMyads } from "app/web/shared/ui";
import {
  CityModal,
  toggleIsOpenCategory,
  toggleIsOpenModalCity,
  toggleIsOpenModalSearch,
} from "app/web/features/header";
import { ButtonHeaderSearch } from "app/web/shared/ui/button-header-search";
import { ButtonHeaderLocation } from "app/web/shared/ui/button-header-location";
import { ImgNotification } from "app/web/shared/config/images";
import { SearchModal } from "app/web/features/header/ui/search-modal";

export const Header = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const { isOpenCategory, isOpenModalSearch, isOpenModalCity } = useSelector(
    (state: RootState) => state.header
  );
  infoApi.useGetAllCategoriesQuery("");
  infoApi.useGetAllSubCategoriesQuery("");
  const router = useRouter();

  // открыть попап поиска
  const openPopupSearch = () => {
    dispatch(toggleIsOpenModalSearch(true));
    document.body.style.overflow = "hidden";
  };

  // открыть попап категорий
  const openPopupCategory = () => {
    dispatch(toggleIsOpenCategory());
    document.body.style.overflow = "hidden";
  };

  // открыть попап города
  const openPopupCity = () => {
    dispatch(toggleIsOpenModalCity(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <header className={style.header} onClick={() => {
      dispatch(toggleIsOpenCategory(false));
      document.body.style.overflow = "auto";
    }}>
      <div className={style.header__wrapper}>
        <div className={style.header__right_section}>
          <div className={style.header__logo} onClick={() => router.push("/")}>
            <Image
              src={logoPic}
              alt="Header logo picture"
              width={144}
              height={35}
            />
          </div>
          <ButtonHeaderCategory
            variant={isOpenCategory ? "active" : "passive"}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleIsOpenCategory(true));
            }} />
          {/* <ButtonHeaderMyads /> */}
        </div>

        <div className={style.header__left_section}>
          <ButtonHeaderSearch onClick={openPopupSearch} />
          <ButtonHeaderLocation
            text={profile.city.name || "Чебоксары"}
            onClick={openPopupCity}
          />
          <Image src={ImgNotification} />
          <AuthHeader />
        </div>
      </div>
      {isOpenModalSearch && (<SearchModal />)}
      {isOpenModalCity && (<CityModal />)}
    </header>
  );
};
