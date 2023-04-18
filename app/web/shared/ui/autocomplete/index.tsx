import React, {
    useState,
    FC,
    ChangeEvent,
    HTMLAttributes,
    FormEvent,
    useRef,
} from "react";
import style from "./style.module.scss";
import { useOnClickOutside } from "usehooks-ts";
import { useEffect } from "react";

interface IAutocomplete {
    label?: string;
    name?: string;
    value?: string | number;
    type?: string;
    onChange?: (data: { label: string; value: string | number }) => void;
    onChangeText?: (text: string) => void;
    options: { label: string; value: string | number }[];
}

export const Autocomplete: FC<IAutocomplete> = ({
    label,
    type = "text",
    options,
    value,
    onChangeText = () => {},
    onChange = () => {},
    ...props
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const listRef = useRef<HTMLDivElement>(null);

    const handleClick = (item: { label: string; value: string | number }) => {
        onChange({ label: item.label, value: item.value });
        setIsOpen((prev) => false);
    };

    useOnClickOutside(listRef, () => setIsOpen((prev) => false));

    useEffect(() => {
        let item = options.find((item) => item.value === value);

        if (item) {
            setSearchText(item.label);
        } else {
            setSearchText(`${value}`);
        }
    }, [value]);

    return (
        <div className={style.autocomplete}>
            {label && (
                <label className={style.autocomplete__label}>{label}</label>
            )}

            <input
                style={{ borderRadius: isOpen ? "8px 8px 0px 0px" : "8px" }}
                type={type}
                className={style.autocomplete__input}
                value={searchText}
                onChange={({ target: { value } }) => {
                    setSearchText(value);
                    onChangeText(value);
                }}
                onClick={() => setIsOpen((prev) => !prev)}
                data-is-open={isOpen}
            />

            <div
                ref={listRef}
                className={style.autocomplete__list}
                style={{ display: isOpen ? "block" : "none" }}
            >
                {options &&
                    options.map((key, index) => {
                        if (
                            key.label
                                .toLowerCase()
                                .trim()
                                .indexOf(searchText.toLowerCase().trim()) !== -1
                        ) {
                            return (
                                <div
                                    key={key.label}
                                    className={style.autocomplete__item}
                                    onClick={() => handleClick(key)}
                                >
                                    {key.label}
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
};
