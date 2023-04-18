import { setCategoryId, setSubcategoryId } from "app/store/slices/searchSlice";
import { RootState } from "app/store/store";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.scss";

const CategorySection: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.header);
  const { categoryId } = useSelector((state: RootState) => state.search);

  return (
    <div className={style.category_section}>
      {categories.length === 0 &&
        [...Array(23)].map((key, index) => (
          <ContentLoader
            key={index}
            speed={2}
            width={120}
            height={37}
            viewBox="0 0 120 37"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="8" ry="8" width="120" height="37" />
          </ContentLoader>
        ))}
      {categories.length !== 0 &&
        categories.map((key: any) => (
          <div
            style={{
              outline:
                key.id === categoryId && router.pathname === "/search"
                  ? "rgb(42, 198, 250) solid 2px"
                  : "",
              outlineOffset:
                key.id === categoryId && router.pathname === "/search"
                  ? "-2px"
                  : "",
            }}
            key={key.name}
            className={style.category_section__item}
            onClick={() => {
              dispatch(setCategoryId(key.id));
              router.push(`/search?cname=${key.name}`)
            }
            }
          >
            <img src={key.filePath} width="25" />
            <span>{key.name}</span>
          </div>
        ))}
    </div>
  );
};

export default CategorySection;
