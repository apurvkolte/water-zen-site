const admin = require("firebase-admin");


// Initialize Firebase only once
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


        // GET ALL PRODUCTS
        if (method === "GET" && !event.queryStringParameters?.id) {


            const snapshot = await db
                .collection("products")
                .get();


            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));


            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    products
                }),
            };

        }



        // GET PRODUCT BY ID + RELATED PRODUCTS
        if (
            method === "GET" &&
            event.queryStringParameters?.id
        ) {


            const id =
                event.queryStringParameters.id;



            const productRef =
                db.collection("products").doc(id);



            const productSnap =
                await productRef.get();



            if (!productSnap.exists) {

                return {
                    statusCode: 404,
                    body: JSON.stringify({
                        success: false,
                        message: "Product not found"
                    })
                };

            }



            const product = {
                id: productSnap.id,
                ...productSnap.data()
            };



            const relatedSnap =
                await db
                    .collection("products")
                    .where(
                        "category",
                        "==",
                        product.category
                    )
                    .limit(5)
                    .get();



            const related =
                relatedSnap.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    .filter(
                        item => item.id !== product.id
                    )
                    .slice(0, 4);



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    product,
                    related
                })
            };


        }




        // CREATE PRODUCT
        if (method === "POST") {


            const data =
                JSON.parse(event.body);



            const ref =
                await db
                    .collection("products")
                    .add(data);



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    id: ref.id
                })
            };


        }





        // UPDATE PRODUCT
        if (method === "PUT") {


            const data =
                JSON.parse(event.body);


            const {
                id,
                ...updateData
            } = data;



            await db
                .collection("products")
                .doc(id)
                .update(updateData);



            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true
                })
            };


        }





        // DELETE PRODUCT
        if (method === "DELETE") {


            const {
                id
            } = JSON.parse(event.body);



            await db
                .collection("products")
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