import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordRef = useRef(null);
  const iconRef = useRef(null);
  const [FormData, setFormData] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);
 
  const getPassword =async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
    console.log(passwords)  }
  

  useEffect(() => {

    getPassword()
    
  }, []);

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const Copytext = (Text) => {
    navigator.clipboard.writeText(Text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };
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

  const handleClick = async() => {


    if(FormData.password.length>3 && FormData.username.length>3 && FormData.url.length>3){
    
      
       await fetch("http://localhost:3000/", {method:"DELETE", body:JSON.stringify({id: FormData.id}), headers:{"Content-Type":"application/json"}})

    let req = await fetch("http://localhost:3000/", {method:"POST", body:JSON.stringify({...FormData, id: uuidv4()}), headers:{"Content-Type":"application/json"}})
    let res = await req.json();

    // ✅ Backend se jo document aaya usko add karo
    setpasswordArray([...passwordArray, res.result]);
    // password key me store hoga data
    toast.success("Saved Successfuly!");
    setFormData({ url: "", username: "", password: "" });

    console.log("Saved Successfuly!", FormData);
    }
    else{
      toast('error : Password Cant Be Saved')
    }
  };
  const HandleEdit = (id) => {
    
   setFormData({...passwordArray.filter((item) => item.id === id)[0],id:id});
   setpasswordArray(passwordArray.filter((item) => item.id !== id));
      toast.success("Edited Successfully");
    
  };

  const HandleDelete = async(id) => {
    console.log(id);
     const updatedArray = passwordArray.filter((item) => item.id !== id); // !== not !=
      setpasswordArray(updatedArray);
       let req = await fetch("http://localhost:3000/", {method:"DELETE", body:JSON.stringify({id}), headers:{"Content-Type":"application/json"}})
     
    // password key me store hoga data
    setFormData({ url: "", username: "", password: "" });
    toast.success("Deleted user Successfully");
  };

  const fieldClass =
    "rounded-full border border-green-300 w-full p-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition";

  return (
    <div className="w-full px-2 flex flex-col mx-auto gap-0 bg-slate-100 rounded-2xl my-5 min-h-screen h-auto items-center md:container md:mx-auto md:max-w-4xl md:flex md:flex-col">
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

      <div className="flex flex-col md:flex md:flex-row gap-3 w-full m-1.5 px-5">
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
        <span
          className="w-8 h-8 flex items-center justify-center 
               transition-transform duration-300 ease-in-out 
               group-hover:rotate-180 group-hover:scale-110 
               group-active:animate-ping"
        >
          <img
            className="w-8 h-8 object-contain"
            src="/icons/plus.png"
            alt="Add"
          />
        </span>

        <button
          type="button"
          className="w-full cursor-pointer transition-transform duration-300 ease-in-out active:scale-95"
          onClick={handleClick}
        >
          Add User
        </button>
      </div>

      <div className="passwords w-full overflow-x-auto">
        <h2 className="mx-2 py-4 font-bold text-xl">Your PassWords</h2>

        {passwordArray.length === 0 && <div>No Passwords To show</div>}

        {passwordArray.length !== 0 && (
          <div className="w-full max-h-96 overflow-y-auto rounded-2xl">
            <table className="w-full text-xs sm:text-sm text-left text-black">
              <thead className="bg-green-800 sticky top-0">
                <tr>
                  <th className="px-2 sm:px-6 py-2">URL</th>
                  <th className="px-2 sm:px-6 py-2">Username</th>
                  <th className="px-2 sm:px-6 py-2">Password</th>
                  <th className="px-2 sm:px-6 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 sm:px-6 flex items-center gap-2 py-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span className="truncate">{item.url}</span>{" "}
                      </a>
                      <i
                        className="fa-solid fa-copy cursor-pointer shrink-0"
                        onClick={() => {
                          Copytext(item.url);
                        }}
                      ></i>
                    </td>
                    <td className="px-2 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{item.username}</span>
                        <i
                          className="fa-solid fa-copy cursor-pointer shrink-0"
                          onClick={() => {
                            Copytext(item.username);
                          }}
                        ></i>
                      </div>
                    </td>

                    <td className="px-2 sm:px-6 py-4">
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
