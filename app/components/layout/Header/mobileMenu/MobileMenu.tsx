import {
  logged,
  loggedUserID,
  showAuthModal,
  showRegForm,
} from "app/store/atoms";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import logoPic from "../../../../assets/images/logo.svg";
import menuPic from "../../../../assets/images/menu.svg";
import adIcon from "../../../../assets/images/adIcon.svg";
import vector from "../../../../assets/images/vector.svg";
import vectorArrow from "../../../../assets/images/vectorArrow.svg";
import iconGp from "../../../../assets/images/iconGp.svg";
import avaUser from "../../../../assets/images/avatarUser.svg";
import closeModalMenu from "../../../../assets/images/closeModalMenu.svg";
import { menu } from "app/web/features/profile/ui/menu/Menu";
import useOutside from "app/hooks/useOutside";
import Index from "pages/search";

import styles from "./MobileMenu.module.scss";
import ProfileFeedback from "app/components/profilePage/ProfileFeedback/ProfileFeedback";
import toast, { Toaster } from "react-hot-toast";

interface IModal {
  show: boolean;
  onClose: (e: boolean) => void;
  avatar: string;
  login: string;
}

const MobileMenu = ({ show, onClose, avatar = "", login = "" }: IModal) => {
  const [isLogged, setIsLogged] = useRecoilState(logged);
  const [loggedId, setLoggedId] = useRecoilState(loggedUserID);
  const [modal, showModal] = useRecoilState(showAuthModal);
  const [regForm, setRegForm] = useRecoilState(showRegForm);
  const [feedbackPopup, setFeedbackPopup] = useState(false);

  const router = useRouter();

  const handlerOut = () => {
    setIsLogged(false);
    setLoggedId("");
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Router.push("/");
    onClose(false);
  };

  const handlerRoute = (tab = "myads") => {
    onClose(false);
    if (tab === "about") {
      router.push("/about");

      return 0;
    }

    router.push({
      pathname: "/profile",
      query: { tab: tab },
    });
  };

  const notify = () => toast.success("Скопировано");
  return (
    <>
      <div
        className={styles.menu__wrapper}
        style={{ display: show ? "block" : "none" }}
        onClick={() => onClose(false)}
      >
        <div
          className={styles.menu__block}
          onClick={(e) => e.stopPropagation()}
        >
          {isLogged ? (
            <div className="flex-col border-b-2 border-gray-100">
              <div className="mb-[15px]">
                <div
                  className="ml-1.5 bg-gray-200 rounded-full relative"
                  style={{ width: 66, height: 66 }}
                >
                  {avatar && (
                    <Image
                      src={avatar}
                      layout="fill"
                      alt="Аватар пользвателя"
                    />
                  )}
                </div>
                <div className="font-[600] mt-1.5 pl-1.5 text-[16px]">
                  @{login}
                </div>

                <div
                  className="flex justify-betwwen mt-[13px] mb-2 pl-1.5 relative cursor-pointer"
                  onClick={handlerOut}
                >
                  <Image
                    src={vector}
                    alt="Header logo picture"
                    width={12}
                    height={20}
                  />
                  <Image
                    src={vectorArrow}
                    alt="Header logo picture"
                    width={12}
                    height={20}
                  />
                  <span className="block pl-2 text-[14px] text-[#B8B8B8]">
                    Выйти
                  </span>
                </div>
                {/* 10.11.22 отредактировал меню, когда пользователь вошел в профиль */}
                <div
                  onClick={() => {
                    router.push("/category");
                    onClose(false);
                  }}
                  className="flex-auto justify-between block mt-[15px] p-3 text-[16px] border-b-2 border-t-2 border-gray-100 cursor-pointer"
                >
                  <Image
                    src={adIcon}
                    alt="Header logo picture"
                    width={18}
                    height={16}
                  />
                  <span className="font-[600] pl-[11px]">
                    Создать объявление
                  </span>
                </div>
                <div className="block p-1.5 text-[16px]">
                  {menu.map((item, i) => (
                    <span
                      key={item.key}
                      onClick={() => handlerRoute(item.key)}
                      className={`block cursor-pointer ${i !== menu.length - 1 && "mb-[15px]"
                        } ${i === 0 && "mt-1.5"}`}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
                {/* 10.11.22 отредактировал меню, когда пользователь вошел в профиль */}
              </div>
            </div>
          ) : (
            <div className="flex justify-center border-b-2 border-gray-100">
              <div className="mb-[15px]">
                <div
                  className="flex justify-center self-center bg-[#FFFFFF] rounded-full shadow-md top-[5px] my-0 mx-auto"
                  style={{ width: 50, height: 50 }}
                >
                  <Image src={avaUser} alt="Logo user" width={24} height={28} />
                </div>
                <div
                  className="flex mt-[15px] cursor-pointer cursor-pointer"
                  onClick={() => {
                    router.push("/auth");
                    onClose(false);
                  }}
                >
                  <span className="block text-[16px] font-[600] my-[5px] border-[#2AC6FA] border-[1px] rounded px-[105px] py-[5px]">
                    Войти
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* 10.11.22 добавил в меню 'обратная связь" */}

          {isLogged && (
            <div className="flex justify-betwwen mt-[13px] mb-2 pl-1.5 cursor-pointer">
              <Image
                src={vector}
                alt="Header logo picture"
                width={12}
                height={20}
              />
              <Image
                src={vectorArrow}
                alt="Header logo picture"
                width={12}
                height={20}
              />
              <span
                className="block pl-[11px] font-[600] text-[16px]"
                onClick={handlerOut}
              >
                Выйти
              </span>
            </div>
          )}
          <a
            href="https://play.google.com/store/apps/details?id=com.wayos"
            target={"_blank"}
          >
            <div className="flex justify-center self-center my-[50px] mx-auto">
              <Image src={iconGp} alt="Header logo picture" />
            </div>
          </a>
        </div>
      </div>

      {feedbackPopup && (
        <div
          className={styles.feedback__wrapper}
          onClick={() => setFeedbackPopup(false)}
        >
          <div
            className={styles.feedback__popup}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => setFeedbackPopup(false)}
              className={styles.feedback__close}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.725209 0.113735C0.453798 0.242335 0.230772 0.4713 0.0969797 0.758687C0.0246945 0.913882 0.00345016 1.02585 0.0031768 1.25231C0.00247386 1.81998 -0.253043 1.53204 4.19693 5.97759C6.37916 8.15766 8.16461 9.96778 8.16461 10.0001C8.16461 10.0324 6.37916 11.8425 4.19693 14.0226C-0.25566 18.4707 0.00282533 18.1793 0.00278628 18.7514C0.00274723 19.0034 0.0205159 19.0833 0.121309 19.2851C0.349607 19.742 0.75399 19.9965 1.25241 19.9971C1.82007 19.9978 1.53214 20.2533 5.97762 15.8033C8.15766 13.621 9.96776 11.8355 10.0001 11.8355C10.0324 11.8355 11.8425 13.621 14.0225 15.8033C18.468 20.2533 18.18 19.9978 18.7477 19.9971C19.0924 19.9967 19.3443 19.8979 19.6086 19.6596C19.8605 19.4325 19.9973 19.1115 19.9973 18.7478C19.9973 18.1799 20.2527 18.4676 15.8032 14.0226C13.621 11.8425 11.8355 10.0324 11.8355 10.0001C11.8355 9.96778 13.621 8.15766 15.8032 5.97759C20.2527 1.53251 19.9973 1.82025 19.9973 1.25231C19.9973 0.888654 19.8605 0.567603 19.6086 0.340552C19.3443 0.102214 19.0924 0.00345039 18.7477 0.00305987C18.18 0.00235692 18.468 -0.253163 14.0225 4.19687C11.8425 6.37913 10.0324 8.16461 10.0001 8.16461C9.96776 8.16461 8.15766 6.37913 5.97762 4.19687C1.53261 -0.252695 1.82034 0.0027084 1.25241 0.0027084C1.01154 0.0027084 0.917892 0.0224299 0.725209 0.113735Z"
                  fill="black"
                ></path>
              </svg>
            </div>
            <ProfileFeedback />
          </div>
        </div>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default MobileMenu;
