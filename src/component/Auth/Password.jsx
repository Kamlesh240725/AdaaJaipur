import React, { useEffect } from "react";
import { useState, useRef ,useContext } from "react";
import { useNavigate,Link,NavLink } from "react-router-dom";
import { PasswordCloseEye, PasswordOpenEye } from "../Auth/Register/PasswordEye";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Password() {
    const location = useLocation(); 
    // const email = location.state?.email ; 
    // const name = location.state?.name
    const {email, name} = location.state || {}
    // console.log("email", email);
    console.log("chut",email, name) ;

    const [credentials, setCredentials] = useState({
        name: name||"",
        email: email || '',
        password: "",
        passwordConfirm: "",
      });
      const [showPassword, setShowPassword] = useState(false);
      const [item, setItem] = useState();
      const [responseData, setResponseData] = useState(null);
      const [error, setError] = useState(null);
      const [isRegistered, setIsRegistered] = useState(false);
      const navigate = useNavigate();
    
      //  focus
      const nameRef = useRef();
      const emailRef = useRef();
      const passwordRef = useRef();


      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

      const nameBlur = () => {
        if (credentials.name.length < 1) {
          document.querySelector(".nameText").classList.remove("hidden");
        }
      };
    
      const passwordBlur = () => {
        if (credentials.password.length < 1) {
          document.querySelector(".passwordText").textContent =
            "Password is required";
          document.querySelector(".passwordText").classList.remove("hidden");
        }
      };

      useEffect(()=>{
            if(credentials.password.length <8){
              document.querySelector(".passwordText").textContent = "Password Must More then 8 character"
              document.querySelector("passwordText").classList.remove("hidden")
            }
      },[credentials.password])

      const passMounted = useRef();
      const passConfirmMounted = useRef();
      const nameMounted = useRef();

      const togglePass = () => {
        setShowPassword((prev) => !prev);
        console.log("show password", showPassword);
      };

        const handleSubmit = async (e,email) => {
            // console.log("credentials", credentials);
            
        e.preventDefault();
        if(!credentials.name || !credentials.password || !credentials.passwordConfirm){
                if(credentials.name.length < 1){
                    document.querySelector(".nameText").textContent = "Name is required";
                    document.querySelector(".nameText").classList.remove("hidden");
                }
                if(credentials.password.length < 1){
                    document.querySelector(".passwordText").textContent = "Password is required";
                    document.querySelector(".passwordText").classList.remove("hidden");
                }
                if(credentials.passwordConfirm.length < 1){
                    document.querySelector(".passwordConfirmText").textContent = "Password Confirm is required";
                    document.querySelector(".passwordConfirmText").classList.remove("hidden");
                }
            }
            else if(credentials.password !== credentials.passwordConfirm){
                document.querySelector(".passwordConfirmText").textContent = "Password and Password Confirm should be same";
                document.querySelector(".passwordConfirmText").classList.remove("hidden");
              }
            else if(credentials.password.length<8){
              document.querySelector(".passwordConfirmText").textContent = "Password Should be 8 or More Character";
              document.querySelector(".passwordConfirmText").classList.remove("hidden");
            }
            else if (credentials.name , credentials.password , credentials.passwordConfirm) {
           
                    console.log(credentials);
                    
                try {
                const response =    await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, {
                        name: credentials.name,
                        email: credentials.email,
                        password: credentials.password
                })
                            console.log("response . ......", response);
                            navigate("/");
                            
                } catch (error) {
                  navigate("/login");
                  
                }
            }

        }

  return (
    <>
      {/* pc design */}
      <div className="bg-white h-screen sm:block hidden w-full border-2 border-solid border-black lg:p-7 p-5 ">
        <div className="relative h-full w-full grid  place-items-center   rounded-2xl  ">
          <img
            src="./images/bgImgJaipur.png"
            alt=""
            className="h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0]"
          />
          <div className="card min-w-[350px] min-h-[60%]  bg-white rounded-xl text-black grid gap-2 items-center p-[52px] font-comfortaa text-lg z-[1]">
          
            <div className="text-3xl col-span-1 row-span-1 font-bold ">
              Set Name And Password{" "}
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label htmlFor="name" className="block  font-medium text-gray-900">
                  Name*
                </label>
             
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="name"
                  name="name"
                  value={credentials.name}
                  ref={nameMounted}
                  onChange={handleOnChange}
                  required
                
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
               
              </div>
              <div className="nameText text-red-600 text-xs my-1 hidden"></div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label htmlFor="password" className="block  font-medium text-gray-900">
                 Create Password*
                </label>
              
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  ref={passMounted}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  onBlur={passwordBlur}
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-white mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label htmlFor="passwordConfirm" className="block  font-medium text-gray-900">
                  Password Confirm*
                </label>
             
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="password"
                  name="passwordConfirm"
                    value={credentials.passwordConfirm}
                  ref={passConfirmMounted}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  onBlur={passwordBlur}
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-white mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordConfirmText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-2xl py-1 hover:scale-[0.95]"
              onClick={handleSubmit}
              >
                Submit &gt;&gt;
              </button>
            </div>
         
          </div>
        </div>
      </div>

      {/* // mobile design  */}
      <div className="sm:hidden flex flex-col justify-between items-center h-screen ">
        <div className="h-[70%] flex justify-center items-center">
          <div className="card w-[350px]  min-w-[286px]  bg-white rounded-xl text-black grid gap-2 items-center p-8 font-comfortaa text-md border-solid border-black ">
          

            <div>
           
                <div className="text-3xl col-span-1 row-span-1 font-bold ">
              Set Name And Password{" "}
            </div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label htmlFor="name" className="block  font-medium text-gray-900">
                  Name*
                </label>
             
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="name"
                  name="name"
                  value={credentials.name}
                  ref={nameMounted}
                  onChange={handleOnChange}
                  required
                
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
               
              </div>
              <div className="nameText text-red-600 text-xs my-1 hidden"></div>
            </div>

           <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label htmlFor="password" className="block  font-medium text-gray-900">
                 Create Password*
                </label>
               
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  onBlur={passwordBlur}
                  ref={passMounted}
                  value={credentials.password}
                  onChange={handleOnChange}
                  // ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-white mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label htmlFor="passwordConfirm" className="block  font-medium text-gray-900">
                  Password Confirm*
                </label>
              
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="password"
                  name="passwordConfirm"
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                //   onBlur={passwordBlur}
                  ref={passConfirmMounted}
                    value={credentials.passwordConfirm}
                    onChange={handleOnChange}
                  // ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-white mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordConfirmText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-xl py-1 focus:scale-[0.95]"
                onClick={handleSubmit}
              >
                Submit &gt;&gt;
              </button>
            </div>
          </div>
        </div>
        <img
          src="./images/bgImgJaipur.png"
          alt=""
          className="h-[30%] w-full object-cover"
        />
      </div>
    </>
  );
}

export default Password;
