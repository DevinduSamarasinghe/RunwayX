import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.js";
import {
  Navbar,
  ThemeSettings,
  AdminPieChart,
} from "../../components/Tailwind/components";

import SellerSidebar from "../../components/Tailwind/components/SellerSidebar.jsx";
import jwtDecode from "jwt-decode";
import PaymentChart from "../../components/PaymentChart/PaymentChart.jsx";
import { calcTotal, getOrderCount, getTotal } from "../../utils/Admin/AdminFunctions.js";
import useOrders from "../../hooks/orders/useOrders.js";
import ThemeButton from "../../components/Common/ThemeSettings.jsx";
import SellerButtons from "../../components/Seller/SellerButtons.jsx";
import SellerAmount from "../../components/Seller/SellerAmount.jsx";

const SellerDash = () => {

  const {
    currentMode,
    activeMenu,
    themeSettings,
  } = useStateContext();
  const navigate = useNavigate();
  const {getOrders} = useOrders();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [Totals,setTotals] = useState(0);
  const [dispatched,setDispatched] = useState(0);
  const [confirmed,setConfirmed] = useState(0);
  const [pending,setPending] = useState(0);
  const [refunded,setRefunded] = useState(0);

  useEffect(()=>{
    const fetchOrders = async()=>{
      try{
        const data = await getOrders();
        setOrders(data);
        calcTotal(orders, setTotal);
        getTotal(orders,setTotals);
        getOrderCount(setDispatched, setConfirmed, setPending, setRefunded, orders);
      }catch(error){
        console.error(error)
      }
    }
    fetchOrders();
  },[getOrders]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "buyer" || decodedToken.role === "admin") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div>
            <ThemeButton/>
          </div>

          {activeMenu ? ( // SIDEBAR IMPLEMENTATION
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <SellerSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <SellerSidebar />
            </div>
          )}
          <div
            className={
              // MAIN BACKGROUND IMPLEMENTATION
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
                <div className="mt-5" id="tableContainer">
                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* // ADD Chart */}
                      <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
                        <SellerAmount total={total} Totals={Totals} />
                        <PaymentChart orders={orders} />
                      </div>
                    </div>
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-gray-700 dark:text-white ">
                    <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5"></div>
                    <SellerButtons pending={pending} confirmed={confirmed} dispatched={dispatched} refunded={refunded} />
                    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                      <AdminPieChart
                        dispatched={dispatched}
                        refunded={refunded}
                        confirmed={confirmed}
                        pending={pending}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDash;
