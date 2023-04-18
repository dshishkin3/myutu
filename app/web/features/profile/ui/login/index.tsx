import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { usersApi } from "app/store/services/users";
import { InputField } from "app/web/shared/ui/input-field";

import { LoginFormValues } from "../../model";
import { SettingsForm } from "app/web/widgets/profile/model";

import styles from "./style.module.scss";

interface ILoginProps {
  form: SettingsForm;
  setForm: (arg0: SettingsForm) => void;
}

export const Login: FC<ILoginProps> = ({ form, setForm }) => {
  const [loginValue, setLoginValue] = useState(form.login);
  // ошибка с сервера
  const [serverError, setServerError] = useState(false);
  const [serverErrorValue, setServerErrorValue] = useState("");

  const [updateUserQuery] = usersApi.useUpdateUserMutation();

  // hook form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const router = useRouter();

  // подгрузка логина
  useEffect(() => {
    setLoginValue(form.login);
  }, [form.login]);

  // отправка формы
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    if (!errors.login) {
      changeLogin(data.login);
    }
  };

  // сменить логин
  const changeLogin = async (login: string) => {
    const data = await updateUserQuery({
      ...form,
      login: login,
    }).unwrap();

    switch (data.state) {
      case "0000":
        setForm({
          ...form,
          login: login,
        });
        router.reload();
        break;

      case "1003":
        setServerError(true);
        setServerErrorValue("Пользователь с таким именем уже существует");
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginValue(
      event.target.value.replaceAll(" ", "").replaceAll(/[^a-z0-9_-]/g, "")
    );
    setValue(
      "login",
      event.target.value.replaceAll(" ", "").replaceAll(/[^a-z0-9_-]/g, "")
    );
  };

  // кнопка "отмена" - очищает все поля
  const cancellation = () => {
    setLoginValue(form.login);
  };

  return (
    <div>
      <label htmlFor="Login" className="block text-black mb-2">
        Логин
        <InputField
          type="text"
          value={loginValue}
          style={{ marginTop: 10 }}
          id="Login"
          placeholderText="Логин"
          handleChange={handleChange}
          maxLength={20}
          required
          {...register("login", {
            required: "Это поле обязательно",
            minLength: {
              value: 4,
              message: "Пароль должен состоять из более 4 символов",
            },
            maxLength: {
              value: 20,
              message: "Пароль должен состоять не более чем из 20 символов",
            },
            pattern: {
              value: /^[a-z0-9_-]{4,20}$/,
              message:
                "Используйте только английские и маленькие буквы, цифры, - и _",
            },
          })}
        />
        <div
          style={{
            color: "#d6d6d6",
            fontWeight: 400,
            marginTop: 5,
            maxWidth: 380,
          }}
        >
          Используйте только английские и маленькие буквы, цифры, - и _
        </div>
        {serverError && (
          <div style={{ color: "#FD5839" }}>{serverErrorValue}</div>
        )}
      </label>
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
