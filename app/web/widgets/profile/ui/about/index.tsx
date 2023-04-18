import React, { useState } from "react";
import Image from "next/image";

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import logo from "app/assets/images/logo.svg";
import about_location from "app/assets/images/about_location.svg";
import profile__email from "app/assets/images/profile__email.svg";
import profile__tel from "app/assets/images/profile__tel.svg";
import about_arrow_up from "app/assets/images/about_arrow_up.svg";
import about_document from "app/assets/images/about-document.svg";

import styles from "./UserProfileAbout.module.scss";

export const UserProfileAbout = () => {
  // попап для открытия блока "документы"
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div className={styles.about}>
      <Image src={logo} width={150} height={40} alt="logo" />
      <p className={styles.about__description}>
        Сервис Мьюту - проводник в мир объявлений товаров и услуг. Купить,
        продать, выполнить или заказать. С сервисом Мьюту это становится очень
        просто. Актуальные объявления со всей страны в твоем мобильном
        устройстве. Размещай объявления товаров, предлагай свои услуги и клиент
        обязательно тебя найдет. Здесь ты всегда сможешь найти все, что тебе
        нужно. Не хочешь искать? Оставь запрос на интересующий товар или услугу,
        продавец сам с тобой свяжется. Ты обязательно получишь уведомление,
        чтобы ничего не пропустить.
      </p>
      <p className={styles.about__title}>Контакты</p>
      <div className={styles.about__location}>
        <div className={styles.about__location_info}>
          <Image src={about_location} width={24} height={24} alt="location" />
          <p>Фактический адрес: 428003, Чебоксары, ул. Калинина, 80Б</p>
        </div>
        <div style={{ width: "100%", height: 229 }}>
          <YMaps>
            <Map
              defaultState={{ center: [56.138905, 47.27041], zoom: 18 }}
              width="100%"
              height="100%"
            >
              <Placemark defaultGeometry={[56.138905, 47.27041]} />
            </Map>
          </YMaps>
        </div>
      </div>
      <div className={styles.about__email}>
        <a href="mailto:info@myutu.ru">
          <Image src={profile__email} width={24} height={24} alt="email" />
          <p>info@myutu.ru</p>
        </a>
      </div>
      <div className={styles.about__tel}>
        <a href={`tel:89061327863`}>
          <Image src={profile__tel} width={24} height={24} alt="tel" />
          <p>+7 (906) 132-78-63</p>
        </a>
      </div>
      {/* docs */}
      <div className={styles.about__docs}>
        <div className={styles.about__docs_title}>
          <p>Документы</p>
          <div
            className={styles.about__docs_arrow}
            onClick={() => setDocsOpen(!docsOpen)}
          >
            <Image
              src={about_arrow_up}
              alt="arrow"
              style={{
                transform: !docsOpen ? "rotate(0deg)" : "rotate(-180deg)",
              }}
            />
          </div>
        </div>
        {docsOpen && (
          <div className={styles.about__docs_items}>
            <a
              href="https://myutu.ru/documents/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.about__docs_item}>
                <Image
                  src={about_document}
                  width={24}
                  height={24}
                  alt="document"
                />
                <p>Пользовательское соглашение</p>
              </div>
            </a>
            <a
              href="https://myutu.ru/documents/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.about__docs_item}>
                <Image
                  src={about_document}
                  width={24}
                  height={24}
                  alt="document"
                />
                <p>Политика конфеденциальности</p>
              </div>
            </a>
            <a
              href="https://myutu.ru/documents/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%20%D0%BE%D1%84%D0%B5%D1%80%D1%82%D0%B0.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.about__docs_item}>
                <Image
                  src={about_document}
                  width={24}
                  height={24}
                  alt="document"
                />
                <p>Договор оферты</p>
              </div>
            </a>
          </div>
        )}
      </div>

      <div className={styles.about__company}>
        <p className={styles.about__title}>Информация о разработчике</p>
        <a href="https://ekspa.io/" className={styles.about__company_link}>
          Ссылка на сайт разработчика
        </a>
        <p className={styles.about__company_info}>
          Экспа Софтвар, ИНН: 2130124339
        </p>
        <p className={styles.about__company_info}>
          Умные цифровые решения для автоматизации и роста бизнеса
        </p>
      </div>
    </div>
  );
};

// import React, { useState } from "react";
// import Image from "next/image";

// import { ymapsSetInit } from "app/utils/helpers/ymaps.helpers";

// import logo from "app/assets/images/logo.svg";
// import about_location from "app/assets/images/about_location.svg";
// import profile__email from "app/assets/images/profile__email.svg";
// import profile__tel from "app/assets/images/profile__tel.svg";
// import about_map from "app/assets/images/about_map.png";
// import about_arrow_up from "app/assets/images/about_arrow_up.svg";
// import about_document from "app/assets/images/about-document.svg";

// import styles from "./UserProfileAbout.module.scss";

// export const UserProfileAbout = () => {
//   // попап для открытия блока "документы"
//   const [docsOpen, setDocsOpen] = useState(false);

//   return (
//     <div className={styles.about}>
//       <Image src={logo} width={150} height={40} alt="logo" />
//       <p className={styles.about__description}>
//         Сервис Мьюту - проводник в мир объявлений товаров и услуг. Купить,
//         продать, выполнить или заказать. С сервисом Мьюту это становится очень
//         просто. Актуальные объявления со всей страны в твоем мобильном
//         устройстве. Размещай объявления товаров, предлагай свои услуги и клиент
//         обязательно тебя найдет. Здесь ты всегда сможешь найти все, что тебе
//         нужно. Не хочешь искать? Оставь запрос на интересующий товар или услугу,
//         продавец сам с тобой свяжется. Ты обязательно получишь уведомление,
//         чтобы ничего не пропустить.
//       </p>
//       <p className={styles.about__title}>Контакты</p>
//       <div className={styles.about__location}>
//         <div className={styles.about__location_info}>
//           <Image src={about_location} width={24} height={24} alt="location" />
//           <p>Фактический адрес: 428003, Чебоксары, ул. Калинина, 80Б</p>
//         </div>
//         <Image src={about_map} alt="map" width={878} height={229} />
//       </div>
//       <div className={styles.about__email}>
//         <Image src={profile__email} width={24} height={24} alt="email" />
//         <p>info@myutu.ru</p>
//       </div>
//       <div className={styles.about__tel}>
//         <Image src={profile__tel} width={24} height={24} alt="tel" />
//         <p>+7 (906) 132-78-63</p>
//       </div>
//       {/* docs */}
//       <div className={styles.about__docs}>
//         <div className={styles.about__docs_title}>
//           <p>Документы</p>
//           <div
//             className={styles.about__docs_arrow}
//             onClick={() => setDocsOpen(!docsOpen)}
//           >
//             <Image src={about_arrow_up} alt="arrow" />
//           </div>
//         </div>
//         {docsOpen && (
//           <div className={styles.about__docs_items}>
//             <a
//               href="https://myutu.ru/documents/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.pdf"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <div className={styles.about__docs_item}>
//                 <Image
//                   src={about_document}
//                   width={24}
//                   height={24}
//                   alt="document"
//                 />
//                 <p>Пользовательское соглашение</p>
//               </div>
//             </a>
//             <a
//               href="https://myutu.ru/documents/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82.pdf"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <div className={styles.about__docs_item}>
//                 <Image
//                   src={about_document}
//                   width={24}
//                   height={24}
//                   alt="document"
//                 />
//                 <p>Политика конфеденциальности</p>
//               </div>
//             </a>
//             <a
//               href="https://myutu.ru/documents/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%20%D0%BE%D1%84%D0%B5%D1%80%D1%82%D0%B0.pdf"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <div className={styles.about__docs_item}>
//                 <Image
//                   src={about_document}
//                   width={24}
//                   height={24}
//                   alt="document"
//                 />
//                 <p>Договор оферты</p>
//               </div>
//             </a>
//           </div>
//         )}
//       </div>

//       <div className={styles.about__company}>
//         <p className={styles.about__title}>Информация о разработчике</p>
//         <a href="https://ekspa.io/" className={styles.about__company_link}>
//           Ссылка на сайт разработчика
//         </a>
//         <p className={styles.about__company_info}>
//           Экспа Софтвар, ИНН: 2130124339
//         </p>
//         <p className={styles.about__company_info}>
//           Умные цифровые решения для автоматизации и роста бизнеса
//         </p>
//       </div>
//     </div>
//   );
// };
