import ads from "app/assets/images/profileMenu_ads.svg";
import deals from "app/assets/images/profileMenu_deals.svg";
import favorites from "app/assets/images/profileMenu_favorites.svg";
import settings from "app/assets/images/profileMenu_settings.svg";
import help from "app/assets/images/profileMenu_help.svg";
import about from "app/assets/images/profileMenu_about.svg";

export const menu = [
    {
        title: "Мои объявления",
        key: "myads",
        img: ads,
    },
    // {
    //   title: "Мои отзывы",
    //   key: "reviews",
    // },
    {
        title: "Мои сделки",
        key: "deals",
        img: deals,
    },
    {
        title: "Избранное",
        key: "favorites",
        img: favorites,
    },
    {
        title: "Настройки",
        key: "settings",
        img: settings,
    },
    {
        title: "Служба поддержки",
        key: "feedback",
        img: help,
    },
    {
        title: "О сервисе",
        key: "about",
        img: about,
    },
];







