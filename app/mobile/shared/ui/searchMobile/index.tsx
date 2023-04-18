import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.scss";
import arrowMenu from "app/assets/images/arrowMenu.svg";
import { useDebounce } from "usehooks-ts";
import {
    setSearchString,
    toggleIsOpenModalSearch,
} from "app/web/features/header";
import { adsSearchApi } from "app/store/services/adsSearch";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";
import { ImgCloseModal, ImgRatingStar } from "app/web/shared/config/images";
import { RootState } from "app/store/store";

interface SearchProps {
    activeSearch: any;
    setActiveSearch: any;
}

const SearchMobile = ({ activeSearch, setActiveSearch }: SearchProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [ads, setAds] = useState([]);
    const { searchString } = useSelector((state: RootState) => state.header);
    const [getAdsSearch] = adsSearchApi.useLazyGetAdsSearchQuery();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchString(event.target.value));
    };

    const handleSearch = () => {
        dispatch(toggleIsOpenModalSearch(false));
        router.push("/search?q=" + searchString);
    };

    const adsQuery = async () => {
        try {
            const payload = await getAdsSearch({
                search: searchString,
            }).unwrap();
            setAds(payload);
        } catch (err) {}
    };

    const debauncedSearchString = useDebounce(searchString, 300);

    useEffect(() => {
        searchString !== "" && adsQuery();
        searchString === "" && setAds([]);
    }, [debauncedSearchString]);

    return (
        <>
            {activeSearch && (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.header__content}>
                            <Image
                                src={arrowMenu}
                                alt="arrowMenu"
                                width={24}
                                height={24}
                                onClick={() => setActiveSearch(false)}
                            />
                            <span>Поиск</span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <form>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Введите запрос"
                                    onChange={handleChange}
                                    value={searchString}
                                    className={
                                        "w-full p-[.5rem_.75rem] border border-[#c9c9c9] rounded-t-[8px] focus:outline-none " +
                                        (ads.length === 0
                                            ? "rounded-b-[8px]"
                                            : "block")
                                    }
                                />
                            </div>
                            <div
                                className="max-h-[300px] overflow-auto border-l border-r border-b rounded-b-[8px] border-[#c9c9c9] p-[16px]"
                                style={{
                                    display:
                                        ads.length === 0 ? "none" : "block",
                                }}
                            >
                                {ads.map((key, index) => (
                                    <div
                                        className="flex items-center gap-[10px] p-[12px_0px] border-t border-[#f4f4f4] cursor-pointer"
                                        onClick={() => {
                                            dispatch(
                                                toggleIsOpenModalSearch(false)
                                            );
                                            router.push("/m/ad/" + key.id);
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <Image
                                                src={
                                                    checkingManyPhotos(
                                                        key.preview
                                                    ).preview
                                                }
                                                width={35}
                                                height={35}
                                                className="rounded-[4px]"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <span className="block font-['Inter'] font-[400] text-[16px] text-[#333232]">
                                                {key.name}
                                            </span>
                                            <span className="block font-['Inter'] font-[400] text-[#333232] text-[14px]">
                                                от {key.price} ₽
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-[6px]">
                                            <span className="block font-['Inter'] font-[500] text-[12px] text-[#909090]">
                                                Продавец
                                            </span>
                                            {/* <Image src={ } /> */}
                                            <img
                                                src="https://via.placeholder.com/150"
                                                width="22"
                                                className="rounded-full"
                                            />
                                            <span className="block font-['Inter'] font-[400] text-[#000000] text-[14px]">
                                                Продавец
                                            </span>
                                            <div className="flex items-center gap-[6px] before:content-[''] before:h-[12.5px] before:w-[1px] before:bg-[#909090]">
                                                <Image src={ImgRatingStar} />
                                                <span className="block font-['Inter'] font-[400] text-[#333232] text-[14px]">
                                                    0
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchMobile;
