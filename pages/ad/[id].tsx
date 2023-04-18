import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";

import { cookie } from "app/utils/helpers/cookies.helpers";
import { useRouter } from "next/router";
import { IAdRequest } from "app/models/models";
import { transfersApi } from "app/store/services/transfer";
import { Info, Buy, Seller } from "app/web/widgets/ad";
import { favoritesApi } from "app/store/services/favorites";
import { ModalInfoDeal, ModalReview } from "app/web/features/ad";
import { RootState } from "app/store/store";
import { reviewsApi } from "app/store/services/reviews";
import { ImgEdit } from "app/web/shared/config/images";

import share from "app/assets/images/ad_share.svg";
import sharePopup from "app/assets/images/ad_sharePopup.svg";
import favorite from "app/assets/images/ad_favorite.svg";
import favorite_fill from "app/assets/images/ad_favorite-fill.svg";
import deal from "app/assets/images/ad_deal.svg";

import styles from "./style.module.scss";
import { setSnackbar } from "app/store/slices/snackbar.slice";

const DetailAd: NextPage<IAdRequest & { id: any }> = ({ id }) => {
  // попап 'скопировать ссылку'
  const [openShareLink, setOpenShareLink] = useState<boolean>(false);
  // состояние кнопки избранное
  const [addToFavorites, setAddToFavorites] = useState<boolean>(false);
  // кол-во отзывов
  const [countReviews, setCountReviews] = useState("");
  // попап "условия сделки"
  const [popupDeal, setPopupDeal] = useState(false);
  // попап "отзыв"
  const [popupReview, setPopupReview] = useState(false);
  const { token } = useSelector((state: RootState) => state.authentication);
  const [addToFav] = favoritesApi.useAddToFavoritesMutation();
  const [deleteFromFav] = favoritesApi.useDeleteFromFavoritesMutation();
  const router = useRouter();

  const dispatch = useDispatch();

  // получение объявления
  const { data, isSuccess } = transfersApi.useGetAdQuery({
    id: id,
    userId: token ? token : "",
  });

  // средняя оценка продавца
  const { data: grade } = reviewsApi.useGetAdSellerGradeQuery(
    {
      id: data?.authorInfo.userId,
    },
    {}
  );

  // отзывы о пользователе
  const { data: reviews = [] } = reviewsApi.useGetAdAboutUserReviewsQuery(
    {
      id: data?.authorInfo.userId,
    },
    {}
  );

  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );

  // проверка, в избранных ли объявление
  useEffect(() => {
    if (data && data.inFavorites) {
      setAddToFavorites(true);
    }
  }, [data]);

  // средняя оценка продавца
  useEffect(() => {
    getCountReviews();
  }, [reviews]);

  // кол-во отзывов
  const getCountReviews = () => {
    switch (reviews.length) {
      case 0:
        setCountReviews("Нет отзывов");
        break;

      case 1:
        setCountReviews("1 отзыв");
        break;

      case 1:
      case 2:
      case 3:
      case 4:
        setCountReviews(`${reviews.length} отзыва`);
        break;

      default:
        setCountReviews(`${reviews.length} отзывов`);
        break;
    }
  };

  // открыть/закрыть модалку "условия сделки"
  const openModalDeal = () => {
    if (popupDeal) {
      document.body.style.overflow = "";
      setPopupDeal(!popupDeal);
    } else {
      document.body.style.overflow = "hidden";
      setPopupDeal(!popupDeal);
    }
  };

  // открыть/закрыть модалку "отзыв"
  const openModalReview = () => {
    if (popupReview) {
      document.body.style.overflow = "";
      setPopupReview(!popupReview);
    } else {
      document.body.style.overflow = "hidden";
      setPopupReview(!popupReview);
    }
  };

  // избранное
  const favoritesHandler = async () => {
    setAddToFavorites(!addToFavorites);
    if (!addToFavorites) {
      await addToFav({
        userId: cookie.get("t"),
        adId: id,
      }).unwrap();
    } else {
      await deleteFromFav({
        userId: cookie.get("t"),
        adId: id,
      }).unwrap();
    }
  };

  // копировать ссылку
  const onShareHandler = () => {
    const path: string = window.location.href;
    navigator.clipboard.writeText(path);
    setOpenShareLink(false);
    dispatch(
      setSnackbar({ show: true, label: "Ссылка скопирована!", type: true })
    );
  };

  return (
    <div className={styles.ad} onClick={() => setOpenShareLink(false)}>
      {openShareLink && (
        <div
          className={styles.ad__wrapper}
          onClick={() => setOpenShareLink(false)}
        ></div>
      )}
      {/* header */}
      {isSuccess ? (
        <div>
          <div className={styles.ad__header}>
            <p className={styles.ad__header_title}>{data?.name}</p>
            <div className={styles.ad__header_share}>
              <div
                className={styles.ad__header_shareImg}
                onClick={(e) => e.stopPropagation()}
              >
                {data?.isAuthor && (
                  <Image
                    src={ImgEdit}
                    width={24}
                    height={24}
                    alt="share"
                    onClick={() => router.push("/ad?id=" + data.id)}
                  />
                )}
                {isLoggedIn && (
                  <div className={styles.ad__header_favorite}>
                    <Image
                      onClick={favoritesHandler}
                      src={addToFavorites ? favorite_fill : favorite}
                      width={24}
                      height={24}
                      alt="favorite"
                    />
                  </div>
                )}
                {/* {isLoggedIn && !ad.data?.isAuthor && (
              <Image
                className={styles.ad__header_deal}
                src={deal}
                width={24}
                height={24}
                alt="deal"
                onClick={openModalDeal}
              />
            )} */}
                <Image
                  src={share}
                  width={24}
                  height={24}
                  alt="share"
                  onClick={() => setOpenShareLink(!openShareLink)}
                />
              </div>
              <div
                className={
                  openShareLink
                    ? styles.ad__header_sharePopupOpen
                    : styles.ad__header_sharePopupClose
                }
                onClick={onShareHandler}
              >
                <Image
                  src={sharePopup}
                  alt="sharePopup"
                  width={24}
                  height={24}
                />
                <p> Скопировать ссылку</p>
              </div>
            </div>
          </div>
          {/* main */}
          <div className={styles.ad__main}>
            <div>
              <Info ad={data} />
            </div>
            {/* actions */}
            <div className={styles.ad__main_actions}>
              <Buy ad={data} openModalDeal={openModalDeal} />
              <Seller
                ad={data}
                openModalReview={openModalReview}
                grade={grade}
                countReviews={countReviews}
              />
            </div>
          </div>
          {/* modals */}
          <ModalInfoDeal
            ad={data}
            active={popupDeal}
            setActive={openModalDeal}
          />
          <ModalReview
            active={popupReview}
            setActive={openModalReview}
            ad={data}
            data={reviews}
            grade={grade}
            countReviews={countReviews}
          />
        </div>
      ) : (
        <ContentLoader
          speed={2}
          width={1380}
          height={800}
          viewBox="0 0 1380 800"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="6" y="6" rx="8" ry="8" width="579" height="42" />
          <rect x="1210" y="6" rx="8" ry="8" width="44" height="44" />
          <rect x="1270" y="6" rx="8" ry="8" width="44" height="44" />
          <rect x="1330" y="6" rx="8" ry="8" width="44" height="44" />
          <rect x="6" y="83" rx="8" ry="8" width="88" height="480" />
          <rect x="120" y="83" rx="10" ry="10" width="910" height="480" />
          <rect x="1055" y="83" rx="8" ry="8" width="322" height="254" />
          <rect x="1055" y="360" rx="8" ry="8" width="322" height="254" />
          <rect x="6" y="580" rx="8" ry="8" width="1028" height="217" />
        </ContentLoader>
      )}
    </div>
  );
};

DetailAd.getInitialProps = ({ query }: any) => {
  return {
    ...query,
  };
};

export default DetailAd;
