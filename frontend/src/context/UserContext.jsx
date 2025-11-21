import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  async function loginUser(email, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });

      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  const [user, setUser] = useState([])
  const [isAuth, setIsAuth] = useState(false);

  
  async function verifyUser(otp, navigate) {
    const verifyToken = localStorage.getItem("verifyToken")
    setBtnLoading(true);

    if(!verifyToken) return toast.error("Please give token");

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, { otp, verifyToken });

      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    } 
  }

  const [loading, setLoading] = useState(true)

  async function fetchUser(){
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }
    
    try{
      const {data} = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: token,
        },
      })

      setIsAuth(true);
      setUser(data);
    } catch(error){
      // console.log(error);
      setIsAuth(false);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    // setLoading(true)
    console.log("Loading:", loading);

  },[])

  
  return (
    <UserContext.Provider value={{ loginUser, btnLoading, isAuth, setIsAuth, user, verifyUser, loading}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
