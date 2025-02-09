import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false, // Ganti ke true untuk mode produksi
  serverKey: "SB-Mid-server-TXwu7Qee7p3WDdoMqPESFF8O", // Ganti dengan Server Key Anda
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { order_id, gross_amount, customer_details } = req.body;

      // Buat transaksi Snap Midtrans
      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id,
          gross_amount,
        },
        customer_details,
      });

      res.status(200).json({ success: true, token: transaction.token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
