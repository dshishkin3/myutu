import React, { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useDebounce } from "usehooks-ts";
import { toggleIsOpenModalCity } from "app/web/features/header/model/headerSlice";
import { Autocomplete } from "app/web/shared/ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { infoApi } from "app/store/services/info";
import { useRouter } from "next/router";
import { Button } from "app/web/shared/ui";
import { ImgCloseModal } from "app/web/shared/config/images";
import Image from "next/image";
import locationBlue from "app/assets/images/locationBlue.svg";
import { setCity } from "app/store/slices/profileSlice";

const CitySelection = ({ setActive }: any) => {
    const [text, setText] = useState<string>(""); // Стейт для введенных значений
    const [value, setValue] = useState<{ label: string; value: number }>({
        label: "",
        value: 0,
    }); // Стейт для выбранного значения
    const [getCitiesByNameQuery] = infoApi.useLazyGetCitiesByNameQuery(); // Запрос на получение городов
    const [cities, setCities] = useState([]); // Стейт для городов
    const dispatch = useDispatch();
    const debauncedCity = useDebounce(text, 500); // Хук для выполнения запроса через определенное время

    // Обработчик изменения значения
    const handleChange = ({ label, value }: any) => {
        setValue({ label, value: +value });
        setText(label);
        setCities([]);
    };

    // Обработчик поиска городов по введенномуз значению
    const handleSearch = async () => {
        if (text === "") {
            setCities([]);
            return false;
        }
        try {
            const payload = await getCitiesByNameQuery(text).unwrap();
            let transform = payload.map((key: any) => ({
                label: key.name,
                value: key.id,
            }));
            setCities(transform);
        } catch (error) {
            throw error;
        }
    };

    // Закрытие модального окна
    const closeModal = () => dispatch(toggleIsOpenModalCity(false));

    // Подтверждение выбранного города
    const handleAccept = () => {
        localStorage.setItem(
            process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || "",
            JSON.stringify(value)
        );
        dispatch(setCity({ name: value.label, id: value.value }));
        closeModal();
        setActive(false);
    };

    useEffect(() => {
        handleSearch();
    }, [debauncedCity]);

    useEffect(() => {
        handleSearch();
    }, [debauncedCity]);

    useEffect(() => {
        if (
            localStorage.getItem(
                process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || ""
            )
        ) {
            try {
                let data = JSON.parse(
                    localStorage.getItem(
                        process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || ""
                    ) || ""
                );
                setText(data.label);
            } catch (err) {
                throw `${process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY} не являеться объектом`;
            }
        }
    }, []);

    return (
        <>
            <p className={styles.text}>Выбор города</p>
            <div className={styles.search}>
                <form>
                    <label>
                        <Autocomplete
                            options={cities}
                            onChange={handleChange}
                            onChangeText={setText}
                            value={text}
                        />
                        <img src={locationBlue.src} alt="location" />
                    </label>
                </form>
            </div>
            <div className="flex items-center gap-[20px] mt-[20px]">
                <Button variant="primary" onClick={handleAccept}>
                    Сохранить
                </Button>
                <Button variant="secondary" onClick={() => setActive(false)}>
                    Отмена
                </Button>
            </div>
        </>
    );
};

export default CitySelection;
