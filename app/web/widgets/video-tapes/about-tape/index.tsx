import styles from "./style.module.scss";

import avatar from "app/assets/images/avatar-tapes.png";
import Image from "next/image";
import { useState } from "react";

export const AboutTape = () => {
  // развернуть/скрыть описание
  const [openDesc, setOpenDesc] = useState(false);

  return (
    <div className={styles.about}>
      {/* user */}
      <div className={styles.user}>
        <div className={styles.user__avatar}>
          <Image src={avatar} alt="avatar" width={52} height={52} />
        </div>
        <div className={styles.user__desc}>
          <p className={styles.user__desc_name}>Алена Петрова</p>
          <button className={styles.user__desc_subscribe}>Подписаться</button>
        </div>
      </div>
      {/* desc */}
      <div className={styles.desc}>
        {!openDesc && (
          <p>
            Вот вам яркий пример современных тенденций — сложившаяся структура
            организации не оставляет шанса для анализа существующих паттернов
            поведения. Безусловно, сложившаяся структура...
          </p>
        )}
        {openDesc && (
          <p>
            Вот вам яркий пример современных тенденций — сложившаяся структура
            организации не оставляет шанса для анализа существующих паттернов
            поведения. Безусловно, сложившаяся структура... Вот вам яркий пример
            современных тенденций — сложившаяся структура организации не
            оставляет шанса для анализа существующих паттернов поведения.
            Безусловно, сложившаяся структура. Вот вам яркий пример современных
            тенденций — сложившаяся структура организации не оставляет шанса для
            анализа существующих паттернов поведения. Безусловно, сложившаяся
            структура...Вот вам яркий пример современных тенденций — сложившаяся
            структура организации не оставляет шанса для анализа существующих
            паттернов поведения. Безусловно, сложившаяся структура...
          </p>
        )}
        <p
          className={styles.desc__handler}
          onClick={() => setOpenDesc(!openDesc)}
        >
          {!openDesc ? "Развернуть" : "Скрыть"}
        </p>
      </div>
    </div>
  );
};
