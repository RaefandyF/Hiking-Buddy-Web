
export default function Login() {
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
              type="text"
              placeholder="Username"
              className="p-2 border-2 rounded-lg w-[15rem] h-10 md:w-[18rem] lg:w-[22rem] lg:h-12"
            />
            <input
              type="text"
              placeholder="Password"
              className="p-2 border-2 rounded-lg w-[15rem] h-10 md:w-[18rem] lg:w-[22rem] lg:h-12"
            />
            <button className="p-2 border-2 rounded-2xl w-[10rem] h-10 bg-[#f09024] hover:bg-[#df933b] text-white md:w-[15rem] lg:w-[18rem] lg:h-12">
              Masuk
            </button>
            <p className="text-grey">
              Belum memiliki akun?{" "}
              <a 
              className="text-[#f09024] hover:text-[#df933b] cursor-pointer">
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
