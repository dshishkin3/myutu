export const checkingManyPhotos = (url: string) => {
        if (url.indexOf(",") !== -1) {
            return {
                preview: url.split(",")[0],
                all: url.split(",")
            }
        }
        
        return {
            preview: url,
            all: []
        }
    };