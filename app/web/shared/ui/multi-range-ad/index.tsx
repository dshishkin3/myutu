import { useState } from "react";
import ReactSlider from "react-slider";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store/store";

import { Col } from "../col";
import { TextField } from "../text-field";

import multirangeIcon from "app/assets/images/multi-rangde-slider.svg";
import { setPriceFrom, setPriceTo } from "app/store/slices/searchSlice";
export const MultiRange = () => {
  const [max, setMax] = useState<number>(1000000);
  const [test, setTest] = useState([0, 1000000]);

  const dispatch = useDispatch();
  // изменение через слайдер
  const onChange = (value: any) => {
    const newPosition = test.slice();
    newPosition[0] = value[0];
    newPosition[1] = value[1];
    setTest(newPosition);
    dispatch(setPriceFrom(value[0]));
    dispatch(setPriceTo(value[1]));
  };

  // изменение через инпут -
  const onChangeMin = (value: any) => {
    const newPosition = test.slice();
    newPosition[0] = value;
    setTest(newPosition);
    dispatch(setPriceFrom(value));
  };

  // изменение через инпут +
  const onChangeMax = (value: any) => {
    const newPosition = test.slice();
    newPosition[1] = value;
    setTest(newPosition);
    if (value > max) setMax(value);
    dispatch(setPriceTo(value));
  };

  return (
    <div>
      <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        defaultValue={[0, test[1]]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => (
          <div {...props}>
            {" "}
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
        max={max}
      />
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
