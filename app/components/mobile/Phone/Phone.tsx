import React, { useState } from "react";
import styles from "./Phone.module.scss";
import Input from "app/mobile/shared/ui/input/";
import Button from "app/mobile/shared/ui/button/";
import Header from "app/components/mobile/widgets/Header/Header";
import { api } from "app/store/services/passwordRestoreAPI";
import { useRouter } from "next/router";
import { usersApi } from "app/store/services/users";
import { cookie } from "app/utils/helpers/cookies.helpers";

const Phone = ({}) => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const { data } = usersApi.useGetMyInfoQuery("");

    const [editUserPhone] = usersApi.useUpdateUserMutation();
    const editPhone = async () => {
        try {
            let payload = {
                userId: cookie.get("t"),
                phoneNumber,
            };
            const res = await editUserPhone(payload);
            console.log(res);

            if ("data" in res && res.data.state === "0000") {
                router.push("/m/profile");
            }
            // console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <Header title="Смена телефона" />
            <div className={styles.content}>
                <div className={styles.content__flex}>
                    <Input
                        label="Телефон"
                        type="text"
                        placeholder="+7 (___) ___-__-__"
                        value={phoneNumber}
                        onChange={(e: any) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className={styles.content__btn}>
                    <Button
                        text="Сохранить"
                        type="submit"
                        onClick={editPhone}
                    />
                    <Button
                        text="Отмена"
                        colorText="#C9C9C9"
                        background="white"
                        border="1px solid #C9C9C9"
                        type="reset"
                        onClick={() => setPhoneNumber("")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Phone;
