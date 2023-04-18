import React, { useState, useRef, useEffect, FC, HTMLAttributes } from "react";

type ObserveElementProps = {
    threshold?: number;
    root?: null | any;
    element: React.ReactElement
}

export const Observe: FC<HTMLAttributes<HTMLDivElement> & ObserveElementProps> = ({ element, threshold = 0.5, root = null, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [yetVisible, setYetVisible] = useState<boolean>(false);

    useEffect(() => {
        // Объявляем наблюдателя
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                // При первом рендере все элементы становятся видимыми, 
                // тк еще не отрендеривались элементы, после того как прошел рендер у нас элемент виден только первый.
                entry.isIntersecting && setYetVisible(true);
            },
            {
                threshold,
                root,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            ref.current && observer.unobserve(ref.current);
        };
    }, [threshold, root]);


    const getModifyElement = () => {
        return React.Children.map(element, (child) => {
            return React.cloneElement(child, {
                observing: isVisible,
                viewed: yetVisible
            })
        })
    };

    return <div ref={ref} {...props}>{yetVisible ? getModifyElement() : isVisible && getModifyElement()}</div>;
};