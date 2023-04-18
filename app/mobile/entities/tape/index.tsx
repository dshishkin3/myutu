import React, { useState, useRef, useEffect } from "react";
import { useToggle } from "usehooks-ts";
import style from './style.module.scss';
import Image from "next/image";
import { ImgLike, ImgDislike, ImgShare, ImgMessage, ImgAddition, ImgEye, ImgVolume, ImgPlayAdd, ImgSearch } from "app/web/shared/config/assets";

export const Tape = ({ observing }: any) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [visibleElements, toggleVisibleElements] = useToggle();
    const [isPlaying, toggleIsPlaying, setIsPlaying] = useToggle(true);
    const [isMuted, toggleMuted, setMuted] = useToggle(true);
    const handlePlay = () => {
        toggleIsPlaying();
        if (isPlaying) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause();
        }
    };

    const observingChange = () => {
        try {
            if (observing) {
                videoRef.current?.play();
                setMuted(observing ? false : true);
            } else {
                videoRef.current?.pause();
                setMuted(observing ? false : true);
            }
        } catch (err) {
            console.error('tapes: ', err);
        }
    };


    useEffect(() => {
        observingChange();
    }, [observing, videoRef]);

    return (
        <div className={style.tape}>
            <video
                autoPlay
                muted={isMuted}
                onClick={handlePlay}
                src="https://upload.myutu.ru/videos/g1wVGOgzdaZqQuSCHoqx8neaT.mp4"
                className={style.tape__video} ref={videoRef}>
            </video>

            <div className={style.tape__right_section} style={{ display: visibleElements ? 'none' : 'block' }}>
                <div className={style.user_ad}>
                    <img src="https://via.placeholder.com/150" className={style.user_ad__image} />
                    <div>
                        <span className={style.user_ad__name}>Алена Петрова</span>
                        <button className={style.user_ad__button}>Подписаться</button>
                    </div>
                </div>

                <div className={style.user_ad__description}>
                    {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae consequatur vel laborum distinctio repellat sapiente suscipit! Laborum vitae maxime in dicta reprehenderit illum consequatur, voluptas repudiandae quae porro nam itaque!".substr(0, 100)}
                </div>

                <div className={style.user_ad__tags}>
                    <span className={style.user_ad__tag_item}>#хештег1</span>
                    <span className={style.user_ad__tag_item}>#хештег1</span>
                    <span className={style.user_ad__tag_item}>#хештег1</span>
                </div>

                <div className={style.user_ad__ad_link}>
                    <img src="https://via.placeholder.com/150" className={style.user_ad__ad_image} />
                    <span className={style.user_ad__ad_name}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores officia delectus veritatis quisquam soluta ex, iste, velit, excepturi corrupti beatae voluptatum fuga repudiandae natus repellendus necessitatibus porro? Sit, necessitatibus impedit.</span>
                </div>
            </div>
            <div className={style.tape__actions}>
                <div className={style.tape__element} style={{ display: visibleElements ? 'none' : 'flex' }}>
                    <Image src={ImgLike} alt="like" />
                    <span className="block text-[16px] text-[#fff]">10</span>
                </div>
                <div className={style.tape__element} style={{ display: visibleElements ? 'none' : 'flex' }}>
                    <Image src={ImgMessage} alt="message" />
                    <span className="block text-[16px] text-[#fff]">10</span>
                </div>
                <div className={style.tape__element} style={{ display: visibleElements ? 'none' : 'flex' }}>
                    <Image src={ImgShare} />
                </div>
                <div className={style.tape__element} style={{ display: visibleElements ? 'none' : 'flex' }}>
                    <Image src={ImgDislike} />
                </div>
                <div className={style.tape__addition_element} style={{ display: visibleElements ? 'none' : 'flex' }}>
                    <Image src={ImgAddition} />
                </div>
                <div className={style.tape__visible_element} onClick={toggleVisibleElements}>
                    <Image src={ImgEye} alt="eye" />
                </div>
                <div className={style.tape__muted_element} onClick={toggleMuted}>
                    <Image src={ImgVolume} alt="eye" />
                </div>
            </div>
        </div>
    )
}