// // src/App.tsx
// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button } from "./components/ui/button";
// import { Badge } from "./components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
// import { Input } from "./components/ui/input";
// import { ArrowRight, Package, Check } from "lucide-react";

// const stripePromise = loadStripe("pk_test_..."); // replace with your Stripe publishable key

// // -----------------
// // CONFIG
// // -----------------
// const BRAND = {
//   name: "Sealed Fit",
//   tagline: "The Ultimate Fashion Mystery Box",
//   sub: "Premium clothing & accessories, curated by style, delivered with surprise.",
// };

// const BOXES = [
//   {
//     name: "Sealed Fit Box",
//     price: 49,
//     desc: "Premium fashion tailored to your size. One-time purchase!",
//     features: [
//       "2–3 curated items",
//       "Retail value $90+",
//       "Choose size & style preference",
//       "Free exchanges",
//     ],
//   },
// ];

// const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <section className={`relative mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</section>
// );

// const Glass = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <div className={`rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_0_1px_1px_rgba(255,255,255,0.03)] backdrop-blur ${className}`}>{children}</div>
// );

// export default function App() {
//   const [size, setSize] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zip, setZip] = useState("");

// const handleCheckout = async () => {
//   const res = await fetch("http://localhost:4000/order", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, address, city, state, zip, size }),
//   });
  
//   // Tell TypeScript what the backend returns
//   const data: { sessionId?: string } = await res.json();

//   const stripe = await stripePromise;
// if (!data.sessionId || !stripe) return;
// stripe.redirectToCheckout({ sessionId: data.sessionId });

// };


//   return (
//     <div className="min-h-screen w-full text-white antialiased">
//       {/* HERO */}
//       <Section className="pb-8 pt-16 md:pt-24 text-center">
//         <h1 className="text-4xl md:text-6xl font-bold">{BRAND.tagline}</h1>
//         <p className="mt-4 text-white/70">{BRAND.sub}</p>
//       </Section>

//       {/* BOX */}
//       <Section id="boxes" className="py-12 md:py-20">
//         <div className="grid gap-4 md:grid-cols-3 justify-center">
//           {BOXES.map((p) => (
//             <Card key={p.name} className="border-white/10 bg-white/5">
//               <CardHeader>
//                 <CardTitle className="text-xl">{p.name}</CardTitle>
//                 <div className="mt-2 text-2xl font-semibold">${p.price}</div>
//                 <div className="text-sm text-white/70">{p.desc}</div>
//               </CardHeader>
//               <CardContent>
//                 <label className="block mb-2 text-sm">Select Size</label>
//                 <Input
//                   placeholder="e.g., M, L, XL"
//                   value={size}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSize(e.target.value)}
//                   className="mb-3"
//                 />

//                 <label className="block mb-2 text-sm">Email</label>
//                 <Input
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                   className="mb-2"
//                 />

//                 <label className="block mb-2 text-sm">Address</label>
//                 <Input
//                   placeholder="Address"
//                   value={address}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
//                   className="mb-2"
//                 />

//                 <label className="block mb-2 text-sm">City</label>
//                 <Input
//                   placeholder="City"
//                   value={city}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
//                   className="mb-2"
//                 />

//                 <label className="block mb-2 text-sm">State</label>
//                 <Input
//                   placeholder="State"
//                   value={state}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
//                   className="mb-2"
//                 />

//                 <label className="block mb-2 text-sm">ZIP</label>
//                 <Input
//                   placeholder="ZIP"
//                   value={zip}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZip(e.target.value)}
//                   className="mb-2"
//                 />

//                 <ul className="space-y-2 text-sm mt-3">
//                   {p.features.map((f) => (
//                     <li key={f} className="flex items-start gap-2">
//                       <Check className="mt-0.5 h-4 w-4" /> {f}
//                     </li>
//                   ))}
//                 </ul>

//                 <Button className="mt-5 w-full bg-pink-500 hover:bg-pink-400" onClick={handleCheckout}>
//                   Buy Now
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </Section>
//     </div>
//   );
// }


// src/App.tsx
// src/App.tsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Check } from "lucide-react";

// ✅ Stripe
const stripePromise = loadStripe("pk_test_..."); // replace with your publishable key

// ✅ Brand
const BRAND = {
  name: "Sealed Fit",
  tagline: "Your Style. Our Surprise.",
  sub: "Premium mystery fashion boxes — curated by size & taste, delivered to your door.",
};

const BOXES = [
  {
    name: "Sealed Fit Box",
    price: 49,
    desc: "Premium fashion tailored to your size. One-time purchase!",
    features: [
      "2–3 curated items",
      "Retail value $90+",
      "Choose size & style preference",
      "Free exchanges",
    ],
  },
];

export default function App() {
  const [size, setSize] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // ✅ Checkout
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:4000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, address, city, state, zip, size }),
    });

    const data: { sessionId?: string } = await res.json();
    const stripe = await stripePromise;

    if (data.sessionId && stripe) {
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert("Checkout session could not be created.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0D0F1A] to-[#1A1C2C] text-white antialiased">
      {/* HERO */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          {BRAND.tagline}
        </h1>
        <p className="mt-6 text-white/70 max-w-xl mx-auto text-lg">
          {BRAND.sub}
        </p>
      </section>

      {/* BOXES */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {BOXES.map((p) => (
            <Card
              key={p.name}
              className="border-white/10 bg-white/[0.05] backdrop-blur-xl rounded-3xl shadow-lg"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{p.name}</CardTitle>
                <div className="mt-2 text-3xl font-extrabold text-orange-400">
                  ${p.price}
                </div>
                <div className="text-sm text-white/70 mt-2">{p.desc}</div>
              </CardHeader>
              <CardContent className="mt-4">
                {/* FORM */}
                <div className="space-y-4">
                  <Input
                    placeholder="Size (e.g., M, L, XL)"
                    value={size}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSize(e.target.value)
                    }
                  />
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                  <Input
                    placeholder="Address"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
                  />
                  <Input
                    placeholder="City"
                    value={city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="State"
                      value={state}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setState(e.target.value)
                      }
                    />
                    <Input
                      placeholder="ZIP"
                      value={zip}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setZip(e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* FEATURES */}
                <ul className="space-y-2 text-sm mt-6">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-white/80"
                    >
                      <Check className="mt-0.5 h-4 w-4 text-orange-400" /> {f}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <Button
                  className="mt-8 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-semibold rounded-xl py-3 text-lg"
                  onClick={handleCheckout}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
