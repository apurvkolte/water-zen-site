import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc
} from "firebase/firestore";

import { db } from "@/firebase/config";


export interface Product {

    id?: string;

    title: string;

    price: number;

    category: string;

    image: string;

    description: string;

    specifications?: {
        title: string;
        description: string;
    }[];

}



// GET ALL PRODUCTS
export async function getProducts(): Promise<Product[]> {

    const snapshot = await getDocs(
        collection(db, "products")
    );


    return snapshot.docs.map(item => ({
        id: item.id,
        ...item.data()
    })) as Product[];

}



// GET SINGLE PRODUCT + RELATED PRODUCTS
export async function getProductById(id: string) {

    const productSnap = await getDoc(
        doc(db, "products", id)
    );


    if (!productSnap.exists()) {
        throw new Error("Product not found");
    }


    const product = {
        id: productSnap.id,
        ...productSnap.data()
    } as Product;



    const relatedSnap = await getDocs(
        collection(db, "products")
    );


    const related = relatedSnap.docs
        .map(item => ({
            id: item.id,
            ...item.data()
        }) as Product)
        .filter(
            item =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 4);



    return {
        product,
        related
    };

}


// CREATE PRODUCT
export async function createProduct(
    product: Product
) {

    const ref = await addDoc(
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


    return {
        success: true,
        id: ref.id
    };

}



// UPDATE PRODUCT
export async function updateProduct(
    product: Product
) {

    if (!product.id) {
        throw new Error("Product id missing");
    }


    await updateDoc(
        doc(
            db,
            "products",
            product.id
        ),
        {
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            specifications: product.specifications || []
        }
    );


    return {
        success: true
    };

}



// DELETE PRODUCT
export async function deleteProduct(
    id: string
) {


    await deleteDoc(
        doc(
            db,
            "products",
            id
        )
    );


    return {
        success: true
    };

}



