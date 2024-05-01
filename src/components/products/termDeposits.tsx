import { type FC } from "react";
import { IoMdClose } from "react-icons/io";
import { api } from "~/utils/api";

type TermDepositsProps = {
  setRouter: (router: string) => void;
};

const termDepositsOptions = [
  {
    productName: "BAC 3 month deposit",
    duration: 3,
    interestRate: 0.015,
    amount: 10000,
  },
  {
    productName: "BAC 6 month deposit",
    duration: 6,
    interestRate: 0.018,
    amount: 10000,
  },
  {
    productName: "BAC 1 year deposit",
    duration: 12,
    interestRate: 0.02,
    amount: 10000,
  },
  {
    productName: "BAC 2 year deposit",
    duration: 24,
    interestRate: 0.022,
    amount: 10000,
  },
  {
    productName: "BAC 5 year deposit",
    duration: 60,
    interestRate: 0.024,
    amount: 10000,
  },
];

const TermDeposits: FC<TermDepositsProps> = ({ setRouter }) => {
  const { mutate: createTermDeposit } = api.termDeposits.create.useMutation();
  const utils = api.useUtils();

  return (
    <div className="mt-10 flex h-[80vh] w-3/4 flex-col items-center border border-solid border-gray-200">
      <div className="relative flex w-full flex-row justify-center">
        <p className="mt-3 text-2xl">Term Deposits</p>
        <button
          className="absolute right-2 top-2"
          onClick={() => {
            setRouter("home");
          }}
        >
          <IoMdClose className="text-4xl" />
        </button>
      </div>
      <div className="flex h-full w-full flex-row">
        <div className="h-full w-1/2 border-r border-solid border-gray-200">
          {termDepositsOptions.map((option) => (
            <div
              className="mx-3 flex h-16 w-auto flex-row border-b border-solid border-gray-200"
              key={option.productName}
            >
              <div className="flex flex-col justify-center">
                <p>{option.productName}</p>
                <div className="flex flex-row">
                  <p className="mr-2">
                    Interest: {Math.round(option.interestRate * 10000) / 100}%
                  </p>
                  <p>Deposit: {option.amount}&nbsp;$</p>
                </div>
              </div>
              <button className="ml-auto mr-2">Details</button>
              <button className="ml-4 mr-2">Buy</button>
            </div>
          ))}
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
};

export default TermDeposits;
