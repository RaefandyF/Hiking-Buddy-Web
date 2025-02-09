import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import article1 from "../../public/article1-photo.png";
import Link from "next/link";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatIndonesianTimeAuto } from "@/utils/timeUtils";

export default function Article() {
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/articles/get-all-article`
      )
      .then((res) => {
        setArticleData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px] p-5">
        <section>
          <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
            <Link href="/">
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <div>
            <h1 className="mt-5 text-lg font-bold">Artikel</h1>
            <p className="text-[0.6rem] text-black/50">
              Temukan berbagai artikel untuk menambah referensi pendakianmu
            </p>
            {/* <div className="mt-4 w-full border bg-[#F3F5F7] gap-2 p-2 rounded-full flex items-center ">
              <FaSearch className="text-black/30 text-lg ml-2" />
              <input
                type="text"
                placeholder="Cari artikel"
                className="w-full outline-none bg-[#F3F5F7] text-[0.7rem]"
              />
            </div> */}
          </div>
        </section>

        {loading ? (
          <section className="flex flex-col gap-2">
            <Skeleton className="w-full" height={100} />
            <Skeleton className="w-full" height={100} />
            <Skeleton className="w-full" height={100} />
            <Skeleton className="w-full" height={100} />
            <Skeleton className="w-full" height={100} />
            <Skeleton className="w-full" height={100} />
          </section>
        ) : (
          <section className="mt-5">
            <div className="flex flex-col gap-3">
              {articleData.map((article, index) => (
                <Link key={index} href={`/article/${article?.ArticleId}`}>
                  <div className="flex gap-3 items-center">
                    <img
                      alt="article"
                      src={article?.imageUrl}
                      className="max-[348px]:h-[160px] w-[100px] h-[90px] max-[307px]:h-[200px] border-2 rounded-xl"
                    />
                    <div className="flex flex-col gap-2">
                      <span className="flex gap-5 text-[0.6rem] text-[#B5ADAD]">
                        <p>BY {article?.WriterArticle.toUpperCase()}</p>
                        <p>
                          {formatIndonesianTimeAuto(
                            article?.ArticleDateRelease,
                            "date"
                          )}
                        </p>
                      </span>
                      <h1 className="text-[0.8rem] font-bold">
                        {article?.ArticleTitle}
                      </h1>
                      <p className="text-[0.6rem]">
                        {article?.ArticleData.slice(0, 100)}
                        ....
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
