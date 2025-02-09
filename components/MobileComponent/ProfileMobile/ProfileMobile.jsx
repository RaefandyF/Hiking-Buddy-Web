import React, { use, useEffect, useState } from "react";
import { FaEdit, FaRegStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import FooterMobile from "../FooterMobile/FooterMobile";
import ProfileMobileNotLogin from "./ProfileMobileNotLogin";
import { BsImageAlt } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import { TbCalendarTime } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrMoney } from "react-icons/gr";

export default function ProfileMobile() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();
  const [transactionData, setTransactionData] = useState([]);
  const [relevantTransaction, setRelevantTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [modalLogout, setModalLogout] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("HikingBuddyToken"));
    // Get the token from localStorage
    if (token) {
      try {
        // Decode the token
        const decoded = jwt.decode(token);
        const currentTime = Date.now() / 1000;
        // Extract user information from the token payload
        if (decoded.exp < currentTime) {
          console.log("Token has expired");
          localStorage.removeItem("HikingBuddyToken");
          window.location.reload();
        } else {
          setFullName(decoded.result[0].UserFullname);
          setEmail(decoded.result[0].UserEmail);
          setPhone(decoded.result[0].UserPhone);

          axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/users/get-user?userid=${decoded.result[0].UserId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              setUserData(response.data.data);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              // setIsLoading(false);
            });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // setIsLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v3/tickets/transactions/user/${userData?.UserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTransactionData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
        // setIsLoading(false);
      });
  }, [userData]);

  const calculateDaysLeft = (targetDate) => {
    const currentDate = new Date(); // Tanggal sekarang
    const endDate = new Date(targetDate); // Tanggal target

    // Hitung selisih waktu dalam milidetik
    const timeDifference = endDate - currentDate;

    // Konversi milidetik ke hari
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? daysLeft : 0; // Pastikan tidak ada nilai negatif
  };

  const getRelevantTransaction = (transactionData) => {
    const now = new Date();

    // Prioritaskan 'on going'
    const ongoingTransaction = transactionData.find(
      (item) => item.TransactionStatus === "on going"
    );

    if (ongoingTransaction) {
      // console.log("ini ongoing", ongoingTransaction);
      return ongoingTransaction;
    }

    // Jika tidak ada 'on going', pilih 'paid' dengan EntryDate terdekat
    const paidTransactions = transactionData
      .filter((item) => item.TransactionStatus === "paid")
      .map((item) => ({
        ...item,
        EntryDate: new Date(item.EntryDate),
      }));

    // Cari EntryDate yang paling dekat dengan sekarang
    const closestTransaction = paidTransactions.reduce((closest, current) => {
      if (
        !closest ||
        Math.abs(current.EntryDate - now) < Math.abs(closest.EntryDate - now)
      ) {
        return current;
      }
      return closest;
    }, null);
    // setIsLoading(false);
    return closestTransaction;
  };

  useEffect(() => {
    setRelevantTransaction(getRelevantTransaction(transactionData));
  }, [transactionData]);

  useEffect(() => {
    if (relevantTransaction) {
      setIsLoading(false);
    }
    if (userData) {
      setIsLoadingProfile(false);
    }
  }, [relevantTransaction, userData]);

  const handleModalLogout = () => {
    setModalLogout(true);
    // router.push("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("HikingBuddyToken");
    window.location.reload();
  };

  return (
    <main className="font-poppins">
      {token ? (
        <div className="pb-[9rem]">
          <section className="p-5 shadow-sm drop-shadow-xs">
            <Link href={"/partner/dashboard"}>
              <h1 className="font-bold">Profil Saya</h1>
            </Link>
          </section>

          {isLoadingProfile ? (
            <div className="p-5 mt-2">
              <Skeleton height={55} width={195} />
            </div>
          ) : (
            <section className="relative py-5 flex gap-7 mt-2 justify-between">
              <div className="flex gap-2 px-5 items-center">
                <img
                  src={userData?.profileImage}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h1 className="font-bold text-sm">
                    {userData?.UserFullName}
                  </h1>
                  {/* <p className="text-xs mt-1 text-black/50">
                    {userData?.UserEmail}
                  </p> */}
                  <p className="text-xs mt-[0.2rem] text-black/50">
                    {userData?.UserPhone}
                  </p>
                </div>
              </div>

              {userData.UserRole === "Partner" && (
                <Link href={"/partner/dashboard"}>
                  <div className="flex items-center gap-2 mt-0 right-0 pl-5 pr-2 py-4 rounded-l-xl bg-[#274753] text-white">
                    <h4 className="text-[10px]">Dashboard Pengelola</h4>
                    <GrMoney className="" />
                  </div>
                </Link>
              )}
            </section>
          )}

          <section className="p-5 max-[390px]:mt-[2rem]">
            <h1 className="text-[14px] font-bold">Sedang Berlangsung</h1>
            {isLoading ? (
              <Skeleton height={195} className="w-full" />
            ) : relevantTransaction ? (
              relevantTransaction.TransactionStatus === "on going" ? (
                <div
                  style={{
                    backgroundImage: `url(${transactionData[0]?.mountainImageUrl})`,
                  }}
                  className="bg-cover w-full relative h-[12rem] bg-center bg-no-repeat rounded-3xl mt-3 flex flex-col items-center gap-1"
                >
                  <div className="bg-[#FFFFFF] rounded-3xl flex items-center gap-4 px-3 py-3 mx-10 absolute bottom-3 w-[90%]">
                    <div className="bg-[#e3e3e3] p-2 rounded-full">
                      <TbCalendarTime className="text-xl" />
                    </div>
                    <span className="flex flex-col gap-[0.15rem]">
                      <h1 className="text-[14px] font-bold">
                        Sedang Berlangsung
                      </h1>
                      <p className="text-[10px]">
                        Trip {relevantTransaction?.TicketName}
                      </p>
                      <Link
                        href={`/ticket/detail-ticket/${relevantTransaction?.TransactionId}`}
                      >
                        <p className="text-[11px] text-[#F09024] font-bold">
                          Cek Tiket
                        </p>
                      </Link>
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${transactionData[0]?.mountainImageUrl})`,
                  }}
                  className="bg-cover w-full relative h-[12rem] bg-center bg-no-repeat rounded-3xl mt-3 flex flex-col items-center gap-1"
                >
                  <div className="bg-[#FFFFFF] rounded-3xl flex items-center gap-4 px-3 py-3 mx-10 absolute bottom-3 w-[90%]">
                    <div className="bg-[#e3e3e3] p-2 rounded-full">
                      <TbCalendarTime className="text-xl" />
                    </div>
                    <span className="flex flex-col gap-[0.15rem]">
                      <h1 className="text-[14px] font-bold">
                        {calculateDaysLeft(
                          relevantTransaction?.TransactionDate
                        )}{" "}
                        Hari Lagi Tersisa!
                      </h1>
                      <p className="text-[10px]">
                        Menuju Trip {relevantTransaction?.TicketName}
                      </p>
                      <Link
                        href={`/ticket/detail-ticket/${relevantTransaction?.TransactionId}`}
                      >
                        <p className="text-[11px] text-[#F09024] font-bold">
                          Cek Tiket
                        </p>
                      </Link>
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div className="bg-[#f5f3f3] py-16 rounded-3xl mt-3 flex flex-col items-center gap-1">
                <BsImageAlt className="text-black/20 text-2xl" />
                <p className="text-[12px] text-black/20">Belum Ada Trip</p>
                <Link href={"/ticket"}>
                  <p className="text-[11px] text-[#F09024] font-bold">
                    Beli tiket sekarang
                  </p>
                </Link>
              </div>
            )}
          </section>

          <section className="px-5">
            <h1 className="text-[14px] font-bold">Pengaturan</h1>
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <Link href={"/profile/edit"}>
                  <span className="flex gap-5 items-center">
                    <FaEdit className="text-xl" />
                    <h3 className="text-sm mt-1">Edit Profil</h3>
                  </span>
                </Link>
                <Link href={"/profile/edit"}>
                  <IoIosArrowForward className="text-xl" />
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex gap-5 items-center">
                  <FaRegStar className="text-xl" />
                  <h3 className="text-sm mt-1">Beri Kami Nilai</h3>
                </span>
                <IoIosArrowForward className="text-xl" />
              </div>
              <div
                onClick={handleModalLogout}
                className="flex justify-between items-center"
              >
                <span className="flex gap-5 items-center">
                  <RiLogoutCircleRLine className="text-xl" />
                  <h3 className="text-sm mt-1">Keluar</h3>
                </span>
                <IoIosArrowForward className="text-xl" />
              </div>
            </div>
          </section>
          <FooterMobile
            home={"py-7"}
            komunitas={"py-7"}
            aktivitas={"py-7"}
            profile={"py-7 border-t-[4px] border-[#F09024] text-[#F09024]"}
          />
          {modalLogout && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
              <div className="bg-white rounded-2xl p-5 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-3 drop-shadow-lg z-50">
                <h1 className="text-[18px] font-bold text-center">
                  Logout Akun
                </h1>
                <h3 className="text-[14px] text-center w-[15rem]">
                  Apakah Anda yakin ingin keluar?
                </h3>
                <span className="flex gap-3 mt-5">
                  <button
                    onClick={handleLogout}
                    className="bg-[#F09024] text-white px-10 py-2 rounded-xl"
                  >
                    Keluar
                  </button>
                  <button
                    onClick={() => {
                      setModalLogout(false);
                    }}
                    className="border-[#F09024] border-[1px] text-[#F09024] px-10 py-2 rounded-xl"
                  >
                    Batal
                  </button>
                </span>
              </div>
            </>
          )}
        </div>
      ) : (
        <ProfileMobileNotLogin />
      )}
    </main>
  );
}
