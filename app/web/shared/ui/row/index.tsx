import React, { HTMLAttributes } from "react";
import styles from './style.module.scss';

export const Row: React.FC<HTMLAttributes<HTMLDivElement> & { colGap?: number; rowGap?: number }> = ({ children, style = {}, colGap = 10, rowGap = 10, className = "", ...props }) => <div className={[styles.row, className].join(" ")} style={{ ...style, columnGap: colGap, rowGap: rowGap }}  {...props}>{children}</div>;