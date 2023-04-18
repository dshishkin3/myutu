import { FC } from "react";
import styles from "./style.module.scss";

interface INavProps {
  page: string;
  setPage: (arg0: string) => void;
}

const navItems = [
  { id: 1, name: "Моя студия" },
  { id: 2, name: "Лента" },
  { id: 3, name: "Популярное" },
];

export const Nav: FC<INavProps> = ({ page, setPage }) => {
  return (
    <div className={styles.nav}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.nav__item} ${
            page === item.name && styles.nav__item_active
          }`}
          onClick={() => setPage(item.name)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
