

declare global {
    interface Window {
        ymaps?: any
    }
}

const dotUserPicture = {
    iconLayout: 'default#image',
    iconImageHref: 'https://storage.yandexcloud.net/myutu/icons/map_dot.png',
    iconImageSize: [30, 30],
};

let myMap: any;
let myPlacemark: any;
export const ymapsShowInit = (coords: string) => {
    const [lat, lon] = coords.split("||");
    if (myMap) {
        myMap.destroy();
        myMap = null;
    }
    myMap = new window.ymaps.Map('map', {
        center: [lat, lon],
        zoom: 18
    }, {
        searchControlProvider: 'yandex#search',
    });

    myPlacemark = new window.ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        ...dotUserPicture
    });

    myMap.geoObjects.add(myPlacemark);
};

export const ymapsSetInit = (callback: (e: any) => void, coords: string|undefined ="56.14039207037605||47.2302724998979")=>  {
    const [lat, lon] = coords.split("||");
    if (myMap) {
        myMap.destroy();
        myMap = null;
    }
    var geolocation: any = window.ymaps.geolocation;
    myMap = new window.ymaps.Map('map', {
        center: [lat, lon],
        zoom: 18
    }, {
        searchControlProvider: 'yandex#search'
    });

    geolocation.get({
      provider: 'yandex',
      mapStateAutoApply: true
    }).then(function (result:any) {
        result.geoObjects.options.set({
            preset: 'islands#circleIcon',
            iconColor: '#2AC6FA'
        });
      myMap.geoObjects.add(result.geoObjects);
       
    });

    geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true
    }).then(function (result:any) {        
        result.geoObjects.options.set({
            preset: 'islands#circleIcon',
            iconColor: '#2AC6FA'
        });
      myMap.geoObjects.add(result.geoObjects);
    });

    myMap.events.add('click', function (e: any) {
        var coords = e.get('coords');
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    function createPlacemark(coords: any) {
        return new window.ymaps.Placemark(coords, {}, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true,
            ...dotUserPicture
        });
    }

    function getAddress(coords: any) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        window.ymaps.geocode(coords).then(function (res: any) {
            var firstGeoObject = res.geoObjects.get(0);
            const data = {
                AdressLine: firstGeoObject.getAddressLine(),
                City: firstGeoObject.getLocalities()[0],
                Coordinates: coords.reverse().join('||'),
                Country: firstGeoObject.getCountry(),
                Street: firstGeoObject.getThoroughfare(),
                House: firstGeoObject.getPremiseNumber()
            };
            callback(data);
            myPlacemark.properties.set({});
        });
    }

    return () => {
        myMap.destroy();
        myMap = null;
    }
}