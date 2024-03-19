import Footer from "@/components/Footer";
import React from "react";

export default function CreateCommunity() {
  return (
    <main>
      <section className="flex justify-center my-[4vw]">
        <div className="bg-white p-[5vw] max-w-[80%] h-[40vw] shadow-2xl rounded-[2vw] flex flex-col gap-[2vw]">
          <div className="flex flex-col gap-y-[1vw]">
            <textarea
              className="w-[65vw] border-gray-200 border-2 bg-[#f7f7f7] rounded-[1vw] p-[2vw]"
              rows={1}
              placeholder="Write title here..."
            />
            <textarea
              type="text"
              placeholder="Write something inspiring..."
              className="w-[65vw] border-gray-200 border-2 bg-[#f7f7f7] rounded-[1vw] p-[2vw]"
              rows={7}
            />
          </div>
          <div className="flex justify-between">
            <input type="file" />
            <button className="bg-[#f09024] w-[10vw] p-[1vw] rounded-[2vw] text-white font-bold hover:bg-[#f08024]">
              Publish
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
