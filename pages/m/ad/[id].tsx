import Address from "app/components/mobile/Ad/Address/Address";
import Description from "app/components/mobile/Ad/Description/Description";
import MainInfoBlock from "app/components/mobile/Ad/MainInfoBlock/MainInfoBlock";
import Seller from "app/components/mobile/Ad/Seller/Seller";
import React, { useEffect, useState } from "react";
import style from "./Ad.module.scss";
import { useRouter } from "next/router";
import { transfersApi } from "app/store/services/transfer";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import suitcase from "app/assets/images/suitcase.svg";
import { usersApi } from "app/store/services/users";
import ModalMenu from "app/mobile/shared/ui/modalMenu";
import CitySelection from "app/mobile/features/ads/citySelection";
import DealsCard from "app/mobile/features/ads/dealsCard";
import { reviewsApi } from "app/store/services/reviews";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { favoritesApi } from "app/store/services/favorites";
import { checkingManyPhotos } from "app/shared/config/helpers/checkingManyPhotos";

const IndexId = () => {
    const router = useRouter();
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    const adId = transfersApi.useGetAdQuery({ id: router.query.id });
    console.log(adId.data, "datadatadatadatadata");

    const { isLoggedIn } = useSelector(
        (state: RootState) => state.authentication
    );

    const data = usersApi.useGetMyInfoQuery("");

    // Проверка на автора объявления
    const checkAuthor = () => {
        if (adId.data?.authorInfo?.userName === data.currentData.login) {
            setIsModalActive(true);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <MainInfoBlock
                    imageSource={
                        checkingManyPhotos(adId.data?.preview || "").preview
                    }
                    name={adId.data?.name}
                    price={adId.data?.price}
                    views={adId.data?.views}
                    units={adId.data?.units}
                    deliveryType={adId.data?.deliveryType}
                />
                <Description
                    tags={adId.data?.tags}
                    description={adId.data?.description}
                />
                <Address address={adId.data?.location.addressLine} />
                <Seller
                    userName={adId.data?.authorInfo?.userName}
                    userImage={adId.data?.authorInfo?.userImage}
                />
                <div className={style.content__position}>
                    <div className={style.content__button}>
                        <button>Позвонить</button>
                    </div>
                    {/* {isLoggedIn && (
                        <div
                            className={style.content__suitcase}
                            onClick={checkAuthor}
                        >
                            <img src={suitcase.src} alt="suitcase" />
                        </div>
                    )} */}
                </div>
                <ModalMenu
                    active={isModalActive}
                    setActive={() => setIsModalActive(false)}
                >
                    <DealsCard setActive={() => setIsModalActive(false)} />
                </ModalMenu>
            </div>
        </div>
    );
};

export default IndexId;
