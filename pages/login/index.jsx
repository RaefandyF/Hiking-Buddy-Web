import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoginMobile from "../../components/MobileComponent/LoginMobile";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440); // Mengatur breakpoint untuk ukuran mobile (768px)
    };

    handleResize(); // Cek ukuran layar saat pertama kali komponen di-mount
    window.addEventListener("resize", handleResize); // Event listener untuk menangani perubahan ukuran layar

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const router = useRouter();

  const LoginNewUser = async () => {
    axios
      .post(`https://hikingbuddyapp.gleamora.id/customer/login`, {
        Useremail: email,
        Userpassword: password,
      })
      .then((res) => {
        // check user has registered
        if (res.data.data) {
          console.log(res.data.data);
          router.push("/");
          sessionStorage.setItem("userid", res.data.data[0].Userid);
        }

        // check message error
        if (res.data.message) {
          setMessage(res.data.message);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isMobile) {
    return <LoginMobile />; // Jika ukuran layar mobile, render komponen LoginMobile
  }

  return (
    <div className="h-screen flex flex-row justify-between">
      <div>
        <img
          src="/login-elipse.png"
          className="absolute right-0 w-[80%] h-screen z-10"
        />
        <div className="absolute top-[20%] left-[20%] md:left-[60%] lg:left-[60%] z-20">
          <div className="flex flex-col items-center gap-10">
            <h1 className="font-bold text-2xl lg:text-4xl">LOGIN</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="p-2 border-2 rounded-lg w-[15rem] h-10 md:w-[18rem] lg:w-[22rem] lg:h-12"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-2 border-2 rounded-lg w-[15rem] h-10 md:w-[18rem] lg:w-[22rem] lg:h-12"
            />
            <button
              onClick={() => LoginNewUser()}
              className="p-2 border-2 rounded-2xl w-[10rem] h-10 bg-[#f09024] hover:bg-[#df933b] text-white md:w-[15rem] lg:w-[18rem] lg:h-12"
            >
              Masuk
            </button>
            {message ? (
              <div className="text-center bg-red-600 w-full rounded-lg p-3 text-white">
                <p>{message}</p>
              </div>
            ) : (
              <></>
            )}
            <p className="text-grey">
              Belum memiliki akun?{" "}
              <a
                href="/register"
                className="text-[#f09024] hover:text-[#df933b] cursor-pointer"
              >
                {" "}
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src="/login-bg.png" className="absolute left-0 h-screen" />
      </div>
    </div>
  );
}
