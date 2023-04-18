import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store/store';
import Image from 'next/image';
import style from './style.module.scss';
import { filteredSubcategoriesById, toggleIsOpenCategory, setSelectCategory } from 'app/web/features/header/model/headerSlice';
import { useRouter } from 'next/router';
import { setCategoryId, setSubcategoryId } from 'app/store/slices/searchSlice';

export const CategoryModal = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        categories,
        isOpenCategory,
        filteredSubcategories,
        subcategoryName,
        selectCategory,
    } = useSelector((state: RootState) => state.header);

    const handleSearchAds = (categoryId: number, subcategoryId: number) => {
        dispatch(setCategoryId(categoryId));
        dispatch(setSubcategoryId(subcategoryId));
        router.push(`/search?cname=${categories.find(item => item.id === categoryId)?.name}`)
    };

    useEffect(() => {
        if (isOpenCategory) {
            document.body.style.overflow = "hidden";
        }
    }, [isOpenCategory]);

    return (
        <div
            className={style.category_modal}
            onClick={(e) => {
                dispatch(toggleIsOpenCategory(false));
                document.body.style.overflow = "auto";
            }}
        >
            <div className={style.category_modal__wrapper}>
                <div
                    className={style.category_modal__categories}
                    aria-label="categories"
                >
                    {categories.map((key: any) => {
                        return (
                            <div
                                key={key.name}
                                data-is-active={key.id === selectCategory}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(filteredSubcategoriesById(key.id));
                                    dispatch(setSelectCategory(key.id));
                                }}
                            >
                                <Image
                                    src={
                                        key.filePath.indexOf(
                                            "filePath is not present"
                                        ) !== -1
                                            ? ""
                                            : key.filePath
                                    }
                                    alt={"category-icon"}
                                    width={25}
                                    height={25}
                                />
                                <span>{key.name}</span>
                            </div>
                        );
                    })}
                </div>
                <div
                    className={style.subcategory_block}
                    aria-label="subcategories"
                    style={{
                        display:
                            subcategoryName.length !== 0 ? "block" : "none",
                    }}
                >
                    <span className={style.subcategory_block__title}>
                        {subcategoryName}
                    </span>
                    <div className={style.subcategory_block__subcategories}>
                        {filteredSubcategories.map((key: any) => {
                            return (
                                <span
                                    className={style.subcategory_block__item}
                                    onClick={() =>
                                        handleSearchAds(
                                            key.categoriesId,
                                            key.id
                                        )
                                    }
                                >
                                    {key.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
