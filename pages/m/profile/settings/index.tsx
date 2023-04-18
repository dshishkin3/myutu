import React, { useState } from "react";
import styles from "./settings.module.scss";
import chel from "app/assets/images/chel.svg";
import Accordion from "app/components/mobile/Accordion/Accordion";
import Login from "app/components/mobile/Login/Login";
import Password from "app/components/mobile/Password/Password";
import Phone from "app/components/mobile/Phone/Phone";
import Header from "app/components/mobile/widgets/Header/Header";

const Index = () => {
    const [type, setType] = useState<string>("defalut");
    console.log(type);

    return (
        <div className={styles.container}>
            {type == "defalut" && (
                <>
                    <Header title="Настройки" />
                    <div onClick={() => setType("login")}>
                        <Accordion title="Логин" />
                    </div>
                    <div onClick={() => setType("password")}>
                        <Accordion title="Пароль" />
                    </div>
                    <div onClick={() => setType("phone")}>
                        <Accordion title="Телефон" />
                    </div>
                    <div className={styles.content}>
                        <img src={chel.src} alt="cat" />
                        <span>
                            Этот раздел поможет Вам изменить основные параметры
                            настроек
                        </span>
                    </div>
                </>
            )}
            {type == "login" && <Login />}
            {type == "password" && <Password />}
            {type == "phone" && <Phone />}
        </div>
    );
};

export default Index;
