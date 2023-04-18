import {
    ImgAddImage,
    ImgAddVideo,
    ImgCloseRed,
    ImgTeacher,
} from "app/web/shared/config/images";
import { Autocomplete, SelectField, TextField } from "app/web/shared/ui";
import { Row, Col } from "app/web/shared/ui";
import type { NextPage } from "next";
import Image from "next/image";
import { UploadMedia, MapAd } from "app/web/features/ad";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { initialState } from "app/web/shared/config/schemes/ad";
import style from "./style.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { filteredSubcategory, setLocation } from "app/store/slices/adSlice";
import { infoApi } from "app/store/services/info";
import { TYPE_ADS } from "app/shared/config/constants/type_ads";
import { Button } from "app/web/shared/ui";
import { Router, useRouter } from "next/router";
import { transfersApi } from "app/store/services/transfer";
import { DELIVERY_TYPES } from "app/shared/config/constants/delivery_types";
import { setPreview, setVideo, setImages, resetUploads } from "app/store/slices/adSlice";

const Index: NextPage<any> = ({ id }) => {
    const authSliceState = useSelector(
        (state: RootState) => state.authentication
    ); // Стейт авторизации
    const adSliceState = useSelector((state: RootState) => state.ad); // Стейт объявления

    const tagInputRef = useRef<HTMLInputElement>(null); // ссылка на объект тега
    const {
        register,
        control,
        setValue,
        getValues,
        watch,
        trigger,
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        // Хук формы
        defaultValues: initialState,
    });
    const [getCitiesByNameQuery] = infoApi.useLazyGetCitiesByNameQuery(); // Запрос на получение городов по названию
    const [addAdQuery] = transfersApi.useAddAdMutation(); // Запрос на создание объявления
    const [updateAdQuery] = transfersApi.useUpdateAdMutation(); // Запрос на обновление объявления
    const [getAdQuery] = transfersApi.useLazyGetAdQuery(); // Запрос на получение объявления
    const [setAdActiveQuery] = transfersApi.useSetAdActiveMutation(); // Запрос на активацию объявления
    const [cities, setCities] = useState([]); // массив городов


    const dispatch = useDispatch();
    const router = useRouter();

    const handleKeyEventTag = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const { keyCode } = event;
        if (keyCode === 32) {
            if (tagInputRef.current?.value.trim() === "") return false;
            setValue("tags", [
                ...getValues("tags"),
                tagInputRef.current?.value.trim(),
            ]);
            tagInputRef.current && (tagInputRef.current.value = "");
        }
    };

    const handleRemoveTag = (id: number) => {
        // Удаление выбранных тегов
        let values = getValues("tags");
        values.splice(id, 1);
        setValue("tags", values);
    };

    const handleGetCities = async (text: string) => {
        // Поиск городов по введенному названию
        try {
            const payload = await getCitiesByNameQuery(text).unwrap();
            setCities(
                payload.map((key) => ({ label: key.name, value: key.id }))
            );
        } catch (error) { }
    };

    const filterTypeAdsByCategory = ({ id }: { id: string }) => {
        // Фильтровка типа объявления взависимости от категории
        // Если все остальное помимо "Услуги" и "Работы"
        if (
            ![1, 11].includes(getValues("category")) &&
            ["PRODUCT", "REQUEST"].includes(id)
        ) {
            return true;
        }
        // Если категория равна "Услуга"(11)
        if (
            getValues("category") === 11 &&
            ["SERVICE_SEARCH", "SERVICE_OFFER"].includes(id)
        ) {
            return false;
        }
        // Если категория равна "Работа"(1)
        if (getValues("category") === 1 && ["VACANSY", "RESUME"].includes(id)) {
            return true;
        }

        return false;
    };

    const onSubmit = async () => {
        // Создание / Редактирование формы
        try {
            if (adSliceState.preview.source === "") {
                setError("preview", {
                    type: "preview",
                    message: "Превью является обязательным",
                });
                return false;
            } else {
                clearErrors("preview");
            }

            // Если есть ошибки то форма не проходит на сохранение
            if (Object.keys(errors).length !== 0) return false;

            const data = {
                ...getValues(),
                location: {
                    ...adSliceState.location
                },
                preview: [
                    adSliceState.preview.link || "",
                    ...adSliceState.images.map((key) => key.link),
                ].join(","),
                video: `${adSliceState.video.link || ""}`,
                userId: authSliceState.token,
                price: +getValues("price"),
                units: +getValues("units"),
                timeTo: "00:00",
                timeFrom: "10:00",
                currency: 2,
                //images: adSliceState.images.map((key) => key.link)
            };

            if (id) {
                const payload = await updateAdQuery(data).unwrap();
                if (payload.state === "0000") {
                    router.push("/profile/myads");
                }
            } else {
                const payload = await addAdQuery(data).unwrap();

                if (payload.state === "0000") {
                    const payloadAdActive = await setAdActiveQuery({
                        userId: authSliceState.token,
                        adId: payload.value,
                        state: "on",
                    }).unwrap();

                    if (payloadAdActive.state === "0000") {
                        router.push("/profile/myads");
                    }
                }
            }
        } catch (error) {
            throw `Ошибка в сохранении объявления: ${error}`
        }
    };

    // Валидация на 0 по полям "Цена" и "Количество"
    const validateFieldOnZero = (value: number) => {
        return value !== 0;
    };

    const getData = async () => {
        try {
            // Получение объявления
            const payload = await getAdQuery({
                id: id,
                userId: authSliceState.token,
            }).unwrap();
            // Перезаписываем значение стейта формы
            reset({
                category: payload.categoryData.categoryId,
                subcategory: payload.categoryData.subcategoryId,
                costDelivery: payload.costDelivery,
                description: payload.description,
                deliveryType: payload.deliveryType,
                adId: payload.id,
                name: payload.name,
                price: payload.price,
                tags: payload.tags,
                typeAds: payload.typeAds,
            });

            // Проверка на превью если содержиться одна фотография
            if (
                payload.preview.split(",").length === 1 &&
                payload.preview.trim() !== ""
            ) {
                dispatch(
                    setPreview({
                        file: null,
                        source: payload.preview,
                        link: payload.preview,
                        status: "success",
                    })
                );
            }
            // Проверка на существование нескольких фотографий в одном объявлении
            if (payload.preview.split(",")) {

                payload.preview.split(",").map((key: string, index: number) => {
                    if (key === "") return false;
                    // Вставка превью объявления
                    if (index === 0) {
                        dispatch(
                            setPreview({
                                file: null,
                                source: key,
                                link: key,
                                status: "success",
                            })
                        );
                    }

                    // Вставка картинок объявления
                    if (index !== 0) {
                        dispatch(
                            setImages({
                                file: null,
                                source: key,
                                link: key,
                                status: "success",
                            })
                        );
                    }

                });
            }

            // Добавление видео в стейт
            dispatch(
                setVideo({
                    file: null,
                    source: payload.video,
                    link: payload.video,
                    status: "success",
                })
            );

            // Сортирование списка подкатегорий по категории
            dispatch(filteredSubcategory(payload.categoryData.categoryId));

            // Вставка локации 
            dispatch(setLocation({ name: "latitude", value: payload.location.latitude }));
            dispatch(setLocation({ name: "longitude", value: payload.location.longitude }));
            dispatch(setLocation({ name: "addressLine", value: payload.location.addressLine }));
        } catch (error) {
            throw `Ошибка в получении объявления: ${error}`;
        }
    };

    const handleGeocodeName = (name: string) => {
        var myGeocoder = window?.ymaps.geocode(name);
        myGeocoder.then(
            function (res: any) {
                let [latitude, longitude] = res.geoObjects.get(0).geometry.getCoordinates();
                dispatch(setLocation({ name: "city", value: name }));
                dispatch(setLocation({ name: "latitude", value: latitude }));
                dispatch(setLocation({ name: "longitude", value: longitude }));
            },
            function (err: any) {
                alert('Error');
            }
        );
    };

    useEffect(() => {
        // Очистка загруженных фото
        dispatch(resetUploads());
        // Очистка полей формы
        reset(initialState);
        if (id && adSliceState.subcategories.length !== 0) getData();
    }, [id, adSliceState.subcategories]);

    return (
        <div className={style.add_ad}>
            <h1 className={style.add_ad__title}>Создание объявления</h1>
            <div className={style.add_ad__section}>
                <span className={style.add_ad__section__title}>
                    Внешний вид
                </span>
                <UploadMedia />
                {errors.preview && (
                    <span className={style.add_ad__text__error}>
                        {errors.preview?.message}
                    </span>
                )}
            </div>

            <div className={style.add_ad__form}>
                <div>
                    <div className={style.add_ad__section}>
                        <span className={style.add_ad__section__title}>
                            Основная информация
                        </span>

                        <Row rowGap={26} colGap={30}>
                            <Col sm="12">
                                <TextField
                                    label="Название"
                                    {...register("name", {
                                        required: "Поле является обязательным",
                                        validate: (value) =>
                                            value.trim() !== "",
                                    })}
                                    requiredstar
                                />
                                {errors.name && (
                                    <span className={style.add_ad__text__error}>
                                        Поле является обязательным
                                    </span>
                                )}
                            </Col>
                            <Col sm="6">
                                <TextField
                                    type="number"
                                    label="Цена, руб."
                                    {...register("price", {
                                        required: "Поле является обязательным",
                                        min: {
                                            value: 0,
                                            message:
                                                "Цена должна быть больше 0",
                                        },
                                        onChange: (event) =>
                                            setValue(
                                                "price",
                                                +event.target.value
                                            ),
                                    })}
                                    requiredstar
                                />
                                {errors.price && (
                                    <span className={style.add_ad__text__error}>
                                        {errors?.price?.message}
                                    </span>
                                )}
                            </Col>
                            <Col sm="6">
                                <TextField
                                    type="number"
                                    label="Количество товара, шт."
                                    {...register("units", {
                                        required: "Поле является обязательным",
                                        min: {
                                            value: 1,
                                            message:
                                                "Количество должно быть больше 0",
                                        },
                                        onChange: (event) =>
                                            setValue(
                                                "units",
                                                +event.target.value
                                            ),
                                    })}
                                    requiredstar
                                />
                                {errors.units && (
                                    <span className={style.add_ad__text__error}>
                                        {errors?.units?.message}
                                    </span>
                                )}
                            </Col>
                            <Col sm="6">
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{
                                        required: "Поле является обязательным",
                                        validate: (value) =>
                                            validateFieldOnZero(value),
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <SelectField
                                            label={"Категория"}
                                            requiredstar
                                            value={getValues("category")}
                                            options={adSliceState.categories.map(
                                                (key) => ({
                                                    label: key.name,
                                                    value: key.id,
                                                })
                                            )}
                                            onChange={({ label, value }) => {
                                                onChange(value);
                                                dispatch(
                                                    filteredSubcategory(+value)
                                                );
                                            }}
                                        />
                                    )}
                                />

                                {errors.category && (
                                    <span className={style.add_ad__text__error}>
                                        Поле является обязательным
                                    </span>
                                )}
                            </Col>
                            <Col sm="6">
                                <Controller
                                    name="subcategory"
                                    control={control}
                                    rules={{
                                        required: "Поле является обязательным",
                                        validate: (value) =>
                                            validateFieldOnZero(value),
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <SelectField
                                            label="Подкатегория"
                                            requiredstar
                                            value={getValues("subcategory")}
                                            options={adSliceState.filteredSubcategories.map(
                                                (key) => ({
                                                    label: key.name,
                                                    value: key.id,
                                                })
                                            )}
                                            onChange={({ value }) =>
                                                onChange(value)
                                            }
                                        />
                                    )}
                                />
                                {errors.subcategory && (
                                    <span className={style.add_ad__text__error}>
                                        Поле является обязательным
                                    </span>
                                )}
                            </Col>
                            <Col sm="12">
                                <SelectField
                                    label="Тип объявления"
                                    requiredstar
                                    value={getValues("typeAds")}
                                    options={TYPE_ADS.filter((key) =>
                                        filterTypeAdsByCategory(key)
                                    ).map((key) => ({
                                        label: key.name,
                                        value: key.id,
                                    }))}
                                    onChange={({ value }) =>
                                        setValue("typeAds", value)
                                    }
                                />
                            </Col>
                            <Col sm="12">
                                <TextField
                                    label="Хэштеги"
                                    ref={tagInputRef}
                                    onKeyDown={handleKeyEventTag}
                                />
                                <div className={style.add_ad__tags}>
                                    {watch("tags").map(
                                        (key: string, index: number) => (
                                            <div
                                                key={`${key}-${index}`}
                                                className={style.add_ad__tag}
                                            >
                                                <span>{key}</span>
                                                <span
                                                    onClick={() =>
                                                        handleRemoveTag(index)
                                                    }
                                                >
                                                    <Image src={ImgCloseRed} />
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Col>
                            <Col sm="12">
                                <TextField
                                    label="Описание"
                                    {...register("description")}
                                />
                                <label className={style.add_ad__text__meta}>
                                    Не более 1000 символов
                                </label>
                            </Col>
                        </Row>
                    </div>
                    <div className={style.add_ad__section}>
                        <span className={style.add_ad__section__title}>
                            Связь с продавцом
                        </span>

                        <Row rowGap={26} colGap={30}>
                            <Col sm="6">
                                <TextField
                                    label="Адрес совершения сделки"
                                    requiredstar
                                    readOnly
                                    defaultValue={adSliceState.location.addressLine}
                                />
                            </Col>
                            <Col sm="6">
                                <Autocomplete
                                    label="Город совершения сделки"
                                    options={cities}
                                    value={adSliceState.location.city || ""}
                                    onChangeText={handleGetCities}
                                    onChange={({ label, value }) => {
                                        dispatch(setLocation({ name: "city", value: label }));
                                        handleGeocodeName(label);
                                    }}
                                />
                            </Col>
                        </Row>

                        <div className={style.add_ad__wrapper_map}>
                            <MapAd />
                        </div>

                        <Row>
                            <Col sm="4">
                                <SelectField
                                    label="Тип и условия доставки"
                                    value={getValues("deliveryType")}
                                    options={DELIVERY_TYPES.map((key) => ({
                                        label: key.name,
                                        value: key.id,
                                    }))}
                                    onChange={({ value }) =>
                                        setValue("deliveryType", value)
                                    }
                                />
                            </Col>
                            {watch("deliveryType") === "FEE" && (
                                <Col sm="4">
                                    <TextField
                                        label="Стоимость доставки"
                                        requiredstar
                                        {...register("costDelivery", {
                                            required:
                                                "Поле являеться обязательным",
                                            min: {
                                                value: 0,
                                                message:
                                                    "Доставка должны быть больше 0",
                                            },
                                        })}
                                    />
                                    {errors.costDelivery && (
                                        <span
                                            className={
                                                style.add_ad__text__error
                                            }
                                        >
                                            {errors.costDelivery.message}
                                        </span>
                                    )}
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
                <div
                    className={`${style.add_ad__section} ${style.help_telegram}`}
                    style={{ height: "fit-content" }}
                >
                    <Image src={ImgTeacher} />
                    <span className={style.help_telegram__title}>
                        Вам нужна помощь?
                    </span>
                    <span className={style.help_telegram__description}>
                        Вы можете написать нам на почту или перейти в телеграм
                        канал
                    </span>
                    <button className={style.help_telegram__button}>
                        Перейти в телеграм
                    </button>
                </div>
            </div>

            <div className={style.add_ad__button_group}>
                <Button
                    variant="primary"
                    onClick={async () => {
                        await trigger();
                        onSubmit();
                    }}
                >
                    {id ? "Сохранить" : "Создать"}
                </Button>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Отмена
                </Button>
            </div>
        </div>
    );
};

Index.getInitialProps = ({ query }: any) => {
    return {
        ...query,
    };
};

export default Index;
