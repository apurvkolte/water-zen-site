import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "@/firebase/config";


export interface Banner {

    id?: string;

    url: string;

    title?: string;

    subtitle?: string;

}



// GET ALL BANNERS
export async function getBanners(): Promise<Banner[]> {

    const snapshot = await getDocs(
        collection(db, "banners")
    );


    return snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
    })) as Banner[];

}



// CREATE BANNER
export async function createBanner(
    banner: Banner
) {

    const ref = await addDoc(
        collection(db, "banners"),
        {
            url: banner.url,
            title: banner.title || "",
            subtitle: banner.subtitle || ""
        }
    );


    return {
        success: true,
        id: ref.id
    };

}



// UPDATE BANNER
export async function updateBanner(
    banner: Banner
) {

    if (!banner.id) {
        throw new Error("Banner id missing");
    }


    await updateDoc(
        doc(db, "banners", banner.id),
        {
            url: banner.url,
            title: banner.title || "",
            subtitle: banner.subtitle || ""
        }
    );


    return {
        success: true
    };

}



// DELETE BANNER
export async function deleteBanner(
    id: string
) {

    await deleteDoc(
        doc(db, "banners", id)
    );


    return {
        success: true
    };

}