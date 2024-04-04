import { type FC } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { FcBusinessman } from "react-icons/fc";
import { FaMoneyBillWave } from "react-icons/fa";

const HeadBar: FC = () => {
  return (
    <div className="flex h-16 w-full flex-row items-center border-b border-solid border-black">
      <Image
        src={logo}
        alt="Scite Logo"
        width={48}
        height={48}
        className="mb-1"
      />
      <h1 className="text-3xl font-semibold text-black ">SCITE</h1>
      <div className="ml-auto mr-8 flex flex-row items-center">
        <FaMoneyBillWave size={32} className="text-blue-500" />
        <p className="ml-2 w-20 text-xl font-medium">12543</p>
      </div>
      <FcBusinessman size={40} className="mr-4" />
    </div>
  );
};

export default HeadBar;
