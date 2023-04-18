import React, { useState } from "react";
import styles from "./About.module.scss";
import Header from "app/components/mobile/widgets/Header/Header";
import logo from "app/assets/images/logo.svg";
import iconAddress from "app/assets/images/iconAddress.svg";
import map from "app/assets/images/map.svg";
import email from "app/assets/images/email.svg";
import call from "app/assets/images/call.svg";
import documentAbout from "app/assets/images/documentAbout.svg";
import arrow from "app/assets/images/arrowAccordion.svg";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import Link from "next/link";
import { Route } from "react-router";
import { useRouter } from "next/router";

const Index = ({}) => {
    const [isShowDoc, setIsShowDoc] = useState<boolean>(false);
    const router = useRouter();

    const document = [
        {
            id: 1,
            text: "Пользовательское соглашение",
            link: "https://myutu.ru/documents/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.pdf",
        },
        {
            id: 2,
            text: "Политика конфеденциальности",
            link: "https://myutu.ru/documents/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82.pdf",
        },
        {
            id: 3,
            text: "Договор оферты",
            link: "https://myutu.ru/documents/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%20%D0%BE%D1%84%D0%B5%D1%80%D1%82%D0%B0.pdf",
        },
        // {
        //     id: 4,
        //     text: "Реквизиты",
        // },
        // {
        //     id: 5,
        //     text: "Описание сферы деятельности",
        // },
        // {
        //     id: 6,
        //     text: "Способ оплаты",
        // },
        // {
        //     id: 7,
        //     text: "Описание возврата товара и услуг",
        // },
        // {
        //     id: 8,
        //     text: "Условия доставки товара",
        // },
        // {
        //     id: 9,
        //     text: "Описание процесса передачи данных",
        // },
    ];
    return (
        <div className={styles.container}>
            <Header title="О сервисе" />
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img src={logo.src} alt="logo" />
                </div>
                <div className={styles.text}>
                    <span>
                        Сервис Мьюту - проводник в мир объявлений товаров и
                        услуг. Купить, продать, выполнить или заказать. С
                        сервисом Мьюту это становится очень просто. Актуальные
                        объявления со всей страны в твоем мобильном устройстве.
                        Размещай объявления товаров, предлагай свои услуги и
                        клиент обязательно тебя найдет.{" "}
                    </span>
                    <span>
                        Здесь ты всегда сможешь найти все, что тебе нужно. Не
                        хочешь искать? Оставь запрос на интересующий товар или
                        услугу, продавец сам с тобой свяжется. Ты обязательно
                        получишь уведомление, чтобы ничего не пропустить.
                    </span>
                </div>
                <div className={styles.title}>
                    <p>Контакты</p>
                    <div className={styles.info}>
                        <div className={styles.info__item}>
                            <img src={iconAddress.src} alt="iconAddress" />
                            <span>
                                Фактический адрес: 428003, Чебоксары, ул.
                                Калинина, 80Б
                            </span>
                        </div>
                        <div className={styles.info__map}>
                            <YMaps>
                                <Map
                                    defaultState={{
                                        center: [56.138905, 47.27041],
                                        zoom: 18,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Placemark
                                        defaultGeometry={[56.138905, 47.27041]}
                                    />
                                </Map>
                            </YMaps>
                        </div>
                        <div className={styles.info__item}>
                            <img src={email.src} alt="email" />
                            <span>info@myutu.ru</span>
                        </div>
                        <div className={styles.info__item}>
                            <img src={call.src} alt="call" />
                            <span>+7 (906) 132-78-63</span>
                        </div>
                    </div>
                </div>
                <div className={styles.title}>
                    <div className={styles.title__doc}>
                        <div
                            className={styles.title__doc__flex}
                            onClick={() => setIsShowDoc((prev) => !prev)}
                        >
                            <p>Документы</p>
                            <img
                                src={arrow.src}
                                alt="arrow"
                                style={{
                                    transform: isShowDoc
                                        ? "rotate(-90deg)"
                                        : "rotate(90deg)",
                                }}
                            />
                        </div>
                        <>
                            {isShowDoc &&
                                document.map((doc: any) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                router.push(doc.link)
                                            }
                                            className={styles.doc}
                                            key={doc.id}
                                        >
                                            <img src={documentAbout.src} />
                                            <p>{doc.text}</p>
                                        </div>
                                    );
                                })}
                        </>
                    </div>
                </div>
                <div className={styles.title}>
                    <p>Информация о разработчике</p>
                    <div className={styles.title__info}>
                        <Link href={"https://ekspa.io/"}>
                            <span className={styles.title__info__link}>
                                Ссылка на сайт разработчика
                            </span>
                        </Link>
                        <span>Экспа Софтвар, ИНН: 2130124339</span>
                        <span>
                            Умные цифровые решения для автоматизации и роста
                            бизнеса
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
