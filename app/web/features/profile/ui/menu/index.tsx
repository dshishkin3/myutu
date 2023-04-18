import Router, { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { useRecoilState } from "recoil";
import { logged, loggedUserID } from "app/store/atoms";
import { onLogout, setType } from "app/store/slices/authentication.slices";

import logout from "app/assets/images/logout.svg";

import { logoutUser } from "app/store/slices/profileSlice";

import { menu } from "./Menu";

import style from "./ProfileMenu.module.scss";

export const ProfileMenu = () => {
  const [isLogged, setIsLogged] = useRecoilState(logged);
  const [loggedId, setLoggedId] = useRecoilState(loggedUserID);
  const dispatch = useDispatch();

  const router = useRouter();

  // выход из аккаунта
  const handlerOut = () => {
    setIsLogged(false);
    setLoggedId("");
    dispatch(logoutUser());
    dispatch(onLogout());
    dispatch(setType("authorization"));
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Router.push("/");
  };

  return (
    <>
      <div className={style.menu__item_logout} onClick={() => handlerOut()}>
        <Image src={logout} width={24} height={24} alt="logout" />
        <p>Выйти</p>
      </div>
      <div className={style.menu}>
        {menu.map(({ title, key, img }, i) => {
          return (
            <div
              key={key}
              onClick={() => router.push(key)}
              className={`${style.menu__item} ${
                router.query.type === key && style["menu__item--active"]
              }`}
            >
              <Image src={img} alt={title} width={16} height={16} />
              <span>{title}</span>
              {key === "sapphire" && (
                <span className={style.sapphire}> ({0} c.)</span>
              )}
            </div>
          );
        })}
        <div className={style.menu__version}>
          <p>Версия сайта {process.env.version}</p>
        </div>
        {/* <div className={style.menu__item}>
          <a href="https://info.myutu.ru">О приложении</a>
        </div> */}
      </div>
    </>
  );
};
