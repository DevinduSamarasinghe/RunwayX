import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {Navbar,Footer,ThemeSettings} from "../../components/Tailwind/components";
import ClientSidebar from "../../components/Tailwind/components/ClientSidebar";
import jwtDecode from "jwt-decode";

import ClientPayTab from "../../components/ClientPaymentTable/ClientPmtTable";
import ClientOrderTable from "../../components/ClientOrderTable/ClientOrderTable";
import ThemeButton from "../../components/Common/ThemeSettings";
import ClientProfile from "./Assets/ProfileInfo/ProfileInfo";

import useOrders from "../../hooks/orders/useOrders";
import usePayments from "../../hooks/payments/usePayments";
import useUserInfo from "../../hooks/userinfo/useUserInfo";

const ClientDash = () => {
  
  //custom hooks 
  const {currentMode,activeMenu,themeSettings} = useStateContext();
  const navigate = useNavigate();
  const {getOrdersByEmail} = useOrders();
  const {getPaymentsByEmail} = usePayments();
  const {getUserInfoByUserId} = useUserInfo();

  //local storage constants 
  const token = localStorage.getItem("token");
  const clientMail = localStorage.getItem("email");
  const userId = localStorage.getItem('userId');

  //local states
  const [order, setOrder] = useState([]);
  const [payment, setPayment] = useState([]);
  const [user,setUser] = useState({});

  //useEffects 
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "seller" || decodedToken.role === "admin") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchOrdersAndPayments = async()=>{
      const userInfo = await getUserInfoByUserId(userId);
      const orders = await getOrdersByEmail(clientMail);
      const payments = await getPaymentsByEmail(clientMail);
      setOrder(orders);
      setPayment(payments);
      setUser(userInfo);
    }
    fetchOrdersAndPayments();
  }, []);

  console.log("User Info: ",user);

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
                <div className="flex flex-wrap lg:flex-nowrap justify-center ml-5 mt-5">
                  <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
                  <ClientProfile user={user}/>
                    <div className="w-100">
                      <ClientOrderTable order={order} />
                    </div>
                    <div className="w-100">
                      <ClientPayTab payment={payment} />
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

export default ClientDash;
