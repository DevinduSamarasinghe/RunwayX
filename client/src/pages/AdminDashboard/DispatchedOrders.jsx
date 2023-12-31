import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.js";
import TableData from "../../components/Tailwind/components/Table/TableData.jsx";
import TableHeader from "../../components/Tailwind/components/Table/TableHeader.jsx";
import { FiSettings } from "react-icons/fi";
import {
  Header,
  Navbar,
  Footer,
  ThemeSettings,
} from "../../components/Tailwind/components";
import AdminSidebar from "../../components/Admin/AdminSideBar/AdminSidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import axios from "axios";

import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const DispatchedOrders = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  //get orders
  const getOrders = async () => {
    await axios
      .get(`http://localhost:8070/orders`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  //status change
  const orderStatus = async (id, stat) => {
    try {
      let status = null;
      if (stat === "Reject") {
        status = "Refunded";
      } else if (stat === "Approve") {
        status = "Dispatched";
      }
      await axios
        .patch(`http://localhost:8083/orders/updateStatus`, { id, status }) //updateStatus
        .then((res) => {
          console.log(res.data);
          console.log("order Status Updated");
          if (status == "Confirmed") {
            toast.success("Order Payment Approved!");
          } else {
            toast.error("Order Payment Rejected!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //using the formatter
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  });

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

      <div className={currentMode === "Dark" ? "dark" : ""}>
        <ToastContainer />
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            {" "}
            {/* THEME SETTINGS BUTTON */}
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
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
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg  w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                {/* PART AFTER THE RETURN STATEMENT */}
                <div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                    <Header title="Dispatched Orders " />
                    <div>
                      <input
                        type="text"
                        className=" block w-350 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                        placeholder="Search Order"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </div>
                    <div className=" flex items-center mb-5 "></div>
                    <div className="block w-full overflow-x-auto rounded-lg">
                      <table className="w-full rounded-lg">
                        <thead>
                          <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Order ID" />
                            <TableHeader value="Client" />
                            <TableHeader value="Gross Price" />
                            <TableHeader value="Commission" />
                            <TableHeader value="Status" />
                            <TableHeader value="Action" />
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((data) => {
                            if (data.status === "Dispatched") {
                              return (
                                <tr className="text-sm h-10 border dark:border-slate-600">
                                  <TableData value={data._id} />
                                  <TableData
                                    style={{ textColor: "red" }}
                                    value={data.email}
                                  />
                                  <TableData
                                    value={formatter.format(data.total)}
                                  />
                                  <TableData
                                    value={formatter.format(data.total * 0.15)}
                                  />
                                  <TableData value={data.status} />

                                  <Link
                                    to={`/orders/${data._id}`}
                                    className="pl-16"
                                  >
                                    <button
                                      type="button"
                                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full my-2"
                                    >
                                      View Order
                                    </button>
                                  </Link>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                      <br></br>
                      <br></br>
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

export default DispatchedOrders;
