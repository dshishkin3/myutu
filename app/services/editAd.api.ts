export const editAd = async (adEdit: any) => {
  try {
    const response = await fetch(`${process.env.api_root}/transfer/editad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adEdit),
    })

    const { Data } = await response.json();

    return Data[0];
  } catch (error) {
    console.log(error);
  }
}