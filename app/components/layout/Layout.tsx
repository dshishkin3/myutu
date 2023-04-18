import { ReactNode } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { showAuthModal } from "../../store/atoms";

import { Header } from "app/web/widgets/Header";
import Footer from "./Footer/Footer";
import { useEffect } from "react";
import { cookie } from "app/utils/helpers/cookies.helpers";
import { loggedUserID, logged } from "app/store/atoms";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";
import { CategoryModal } from "app/web/features/header/ui/category-modal";
import { Snackbar } from "app/web/shared/ui";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isOpenCategory } = useSelector((state: RootState) => state.header);
  const showModal = useRecoilValue(showAuthModal);
  const [uid, setUid] = useRecoilState(loggedUserID);
  const [isLogged, setIsLogged] = useRecoilState(logged);
  useEffect(() => {
    if (cookie.get("t").length !== 0) {
      setUid(cookie.get("t"));
      setIsLogged(true);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="wrapper">{children}</div>
      <Footer />


      {isOpenCategory && <CategoryModal />}
      {/* modals */}
      <Snackbar />
    </>
  );
};

export default Layout;
