import type { NextPage } from "next";
import Head from "next/head";
import CategorySection from "app/web/widgets/category-section";
import AdsHome from "app/web/widgets/ads-home";
import { Snackbar } from "app/web/shared/ui";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Мьюту</title>
        <meta name="description" content="Мьюту - сервис объявлений" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex items-center my-[35px]">
          <span className="block text-[16px] text-[#2AC6FA] font-[400]">
            Главная /
          </span>
          <span className="block text-[16px] text-[#000] font-[400]">
            &nbsp;Объявления
          </span>
        </div>
        <CategorySection />
        <AdsHome />
      </main>
    </>
  );
};

export default Home;
