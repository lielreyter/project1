// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Stripe from "stripe";
// import { PrismaClient } from "@prisma/client";

// dotenv.config();
// const prisma = new PrismaClient();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // -----------------------------
// // AUTH
// // -----------------------------
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({ data: { email, password: hashed } });
//     res.json({ success: true, userId: user.id });
//   } catch (err) {
//     res.status(400).json({ error: "User already exists" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(404).json({ error: "User not found" });
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(401).json({ error: "Invalid password" });
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//   res.json({ token });
// });

// // -----------------------------
// // BOXES
// // -----------------------------
// const BOXES = [
//   { name: "Starter Mystery Box", monthly: 49, yearly: 39 },
//   { name: "Premium Mystery Box", monthly: 99, yearly: 79 },
//   { name: "Luxury Mystery Box", monthly: 199, yearly: 169 },
// ];

// app.get("/boxes", (req, res) => {
//   res.json(BOXES);
// });

// // -----------------------------
// // SUBSCRIPTION
// // -----------------------------
// app.post("/subscribe", async (req, res) => {
//   const { token, boxName, size, plan } = req.body; // plan = "MONTHLY" or "YEARLY"

//   try {
//     // Create Stripe Checkout Session
//     const box = BOXES.find(b => b.name === boxName);
//     if (!box) return res.status(400).json({ error: "Box not found" });

//     const price = plan === "YEARLY" ? box.yearly * 100 : box.monthly * 100;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [{ price_data: { currency: "usd", product_data: { name: boxName }, unit_amount: price }, quantity: 1 }],
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     });

//     res.json({ sessionId: session.id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Subscription failed" });
//   }
// });

// // -----------------------------
// app.listen(4000, () => console.log("Server running on http://localhost:4000"));



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// AUTH
// -----------------------------
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashed } });
    res.json({ success: true, userId: user.id });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// -----------------------------
// PRODUCTS (one-time purchase)
// -----------------------------
const PRODUCTS = [
  { name: "Sealed Fit Box", price: 4999 }, // $49.99
];

// Endpoint to list available products
app.get("/products", (req, res) => {
  res.json(PRODUCTS);
});

// -----------------------------
// ONE-TIME ORDER
// -----------------------------
app.post("/order", async (req, res) => {
  const { email, address, city, state, zip } = req.body;

  try {
    // Store order in DB
    const order = await prisma.order.create({
      data: { email, address, city, state, zip },
    });

    // Create Stripe Checkout Session
    const product = PRODUCTS[0]; // Only one product for now
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: product.name },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?orderId=${order.id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});

// -----------------------------
app.listen(4000, () =>
  console.log("Server running on http://localhost:4000")
);
