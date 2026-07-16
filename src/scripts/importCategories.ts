import { db } from "../firebase/scriptConfig";

import {
    collection,
    addDoc
} from "firebase/firestore";

import categoryData from "../data/categories.json";


async function importCategories() {

    for (const category of categoryData) {

        await addDoc(
            collection(db, "categories"),
            {
                name: category
            }
        );

        console.log("Added:", category);

    }

}


importCategories();
