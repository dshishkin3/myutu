import Link from "next/link";
import React, { useState, useEffect } from "react";
import useOutside from "app/hooks/useOutside";

import { getSearchItems } from "app/services/search.api";

import style from "./Search.module.scss";

type SearchProps = {
  isMobile?: boolean;
}

const Search = ({ isMobile }: SearchProps) => {

  const [ searchText, setSearchText ] = useState("");
  const [ searchItems, setSearchItems ] = useState([]);
  const { ref, isVisible, setIsVisible } = useOutside(false);

  const handlerSearch = async () => {
    if (searchText.trim() === '') {
      return false
    };

    const value = await getSearchItems(searchText);

    setSearchItems(value);
  };
  
  useEffect(() => {
    handlerSearch();
  }, [searchText]);

  return (
    <div className={style.search}>
      {!isMobile ? 
        <input className={style.search__input}
          type="text" 
          value={searchText}
          onChange={({ target: { value } }) => setSearchText(value)}
          onClick={() => setIsVisible(true)}
          placeholder="Поиск по объявлениям" 
        />
        :
        <div className='relative w-full'>
          <img src={"https://storage.yandexcloud.net/myutu/icons/search.svg"} alt='icon' width={18} height={18} style={{position: "absolute", top: 10, left: 10}}/>
          <input className="bg-zinc-100 w-full border-transparent py-[7px] rounded-md pl-10" 
            type="text"
            value={searchText}
            onChange={({ target: { value } }) => setSearchText(value)}
            onClick={() => setIsVisible(true)}
            placeholder="Поиск по объявлениям" 
          />
        </div>
      }
      <div className={style.search__result} style={{ display: isVisible && searchText !== '' ? "block" : "none" }} ref={ref}>
        {searchItems.map(({ id, Name }: any, index: number) =>
          <Link href={`/ad/${id}`} key={id}>
            <div key={index} className={style["search__result-item"]} onClick={() => setIsVisible(false)}>{Name}</div>
          </Link>
        )}
      </div>
      {!isMobile && (
        <Link href={`/search?text=${searchText}`}>
          <button className={style.search__btn}>
            <span>Найти</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default Search;
