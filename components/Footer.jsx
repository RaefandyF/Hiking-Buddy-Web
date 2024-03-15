import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <section
      style={{ backgroundImage: `url(${"/footerimage.png"})` }}
      className="flex flex-col gap-[5vw] min-h-[27.35vw] bg-no-repeat bg-cover py-[2vw] px-[4vw]"
    >
      <h1 className="text-white font-bold text-[3vw] w-[20vw]">Hiking Buddy</h1>
      <div className="flex gap-x-[7vw]">
        <div className="flex flex-col gap-[1vw] mt-[5vw]">
          <img src="/logo.png" className="w-[7vw] h-[3.5vw]" />
          <div>
            <p className="text-white">Copyright ©2024</p>
            <p className="text-white">Lorem Ipsum dolar sit amet</p>
          </div>
        </div>
        <div className="w-[70vw]">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-5 justify-between w-[60vw]">
              <div className="border-l-[0.3vw] border-primary pl-[1vw] text-white w-[14vw]">
                <a className="text-[1.3vw]">About us</a>
              </div>
              <div className="border-l-4 border-primary pl-3 text-white w-[14vw]">
                <a className="text-[1.3vw]">How it works</a>
              </div>
              <div className="border-l-4 border-primary pl-3 text-white w-[14vw]">
                <a className="text-[1.3vw]">Our Team</a>
              </div>
              <div className="border-l-4 border-primary pl-3 text-white w-[14vw]">
                <a className="text-[1.3vw]">Privacy Policy</a>
              </div>
              <div className="border-l-4 border-primary pl-3 text-white w-[14vw]">
                <a className="text-[1.3vw]">Feedback</a>
              </div>
              <div className="border-l-4 border-primary pl-3 text-white w-[14vw]">
                <a className="text-[1.5vw]">FAQ</a>
              </div>
            </div>
            <div className="">
              <button className="mt-[2vw] p-[0.7vw] bg-primary rounded-[5vw] w-[15vw] text-white font-bold">
                Contact Us
              </button>
            </div>
          </div>
          <hr className="border-2 mt-[2vw]" />
          <div className="flex justify-end mt-[1vw]">
            <img className="mx-2" src={"/logos_tiktok-icon.png"} />
            <img className="mx-2" src={"/logos_facebook.png"} />
            <img className="mx-2" src={"/skill-icons_instagram.png"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
