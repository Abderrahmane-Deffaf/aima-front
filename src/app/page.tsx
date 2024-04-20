import { FormComp } from "@/components/FormComp";
import Image from "next/image";
import bg from "@/assets/bg2.png";

export default function Home() {
  return (
    <main className="bg-[#12372A relative">
      <div className=" absolute z-10 w-full h-full bg-black opacity-35"></div>
      <Image
        className="absolute object-cover z-0 w-full h-full"
        src={bg}
        alt="bg"
      />
      <div className=" z-20 relative max-w-[400px] mx-auto  h-screen flex justify-center flex-col gap-8 items-center px-2   ">
        <h1 className=" text-[#FBFADA] font-bold text-3xl">
          Plant Expert System
        </h1>
        <FormComp />
      </div>
    </main>
  );
}
