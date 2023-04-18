export interface IAdResponse {
  type: string;
  value: IAd;
}

export type IAd = {
  userId: string;
  name: string;
  price: number;
  subcategory: number;
  currency: number;
  city: string;
  location: {
    longitude: number;
    latitude: number;
    city: string;
    addressLine: string;
  };
  timeFrom: string;
  timeTo: string;
  typeAds: string;
  preview: string;
  hasDelivery: boolean;
  costDelivery: number;
  video: string;
  tags: [];
  units: string;
  description: string;
  views: number;
  myViews?: number;
  subscribed?: boolean;
  isAuthor?: boolean;
  inFavorites?: boolean;
  placementDate: string;
  authorInfo: {
    userId: string;
    userName: string;
    userImage: string;
    userRate: number;
    userReviewsCount: number;
    userPhone: string;
  };
};

export const formatterPrice = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});
