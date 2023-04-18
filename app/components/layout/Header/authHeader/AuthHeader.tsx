import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";
import { showAuthModal, logged } from "../../../../store/atoms";

import style from "./AuthHeader.module.scss";

import slugImgProfile from "../../../../assets/images/slugImgProfile.png";
import { cookie } from "../../../../utils/helpers/cookies.helpers";
import { useEffect } from "react";
import { getUserInfo } from "app/services/profile.api";
import { useRouter } from "next/router";
import { usersApi } from "app/store/services/users";
const AuthHeader = () => {
  const isLogged = useRecoilValue(logged);
  const [show, setShow] = useRecoilState(showAuthModal);
  const [avatar, setAvatar] = useState(slugImgProfile);
  const router = useRouter();
  const [myInfoQuery] = usersApi.useLazyGetMyInfoQuery();

  const handleClick = () => {
    router.push("/auth");
  };

  useEffect(() => {
    if (isLogged) {
      myInfoQuery('').unwrap().then(data => setAvatar(data.image));
    }

    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isLogged, show]);

  return (
    <>
      {isLogged ? (
        // <Link href="/profile"> 02.11.2022
        <div className={style.auth__profile}>
          <Image src={avatar} alt="profile pic" layout="fill" />
        </div>
      ) : (
        // </Link>  02.11.2022  onClick={() => setModalMenu(prev => !prev)}
        <Link href="/auth">
          <button className={style.auth__btn} onClick={handleClick}>
            <span>Войти</span>
          </button>
        </Link>
      )}
    </>
  );
};

export default AuthHeader;
