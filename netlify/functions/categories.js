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


        // GET ALL CATEGORIES
        if (method === "GET") {


            const snapshot =
                await db
                    .collection("categories")
                    .get();



            const categories =
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    categories
                })
            };

        }





        // ADD CATEGORY
        if (method === "POST") {


            const {
                name
            } = JSON.parse(event.body);



            if (!name) {

                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        success: false,
                        message: "Category name required"
                    })
                };

            }




            const existing =
                await db
                    .collection("categories")
                    .where(
                        "name",
                        "==",
                        name
                    )
                    .get();



            if (!existing.empty) {

                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        success: false,
                        message: "Category already exists"
                    })
                };

            }




            const ref =
                await db
                    .collection("categories")
                    .add({
                        name
                    });



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    id: ref.id
                })
            };


        }





        // UPDATE CATEGORY
        if (method === "PUT") {


            const {
                id,
                name
            } = JSON.parse(event.body);



            await db
                .collection("categories")
                .doc(id)
                .update({
                    name
                });



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true
                })
            };


        }





        // DELETE CATEGORY
        if (method === "DELETE") {


            const {
                id
            } = JSON.parse(event.body);



            await db
                .collection("categories")
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