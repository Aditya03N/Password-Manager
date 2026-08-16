import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const passwordRef = useRef(null);
  const iconRef = useRef(null);
  const [FormData, setFormData] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);
  
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
 const Copytext = (Text)=>{
  navigator.clipboard.writeText(Text)
  .then(()=>{
    toast.success("Copied to clipboard!");
  })
 }
  const togglePassword = () => {
    if (passwordRef.current && iconRef.current) {
      if (passwordRef.current.type === "password") {
        alert("Want to show password");
        passwordRef.current.type = "text";
        iconRef.current.src = "/icons/view.png"; // show "hide" icon
      } else {
        passwordRef.current.type = "password";
        iconRef.current.src = "/icons/hide.png"; // show "view" icon
      }
    }
  };

  const handleClick = () => {
    const updated = [...passwordArray, { ...FormData, id: uuidv4() }];
     setpasswordArray(updated); // merge old + new
  // Save to localStorage
    localStorage.setItem("passwords", JSON.stringify(updated));
    // password key me store hoga data
    setFormData({ url: "", username: "", password: "" });

    console.log(updated);
    
  };
 const HandleEdit = (id) => {
  const selected = passwordArray.find(item => item.id === id); // find, not filter

  if (selected) {
    setFormData(selected);

    const updatedArray = passwordArray.filter(item => item.id !== id); // !== not !=
    setpasswordArray(updatedArray);

    localStorage.setItem("passwords", JSON.stringify(updatedArray));
  }
};



  const HandleDelete = (id)=>{
    console.log(id)
     const update = passwordArray.filter(item=>item.id!=id);
     setpasswordArray(update); // merge old + new
  // Save to localStorage
    localStorage.setItem("passwords", JSON.stringify(update));
    // password key me store hoga data
    setFormData({ url: "", username: "", password: "" });

  }

  const fieldClass =
    "rounded-full border border-green-300 w-full p-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition";

  return (

    <div className="container mx-auto flex flex-col gap-0 bg-slate-100 rounded-2xl w-full max-w-4xl my-5 min-h-150 h-auto items-center">
        <ToastContainer position="top-right" autoClose={2000} />
      <p className="my-1.5 text-2xl text-amber-500">Pass Op</p>

      <div className="text-black w-full p-4">
        <input
          name="url"
          placeholder="Enter Url Here"
          className={fieldClass}
          type="text"
          value={FormData.url}
          required
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-3 w-full m-1.5 px-5">
        <input
          name="username"
          placeholder="Enter UserName"
          required
          type="text"
          className={`${fieldClass} flex-1`}
          value={FormData.username}
          onChange={handleChange}
        />

        <div className="rounded-full flex items-center justify-between border border-green-300 px-4 flex-1 bg-white focus-within:ring-2 focus-within:ring-green-400 transition">
          <input
            name="password"
            placeholder="Enter Password"
            type="password"
            className="w-full p-2 focus:outline-none bg-transparent"
            value={FormData.password}
            onChange={handleChange}
            required
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

<div className="btn flex items-center gap-0 w-30 bg-green-300 rounded-full h-10 p-1 px-1 my-5 group">
  
  <span className="w-8 h-8 flex items-center justify-center 
               transition-transform duration-300 ease-in-out 
               group-hover:rotate-180 group-hover:scale-110 
               group-active:animate-ping">
    <img className="w-8 h-8 object-contain" src="/icons/plus.png" alt="Add" />
  </span>

 
  <button
    type="button"
    className="w-full cursor-pointer transition-transform duration-300 ease-in-out active:scale-95"
    onClick={handleClick}
  >
    Add User
  </button>
</div>


      <div className="passwords w-full">
        <h2 className="mx-2 py-4 font-bold text-xl">Your PassWords</h2>

        {passwordArray.length === 0 && <div>No Passwords To show</div>}

        {passwordArray.length !== 0 && (
          <div className="w-full max-h-96 overflow-y-auto rounded-2xl">
            <table className="w-full text-sm text-left text-black">
              <thead className="bg-green-800 sticky top-0">
                <tr>
                  <th className="px-6 py-3">URL</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Password</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 flex items-center gap-2 py-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span className="truncate">{item.url}</span> </a>
                        <i className="fa-solid fa-copy cursor-pointer shrink-0"  onClick={() => {
                            Copytext(item.url);
                          }}></i>
                     
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{item.username}</span>
                        <i className="fa-solid fa-copy cursor-pointer shrink-0"   onClick={() => {
                            Copytext(item.username);
                          }}></i>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{item.password}</span>
                        <i
                          className="fa-solid fa-copy cursor-pointer  shrink-0"
                          onClick={() => {
                            Copytext(item.password);
                          }}
                        ></i>
                      </div>
                    </td>
                   <td className="flex gap-2 px-6 py-4">
  <span
    onClick={() => HandleEdit(item.id)}
    className="text-xl text-blue-500 hover:text-green-500 
               transition-transform duration-300 ease-in-out 
               hover:scale-125 hover:rotate-12 cursor-pointer"
  >
    <i className="fa-solid fa-pen-to-square"></i>
  </span>

  <span
    onClick={() => HandleDelete(item.id)}
    className="text-xl text-red-500 hover:text-red-700 
               transition-transform duration-300 ease-in-out 
               hover:scale-125 hover:rotate-12 cursor-pointer"
  >
    <i className="fa-solid fa-trash"></i>
  </span>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
