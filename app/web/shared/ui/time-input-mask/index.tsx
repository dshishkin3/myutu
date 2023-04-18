import InputMask from "react-input-mask";

import styles from "./style.module.scss";

export function TimeInput(props: any) {
  let mask = "12:34";
  let formatChars = {
    "1": "[0-2]",
    "2": "[0-9]",
    "3": "[0-5]",
    "4": "[0-9]",
  };

  let beforeMaskedValueChange = (
    newState: any,
    oldState: any,
    userInput: any
  ) => {
    let { value } = newState;

    // Conditional mask for the 2nd digit base on the first digit
    if (value.startsWith("2"))
      formatChars["2"] = "[0-3]"; // To block 24, 25, etc.
    else formatChars["2"] = "[0-9]"; // To allow 05, 12, etc.
    return { value, selection: newState.selection };
  };
  return (
    <InputMask
      className={styles.input__time}
      mask={mask}
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
      placeholder="00:00"
    ></InputMask>
  );
}
