import AdList from "app/components/mobile/Advertisements/AnnouncementFeed/AdList";
import Sections from "app/components/mobile/Advertisements/Sections/Sections";
import { AdItemProps } from "app/components/mobile/Advertisements/types";
import Router from "next/router";
import React from "react";
import style from "./Advertisements.module.scss";

const Index = () => {
    const redirectToAdPage = () => {
        Router.push("/m/ad");
    };

    const mockData: AdItemProps[] = [
        {
            preview: "https://picsum.photos/300/300",
            name: "Beautiful House in the Mountains",
            address: "123 Mountain Drive, Snowy Town",
            price: 500000,
            date: "01.01.2023",
            adId: "1",
            auth: 1,
            favoriteActon: true,
            favorite: false,
            chip: "New",
            chipColor: "#2ac6fa",
            chipTextColor: "#fff",
            onPress: redirectToAdPage,
        },
        {
            preview: "https://picsum.photos/300/300",
            name: "Luxury Apartment in the City",
            address: "456 City Boulevard, Busy City",
            price: 200000,
            date: "02.01.2023",
            adId: "2",
            auth: 2,
            favoriteActon: true,
            favorite: true,
            chip: "Hot Deal",
            chipColor: "#ff6f5e",
            chipTextColor: "#fff",
            onPress: redirectToAdPage,
        },
        {
            preview: "https://picsum.photos/300/300",
            name: "Charming Cottage in the Country",
            address: "789 Country Lane, Quiet Village",
            price: 350000,
            date: "03.01.2023",
            adId: "3",
            auth: 3,
            favoriteActon: true,
            favorite: false,
            chip: "New",
            chipColor: "#2ac6fa",
            chipTextColor: "#fff",
            onPress: redirectToAdPage,
        },
        {
            preview: "https://picsum.photos/300/300",
            name: "Stylish Loft in the Heart of the City",
            address: "246 City Center, Trendy District",
            price: 250000,
            date: "04.01.2023",
            adId: "4",
            auth: 4,
            favoriteActon: true,
            favorite: true,
            chip: "Hot Deal",
            chipColor: "#ff6f5e",
            chipTextColor: "#fff",
            onPress: redirectToAdPage,
        },
        {
            preview: "https://picsum.photos/300/300",
            name: "Elegant Mansion by the Beach",
            address: "369 Beachfront Avenue, Seaside City",
            price: 750000,
            date: "05.01.2023",
            adId: "5",
            auth: 5,
            favoriteActon: true,
            favorite: false,
            chip: "New",
            chipColor: "#2ac6fa",
            chipTextColor: "#fff",
            onPress: redirectToAdPage,
        },
        {
            preview: "https://picsum.photos/300/300",
            name: "Cozy Studio in the Art District",
            address: "159 Art Street, Creative Neighborhood",
            price: 150000,
            date: "06.01.2023",
            adId: "6",
            auth: 6,
            favoriteActon: true,
            favorite: true,
            chip: "Hot Deal",
            chipColor: "#ff6f5e",
            chipTextColor: "#fff",
            onPress: redirectToAdPage,
        },
    ];
    return (
        <div className={style.container}>
            <Sections />
            <AdList ads={mockData} />
        </div>
    );
};

export default Index;
