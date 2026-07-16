import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "@/firebase/config";


// Category type
export interface Category {
    id?: string;
    name: string;
}


// GET ALL CATEGORIES
export async function getCategories(): Promise<Category[]> {

    const snapshot = await getDocs(
        collection(db, "categories")
    );


    return snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
    })) as Category[];

}



// ADD CATEGORY
export async function createCategory(
    name: string
) {

    const ref = await addDoc(
        collection(db, "categories"),
        {
            name
        }
    );


    return {
        success: true,
        id: ref.id
    };

}



// UPDATE CATEGORY
export async function updateCategory(
    id: string,
    name: string
) {

    await updateDoc(
        doc(db, "categories", id),
        {
            name
        }
    );


    return {
        success: true
    };

}


// DELETE CATEGORY
export async function deleteCategory(
    id: string
) {

    await deleteDoc(
        doc(db, "categories", id)
    );


    return {
        success: true
    };

}
