const API_URL = "/.netlify/functions/categories";


// Category type
export interface Category {
    id?: string;
    name: string;
}





// GET ALL CATEGORIES
export async function getCategories(): Promise<Category[]> {

    const res = await fetch(API_URL);


    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Failed to load categories"
        );

    }


    return data.categories;

}





// ADD CATEGORY
export async function createCategory(
    name: string
) {


    const res = await fetch(
        API_URL,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name
            })

        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Category create failed"
        );

    }



    return data;

}





// UPDATE CATEGORY
export async function updateCategory(
    id: string,
    name: string
) {


    const res = await fetch(
        API_URL,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id,
                name
            })

        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Category update failed"
        );

    }



    return data;

}





// DELETE CATEGORY
export async function deleteCategory(
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
            data.message || "Category delete failed"
        );

    }



    return data;

}