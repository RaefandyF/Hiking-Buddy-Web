import Image from "next/image";
import React from "react";

function BodyNavigation() {
  return (
    <div className="flex w-full h-[400px] mb-[100px] items-center justify-center my-7">
      {/* box */}
      <div className="w-[400px] h-[200px] relative mx-5">
        <Image
          className="min-h-[200px] w-full max-[1200px]:h-[350px]"
          width={200}
          height={200}
          src={"/community1.png"}
        />
        <div className="flex absolute top-3 w-[390px] mx-2 justify-between max-[980px]:w-[250px] max-[1200px]:w-[250px]">
          <div className="flex">
            <div className="mx-2 text-white">
              <p>{`By ${"Juki"}`}</p>
            </div>
            <div className="mx-2 text-[#F09024]">
              <p>{`${"17 Min Ago"}`}</p>
            </div>
          </div>
          <div className="flex mx-2">
            <Image
              className="mx-2"
              width={25}
              height={20}
              src={"/lovered.png"}
            />
            <div className="text-white">
              <p>{`${23}`}</p>
            </div>
          </div>
        </div>
        <div className="w-full my-4 text-white top-[30px] absolute">
          <div className="mx-2 font-bold">
            <p>Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok</p>
          </div>
          <div className="mx-2 my-4">
            <p>
              Gunung Rinjani adalah salah satu pesona alam yang indah yang
              berada di timur indonesia yaitu lombok
            </p>
          </div>
        </div>
        <div className="w-full mx-2 absolute bottom-[-100px] text-white">
          <button className="flex w-[150px] bg-[#F09024] rounded-[30px] py-[5px]">
            <p className="w-3/4">Read more</p>
            <div className="flex items-center justify-center">
              <Image
                className="my-1"
                width={20}
                height={20}
                src={"/rightIcon.png"}
              />
            </div>
          </button>
        </div>
      </div>
      {/* box 2 */}
      <div className="w-[400px] h-[200px] relative mx-5">
        <Image
          className="min-h-[200px] w-full max-[1200px]:h-[350px]"
          width={200}
          height={200}
          src={"/community1.png"}
        />
        <div className="flex absolute top-3 w-[390px] mx-2 justify-between max-[980px]:w-[250px] max-[1200px]:w-[250px]">
          <div className="flex">
            <div className="mx-2 text-white">
              <p>{`By ${"Juki"}`}</p>
            </div>
            <div className="mx-2 text-[#F09024]">
              <p>{`${"17 Min Ago"}`}</p>
            </div>
          </div>
          <div className="flex mx-2">
            <Image
              className="mx-2"
              width={25}
              height={20}
              src={"/lovered.png"}
            />
            <div className="text-white">
              <p>{`${23}`}</p>
            </div>
          </div>
        </div>
        <div className="w-full my-4 text-white top-[30px] absolute">
          <div className="mx-2 font-bold">
            <p>Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok</p>
          </div>
          <div className="mx-2 my-4">
            <p>
              Gunung Rinjani adalah salah satu pesona alam yang indah yang
              berada di timur indonesia yaitu lombok
            </p>
          </div>
        </div>
        <div className="w-full mx-2 absolute bottom-[-100px] text-white">
          <button className="flex w-[150px] bg-[#F09024] rounded-[30px] py-[5px]">
            <p className="w-3/4">Read more</p>
            <div className="flex items-center justify-center">
              <Image
                className="my-1"
                width={20}
                height={20}
                src={"/rightIcon.png"}
              />
            </div>
          </button>
        </div>
      </div>
      {/* box 3 */}
      <div className="w-[400px] h-[200px] relative mx-5">
        <Image
          className="min-h-[200px] w-full max-[1200px]:h-[350px]"
          width={200}
          height={200}
          src={"/community1.png"}
        />
        <div className="flex absolute top-3 w-[390px] mx-2 justify-between max-[980px]:w-[250px] max-[1200px]:w-[250px]">
          <div className="flex">
            <div className="mx-2 text-white">
              <p>{`By ${"Juki"}`}</p>
            </div>
            <div className="mx-2 text-[#F09024]">
              <p>{`${"17 Min Ago"}`}</p>
            </div>
          </div>
          <div className="flex mx-2">
            <Image
              className="mx-2"
              width={25}
              height={20}
              src={"/lovered.png"}
            />
            <div className="text-white">
              <p>{`${23}`}</p>
            </div>
          </div>
        </div>
        <div className="w-full my-4 text-white top-[30px] absolute">
          <div className="mx-2 font-bold">
            <p>Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok</p>
          </div>
          <div className="mx-2 my-4">
            <p>
              Gunung Rinjani adalah salah satu pesona alam yang indah yang
              berada di timur indonesia yaitu lombok
            </p>
          </div>
        </div>
        <div className="w-full mx-2 absolute bottom-[-100px] text-white">
          <button className="flex w-[150px] bg-[#F09024] rounded-[30px] py-[5px]">
            <p className="w-3/4">Read more</p>
            <div className="flex items-center justify-center">
              <Image
                className="my-1"
                width={20}
                height={20}
                src={"/rightIcon.png"}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BodyNavigation;
