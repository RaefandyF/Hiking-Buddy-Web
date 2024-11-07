import React, { useEffect, useState } from "react";
import { FaEdit, FaRegStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import FooterMobile from "../FooterMobile/FooterMobile";
import ProfileMobileNotLogin from "./ProfileMobileNotLogin";

export default function ProfileMobile() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const token = localStorage.getItem("HikingBuddyToken");

  useEffect(() => {
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
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    // router.push("/login");
  };

  return (
    <main className="font-poppins">
      {token ? (
        <div>
          <section className="p-5 shadow-sm drop-shadow-xs">
            <h1 className="font-bold">Profil Saya</h1>
          </section>

          <section className="p-5 flex gap-2 mt-2">
            <img className="h-12 w-12 rounded-full bg-black"></img>
            <div>
              <h1 className="font-bold text-sm">{fullName}</h1>
              <p className="text-xs mt-1 text-black/50">{email}</p>
              <p className="text-xs mt-[0.2rem] text-black/50">{phone}</p>
            </div>
          </section>

          <section className="p-5">
            <h1>Sedang Berlangsung</h1>
          </section>

          <section className="p-5">
            <h1>Pengaturan</h1>
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="flex gap-5 items-center">
                  <FaEdit className="text-xl" />
                  <h3 className="text-sm mt-1">Edit Profil</h3>
                </span>
                <IoIosArrowForward className="text-xl" />
              </div>
              <div className="flex justify-between items-center">
                <span className="flex gap-5 items-center">
                  <FaRegStar className="text-xl" />
                  <h3 className="text-sm mt-1">Beri Kami Nilai</h3>
                </span>
                <IoIosArrowForward className="text-xl" />
              </div>
              <div
                onClick={handleLogout}
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
        </div>
      ) : (
        <ProfileMobileNotLogin />
      )}
    </main>
  );
}
