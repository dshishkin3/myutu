import React, { useState } from "react";
import styles from "./style.module.scss";
import category_1 from "app/assets/images/category_1.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCategoryId } from "app/store/slices/searchSlice";

type ICaregory = {
    id: string;
    name: string;
    title: string;
    filePath: string;
};

const CardCategory = ({ title, filePath, id, name }: ICaregory) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const routeHandler = (id: number, name: string) => {
        dispatch(setCategoryId(id));
        router.push(`/m/search?cid=${id}&cname=${name}`);
    };
    return (
        <>
            <div className={styles.card} onClick={() => routeHandler(id, name)}>
                <img src={filePath} alt="filePath" />
                <span>{title}</span>
            </div>
        </>
    );
};

export default CardCategory;
