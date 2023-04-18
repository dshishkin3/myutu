import React, { useState, useRef, HTMLAttributes } from "react";
import { TextField } from "app/web/shared/ui";
import style from "./style.module.scss";
import { useOnClickOutside } from "usehooks-ts";
// import SelectArrowImg from 'app/assets/img/select-arrow.svg';
import { useEffect } from "react";
import { ImgSelectArrow } from "app/web/shared/config/images";
import Image from "next/image";
import arrow from "app/assets/images/arrowDropDownBlue.svg";

interface ISelect {
    options: { label: string; value: string | number | boolean }[];
    onChange: (value: { label: string; value: string | number }) => void;
    value?: string | number | boolean | any;
    placeholder?: string;
    label?: string;
    name?: string;
    requiredstar?: boolean;
}

export const SelectField: React.FC<ISelect> = ({
    options,
    onChange = () => { },
    value = "",
    placeholder = "",
    name,
    label = undefined,
    requiredstar,
    ...props
}) => {
    const optionBlockRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string | number>("");

    const handleChange = (label: string, value: string | number | any) => {
        // Выбор значения
        setIsOpen((prev) => !prev);
        setInputValue(label);
        onChange({ label, value });
    };
    const handleGetValue = () => {
        // Получаем тектовое значение взависимости от value
        let item = options.find((item) => item.value === value);

        if (item) {
            setInputValue(item.label);
        } else {
            setInputValue("");
        }
    };

    useOnClickOutside(optionBlockRef, () => setIsOpen(false)); // Открытие закрытия блока

    useEffect(() => {
        handleGetValue();
    }, [value, options]);

    return (
        <div className={[style.select].join(" ")} data-is-open={isOpen} data-length={options.length}>
            <div className={style.select_layer} onClick={() => setIsOpen((prev) => !prev)} >
                <TextField
                    type="text"
                    readOnly
                    label={label}
                    requiredstar={requiredstar}
                    defaultValue={inputValue}
                    placeholder={placeholder}
                    isOpenOptions={isOpen}
                />
                <span className={style.select__arrow}>
                    <Image
                        src={arrow}
                        alt="arrowMenu"
                        width={24}
                        height={24}
                        style={{
                            transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                        }}
                    />
                </span>
            </div>
            <div
                ref={optionBlockRef}
                className={`${style.select_options} ${options.length === 0 ? style.select__empty_options : ''}`}
                style={{ display: isOpen ? "block" : "none" }}
                role="list"
            >
                {options.map((key, index) => (
                    <span
                        key={key.label + " " + index}
                        className={style.select_options__item}
                        onClick={() => handleChange(key.label, key.value)}
                    >
                        {key.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SelectField;
