import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function Payment() {
  const router = useRouter();
  const { transactionId } = router.query; // Ambil ID gunung dari URL
  const [transactionData, setTransactionData] = useState(null);
  const [userData, setUserData] = useState();
  // const [orderID] = useState(`ORDER-${ticketId + Date.now()}`);
  const [grossAmount] = useState(100000); // Contoh harga tiket
  const [snapToken, setSnapToken] = useState(null);

  useEffect(() => {
    if (transactionId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/${transactionId}`
        )
        .then((response) => {
          setTransactionData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
        });
    }
  }, [transactionId]);

  useEffect(() => {
    if (transactionData) {
      const token = localStorage.getItem("HikingBuddyToken");
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/users/get-current-login`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            console.log(response.data.message.result?.[0].UserFullname);
            handlePayment(
              response.data.message.result?.[0].UserFullname,
              response.data.message.result?.[0].UserEmail,
              response.data.message.result?.[0].UserPhone
            );
          } else {
            console.log("Error:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [transactionData]);

  const handlePayment = async (name, email, phone) => {
    console.log(userData);

    try {
      // Minta token transaksi dari API backend
      const response = await axios.post("/api/payment", {
        order_id: transactionId,
        gross_amount: transactionData?.TotalPrice,
        customer_details: {
          first_name: name.split(" ")[0],
          last_name: name.split(" ")[1],
          email: email,
          phone: phone,
        },
      });

      const { token } = response.data;
      setSnapToken(token);

      // Panggil Snap untuk pembayaran
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log(result);
            const updatedData = {
              TransactionStatus: "paid",
              TransactionDate: result.transaction_time,
              PaymentMethod: result.payment_type,
            };
            axios
              .put(
                `https://app.hikingbuddy.my.id/api/v3/tickets/transactions/${transactionId}`,
                updatedData
              )
              .then((response) => {
                if (response.status === 200) {
                  // Jika berhasil, render komponen PaymentSuccess
                  router.push(`/ticket/${transactionId}/payment/success`);
                } else {
                  alert("Failed to update the transaction.");
                }
              })
              .catch((error) => {
                console.error("Error updating transaction:", error);
              });
          },
          onPending: function (result) {
            alert("Pembayaran pending: " + JSON.stringify(result));
          },
          onError: function (result) {
            alert("Pembayaran gagal: " + JSON.stringify(result));
          },
          onClose: function () {
            alert("Pembayaran ditutup.");
          },
        });
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memproses pembayaran.");
    }
  };

  useEffect(() => {
    // Tambahkan script Snap.js dari Midtrans
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // Gunakan `sandbox` atau `production`
    script.setAttribute("data-client-key", "SB-Mid-client-iQf4TNIFmUBn00LA"); // Ganti dengan Client Key Anda
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <LoadingFull />;
}
