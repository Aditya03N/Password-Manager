import React, { useRef, useState,useEffect } from "react";

const Manager = () => {
  const passwordRef = useRef(null);
  const iconRef = useRef(null);
  const [FormData, setFormData] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords=localStorage.getItem("passwords")
    if(passwords){
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])
    
  
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };


  const togglePassword = () => {
    if (passwordRef.current && iconRef.current) {
      if (passwordRef.current.type === "password") {
        alert("Want to show password")
        passwordRef.current.type = "text";
        iconRef.current.src = "/icons/view.png"; // show "hide" icon
      } else {

        passwordRef.current.type = "password";
        iconRef.current.src = "/icons/hide.png"; // show "view" icon
      }
    }
  };

  const handleClick = () => {
  const updated = [...passwordArray, FormData];   // merge old + new
  setpasswordArray(updated);

  // Save to localStorage
  localStorage.setItem("passwords", JSON.stringify(updated));
  // password key me store hoga data

  // Reset form
  setFormData({ url: "", username: "", password: "" });

  console.log(updated);
};


  const fieldClass =
    "rounded-full border border-green-300 w-full p-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition";

  return (
    <div className="container mx-auto flex flex-col gap-0 bg-slate-100 rounded-2xl w-300 my-5 h-100 items-center">
      <p className="my-1.5 text-2xl text-amber-500">Pass Op</p>

      <div className="text-black w-full p-4">
        <input name="url"
          placeholder="Enter Url Here"
          className={fieldClass}
          type="text"
          value={FormData.url}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-3 w-full m-1.5 px-5">
        <input name="username"
          placeholder="Enter UserName"
          type="text"
          className={fieldClass}
          value={FormData.username}
          onChange={handleChange}
        />

        <div className="rounded-full flex items-center justify-between border border-green-300 px-4 w-90 bg-white focus-within:ring-2 focus-within:ring-green-400 transition">
          <input name="password"
            placeholder="Enter Password"
            type="password"
            className="w-full p-2 focus:outline-none bg-transparent"
            value={FormData.password}
            onChange={handleChange}
            ref={passwordRef}
          />
          <img
            ref={iconRef}
            src="/icons/hide.png"
            alt="Toggle password"
            width={20}
            height={20}
            style={{ objectFit: "contain", cursor: "pointer" }}
            onClick={togglePassword}
          />
        </div>
      </div>

      <div className="btn flex items-center gap-2 bg-green-300 rounded-full p-2 px-4 my-5">
        <lord-icon
          src="https://cdn.lordicon.com/lbjtvqiv.json"
          trigger="manual"
          colors="primary:#3080e8,secondary:#b4b4b4"
          style={{ width: "20px", height: "20px" }}
        ></lord-icon>
        <button type="button" className="w-full cursor-pointer" onClick={handleClick}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default Manager;
