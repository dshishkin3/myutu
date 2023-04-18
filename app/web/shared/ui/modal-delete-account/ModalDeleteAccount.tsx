import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import { RootState } from "app/store/store";
import { usersApi } from "app/store/services/users";
import { logoutUser } from "app/store/slices/profileSlice";
import { setType } from "app/store/slices/authentication.slices";
import { logged, loggedUserID } from "app/store/atoms";

import styles from "./ModalDeleteAccount.module.scss";

interface IModalDeleteAccount {
  active: boolean;
  setActive: () => void;
}

export const ModalDeleteAccount: FC<IModalDeleteAccount> = ({
  active,
  setActive,
}) => {
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useRecoilState(logged);
  const [loggedId, setLoggedId] = useRecoilState(loggedUserID);
  const profile = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();

  const router = useRouter();

  const [deleteUserQuery] = usersApi.useDeleteUserMutation();

  const selfDelete = async () => {
    const data: any = await deleteUserQuery({ userId: profile.id }).unwrap();

    switch (data.state) {
      case "0000":
        dispatch(logoutUser());
        dispatch(setType("authorization"));
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
        setError("");
        setIsLogged(false);
        setLoggedId("");
        break;

      case "1043":
        setError(data.reason);

      default:
        break;
    }
  };
  return (
    <>
      <div
        className={`${active ? styles.modal__active : styles.modal}`}
        onClick={setActive}
      >
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <p>Удалить профиль?</p>

          <div className={styles.modal__content__flex}>
            <button
              className={styles.modal__content__left}
              onClick={selfDelete}
            >
              Да
            </button>
            <button
              className={styles.modal__content__right}
              onClick={setActive}
            >
              Отмена
            </button>
          </div>
          <div style={{ color: "red" }}>
            {error && "Проблемы с удалением аккаунта"}
          </div>
        </div>
      </div>
    </>
  );
};
