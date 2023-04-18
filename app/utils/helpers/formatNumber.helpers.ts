export const numberFormat = (count: number) => {
  if (count >= 1e3 && count < 1e6) {
    return parseInt(`${(count / 1e3) * 10}`) / 10 + "K";
  } else if (count >= 1e6 && count < 1e9) {
    return parseInt(`${(count / 1e6) * 10}`) / 10 + "M";
  } else {
    return count;
  }
};
