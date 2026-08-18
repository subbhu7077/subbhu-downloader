const fs = require("fs");
const p = "server.js";
let s = fs.readFileSync(p, "utf8");

if (!s.includes("RAZORPAY_KEY_ID")) {
  s = "const Razorpay = require('razorpay');\nconst razorpay = new Razorpay({key_id: process.env.RAZORPAY_KEY_ID,key_secret: process.env.RAZORPAY_KEY_SECRET});\n" + s;
}

if (!s.includes("/api/payment/create-order")) {
  const pos = s.lastIndexOf("app.listen(");
  if (pos === -1) throw new Error("app.listen not found");

  const route = `
app.post("/api/payment/create-order", async (req,res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount < 1) {
      return res.status(400).json({success:false,message:"Invalid amount"});
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "subbhu_" + Date.now()
    });

    res.json({
      success:true,
      orderId:order.id,
      amount:order.amount,
      currency:order.currency,
      keyId:process.env.RAZORPAY_KEY_ID
    });
  } catch(error) {
    console.error(error);
    res.status(500).json({success:false,message:"Payment order creation failed"});
  }
});

`;

  s = s.slice(0,pos) + route + s.slice(pos);
  fs.writeFileSync(p,s);
  console.log("✅ Payment order API added");
} else {
  console.log("ℹ️ Payment order API already exists");
}
