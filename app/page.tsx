'use client';

import DropDown from "@/components/DropDown";

export default function Home() {
  return (
    <div className="mainContainer flex justify-center items-center p-7 h-[100%] w-full">
      <div className=" bg-white h-full w-full rounded-sm">
        <DropDown />
      </div>
    </div>
  );
}
