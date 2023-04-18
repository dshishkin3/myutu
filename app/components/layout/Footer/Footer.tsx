import {
  ImgAvailableGP,
  ImgAvailableRustore,
  ImgTelegramFooter,
} from "app/web/shared/config/images";
import Image from "next/image";
import Link from "next/link";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__documents}>
        <Link href="https://storage.yandexcloud.net/myutu/docs/user_agreements.pdf">
          <a className={style.footer__link} target="_blank" rel="noreferrer">
            Пользовательское соглашение
          </a>
        </Link>
        <Link href="https://storage.yandexcloud.net/myutu/docs/politica_konfidecialnosti.pdf">
          <a className={style.footer__link} target="_blank" rel="noreferrer">
            Политика конфиденциальности
          </a>
        </Link>
      </div>
      <div className={style.footer__social}>
        <h5 className={style.label}>Мьюту в социальных сетях</h5>

        <Link href="https://t.me/Myutu_support">
          <a target="_blank" rel="noreferrer">
            <Image src={ImgTelegramFooter} alt="Телеграм" />
          </a>
        </Link>
      </div>
      <div className={style.footer__apps}>
        <h5 className={style.label}>Мобильное приложение Мьюту</h5>
        <div className={style.row}>
          <Link href="https://play.google.com/store/apps/details?id=com.wayos">
            <a target="_blank" rel="noreferrer">
              <Image src={ImgAvailableGP} alt="Доступно в google play" />
            </a>
          </Link>
          <Link href="https://apps.rustore.ru/app/com.wayos">
            <a target="_blank" rel="noreferrer">
              <Image src={ImgAvailableRustore} alt="Доступно в rustore" />
            </a>
          </Link>
        </div>
      </div>
      <div>
        <h5 className={style.footer__name}>
          ©Мьюту {new Date().getFullYear()}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
