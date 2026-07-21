import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, email, userId } = req.body;
      
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();
      let customerId = userDoc.data()?.stripeCustomerId;

      if (!customerId) {
        const customer = await getStripe().customers.create({ email });
        customerId = customer.id;
        await userRef.update({ stripeCustomerId: customerId });
      }

      const paymentIntent = await getStripe().paymentIntents.create({
        amount: amount,
        currency: 'brl',
        customer: customerId,
        automatic_payment_methods: { enabled: true },
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
