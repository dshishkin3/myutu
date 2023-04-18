import React, { useState } from "react";
import styles from "./support.module.scss";
import chel2 from "app/assets/images/chel2.svg";
import Accordion from "app/components/mobile/Accordion/Accordion";
import BugReport from "app/components/mobile/BugReport/BugReport";
import Header from "app/components/mobile/widgets/Header/Header";

const Index = () => {
  const [type, setType] = useState<string>("defalut");

  return (
    <div className={styles.container}>
      {type == "defalut" && (
        <>
          <Header title="Служба поддержки" />
          <div onClick={() => setType("bugReport")}>
            <Accordion title="Оставить заявку об ошибке" />
          </div>
          <Accordion title="Оставить отзыв о приложении" />
          <div className={styles.content}>
            <img src={chel2.src} alt="cat" />
            <span>
              Этот раздел поможет Вам отправить сообщение об ошибке в службу
              поддержки и отзыв на Play Market
            </span>
          </div>
        </>
      )}
      {type == "bugReport" && <BugReport />}
      {/* {type == "about" && <About />} */}
    </div>
  );
};

export default Index;
