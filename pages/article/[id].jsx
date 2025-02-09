import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import article1 from "../../public/article1-detail.png";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingFull from "@/components/Loading/LoadingFull";
import { formatIndonesianTimeAuto } from "@/utils/timeUtils";

export default function DetailArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [articleData, setArticleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const formatTextWithBreaks = (text) => {
    return text.replace(/\\n\d?/g, "<br />");
  };

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/articles/get-article-data?articleId=${id}`
        )
        .then((res) => {
          setArticleData(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [id]);
  return (
    <main className="font-poppins flex justify-center">
      {isLoading ? (
        <LoadingFull />
      ) : (
        <div className="w-full max-w-[440px]">
          <section
            style={{ backgroundImage: `url(${articleData[0]?.imageUrl})` }}
            className="relative w-full h-[20rem] bg-cover bg-no-repeat bg-center p-5"
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="relative z-10">
              <div className="flex justify-between">
                <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
                  <Link href="/article">
                    <IoIosArrowBack className="text-xl text-black" />
                  </Link>
                </button>
                <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
                  <Link href="/article">
                    <FaRegBookmark className="text-lg text-black" />
                  </Link>
                </button>
              </div>
            </div>
            <div className="absolute bottom-10 flex flex-col gap-2">
              <h1 className="text-white font-bold text-xl">
                {articleData[0]?.ArticleTitle}
              </h1>
              <div className="flex gap-5 items-center">
                <p className="text-[0.6rem] text-white">
                  {formatIndonesianTimeAuto(
                    articleData[0]?.ArticleDateRelease,
                    "date"
                  )}
                </p>
                <span className="flex gap-2 items-center">
                  <p className="text-white">•</p>
                  <p className="text-white text-[0.6rem]">
                    Penulis: {articleData[0]?.WriterArticle}{" "}
                  </p>
                </span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2rem] z-10 relative bottom-7 h-[10rem] p-5">
            <p
              dangerouslySetInnerHTML={{
                __html: articleData[0]?.ArticleData.replace(/\\n\d?/g, "<br />") // Mengubah \n menjadi <br />
                  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"), // Mengubah **text** menjadi <b>text</b>
              }}
              className="text-sm mt-1 pb-8"
            >
              {}
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
