import Image from "next/image";
import styles from "./styles.module.scss";
import arrowMenu from "app/assets/images/arrowMenu.svg";
import trash from "app/assets/images/trash.svg";
import { infoApi } from "app/store/services/info";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";

import { useState, useEffect, ChangeEvent, useMemo } from "react";
import {
    Autocomplete,
    Button,
    Col,
    Row,
    SelectField,
    TextField,
} from "app/web/shared/ui";
import { adsSearchApi } from "app/store/services/adsSearch";
import searchSlice, {
    setPriceFrom,
    setPriceTo,
    setHashTag,
    removeHashTag,
    setCity,
    setSubcategoryId,
    setCategoryId,
    setType,
} from "app/store/slices/searchSlice";
import { ImgCloseRed } from "app/web/shared/config/images";
import { useRouter } from "next/router";
import { MultiRange } from "app/mobile/shared/ui/multiRange";

interface FilterProps {
    activeFilter: any;
    setActiveFilter: any;
}

const Filter = ({ activeFilter, setActiveFilter }: FilterProps) => {
    const {
        query: { cid, scid, q, cname },
    } = useRouter();
    const searchSliceState = useSelector((state: RootState) => state.search);
    const [adsSearchQuery, adsSearchQueryOptions] =
        adsSearchApi.useLazyGetAdsSearchQuery();
    const [getCitiesQuery] = infoApi.useLazyGetCitiesByNameQuery();
    const [getTagsByNameQuery] = infoApi.useLazyGetTagsByNameQuery();
    const dispatch = useDispatch();
    const [ads, setAds] = useState([]);
    const [cities, setCities] = useState([]);
    const [tags, setTags] = useState([]);

    const params = useMemo(
        () => ({
            type: searchSliceState.type,
            category: searchSliceState.categoryId,
            subcategory: searchSliceState.subcategoryId,
            search: q,
            priceTo: searchSliceState.priceTo,
            priceFrom: searchSliceState.priceFrom,
            location: searchSliceState.city,
            hashTag: searchSliceState.hashTag.map((key) => key.name),
        }),
        [searchSliceState, cid]
    );

    const getAllCat = infoApi.useGetAllCategoriesQuery("");
    const getAllSubCat = infoApi.useGetAllSubCategoriesQuery("");

    // Обработчик цен
    const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "priceTo": {
                dispatch(setPriceTo(+event.target.value));
                break;
            }
            case "priceFrom": {
                dispatch(setPriceFrom(+event.target.value));
                break;
            }
        }
    };
    // Получение объявлений по списку
    const getData = async () => {
        try {
            const payload = await adsSearchQuery(params).unwrap();
            setAds(payload);
        } catch (err) {
            throw err;
        }
    };

    const handleChangeCity = async (text: string) => {
        try {
            const payload = await getCitiesQuery(text).unwrap();
            setCities(
                payload.map((key: any) => ({ label: key.name, value: key.id }))
            );
        } catch (err) {
            throw err;
        }
    };

    const handleChangeTags = async (text: string) => {
        try {
            const payload = await getTagsByNameQuery(text).unwrap();
            setTags(
                payload.map((key: any) => ({ label: key.name, value: key.id }))
            );
        } catch (err) {
            throw err;
        }
    };

    console.log(searchSliceState, "searchSliceStatesearchSliceState");
    console.log(searchSliceState.categoryId, "categoryId");
    console.log(cname, "cnamecnamecname");

    useEffect(() => {
        cid && dispatch(setCategoryId(+cid));
        scid && dispatch(setSubcategoryId(+scid));
        getData();
    }, [cid]);

    return (
        <>
            {activeFilter && (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.header__content}>
                            <Image
                                src={arrowMenu}
                                alt="arrowMenu"
                                width={24}
                                height={24}
                                onClick={() => setActiveFilter(false)}
                            />
                            <span>Фильтр</span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.filter}>
                            <p>Тип объявления по категории</p>
                            <div className={styles.filter__types__block}>
                                {![1, 11].includes(
                                    searchSliceState.categoryId || 0
                                ) && (
                                    <label className={styles.search__type}>
                                        <p>Хочу купить</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            onChange={() =>
                                                dispatch(setType("REQUEST"))
                                            }
                                        />
                                    </label>
                                )}
                                {![1, 11].includes(
                                    searchSliceState.categoryId || 0
                                ) && (
                                    <label className={styles.search__type}>
                                        <p>Продажа</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            onChange={() =>
                                                dispatch(setType("PRODUCT"))
                                            }
                                        />
                                    </label>
                                )}
                                {searchSliceState.categoryId === 11 && (
                                    <label className={styles.search__type}>
                                        <p>Клиент</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            onChange={() =>
                                                dispatch(
                                                    setType("SERVICE_SEARCH")
                                                )
                                            }
                                        />
                                    </label>
                                )}
                                {searchSliceState.categoryId === 11 && (
                                    <label className={styles.search__type}>
                                        <p>Мастер</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            onChange={() =>
                                                dispatch(
                                                    setType("SERVICE_OFFER")
                                                )
                                            }
                                        />
                                    </label>
                                )}
                                {searchSliceState.categoryId === 1 && (
                                    <label className={styles.search__type}>
                                        <p>Вакансия</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            onChange={() =>
                                                dispatch(setType("VACANSY"))
                                            }
                                        />
                                    </label>
                                )}
                                {searchSliceState.categoryId === 1 && (
                                    <label className={styles.search__type}>
                                        <p>Работа</p>
                                        <input
                                            type="radio"
                                            name="type"
                                            onChange={() =>
                                                dispatch(setType("RESUME"))
                                            }
                                        />
                                    </label>
                                )}
                            </div>

                            <Row rowGap={14} className="mt-[14px]">
                                <Col xs="12">
                                    <Autocomplete
                                        label="Город"
                                        options={cities}
                                        value={searchSliceState.city}
                                        onChangeText={handleChangeCity}
                                        onChange={({ label }) =>
                                            dispatch(setCity(label))
                                        }
                                    />
                                </Col>
                                <Col xs="12">
                                    <label className="block font-['Inter'] font-[400] text-[14px] text-[#333232]">
                                        Стоимость, руб
                                        {/* <MultiRange /> */}
                                        <Col
                                            sm="12"
                                            className="flex gap-[20px]"
                                        >
                                            <TextField
                                                placeholder="Цена от"
                                                value={
                                                    searchSliceState.priceFrom
                                                }
                                                name="priceFrom"
                                                onChange={handleChangePrice}
                                            />
                                            <TextField
                                                placeholder="Цена до"
                                                value={searchSliceState.priceTo}
                                                name="priceTo"
                                                onChange={handleChangePrice}
                                            />
                                        </Col>
                                    </label>
                                </Col>
                                <Col xs="12">
                                    <SelectField
                                        label="Категория"
                                        value={searchSliceState.categoryId}
                                        options={searchSliceState.categories.map(
                                            (key) => ({
                                                label: key.name,
                                                value: key.id,
                                            })
                                        )}
                                        onChange={({ value }) => {
                                            dispatch(setCategoryId(+value));
                                        }}
                                    />
                                </Col>
                                <Col xs="12">
                                    <SelectField
                                        label="Подкатегория"
                                        value={searchSliceState.subcategoryId}
                                        options={searchSliceState.filteredSubcategories.map(
                                            (key) => ({
                                                label: key.name,
                                                value: key.id,
                                            })
                                        )}
                                        onChange={({ value }) =>
                                            dispatch(setSubcategoryId(+value))
                                        }
                                    />
                                </Col>
                                <Col xs="12">
                                    <Autocomplete
                                        label="Хэштеги"
                                        value=""
                                        options={tags}
                                        onChangeText={handleChangeTags}
                                        onChange={({ label, value }) =>
                                            dispatch(
                                                setHashTag({
                                                    id: +value,
                                                    name: label,
                                                })
                                            )
                                        }
                                    />
                                    <div className={styles.filter__tags}>
                                        {searchSliceState.hashTag.map(
                                            (key, index) => (
                                                <div
                                                    key={index + "-" + key.name}
                                                    className={
                                                        styles.filter__tag
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.filter__tag__name
                                                        }
                                                    >
                                                        {key.name}
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            dispatch(
                                                                removeHashTag(
                                                                    index
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            src={ImgCloseRed}
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.content__position}>
                            <div className={styles.content__button}>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setActiveFilter(false);
                                    }}
                                >
                                    Сохранить
                                </Button>
                            </div>
                            <div className={styles.content__suitcase}>
                                <Image
                                    src={trash}
                                    alt="arrowMenu"
                                    width={24}
                                    height={24}
                                    // onClick={() => setActiveFilter(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Filter;
