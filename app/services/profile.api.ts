import { cookie } from "app/utils/helpers/cookies.helpers";
interface IChangePassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const getData = async (typeAds: string): Promise<any | undefined> => {
  const [moderatedList, activeList, archiveList, rejectedList] =
    await Promise.all([
      fetch(
        `${process.env.api_root_v1}/transfer/getMyAds?userId=${cookie.get(
          "t"
        )}&type=moderated&typeAds=${typeAds}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.api_root_v1}/transfer/getMyAds?userId=${cookie.get(
          "t"
        )}&type=active&typeAds=${typeAds}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.api_root_v1}/transfer/getMyAds?userId=${cookie.get(
          "t"
        )}&type=archive&typeAds=${typeAds}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.api_root_v1}/transfer/getMyAds?userId=${cookie.get(
          "t"
        )}&type=rejected&typeAds=${typeAds}`
      ).then((res) => res.json()),
    ]);

  return [
    moderatedList.value,
    activeList.value,
    archiveList.value,
    rejectedList.value,
  ];
};

export const getUserInfo = async (token: string): Promise<any | undefined> => {
  const [profile, points, feedBack] = await Promise.all([
    fetch(`${process.env.api_root_v1}/users/myInfo?userId=${token}`).then((res) =>
      res.json()
    ),
    fetch(`${process.env.api_root_v1}/users/userPoints?userId=${token}`).then(
      (res) => res.json()
    ),
    fetch(`${process.env.api_root_v1}/reviews/userReviews?userId=${token}`).then(
      (res) => res.json()
    ),
  ]);

  const rateAvg = () => {
    let rates = feedBack.value;
    let rateLen = feedBack.value;
    if (rateLen === 0) {
      return 0;
    }
    let rateSum = 0;

    rates.map((item: any) => {
      rateSum += item.Grade;
    });

    return +(rateSum / rateLen).toFixed(1);
  };

  return {
    login: profile.value[0].login,
    avatar: profile.value[0].image,
    subscribers: profile.value[0].subscribers,
    subscriptions: profile.value[0].subscriptions,
    sapphire: points.value.CountPoints,
    FriendlyCode: points.value.FriendlyCode,
    rate: rateAvg(),
    reviews: feedBack.value.length,
  };
};

export const getReviews = async (): Promise<any | undefined> => {
  const res = await fetch(
    `${process.env.api_root_v1}/reviews/userReviews?userId=${cookie.get("t")}`
  );

  const data = await res.json();

  return data.value;
};

// Получение списка отзывов о пользователе
export const getAboutUserReviews = async (): Promise<any | undefined> => {
  const res = await fetch(
    `${process.env.api_root_v1}/reviews/aboutUserReviews?userId=${cookie.get("t")}`
  );

  const data = await res.json();

  return data.value;
};

// Получение средней оценки продавца
export const getSellerGrade = async (): Promise<any | undefined> => {
  const res = await fetch(
    `${process.env.api_root_v1}/reviews/getSellerGrade?userId=${cookie.get("t")}`
  );

  const data = await res.json();

  return data.value;
};

export const getDealsByUserOrdersList = async (
  type: string = "bookedByUserOrdersList"
): Promise<any | undefined> => {
  const res = await fetch(
    `${process.env.api_root_v1}/orders/${type}?userId=${cookie.get("t")}`
  );

  const data = await res.json();

  return data.value;
};

export const getFavourites = async () => {
  try {
    const res = await fetch(
      `${process.env.api_root_v1}/transfer/favorites/` + cookie.get("t")
    );

    const {
      Data: [{ value }],
    } = await res.json();

    return value;
  } catch (err) {
    console.log(err);
  }
};

export const getSubs = async () => {
  const [{ Userssubscribers }, { Userssubscriptions }] = await Promise.all([
    fetch(
      `${process.env.api_root_v1}/usersSubscriptions/getSubscribers/${cookie.get(
        "t"
      )}`
    ).then((res) => res.json()),
    fetch(`${process.env.api_root_v1}/usersSubscriptions/${cookie.get("t")}`).then(
      (res) => res.json()
    ),
  ]);

  return {
    Userssubscribers,
    Userssubscriptions,
  };
};

// обновление профиля
// изменил запрос
export const updateUserProfile = async (
  form: any
): Promise<any | undefined> => {
  const res = await fetch(`${process.env.api_root_v1}/users/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  return data;
};

// смена пароля
// изменил запрос
export const changeUserPassword = async (
  form: IChangePassword
): Promise<any | undefined> => {
  const res = await fetch(`${process.env.api_root_v1}/users/changePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  return data;
};

// смена аватара
// новый запрос, который нужно переписать на ртк
export async function uploadAvatar(file: File) {
  try {
    const filePreview = new FormData();
    filePreview.append("file", file);
    filePreview.append("folder", "users_avatar");

    const res = await fetch(`${process.env.api_root_v1}/files/uploadPhoto`, {
      method: "POST",
      body: filePreview,
    });

    const data = await res.json();

    return { data, localeURL: URL.createObjectURL(file) };
  } catch (error) {
    console.log(error);
  }
}




// убрать
export const getDeals = async (
  type: string = "bookedByUserOrderList"
): Promise<any | undefined> => {
  const res = await fetch(
    `${process.env.api_root}/calendar/${type}/${cookie.get("t")}`
  );

  const { Order } = await res.json();

  return Order;
};