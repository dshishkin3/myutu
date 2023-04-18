import { usersApi } from "app/store/services/users";
import { SettingsForm } from "app/web/widgets/profile/model";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";

import ru from "react-phone-number-input/locale/ru.json";

import { NumberFormValues } from "../../model";

import styles from "./style.module.scss";

interface INumberProps {
  form: SettingsForm;
  setForm: (arg0: SettingsForm) => void;
}

export const Number: FC<INumberProps> = ({ form, setForm }) => {
  // ошибка с сервера
  const [serverError, setServerError] = useState(false);
  const [serverErrorValue, setServerErrorValue] = useState("");
  const [updateUserQuery] = usersApi.useUpdateUserMutation();
  const [number, setNumber] = useState("+7");

  const router = useRouter();

  // hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NumberFormValues>();

  // отправка формы
  const onSubmit: SubmitHandler<NumberFormValues> = (data) => {
    if (!errors.number) {
      changeNumber(data.number);
    }
  };

  // сменить номер телефона
  const changeNumber = async (value: string) => {
    const data = await updateUserQuery({
      ...form,
      phoneNumber: value,
    }).unwrap();

    switch (data.state) {
      case "0000":
        setForm({
          ...form,
          phoneNumber: value,
        });
        router.reload();
        break;

      case "1036":
        setServerError(true);
        setServerErrorValue("Некорректно введен номер");
        break;

      case "1007":
        setServerError(true);
        setServerErrorValue("Данный номер уже используется");
        break;

      default:
        break;
    }
  };

  // кнопка "отмена" - очищает все поля
  const cancellation = () => {
    setNumber("+7");
  };

  return (
    <div className={styles.signUp}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Телефон
          <Controller
            name="number"
            control={control}
            rules={{
              validate: (value) => (value ? isValidPhoneNumber(value) : false),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                onChange={onChange}
                name="phone"
                value={number}
                placeholder="Введите телефон"
                required
                labels={ru}
                maxLength={16}
                className={
                  errors.number
                    ? styles.password_error
                    : styles.password_success
                }
              />
            )}
          />
          {errors["number"] && (
            <div style={{ color: "#FD5839" }}>
              Неверный формат номера телефона
            </div>
          )}
        </label>
      </form>
      {serverError && (
        <div style={{ color: "#FD5839" }}>{serverErrorValue}</div>
      )}
      <div className={styles.buttons}>
        <button className={styles.save} onClick={handleSubmit(onSubmit)}>
          Сохранить
        </button>

        <button className={styles.cancel} onClick={cancellation}>
          Отмена
        </button>
      </div>
    </div>
  );
};
