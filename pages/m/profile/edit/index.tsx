import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import Calendar from "react-calendar";
import moment from "moment";
import { useRouter } from "next/router";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import portrait from "app/assets/images/portrait.svg";
import { DateInput, ModalDeleteAccount } from "app/web/shared/ui";
import { InputField } from "app/web/shared/ui/input-field";

import { usersApi } from "app/store/services/users";

import trash from "app/assets/images/profile__trash.svg";
import menu_date from "app/assets/images/profile_menu-date.svg";

import styles from "./edit.module.scss";
import Header from "app/components/mobile/widgets/Header/Header";
import ModalMenu from "app/mobile/shared/ui/modalMenu";
import ModalDelete from "app/components/mobile/Modal/ModalDelete/ModalDelete";

interface IEditOptions {
    value: string;
    label: string;
}

interface EditForm {
    name: string;
    surname: string;
    patronymicName: string;
    gender: string;
    dateOfBirth: string;
    userId: string;
}

// hook form types
interface FeedbackFormValues {
    time: string;
    description: string;
}

interface EditFormValues {
    name: string;
    surname: string;
    patronymicName: string;
}

// different types
interface SettingsForm {
    userId: string;
    login: string;
    phoneNumber: string;
}

interface FeedbackForm {
    login: string;
    time: string;
    date: string;
    description: string;
    steps: {};
}

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

const Index = () => {
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
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
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
        if (
            String(new Date()).slice(0, 16) !==
            String(dateCalendar).slice(0, 16)
        ) {
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
            event.target.value
                .replaceAll(" ", "")
                .replaceAll(/[^a-zа-яё\s]/gi, "")
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
            event.target.value
                .replaceAll(" ", "")
                .replaceAll(/[^a-zа-яё\s]/gi, "")
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
            event.target.value
                .replaceAll(" ", "")
                .replaceAll(/[^a-zа-яё\s]/gi, "")
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
        setCurrentGender(newValue.value);
    };

    // стили для react-select
    const style = {
        valueContainer: (base: any) => ({
            ...base,
            minHeight: 44,
            borderRadius: "15px",
        }),
    };

    const handleEditProfile = (e: any) => {
        e.preventDefault();
    };

    const { data } = usersApi.useGetMyInfoQuery("");

    return (
        <div className={styles.container}>
            <Header title="Редактировать профиль" />
            {data && (
                <div className={styles.content}>
                    <div className={styles.hat}>
                        <div className={styles.hat__up}>
                            <img src={portrait.src} alt="portrait" />
                            <span>Аккаунт</span>
                        </div>
                        <div className={styles.hat__down}>
                            <img src={data.image} alt="avatar" />
                            <p>{data.login}</p>
                        </div>
                    </div>
                    <form className={styles.form} onSubmit={handleEditProfile}>
                        <label htmlFor="Name" className="block text-black mb-1">
                            Имя
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
                                        message:
                                            "Имя должно состоять из более 2 символов",
                                    },
                                    maxLength: {
                                        value: 15,
                                        message:
                                            "Имя должно состоять не более чем из 15 символов",
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
                        </label>
                        <label htmlFor="Name" className="block text-black mb-1">
                            Фамилия
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
                                        message:
                                            "Фамилия должна состоять из более 2 символов",
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
                        </label>
                        <label htmlFor="Name" className="block text-black mb-1">
                            Отчество
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
                                        message:
                                            "Отчество должно состоять из более 2 символов",
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
                        </label>
                        <div className={styles.select}>
                            Пол
                            <Select
                                classNamePrefix="react-select"
                                onChange={onChange}
                                value={options.find(
                                    (item) => item.value === form.gender
                                )}
                                options={options}
                                isSearchable={false}
                                placeholder="Выберите пол"
                                minMenuHeight={46}
                                styles={style}
                            />
                        </div>
                        <div className="flex flex-col gap-y-[4px]">
                            <label className={styles.dateInput} htmlFor="Name">
                                Дата рождения
                            </label>
                            <div className={styles.date}>
                                <DateInput
                                    value={form.dateOfBirth || "."}
                                    onChange={changeDate}
                                ></DateInput>
                                <div
                                    className={styles.menu_date}
                                    onClick={() =>
                                        setOpenCalendar(!openCalendar)
                                    }
                                >
                                    <Image
                                        src={menu_date}
                                        width={24}
                                        height={24}
                                        alt="menuDate"
                                    />
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
                                <div style={{ color: "#FD5839", marginTop: 5 }}>
                                    {dateError}
                                </div>
                            )}
                        </div>
                        <div className={styles.position}>
                            <button
                                className={styles.position__save}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Сохранить
                            </button>
                            <button
                                className={styles.position__cansel}
                                onClick={cancellation}
                            >
                                Отмена
                            </button>
                        </div>
                        <button
                            className={styles.position__delete}
                            type="submit"
                            onClick={() => setIsModalActive(true)}
                        >
                            Удалить профиль
                        </button>
                    </form>
                </div>
            )}
            <ModalMenu
                active={isModalActive}
                setActive={() => setIsModalActive(false)}
            >
                <ModalDelete setActive={() => setIsModalActive(false)} />
            </ModalMenu>
        </div>
    );
};

export default Index;

// import React, { useState, useEffect } from "react";
// import styles from "./edit.module.scss";
// import portrait from "app/assets/images/portrait.svg";
// import arrowSelect from "app/assets/images/arrowSelect.svg";
// import calendar from "app/assets/images/calendar.svg";
// import ModalDelete from "app/components/mobile/Modal/ModalDelete/ModalDelete";
// import Select from "react-select";
// import { usersApi } from "app/store/services/users";
// import { useRouter } from "next/router";
// import Header from "app/components/mobile/widgets/Header/Header";
// import { cookie } from "app/utils/helpers/cookies.helpers";
// import ModalMenu from "app/mobile/shared/ui/modalMenu";

// const handleEditProfile = (e: any) => {
//     e.preventDefault();
// };

// interface IEditOptions {
//     value: string;
//     label: string;
// }

// export type EditForm = {
//     name: string;
//     surname: string;
//     patronymicName: string;
//     gender: string;
//     dateOfBirth: string;
//     userId: string;
// };

// const options: IEditOptions[] = [
//     {
//         value: "Male",
//         label: "Мужской",
//     },
//     {
//         value: "Female",
//         label: "Женский",
//     },
// ];

// const Index = () => {
//     const [myInfoQuery] = usersApi.useLazyGetMyInfoQuery();
//     const router = useRouter();
//     const [isModalActive, setIsModalActive] = useState<boolean>(false);
//     const [currentGender, setCurrentGender] = useState<string>("");

//     const [profile, setProfile] = useState({
//         name: "",
//         surname: "",
//         patronymicName: "",
//         gender: "",
//         dateOfBirth: "",
//         userId: "",
//     });

//     const getValue = () => {
//         return currentGender
//             ? options.find((c) => c.value === currentGender)
//             : "";
//     };

//     const onChange = (newValue: any) => {
//         setCurrentGender(newValue.value);
//     };

//     const { data } = usersApi.useGetMyInfoQuery("");

//     const [editProfile] = usersApi.useUpdateUserMutation();
//     const editUser = async () => {
//         try {
//             let payload = {
//                 userId: cookie.get("t"),
//                 surname: profile.surname,
//                 name: profile.name,
//                 patronymicName: profile.patronymicName,
//                 birthDate: profile.dateOfBirth,
//             };
//             const res = await editProfile(payload);
//             console.log(res);

//             if ("data" in res && res.data.state === "0000") {
//                 router.push("/m/profile");
//             }
//             // console.log(res.data, "asdasdas");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         myInfoQuery("")
//             .unwrap()
//             .then((data) => setProfile({ ...data }));
//     }, []);

//     return (
//         <div className={styles.container}>
//             <Header title="Редактировать профиль" />
//             {data && (
//                 <div className={styles.content}>
//                     <div className={styles.hat}>
//                         <div className={styles.hat__up}>
//                             <img src={portrait.src} alt="portrait" />
//                             <span>Аккаунт</span>
//                         </div>
//                         <div className={styles.hat__down}>
//                             <img src={data.image} alt="avatar" />
//                             <p>{data.login}</p>
//                         </div>
//                     </div>
//                     <form className={styles.form} onSubmit={handleEditProfile}>
//                         <label>
//                             Фамилия
//                             <input
//                                 type="text"
//                                 placeholder="Введите фамилию"
//                                 value={profile.surname}
//                                 onChange={(e) =>
//                                     setProfile((prev) => ({
//                                         ...prev,
//                                         surname: e.target.value,
//                                     }))
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Имя
//                             <input
//                                 type="text"
//                                 placeholder="Введите имя"
//                                 value={profile.name}
//                                 onChange={(e) =>
//                                     setProfile((prev) => ({
//                                         ...prev,
//                                         name: e.target.value,
//                                     }))
//                                 }
//                             />
//                         </label>
//                         <label>
//                             Отчество
//                             <input
//                                 type="text"
//                                 placeholder="Введите отчество"
//                                 value={profile.patronymicName}
//                                 onChange={(e) =>
//                                     setProfile((prev) => ({
//                                         ...prev,
//                                         patronymicName: e.target.value,
//                                     }))
//                                 }
//                             />
//                         </label>
//                         <div className={styles.select}>
//                             Пол
//                             <Select
//                                 classNamePrefix="react-select"
//                                 onChange={onChange}
//                                 value={options.find(
//                                     (item) => item.value === profile.gender
//                                 )}
//                                 options={options}
//                                 isSearchable={false}
//                                 placeholder="Выберите пол"
//                                 minMenuHeight={46}
//                             />
//                         </div>
//                         <label>
//                             Дата рождения
//                             <input
//                                 type="text"
//                                 placeholder="Выберите дату рождения"
//                                 value={profile.dateOfBirth}
//                                 onChange={(e) =>
//                                     setProfile((prev) => ({
//                                         ...prev,
//                                         dateOfBirth: e.target.value,
//                                     }))
//                                 }
//                             />
//                             <img src={calendar.src} alt="calendar" />
//                         </label>
//                         <div className={styles.position}>
//                             <button
//                                 className={styles.position__save}
//                                 type="submit"
//                                 onClick={editUser}
//                             >
//                                 Сохранить
//                             </button>
//                             <button
//                                 className={styles.position__cansel}
//                                 type="reset"
//                             >
//                                 Отмена
//                             </button>
//                         </div>
//                         <button
//                             className={styles.position__delete}
//                             type="submit"
//                             onClick={() => setIsModalActive(true)}
//                         >
//                             Удалить профиль
//                         </button>
//                     </form>
//                 </div>
//             )}
//             <ModalMenu
//                 active={isModalActive}
//                 setActive={() => setIsModalActive(false)}
//             >
//                 <ModalDelete setActive={() => setIsModalActive(false)} />
//             </ModalMenu>
//         </div>
//     );
// };

// export default Index;
