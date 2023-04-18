export interface ICategory {
  id: number;
  Name: string;
  icon?: string;
}

export interface ISubcategory extends ICategory {
  Categories_id: number;
}

export interface ICategories {
  Data: ICategory[];
}

export interface IRequestUser {
  id: number;
  AddressLine: string;
  Date: string;
  Description: string;
  Name: string;
  Preview: string;
  Price: number;
  TypeAds: string;
}

export interface IRegIndividualUser {
  Person: string;
  Login: string;
  Password: string;
  RepeatPassword: string;
  CodePhoneCountry: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Gender: string;
  FriendlyCode: string;
}

export interface IRegLegallyUser extends IRegIndividualUser {
  CompanyPhone: string;
  CompanyName: string;
  TaxNumber: string;
  CompanyAdress: string;
}

export interface IAds {
  addressLine: string;
  date: string;
  description: string;
  id: number;
  name: string;
  preview: string;
  price: number;
  targetId: number;
  targeted: boolean;
  typeAds: string;
}

export interface ILoginData {
  login: string;
  password: string;
  userToken: string;
}

export interface IAdTags {
  TagsId: number;
  TagsName: string;
}

export interface IAdTimeInterval {
  Id: number;
  Name: string;
}

export interface ITime {
  id: number;
  Name: string;
}

export interface IAd {
  IdAd: string;
  IdUser: string;
  AddressLine: string;
  CategoryData: {
    SubcategoryId: number | string;
    SubcategoryName: string;
    CategoryId: number | string;
    CategoryName: string;
  };
  CostDelivery: number | string;
  Currency: number;
  Date: string;
  Description: string;
  HasDelivery: boolean;
  Location: {
    AdressLine: string;
    City: string;
    Country: string;
    House: string;
    Latitude: number;
    Longtitude: number;
    Street: number;
  };
  Name: string;
  Preview: string;
  Price: number;
  Subcategory: number;
  Tags: IAdTags[];
  "Time Intervals": IAdTimeInterval[];
  Type: string;
  TypeAds: string;
  Units: string;
  UseId: string;
  UserImage: string;
  UserName: string;
  Video: string;
  Views: number;
  id: string;
}

export interface IAdUser extends IAd {
  MyViews: number;
  Subscribed: boolean;
  inFavorite: boolean;
  isAuthor: boolean;
}

export interface IAdRequest {
  Type: string;
  state: string;
  value: IAdUser[];
}

export interface ITag {
  id: number;
  Name: string;
}

export interface ICity {
  id: number;
  Name: string;
}

export interface ILocation {
  AddressLine: string;
  Country: string;
  City: string;
  Street: string;
  House: string;
  Coordinates: string;
}

export interface IRequestFile {
  data: {
    type: string;
    reason: string;
    link: string;
    folder: string;
  };
  localeURL: string;
}

export interface ICreateAd {
  IdUser: string;
  Subcategory: string | number;
  Video: string;
  Preview: string;
  Name: string;
  HashTag: string;
  Price: string;
  Units: string;
  Description: string;
  Location: ILocation;
  CostDelivery: string;
  HasDelivery: boolean | string;
  Payment?: string;
  Currency: string;
  TypeAds: string;
  Time: string;
}
export interface IUserInfo {
  login: string;
  avatar: string;
  subscribers: number;
  subscriptions: number;
  sapphire: number;
  rate: number;
  reviews: number;
  FriendlyCode: string;
}
export interface SearchResultItem {
  id: number;
  Preview: string;
  Name: string;
  Description: string;
  AddressLine: string;
  Price: string;
}
export interface SearchResult {
  value: SearchResultItem[];
  catname?: string | undefined;
  catid?: string | undefined;
  text?: string | undefined;
}

export interface SearchData {
  Search?: string;
  Category?: string;
  Tags?: string;
  Range?: string;
  Subcategory?: number;
}
export interface IProfileAd {
  name: string;
  price: number;
  id: number;
  date: string;
  views: number;
  preview: string;
  tab: number;
  targeted: boolean;
  list: any;
  setList: Function;
  typeAds: string;
}

export interface IAverageGrade {
  averageGrade: number;
  image: string;
  login: string;
  referalCode: string;
  reviews: number;
  sapfires: number;
  subscribers: number;
  subscriptions: number;
}
export interface SearchResultItem {
  id: number;
  Preview: string;
  Name: string;
  Description: string;
  AddressLine: string;
  Price: string;
}
export interface SearchResult {
  value: SearchResultItem[];
  catname?: string | undefined;
  catid?: string | undefined;
  text?: string | undefined;
}

export interface SearchData {
  Search?: string;
  Category?: string;
  Tags?: string;
  Range?: string;
  Location?: string;
}
export interface IProfileAd {
  name: string;
  price: number;
  id: number;
  date: string;
  views: number;
  preview: string;
  tab: number;
  targeted: boolean;
  addressLine: string;
}

export interface IAverageGrade {
  averageGrade: number;
  image: string;
  login: string;
  referalCode: string;
  reviews: number;
  sapfires: number;
  subscribers: number;
  subscriptions: number;
}

export interface ISubs {
  id: string;
  login: string;
  image: string;
}

export interface IRestorePassword {
  PhoneNumber: string;
  NewPassword: string;
  RepeatNewPassword: string;
}
