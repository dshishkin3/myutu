import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Address.module.scss";
import location from "app/assets/images/location.svg";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { transfersApi } from "app/store/services/transfer";
import { useRouter } from "next/router";

interface AddressProps {
  address: string;
  geo?: any;
}

const Address: React.FC<AddressProps> = ({ address }) => {
  const [isShowMap, setIsShowMap] = useState<boolean>(false);

  // preview images
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const router = useRouter();

  const adId = transfersApi.useGetAdQuery({
    id: router.query.id,
    userId: cookie.get("t"),
  });

  //   useEffect(() => {
  //     if (ad?.preview.indexOf(",") > 0) {
  //       setPreviewImages(ad.preview.split(","));
  //       console.log("больше 0");
  //     } else {
  //       let copy = [];
  //       copy.push(ad?.preview);
  //       setPreviewImages(copy);
  //       console.log("меньше 0");
  //     }
  //   }, [ad]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={location.src} alt="location" />
        <h1 className={styles.header__text}>Адрес</h1>
      </div>
      <p className={styles.description}>{adId?.data?.location.addressLine}</p>
      <p className={styles.link} onClick={() => setIsShowMap((prev) => !prev)}>
        Показать на карте
      </p>
      {isShowMap && (
        <div style={{ width: "100%", height: 229, borderRadius: 8 }}>
          <YMaps>
            <Map
              defaultState={{
                center: [
                  adId?.data?.location.longitude,
                  adId?.data?.location.latitude,
                ],
                zoom: 17,
              }}
              width="100%"
              height="100%"
            >
              <Placemark
                defaultGeometry={[
                  adId?.data?.location.longitude,
                  adId?.data?.location.latitude,
                ]}
              />
            </Map>
          </YMaps>
        </div>
      )}
    </div>
  );
};

export default Address;
