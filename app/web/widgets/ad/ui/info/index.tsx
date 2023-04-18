import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import { IAd } from "../../model";
import VideoPlayer from "app/web/widgets/video-player";

import location from "app/assets/images/ad_location.svg";
import arrowAddress from "app/assets/images/ad_arrowAddress.svg";
import arrowUp from "app/assets/images/slider_arrowUp.svg";
import arrowDown from "app/assets/images/slider_arrowDown.svg";

import styles from "./style.module.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface IInfoProps {
  ad: IAd;
}

export const Info: FC<IInfoProps> = ({ ad }) => {
  const [mapOpen, setMapOpen] = useState(false);

  // swiper thumbs
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  const [loaded, setIsLoaded] = useState(false);

  // preview images
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (ad?.preview.indexOf(",") > 0) {
      setPreviewImages(ad.preview.split(",").slice(1));
    } else {
      let copy = [];
      copy.push(ad?.preview);
      setPreviewImages(copy);
    }
  }, [ad]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.info}>
      {/* slider */}
      <div className={styles.info__swiper}>
        <div>
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: loaded ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {ad?.video && (
              <SwiperSlide>
                <VideoPlayer link={ad?.video} />
              </SwiperSlide>
            )}
            {previewImages.map((image, i) => (
              <SwiperSlide key={`${image}_${i}`} style={{ display: "flex" }}>
                <Image
                  src={image}
                  alt="img"
                  width={910}
                  height={480}
                  className={styles.info__swiper_imgMain}
                  objectFit="cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="slider__prev">
            <Image src={arrowUp} alt="arrowUp" width={14} height={16} />
          </div>
          <Swiper
            direction="vertical"
            spaceBetween={10}
            slidesPerView={4}
            navigation={{
              nextEl: ".slider__next",
              prevEl: ".slider__prev",
            }}
            className="swiper-container1"
            breakpoints={{
              0: {
                direction: "horizontal",
              },
              768: {
                direction: "vertical",
              },
            }}
            modules={[Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            style={{ height: 405 }}
          >
            {ad?.video && (
              <SwiperSlide>
                <VideoPlayer link={ad?.video} miniature />
              </SwiperSlide>
            )}
            {previewImages.map((image, i) => (
              <SwiperSlide key={`${image}_${i}`}>
                <Image
                  src={image}
                  alt="img"
                  width={88}
                  height={88}
                  className={styles.info__swiper_imgThumb}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="slider__next">
            <Image src={arrowDown} alt="arrowDown" width={14} height={16} />
          </div>
        </div>
      </div>
      <div className={styles.info__desc}>
        <p className={styles.info__desc_title}>Описание</p>
        <p className={styles.info__desc_subtitle}>{ad?.description}</p>
        <div className={styles.info__desc_tags}>
          {ad?.tags.map((tag: string) => (
            <div key={tag} className={styles.info__desc_tag}>
              #{tag}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.info__address}>
        <div className={styles.info__address_text}>
          <Image src={location} width={20} height={20} alt="location" />
          <p className={styles.info__address_textTitle}>Адрес</p>
          <p>
            {ad?.location.addressLine.length > 75
              ? ad?.location.addressLine.slice(0, 75) + "..."
              : ad?.location.addressLine}
          </p>
        </div>
        <div
          className={styles.info__address_openMap}
          onClick={() => setMapOpen(!mapOpen)}
        >
          <p>Показать на карте</p>
          <Image src={arrowAddress} width={24} height={24} alt="address" />
        </div>
      </div>
      {mapOpen && (
        <div style={{ width: 1028, height: 229 }}>
          <YMaps>
            <Map
              defaultState={{
                center: [ad?.location.latitude, ad?.location.longitude],
                zoom: 18,
              }}
              width="100%"
              height="100%"
            >
              <Placemark
                defaultGeometry={[
                  ad?.location.latitude,
                  ad?.location.longitude,
                ]}
              />
            </Map>
          </YMaps>
        </div>
      )}
    </div>
  );
};
