import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import helperSession from "@/helper/SessionHelper";

export default function Community() {

  const [name, setFullname] = useState('')
  const [community, setAllCommunity] = useState([])

  // get all community data 
  const getAllCommunity = () => {
    axios.get(`http://localhost:8080/community/get-all-community`)
    .then((res)=>{
      console.log(res.data.data)
      setAllCommunity(res.data.data)
    })
  }

  // get current login data 
  const getCurrent = (sessid) => {
    if(sessid){
      axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem('userid')}`)
      .then((res)=>{
        setFullname(res.data.data[0].Userfullname)
      })
    }
  }

  useEffect(()=>{

    const sessid = helperSession()

    getCurrent(sessid)
    getAllCommunity()
  }, [])

  return (
    <main className="min-h-screen">
      <section
        style={{ backgroundImage: `url(${"/community-bg.png"})` }}
        className="px-10 flex flex-col gap-24 lg:gap-36 h-[50vw] bg-no-repeat bg-contain"
      >
        <Navbar 
          log={name}
          taildwindStyle="text-white"
        />
        <div className="flex flex-col gap-5 max-w-[70vw]">
          <h1 className="font-bold text-[3vw] text-white">
            Empowering a Community of Mountain Enthusiasts to Reach New Heights
          </h1>
          <p className="text-white text-[1.5vw]">
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
            dolor sit amet
          </p>
          <span>
            <Link href={'/create-community'}>
              <button className="bg-primary text-white p-2 px-8 text-[2vw] rounded-xl">
                Create Community
              </button>
            </Link>
          </span>
        </div>
      </section>

      <section className="relative top-[-10vw] flex justify-center items-center gap-[5vw]">
        <div className="w-[37.362vw] h-[11.806vw] rounded-[2vw] bg-white shadow-xl"></div>
        <div className="w-[37.362vw] h-[11.806vw] rounded-[2vw] bg-white shadow-xl"></div>
      </section>

      <section className="mb-[5vw]">
        <div className="flex justify-center gap-[14vw] items-center">
          <p className="font-bold text-[2vw] w-[35vw]">
            Explore Your Desination, Discover Your Mountain Community!
          </p>
          <div className="flex">
            <FaSearch className="relative md:left-[2.4vw] lg:left-[1.7vw] md:top-[0.5vw] lg:top-[0.9vw]" />
            <input
              type="input"
              placeholder="Search"
              className="border-2 border-solid border-gray-500 rounded-lg w-[40vw] p-[0.5vw] pl-[2.2vw] h-[3vw]"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-[8vw] mt-[5vw] mx-[5vw]">
          {
            community.map((data, idx)=>(
              <Card
              key={idx}
              id={data.Communityid}
              image={"/community-post1.png"}
              title={data.CommunityName}
              buttonText={'15 post'}
              />
            ))
          }
        </div>
      </section>
      <div className="mt-[10px] mb-[40px] flex justify-center items-center">
        <button className="bg-[#F09024] w-72 h-9 font-bold text-white rounded-[15px] hover:pointer hover:text-lg">
          View More
        </button>
      </div>
      <Footer />
    </main>
  );
}
