import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeSnackbar } from "app/store/slices/snackbar.slice";
import { RootState } from "app/store/store";

import closeIcon from "app/assets/images/close.svg";

import styles from "./style.module.scss";

export const Snackbar = () => {
  const { show, label, type } = useSelector(
    (state: RootState) => state.snackbar
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setTimeout(() => dispatch(closeSnackbar(false)), 3000);
    }
  }, [dispatch, show]);

  const close = () => dispatch(closeSnackbar(false));

  return (
    <div
      className={`${styles.snackbar} ${show ? styles.snackbar__show : ""}`}
    >
      {label}
      {/* <img
        src={closeIcon}
        alt="close icon"
        className="cursor-pointer"
        onClick={close}
      /> */}
    </div>
  );
};
