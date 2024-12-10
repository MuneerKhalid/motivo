import React, { useState } from "react";
import Circle from "../images/circle.svg";

interface InputAreaProps {
  handleSubmit: (e: React.FormEvent, input: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ handleSubmit }) => {
  const [input, setInput] = useState<string>("");

  return (
    <div
      id="#input"
      className="flex w-full h-16 px-6 my-12 text-lg leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none dark:bg-slate-800 focus:outline-none focus:shadow-outline"
    >

      <form
        className="flex-1"
        onSubmit={(e) => {
          handleSubmit(e, input);
          setInput("");
        }}
      >
        <input
          className="w-full h-16 border-none input bg-white dark:bg-slate-800 dark:text-gray-300"
          id="username"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What to do ?"
        />
      </form>

      <div>
        <img src={Circle} alt="LogoCentang" className="mt-5 mr-3" />
      </div>
    </div>
  );
};

export default InputArea;
