import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import banner1 from "@/public/home-banner1.png";
import fireIcon from "../../public/fire-icon.png";
import trending1 from "@/public/trending-1.png";
import { FaStar } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { FaRoute } from "react-icons/fa";
import { set } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Ticket() {
  const router = useRouter();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [dataTrendingTicket, setDataTrendingTicket] = useState([]);
  const [nearestTickets, setNearestTickets] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNearest, setLoadingNearest] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const inputRef = useRef(null);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

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

  //  Memanggil API dengan koordinat
  const fetchNearestTickets = async (latitude, longitude) => {
    setLoadingNearest(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-nearest-ticket-data?latitude=${latitude}&longitude=${longitude}`
      );
      setNearestTickets(response.data.data); // Simpan data dari API
      setLoadingNearest(false);
    } catch (err) {
      setLoadingNearest(false);
      console.error(err);
      // setError("Failed to fetch nearest tickets.");
    }
  };

  useEffect(() => {
    const fetchDataTrendingTicket = async () => {
      setLoadingTrending(true);
      try {
        // Lakukan GET request ke API
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/get-trending-ticket`,
          {
            headers: {
              accept: "application/json", // Header API
            },
          }
        );
        // Set data dari respons API ke state
        setDataTrendingTicket(response.data.data);
        setLoadingTrending(false);
      } catch (err) {
        // Set error jika terjadi kesalahan
        console.error(err.message);
        setLoadingTrending(false);
      }
    };

    fetchDataTrendingTicket();
  }, []);

  const handleClickSearch = () => {
    setIsSearchPage(!isSearchPage);
  };

  useEffect(() => {
    // Fokuskan ke input saat berpindah ke halaman pencarian
    if (isSearchPage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchPage]);

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/tickets/search-ticket?searchData=${searchInput}`,
        {
          headers: {
            accept: "application/json", // Header API
          },
        }
      );
      setSearchResults(response.data?.data || []);
    } catch (err) {
      console.log("Gagal mendapatkan data, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Gunakan useEffect untuk memantau perubahan input dan implementasi debounce
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer); // Hapus timer sebelumnya

    const timer = setTimeout(() => {
      fetchSearchResults(searchInput); // Panggil API setelah delay
    }, 500); // Delay 500ms

    setDebounceTimer(timer);

    return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
  }, [searchInput]);

  return (
    <main className="font-poppins flex justify-center">
      {!isSearchPage ? (
        <div className="w-full max-w-[440px]">
          <section className="p-5">
            <button
              onClick={goBack}
              className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <div className="mt-5 flex flex-col gap-2">
              <h1 className="font-bold text-xl">Beli Tiket</h1>
              <p className="text-[0.6rem] text-black/50">
                Temukan berbagai artikel untuk menambah referensi pendakianmu
              </p>
            </div>

            <div
              onClick={handleClickSearch}
              className="w-[100%] mt-5 bg-[#F3F5F7] border border-black/10 p-[0.4rem] rounded-full flex gap-3 items-center"
            >
              <CiSearch className="text-2xl" />
              <input
                className="w-full outline-none bg-[#F3F5F7]"
                type="text"
                placeholder="Cari Tujuan"
              />
            </div>

            <img
              src={banner1.src}
              className="rounded-2xl mt-5 h-[10rem] w-[25rem]"
            />
          </section>

          <section>
            <div className="flex justify-between mt-5 items-center px-5">
              <span className="flex gap-2 items-center">
                <h1 className="text-[14px] font-bold">Trending</h1>
                <img className="w-4 h-5" alt="fire icon" src={fireIcon.src} />
              </span>
              <Link href="/ticket/trending">
                <p className="text-[#F09024] text-[12px]">Lihat Semua</p>
              </Link>
            </div>

            <div className="flex gap-6 overflow-x-scroll scrollbar-hide w-full px-5">
              <div className="flex w-max gap-2">
                {/* Card 1 */}
                {loadingTrending ? (
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
                  dataTrendingTicket.map((item, index) => (
                    <Link
                      key={index}
                      href={`/ticket/mountain/${item.TicketId}`}
                    >
                      <div className="min-w-[13rem] shadow-md min-h-[16rem] mb-5 mt-5 rounded-lg">
                        <div className="relative">
                          <span className="bg-white rounded-full p-1 px-3 text-[10px] absolute top-2 right-2 flex w-[3.5rem] items-center gap-1">
                            <FaStar className="text-[#F09024]" />
                            4.8
                          </span>
                          <img
                            className="h-[8rem] w-full object-cover rounded-t-lg"
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

          <section className="pb-5">
            <div className="flex justify-between mt-8 items-center px-5">
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
                      <Skeleton height={100} width={180} />
                      <Skeleton count={3} />
                    </div>
                    <div>
                      <Skeleton height={100} width={180} />
                      <Skeleton count={3} />
                    </div>
                    <div>
                      <Skeleton height={100} width={180} />
                      <Skeleton count={3} />
                    </div>
                  </div>
                ) : (
                  nearestTickets.map((item, index) => (
                    <Link
                      key={index}
                      href={`/ticket/mountain/${item.TicketId}`}
                    >
                      <div className="min-w-[11rem] shadow-md min-h-[17rem] mb-5 mt-5 rounded-lg">
                        <div className="relative">
                          <span className="bg-white rounded-full p-1 px-3 text-[10px] absolute top-2 right-2 flex w-[3.5rem] items-center gap-1">
                            <FaStar className="text-[#F09024]" />
                            4.8
                          </span>
                          <img
                            className="h-[8rem] w-full object-cover rounded-t-lg"
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
        </div>
      ) : (
        <section className="w-full max-w-[440px] px-3">
          <div className="flex gap-2">
            <button
              onClick={handleClickSearch}
              className="flex w-[2.7rem] mt-5 h-[2.5rem] justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <div className="w-[100%] mt-5 bg-[#F3F5F7] border border-black/10 p-[0.4rem] rounded-full flex gap-3 items-center">
              <CiSearch className="text-2xl" />
              <input
                ref={inputRef}
                className="w-full outline-none bg-[#F3F5F7]"
                type="text"
                placeholder="Cari Tujuan"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 mx-2">
            {searchInput !== "" && (
              <h4 className="text-[0.6rem] font-bold text-gray-500">
                HASIL PENCARIAN
              </h4>
            )}

            <div className="flex flex-col gap-[0.1rem]">
              {searchResults?.map((item, index) => (
                <Link key={index} href={`/ticket/mountain/${item.TicketId}`}>
                  <div className="mt-2 flex gap-2 items-center">
                    <img
                      src={item.ImageUrl}
                      className="w-[2.5rem] h-[2.5rem] rounded-md"
                    />
                    <div className="flex flex-col gap-[0.1rem]">
                      <h4 className="text-xs font-bold">{item.TicketName}</h4>
                      <p className="text-[0.6rem] font-bold text-gray-400">
                        {item.TicketCity} •{" "}
                        <span className="text-[#F09024]">
                          Rp {item.TicketPrice.toLocaleString("id-ID")}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {searchInput !== "" && <hr className="mt-4" />}
          <div className="mt-4 mx-2">
            <h4 className="text-[0.6rem] font-bold text-gray-500">
              SEDANG TRENDING
            </h4>

            <div className="flex flex-col gap-[0.1rem]">
              {dataTrendingTicket.map((item, index) => (
                <Link key={index} href={`/ticket/mountain/${item.TicketId}`}>
                  <div className="mt-2 flex gap-2 items-center">
                    <img
                      src={item.ImageUrl}
                      className="w-[2.5rem] h-[2.5rem] rounded-md"
                    />
                    <div className="flex flex-col gap-[0.1rem]">
                      <h4 className="text-xs font-bold">{item.TicketName}</h4>
                      <p className="text-[0.6rem] font-bold text-gray-400">
                        {item.TicketCity} •{" "}
                        <span className="text-[#F09024]">
                          Rp {item.TicketPrice.toLocaleString("id-ID")}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4 mx-2">
            <h4 className="text-[0.6rem] font-bold text-gray-500">
              TERDEKAT DARI LOKASIMU
            </h4>

            <div className="flex flex-col gap-[0.1rem]">
              {nearestTickets.map((item, index) => (
                <Link key={index} href={`/ticket/mountain/${item.TicketId}`}>
                  <div className="mt-2 flex gap-2 items-center">
                    <img
                      src={item.ImageUrl}
                      className="w-[2.5rem] h-[2.5rem] rounded-md"
                    />
                    <div className="flex flex-col gap-[0.1rem]">
                      <h4 className="text-xs font-bold">{item.TicketName}</h4>
                      <p className="text-[0.6rem] font-bold text-gray-400">
                        {item.TicketCity} •{" "}
                        <span className="text-[#F09024]">
                          Rp {item.TicketPrice.toLocaleString("id-ID")}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
