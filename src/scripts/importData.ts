import { db } from "../firebase/scriptConfig";
import {
    collection,
    addDoc
} from "firebase/firestore";

import productData from "../data/product.json";


async function importProducts() {

    for (const product of productData) {

        await addDoc(
            collection(db, "products"),
            {
                title: product.title,
                price: product.price,
                category: product.category,
                image: product.image,
                description: product.description,
                specifications: product.specifications || []
            }
        );

        console.log("Uploaded:", product.title);

    }

    console.log("All products uploaded");

}


importProducts();
