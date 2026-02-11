// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// import {setGlobalOptions} from "firebase-functions";
// // import {onRequest} from "firebase-functions/https";
// // import * as logger from "firebase-functions/logger";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({maxInstances: 10});

// // export const helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

admin.initializeApp();

const stripeSecret = process.env.STRIPE_SECRET;

if (!stripeSecret) {
    throw new Error("Stripe secret key not set");
}

const stripe = new Stripe(stripeSecret);

export const createSubscription = functions.https.onCall(
    async (data, context) => {
        if (!context.auth) {
            throw new functions.https.HttpsError(
                "unauthenticated",
                "User must be logged in"
            );
        }

        const uid = context.auth.uid;
        const plan = data.plan;

        const priceId =
            plan === "premium"
                ? "price_1SzjXCPpMtwKwUItpyg0E18X"
                : "price_1SzjVIPpMtwKwUIta1zre45D";

        const userDoc = await admin
            .firestore()
            .collection("users")
            .doc(uid)
            .get();

        const email = userDoc.data()?.email;

        const customer = await stripe.customers.create({
            email,
            metadata: { firebaseUID: uid },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
        });

        return {
            clientSecret:
                subscription.latest_invoice.payment_intent?.client_secret,
        };
    }
);
