import { ICreateAd } from "../models/models";

export async function postPreview(file: File) {  
  try {
    const filePreview = new FormData();
    filePreview.append('file', file);
    filePreview.append('folder', 'previews');
  
    const res = await fetch(`${process.env.api_root}/files/uploadPhoto`, {
      method: 'POST',
      body: filePreview
    })

    const data = await res.json();

    return { data, localeURL: URL.createObjectURL(file) };
  } catch (error) {
    console.log(error);
  }
}

export async function postVideo(file: File) {
  try {
    const filePreview = new FormData();
    filePreview.append('file', file);
    filePreview.append('folder', 'videos');
    
    const res = await fetch(`${process.env.api_root}/files/uploadVideo`, {
      method: 'POST',
      body: filePreview
    })

    const data = await res.json();

    return { data, localeURL: URL.createObjectURL(file) };
  } catch (error) {
    console.log(error);
  }
}

export async function getIntervalsAll() {
  try {
    const res = await fetch(`${process.env.api_root}/times/intervalsAll`);

    const { Data } = await res.json();

    return Data;
  } catch (error) {
    console.log(error);
  }
}

export async function createAd(ad: ICreateAd) {  
  try {
    const res = await fetch(`${process.env.api_root}/transfer/addad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ad)
    })

    const { Data } = await res.json();

    return Data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function confirmCreateAd(uid: string, adID: string) {
  try {
    const res = await fetch(`${process.env.api_root}/transfer/active/${uid}/${adID}/on`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { Data } = await res.json()

    return Data[0];
  } catch(error) {
    console.log(error);
  }
}