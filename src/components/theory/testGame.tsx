import { IoMdClose } from "react-icons/io";
import { useState, type FC, useContext } from "react";
import { questions } from "../../data";
import { api } from "~/utils/api";
import { UserDataContext } from "~/dataContexts";

type TestGameProps = {
  setRouter: (router: string) => void;
};

const TestGame: FC<TestGameProps> = ({ setRouter }) => {
  const [question, setQuestion] = useState(questions[0]);
  const [earnedMoney, setEarnedMoney] = useState(0);
  const [decreasedMoney, setDecreasedMoney] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const { mutate: transaction } = api.userData.transaction.useMutation();
  const userData = useContext(UserDataContext);

  const utils = api.useUtils();

  const checkAnswer = (answer: string) => {
    if (answer === question!.answer) {
      setEarnedMoney(earnedMoney + 100);
      setCorrectAnswers(correctAnswers + 1);
    } else if (allMoney > 50) {
      setEarnedMoney(earnedMoney - 50);
    } else {
      setEarnedMoney(decreasedMoney);
    }

    if (question!.id === questions.length) {
      transaction(
        { sum: earnedMoney - decreasedMoney + userData.money },
        {
          onSuccess: () => void utils.userData.getUserData.invalidate(),
        },
      );
      setShowResult(true);
    } else {
      setQuestion(questions[question!.id]);
    }
  };

  const decreaseMoneyWithTime = () => {
    if (earnedMoney - decreasedMoney > 10) {
      setDecreasedMoney(decreasedMoney + 0.5);
    }
  };

  const decreaseTimeout = setTimeout(decreaseMoneyWithTime, 100);
  if (!showResult) {
    decreaseTimeout;
  } else {
    clearTimeout(decreaseTimeout);
  }

  const allMoney = earnedMoney - decreasedMoney;
  const ratio = (allMoney / (100 * questions.length)) * 100;

  return (
    <>
      {!showResult ? (
        <div className="mt-10 flex h-[80vh] w-3/4 flex-col items-center border border-solid border-gray-200">
          <div className="relative flex w-full flex-row justify-center">
            <p className="mt-3 text-2xl">General economy</p>
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                setRouter("home");
              }}
            >
              <IoMdClose className="text-4xl" />
            </button>
          </div>
          <div className="mt-4 h-20 text-lg">
            <p>{question!.question}</p>
          </div>
          <div className="relative w-4/5 rounded-lg border border-solid border-black">
            <p className="width-10 absolute left-[49.5%] top-2 ml-auto mr-auto">
              {Math.round(allMoney)}/{100 * questions.length}$
            </p>
            <div
              style={{ width: `${ratio}%` }}
              className={`h-10 rounded-lg bg-blue-500`}
            ></div>
          </div>
          <div className="mb-5 mt-auto flex w-4/5 flex-row gap-5">
            {question!.options.map((option: string, index: number) => (
              <button
                key={index}
                className="mb-5 w-1/4 rounded-lg border border-solid border-gray-200 p-2"
                onClick={() => {
                  checkAnswer(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-24 flex h-[60vh] w-1/2 flex-col items-center border border-solid border-gray-200">
          <p className="mt-3 text-2xl">General economy</p>
          <p className="mt-10 text-xl">You scored</p>
          <div className="mt-1 text-4xl">
            {correctAnswers}/{questions.length}
          </div>
          <p className="mt-1 text-xl">And earned</p>
          <div className="mt-1 text-4xl">{Math.round(allMoney)}$</div>
          <button
            className="mb-5 mt-auto w-20 rounded-lg bg-blue-500 p-2 text-xl text-white"
            onClick={() => {
              setRouter("home");
            }}
          >
            Home
          </button>
        </div>
      )}
    </>
  );
};

export default TestGame;
