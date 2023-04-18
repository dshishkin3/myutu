// hook form
export type NumberFormValues = {
  number: string;
};

export type LoginFormValues = {
  login: string;
};

// different types
export type IDeal = {
  name: string;
  id: string;
  orderDate: string;
  orderTime: string;
  userName: string;
  userId: string;
  userAvatar: string;
  buyerNumber: string;
  sellerNumber: string;
  state: string;
  timesInterval: string;
  adId: string;
  adName: string;
  adPreview: string;
  price: number;
  completed: boolean;
  type: string;
  update: number;
  onUpdate: (e: number) => void;
  preview: string;
  date: string;
  addressLine: string;
  tab: number;
};
