import React, { useRef } from "react";
import { useState } from "react";

const Manager = () => {
  const iconRef = useRef(null);
  const [Field1, setField1] = useState("");
  const [Field2, setField2] = useState("");
  const [Field3, setField3] = useState("");

  const handleForm = (e) => {};
  const handleClick = () => {
    // if (iconRef.current) {
    //   // lord-icon exposes play() on the DOM element
    //   iconRef.current.play();
    // }
    console.log("url field", Field1);
    console.log("url field", Field2);
    console.log("url field", Field3);
  };

  return (
    <div className="container mx-auto flex flex-col gap-0 bg-slate-100 rounded-2xl w-300 my-5 h-100 items-center">
      <p className="my-1.5 text-2xl text-amber-500">Pass Op</p>

      <div className="text-black w-full p-4">
        <input
          placeholder="Enter Url Here"
          className="rounded-full border border-green-300 w-full p-2 px-2"
          type="text"
          value={Field1}
          onChange={(e) => setField1(e.target.value)}
        />
      </div>

      <div className="flex gap-3 w-full m-1.5 px-5">
        <input
          placeholder="Enter UserName"
          type="text"
          className="rounded-full p-2 border border-green-300 w-full px-2"
          value={Field2}
          onChange={(e) => setField2(e.target.value)}
        />
        <input
          placeholder="Enter Password"
          type="password"
          className="rounded-full w-full px-2 border border-green-300 p-2"
           value={Field3}
          onChange={(e) => setField3(e.target.value)}
        />
      </div>

      {/* Button with Lordicon */}
      <div className="btn flex gap-1 bg-green-300 rounded-full p-2 px-2 my-5">
        <span>
          <lord-icon
            // ref={iconRef}
            src="https://cdn.lordicon.com/lbjtvqiv.json"
            trigger="manual" // manual so we control via JS
            colors="primary:#3080e8,secondary:#b4b4b4"
            style={{ width: "20px", height: "20px" }}
          ></lord-icon>
        </span>
        <span>
          <button className="" type="button" onClick={handleClick}>
            Add User
          </button>
        </span>
      </div>
    </div>
  );
};

export default Manager;
