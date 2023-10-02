//PageTemplate
import React, {useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import {Navbar,ThemeSettings,Footer} from "../../components/Tailwind/components";
import AdminSidebar from "../../components/Admin/AdminSideBar/AdminSidebar";
import AdminPieChart from "../../components/Admin/AdminPieChart/AdminPieChart";
import ThemeButton from "../../components/Common/ThemeSettings";
import AdminDashButtons from "../../components/Admin/AdminDashButtons/AdminDashButtons";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getOrderCount,calcTotal } from "../../utils/Admin/AdminFunctions";
import { formatter } from "../../utils/common/formatter";
import useOrders from "../../hooks/orders/useOrders";

const AdminDash = () => {

  //Custom Hooks
  const navigate = useNavigate();
  const {currentMode,activeMenu,themeSettings} = useStateContext();
  const {getOrders} = useOrders();

  //Order count states
  const [dispatched, setDispatched] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [pending, setPending] = useState(0);
  const [refunded, setRefunded] = useState(0);
  const [orders, setOrders] = useState([]);
  const [Totals, setTotals] = useState(0);

  //USE-EFFECTS
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "buyer") {
        navigate("/");
      } 
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async()=>{
      try{
        const data = await getOrders();
        setOrders(data);
        calcTotal( orders, setTotals);
        getOrderCount(setDispatched, setConfirmed, setPending, setRefunded, orders);
      }catch(error){
        console.error(error);
      }
    }
    fetchOrders();
  }, []);


  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* ThemeSettings Toggle */}
          <div>
            <ThemeButton />
          </div>
          {activeMenu ? ( // SIDEBAR IMPLEMENTATION
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <AdminSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <AdminSidebar />
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
                <div className="mt-5">
                  <div>
                    <AdminDashButtons
                      pending={pending}
                      confirmed={confirmed}
                      dispatched={dispatched}
                      refunded={refunded}
                      Totals={Totals}
                      formatter={formatter}
                    />
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white ">
                    <AdminPieChart
                      dispatched={dispatched}
                      refunded={refunded}
                      confirmed={confirmed}
                      pending={pending}
                    />
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

export default AdminDash;
