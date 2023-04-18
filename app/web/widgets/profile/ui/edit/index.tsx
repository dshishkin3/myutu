import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import Calendar from "react-calendar";
import moment from "moment";
import { useRouter } from "next/router";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

import { DateInput, ModalDeleteAccount, SelectField } from "app/web/shared/ui";
import { InputField } from "app/web/shared/ui/input-field";

import { usersApi } from "app/store/services/users";

import { EditForm, EditFormValues, IEditOptions } from "../../model";

import trash from "app/assets/images/profile__trash.svg";
import menu_date from "app/assets/images/profile_menu-date.svg";

import styles from "./UserProfileEdit.module.scss";

const options: IEditOptions[] = [
  {
    value: "Male",
    label: "Мужской",
  },
  {
    value: "Female",
    label: "Женский",
  },
];

export const UserProfileEdit = () => {
  const [myInfoQuery] = usersApi.useLazyGetMyInfoQuery();
  const [updateUserQuery] = usersApi.useUpdateUserMutation();
  const [form, setForm] = useState<EditForm>({
    name: "",
    surname: "",
    patronymicName: "",
    gender: "",
    dateOfBirth: "",
    userId: "",
  });
  const [dateCalendar, setDateCalendar] = useState(new Date());
  // открыть календарь
  const [openCalendar, setOpenCalendar] = useState(false);
  // открыть попап 'удалить аккаунт'
  const [modalDeleteAcc, setModalDeleteAcc] = useState(false);
  // пол
  const [currentGender, setCurrentGender] = useState<string>("");
  // date format is wrong
  const [dateError, setDateError] = useState<null | string>(null);

  // hook form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditFormValues>();

  const router = useRouter();

  // запись даты рождения в стейт
  useEffect(() => {
    if (String(new Date()).slice(0, 16) !== String(dateCalendar).slice(0, 16)) {
      setForm({
        ...form,
        dateOfBirth: moment(dateCalendar).format("DD.MM.YYYY"),
      });
    }
  }, [dateCalendar]);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    console.log(dateCalendar);
  }, [dateCalendar]);

  // запись гендера в форму
  useEffect(() => {
    setForm({ ...form, gender: currentGender });
  }, [currentGender]);

  // получение инфы о пользователе
  const getInfo = async () => {
    try {
      const payload = await myInfoQuery("").unwrap();

      setForm({
        ...form,
        userId: payload.id,
        name: payload.name,
        surname: payload.surname,
        patronymicName: payload.patronymicName,
        gender: payload.gender,
        dateOfBirth: payload.birthDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // отправка формы
  const onSubmit: SubmitHandler<EditFormValues> = (data) => {
    if (!errors.name && !errors.surname && !errors.patronymicName) {
      changeInfoUser();
    }
  };

  //  сменить данные пользователя
  const changeInfoUser = async () => {
    const data = await updateUserQuery(form).unwrap();

    switch (data.state) {
      case "0000":
        router.reload();
        break;

      case "1041":
        setDateError("Введите корректную дату");
        break;

      default:
        break;
    }
  };

  // кнопка "отмена" - очищает все поля
  const cancellation = () => {
    getInfo();
  };

  // функции для смены стейта инпутов
  const nameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      name: event.target.value
        .replaceAll(" ", "")
        .replaceAll(/[^a-zа-яё\s]/gi, ""),
    });
    setValue(
      "name",
      event.target.value.replaceAll(" ", "").replaceAll(/[^a-zа-яё\s]/gi, "")
    );
  };

  const surnameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      surname: event.target.value
        .replaceAll(" ", "")
        .replaceAll(/[^a-zа-яё\s]/gi, ""),
    });
    setValue(
      "surname",
      event.target.value.replaceAll(" ", "").replaceAll(/[^a-zа-яё\s]/gi, "")
    );
  };

  const patronymicChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      patronymicName: event.target.value
        .replaceAll(" ", "")
        .replaceAll(/[^a-zа-яё\s]/gi, ""),
    });
    setValue(
      "patronymicName",
      event.target.value.replaceAll(" ", "").replaceAll(/[^a-zа-яё\s]/gi, "")
    );
  };

  // изменение даты
  const changeDate = (e: any) => {
    setForm({
      ...form,
      dateOfBirth: e.target.value,
    });
  };

  // функции для смена пола
  const onChange = (newValue: any) => {
    setCurrentGender(newValue);
  };

  const openModalDeleteAcc = () => {
    if (modalDeleteAcc) {
      document.body.style.overflow = "";
      setModalDeleteAcc(!modalDeleteAcc);
    } else {
      document.body.style.overflow = "hidden";
      setModalDeleteAcc(!modalDeleteAcc);
    }
  };

  // стили для react-select
  const style = {
    valueContainer: (base: any) => ({
      ...base,
      minHeight: 44,
      maxHeight: 44,
      padding: "0px 8px",
    }),
  };

  return (
    <div className={styles.edit}>
      <div>
        <div className={styles.edit__header}>
          <p className={styles.edit__title}>Личные данные</p>
          <div
            className={styles.edit__title_trash}
            onClick={openModalDeleteAcc}
          >
            <Image src={trash} width={24} height={24} alt="trash" />
          </div>
        </div>
        <div className={styles.form}>
          {/* name */}
          <div className={styles.form__input}>
            <label htmlFor="Name" className="block text-black mb-1">
              Имя
            </label>
            <InputField
              type="text"
              value={form.name}
              id="Name"
              placeholderText="Введите имя"
              handleChange={nameChange}
              maxLength={15}
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "Имя должно состоять из более 2 символов",
                },
                maxLength: {
                  value: 15,
                  message: "Имя должно состоять не более чем из 15 символов",
                },
                pattern: {
                  value: /^[a-zа-яё]+$/i,
                  message: "Используйте только буквы",
                },
              })}
            />
            {errors.name && (
              <div style={{ color: "#FD5839", marginTop: 5 }}>
                {errors.name.message}
              </div>
            )}
          </div>
          {/* surname */}
          <div className={styles.form__input}>
            <label htmlFor="Name" className="block text-black mb-1">
              Фамилия
            </label>
            <InputField
              type="text"
              value={form.surname}
              id="Surname"
              placeholderText="Введите фамилию"
              handleChange={surnameChange}
              maxLength={20}
              {...register("surname", {
                minLength: {
                  value: 2,
                  message: "Фамилия должна состоять из более 2 символов",
                },
                maxLength: {
                  value: 20,
                  message:
                    "Фамилия должна состоять не более чем из 20 символов",
                },
                pattern: {
                  value: /^[a-zа-яё]+$/i,
                  message: "Используйте только буквы",
                },
              })}
            />
            {errors.surname && (
              <div style={{ color: "#FD5839", marginTop: 5 }}>
                {errors.surname.message}
              </div>
            )}
          </div>
          {/* patronymic */}
          <div className={styles.form__input}>
            <label htmlFor="Name" className="block text-black mb-1">
              Отчество
            </label>
            <InputField
              type="text"
              value={form.patronymicName}
              id="Patronymic"
              placeholderText="Введите отчество"
              handleChange={patronymicChange}
              maxLength={20}
              {...register("patronymicName", {
                minLength: {
                  value: 2,
                  message: "Отчество должно состоять из более 2 символов",
                },
                maxLength: {
                  value: 20,
                  message:
                    "Отчество должно состоять не более чем из 20 символов",
                },
                pattern: {
                  value: /^[a-zа-яё]+$/i,
                  message: "Используйте только буквы",
                },
              })}
            />
            {errors.patronymicName && (
              <div style={{ color: "#FD5839", marginTop: 5 }}>
                {errors.patronymicName.message}
              </div>
            )}
          </div>
          {/* gender */}
          <div className={styles.select}>
            <SelectField
              label="Пол"
              value={form.gender || "Мужской"}
              options={options.map((key) => ({
                label: key.label,
                value: key.value,
              }))}
              onChange={({ value }) => onChange(value)}
            />
          </div>
          <div style={{ width: 388 }}>
            <label htmlFor="Name" className="block text-black mb-1">
              Дата рождения
            </label>
            <div className={styles.date}>
              <DateInput
                radius={`${openCalendar ? "8px 8px 0px 0px" : "8px"}`}
                value={form.dateOfBirth || "."}
                onChange={changeDate}
              ></DateInput>
              <div
                className={styles.menu_date}
                onClick={() => setOpenCalendar(!openCalendar)}
              >
                <Image src={menu_date} width={24} height={24} alt="menuDate" />
              </div>
            </div>
            {openCalendar && (
              <Calendar
                onChange={setDateCalendar}
                value={dateCalendar}
                locale="ru-RU"
              />
            )}
            {dateError && (
              <div style={{ color: "#FD5839", marginTop: 5 }}>{dateError}</div>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.save} onClick={handleSubmit(onSubmit)}>
            Сохранить
          </button>

          <button className={styles.cancel} onClick={cancellation}>
            Отмена
          </button>
        </div>
        <ModalDeleteAccount
          active={modalDeleteAcc}
          setActive={openModalDeleteAcc}
        />
      </div>
    </div>
  );
};
