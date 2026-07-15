const API_URL = "/.netlify/functions/products";


// Product type
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

    const res = await fetch(API_URL);


    const data = await res.json();


    if (!data.success) {

        throw new Error(
            data.message || "Failed to load products"
        );

    }


    return data.products;

}





// GET SINGLE PRODUCT + RELATED PRODUCTS
export async function getProductById(
    id: string
) {


    const res = await fetch(
        `${API_URL}?id=${id}`
    );


    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Product not found"
        );

    }



    return {

        product: data.product,

        related: data.related || []

    };

}





// CREATE PRODUCT
export async function createProduct(
    product: Product
) {


    const res = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(product)
        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Create failed"
        );

    }



    return data;

}





// UPDATE PRODUCT
export async function updateProduct(
    product: Product
) {


    const res = await fetch(
        API_URL,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(product)

        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Update failed"
        );

    }



    return data;

}





// DELETE PRODUCT
export async function deleteProduct(
    id: string
) {


    const res = await fetch(
        API_URL,
        {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id
            })

        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Delete failed"
        );

    }



    return data;

}