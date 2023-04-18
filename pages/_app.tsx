import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { RecoilRoot, useRecoilValue, useRecoilState } from "recoil";
import { wrapper } from "app/store/store";
import { Provider, useDispatch } from "react-redux";
import React, { useLayoutEffect, useState, useEffect } from "react";
import Layout from "../app/components/layout/Layout";
import LayoutMobile from "../app/components/mobile/widgets/LayoutMobile";
import { SearchModal } from "app/web/features/header/ui/search-modal";

import "../app/assets/styles/global.scss";
import "../app/assets/styles/global.css";

import "swiper/scss";
import "swiper/scss/autoplay";

import "app/web/shared/ui/text-field/style.scss";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { getCookie } from "app/shared/lib/Cookie";
import { CONFIG } from "app/shared/config/constants";
import { onLogin, setIsLogged } from "app/store/slices/authentication.slices";
import { usersApi } from "app/store/services/users";
import { setProfile, setCity } from "app/store/slices/profileSlice";
import { useRouter } from "next/router";

const MyApp = ({ Component, ...rest }: AppProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const router = useRouter();

  useLayoutEffect(() => {
    const ismobile = /iPhone|iPad|iPod|Android/i.test(
      window.navigator.userAgent
    );
    setIsMobile(ismobile);
    setIsLoading(false);

    if (getCookie(CONFIG.TOKEN_NAME)) {
      store.dispatch(onLogin(getCookie(CONFIG.TOKEN_NAME) || ""));
    }
  }, []);

  const getMyInfo = async () => {
    const payload = await store.dispatch(
      usersApi.endpoints.getMyInfo.initiate("", { forceRefetch: true })
    ).unwrap();
    store.dispatch(setIsLogged(payload.id));
    store.dispatch(setProfile(payload))
  };

  useEffect(() => {
    if (cookie.get("t").length !== 0) {
      getMyInfo();
    }

    if (localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || "")) {
      let city = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_CITY || "") || "");
      store.dispatch(setCity({ name: city.label, id: city.value }));
    }
  }, []);

  return (
    <Provider store={store}>
      <RecoilRoot>
        {!isLoading && (
          !isMobile ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <LayoutMobile>
              <>
                <Component {...pageProps} />
              </>
            </LayoutMobile>
          )
        )}
      </RecoilRoot>
    </Provider>
  );
};

export default MyApp;
