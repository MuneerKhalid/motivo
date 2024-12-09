import React, { useState, useEffect } from "react";

import "./parts.css";
import ThemeButton from "../components/ThemeButton";
import InputArea from "../components/InputArea";
import ListOfActivity from "../components/ListOfActivity";
import Filter from "../components/InformationAndFilter";

import { list as data } from "../components/data";

interface TodoItem {
  text: string;
  status: "onProgress" | "Completed";
  id: string;
}

const options: string[] = ["All", "Active", "Completed"];

const Todo: React.FC = () => {
  const [list, setList] = useState<TodoItem[]>(JSON.parse(localStorage.getItem("activity") || "[]") || data);
  
  const [filter, setFilter] = useState<number>(0);
  
  const [currentId, setCurrent] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent, input: string): void => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    setList((prev) => {
      console.log("prev");
      console.log(prev);
      return [
        ...prev,
        { text: input, status: "onProgress", id: `${currentId + 1}-${input}` },
      ];
    });

    console.log(list);
  };

  useEffect(() => {
    localStorage.setItem("activity", JSON.stringify(list));
    setCurrent(currentId + 1);
  }, [list]);

  const checked = (e: React.MouseEvent<HTMLElement>): void => {
    let idx = e.currentTarget.dataset.index!;
    let newStatus: "onProgress" | "Completed" = list[Number(idx)].status === "onProgress" ? "Completed" : "onProgress";
  
    let newList = [...list];
    newList[Number(idx)].status = newStatus;
  
    setList(newList);
  };
  
  const removeOne = (e: React.MouseEvent<HTMLElement>): void => {
    let idx = e.currentTarget.dataset.index!;
    let newList = [...list];
    newList.splice(Number(idx), 1);
  
    setList(newList);
  };

  const removeCompleted = (): void => {
    let newList = list.filter((item) => item.status === "onProgress");

    setList(newList);
  };

  const handleDrag = (result: any): void => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reordererItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordererItem);

    setList(items);
  };

  return (
    <div className="relative z-10 flex h-auto max-w-xl px-10 mx-auto bg-yellow-3000 md:mx-auto">
      <div className="w-full mt-20 text-left ">
        <div className="flex justify-between align-middle">
          <h1 className="text-4xl font-bold text-white">T O D O</h1>
          <ThemeButton />
        </div>
        <InputArea handleSubmit={handleSubmit} />
        {/* Input */}
        <ListOfActivity
          list={list}
          filter={filter}
          checked={checked}
          removeOne={removeOne}
          handleDrag={handleDrag}
        />
        <Filter
          list={list}
          options={options}
          removeCompleted={removeCompleted}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

export default Todo;
