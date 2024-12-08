import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center text-white gap-4 h-[43vh]">
      <div className="font-bold text-2xl md:text-4xl flex justify-center items-center gap-2">Buy Me A Protein
        <span><img src="/whey.png" alt="" width={35} className="invert"/></span>
      </div>
      <p className="text-xs md:text-md">A crowdfunding project for GymRats. Get funded by your fans !</p>
      <div>
      <Link href={"/login"}>
      <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
      </Link>
      <Link href={"/about"}>
      <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2.5 text-center me-2 mb-2">Read More</button>
      </Link>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="text-white container mx-auto p-8 px-10">
      <h2 className=" text-xl md:text-2xl text-center font-bold mb-8">Your Fans can buy you a Protein</h2>
      <div className="flex px-30 md:px-20 pb-20 justify-around">
        <div className="item flex flex-col justify-center items-center">
          <img src="/man1.webp" alt=""  width={80} className=" bg-slate-400 rounded-full p-1"/>
          <p className="font-bold text-center text-sm md:text-base mb-2">Fans want to help</p>
          <p className="text-center text-xs md:text-base">Your fans are available for you to help you</p>
        </div>
        <div className="item flex flex-col justify-center items-center">
          <img src="coin.webp" alt=""  width={100} className=" bg-slate-400 rounded-full p-1 mb-1"/>
          <p className="font-bold text-center text-sm md:text-base mb-2">Fans want to help</p>
          <p className="text-center text-xs md:text-base">Your fans are available for you to help you</p>
        </div>
        <div className="item  flex flex-col justify-center items-center">
          <img src="/community-poster_1202527-887.webp" alt="" width={80} className=" bg-slate-400 rounded-full p-1"/>
          <p className="font-bold text-center text-sm md:text-base mb-2">Fans want to help</p>
          <p className="text-center text-xs md:text-base">Your fans are available for you to help you</p>
        </div>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="text-white container mx-auto p-8 flex flex-col justify-center items-center">
      <h2 className=" text-xl md:text-2xl text-center font-bold mb-8">Learn More about Us</h2>
      <iframe  src="https://www.youtube.com/embed/voF1plqqZJA?si=SdfNr-NKEdGKRreD" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    </>
  );
}
