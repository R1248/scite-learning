import Image from "next/image";
import character from "../../public/character.png";

const CharacterMenu = () => {
  return (
    <div className="mt-10 flex h-[80vh] w-80 flex-col items-center border border-solid border-gray-200">
      <p className="mb-8 mt-4 text-3xl">Your character</p>
      <Image src={character} alt="Character" width={200} height={240} />
      <button className="mt-8 w-3/4 rounded-lg bg-blue-500 py-2 text-2xl text-white">
        Character settings
      </button>
    </div>
  );
};

export default CharacterMenu;
