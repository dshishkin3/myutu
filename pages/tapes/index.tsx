import { NextPage } from "next";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper";

import { Menu, Nav } from "app/web/widgets/tapes";
import { ModalTapesShare } from "app/web/features/tapes";

import chel from "app/assets/images/EmptySearch.svg";
import arrowUp from "app/assets/images/slider_arrowUp.svg";
import arrowDown from "app/assets/images/slider_arrowDown.svg";

import styles from "./style.module.scss";
import { VideoTapes } from "app/web/widgets/video-tapes";
import { useDispatch } from "react-redux";
import { setSnackbar } from "app/store/slices/snackbar.slice";

const Tapes: NextPage = () => {
  // current page
  const [page, setPage] = useState<string>("Лента");
  // попап настроек (поделиться, заблокировать)
  const [popupSettings, setPopupSettings] = useState(false);
  // попап "поделиться"
  const [popupShare, setPopupShare] = useState(false);

  const openModalShare = () => {
    if (popupShare) {
      document.body.style.overflow = "";
      setPopupShare(!popupShare);
    } else {
      document.body.style.overflow = "hidden";
      setPopupShare(!popupShare);
    }
  };

  return (
    <div className={styles.tapes} onClick={() => setPopupSettings(false)}>
      <Nav page={page} setPage={setPage} />
      <div className={styles.tapes__content}>
        {/* video */}
        <div>
          <Swiper
            direction="vertical"
            slidesPerView={1}
            className="swiper-container-tapes"
            style={{ height: 670 }}
            navigation={{
              nextEl: ".slider__next_tapes",
              prevEl: ".slider__prev_tapes",
            }}
            modules={[Navigation]}
          >
            <SwiperSlide>
              <VideoTapes src="https://testupload.storage.yandexcloud.net/alexey/oAWzplQ4ba9b2GFcEPP1R1ra2k8SXcTFlklcBGhMfdUeFJ34bu.mp4" />
            </SwiperSlide>
            <SwiperSlide>
              <VideoTapes src="https://testupload.storage.yandexcloud.net/alexey/oAWzplQ4ba9b2GFcEPP1R1ra2k8SXcTFlklcBGhMfdUeFJ34bu.mp4" />
            </SwiperSlide>
            <SwiperSlide>
              <VideoTapes src="https://testupload.storage.yandexcloud.net/alexey/oAWzplQ4ba9b2GFcEPP1R1ra2k8SXcTFlklcBGhMfdUeFJ34bu.mp4" />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* menu */}
        <Menu
          popupSettings={popupSettings}
          setPopupSettings={setPopupSettings}
          setPopupShare={setPopupShare}
        />
      </div>
      {/* modals */}
      <ModalTapesShare
        active={popupShare}
        setActive={openModalShare}
        setPopupSettings={setPopupSettings}
      />
    </div>
  );
};

export default Tapes;
