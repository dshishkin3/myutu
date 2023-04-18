import React, { ChangeEvent, useState } from "react";
import styles from "./style.module.scss";
import clock from "app/assets/images/clock.svg";
import calendar from "app/assets/images/calendar.svg";
import Router, { useRouter } from "next/router";
import { usersApi } from "app/store/services/users";
import { cookie } from "app/utils/helpers/cookies.helpers";
import locationBlue from "app/assets/images/locationBlue.svg";
import menu_date from "app/assets/images/profile_menu-date.svg";
import { Calendar } from "react-calendar";
import { InputField, TextareaField } from "app/web/shared/ui";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { transfersApi } from "app/store/services/transfer";

interface FeedbackForm {
    time1: string;
    time2: string;
    date: string;
    description: string;
}

interface FeedbackFormValues {
    time1: string;
    time2: string;
    description: string;
}

const DealsCard = ({ setActive }: any) => {
    const router = useRouter();
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [form, setForm] = useState<FeedbackForm>({
        time1: "",
        time2: "",
        date: "",
        description: "",
    });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FeedbackFormValues>();

    const timeChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, time1: event.target.value.replaceAll(" ", "") });
        setValue("time1", event.target.value.replaceAll(" ", ""));
        setValue("time2", event.target.value.replaceAll(" ", ""));
    };

    return (
        <>
            <p className={styles.text}>Сделка</p>
            <div className={styles.time}>
                <form>
                    {/* <label>
                        Выберите время сделки
                        <div className={styles.input__two}>
                            <input type="time" placeholder="от" />
                            <input type="time" placeholder="до" />
                        </div>
                        <img src={clock.src} alt="clock" />
                        <img
                            className={styles.input__two__clock}
                            src={clock.src}
                            alt="clock"
                        />
                    </label> */}
                    <label>
                        Выберите время сделки
                        <div className={styles.input__two}>
                            <InputField
                                type="text"
                                value={form.time1}
                                id="Time_1"
                                placeholderText="от 00:00"
                                handleChange={timeChange}
                                {...register("time1", {
                                    required: "Это поле обязательно",

                                    pattern: {
                                        value: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
                                        message:
                                            "Введите время в формате ЧЧ:ММ",
                                    },
                                })}
                                maxLength={5}
                            />
                            {errors.time1 && (
                                <div style={{ color: "#FD5839", marginTop: 5 }}>
                                    {errors.time1.message}
                                </div>
                            )}
                            <InputField
                                type="text"
                                value={form.time2}
                                id="Time_2"
                                placeholderText="до 00:00"
                                handleChange={timeChange}
                                {...register("time2", {
                                    required: "Это поле обязательно",

                                    pattern: {
                                        value: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
                                        message:
                                            "Введите время в формате ЧЧ:ММ",
                                    },
                                })}
                                maxLength={5}
                            />
                            {errors.time2 && (
                                <div style={{ color: "#FD5839", marginTop: 5 }}>
                                    {errors.time2.message}
                                </div>
                            )}
                        </div>
                    </label>
                    <label style={{ gap: openCalendar ? "0px" : "4px" }}>
                        Выберите дату сделки
                        <InputField
                            type="text"
                            value={form.date}
                            name="date"
                            id="Date"
                            placeholderText="Выберите дату"
                            handleChange={() => {}}
                            style={{
                                borderRadius: openCalendar
                                    ? "8px 8px 0px 0px"
                                    : "8px",
                            }}
                        />
                        <img
                            src={calendar.src}
                            alt="calendar"
                            onClick={() => setOpenCalendar((prev) => !prev)}
                        />
                        {openCalendar && (
                            <Calendar
                                onChange={setDateCalendar}
                                value={dateCalendar}
                                locale="ru-RU"
                            />
                        )}
                    </label>

                    {/* <div className={styles.feedback__form_input}>
                        <label htmlFor="Name" className="block text-black mb-1">
                            Дата
                        </label>
                        <div className={styles.date}>
                            <InputField
                                type="text"
                                value={form.date}
                                name="date"
                                id="Date"
                                placeholderText="Выберите дату"
                                handleChange={() => {}}
                                style={{
                                    borderRadius: openCalendar
                                        ? "8px 8px 0px 0px"
                                        : "8px",
                                }}
                            />

                            <div
                                className={styles.menu_date}
                                onClick={() => setOpenCalendar(!openCalendar)}
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
                    </div> */}

                    <label>
                        Адрес совершения сделки
                        <input placeholder="Выберите адрес" />
                        <img src={locationBlue.src} alt="locationBlue" />
                    </label>
                    <label>
                        Мой комментарий
                        <textarea
                            placeholder="Введите описание"
                            maxLength={300}
                        />
                        <span>Не более 300 символов</span>
                    </label>
                    <label>
                        Комментарий покупателя (@ivan)
                        <textarea disabled />
                    </label>
                </form>
            </div>
            <div className={styles.modal__content}>
                <button className={styles.modal__content__left}>
                    Редактировать
                </button>
                <button
                    className={styles.modal__content__right}
                    onClick={() => setActive(false)}
                >
                    Отмена
                </button>
            </div>
        </>
    );
};

export default DealsCard;
