import { IoMdClose } from "react-icons/io";
import { useState, type FC } from "react";
import { questions } from "../data";

type TestGameProps = {
  setRouter: (router: string) => void;
};

const TestGame: FC<TestGameProps> = ({ setRouter }) => {
  const [question, setQuestion] = useState(questions[0]);
  const checkAnswer = (answer: string) => {
    if (answer === question!.answer) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
    setQuestion(questions[question!.id]);
  };

  return (
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
      <div>
        <p>{question!.question}</p>
      </div>
      <div></div>
      <div className="">
        {question!.options.map((option: string, index: number) => (
          <button
            key={index}
            className="w-1/4 rounded-full bg-blue-500 p-2 text-white"
            onClick={() => {
              checkAnswer(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestGame;
