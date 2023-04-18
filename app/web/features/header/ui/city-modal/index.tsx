import React, { FC, useState, useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';
import { toggleIsOpenModalCity } from 'app/web/features/header/model/headerSlice';
import { Autocomplete, TextField } from 'app/web/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store/store';
import { infoApi } from 'app/store/services/info';
import { useRouter } from 'next/router';
import { Button } from 'app/web/shared/ui';
import { ImgCloseModal } from 'app/web/shared/config/images';
import Image from 'next/image';
import { setCity } from 'app/store/slices/profileSlice';
import style from './style.module.scss';

export const CityModal: FC = () => {
  const [text, setText] = useState<string>(""); // Стейт для введенных значений
  const [value, setValue] = useState<{ label: string; value: number }>({ label: "", value: 0 }); // Стейт для выбранного значения
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
      let transform = payload.map((key: any) => ({ label: key.name, value: key.id }));
      setCities(transform);
    } catch (error) {
      throw error;
    }
  };

  // Закрытие модального окна
  const closeModal = () => dispatch(toggleIsOpenModalCity(false));

  // Подтверждение выбранного города
  const handleAccept = () => {
    localStorage.setItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || "", JSON.stringify(value));
    dispatch(setCity({ name: value.label, id: value.value }));
    closeModal();
  };

  useEffect(() => {
    handleSearch();
  }, [debauncedCity]);


  useEffect(() => {
    handleSearch();
  }, [debauncedCity]);

  useEffect(() => {
    if (localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || "")) {
      try {
        let data = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || "") || "");
        setText(data.label);
      } catch (err) {
        throw `${process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY} не являеться объектом`;
      }
    }
  }, [])

  return (
    <div className={style.city_modal} onClick={closeModal}>
      <div className={style.city_modal__container} onClick={(event) => event.stopPropagation()}>
        <div className={style.city_modal__header}>
          <span className={style.city_modal__title}>Выберите город</span>
          <span className={style.city_modal__close} onClick={closeModal}>
            <Image src={ImgCloseModal} />
          </span>
        </div>
        <div className={style.city_modal__search_field} data-is-open={cities.length > 0 && text.length > 0}>
          <TextField
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <div className={style.city_modal__cities} style={{ display: (cities.length > 0 && text.length > 0) ? "block" : 'none' }}>
            {
              cities.map((key, index) => (
                <span key={`${index}-${key.label}`} className={style.city_modal__city_item} onClick={() => handleChange(key)}>{key.label}</span>
              ))
            }
          </div>
          <button className={style.city_modal__button_search} onClick={handleSearch}>Поиск</button>
        </div>

        <div className={style.city_modal__btn_group}>
          <Button variant="primary" onClick={handleAccept}>Сохранить</Button>
          <Button variant="secondary" onClick={closeModal}>Отмена</Button>
        </div>
      </div>
    </div>
  );
};
