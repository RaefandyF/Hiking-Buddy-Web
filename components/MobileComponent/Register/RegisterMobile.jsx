import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function RegisterMobile() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="">
      <section className="bg-[#274753] pt-20 px-7 pb-7">
        <h1 className="text-3xl max-w-[15rem] font-bold text-white">
          Sign Up to Your Account
        </h1>
        <p className="text-white/60">Sign Up to Your Account</p>
      </section>
      <section className="px-7 py-7">
        <div className="">
          <h3 className="bg-white w-[5rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Username
          </h3>
          <input
            type="text"
            placeholder="Masukkan Username"
            className="w-[100%] border border-black/10 p-4 rounded-lg"
          />
        </div>

        <div className="">
          <h3 className="bg-white w-[5rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Email
          </h3>
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-[100%] border border-black/10 p-4 rounded-lg"
          />
        </div>

        <div className="mt-6">
          <h3 className="bg-white w-[5rem] pl-3 text-center relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Password
          </h3>
          {showPassword ? (
            <div className="flex">
              <input
                placeholder="Masukkan password"
                value={password}
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                className="w-[100%] border border-black/10 p-4 rounded-lg"
              />
              <FaEye
                onClick={() => setShowPassword(false)}
                className="text-black/50 text-xl absolute right-12 top-[28.5rem]"
              />
            </div>
          ) : (
            <div className="flex">
              <input
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-[100%] border border-black/10 p-4 rounded-lg"
              />
              <FaEyeSlash
                onClick={() => setShowPassword(true)}
                className="text-black/50 text-xl absolute right-12 top-[28.5rem]"
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="bg-white w-[10rem] pl-3 text-center relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Konfirmasi Password
          </h3>
          {showConfirmPassword ? (
            <div className="flex">
              <input
                placeholder="Masukkan password"
                value={confirmPassword}
                type="text"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[100%] border border-black/10 p-4 rounded-lg"
              />
              <FaEye
                onClick={() => setShowConfirmPassword(false)}
                className="text-black/50 text-xl absolute right-12 top-[35rem]"
              />
            </div>
          ) : (
            <div className="flex">
              <input
                placeholder="Masukkan password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="w-[100%] border border-black/10 p-4 rounded-lg"
              />
              <FaEyeSlash
                onClick={() => setShowConfirmPassword(true)}
                className="text-black/50 text-xl absolute right-12 top-[35rem]"
              />
            </div>
          )}
        </div>

        <button className="mt-10 w-[100%] bg-[#F09024] p-4 rounded-xl text-white text-lg">
          Sign Up
        </button>

        <div className="flex justify-center mt-5">
          <p className="text-black/50">
            Sudah memiliki akun?{" "}
            <a href="/login" className="text-[#F09024]">
              Sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
