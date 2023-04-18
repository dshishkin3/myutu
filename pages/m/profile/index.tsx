import React, { useEffect } from "react";
import style from "./Profile.module.scss";
import ProfileInfo from "../../../app/components/mobile/Profile/ProfileInfo/ProfileInfo";
import SectionList from "../../../app/components/mobile/Profile/SectionList/SectionList";
import { api } from "app/store/services/passwordRestoreAPI";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { RootState } from "app/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Index = () => {
    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authentication
    );
    console.log(isLoggedIn, "Залогинился / не залогинился (profile)");
    const router = useRouter();

    const menuData = [
        { title: "Мои объявления", route: "/m/profile/myads" },
        { title: "Мои сделки", route: "/m/deals" },
        { title: "Избранное", route: "/m/profile/favorites" },
        { title: "Настройки", route: "/m/profile/settings" },
        { title: "Служба поддержки", route: "/m/profile/support" },
        { title: "О сервисе", route: "/m/profile/about" },
    ];

    return (
        <div className={style.container}>
            <ProfileInfo />
            <div className={style.sectionListWrapper}>
                <SectionList menuData={menuData} />
            </div>
        </div>
    );
};

export default Index;
