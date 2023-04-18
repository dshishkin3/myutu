import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { Calendar } from "react-calendar";
import moment from "moment";

import {
  AdButton,
  DateInput,
  InputField,
  TextareaField,
  TimeInput,
} from "app/web/shared/ui";
import { IAd } from "app/web/widgets/ad/model";
import CreateAdMap from "app/web/shared/ui/create-ad-map";
import { ICreateAd } from "app/models/models";
import { DealFormValues } from "../../model";

import clock from "app/assets/images/ad_clock.svg";
import menu_date from "app/assets/images/profile_menu-date.svg";
import close from "app/assets/images/closeModalMenu.svg";

import styles from "./style.module.scss";

interface IModalInfoDeal {
  active: boolean;
  setActive: () => void;
  ad: IAd;
}

export const ModalInfoDeal: FC<IModalInfoDeal> = ({
  active,
  setActive,
  ad,
}) => {
  // current link
  const [currentLink, setCurrentLink] = useState("");
  // открыть календарь
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateCalendar, setDateCalendar] = useState(new Date());
  // address
  const [values, setValues] = useState<ICreateAd>({} as ICreateAd);
  // comemnt
  const [comment, setComment] = useState("");

  const [form, setForm] = useState({
    date: "01.01.2000",
    timeFrom: "",
    timeTo: "",
  });

  // hook form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DealFormValues>();

  useEffect(() => {
    setCurrentLink(window.location.href);
  }, []);

  // запись даты объявления
  useEffect(() => {
    if (ad && ad.placementDate) {
      setDateCalendar(new Date(setFormatDDMMYYYYtoMMDDYYYY(ad.placementDate)));
      setForm({
        ...form,
        date: ad.placementDate,
      });
    }
  }, [ad]);

  // отправка формы
  const onSubmit: SubmitHandler<DealFormValues> = (data) => {
    if (!errors.timeFrom) {
      console.log(form);
    }
  };

  // change address
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // change time from
  const timeFromChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, timeFrom: event.target.value.replaceAll(" ", "") });
    setValue("timeFrom", event.target.value.replaceAll(" ", ""));
  };

  // change time to
  const timeToChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, timeTo: event.target.value.replaceAll(" ", "") });
    setValue("timeTo", event.target.value.replaceAll(" ", ""));
  };

  const setFormatDDMMYYYYtoMMDDYYYY = (date: string, separator = ".") => {
    const [day, month, year] = date.split(".");
    return month + separator + day + separator + year;
  };

  // изменение даты
  const changeDate = (e: any) => {
    setForm({
      ...form,
      date: e.target.value,
    });
  };

  // закрыть попап через крестик
  const closePopup = () => {
    setActive();
  };

  return (
    <>
      <div
        className={`${active ? styles.modal__active : styles.modal}`}
        onClick={setActive}
      >
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal__content_header}>
            <p>Условия сделки</p>
            <div className={styles.modal__content_header_close}>
              <Image
                onClick={closePopup}
                src={close}
                alt="close"
                width={16}
                height={16}
              />
            </div>
          </div>
          {/* form */}
          <div className={styles.modal__content_form}>
            <label>
              Выберите время сделки
              <div className={styles.modal__content_form_block}>
                <div className={styles.modal__content_form_input}>
                  <div>
                    <p>от</p>
                    <div>
                      <TimeInput
                        value={form.timeFrom}
                        onChange={timeFromChange}
                      >
                        <InputField
                          type="text"
                          handleChange={timeFromChange}
                          placeholderText="10:00"
                          style={{ paddingLeft: 38 }}
                          {...register("timeFrom", {
                            required: "Это поле обязательно",

                            pattern: {
                              value: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
                              message: "Введите время в формате ЧЧ:ММ",
                            },
                          })}
                          maxLength={5}
                        />
                      </TimeInput>
                      <div className={styles.modal__content_form_inputImg}>
                        <Image src={clock} alt="clock" width={24} height={24} />
                      </div>
                    </div>
                  </div>
                  {errors.timeFrom && (
                    <div
                      style={{ color: "#FD5839", marginTop: 5, fontSize: 14 }}
                    >
                      {errors.timeFrom.message}
                    </div>
                  )}
                </div>
                <div className={styles.modal__content_form_input}>
                  <div>
                    <p>до</p>
                    <div>
                      <TimeInput value={form.timeTo} onChange={timeToChange}>
                        <InputField
                          type="text"
                          handleChange={timeToChange}
                          placeholderText="10:00"
                          style={{ paddingLeft: 38 }}
                          {...register("timeTo", {
                            required: "Это поле обязательно",

                            pattern: {
                              value: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
                              message: "Введите время в формате ЧЧ:ММ",
                            },
                          })}
                          maxLength={5}
                        />
                      </TimeInput>
                      <div className={styles.modal__content_form_inputImg}>
                        <Image src={clock} alt="clock" width={24} height={24} />
                      </div>
                    </div>
                  </div>
                  {errors.timeTo && (
                    <div
                      style={{ color: "#FD5839", marginTop: 5, fontSize: 14 }}
                    >
                      {errors.timeTo.message}
                    </div>
                  )}
                </div>
              </div>
            </label>
            <div className={styles.feedback__form_input}>
              <label htmlFor="Name" className="block text-black mb-1">
                Выберите дату сделки
              </label>
              <div className={styles.date}>
                <DateInput value={form.date} onChange={changeDate}></DateInput>

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

            <label>Адрес совершения сделки</label>
            <CreateAdMap
              values={values}
              setValues={setValues}
              handleInputChange={handleInputChange}
            />
            {!ad?.isAuthor && (
              <div className={styles.modal__content_form_commentSeller}>
                <label>
                  Комментарий продавца <span>(@{ad?.authorInfo.userName})</span>
                </label>
                <div className={styles.modal__content_form_commentSellerText}>
                  Текст
                </div>
              </div>
            )}
            <div className={styles.modal__content_form_comment}>
              <label htmlFor="Login" className="block text-black mb-1">
                Мой комментарий
              </label>
              <TextareaField
                type="textarea"
                value={comment}
                id="comment"
                name="comment"
                placeholderText="Введите комментарий"
                handleChange={(e: any) => setComment(e.target.value)}
                style={{ paddingBottom: 25 }}
                maxLength={300}
              />
              <p>Не более 300 символов</p>
            </div>
          </div>
          <div className={styles.modal__content_button}>
            <AdButton
              background="linear-gradient(90deg, #2AC6FA 0%, #0C8AFF 100%)"
              color="#fff"
              maxWidth={290}
              onClick={handleSubmit(onSubmit)}
            >
              Забронировать
            </AdButton>
          </div>
        </div>
      </div>
    </>
  );
};
