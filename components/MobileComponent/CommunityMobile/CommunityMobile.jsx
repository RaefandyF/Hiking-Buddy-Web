import React, { useEffect, useState } from "react";
import { FaRegCompass, FaFileSignature } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import CommunityImage1 from "./assets/community1.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import FooterMobile from "../FooterMobile/FooterMobile";
import Link from "next/link";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getRelativeTime } from "@/utils/timeUtils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CommunityMobile() {
  const [data, setData] = useState([]);
  const [likedThreads, setLikedThreads] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("HikingBuddyToken") !== null) {
      const token = localStorage.getItem("HikingBuddyToken") || "";
      const decoded = jwt.decode(token) || "";
      setUserId(decoded.result[0].UserId);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lakukan GET request ke API dengan limit dan offset sebagai query params
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/get-all-thread`,
          {
            params: {
              offset: 0, // Menambahkan parameter limit
              limit: 10, // Menambahkan parameter offset
            },
          }
        );
        // Set data dari respons API ke state
        setData(response.data.threads);
        setLoading(false);
      } catch (err) {
        // Set error jika terjadi kesalahan
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = {};
      for (const thread of data) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/show-all-like-thread/${thread.ThreadId}`
          );
          const result = await response.json();
          if (result.status === "success") {
            likesData[thread.ThreadId] = {
              users: result.data.map((like) => like.UserId),
              total: result.data.length,
            };
          }
        } catch (error) {
          console.error("Failed to fetch likes:", error);
        }
      }
      setLikedThreads(likesData);
    };
    fetchLikes();
  }, [data]);

  // Add like to thread
  const addLike = async (threadId) => {
    console.log("halo");
    console.log(threadId);
    console.log(userId);

    if (!userId) {
      alert("Silahkan Login terlebih dahulu");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/add-like-thread`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ThreadId: threadId,
            UserId: userId,
          }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        // Update local state to reflect new like
        setLikedThreads((prev) => ({
          ...prev,
          [threadId]: {
            users: [...(prev[threadId]?.users || []), userId],
            total: (prev[threadId]?.total || 0) + 1,
          },
        }));
      } else {
        console.error("Failed to like thread:", result.message);
      }
    } catch (error) {
      console.error("Error adding like:", error.message);
    }
  };

  const removeLike = async (threadId) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/remove-like-thread`,
        {
          data: {
            ThreadId: threadId,
            UserId: userId,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setLikedThreads((prev) => {
            const updatedLikes = { ...prev };
            if (updatedLikes[threadId]) {
              updatedLikes[threadId].users = updatedLikes[
                threadId
              ].users.filter((id) => id !== userId);
              updatedLikes[threadId].total -= 1;
            }
            return updatedLikes;
          });
        } else {
          console.error("Failed to unlike thread:", response.data.message);
        }
      })
      .catch((error) => console.error("Error removing like:", error.message));
  };

  const handleSearch = () => {
    setLoading(true);
    if (searchQuery.trim() === "") {
      const fetchData = async () => {
        try {
          // Lakukan GET request ke API dengan limit dan offset sebagai query params
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/get-all-thread`,
            {
              params: {
                offset: 0, // Menambahkan parameter limit
                limit: 10, // Menambahkan parameter offset
              },
            }
          );
          // Set data dari respons API ke state
          setData(response.data.threads);
          setLoading(false);
        } catch (err) {
          // Set error jika terjadi kesalahan
          console.error(err.message);
          setLoading(false);
        }
      };
      fetchData();
      return;
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/search-thread-data?searchData=${searchQuery}`,
        {
          authorization: `Bearer ${localStorage.getItem("HikingBuddyToken")}`,
        }
      )
      .then((response) => {
        const searchResultThreadIds = response.data.message.map(
          (thread) => thread.ThreadId
        );
        const filtered = data.filter((thread) =>
          searchResultThreadIds.includes(thread.ThreadId)
        );
        setData(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // console.log(data);
  return (
    <main className="font-poppins pb-[7rem] flex justify-center">
      <div className="w-full max-w-[440px]">
        <header className="flex justify-between p-5 items-center gap-2 shadow-sm">
          <div className="w-[100%] border border-black/10 p-2 rounded-full flex gap-3 items-center">
            <CiSearch className="text-2xl" />
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Cari thread"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Panggil API saat tombol Enter ditekan
                }
              }}
            />
          </div>
          <div className="flex gap-3">
            <FaRegCompass className="text-2xl" />
            <IoIosNotifications className="text-2xl" />
          </div>
        </header>

        {loading ? (
          <section className="flex flex-col gap-2 m-5">
            <div>
              <Skeleton className="w-full" height={230} />
            </div>
            <div>
              <Skeleton className="w-full" height={230} />
            </div>
            <div>
              <Skeleton className="w-full" height={230} />
            </div>
          </section>
        ) : (
          <section className="p-5">
            <div className="flex flex-col gap-5">
              {data.map((item, id) => (
                <div key={id} className="border border-black/10 p-3 rounded-xl">
                  <Link href={`/community/${item.ThreadId}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.profileImageUrl}
                          className="rounded-full bg-black w-11 h-11"
                        />
                        <div>
                          <h1 className="font-bold">{item.Username}</h1>
                          <p className="text-xs text-black/30">
                            {getRelativeTime(item.ThreadDateRelease)}
                          </p>
                        </div>
                      </div>
                      <CiMenuKebab className="text-3xl rotate-90" />
                    </div>
                  </Link>
                  <div className="mt-3 flex flex-col gap-3">
                    <Link href={`/community/${item.ThreadId}`}>
                      <p className="text-[0.65rem]">{item.ThreadDescription}</p>
                    </Link>
                    <img
                      src={item.imageUrl}
                      alt="thread"
                      className="w-full h-[10rem] object-cover object-center rounded-lg border border-black/10"
                    />
                    <div className="flex gap-8">
                      <span className="flex gap-2 items-center">
                        {likedThreads[item.ThreadId]?.users.includes(userId) ? (
                          <FaHeart
                            onClick={() => removeLike(item.ThreadId)}
                            className="text-xl text-[#F09024]"
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => addLike(item.ThreadId)}
                            className="text-xl text-black/50"
                          />
                        )}
                        <h3 className="text-black/50">
                          {likedThreads[item.ThreadId]?.total || item.TotalLike}
                        </h3>
                      </span>
                      <Link href={`/community/${item.ThreadId}`}>
                        <span className="flex gap-2 items-center">
                          <AiOutlineMessage className="text-xl text-black/50" />
                          <h3 className="text-black/50">{item.TotalComment}</h3>
                        </span>
                      </Link>
                      <span className="flex gap-2 items-center">
                        <PiShareFat className="text-xl text-black/50" />
                        <h3 className="text-black/50">{item.TotalShare}</h3>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="border border-black/10 p-3 rounded-xl">
            <Link href={"/community/1"}>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img className="rounded-full bg-black w-11 h-11" />
                  <div>
                    <h1 className="font-bold">Ann Calista</h1>
                    <p className="text-xs text-black/30">21 Jam yang Lalu</p>
                  </div>
                </div>
                <CiMenuKebab className="text-3xl rotate-90" />
              </div>
            </Link>
            <div className="mt-3 flex flex-col gap-3">
              <Link href={"/community/1"}>
                <p className="text-[0.65rem]">
                  Pendakian Gunung Rinjani (puncak) merupakan salah satu objek
                  wisata yang menjadi andalan di kawasan Taman Nasional Gunung
                  Rinjani. Gunung Rinjani sebagai gunung vulkanik yang masih
                  aktif nomor 2 tertinggi di Indonesia. Puncak Gunung Rinjani
                  merupakan tujuan sebagian besar para petualang dan pencinta
                  alam yang mengunjungi...
                </p>
              </Link>
              <img src={CommunityImage1.src} className="" />
              <div className="flex gap-8">
                <span className="flex gap-2 items-center">
                  <FaHeart className="text-2xl text-[#F09024]" />
                  <h3 className="text-black/50">101</h3>
                </span>
                <Link href={"/community/1"}>
                  <span className="flex gap-2 items-center">
                    <AiOutlineMessage className="text-2xl text-black/50" />
                    <h3 className="text-black/50">15</h3>
                  </span>
                </Link>
                <span className="flex gap-2 items-center">
                  <PiShareFat className="text-2xl text-black/50" />
                  <h3 className="text-black/50">9</h3>
                </span>
              </div>
            </div>
          </div> */}
            </div>

            <Link href={"/create-community"}>
              <div className="fixed right-5 bottom-[7rem] bg-[#F09024] pl-5 pr-3 pt-4 pb-4 rounded-full flex justify-center items-center">
                <FaFileSignature className="text-2xl text-white" />
              </div>
            </Link>
          </section>
        )}

        <FooterMobile
          komunitas={"border-t-[4px] border-[#F09024] text-[#F09024] py-5"}
          aktivitas={"py-5"}
          profile={"py-5"}
        />
      </div>
    </main>
  );
}
