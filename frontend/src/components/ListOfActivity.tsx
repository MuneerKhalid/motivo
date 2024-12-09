import React from "react";
import Circle from "../images/circle.svg";
import Checked from "../images/circle-cheked.svg";
import Cross from "../images/icon-cross.svg";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

// Define types for props
interface ListOfActivityProps {
  list: { id: string; text: string; status: "onProgress" | "Completed" }[]; // List of activities
  filter: number; // Filter type (0: All, 1: Active, 2: Completed)
  checked: (e: React.MouseEvent<HTMLElement>) => void; // Function for checking/unchecking an item (works for any HTML element)
  removeOne: (e: React.MouseEvent<HTMLElement>) => void; // Function to remove an item (works for any HTML element)
  handleDrag: (result: DropResult) => void; // Drag and drop handler
}

const ListOfActivity: React.FC<ListOfActivityProps> = ({ list, filter, checked, removeOne, handleDrag }) => {
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="Activity">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, idx) => {
              if (
                filter === 0 ||
                (filter === 1 && item.status === "onProgress") ||
                (filter === 2 && item.status === "Completed")
              ) {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`flex w-full h-16 px-6 text-lg leading-tight text-gray-700 align-middle bg-white dark:bg-slate-800 shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300 ${
                          idx === 0 ? "rounded-t-lg" : ""
                        }`}
                      >
                        <button
                          data-index={idx}
                          className="w-6 h-6 my-auto mr-6"
                          onClick={checked}
                        >
                          <img src={item.status === "onProgress" ? Circle : Checked} alt="LogoCentang" />
                        </button>
                        <p
                          data-index={idx}
                          className="flex flex-1 w-full my-auto align-middle border-none cursor-pointer input hover:text-blue-600"
                          onClick={checked}
                        >
                          {item.status === "Completed" ? <s>{item.text}</s> : item.text}
                        </p>
                        <button
                          className="w-6 h-6 my-auto ml-6"
                          data-index={idx}
                          onClick={removeOne}
                        >
                          <img src={Cross} alt="LogoCross" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              }
              return null;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListOfActivity;
