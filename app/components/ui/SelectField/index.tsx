import React, { useState, useRef, HTMLAttributes } from 'react';
// import TextField from 'app/entities/forms/TextField';
import style from './style.module.scss';
// import useOnClickOutside from 'app/hooks/useOnClickOutside.hooks';
import SelectArrowImg from 'app/assets/images/arrow.svg';
import { useEffect } from 'react';

interface ISelect {
    options: { label: string; value: string | number }[]
    onChange: (value: { label: string; value: string | number }) => void;
    value?: string | number;
    placeholder?: string;
    label?: string;
    contentEnd?: JSX.Element;
    name?: string;
}

const SelectField: React.FC<ISelect> = ({ options = [], onChange = () => { }, value = "", placeholder = "", name, label = undefined, contentEnd, ...props }) => {
    const optionBlockRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value) 

    const handleChange = (label: string, value: string | number) => { // Выбор значения
        setIsOpen(prev => !prev);
        setInputValue(label)
        onChange({ label, value });
    }


    const handleGetValue = () => { // Получаем тектовое значение взависимости от value
        let item = options.find(item => item.value === value);
        if (item) {
            setInputValue(item.label);
        }
    };

    // useOnClickOutside(optionBlockRef, () => setIsOpen(false)); // Открытие закрытия блока

    useEffect(() => {
        handleGetValue();
    }, [value])

    console.log(options);
    
    return (
        <div className={style.select}>
            {label && <label className={style.select__label}>{label}</label>}
            <input type="text" readOnly onClick={() => setIsOpen(prev => !prev)} value={inputValue} placeholder={placeholder} />
            <img src={SelectArrowImg.src} className={style.select__arrow} />
            <div ref={optionBlockRef} className={style.select_options} style={{ display: isOpen ? 'block' : 'none' }}>
                {options.map((key, index) => <span key={key.label + " " + index} className={style.select_options__item} onClick={() => handleChange(key.label, key.value)}>{key.label}</span>)}
                {contentEnd && contentEnd}
            </div>
        </div>
    );
};

export default SelectField;