import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import ThemeButton from "../../components/Common/ThemeSettings";
import {Footer,ThemeSettings,Navbar} from "../../components/Tailwind/components";
import ClientSidebar from "../../components/Tailwind/components/ClientSidebar";
import UpdateForm from "./Assets/UpdateForm/UpdateForm";
import useUserInfo from "../../hooks/userinfo/useUserInfo";

const UpdateClient = () => {
    const { currentMode, activeMenu, themeSettings } = useStateContext();
    const { getUserInfoByUserId} = useUserInfo();
    const [user,setUser] = useState();
    
    const userId = localStorage.getItem('userId');
    useEffect(()=>{
      
      const fetchUserInfo = async()=>{
        const data = await getUserInfoByUserId(userId);
        setUser(data);
    }
    fetchUserInfo();
    },[userId])
  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div>
            <ThemeButton />
          </div>
          {/* SIDEBAR IMPLEMENTATION */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <ClientSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <ClientSidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                <div className="flex flex-col items-center justify-center ml-5 mt-5">
                  <div className="md:flex w-3/5 pr-5">
                    <div className="hidden md:block w-full bg-gray-100 rounded-3xl dark:bg-secondary-dark-bg py-10 px-10 shadow-lg">
                      <UpdateForm user={user} userId={userId} />
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;
