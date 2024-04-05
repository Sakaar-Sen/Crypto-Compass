import React from "react";

function NewsElement(props) {
  return (
    <div
      className="md:w-[48rem] transition duration-100 relative cursor-pointer"
      onClick={props.onClick}
    >
      <div className="text-white backdrop-blur relative z-0 flex items-center justify-start border-slate-400 border-solid border-2 rounded-lg gap-8 m-4 hover:bg-gray-800">
        <div className="pr-2 md:pr-4 text-[0.7rem] md:text-[1rem] text-gray-200 m-4">
          {props.text}
          <p className="text-[0.6rem] absolute right-2 md:right-6 bottom-2 md:bottom-3 opacity-70">
            🕑 {props.time}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsElement;
