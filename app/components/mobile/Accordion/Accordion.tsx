import React, { useState } from "react";
import styles from "./Accordion.module.scss";
import arrow from "app/assets/images/arrowAccordion.svg";

type IAccordion = {
    title: string;
};

const Accordion = ({ title }: IAccordion) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span>{title}</span>
                <img src={arrow.src} alt="arrow" />
            </div>
        </div>
    );
};

export default Accordion;
