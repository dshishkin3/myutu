import React, { useState, FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useDispatch } from "react-redux";

import hideIcon from "app/assets/images/hideIcon.svg";
import showIcon from "app/assets/images/showIcon.svg";

import {
  setType,
  setPhone,
  setNewPasswordType,
  onLogin,
} from "app/store/slices/authentication.slices";
import { usersApi } from "app/store/services/users";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";
import { cookie } from "app/utils/helpers/cookies.helpers";

import { logged, loggedUserID } from "app/store/atoms";

import styles from "./SignIn.module.scss";

type FormValues = {
  login: string;
  password: string;
};

const SignIn: FC = (initialState) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("+7");

  const [password, setPassword] = useState<string>("");
  const [isPhoneDirty, setIsPhoneDirty] = useState<boolean>(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("Заполните поле");
  const [isShown, setShown] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("Заполните поле");
  const [formValid, setFormValid] = useState<boolean>(false);
  // Если пароль неправильный
  const [isWrongPass, setIsWrongPass] = useState<boolean>(false);
  // Если неккоректный формат номера
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  // пользователь не найден
  const [undefinedUser, setUndefinedUser] = useState(false);

  const [loginCheck] = usersApi.useLoginMutation();
  const [isLogged, setIsLogged] = useRecoilState(logged);
  const [logUserID, setLogUserID] = useRecoilState(loggedUserID);

  // hook form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  console.log(errors);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!errors.login && !errors.password) {
      auth(data.login, data.password);
    }
  };

  const authSetType = () => {
    dispatch(setType("forgot"));
    dispatch(setNewPasswordType("restorePass")); // функция для указания проверки типа - регистрация или восстановление пароля
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Пароль должен состоять из более 6 символов");
      if (!e.target.value) {
        setPasswordError("Заполните поле");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "phone":
        setIsPhoneDirty(true);
        break;
      case "password":
        setIsPasswordDirty(true);
        break;
    }
  };

  const auth = async (phone: string, password: string) => {
    passwordHandler;
    try {
      let payload = {
        login: phone,
        password: password,
      };
      const res: any = await loginCheck(payload);
      if (res.data.state === "0000") {
        setIsLogged(true);
        setLogUserID(res.data.value);
        dispatch(setPhone(phoneNumber));
        dispatch(setType("authorization"));
        dispatch(onLogin(res.data.value));
        cookie.set("t", res.data.value);
        Router.push("/profile/myads");
      }
      if (res.data.state === "1020") {
        setIsWrongPass(true);
        setUndefinedUser(false);
        setIsIncorrect(false);
      }
      if (res.data.state === "1036") {
        setIsIncorrect(true);
      }
      if (res.data.state === "1017") {
        setUndefinedUser(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signIn}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.loginForm__tel}>
          Телефон
          <Controller
            name="login"
            control={control}
            rules={{
              validate: (value) => (value ? isValidPhoneNumber(value) : false),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                onChange={onChange}
                onBlur={(e: any) => blurHandler(e)}
                name="phone"
                value={phoneNumber}
                placeholder="Введите телефон"
                required
                labels={ru}
                maxLength={16}
                className={
                  errors.login ? styles.password_error : styles.password_success
                }
              />
            )}
          />
          {errors["login"] && (
            <div style={{ color: "#FD5839" }}>
              Неверный формат номера телефона
            </div>
          )}
        </label>
        <label>
          Пароль
          <input
            type={isShown ? "text" : "password"}
            placeholder="Введите пароль"
            required
            className={
              isWrongPass || errors.password
                ? styles.password_error
                : styles.password_success
            }
            maxLength={25}
            {...register("password", {
              required: "Это поле обязательно",
              minLength: {
                value: 6,
                message: "Пароль должен состоять из более 6 символов",
              },
              maxLength: {
                value: 25,
                message: "Пароль должен состоять не более чем из 25 символов",
              },
            })}
            onChange={(e) =>
              setValue("password", e.target.value.replaceAll(" ", ""))
            }
          />
          {errors.password && (
            <div style={{ color: "#FD5839", marginTop: 5 }}>
              {errors.password.message}
            </div>
          )}
          <img
            className={styles.eye}
            src={isShown ? showIcon.src : hideIcon.src}
            onClick={() => setShown((prev) => !prev)}
          />
          {isPasswordDirty && passwordError && (
            <div style={{ color: "#FD5839", marginTop: 5 }}>
              {passwordError}
            </div>
          )}
          {isWrongPass && (
            <div style={{ color: "#FD5839", marginTop: 5 }}>
              Неверный пароль
            </div>
          )}
          {undefinedUser && (
            <div
              style={{ color: "#FD5839", textAlign: "center", marginTop: 5 }}
            >
              Пользователь не найден
            </div>
          )}
        </label>
        <div className={styles.forgot}>
          <p className={styles.forgotPass} onClick={authSetType}>
            Забыли пароль?
          </p>
        </div>
        <button
          // disabled={!formValid}
          className={styles.signIn__btn}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;
