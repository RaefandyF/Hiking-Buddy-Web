import React, { useState, useEffect } from "react";
import { FaRegCompass, FaMapSigns, FaUser } from "react-icons/fa";
import axios from "axios";
import logo from "@/public/logo.png";
import banner1 from "@/public/banner1.png";
import { IoIosNotifications } from "react-icons/io";
import ruteIcon from "./assets/rute-menu.png";
import tripIcon from "./assets/trip-menu.png";
import alatIcon from "./assets/alat-menu.png";
import artikelIcon from "./assets/artikel-menu.png";
import daruratIcon from "./assets/darurat-menu.png";
import fireIcon from "./assets/fire-icon.png";
import article1 from "./assets/article1-photo.png";
import FooterMobile from "../FooterMobile/FooterMobile";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { FaRoute } from "react-icons/fa";
import trending1 from "@/public/trending-1.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomeMobile() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loadingNearest, setLoadingNearest] = useState(true);
  const [nearestTickets, setNearestTickets] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(true);

  useEffect(() => {
    // Mendapatkan lokasi pengguna
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchNearestTickets(latitude, longitude); // Panggil API dengan koordinat
          },
          (err) => {
            console.error(err);
            // setError(
            //   "Unable to retrieve location. Please enable location services."
            // );
          }
        );
      } else {
        // console.log("Geolocation is not supported by this browser.");
        // setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    setLoadingArticle(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/articles/get-all-article`
      )
      .then((res) => {
        setArticleData(res.data.data);
        setLoadingArticle(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingArticle(false);
      });
  }, []);

  function formatIndonesianTimeAuto(isoDate, type) {
    // Konversi ISO string ke Date
    const date = new Date(isoDate);

    // Tentukan offset untuk zona waktu Indonesia
    const jakartaOffset = 0; // WIB (GMT+7)
    const baliOffset = 1; // WITA (GMT+8)
    const papuaOffset = 2; // WIT (GMT+9)

    // Offset saat ini berdasarkan zona waktu lokal browser
    const localOffset = date.getTimezoneOffset() / -60; // Negatif karena getTimezoneOffset dalam menit ke UTC

    // Menentukan zona waktu berdasarkan offset
    let offset = jakartaOffset;
    let timezoneLabel = "WIB";

    if (localOffset === baliOffset) {
      offset = baliOffset;
      timezoneLabel = "WITA";
    } else if (localOffset === papuaOffset) {
      offset = papuaOffset;
      timezoneLabel = "WIT";
    }

    // Konversikan ke waktu lokal Indonesia
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);

    // Format tanggal dan waktu
    const day = localTime.getDate();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[localTime.getMonth()];
    const year = localTime.getFullYear();

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");

    if (type === "date") {
      return `${day} ${month} ${year}`;
    } else {
      return `${day} ${month} ${year}, ${hours}:${minutes} ${timezoneLabel}`;
    }
  }
  const fetchNearestTickets = async (latitude, longitude) => {
    setLoadingNearest(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-nearest-ticket-data?latitude=${latitude}&longitude=${longitude}`
      );
      setNearestTickets(response.data?.data); // Simpan data dari API
      setLoadingNearest(false);
    } catch (err) {
      setLoadingNearest(false);
      console.error(err);
      // setError("Failed to fetch nearest tickets.");
    }
  };

  return (
    <main className="font-poppins pb-[7rem] flex justify-center">
      <div className="max-w-[440px] w-full">
        <header className="flex justify-between p-5 items-center">
          <img alt="logo" height={80} width={80} src={logo.src} />
          <div className="flex gap-3">
            <FaRegCompass className="text-2xl" />
            <IoIosNotifications className="text-2xl" />
          </div>
        </header>

        <section>
          <div className="">
            <img alt="banner" src={banner1.src} className="w-full h-[12rem]" />
          </div>
          <div className="flex mx-5 shadow-xl rounded-xl p-5 relative bottom-4 bg-white gap-8 max-[410px]:gap-7 max-[330px]:gap-5 max-[290px]:gap-3 justify-center">
            <Link href="/rute">
              <span className="flex flex-col max-w-[2rem] items-center gap-1">
                <img
                  className="max-w-[2rem] max-h-[2rem]"
                  alt="rute icon"
                  src={ruteIcon.src}
                />
                <p className="text-[0.6rem] text-center">Rute dan Informasi</p>
              </span>
            </Link>
            <Link href="/ticket">
              <span className="flex flex-col max-w-[4rem] max-[379px]:max-w-[2rem] items-center gap-1">
                <img
                  className="max-w-[2rem]"
                  alt="trip icon"
                  src={tripIcon.src}
                />
                <p className="text-[0.6rem] text-center">Beli Tiket</p>
              </span>
            </Link>
            <Link href="/rent-tools/form">
              <span className="flex flex-col max-w-[4rem] max-[379px]:max-w-[2rem] items-center gap-1">
                <img
                  className="max-w-[2rem]"
                  alt="alat icon"
                  src={alatIcon.src}
                />
                <p className="text-[0.6rem] text-center">Sewa Alat</p>
              </span>
            </Link>

            <Link href="/article">
              <span className="flex flex-col items-center gap-1">
                <img
                  className="max-w-[2rem]"
                  alt="artikel icon"
                  src={artikelIcon.src}
                />
                <p className="text-[0.6rem] text-center">Artikel</p>
              </span>
            </Link>
            <span className="flex flex-col max-w-[2rem] items-center gap-1">
              <img
                className="max-w-[2rem]"
                alt="darurat icon"
                src={daruratIcon.src}
              />
              <p className="text-[0.6rem] text-center">Kontak Darurat</p>
            </span>
          </div>
        </section>

        <section className="">
          <div className="flex justify-between mt-5 items-center px-5">
            <span className="flex gap-2 items-center">
              <h1 className="text-[14px] font-bold">Gunung Terdekat</h1>
            </span>
            <Link href="/ticket/nearest">
              <p className="text-[#F09024] text-[12px]">Lihat Semua</p>
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-scroll scrollbar-hide w-full px-5">
            <div className="flex w-max gap-2">
              {/* Card 1 */}

              {loadingNearest ? (
                <div className="flex gap-2">
                  <div>
                    <Skeleton height={155} width={240} />
                    <Skeleton count={3} />
                  </div>
                  <div>
                    <Skeleton height={155} width={240} />
                    <Skeleton count={3} />
                  </div>
                </div>
              ) : (
                nearestTickets?.map((item, index) => (
                  <Link key={index} href={`/ticket/mountain/${item.TicketId}`}>
                    <div className="min-w-[11rem] shadow-md min-h-[17rem] mb-5 mt-5 rounded-lg">
                      <div className="relative">
                        <span className="bg-white rounded-full p-1 px-3 text-[10px] absolute top-2 right-2 flex w-[3.5rem] items-center gap-1">
                          <FaStar className="text-[#F09024]" />
                          4.8
                        </span>
                        <img
                          className="h-[8rem] object-cover w-full rounded-t-lg"
                          src={item.ImageUrl}
                          alt="ticket image"
                        />
                      </div>
                      <div className="px-2 flex flex-col gap-1">
                        <h1 className="text-[12px] font-bold mt-2">
                          {item.TicketName}
                        </h1>

                        <div className="flex flex-col gap-[0.2rem] text-black/60">
                          <p className="text-[9px] flex items-center gap-1">
                            <TbMapExclamation />
                            {item.LevelMountain.charAt(0).toUpperCase() +
                              String(item.LevelMountain).slice(1)}{" "}
                            Level
                          </p>
                          <p className="text-[9px] flex items-center gap-1">
                            <FiMapPin />
                            {item.TicketCity}, {item.TicketProvince}
                          </p>
                          <p className="text-[9px] flex gap-1">
                            <FaRoute />
                            {item.DistanceToPeak} km
                          </p>
                        </div>
                        <h2 className="text-[#F09024] text-[11px] font-bold">
                          Rp {item.TicketPrice.toLocaleString("id-ID")}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="px-5 mt-5">
          <div>
            <span className="flex justify-between items-center">
              <span className="flex gap-2">
                <img className="w-4 h-5" alt="fire icon" src={fireIcon.src} />
                <h1 className="font-bold text-[14px]">
                  Temukan Artikel Terbaru
                </h1>
              </span>
              <Link href="/article">
                <h2 className="text-[12px] text-right text-[#F09024] w-[5.7rem]">
                  Lihat Semua
                </h2>
              </Link>
            </span>
            <p className="text-xs text-[#908989] mt-1">
              plus rekomendasi lainnya
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-5">
            {loadingArticle ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-full" height={130} count={3} />
              </div>
            ) : (
              articleData?.slice(0, 3).map((item, index) => (
                <Link href={`/article/${item?.ArticleId}`}>
                  <div className="flex gap-3 items-center">
                    <img
                      alt="article"
                      src={item.imageUrl}
                      className="max-[348px]:h-[190px] h-[125px] w-[130px] max-[307px]:h-[250px] rounded-xl border-2"
                    />
                    <div className="flex flex-col gap-2">
                      <span className="flex gap-5 text-[0.6rem] text-[#B5ADAD]">
                        <p>BY {item?.WriterArticle.toUpperCase()}</p>
                        <p>
                          {formatIndonesianTimeAuto(
                            item?.ArticleDateRelease,
                            "date"
                          )}
                        </p>
                      </span>
                      <h1 className="text-[0.8rem] font-bold">
                        {item?.ArticleTitle}
                      </h1>
                      <p className="text-[0.6rem]">
                        {item?.ArticleData.slice(0, 100)}....
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <FooterMobile
          home={"border-t-[4px] border-[#F09024] text-[#F09024]"}
          komunitas={"py-7"}
          aktivitas={"py-7"}
          profile={"py-7"}
        />
      </div>
    </main>
  );
}
