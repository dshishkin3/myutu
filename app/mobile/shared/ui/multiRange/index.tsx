import { useState } from "react";
import ReactSlider from "react-slider";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

import multirangeIcon from "app/assets/images/multi-rangde-slider.svg";
import { Col, TextField } from "app/web/shared/ui";

export const MultiRange = () => {
    // берем макс. сумму объявления
    const { priceTo } = useSelector((state: RootState) => state.search);

    const [test, setTest] = useState([0, Math.round(priceTo / 2)]);

    // изменение через слайдер
    const onChange = (value: any) => {
        const newPosition = test.slice();
        newPosition[0] = value[0];
        newPosition[1] = value[1];
        setTest(newPosition);
    };

    // изменение через инпут -
    const onChangeMin = (value: any) => {
        const newPosition = test.slice();
        newPosition[0] = value;
        setTest(newPosition);
    };

    // изменение через инпут +
    const onChangeMax = (value: any) => {
        const newPosition = test.slice();
        newPosition[1] = value;
        setTest(newPosition);
    };

    return (
        <div className="mt-[10px]">
            <div>
                <ReactSlider
                    className="customSlider"
                    trackClassName="customSlider-track"
                    thumbClassName="example-thumb"
                    defaultValue={[0, 100]}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                        <div {...props}>
                            <Image
                                src={multirangeIcon}
                                alt="multirange-icon"
                                width={22}
                                height={22}
                            />
                        </div>
                    )}
                    pearling
                    minDistance={10}
                    onAfterChange={(e) => onChange(e)}
                    value={test}
                    max={priceTo}
                />
            </div>
            <div style={{ paddingTop: 50 }}>
                <Col sm="12" className="flex gap-[20px]">
                    <TextField
                        type="number"
                        placeholder="Цена от"
                        value={test[0]}
                        name="priceTo"
                        onChange={(e: any) => onChangeMin(e.target.value)}
                    />
                    <TextField
                        placeholder="Цена до"
                        value={test[1]}
                        name="priceFrom"
                        onChange={(e: any) => onChangeMax(e.target.value)}
                        type="number"
                    />
                </Col>
            </div>
        </div>
    );
};
