import React, { useState, FC } from "react";
import styles from "./SignUp.module.scss";
import {
  setType,
  setPhone,
  onLogin,
} from "app/store/slices/authentication.slices";
import { useDispatch } from "react-redux";

import { api } from "app/store/services/passwordRestoreAPI";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import ru from "react-phone-number-input/locale/ru.json";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  login: string;
};

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState<string>("+7");

  // const [phoneError, setPhoneError] = useState<string>("Заполните поле");
  const [isPhoneDirty, setIsPhoneDirty] = useState<boolean>(false);
  // Если не все данные получены
  const [isEnoughData, setIsEnoughData] = useState<boolean>(false);
  // Если номер занят уже другим пользователем
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const [registrationCall] = api.useRegistrationCallMutation();

  // hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  // отправка формы
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!errors.login) {
      regCall(data.login);
    }
  };

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "phone":
        setIsPhoneDirty(true);
        break;
    }
  };

  const regCall = async (phone: string) => {
    try {
      const res: any = await registrationCall(phone);
      if (res.data.state === "0000") {
        dispatch(setPhone(phone));
        dispatch(setType("code"));
      }
      if (res.data.state === "1001") {
        setIsEnoughData(true);
      }
      if (res.data.state === "1007") {
        setIsBusy(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signUp}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
        </label>
        <button
          className={styles.signUp__btn}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Запросить код
        </button>
        {isEnoughData && <span>Не все данные получены</span>}
        {isBusy && (
          <div style={{ color: "#FD5839", textAlign: "center" }}>
            Номер занят
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
