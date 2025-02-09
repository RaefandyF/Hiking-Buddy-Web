import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import CommunityImage1 from "@/public/detail-community-img.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { getRelativeTime } from "@/utils/timeUtils";
import LoadingFull from "@/components/Loading/LoadingFull";
import { ro } from "date-fns/locale";
import jwt from "jsonwebtoken";
import { formatIndonesianTimeAuto } from "@/utils/timeUtils";
import { set } from "date-fns";

export default function DetailCommunity() {
  const router = useRouter();
  const { id } = router.query;
  const textareaRef = useRef(null);
  const [dataReply, setDataReply] = useState();
  const [dataThread, setDataThread] = useState();
  const [comment, setComment] = useState("");
  const [updateChange, setUpdateChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likedThreads, setLikedThreads] = useState({});

  // localStorage.getItem

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/"); // Fallback ke halaman utama jika tidak ada riwayat
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lakukan GET request ke API dengan limit dan offset sebagai query params
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/get-comment-data`,
          {
            params: {
              threadId: id,
            },
          }
        );
        // Set data dari respons API ke state
        setDataReply(response.data.data);
      } catch (err) {
        // Set error jika terjadi kesalahan
        console.error(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [updateChange, id]);

  useEffect(() => {
    const fetchDataThread = async () => {
      try {
        // Lakukan GET request ke API dengan limit dan offset sebagai query params
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/get-thread`,
          {
            params: {
              threadId: id,
            },
          }
        );
        // Set data dari respons API ke state
        setDataThread(response.data.data[0]);
      } catch (err) {
        // Set error jika terjadi kesalahan
        console.error(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchDataThread();
    }
  }, [id]);

  useEffect(() => {
    if (dataThread && dataReply) {
      setLoading(false);
    }
  }, [dataThread, dataReply]);

  const handlePostRepy = async () => {
    const token = localStorage.getItem("HikingBuddyToken");
    try {
      const decoded = jwt.decode(token);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/add-thread-comment`,
        {
          ThreadId: id,
          UserId: decoded.result[0].UserId,
          CommentData: comment,
        }
      );
      console.log(response);
      alert("Berhsil menambahkan komentar");
      setComment("");
      setUpdateChange(!updateChange);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     const likesData = {};
  //     for (const thread of data) {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/show-all-like-thread/${thread.ThreadId}`
  //         );
  //         const result = await response.json();
  //         if (result.status === "success") {
  //           likesData[thread.ThreadId] = {
  //             users: result.data.map((like) => like.UserId),
  //             total: result.data.length,
  //           };
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch likes:", error);
  //       }
  //     }
  //     setLikedThreads(likesData);
  //   };
  //   fetchLikes();
  // }, [dataThread]);

  // const addLike = async (threadId) => {
  //   console.log("halo");
  //   console.log(threadId);
  //   console.log(userId);

  //   if (!userId) {
  //     alert("Silahkan Login terlebih dahulu");
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/add-like-thread`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ThreadId: threadId,
  //           UserId: userId,
  //         }),
  //       }
  //     );

  //     const result = await response.json();
  //     if (result.status === "success") {
  //       // Update local state to reflect new like
  //       setLikedThreads((prev) => ({
  //         ...prev,
  //         [threadId]: {
  //           users: [...(prev[threadId]?.users || []), userId],
  //           total: (prev[threadId]?.total || 0) + 1,
  //         },
  //       }));
  //     } else {
  //       console.error("Failed to like thread:", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error adding like:", error.message);
  //   }
  // };

  // const removeLike = async (threadId) => {
  //   axios
  //     .delete(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/threads/remove-like-thread`,
  //       {
  //         data: {
  //           ThreadId: threadId,
  //           UserId: userId,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.status === "success") {
  //         setLikedThreads((prev) => {
  //           const updatedLikes = { ...prev };
  //           if (updatedLikes[threadId]) {
  //             updatedLikes[threadId].users = updatedLikes[
  //               threadId
  //             ].users.filter((id) => id !== userId);
  //             updatedLikes[threadId].total -= 1;
  //           }
  //           return updatedLikes;
  //         });
  //       } else {
  //         console.error("Failed to unlike thread:", response.data.message);
  //       }
  //     })
  //     .catch((error) => console.error("Error removing like:", error.message));
  // };

  // axios.get();

  return (
    <main className="font-poppins flex justify-center">
      {loading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px] pb-[5rem]">
          <section className="p-5">
            <button
              onClick={goBack}
              className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <div className="flex justify-center mt-[-1.7rem]">
              <h1 className="text-[18px]">Komunitas</h1>
            </div>
          </section>
          <section className="px-5">
            <div className="p-3 rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img
                    src={dataThread?.profileImageUrl}
                    className="rounded-full w-11 h-11"
                  />
                  <div>
                    <h1 className="font-bold text-[14px]">
                      {dataThread?.Username}
                    </h1>
                    <p className="text-black/30 text-[10px]">
                      {getRelativeTime(dataThread?.ThreadDateRelease)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <p className="text-[11px]">{dataThread?.ThreadDescription}</p>
                <img
                  src={dataThread?.imageUrl}
                  className="w-full h-[18rem] rounded-2xl"
                />
                <div className="text-black/60 text-[12px] flex gap-3 border-b-[1px] pb-2">
                  <p className="">15.25</p>
                  <p>•</p>
                  <p>
                    {formatIndonesianTimeAuto(
                      dataThread?.ThreadDateRelease,
                      "date"
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <span className="flex gap-2 items-center">
                      <FaRegHeart className="text-xl text-black/50" />
                      <h3 className="text-black/50 text-[14px]">
                        {dataThread?.TotalLike}
                      </h3>
                    </span>
                    <span className="flex gap-2 items-center">
                      <AiOutlineMessage className="text-2xl text-black/50" />
                      <h3 className="text-black/50 text-[14px]">
                        {dataThread?.TotalComment}
                      </h3>
                    </span>
                    <span className="flex gap-2 items-center">
                      <PiShareFat className="text-2xl text-black/50" />
                      <h3 className="text-black/50 text-[14px]">
                        {dataThread?.TotalShare}
                      </h3>
                    </span>
                  </div>
                  <div>
                    <FaRegBookmark className="text-xl text-black/50" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-1 pb-5">
            <hr />
            <div className="mt-3 text-[14px]">
              <h3 className="px-5">Balasan</h3>
              {dataReply?.map((item, index) => (
                <div className="border-b-[1px] pb-3">
                  <div className="px-5">
                    <div className="flex gap-3 items-center mt-4">
                      <img
                        src={item.profileImageUrl}
                        className="rounded-full w-11 h-11"
                      />
                      <div>
                        <h1 className="font-bold text-[14px]">
                          {item.Username}
                        </h1>
                        <p className="text-black/30 text-[10px]">
                          {getRelativeTime(item.CommentDateRelease)}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="px-5 pl-14">
                        <p className="text-[12px]">{item.CommentData}</p>
                        <span className="flex gap-2 items-center mt-3">
                          <FaRegHeart className="text-lg text-black/50" />
                          <h3 className="text-black/50 text-[12px]">
                            {item.TotalLike}
                          </h3>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="border-b-[1px] pb-3">
              <div className="px-5">
                <div className="flex gap-3 items-center mt-4">
                  <img className="rounded-full bg-black w-11 h-11" />
                  <div>
                    <h1 className="font-bold text-[14px]">Ann Calista</h1>
                    <p className="text-black/30 text-[10px]">
                      21 Jam yang Lalu
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="px-5 pl-14">
                    <p className="text-[12px]">Keren bener weyy</p>
                    <span className="flex gap-2 items-center mt-3">
                      <FaHeart className="text-lg text-[#F09024]" />
                      <h3 className="text-black/50 text-[12px]">20</h3>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </section>

          <footer className="flex justify-between items-center gap-6 p-4 px-5 pt-5 drop-shadow-4xl fixed bottom-0 w-full bg-white max-w-[440px]">
            <TextareaAutosize
              className="w-full text-[12px] rounded-2xl border-gray-200 border-2 bg-[#f7f7f7] p-2 px-4"
              placeholder="Tulis balasan disini.."
              minRows={1}
              maxRows={10}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              // value={threadDescription}
              // onChange={(e) => setThreadDescription(e.target.value)}
            />
            <IoSend
              onClick={handlePostRepy}
              className="text-2xl text-[#F09024]"
            />
          </footer>
        </div>
      )}
    </main>
  );
}
