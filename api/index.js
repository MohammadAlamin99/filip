
const { onCall, onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const Stripe = require("stripe");
require("dotenv").config();

admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * =====================================
 * CREATE PAYMENT INTENT (Callable)
 * =====================================
 */
exports.createPaymentIntent = onCall(
    { region: "us-central1" },
    async (request) => {
        if (!request.auth) {
            throw new Error("UNAUTHENTICATED");
        }

        const { plan } = request.data;

        if (!["basic", "premium"].includes(plan)) {
            throw new Error("Invalid plan");
        }

        const amount = plan === "basic" ? 799 : 2499;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur",
            automatic_payment_methods: { enabled: true },
            metadata: {
                uid: request.auth.uid,
                tier: plan,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
        };
    }
);

/**
 * =====================================
 *  STRIPE WEBHOOK (Auto Update Tier)
 * =====================================
 */
exports.stripeWebhook = onRequest(
    {
        region: "us-central1",
        rawBody: true,
    },
    async (req, res) => {
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;

            const uid = paymentIntent.metadata.uid;
            const tier = paymentIntent.metadata.tier;

            console.log("Payment success for:", uid, "Tier:", tier);

            const now = admin.firestore.Timestamp.now();

            const expiresAt = admin.firestore.Timestamp.fromDate(
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
            );

            await admin.firestore().collection("users").doc(uid).update({
                membership: {
                    tier: tier, // basic | premium
                    startedAt: now,
                    expiresAt: expiresAt,
                    fullTimeAdsLimit: tier === "basic" ? 1 : 9999,
                    fullTimeAdsPostedThisMonth: 0,
                    monthKey: new Date().toISOString().slice(0, 7),
                },
                updatedAt: now,
            });
        }

        res.status(200).json({ received: true });
    }
);
