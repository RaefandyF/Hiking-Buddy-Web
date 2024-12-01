import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import article1 from "../../public/article1-detail.png";
import { FaRegBookmark } from "react-icons/fa";

export default function DetailArticle() {
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px]">
        <section
          style={{ backgroundImage: `url(${article1.src})` }}
          className="w-full h-[20rem] bg-cover bg-no-repeat bg-center p-5"
        >
          <div className="flex justify-between">
            <button className="flex justify-between items-center p-2 rounded-full bg-[#FFFFFF]/20">
              <Link href="/article">
                <IoIosArrowBack className="text-xl text-white" />
              </Link>
            </button>
            <button className="flex justify-between items-center p-2 rounded-full bg-[#FFFFFF]/20">
              <Link href="/article">
                <FaRegBookmark className="text-lg text-white" />
              </Link>
            </button>
          </div>

          <div className="mt-[8.5rem] flex flex-col gap-2">
            <h1 className="text-white font-bold text-xl">
              Gunung Rinjani, Pesona Keindahan Alam Eksotis di Atap Lombok
            </h1>
            <div className="flex gap-5 items-center">
              <p className="text-[0.6rem] text-white">31 Januari 2024</p>
              <span className="flex gap-2 items-center">
                <p className="text-white">•</p>
                <p className="text-white text-[0.6rem]">21 Hari yang lalu</p>
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2rem] z-10 relative bottom-7 h-[10rem] p-5">
          <div className="flex items-center gap-2">
            <img className="h-8 w-8 rounded-full bg-black"></img>
            <h1 className="font-medium">Indra Himawan</h1>
          </div>
          <p className="text-sm mt-5 pb-8">
            Mengaku pecinta alam dan penikmat gunung? Belum lengkap rasanya jika
            belum merasakan sensasi mendaki di gunung yang terkenal sangat
            cantik akan pesona alamnya ini. Gunung Rinjani terletak di
            utara Pulau Lombok, Nusa Tenggara Barat, dan merupakan gunung berapi
            kedua tertinggi di Indonesia dengan ketinggian 3.726 mdpl. Masuk
            dalam kawasan Taman Nasional Gunung Rinjani dan dikelilingi oleh
            hutan dan semak belukar seluas 76.000 hektar merupakan pemandangan
            yang asri bagi Gunung Rinjani. <br />
            <br />
            Akses menuju Pulau Lombok selain dapat ditempuh melalui jalur darat
            menggunakan bus langsung Jakarta-Mataram dengan menyeberang
            menggunakan kapal ferry dua kali (Selat Bali dan Selat Lombok), juga
            dapat ditempuh dengan menggunakan pesawat terbang. <br />
            <br /> Ada 2 jalur pendakian untuk mencapai Puncak Rinjani, yaitu
            Jalur Sembalun dan Jalur Senaru. Jalur Sembalun merupakan jalur
            favorit para pendaki karena meskipun treknya lebih panjang namun
            bisa menghemat 700 m ketinggian. Di Jalur Sembalun, pendaki akan
            melalui hamparan padang savana yang sangat luas dan cantik. Ada 3
            pos peristirahatan di jalur ini, dan selepas dari pos 3 pendaki akan
            menghadapi tanjakan terjal dengan kemiringan sekitar 60 derajat.{" "}
            <br />
            <br />
            Sedangkan di Jalur Senaru, pendaki akan melewati hutan tropis yang
            cukup lebat dan terjal. Sama halnya dengan Jalur Sembalun, jalur ini
            juga terdapat 3 pos peristirahatan sebelum nantinya sampai ke pos
            pelawangan yang biasa digunakan sebagai area perkemahan. <br />
            <br /> Pesona yang dimiliki oleh Gunung Rinjani nyaris sempurna
            sehingga tidak diragukan lagi jika Rinjani menjadi daya tarik yang
            mampu memikat minat para wisatawan mancanegara maupun nusantara
            untuk mendakinya. Dan mendaki Gunung Rinjani tentunya akan menjadi
            kenangan dan pengalaman hidup yang tidak akan terlupakan.
          </p>
        </section>
      </div>
    </main>
  );
}
