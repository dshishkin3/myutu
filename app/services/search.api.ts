export const getSearchItems = async (text: string) => {    
    try {
        const res = await fetch(`${process.env.api_root}/adsSearch/{"Search": "${text}"}`, {
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