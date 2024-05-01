import { type FC } from "react";

type ProductsMenuProps = {
  setRouter: (router: string) => void;
};

const ProductsMenu: FC<ProductsMenuProps> = ({ setRouter }) => {
  return (
    <div className="ml-10 mt-10 flex h-[80vh] w-80 flex-col items-center border border-solid border-gray-200">
      <p className="mb-8 mt-4 text-3xl">Manage funds</p>
      <button
        onClick={() => setRouter("termDeposits")}
        className="w-3/4 rounded-lg bg-blue-500 py-2 text-2xl text-white"
      >
        Term Deposits
      </button>
    </div>
  );
};

export default ProductsMenu;
