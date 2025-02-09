import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import jwt from "jsonwebtoken";

export default function EditProfile() {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("password");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("HikingBuddyToken");
    const decoded = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    // Extract user information from the token payload
    if (decoded.exp < currentTime) {
      console.log("Token has expired");
      localStorage.removeItem("HikingBuddyToken");
      window.location.reload();
    } else {
      if (token) {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/users/get-user?userid=${decoded.result[0].UserId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setName(res.data.data.UserFullName);
            setEmail(res.data.data.UserEmail);
            setPhone(res.data.data.UserPhone);
            setProfileImageUrl(res.data.data.profileImage);
            setProfileData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (name && email && phone && profileImageUrl) {
      setLoading(false);
    }
  }, [name, email, phone, profileImageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePost(file);
    if (file) {
      setProfileImageUrl(URL.createObjectURL(file));
      //   const reader = new FileReader();
      //   reader.onload = (event) => {
      //     setProfileImageUrl(event.target.result);
      //   };
      //   reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    setLoadingButton(true);
    const currentData = profileData; // Data saat ini dari server
    const updatedFields = {}; // Objek untuk menyimpan field yang berubah

    // Cek perubahan untuk setiap parameter
    if (name !== currentData.UserFullName) {
      updatedFields.UserFullname = name;
    }
    if (email !== currentData.UserEmail) {
      updatedFields.UserEmail = email;
    }
    if (phone !== currentData.UserPhone) {
      updatedFields.UserPhone = phone;
    }

    const formData = new FormData(); // Gunakan FormData untuk pengiriman data

    // Cek dan tambahkan data yang berubah ke FormData
    if (name !== currentData.UserFullName) {
      formData.append("UserFullname", name);
    }
    if (email !== currentData.UserEmail) {
      formData.append("UserEmail", email);
    }
    if (phone !== currentData.UserPhone) {
      formData.append("UserPhone", phone);
    }
    if (imagePost) {
      formData.append("ImgProfile", imagePost); // Pastikan `imageUrl` adalah file
    }

    console.log(updatedFields);

    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/users/update-profile-user?UserId=${currentData.UserId}`,
        formData
      )
      .then((res) => {
        console.log(res);
        setLoadingButton(false);
        alert("Profil berhasil diupdate");
      })
      .catch((err) => {
        console.log(err);
        setLoadingButton(false);
      });
  };

  return (
    <main className="font-poppins flex justify-center h-full">
      {!loading ? (
        <div className="w-full max-w-[440px]">
          <section className="flex justify-between p-5">
            <button
              onClick={goBack}
              className="flex justify-between items-center p-3 rounded-full bg-[#F5F5F5]"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <div className="flex justify-center mt-1 flex-col text-center">
              <h1 className="text-[16px] font-bold mr-[2.8rem]">Edit Profil</h1>
            </div>
            <div />
          </section>
          <section className="flex flex-col justify-center items-center px-5">
            <div className="relative">
              <img
                src={profileImageUrl}
                className="w-[5rem] h-[5rem] rounded-full border-[1px] border-[#F09024]"
              />
              <div className="bg-[#F5F5F5] w-7 h-7 absolute right-[-0.3rem] bottom-[-0.2rem] rounded-full flex justify-center items-center">
                <label htmlFor="upload-image" className="cursor-pointer">
                  <FaEdit className="text-[#F09024]" />
                </label>
                <input
                  id="upload-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </section>
          <section className="mt-10 px-5">
            <label className="text-[14px]">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                disabled={!isNameEditable}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`text-[14px] w-full border-2 p-3 rounded-lg px-4 mt-2 ${
                  isNameEditable ? "bg-white" : "bg-gray-200 text-black/80"
                }`}
              />
              <FaEdit
                onClick={() => setIsNameEditable(!isNameEditable)}
                className="absolute right-0 top-0 mt-6 mr-4"
              />
            </div>
            <div className="mt-5">
              <label className="text-[14px]">Email</label>
              <div className="relative">
                <input
                  type="text"
                  disabled={!isEmailEditable}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`text-[14px] w-full border-2 p-3 rounded-lg px-4 mt-2 ${
                    isEmailEditable ? "bg-white" : "bg-gray-200 text-black/80"
                  }`}
                />
                <FaEdit
                  onClick={() => setIsEmailEditable(!isEmailEditable)}
                  className="absolute right-0 top-0 mt-6 mr-4"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="text-[14px]">No Handphone</label>
              <div className="relative">
                <input
                  type="text"
                  disabled={!isPhoneEditable}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`text-[14px] text-black w-full border-2 p-3 rounded-lg px-4 mt-2 ${
                    isPhoneEditable ? "bg-white" : "bg-gray-200 text-black/80"
                  }`}
                />
                <FaEdit
                  onClick={() => setIsPhoneEditable(!isPhoneEditable)}
                  className="absolute right-0 top-0 mt-6 mr-4"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="text-[14px]">Ganti Password</label>
              <div className="relative">
                <input
                  type="password"
                  disabled={!isPasswordEditable}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`text-[14px] w-full border-2 p-3 rounded-lg px-4 mt-2 ${
                    isPasswordEditable
                      ? "bg-white"
                      : "bg-gray-200 text-black/80"
                  }`}
                />
                <FaEdit
                  onClick={() => setIsPasswordEditable(!isPasswordEditable)}
                  className="absolute right-0 top-0 mt-6 mr-4"
                />
              </div>
            </div>
          </section>
          <section className="px-5 mt-[5rem]">
            {loadingButton ? (
              <button
                onClick={handleUpdateProfile}
                className="bg-[#f09024] w-full p-3 rounded-lg text-white text-[14px] flex justify-center items-center"
              >
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              </button>
            ) : (
              <button
                onClick={handleUpdateProfile}
                className="bg-[#f09024] w-full p-3 rounded-lg text-white text-[14px]"
              >
                Simpan Perubahan
              </button>
            )}
          </section>
        </div>
      ) : (
        <LoadingFull />
      )}
    </main>
  );
}
