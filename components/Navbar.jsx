
import Image from "next/image";
import Link from "next/link";
import { useEffect} from "react";

function NavbarComponent(props) {
  console.log(props)
  return (
    <nav
      className={`text-white text-[14px] flex w-full justify-between px-10 py-6 ${props.taildwindStyle}`}
    >
      <div className="hidden gap-[1.5vw] text-[1.2vw] md:flex lg:flex leading-[3.125vw] h-[3.5vw]">
        <Link href={'/'}>
          <Image width={100} height={80} src={"/logo.png"} />
        </Link>
        <a href="/" className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Home
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
        <a href="/route" className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Rute
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
        <a href="/community" className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Komunitas
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
        <a className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Cuaca
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
        <a className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Beli Tiket
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
        <a href="/status-gunung" className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Status Gunung
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
        <a href="/rent-tools" className="group cursor-pointer hover:font-bold flex flex-col items-center">
          Sewa Tools
          <div className="hidden group-hover:block transition-transform w-full h-[0.4vw] bg-gradient-to-r from-primary to-[#beb7ae] rounded-lg"></div>
        </a>
      </div>
        {
          props.log ? 
          <div className="w-[13.889vw] font-bold text-[18px] flex items-center text-center gap-[2vw]">
              <div className="w-full">
              <p>Hello, {props.log}</p>
              </div>
          </div>
          :
        <div className="w-[13.889vw] flex items-center gap-[2vw]">
          <Link href={'/register'}>
            <button className="text-[18px]">Sign Up</button>
          </Link>
          <Link href={"/login"}>
            <button className="text-[18px] w-[6.944vw] border border-white p-3 rounded-[1.389vw]">
              Sign in
            </button>
          </Link>
        </div>
        }
      
    </nav>
  );
}

export default NavbarComponent;
