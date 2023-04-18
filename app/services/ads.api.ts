import { IAds } from "../models/models";

export const getAds = async (uid:string): Promise<IAds[] | undefined> => {
  const id = (uid === "" || uid === null || uid === undefined ? 0 : uid);
  const _URL = `${process.env.api_root}/adsSearch/newAds/${id}/Чебоксары`
  
  try {
    const res = await fetch(_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });

    const { value } = await res.json()
    
    return value;
  } catch (error) {
    console.log(error);
  }
}

export const getAd = async (id: string, token: string | undefined = "") => {
  try {  
    const data: any = { AdId: id };
    
    console.log(data, token);
    
    if (token && token !== '') { data.UserId = token; }

    const res = await fetch(`${process.env.api_root}/transfer/ad/${JSON.stringify(data)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const { Data } = await res.json();

    return Data;

  } catch (error) {
    console.log(error);
  }
}


export const getAdsSearch = async (data: any): Promise<any | undefined> => {
  try {
    const res = await fetch(`${process.env.api_root}/adsSearch/${JSON.stringify(data)}`, {method: "POST"})
    
    const { Data: [{ value }]} = await res.json();
  
    return value;
  } catch(err) {
    console.log(err);
  }
}

export const getAverageGrade = async (id: string) => {
  try {
    const response = await fetch(`${process.env.api_root}/users/info/{"userId":"${id}"}`);

    const data = response.json();

    return data;    
  } catch (error) {
    console.log(error);
  }
}

export const getAdsRequestUser = async (): Promise<any | undefined> => {
  try {
    const res = await fetch(`${process.env.api_root}/transfer/ads/{ "TypeAds": "REQUEST" }`, {method: "GET"})
    const { Data: [{ value }]} = await res.json();

    return value;
  } catch(err) {
    console.log(err);
  }
}


