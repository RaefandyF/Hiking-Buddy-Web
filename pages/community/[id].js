import NavbarComponent from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { imagedb } from "@/config";
import { useRouter } from "next/router";
import axios from "axios";
import { MdPersonAdd } from "react-icons/md";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";

function CommunityDetail(props) {
  const router = useRouter();

  const [imgUrl, setImageUrl] = useState("");
  const [dataComm, setDataComm] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");
  const [tabLeftClick, setTabLeftClick] = useState(true);
  const [tabRightClick, setTabRightClick] = useState(false);

  const [replies, setReplies] = useState([])

  const [comments, setComments] = useState([]);

  const [cmeId, setCmeId] = useState("");

  // get iamge from firebase
  const getImageFirebase = () => {
    const imgref = ref(imagedb, `images/${router.query.id}`);
    getDownloadURL(imgref).then((url) => {
      if (url) {
        setImageUrl(url);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  // get community detail data
  const getDetailCommunityData = () => {
    axios
      .get(
        `http://localhost:8080/community/get-detail-community?id=${router.query.id}`
      )
      .then((res) => {
        if (res.data.data) {
          setDataComm(res.data.data);
          setCommunityName(res.data.data[0].CommunityName);
          setCommunityDesc(res.data.data[0].Communitydesc);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
  };

  // get comment data
  const getCommentData = async () => {
    axios
      .get(
        `http://localhost:8080/community/get-comment-community?communityid=${router.query.id}`
      )
      .then((res) => {
        console.log(res.data.data);
        setComments(res.data.data);
      });
  };

  // get reply comment base comment 
  const getReplyComment = async (commentid) => {
    console.log(cmeId)
    axios.get(`http://localhost:8080/community/get-reply-comment?commentid=${commentid}&communityid=${router.query.id}`)
    .then((res)=>{
        console.log(res.data.data)
        setReplies(res.data.data)
    })
  }

  useEffect(() => {
    getImageFirebase();
    getDetailCommunityData();
    getCommentData();
    getReplyComment()
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative w-full">
        <img className="w-full" src="/detail-community.png" />
        <div className="absolute top-0 w-full">
          <NavbarComponent />
        </div>
      </div>

      <div className="relative h-72 w-full shadow-[0_0_10px_0_rgba(0,0,0,0.3)]">
        <div className="w-full flex items-center justify-center">
          {loading ? (
            <div>
              <p className="text-2xl">Loading...</p>
            </div>
          ) : (
            <div className="flex w-full justify-between mx-5 my-[80px]">
              <div className="flex">
                <div className="flex">
                  <div className="w-32">
                    <img src={imgUrl} />
                  </div>
                  <div className="mx-5">
                    <div className="font-bold text-[35px]">
                      <p>{communityName}</p>
                    </div>
                    <div className="text-[20px]">
                      <p>{communityDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-20 flex items-center">
                <button className="flex bg-[#F09024] w-full rounded-xl p-2 text-white">
                  <div className="h-full flex items-center justify-center">
                    <MdPersonAdd className="mt-1 mr-1" />
                  </div>
                  <p className="ml-1">Join</p>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute flex bottom-0 mx-[50px]">
          <div
            onClick={() => {
              setTabLeftClick(true);
              setTabRightClick(false);
            }}
            className={`mx-5 cursor-pointer ${
              tabLeftClick ? "border-b-4 border-[#F09024]" : ``
            }`}
          >
            <p>Latest post</p>
          </div>
          <div
            onClick={() => {
              setTabLeftClick(false);
              setTabRightClick(true);
            }}
            className={`mx-5 cursor-pointer ${
              tabRightClick ? "border-b-4 border-[#F09024]" : ``
            }`}
          >
            <p>Photo and Video</p>
          </div>
        </div>
      </div>

      {/* latest post */}
      <div className="w-full h-[700px] overflow-y-scroll scroll-smoth">
        {comments.map((cmt, idx) => (
          <div
            key={idx}
            className="min-h-[450px] px-5 py-3 border-b border-gray-300"
          >
            <div className="w-full flex">
              <div className="flex mr-1">
                <img src="/berawan.png" className="rounded w-[80px]" />
              </div>
              <div className="ml-1">
                <div>
                  <p>{cmt.Userfullname}</p>
                </div>
                <div>
                  <p>{cmt.CommentDate.split("T")[0]}</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="bg-black w-[2px] h-[200px] my-2 mx-[30px]"></div>
              <div className="mt-5 mx-5">
                <p>{cmt.Commentfill}</p>
                <div>
                  <img
                    src="/post-community.png"
                    width={100}
                    height={80}
                    className="my-5 rounded w-[500px] h-[200px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex h-full mx-[70px]">
              <div className="flex w-[200px]">
                <FcLikePlaceholder
                  size={30}
                  color="bg-white"
                  className="bg-white mr-1"
                />
                <div className="flex items-center ml-1">
                  <p>2000</p>
                </div>
              </div>
              <div
                onClick={() => {
                  cmeId ? setCmeId("") : setCmeId(cmt.Commentid);
                  getReplyComment(cmt.Commentid)
                }}
                className="flex"
              >
                <AiOutlineComment size={30} className="mr-1" />
                <div className="flex items-center ml-1">
                  <p>30</p>
                </div>
              </div>
            </div>
            {cmeId == cmt.Commentid ? (
              <div className="h-[300px]">
                <div className="w-full border shadow-lg rounded p-3">
                  <div>
                    <p>New comment</p>
                  </div>
                  <div className="">
                    <input
                      className="border rounded w-3/4 p-1"
                      type="text"
                      placeholder="new comments..."
                    />
                  </div>
                </div>
                <div className="scroll-auto h-full overflow-y-scroll">
                    {replies.map((re, idx)=>(
                        <div className="h-[90px] rounded border px-[20px] py-[10px]" key={idx}>
                            <div>
                                <p>{re.Userfullname}</p>
                            </div>
                            <div>
                                <p>{re.ReplyCommentfill}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}

        {/* <div className="h-[450px] px-5 py-3 border-b border-gray-300">
          <div className="w-full flex">
            <div className="flex mr-1">
              <img src="/berawan.png" className="rounded w-[80px]" />
            </div>
            <div className="ml-1">
              <div>
                <p>An Wijaya</p>
              </div>
              <div>
                <p>17 april 2022</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="bg-black w-[2px] h-[20  0px] my-2 mx-[30px]"></div>
            <div className="mt-5 mx-5">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
              <div>
                <img
                  src="/post-community.png"
                  width={100}
                  height={80}
                  className="my-5 rounded w-[500px] h-[200px]"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CommunityDetail;
