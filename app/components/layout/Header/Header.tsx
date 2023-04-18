import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { logged, loggedUserID, showAuthModal } from "../../../store/atoms";

import { cookie } from "app/utils/helpers/cookies.helpers";

import Category from "./categoryHeader/CategoryHeader";
import Search from "./searchHeader/Search";
import Place from "./placeHeader/Place";
import AuthHeader from "./authHeader/AuthHeader";

import style from "./Header.module.scss";

import logoPic from "../../../assets/images/logo.svg";
import menuPic from "../../../assets/images/menu.svg";
import adIcon from "../../../assets/images/adIcon.svg";
import vector from "../../../assets/images/vector.svg";
import vectorArrow from "../../../assets/images/vectorArrow.svg";
import iconGp from "../../../assets/images/iconGp.svg";
import avaUser from "../../../assets/images/avatarUser.svg";
import closeModalMenu from "../../../assets/images/closeModalMenu.svg";

import MobileMenu from "./mobileMenu/MobileMenu";

import { menu } from "app/web/features/profile/ui/menu/Menu";
import useOutside from "app/hooks/useOutside";
import { getUserInfo } from "app/services/profile.api";

const Header = () => {
  const [modalMenuPhone, setModalMenuPhone] = useState(false);

  const isAuth = useRecoilValue(logged);
  const [modal, showModal] = useRecoilState(showAuthModal);

  const [isLogged, setIsLogged] = useRecoilState(logged);
  const [loggedId, setLoggedId] = useRecoilState(loggedUserID);

  const { ref, isVisible, setIsVisible } = useOutside(false);

  const [user, setUser] = useState({
    login: "",
    avatar: "",
  });

  const router = useRouter();

  const handlerOut = () => {
    setIsLogged(false);
    setLoggedId("");
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Router.push("/");
  };

  const onProfileAuth = () => {
    if (isAuth) {
      Router.push(`/profile`);
    } else {
      showModal(true);
    }
  };

  const handlerRoute = (tab = "myads") => {
    if (tab === "about") {
      router.push("/about");
      return 0;
    }
    setIsVisible(false);
    router.push("/profile/" + tab);
  };

  useEffect(() => {
    if (isLogged) {
      (async () => {
        const o = await getUserInfo(cookie.get("t"));
        setUser({
          login: o.login,
          avatar: o.avatar,
        });
      })();
    }
  }, [isLogged]);

  useEffect(() => {
    modalMenuPhone
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [modalMenuPhone]);

  return (
    <>
      {/* 02.11.2022 relative */}
      <div className="wrapper lg:block hidden relative">
        {/* 02.11.2022 relative и выпадающий список в главном меню*/}
        <div
          className="my-50 bg-white w-210 h-357 p-2 absolute shadow-lg z-10 border-solid border-2 rounded-lg"
          style={{
            right: 0,
            top: 55,
            transition: ".1s",
            display: isVisible ? "block" : "none",
          }}
          ref={ref}
        >
          <div className="pr-[25px]">
            {menu.map((item) => (
              <span
                key={item.key}
                onClick={() => handlerRoute(item.key)}
                className="block p-[6px] text-[14px] font-[400] hover:font-[400] hover:text-[#2AC6FA] cursor-pointer"
              >
                {item.title}
              </span>
            ))}
            <span
              onClick={handlerOut}
              className="block p-[6px] text-[14px] font-[400] hover:font-[400] hover:text-[#2AC6FA] cursor-pointer"
            >
              Выйти
            </span>
          </div>
        </div>
        {/* 02.11.2022 выпадающий список в главномм меню*/}

        <header className={style.header}>
          <Link href="/">
            <a>
              <Image
                src={logoPic}
                alt="Header logo picture"
                width={144}
                height={35}
              />
            </a>
          </Link>
          <Category />
          <Search />
          <Place />
          {/* 02.11.2022 setModalMenu={setModalMenu} */}
          {/*21.11.2022 блок сжало из-за того, что компонент был обернут */}
          <div
            onClick={() => (isAuth ? setIsVisible(true) : null)}
            className={style.button__wrapper}
          >
            <AuthHeader />
          </div>

          {/* 02.11.2022 setModalMenu={setModalMenu} */}
        </header>
      </div>
      {/* Дата: 07.11.22 ! окно БЕЗ авторизации пользователя ! */}
      <div
        className="sm:block lg:hidden p-3 top-0 z-10 bg-white relative"
        aria-label="mobile-header"
      >
        <div className="flex justify-between pb-5 items-center">
          <div onClick={onProfileAuth}>
            {/* 02.11.2022 убрал лого профиля */}
            {/* <Image src='' alt="Header logo picture" width={30} height={30}/> */}
            {/* 02.11.2022 убрал лого профиля */}
          </div>
          <Link href="/">
            <Image
              src={logoPic}
              alt="Header logo picture"
              width={154}
              height={45}
            />
          </Link>
          <div
            className="block"
            onClick={() => (window.location.href = "/m/auth")}
            style={{ width: 30 }}
          >
            <Image
              src={menuPic}
              alt="Header logo picture"
              width={30}
              height={16}
            />
          </div>
        </div>
        {/* Дата: 07.11.22 ! окно ПРИ авторизации пользователя ! */}
        <Search isMobile={true} />
      </div>
    </>
  );
};

export default Header;
