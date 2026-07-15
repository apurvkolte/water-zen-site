const admin = require("firebase-admin");


// Initialize Firebase once
if (!admin.apps.length) {

    const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

}


const db = admin.firestore();



exports.handler = async (event) => {

    const method = event.httpMethod;


    try {


        // GET ALL BANNERS
        if (method === "GET") {


            const snapshot =
                await db
                    .collection("banners")
                    .orderBy("createdAt", "asc")
                    .get();



            const banners =
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    banners
                })
            };

        }





        // ADD BANNER
        if (method === "POST") {


            const {
                url,
                title,
                subtitle
            } = JSON.parse(event.body);



            if (!url) {

                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        success: false,
                        message: "Banner image URL required"
                    })
                };

            }




            const ref =
                await db
                    .collection("banners")
                    .add({

                        url,
                        title: title || "",
                        subtitle: subtitle || "",

                        createdAt:
                            admin.firestore.FieldValue.serverTimestamp()

                    });




            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    id: ref.id
                })
            };


        }





        // UPDATE BANNER
        if (method === "PUT") {


            const {
                id,
                url,
                title,
                subtitle
            } = JSON.parse(event.body);




            await db
                .collection("banners")
                .doc(id)
                .update({

                    url,
                    title,
                    subtitle,

                    updatedAt:
                        admin.firestore.FieldValue.serverTimestamp()

                });



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true
                })
            };


        }





        // DELETE BANNER
        if (method === "DELETE") {


            const {
                id
            } = JSON.parse(event.body);




            await db
                .collection("banners")
                .doc(id)
                .delete();



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true
                })
            };


        }





        return {
            statusCode: 405,
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };


    }


    catch (error) {


        console.error(error);


        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };


    }


};