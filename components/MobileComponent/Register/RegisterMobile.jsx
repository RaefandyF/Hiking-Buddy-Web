import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import bg from "../../../public/login-register-bg.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
export default function RegisterMobile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    UserFullname: "",
    UserEmail: "",
    UserPhone: "",
    UserRole: "Member",
    UserPassword: "",
    UserConfirmPassword: "",
    Username: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    if (formData.UserPassword !== formData.UserConfirmPassword) {
      setRegisterLoading(false);
      setErrorMessage("Konfirmasi password tidak cocok");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/users/register",
        formData
      );
      console.log(response.data);
      setRegisterLoading(false);
      window.location.href = "/login";
    } catch (error) {
      setRegisterLoading(false);
      console.error(error);
    }
  };

  return (
    <main className="">
      <section
        style={{ backgroundImage: `url(${bg.src})` }}
        className="bg-cover pt-20 px-7 pb-7"
      >
        <h1 className="text-3xl max-w-[15rem] font-bold text-white">
          Sign up your Account
        </h1>
        <p className="text-white/60">Sign Up to Your Account</p>
      </section>
      <form onSubmit={handleRegister} className="px-7 py-7">
        <div className="">
          <h3 className="bg-white w-[8rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Nama Lengkap
          </h3>
          <input
            name="UserFullname"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            className="w-[100%] border border-black/10 p-4 rounded-lg"
            value={formData.UserFullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <h3 className="bg-white w-[5rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Username
          </h3>
          <input
            name="Username"
            type="text"
            placeholder="Masukkan Username"
            className="w-[100%] border border-black/10 p-4 rounded-lg"
            value={formData.Username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <h3 className="bg-white w-[5rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Email
          </h3>
          <input
            name="UserEmail"
            type="email"
            placeholder="Masukkan email"
            className="w-[100%] border border-black/10 p-4 rounded-lg"
            value={formData.UserEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <h3 className="bg-white w-[8rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            No. Handphone
          </h3>
          <input
            name="UserPhone"
            type="number"
            placeholder="Masukkan email"
            className="w-[100%] border border-black/10 p-4 rounded-lg"
            value={formData.UserPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-3">
          <h3 className="bg-white w-[5rem] pl-3 text-center relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Password
          </h3>
          {showPassword ? (
            <div className="flex">
              <input
                name="UserPassword"
                placeholder="Masukkan password"
                value={formData.UserPassword}
                onChange={handleChange}
                type="text"
                className="w-[100%] border border-black/10 p-4 rounded-lg"
                required
              />
              <FaEye
                onClick={() => setShowPassword(false)}
                className="text-black/50 text-xl absolute right-12 top-[39.3rem]"
              />
            </div>
          ) : (
            <div className="flex">
              <input
                name="UserPassword"
                placeholder="Masukkan password"
                value={formData.UserPassword}
                onChange={handleChange}
                type="password"
                className="w-[100%] border border-black/10 p-4 rounded-lg"
                required
              />
              <FaEyeSlash
                onClick={() => setShowPassword(true)}
                className="text-black/50 text-xl absolute right-12 top-[39.3rem]"
              />
            </div>
          )}
        </div>

        <div className="mt-3">
          <h3 className="bg-white w-[10rem] pl-3 text-center relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Konfirmasi Password
          </h3>
          {showConfirmPassword ? (
            <div className="flex">
              <input
                name="UserConfirmPassword"
                placeholder="Masukkan password"
                value={formData.UserConfirmPassword}
                onChange={handleChange}
                type="text"
                className="w-[100%] border border-black/10 p-4 rounded-lg"
                required
              />
              <FaEye
                onClick={() => setShowConfirmPassword(false)}
                className="text-black/50 text-xl absolute right-12 top-[45rem]"
              />
            </div>
          ) : (
            <div className="flex">
              <input
                name="UserConfirmPassword"
                placeholder="Masukkan password"
                value={formData.UserConfirmPassword}
                onChange={handleChange}
                type="password"
                className="w-[100%] border border-black/10 p-4 rounded-lg"
                required
              />
              <FaEyeSlash
                onClick={() => setShowConfirmPassword(true)}
                className="text-black/50 text-xl absolute right-12 top-[45rem]"
              />
            </div>
          )}
        </div>
        <div className="mt-3 flex justify-center">
          <p className="text-red-600">{errorMessage}</p>
        </div>

        {registerLoading ? (
          <button
            type="submit"
            className="mt-10 w-[100%] bg-[#F09024] p-4 rounded-xl text-white text-lg items-center justify-center flex"
          >
            <AiOutlineLoading3Quarters className="animate-spin text-lg" />
          </button>
        ) : (
          <button
            type="submit"
            className="mt-10 w-[100%] bg-[#F09024] p-4 rounded-xl text-white text-lg"
          >
            Sign Up
          </button>
        )}

        <div className="flex justify-center mt-5">
          <p className="text-black/50">
            Sudah memiliki akun?{" "}
            <a href="/login" className="text-[#F09024]">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </main>
  );
}
