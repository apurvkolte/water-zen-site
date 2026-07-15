const API_URL = "/.netlify/functions/banners";


// Banner type
export interface Banner {

    id?: string;

    url: string;

    title?: string;

    subtitle?: string;

}





// GET ALL BANNERS
export async function getBanners(): Promise<Banner[]> {

    const res = await fetch(API_URL);


    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Failed to load banners"
        );

    }



    return data.banners;

}





// ADD BANNER
export async function createBanner(
    banner: Banner
) {


    const res = await fetch(
        API_URL,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                url: banner.url,

                title: banner.title || "",

                subtitle: banner.subtitle || ""

            })

        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Banner create failed"
        );

    }



    return data;

}





// UPDATE BANNER
export async function updateBanner(
    banner: Banner
) {


    const res = await fetch(
        API_URL,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id: banner.id,

                url: banner.url,

                title: banner.title || "",

                subtitle: banner.subtitle || ""

            })

        }
    );



    const data = await res.json();



    if (!data.success) {

        throw new Error(
            data.message || "Banner update failed"
        );

    }



    return data;

}





// DELETE BANNER
export async function deleteBanner(
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
            data.message || "Banner delete failed"
        );

    }



    return data;

}