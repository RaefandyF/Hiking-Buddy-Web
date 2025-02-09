import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import gunung1 from "@/public/gunung1.png";
import { IoIosArrowBack } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";
import { FaStar, FaParking } from "react-icons/fa";
import ExpandableText from "@/components/ExpandableText/ExpandableText";
import GoogleMapFrame from "@/components/GoogleMapFrame";
import { BiMaleFemale } from "react-icons/bi";
import { RiHotelFill } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";
import axios from "axios";
import { use } from "passport";
import LoadingFull from "@/components/Loading/LoadingFull";

export default function MountainDetail() {
  const router = useRouter();
  const { ticketId } = router.query;
  const [ticketData, setTicketData] = useState();
  console.log(ticketData);
  
  const [ticketReview, setTicketReview] = useState();
  const [loading, setLoading] = useState(true);
  const IconMapping = {
    FI0001: BiMaleFemale,
    FI0002: FaParking,
    FI0003: FaShop,
    FI0004: RiHotelFill,
    // Tambahkan ID dan ikon lainnya di sini
  };

  const mountainText =
    "Pendakian Gunung Rinjani (puncak) merupakan salah satu objek wisata yang menjadi andalan di kawasan Taman Nasional Gunung Rinjani. Gunung Rinjani sebagai gunung vulkanik yang  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };
  useEffect(() => {
    const fetchDetailTicket = async (latitude, longitude) => {
      // setLoadingNearest(true);
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-detail-ticket`,
          {
            params: {
              TicketId: ticketId,
            },
          }
        );
        setTicketData(response.data); // Simpan data dari API
        setTicketReview(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        // setLoadingNearest(false);
        console.error(err);
        // setError("Failed to fetch nearest tickets.");
      }
    };
    if (ticketId) {
      fetchDetailTicket();
    }
  }, [ticketId]);

  return (
    <main className="font-poppins flex justify-center">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <div className="w-full max-w-[440px]">
            <section
              style={{ backgroundImage: `url(${ticketData.mainImage?.url})` }}
              className="w-full h-[20rem] bg-cover bg-no-repeat bg-center p-5"
            >
              <div className="">
                <button
                  onClick={goBack}
                  className="flex justify-between items-center p-2 rounded-full bg-white"
                >
                  <IoIosArrowBack className="text-xl" />
                </button>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] z-10 relative bottom-7 h-[10rem]">
              <div className="flex items-center gap-2 px-5 pt-8">
                <FiMapPin />
                <p className="text-[12px] text-[#274753] font-bold w-full">
                  {ticketData.averageScore[0]?.TicketCity},{" "}
                  {ticketData.averageScore[0]?.TicketProvince}
                </p>
                <span className="flex justify-end text-xl">
                  <IoShareSocial />
                </span>
              </div>

              <div className="px-5">
                <h1 className="text-[22px] font-semibold mt-4">
                  {ticketData.averageScore[0]?.TicketName}
                </h1>
                <div className="mt-3 flex gap-8 items-center justify-left max-[415px]:gap-6 max-[367px]:gap-4 max-[319px]:gap-2">
                  <span>
                    <p className="text-[10px] text-black/60">Distance</p>
                    <p className="font-bold text-[12px]">
                      {ticketData.averageScore[0]?.DistanceToPeak} km
                    </p>
                  </span>
                  <span className="border-l border-black/30 h-5" />
                  <span>
                    <p className="text-[10px] text-black/60">Elevation</p>
                    <p className="font-bold text-[12px]">
                      {ticketData.averageScore[0]?.Elevation} m
                    </p>
                  </span>
                  <span className="border-l border-black/30 h-5" />
                  <span>
                    <p className="text-[10px] text-black/60">Duration</p>
                    <p className="font-bold text-[12px]">
                      {ticketData.averageScore[0]?.Duration}
                    </p>
                  </span>
                  <span className="border-l border-black/30 h-5" />
                  <span className="">
                    <p className="text-[10px] text-black/60">Rate</p>
                    <p className="font-bold text-[12px] flex items-center gap-1">
                      <FaStar />
                      {ticketData.averageScore[0].Rating?.slice(0, 3)}
                    </p>
                  </span>
                </div>
                <div className="mt-5">
                  <ExpandableText
                    text={ticketData.averageScore[0]?.TicketMountainDescription}
                    maxLength={150}
                  />
                </div>
              </div>

              <div className="mt-4 px-5">
                <h1 className="font-bold mb-2">Foto</h1>
                <span className="flex gap-4">
                  {/* <img
                    className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                    src={gunung1.src}
                  /> */}
                  <img
                    className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                    src={ticketData.imageDetail[1]?.url}
                  />
                  <img
                    className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                    src={ticketData.imageDetail[2]?.url}
                  />
                  <img
                    className="max-w-[5rem] h-[5rem] rounded-2xl max-[370px]:w-[4rem] max-[370px]:h-[4rem] max-[305px]:w-[3rem] max-[305px]:h-[3rem]"
                    src={ticketData.imageDetail[3]?.url}
                  />
                </span>
              </div>

              <div className="mt-5">
                <h1 className="font-bold mb-3 px-5">Rating dan Review</h1>
                <div className="flex gap-6 overflow-x-scroll scrollbar-hide w-full">
                  <div className="flex w-max gap-4 px-5 pb-4">
                    {ticketData.ratingData?.map((item, index) => (
                      <div className="flex flex-col gap-4 bg-[#F3F5F7] p-4 w-[20rem] rounded-2xl drop-shadow-xl">
                        <span className="flex gap-2">
                          {Array.from(
                            { length: item.RatingScore },
                            (_, index) => (
                              <FaStar key={index} className="text-[#F09024]" />
                            )
                          )}
                        </span>
                        <p className="text-[12px] text-black/60">
                          {item.ReviewText}
                        </p>
                        <span className="flex items-center gap-2">
                          <img
                            src={item.profileImage}
                            className="h-8 w-8 rounded-full"
                          />
                          <p className="text-[12px] font-bold">
                            {item.Username}
                          </p>
                        </span>
                      </div>
                    ))}

                    {/* <div className="flex flex-col gap-4 bg-[#F3F5F7] p-4 w-[20rem] rounded-2xl drop-shadow-xl">
                      <span className="flex gap-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>
                      <p className="text-[12px] text-black/60">
                        “Pengalaman yang tidak terlupakan! Pemandangan dari
                        puncak luar biasa, tapi pendakian cukup menantang.
                        Persiapkan fisik dan mental!”
                      </p>
                      <span className="flex items-center gap-2">
                        <img className="h-8 w-8 rounded-full bg-black" />
                        <p className="text-[12px] font-bold">John Adove</p>
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="px-5 mt-4">
                <h1 className="font-bold mb-3">Peta Lokasi</h1>
                <h3 className="text-[12px] flex gap-2 items-center p-2 rounded-full bg-[#E7F8FF]">
                  <FiMapPin />
                  <b>Lokasi Basecamp:</b> {ticketData.basecamp.map((item) => item.BasecampName).join(', ')}
                </h3>
                <div className="mt-4">
                  <GoogleMapFrame location="Jakarta" />
                </div>
              </div>

              <div className="px-5 mt-9 pb-[7rem]">
                <h1 className="font-bold mb-5">Fasilitas Sekitar Basecamp</h1>
                <div className="flex gap-7">
                  {ticketData.facilityData?.map((facility) => {
                    const IconComponent = IconMapping[facility.FacilityId]; // Pemetaan ikon di sini

                    return (
                      <span
                        key={facility.FacilityId}
                        className="flex flex-col items-center gap-1"
                      >
                        {IconComponent ? (
                          <IconComponent className="text-2xl" />
                        ) : (
                          <span className="text-2xl">?</span> // Ikon default jika FacilityId tidak ditemukan
                        )}
                        <p className="text-[12px]">{facility.FacilityName}</p>
                      </span>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
          <footer className="flex justify-between items-center p-5 fixed bottom-0 w-full bg-white border-t-[1px] z-50 max-w-[440px]">
            <div className="">
              <p className="text-[10px] text-black/50">Harga tiket masuk</p>
              <h1 className="text-[14px] text-[#F09024]">Rp {ticketData.averageScore[0].TicketPrice?.toLocaleString("id-ID")}</h1>
              <p className="text-[10px] text-black/50">
                Belum termasuk pajak & biaya
              </p>
            </div>
            <Link href={`/ticket/mountain/${ticketId}/tnc`}>
              <button className="h-[2rem] px-3 rounded-md text-white bg-[#F09024]">
                Beli Tiket
              </button>
            </Link>
          </footer>
        </div>
      )}
    </main>
  );
}
