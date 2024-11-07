import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CreateCommunity() {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected files:", selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreviewImage(URL.createObjectURL(selectedFile)); // Buat URL sementara untuk pratinjau
    } else {
      alert("Please select a valid image file");
      setPreviewImage(null);
    }
    // Lakukan sesuatu dengan file yang dipilih, seperti mengirim ke server
  };
  return (
    <main className="font-poppins flex justify-center">
      <div className="w-full max-w-[440px] p-5">
        <section className="flex justify-between items-center">
          <button className="flex justify-between items-center p-2 rounded-full bg-[#F5F5F5]">
            <Link href="/community">
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <button className="bg-[#F09024] py-1 px-8 text-white rounded-full">
            post
          </button>
        </section>

        {/* Tampilkan pratinjau gambar */}
        {previewImage && (
          <div className="mt-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-[12rem] object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        <section className="mt-8">
          <textarea
            className="w-full border-gray-200 border-2 bg-[#f7f7f7] rounded-[1vw] p-[2vw]"
            placeholder="Tulis thread disini.."
            rows={20}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleButtonClick}
              className="bg-[#F09024] py-5 px-8 text-white rounded-3xl"
            >
              Upload Foto dan Video
            </button>

            {/* Input file yang disembunyikan */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*" // Batasi hanya untuk file gambar
              className="hidden"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

// WEB BASED

// import Footer from "@/components/Footer";
// import axios from "axios";
// import React, { useState } from "react";
// import { imagedb } from "@/config";
// import {ref, uploadBytesResumable} from 'firebase/storage'

// export default function CreateCommunity() {

//   const [img, setImg] = useState('')
//   const [progress, setProgress] = useState(0)
//   const [cname, setCname] = useState('')
//   const [communitydesc, setCommunitydesc] = useState('')

//   // add community data community
//   const AddCommunityData = () => {

//     // random id community
//     let num1 = Math.floor(Math.random()*9 + 1)
//     let num2 = Math.floor(Math.random()*9 + 1)
//     let num3 = Math.floor(Math.random()*9 + 1)
//     let num4 = Math.floor(Math.random()*9 + 1)

//     const comm_id = "COM"+num1.toString()+num2.toString()+num3.toString()+num4.toString()

//     const imgref = ref(imagedb, `images/${comm_id}`)
//     const uploadTask = uploadBytesResumable(imgref, img)

//     uploadTask.on('state_changed', (snapshot)=>{
//       const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//       setProgress(progress)
//     })

//     // add community data
//     axios.post(`http://localhost:8080/community/add-new-community`, {
//       Communityid: comm_id,
//       Communityname: cname,
//       Communitydesc: communitydesc,
//       CommunityDateRelease: new Date().toISOString().split('T')[0]
//     })
//     .then((res)=>{
//       console.log(res.data)
//     })

//     // add new community connect
//     axios.post(`http://localhost:8080/community/add-new-community-connect`, {
//       Userid: sessionStorage.getItem("userid"),
//       Communityid: comm_id
//     })
//     .then((res)=>{
//       console.log(res.data)
//     })
//   }

//   return (
//     <main>
//       <section className="flex justify-center my-[4vw]">
//         <div className="bg-white p-[5vw] max-w-[80%] h-[40vw] shadow-2xl rounded-[2vw] flex flex-col gap-[2vw]">
//           <div className="flex flex-col gap-y-[1vw]">
//             <textarea
//               className="w-[65vw] border-gray-200 border-2 bg-[#f7f7f7] rounded-[1vw] p-[2vw]"
//               value={cname}
//               onChange={(e)=>setCname(e.target.value)}
//               rows={1}
//               placeholder="Write title here..."
//             />
//             <textarea
//               type="text"
//               placeholder="Write something inspiring..."
//               className="w-[65vw] border-gray-200 border-2 bg-[#f7f7f7] rounded-[1vw] p-[2vw]"
//               rows={7}
//               value={communitydesc}
//               onChange={(e)=>setCommunitydesc(e.target.value)}
//             />
//           </div>
//           <div className="flex justify-between">
//             <input onChange={(e)=>setImg(e.target.files[0])} type="file" />
//             <button
//             onClick={()=>{
//               AddCommunityData()
//             }}
//              className="bg-[#f09024] w-[10vw] p-[1vw] rounded-[2vw] text-white font-bold hover:bg-[#f08024]">
//               Publish
//             </button>
//           </div>
//         </div>
//       </section>
//         <div>
//           <p>{progress}%</p>
//         </div>
//       <Footer />
//     </main>
//   );
// }
