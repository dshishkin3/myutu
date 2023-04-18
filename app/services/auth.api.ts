import { ILoginData, IRestorePassword } from "../models/models";

export const authLogin = async (data: ILoginData) => {
  try {
    const response = await fetch(`${process.env.api_root}/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const logRes = await response.json();

    return logRes;
  } catch (err) {
    return err;
  }
};

export const checkLogin = async (login: string) => {
  const response = await fetch(
    `${process.env.api_root}/users/preRegistration/{"PreferedLogin":"${login}"}`
  );

  const { Data } = await response.json();

  return Data[0];
};

export const checkPhone = async (phone: string) => {
  const response = await fetch(
    `${process.env.api_root}/users/preRegistration/{"PhoneNumber":"${phone}"}`
  );

  const { Data } = await response.json();

  return Data[0];
};

// Проверка на корректность реферального кода 03.10.2022

export const checkReferal = async (code: string) => {
  try {
    const response = await fetch(`${process.env.api_root}/users/checkReferal`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ FriendlyCode: code }),
    });
    const { Data } = await response.json();

    console.log(JSON.stringify({ FriendlyCode: code }));

    return Data[0];
  } catch (err) {
    console.log(err);
  }
};

export const loginRestoreCall = async (login: string) => {
  try {
    const response = await fetch(
      `${process.env.api_root}/passwordrestore/restore/${login}`,
      {
        method: "POST",
      }
    );

    const { Data } = await response.json();

    return Data[0];
  } catch (error) {
    console.log(error);
  }
};

export const confirmCodeRestore = async (code: string, login: string) => {
  try {
    const response = await fetch(
      `${process.env.api_root}/passwordrestore/restore/code/{"Code":"${code}", "Phone":"${login}"}`,
      {
        method: "POST",
      }
    );

    const { Data } = await response.json();

    return Data[0];
  } catch (error) {
    console.log(error);
  }
};

export const restorePassword = async (form: IRestorePassword) => {
  try {
    const response = await fetch(
      `${
        process.env.api_root
      }/passwordrestore/restore/accepted/${JSON.stringify(form)}`,
      {
        method: "POST",
      }
    );

    const { Data } = await response.json();

    return Data[0];
  } catch (error) {
    console.log(error);
  }
};

// admin
// Q1qw2we3e!
