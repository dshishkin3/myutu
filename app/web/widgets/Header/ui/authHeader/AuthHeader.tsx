import Image from "next/image";
import Link from "next/link";
import style from "./AuthHeader.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

const AuthHeader = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const auth = useSelector((state: RootState) => state.authentication);

  return (
    <>
      {auth.isLoggedIn ? (
        <Link href="/profile/myads">
          <div className={style.auth__profile}>
            <Image src={profile.image} alt="profile pic" width={40} height={40} />
            <span>{profile.login}</span>
          </div>
        </Link>
      ) : (
        <Link href="/auth">
          <button className={style.auth__btn}>
            <span>Войти</span>
          </button>
        </Link>
      )}
    </>
  );
};

export default AuthHeader;
