import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import helperSession from "@/helper/SessionHelper";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function index() {
  const [articles, setArticles] = useState([]);
  const [currLogin, setCurrLogin] = useState('')
  const router = useRouter()

  // get cuurent login 
  // get current user login data
  const getCurrentUserLogin = (sessid) => {
    if(sessid){
      axios.get(`http://localhost:8080/customer/get-current-login?userid=${sessionStorage.getItem("userid")}`)
      .then((res)=>{
        setCurrLogin(res.data.data[0]["Userfullname"])
      })
    }
  }

  // get top article limit 3
  const getTopArticle = () => {
    axios.get(`http://localhost:8080/article/get-top-article`).then((res) => {
      console.log(res.data.article);
      setArticles(res.data.article);
    });
  };

  useEffect(() => {

    let sessid = helperSession()

    getTopArticle();
    getCurrentUserLogin(sessid)
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <img src="/route_image.png" className="w-full" />
        <div className="absolute top-0 w-full">
          <NavbarComponent log={currLogin} />
          <div className="w-1/2 my-[30px] ml-[30px] text-[40px] text-white font-bold">
            <h1>Welcome to Our Article Page !</h1>
          </div>
          <div className="ml-[30px] text-white text-[25px]">
            <p>There are list article</p>
          </div>
        </div>
      </div>
      <div className="min-h-48">
        <div className="py-5 text-[25px] text-center font-bold">
          <h3>List Article</h3>
        </div>
        <div className="w-full min-h-[500px] flex flex-wrap ">
            <div className="min-h-1">
                {/* box */}
                {
                    articles.map((ar, idx)=>(
                    <div key={idx} className="w-[400px] h-[200px] relative mx-5">
                        <Image
                        className="min-h-[200px] w-full max-[1200px]:h-[350px]"
                        width={200}
                        height={200}
                        src={"/community1.png"}
                        />
                        <div className="flex absolute top-3 w-[390px] mx-2 justify-between max-[980px]:w-[250px] max-[1200px]:w-[250px]">
                        <div className="flex">
                            <div className="mx-2 text-white">
                            <p>{ar.Userfullname}</p>
                            </div>
                            <div className="mx-2 text-[#F09024]">
                            <p>{`5 min ago`}</p>
                            </div>
                        </div>
                        <div className="flex mx-2">
                            <Image
                            className="mx-2"
                            width={25}
                            height={20}
                            src={"/lovered.png"}
                            />
                            <div className="text-white">
                            <p>{`${23}`}</p>
                            </div>
                        </div>
                        </div>
                        <div className="w-full my-4 text-white top-[30px] absolute">
                        <div className="mx-2 font-bold">
                            <p>
                            {ar.Articletitle}
                            </p>
                        </div>
                        <div className="mx-2 my-4">
                            <p>
                            {ar.Articlebrief}
                            </p>
                        </div>
                        </div>
                        <div className="w-full mx-2 absolute bottom-[-100px] text-white">
                        <button
                        onClick={()=>{
                            router.push(`article/${ar.Articleid}`)
                        }}
                         className="flex w-[150px] bg-[#F09024] rounded-[30px] py-[5px]">
                            <p className="w-3/4">Read more</p>
                            <div className="flex items-center justify-center">
                            <Image
                                className="my-1"
                                width={20}
                                height={20}
                                src={"/rightIcon.png"}
                            />
                            </div>
                        </button>
                        </div>
                    </div>

                    ))
                }

            </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default index;
