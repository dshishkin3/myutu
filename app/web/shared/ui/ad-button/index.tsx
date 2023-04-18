import React, { ReactNode } from "react";

import styles from "./style.module.scss";

export interface IAdButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  onClick?: () => void;
  background: string;
  color: string;
  border?: string;
  margin?: string;
  maxWidth?: number;
  fontWeight?: number;
}

export const AdButton = ({
  children,
  onClick,
  background,
  color,
  border = "none",
  margin,
  maxWidth,
  fontWeight,
}: IAdButtonProps): JSX.Element => {
  return (
    <button
      className={styles.callAd}
      onClick={onClick}
      style={{
        background: background,
        color: color,
        border: border,
        margin: margin,
        maxWidth: maxWidth,
        fontWeight: fontWeight,
      }}
    >
      {children}
    </button>
  );
};
