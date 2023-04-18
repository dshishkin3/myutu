import React, { FC, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, Circle } from "@pbe/react-yandex-maps";
import { setLocation } from 'app/store/slices/adSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store/store';
import { useRouter } from 'next/router';


export const MapAd: FC = () => {
    const location = useSelector((state: RootState) => state.ad.location);
    const placemarkRef = useRef(null);
    const mapRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClickMap = (event: any) => {
        let coords = event.get("coords");
        window.ymaps.geocode(coords).then(function (res: any) {
            var firstGeoObject = res.geoObjects.get(0);

            dispatch(setLocation({ name: "latitude", value: coords[0] }));
            dispatch(setLocation({ name: "longitude", value: coords[1] }));
            dispatch(setLocation({ name: "addressLine", value: firstGeoObject.getAddressLine() }));
        });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (router.query.id) return false;
                dispatch(setLocation({ name: "latitude", value: position.coords.latitude }));
                dispatch(setLocation({ name: "longitude", value: position.coords.longitude }));
            },
            (err) => {
                dispatch(setLocation({ name: "latitude", value: 55.7522 }));
                dispatch(setLocation({ name: "longitude", value: 37.6156 }));
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);

    useEffect(() => {
        if (placemarkRef.current) {
            console.log(mapRef.current);
            mapRef.current?.setCenter([
                location.latitude,
                location.longitude,
            ]);
            placemarkRef.current?.geometry.setCoordinates([
                location.latitude,
                location.longitude,
            ]);
        }
    }, [location]);


    if (location.latitude === null || location.longitude === null) return <></>

    return (
        <YMaps>
            <Map
                defaultState={{
                    center: [
                        location.latitude,
                        location.longitude,
                    ],
                    zoom: 10,
                }}
                width="100%"
                height="100%"
                onClick={handleClickMap}
                instanceRef={(ref) => {
                    mapRef.current = ref;
                }}
            >
                <Placemark
                    instanceRef={(ref) => {
                        placemarkRef.current = ref;
                    }}
                    geometry={[
                        location.latitude,
                        location.longitude,
                    ]}
                />
            </Map>
        </YMaps>
    );
};