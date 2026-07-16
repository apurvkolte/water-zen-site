import { db } from "../firebase/scriptConfig";

import {
    collection,
    addDoc
} from "firebase/firestore";


const banners = [

    {
        url: "https://res.cloudinary.com/juhojyvi/image/upload/v1784104899/water-purifier-moshi-pune_vetd3e.jpg",
        title: "Best Water Purifier in Moshi, Pune",
        subtitle: "Buy RO, UV & Alkaline Water Purifiers at the Best Price with Free Installation & Expert Service."
    },

    {
        url: "https://res.cloudinary.com/juhojyvi/image/upload/v1784104885/best-water-purifier-bhosari-pune_aeik3b.jpg",
        title: "RO Water Purifier Dealer in Bhosari, Pune",
        subtitle: "Premium Home Water Purifiers with Genuine Filters, Fast Installation & Reliable After-Sales Support."
    },

    {
        url: "https://res.cloudinary.com/juhojyvi/image/upload/v1784104898/water-purifier-chakan-pune_kf4s8x.jpg",
        title: "Top Water Purifier Shop in Chakan, Pune",
        subtitle: "Trusted RO Water Purifier Solutions for Homes & Offices with AMC & Installation."
    }

];


async function importBanners() {

    for (const banner of banners) {

        await addDoc(
            collection(db, "banners"),
            banner
        );

        console.log("Banner added");

    }

}


importBanners();
