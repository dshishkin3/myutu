import React, { FC, useContext, useState } from "react";
import { ObserveContext } from "./model";


export const ObserveProvider: FC<any> = ({ children, elements = 0 }) => {
    const [state, setState] = useState({
        elements: Array(React.Children.count(children)).fill({ muted: false, playing: true }),
    });

    const changeObserveElement = (id: number, observe: boolean) => {
        setState(prev => ({
            ...prev,
            elements: prev.elements.map((key, index) => {
                if (id === index) {
                    return {
                        ...key,
                        muted: observe ? false : true,
                        playing: observe ? true : false
                    }
                }
            })
        }))
    };


    return (
        <ObserveContext.Provider value={{
            changeObserveElement
        }}>
            {
                React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {
                        numelement: index
                    })
                })
            }
        </ObserveContext.Provider>
    );
};