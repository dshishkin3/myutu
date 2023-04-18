import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";
import { adsSearchApi } from "app/store/services/adsSearch";
import { transfersApi } from "app/store/services/transfer";
import { RootState } from "app/store/store";
import { ImgCloseModal, ImgRatingStar } from "app/web/shared/config/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "usehooks-ts";
import {
  setSearchString,
  toggleIsOpenModalSearch,
} from "../../model/headerSlice";

export const SearchModal: FC = () => {
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

  const closePopup = () => {
    dispatch(toggleIsOpenModalSearch(false));
    document.body.style.overflow = "";
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
    <div
      className="bg-[rgba(0,0,0,.13)] top-0 left-0 w-full h-full flex items-center justify-center absolute z-[999999]"
      onClick={closePopup}
    >
      <div
        className="p-[35px] bg-[#fff] w-[745px] rounded-[10px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-[20px]">
          <span className="block text-[20px] font-[500]">Поиск</span>
          <Image
            src={ImgCloseModal}
            className="w-[32px] cursor-pointer"
            onClick={() => dispatch(toggleIsOpenModalSearch(false))}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Введите запрос"
            onChange={handleChange}
            value={searchString}
            className={
              "w-full p-[.5rem_.75rem] border border-[#c9c9c9] rounded-t-[8px] focus:outline-none " +
              (ads.length === 0 ? "rounded-b-[8px]" : "block")
            }
          />
          <button
            className="bg-[#2AC6FA10] rounded-[8px] p-[2px_20px] text-[#2AC6FA] text-[14px] absolute top-[10px] right-[12px]"
            onClick={handleSearch}
          >
            Поиск
          </button>
        </div>
        <div
          className="max-h-[300px] overflow-auto border-l border-r border-b rounded-b-[8px] border-[#c9c9c9] p-[16px]"
          style={{ display: ads.length === 0 ? "none" : "block" }}
        >
          {ads.map((key, index) => (
            <div
              className="flex items-center gap-[10px] p-[12px_0px] border-t border-[#f4f4f4] cursor-pointer"
              onClick={() => {
                dispatch(toggleIsOpenModalSearch(false));
                router.push("/ad/" + key.id);
              }}
            >
              <div className="flex items-center">
                <Image
                  src={checkingManyPhotos(key.preview).preview}
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
                <Image
                  src={key.authorInfo.userImage}
                  width={22}
                  height={22}
                  className="rounded-full"
                />
                <span className="block font-['Inter'] font-[400] text-[#000000] text-[14px]">
                  {key.authorInfo.userName}
                </span>
                <div className="flex items-center gap-[6px] before:content-[''] before:h-[12.5px] before:w-[1px] before:bg-[#909090]">
                  <Image src={ImgRatingStar} />
                  <span className="block font-['Inter'] font-[400] text-[#333232] text-[14px]">
                    {key.authorInfo.userRate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
