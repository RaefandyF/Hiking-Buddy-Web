import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavbarComponent() {
  return (
    <nav className="text-[14px] flex w-full justify-between px-10 py-6">
      <div className="hidden md:flex lg:flex leading-[45px]">
        <Image width={100} height={80} src={"/logo.png"} />
        <div className="mx-2">
          <p>Home</p>
        </div>
        <div className="mx-2">
          <p>Rute</p>
        </div>
        <div className="mx-2">
          <p>Komunitas</p>
        </div>
        <div className="mx-2">
          <p>Cuaca</p>
        </div>
        <div className="mx-2">
          <p>Beli tiket</p>
        </div>
      </div>
      <div className="w-[200px] flex">
        <div className="w-[50px] mx-2">
          <p className="leading-[40px] text-center">Sign up</p>
        </div>
        <Link href={"/login"}>
          <button className="w-[100px] border border-white p-3 rounded-[20px]">
            Sign in
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavbarComponent;
