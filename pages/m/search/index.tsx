import style from "./style.module.scss";
import arrowMenu from "app/assets/images/arrowMenu.svg";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";
import searchSlice, {
    setSubcategoryId,
    setCategoryId,
} from "app/store/slices/searchSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import Card from "app/components/mobile/Card/Card";
import filter from "app/assets/images/filter.svg";
import Filter from "app/mobile/features/ads/filter";
import { adsSearchApi } from "app/store/services/adsSearch";
import SearchMobile from "app/mobile/shared/ui/searchMobile";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";

const Search = ({}) => {
    const {
        query: { cid, scid, q, cname },
    } = useRouter();
    const searchSliceState = useSelector((state: RootState) => state.search);
    const [adsSearchQuery, adsSearchQueryOptions] =
        adsSearchApi.useLazyGetAdsSearchQuery();
    const dispatch = useDispatch();
    const [ads, setAds] = useState([]);
    const [isModalFilter, setIsModalFilter] = useState<boolean>(false);
    const [isModalSearch, setIsModalSearch] = useState<boolean>(false);

    // const params = useMemo(
    //     () => ({
    //         type: searchSliceState.type,
    //         categories: searchSliceState.categoryId,
    //         subcategories: searchSliceState.subcategoryId,
    //         search: q,
    //         priceTo: searchSliceState.priceTo,
    //         priceFrom: searchSliceState.priceFrom,
    //         location: searchSliceState.city,
    //         hashTag: searchSliceState.hashTag.map((key) => key.name),
    //     }),
    //     [searchSliceState, cid]
    // );

    // Получение объявлений по списку
    const getData = async () => {
        try {
            const payload = await adsSearchQuery({
                type: searchSliceState.type,
                categories: searchSliceState.categoryId,
                subcategories: searchSliceState.subcategoryId,
                search: q,
                priceTo: searchSliceState.priceTo,
                priceFrom: searchSliceState.priceFrom,
                location: searchSliceState.city,
                hashTag: searchSliceState.hashTag.map((key) => key.name),
            }).unwrap();
            setAds(payload);
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        cid && dispatch(setCategoryId(+cid));
        scid && dispatch(setSubcategoryId(+scid));
    }, [cid]);
    const router = useRouter();

    useEffect(() => {
        getData();
    }, [searchSliceState]);

    console.log(adsSearchQueryOptions.currentData, "adsSearchQueryOptions");

    return (
        <div className={style.containerId}>
            <>
                <div className={style.headerId}>
                    <div className={style.headerId__contentId}>
                        <Image
                            src={arrowMenu}
                            alt="arrowMenu"
                            width={24}
                            height={24}
                            onClick={() => router.back()}
                        />
                        {cname ? <span>{cname}</span> : <span>Поиск</span>}
                    </div>
                </div>
            </>
            <>
                <div className={style.search}>
                    <form>
                        <label>
                            <input
                                type="text"
                                placeholder="Поиск по объявлениям"
                                onClick={() => setIsModalSearch(true)}
                            />
                        </label>
                    </form>
                    <div className={style.position}>
                        <img
                            src={filter.src}
                            alt=""
                            onClick={() => setIsModalFilter(true)}
                        />
                    </div>
                </div>
            </>
            <div className={style.contentId}>
                {ads.length > 0 ? (
                    <div className={style.contentId__position}>
                        {adsSearchQueryOptions.isSuccess &&
                            ads.map((item: any) => (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    preview={
                                        checkingManyPhotos(item.preview).preview
                                    }
                                    addingDate={item.placementDate}
                                    adressLine={item.addressLine}
                                    price={item.price}
                                    status={
                                        item.typeAds === "PRODUCT"
                                            ? "Продажа"
                                            : "Хочу купить"
                                    }
                                    statusColor={
                                        item.typeAds === "PRODUCT"
                                            ? "#05A2D6"
                                            : "#C57AFF"
                                    }
                                    statusTextColor={"white"}
                                />
                            ))}
                    </div>
                ) : (
                    <>
                        <p>
                            По Вашему запросу, к сожалению, ничего не найдено :(
                        </p>
                    </>
                )}
            </div>
            {isModalFilter && (
                <Filter
                    activeFilter={isModalFilter}
                    setActiveFilter={() => setIsModalFilter(false)}
                />
            )}
            {isModalSearch && (
                <SearchMobile
                    activeSearch={isModalSearch}
                    setActiveSearch={() => setIsModalSearch(false)}
                />
            )}
        </div>
    );
};

export default Search;
