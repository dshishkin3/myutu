export const formatToPrice = (num: any) => {
  const formatPrice = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(num);

  return formatPrice;
};
