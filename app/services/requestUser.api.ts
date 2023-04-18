import { IRequestUser } from "../models/models";

export const getRequestUser = async (): Promise<IRequestUser[] | undefined> => {
  try {
    const res = await fetch(`${process.env.api_root}/adsSearch/{"Type":"REQUEST", "Limit":"5"}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });

    const { Data: [{ value }] } = await res.json();
    
    return value;
  } catch (error) {
    console.log(error);
  }
}