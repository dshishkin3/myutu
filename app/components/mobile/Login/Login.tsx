import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import Input from "app/mobile/shared/ui/input";
import Button from "app/mobile/shared/ui/button";
import { api } from "app/store/services/passwordRestoreAPI";
import { useRouter } from "next/router";
import Header from "app/components/mobile/widgets/Header/Header";
import { usersApi } from "app/store/services/users";
import { cookie } from "app/utils/helpers/cookies.helpers";

const Login = ({}) => {
    const router = useRouter();
    const [login, setLogin] = useState<any>({});
    const [myInfoQuery] = usersApi.useLazyGetMyInfoQuery();

    const { data } = usersApi.useGetMyInfoQuery("");

    const [editProfile] = usersApi.useUpdateUserMutation();
    const editUser = async () => {
        try {
            let payload = {
                userId: cookie.get("t"),
                login,
            };
            const res = await editProfile(payload);

            if ("data" in res && res.data.state === "0000") {
                router.push("/m/profile");
            }
            // console.log(res.data, "asdasdas");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        myInfoQuery("")
            .unwrap()
            .then((data) => setLogin({ ...data }));
    }, []);

    console.log(login.login, "login");

    // кнопка "отмена" - очищает все поля
    const cancellation = () => {
        setLogin(login);
    };

    return (
        <div className={styles.container}>
            <Header title="Смена логина" />
            <div className={styles.content}>
                <div className={styles.content__flex}>
                    <Input
                        label="Логин"
                        type="text"
                        placeholder="Введите логин"
                        value={login?.login}
                        onChange={(e) =>
                            setLogin((prev: any) => ({
                                ...prev,
                                login: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className={styles.content__btn}>
                    <Button text="Сохранить" type="submit" onClick={editUser} />
                    <Button
                        text="Отмена"
                        colorText="#C9C9C9"
                        background="white"
                        border="1px solid #C9C9C9"
                        type="reset"
                        onClick={cancellation}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import styles from "./Login.module.scss";
// import Input from "app/mobile/shared/ui/input";
// import Button from "app/mobile/shared/ui/button";
// import { api } from "app/store/services/passwordRestoreAPI";
// import { useRouter } from "next/router";
// import Header from "app/components/mobile/widgets/Header/Header";
// import { usersApi } from "app/store/services/users";
// import { cookie } from "app/utils/helpers/cookies.helpers";

// const Login = ({}) => {
//     const router = useRouter();
//     const [login, setLogin] = useState<any>({});
//     const [myInfoQuery] = usersApi.useLazyGetMyInfoQuery();

//     const { data } = usersApi.useGetMyInfoQuery("");

//     const [editProfile] = usersApi.useUpdateUserMutation();
//     const editUser = async () => {
//         try {
//             let payload = {
//                 userId: cookie.get("t"),
//                 login,
//             };
//             const res = await editProfile(payload);

//             if ("data" in res && res.data.state === "0000") {
//                 router.push("/m/profile");
//             }
//             // console.log(res.data, "asdasdas");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         myInfoQuery("")
//             .unwrap()
//             .then((data) => setLogin({ ...data }));
//     }, []);

//     console.log(data, "data");
//     console.log(login, "login");

//     // кнопка "отмена" - очищает все поля
//     const cancellation = () => {
//         setLogin(login);
//     };

//     return (
//         <div className={styles.container}>
//             <Header title="Смена логина" />
//             <div className={styles.content}>
//                 <div className={styles.content__flex}>
//                     <Input
//                         label="Логин"
//                         type="text"
//                         placeholder="Введите логин"
//                         value={login?.login}
//                         onChange={(e) =>
//                             setLogin((prev: any) => ({
//                                 ...prev,
//                                 login: e.target.value,
//                             }))
//                         }
//                     />
//                 </div>

//                 <div className={styles.content__btn}>
//                     <Button text="Сохранить" type="submit" onClick={editUser} />
//                     <Button
//                         text="Отмена"
//                         colorText="#C9C9C9"
//                         background="white"
//                         border="1px solid #C9C9C9"
//                         type="reset"
//                         onClick={cancellation}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
