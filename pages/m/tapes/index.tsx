import React, { useEffect, useRef, useState } from "react";
import style from './style.module.scss';
import { ImgLike, ImgDislike, ImgShare, ImgMessage, ImgAddition, ImgEye, ImgVolume, ImgPlayAdd, ImgSearch } from "app/web/shared/config/assets";
import Image from "next/image";
import { useToggle } from "usehooks-ts";
import { Observe } from "app/mobile/features/observe-element";
import { Tape } from "app/mobile/entities/tape";
import { ImgGirlHero } from "app/web/shared/config/images";
const Index = () => {
    const [tab, setTab] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startY, setStartY] = useState(0);

    const handleMouseDown = (e: any) => {
        setDragging(true);
        setStartY(e.clientY);
    };

    const handleMouseMove = (e: any) => {
        if (dragging) {
            setPositionY(-(e.clientY - positionY));
            console.log(-(e.clientY - positionY));

            setStartY(e.clientY);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div className="flex items-center justify-center flex-col h-full">
            <Image src={ImgGirlHero} width={300} height={300} />
            <h1 className="text-[30px] font-bold text-[#333232] mt-[30px]">Раздел в разработке</h1>
        </div>
    );

    return (
        <div className={style.tapes}>
            <div className={style.tapes__top_bar}>
                {['Моя студия', 'Лента', 'Популярное'].map((key, index) => (
                    <div key={key} className={`${style.tapes__tab} ${index === tab ? style.tapes__tab__active : ''}`} onClick={() => setTab(index)}>{key}</div>
                ))}
                <Image src={ImgPlayAdd} />
                <Image src={ImgSearch} />
            </div>
            <div className={style.tapes__list}>
                {[...Array(10)].map((key, index) => (
                    <Observe
                        key={index}
                        className={style.tape}
                        element={<Tape />} />
                ))}
            </div>

            <div className={style.modal_commentary}
                style={{ position: 'absolute', bottom: positionY }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <span className={style.modal_commentary__title}>Комментарии</span>
                <div className={style.modal_commentary__commentaries}>
                    {[...Array(100)].map((key, index) => (
                        <div className={style.commentary} key={index}>
                            <div className={style.commentary__user__image}>
                                <img src="https://via.placeholder.com/150" width="30" className="" />
                            </div>
                            <div className={style.commentary__content}>
                                <span className={style.commentary__user_name}>moonlight</span>
                                <span className={style.commentary__description}>В своём стремлении повысить качество жизни, они забывают, что глубокий уровень погружения способ...</span>
                                <div className={style.commentary__action}>
                                    <button>Редактировать</button>
                                    <button>Удалить</button>
                                    <button>Развернуть</button>
                                </div>
                            </div>
                            <div className={style.commentary__like}>
                                <img src="https://via.placeholder.com/150" width="18" />
                                <span className="block">1002</span>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
