import styles from "./Forgot.module.scss";
import React, { useEffect, useState } from "react";
import arrow from "../../../../../app/assets/images/arrow.svg";
import {
  setType,
  setPhone,
  setNewPasswordType,
} from "app/store/slices/authentication.slices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { api } from "app/store/services/passwordRestoreAPI";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  login: string;
  password: string;
};

const Forgot = () => {
  const dispatch = useDispatch();
  const phone = useSelector((state: RootState) => state.authentication);
  const [phoneNumber, setPhoneNumber] = useState<string>("+7");

  const [isPhoneDirty, setIsPhoneDirty] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("Заполните поле");
  const [noUser, setNoUser] = useState<boolean>(false);

  const [restoreCall] = api.useRestoreCallMutation();

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
    if (!errors.login) {
      regForgot(data.login);
    }
  };

  const authSetType = () => {
    dispatch(setType("authorization"));
    dispatch(setNewPasswordType("regPass")); // функция для указания проверки типа - регистрация или восстановление пароля
  };

  const phoneHandler = (e: any) => {
    setPhone(e.target.value);
    const re = /^(\+91-|\+91|0)?\d{11}$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setPhoneError("Неккоректный номер");
    } else {
      setPhoneError("");
    }
  };

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "phone":
        setIsPhoneDirty(true);
        break;
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
  };

  const regForgot = async (number: string) => {
    try {
      const res = await restoreCall(number);
      if ("data" in res && res.data.state === "0000") {
        dispatch(setPhone(number));
        dispatch(setType("code"));
      }
      if ("data" in res && res.data.state === "1017") {
        setNoUser(true);
      }
      // console.log(res.data, "asdasdas");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.window}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <img
          className={styles.arrow}
          src={arrow.src}
          alt="arrow"
          onClick={authSetType}
        />
        <label>
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
          {/* <PhoneInput
            onChange={(e: any) => setPhoneNumber(e)}
            onBlur={(e: any) => blurHandler(e)}
            name="phone"
            value={phoneNumber}
            placeholder="Введите телефон"
            required
            labels={ru}
            autoComplete={"off"}
          /> */}
          {/* {isPhoneDirty && phoneError && (
                        <div style={{ color: "#FD5839" }}>{phoneError}</div>
                    )} */}
        </label>
        <button
          className={styles.forgotPass}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Восстановить пароль
        </button>
        {noUser && <span>Пользователь не найден</span>}
      </form>
    </div>
  );
};
export default Forgot;
