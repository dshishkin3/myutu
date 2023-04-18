export type AdItemProps = {
  preview: string;
  name: string;
  address: string;
  price: number;
  date: string;
  adId: string;
  auth: number;
  favoriteActon?: boolean;
  favorite?: boolean;
  chip?: string;
  chipColor?: string;
  chipTextColor?: string;
  onPress?: () => void;
};

