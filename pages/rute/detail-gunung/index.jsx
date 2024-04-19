import NavbarComponent from "@/components/Navbar";
import React from "react";
import { FaStar } from "react-icons/fa6";
export default function index() {
  return (
    <main
      style={{ backgroundImage: `url(${"/detail-rinjani.png"})` }}
      className=" bg-cover w-full bg-no-repeat"
    >
      <NavbarComponent />
      <section className="mt-[20rem] pb-[10rem] p-12">
        <div className="p-8 bg-white/50 rounded-full absolute top-[10rem] right-[8rem] flex flex-col items-center gap-1">
          <img src="/berawan.png" className="w-29" />
          <p>Berawan</p>
          <h1 className="text-3xl">20°C</h1>
          <p className="w-32 text-center">19 April 2024</p>
        </div>
        <div className="flex flex-col gap-7">
          <h1 className="text-white text-5xl font-bold">Gunung Rinjani</h1>
          <p className="text-white text-lg">Nusa Tenggara Barat, Indonesia</p>
          <span className="flex text-white text-lg gap-10">
            <span className="flex pt-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <p>4.9 Reviews</p>
          </span>
          <span className="flex gap-28 text-lg">
            <span className="text-white">
              <p className="font-bold">Kesulitan</p>
              <p>Menengah</p>
            </span>
            <span className="text-white">
              <p className="font-bold">Jarak</p>
              <p>5,5 km</p>
            </span>
            <span className="text-white">
              <p className="font-bold">Ketinggian</p>
              <p>1000 m</p>
            </span>
          </span>
          <span className="text-white flex text-lg gap-7">
            <p>Status Gunung</p>
            <span className="bg-yellow-500 py-[0.1rem] px-10 rounded-2xl">
              Level II
            </span>
          </span>
        </div>

        <div className="mt-16">
          <p className="text-white text-justify">
            <span className="text-[#F09024] font-bold">
              Pendakian Gunung Rinjani (puncak)
            </span>
            &nbsp; merupakan salah satu objek wisata yang menjadi andalan di
            kawasan Taman Nasional Gunung Rinjani. Gunung Rinjani sebagai gunung
            vulkanik yang masih aktif nomor 2 tertinggi di Indonesia. Puncak
            Gunung Rinjani merupakan tujuan sebagian besar para petualang dan
            pencinta alam yang mengunjungi kawasan ini karena apabila telah
            berhasil mencapai puncak itu merupakan suatu kebanggaan tersendiri.
            Animo komunitas pencinta alam di seluruh nusantara bahkan dari
            mancanegara dalam kegiatan pendakian cukup besar, ini terbukti
            dengan jumlah pengunjung yang melakukan pendakian setiap tahunnya
            mengalami peningkatan. Kegiatan pendakian secara besar-besaran
            dilakukan pada bulan Juli s/d Agustus, pada bulan Agustus
            (pertengahan) peserta pendakian umumnya didominasi oleh kalangan
            pelajar/mahasiswa dari seluruh Indonesia yang ingin merayakan HUT
            Kemerdekaan Republik Indonesia di Puncak Gunung Rinjani dan Danau
            Segara Anak melalui kegiatan “Tapak Rinjani” yang diadakan secara
            rutin setiap tahunnya oleh salah satu kelompok pencinta alam di
            Pulau Lombok yang bekerjasama dengan Balai Taman Nasional Gunung
            Rinjani.
          </p>
        </div>
      </section>
    </main>
  );
}
