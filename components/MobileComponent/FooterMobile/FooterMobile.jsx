import React from "react";
import { RiHome6Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function FooterMobile(props) {
  return (
    <footer className="px-5 fixed bottom-0 w-full bg-white border-t-[1px] flex gap-[3.3rem] max-[410px]:gap-[3rem] max-[400px]:gap-[2.8rem] max-[385px]:gap-[2.5rem] max-[370px]:gap-[2.2rem] max-[355px]:gap-[1.9rem] max-[340px]:gap-[1.6rem] max-[315px]:gap-[1rem] max-[290px]:gap-[0.5rem]">
      <Link href="/">
        <div
          className={`flex py-6 flex-col items-center gap-[0.8px] ${props.home}`}
        >
          <RiHome6Fill className="text-2xl" />
          <h3 className="text-sm">Home</h3>
        </div>
      </Link>
      <Link href="/community">
        <div
          className={`flex flex-col items-center gap-[0.8px] ${props.komunitas}`}
        >
          <BsPeopleFill className="text-2xl" />
          <h3 className="text-sm">Komunitas</h3>
        </div>
      </Link>
      <Link href="/aktivitas">
        <div className={`flex flex-col items-center gap-1 ${props.aktivitas}`}>
          <BsClockHistory className="text-xl" />
          <h3 className="text-sm">Aktivitas</h3>
        </div>
      </Link>
      <Link href="/profile">
        <div className={`flex flex-col items-center gap-1 ${props.profile}`}>
          <FaUser className="text-xl" />
          <h3 className="text-sm">Profile</h3>
        </div>
      </Link>
    </footer>
  );
}
