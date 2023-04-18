import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";

import { ymapsSetInit } from "app/utils/helpers/ymaps.helpers";
import { InputField } from "../input-field";
import { ICreateAd, ILocation } from "app/models/models";

import address from "app/assets/images/ad_location_.svg";

import style from "./style.module.scss";

type CreateAdMapProps = {
  values: ICreateAd;
  setValues: Dispatch<SetStateAction<ICreateAd>>;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const CreateAdMap = ({
  values,
  setValues,
  handleInputChange,
}: CreateAdMapProps) => {
  const [dataMap, setDataMap] = useState({
    AdressLine: "",
    Country: "",
    City: "",
    Street: "",
    House: "",
    Coordinates: "",
  });

  //   показать карту
  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    window.ymaps.ready(() => ymapsSetInit((data) => setDataMap(data)));
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      Location: {
        AddressLine: dataMap.AdressLine,
        Country: dataMap.Country,
        City: dataMap.City,
        Street: dataMap.Street,
        House: dataMap.House,
        Coordinates: dataMap.Coordinates,
      },
    });
  }, [dataMap]);

  return (
    <div className={style.form__container}>
      <div className={style.form__containerColumn}>
        <div className={style.form__inputSearch}>
          <InputField
            type="text"
            value={dataMap.AdressLine}
            name="location"
            placeholderText="Адрес"
            handleChange={handleInputChange}
          />
          <div
            className={style.reset__text}
            onClick={() => setOpenMap(!openMap)}
          >
            <Image src={address} width={24} height={24} alt="address" />
          </div>
        </div>

        <div style={{ display: openMap ? "block" : "none" }} className="w-full">
          <div id="map" className={style.form__map}></div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdMap;
