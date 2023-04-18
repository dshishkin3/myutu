import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Calendar } from "react-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

import { cookie } from "app/utils/helpers/cookies.helpers";
import { RootState } from "app/store/store";
import { feedbacksApi } from "app/store/services/feedbacks";

import { InputField, TextareaField } from "app/web/shared/ui";
import { FeedbackUpload } from "app/web/features/profile";

import chel2 from "app/assets/images/chel2.svg";
import request from "app/assets/images/support_request.svg";
import like from "app/assets/images/support_like.svg";
import menu_date from "app/assets/images/profile_menu-date.svg";
import closeCircle from "app/assets/images/close-circle.svg";

import styles from "./BugReport.module.scss";
import Header from "../widgets/Header/Header";

export const BugReport: FC = () => {
    const profile = useSelector((state: RootState) => state.profile);
    const [addFeedbackQuery] = feedbacksApi.useAddFeedbackMutation();
    // заявка об ошибке или превью
    const [selectedRequest, setSelectedRequest] = useState(false);
    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [form, setForm] = useState<FeedbackForm>({
        login: profile.login,
        time: "",
        date: "",
        description: "",
        steps: {},
    });
    // открыть календарь
    const [openCalendar, setOpenCalendar] = useState(false);
    // steps
    const [steps, setSteps] = useState<{ [key: number]: string }>({});

    // upload photo & video
    const [values, setValues] = useState<any>();
    const [localeLinkPreview, setLocaleLinkPreview] = useState<string>("");
    const [localeLinkVideo, setLocaleLinkVideo] = useState<string>("");

    const router = useRouter();

    interface FeedbackForm {
        login: string;
        time: string;
        date: string;
        description: string;
        steps: {};
    }

    interface FeedbackFormValues {
        time: string;
        description: string;
    }

    // hook form
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FeedbackFormValues>();

    // отправка формы
    const onSubmit: SubmitHandler<FeedbackFormValues> = (data) => {
        if (!errors.time && !errors.description) {
            sendForm();
        }
    };

    // подгрузка логина пользователя из стейта
    useEffect(() => {
        setForm({
            ...form,
            login: profile.login,
        });
    }, [profile]);

    // запись даты рождения в стейт
    useEffect(() => {
        setForm({
            ...form,
            date: moment(dateCalendar).format("DD.MM.YYYY") + " ",
        });
    }, [dateCalendar]);

    useEffect(() => {
        var s = { ...steps };
        s[Object.keys(steps).length + 1] = "";
        setSteps(s);
    }, []);

    // функции для смены стейта инпутов
    const loginChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, login: event.target.value });
    };

    const timeChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, time: event.target.value.replaceAll(" ", "") });
        setValue("time", event.target.value.replaceAll(" ", ""));
    };

    const descChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, description: event.target.value });
        setValue("description", event.target.value);
    };

    // отправка обращения
    const sendForm = async () => {
        const payload = await addFeedbackQuery({
            userId: cookie.get("t"),
            description: form.description,
            date: form.date + form.time,
            steps: steps,
            filePath: values,
            platform: window.navigator.userAgent,
        }).unwrap();

        switch (payload.state) {
            case "0000":
                router.reload();
                break;

            default:
                break;
        }
    };

    // отчистка всех полей
    const clearForm = () => {
        setForm({
            ...form,
            description: "",
            steps: {},
            time: "",
        });

        setSteps({ 1: "" });
        setLocaleLinkPreview("");
        setLocaleLinkVideo("");
    };

    return (
        <div className={styles.container}>
            <Header title="Заявка об ошибке" />
            <div className={styles.content}>
                <>
                    {/* login */}
                    <div className={styles.feedback__form_input}>
                        <label
                            htmlFor="Login"
                            className="block text-black mb-1"
                        >
                            Логин
                        </label>
                        <InputField
                            type="text"
                            value={form.login}
                            name="login"
                            id="Login"
                            placeholderText="Введите логин"
                            handleChange={loginChange}
                            disable
                        />
                    </div>
                    {/* time */}
                    <div className={styles.feedback__form_input}>
                        <label
                            htmlFor="Login"
                            className="block text-black mb-1"
                        >
                            Время
                        </label>
                        <InputField
                            type="text"
                            value={form.time}
                            id="Time"
                            placeholderText="00:00"
                            handleChange={timeChange}
                            {...register("time", {
                                required: "Это поле обязательно",

                                pattern: {
                                    value: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
                                    message: "Введите время в формате ЧЧ:ММ",
                                },
                            })}
                            maxLength={5}
                        />
                        {errors.time && (
                            <div style={{ color: "#FD5839", marginTop: 5 }}>
                                {errors.time.message}
                            </div>
                        )}
                    </div>
                    {/* date */}
                    <div className={styles.feedback__form_input}>
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
                    </div>
                    <div className={styles.downloading}>
                        <FeedbackUpload
                            localeLinkPreview={localeLinkPreview}
                            localeLinkVideo={localeLinkVideo}
                            setLocaleLinkPreview={setLocaleLinkPreview}
                            setLocaleLinkVideo={setLocaleLinkVideo}
                            setValues={setValues}
                        />
                    </div>
                    {/* desc */}
                    <div className={`${styles.feedback__form_input} `}>
                        <label
                            htmlFor="Login"
                            className="block text-black mb-1"
                        >
                            Описание
                        </label>
                        <TextareaField
                            type="textarea"
                            value={form.description}
                            id="Desc"
                            placeholderText="Введите описание"
                            handleChange={descChange}
                            style={{ paddingBottom: 25 }}
                            {...register("description", {
                                required: "Это поле обязательно",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Описание должно состоять из более 5 символов",
                                },
                            })}
                            maxLength={1000}
                        />
                        {errors.description && (
                            <div style={{ color: "#FD5839", marginTop: 5 }}>
                                {errors.description.message}
                            </div>
                        )}
                        <p>Не более 1000 символов</p>
                    </div>
                    {/* steps */}
                    <div className={styles.feedback__form_input}>
                        <label>Шаги воспроизведения ошибки</label>
                        <div className="mt-1">
                            {Object.keys(steps).map((item: any, i: number) => (
                                <div
                                    className={styles.step__wrapper}
                                    key={"t" + i}
                                >
                                    <InputField
                                        name="step"
                                        className={`${styles.feedback__field} ${styles.feedback__step}`}
                                        handleChange={(e: any) => {
                                            e.target.style.height =
                                                e.target.scrollHeight +
                                                2 +
                                                "px";
                                            var s = { ...steps };
                                            s[item] = e.target.value;
                                            setSteps(s);
                                        }}
                                        type="text"
                                        value={steps[item]}
                                        id="Date"
                                        placeholderText={`Шаг ${item}`}
                                    ></InputField>
                                    <div
                                        className={styles.step__img}
                                        onClick={() => {
                                            if (
                                                Object.keys(steps).length !== 1
                                            ) {
                                                var s = { ...steps };
                                                delete s[item];
                                                setSteps(s);
                                            }
                                        }}
                                    >
                                        <Image
                                            height={24}
                                            width={24}
                                            src={closeCircle}
                                            alt="close"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                var s = { ...steps };
                                s[Object.keys(steps).length + 1] = "";
                                setSteps(s);
                            }}
                            className={styles.feedback_addStep}
                        >
                            Добавить еще шаг
                        </button>
                        {/* upload files */}

                        <div className={styles.buttons}>
                            <button
                                className={styles.save}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Отправить
                            </button>

                            <button
                                className={styles.cancel}
                                onClick={clearForm}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default BugReport;
