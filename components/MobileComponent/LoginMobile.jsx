import React, { useState } from "react";
import googleIcon from "../../public/google-icon.png";
import Image from "next/image";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function LoginMobile() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="">
      <section className="bg-[#274753] pt-20 px-7 pb-7">
        <h1 className="text-3xl max-w-[15rem] font-bold text-white">
          Sign In to Your Account
        </h1>
        <p className="text-white/60">Sign In to Your Account</p>
      </section>
      <section className="px-7 py-7">
        <div className="">
          <h3 className="bg-white w-[5rem] pl-3 relative top-[0.65rem] left-[0.0rem] text-black/40 text-[0.9rem]">
            Email
          </h3>
          <input
            placeholder="Masukkan email"
            type="email"
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
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                className="w-[100%] border border-black/10 p-4 rounded-lg"
              />
              <FaEye
                onClick={() => setShowPassword(false)}
                className="text-black/50 text-xl absolute right-12 top-[23.5rem]"
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
                className="text-black/50 text-xl absolute right-12 top-[23.5rem]"
              />
            </div>
          )}
        </div>

        <p className="mt-8 flex justify-end text-[#F09024] font-bold cursor-pointer">
          Lupa Password?
        </p>

        <button className="mt-10 w-[100%] bg-[#F09024] p-4 rounded-xl text-white text-lg">
          Sign In
        </button>

        <button className="mt-7 w-[100%] p-4 rounded-xl border border-black/10 text-lg flex gap-5 items-center justify-center">
          <Image src={googleIcon} className="w-[1.5rem]" /> Sign In With Google
        </button>

        <div className="flex justify-center mt-5">
          <p className="text-black/50">
            Belum memiliki akun?{" "}
            <a href="/register" className="text-[#F09024]">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
