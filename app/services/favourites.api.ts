export const addFavourite = async (idUser: string, idAd: string) => {  
  try {
    const response = await fetch(`${process.env.api_root}/transfer/favorite/{"IdUser":"${idUser}", "IdAds":"${idAd}"}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });

    const { Data } = await response.json();
    
    return Data[0];
  } catch (error) {
    console.log(error);
  }
}

export const deleteFavourite = async (idUser: string, idAd: string) => {
  try {
    const response = await fetch(`${process.env.api_root}/transfer/favorite/remove/{"IdUser":"${idUser}", "IdAd":"${idAd}"}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });

    const { Data } = await response.json();

    return Data[0];
  } catch (error) {
    
  }
}