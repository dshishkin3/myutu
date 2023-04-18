import type { NextPage } from "next";
import Head from "next/head";
import {
    useState,
    useEffect,
    ChangeEvent,
    useMemo,
    useRef,
    useCallback,
    useLayoutEffect,
} from "react";
import {
    Autocomplete,
    Button,
    Col,
    Row,
    SelectField,
    TextField,
} from "app/web/shared/ui";
import CategorySection from "app/web/widgets/category-section";
import { Ad } from "app/web/entities/ad";
import { adsSearchApi } from "app/store/services/adsSearch";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
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
import { infoApi } from "app/store/services/info";
import style from "./search.module.scss";
import { ImgCloseRed } from "app/web/shared/config/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { MultiRange } from "app/web/shared/ui/multi-range-ad";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Link from "next/link";

const Search: NextPage<any> = ({ }) => {
    const {
        query: { cid, scid, q, cname },
    } = useRouter();
    const authSliceState = useSelector((state: RootState) => state.authentication);
    const searchSliceState = useSelector((state: RootState) => state.search);
    const { token } = useSelector((state: RootState) => state.authentication);
    const [adsSearchQuery, adsSearchQueryOptions] =
        adsSearchApi.useLazyGetAdsSearchQuery();
    const [getCitiesQuery] = infoApi.useLazyGetCitiesByNameQuery();
    const [getTagsByNameQuery] = infoApi.useLazyGetTagsByNameQuery();
    const dispatch = useDispatch();
    const [ads, setAds] = useState([]);
    const [cities, setCities] = useState([]);
    const [tags, setTags] = useState([]);

    // Получение объявлений по списку
    const getData = async () => {
        const payloadData = {
            type: searchSliceState.type,
            categories: searchSliceState.categoryId,
            subcategories: searchSliceState.subcategoryId,
            search: q,
            priceTo: searchSliceState.priceTo,
            priceFrom: searchSliceState.priceFrom,
            location: searchSliceState.city,
            hashTag: searchSliceState.hashTag.map((key) => key.name),
            ...(authSliceState.token ? { userId: authSliceState.token } : {})
        };

        try {
            const payload = await adsSearchQuery(payloadData).unwrap();
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

    useLayoutEffect(() => {
        getData();
    }, [q, cname]);

    return (
        <div>
            <Head>
                <title>{cname || "Поиск товаров"}</title>
                <meta name="description" content={`Результаты по запросу`} />
            </Head>
            <CategorySection />

            <div className={style["search__container"]}>
                <div className={style.filter}>
                    {cname && (
                        <span className={style.filter__title}>{cname}</span>
                    )}
                    <span className={style.fitler__count_ads}>
                        {ads.length} товаров
                    </span>
                    <div className={style.filter__types__block}>
                        <span className={style.filter__types__title}>Тип</span>
                        {![1, 11].includes(
                            searchSliceState.categoryId || 0
                        ) && (
                                <label className={style.search__type}>
                                    <span>Хочу купить</span>
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
                                <label className={style.search__type}>
                                    <span>Продажа</span>
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
                            <label className={style.search__type}>
                                <span>Клиент</span>
                                <input
                                    type="radio"
                                    name="type"
                                    onChange={() =>
                                        dispatch(setType("SERVICE_SEARCH"))
                                    }
                                />
                            </label>
                        )}
                        {searchSliceState.categoryId === 11 && (
                            <label className={style.search__type}>
                                <span>Мастер</span>
                                <input
                                    type="radio"
                                    name="type"
                                    onChange={() =>
                                        dispatch(setType("SERVICE_OFFER"))
                                    }
                                />
                            </label>
                        )}
                        {searchSliceState.categoryId === 1 && (
                            <label className={style.search__type}>
                                <span>Вакансия</span>
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
                            <label className={style.search__type}>
                                <span>Работа</span>
                                <input
                                    type="radio"
                                    name="type"
                                    onChange={() => dispatch(setType("RESUME"))}
                                />
                            </label>
                        )}
                    </div>

                    <Row rowGap={24} className="mt-[14px]">
                        <Col sm="12">
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
                        <Col sm="12">
                            <label className="block font-['Inter'] font-[400] text-[16px] text-[#333232]">
                                Стоимость, руб
                            </label>
                            <MultiRange />
                        </Col>

                        <Col sm="12">
                            <SelectField
                                label="Категория"
                                value={searchSliceState.categoryId}
                                options={searchSliceState.categories.map((key) => ({
                                    label: key.name,
                                    value: key.id,
                                }))}
                                onChange={({ value }) => {
                                    dispatch(setCategoryId(+value));
                                }}
                            />
                        </Col>
                        <Col sm="12">
                            <SelectField
                                label="Подкатегория"
                                value={searchSliceState.subcategoryId}
                                options={searchSliceState.filteredSubcategories.map((key) => ({
                                    label: key.name,
                                    value: key.id,
                                }))}
                                onChange={({ value }) => dispatch(setSubcategoryId(+value))}
                            />
                        </Col>
                        <Col sm="12">
                            <Autocomplete
                                label="Хэштеги"
                                value=""
                                options={tags}
                                onChangeText={handleChangeTags}
                                onChange={({ label, value }) =>
                                    dispatch(setHashTag({ id: +value, name: label }))
                                }
                            />
                            <div className={style.filter__tags}>
                                {searchSliceState.hashTag.map((key, index) => (
                                    <div
                                        key={index + "-" + key.name}
                                        className={style.filter__tag}
                                    >
                                        <span className={style.filter__tag__name}>{key.name}</span>
                                        <span onClick={() => dispatch(removeHashTag(index))}>
                                            <Image src={ImgCloseRed} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <Button variant="primary" style={{ marginTop: 24 }} onClick={getData}>
                        Применить
                    </Button>

                </div>
                <div className={style.search__ads}>
                    {adsSearchQueryOptions.isSuccess &&
                        ads.map((key: any, index) => <Ad key={index + "-" + key.name} {...key} />)}

                    {!adsSearchQueryOptions.isSuccess &&
                        [...Array(9)].map((key, index) => (
                            <ContentLoader
                                key={index}
                                speed={2}
                                width={266}
                                height={350}
                                viewBox="0 0 266 350"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    rx="8"
                                    ry="8"
                                    width="266"
                                    height="180"
                                />
                                <rect
                                    x="0"
                                    y="197"
                                    rx="5"
                                    ry="5"
                                    width="84"
                                    height="18"
                                />
                                <rect
                                    x="0"
                                    y="225"
                                    rx="5"
                                    ry="5"
                                    width="216"
                                    height="20"
                                />
                                <rect
                                    x="0"
                                    y="250"
                                    rx="5"
                                    ry="5"
                                    width="139"
                                    height="20"
                                />
                                <rect
                                    x="0"
                                    y="280"
                                    rx="3"
                                    ry="3"
                                    width="92"
                                    height="14"
                                />
                                <rect
                                    x="0"
                                    y="304"
                                    rx="3"
                                    ry="3"
                                    width="168"
                                    height="14"
                                />
                                <rect
                                    x="0"
                                    y="331"
                                    rx="3"
                                    ry="3"
                                    width="84"
                                    height="14"
                                />
                                <rect
                                    x="95"
                                    y="327"
                                    rx="3"
                                    ry="3"
                                    width="74"
                                    height="23"
                                />
                            </ContentLoader>
                        ))}
                </div>
            </div>
        </div>
    );
};

Search.getInitialProps = ({ query }: any) => {
    return {
        ...query,
    };
};

export default Search;
