import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Navbar,
  ThemeSettings,
  DashTopBox,
  DashTopButton,
} from "../../components/Tailwind/components";
import SellerSidebar from "../../components/Tailwind/components/SellerSidebar.jsx";
import SalesMonthlyChart from "../../components/Seller/SalesMonthlyChart";
import { useStateContext } from "../../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import jwtDecode from "jwt-decode";
import {
  calcTotal,
  getOrderCount,
  getTotal,
} from "../../utils/Admin/AdminFunctions.js";
import useOrders from "../../hooks/orders/useOrders.js";
import ThemeButton from "../../components/Common/ThemeSettings.jsx";
import {
  FiPackage,
  FiDownload,
  FiFileText,
  FiFilePlus,
  FiCheck,
} from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiLoader4Line } from "react-icons/ri";

const OrderStatistics = () => {
  const { currentMode, activeMenu, themeSettings } = useStateContext();
  const navigate = useNavigate();
  const { getOrders } = useOrders();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [totals, setTotals] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
        calcTotal(orders, setTotal);
        getTotal(orders, setTotals);
        // getOrderCount is missing from this code snippet
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [getOrders]);

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

  // Calculate Average Order Value
  const averageOrderValue = total / orders.length;

  // Function to trigger the print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div>
            <ThemeButton />
          </div>

          {activeMenu ? (
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
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>
            <div>{themeSettings && <ThemeSettings />}</div>
            <div>
              <div className="mt-5">
                <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                  <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                    <Link to="/ProvisionReport">
                      <DashTopButton
                        value="Provision Report"
                        icon={<FiFileText />}
                      />
                    </Link>

                    <button onClick={handlePrint}>
                      <DashTopButton
                        value="Download Report"
                        icon={<FiDownload />}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                  <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                    <DashTopBox
                      icon={<FiPackage />}
                      label="Total number of orders"
                      data={orders.length}
                    />
                    <DashTopBox
                      icon={<AiOutlineClockCircle />}
                      label="Total sales revenue"
                      data={total.toFixed(2)}
                    />
                    <DashTopBox
                      icon={<RiLoader4Line />}
                      label="Average order value"
                      data={averageOrderValue.toFixed(2)}
                    />
                    <DashTopBox
                      icon={<FiCheck />}
                      label="Total products sold"
                      data={9}
                    />
                  </div>
                </div>

                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                  <SalesMonthlyChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add a Print button */}
    </div>
  );
};

export default OrderStatistics;
