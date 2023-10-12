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
  AdminSidebar,
  ThemeSettings,
} from "../../components/Tailwind/components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import SellerSidebar from "../../components/Tailwind/components/SellerSidebar.jsx";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const SellerPayments = () => {
  //Contexts for themeSettings.
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const toDateRange = () => {
    navigate("/MaintainenceDateRange", {
      state: { DS: dateStart, DE: dateEnd },
    });
  };
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  //retrieving the order
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    await axios
      .get(`http://localhost:8070/orders/`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  //formatter
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  });

  //creating an algorithm for the the items within orders to be fetched
  console.log("Orders: ", orders);

  const orderItems = [];

  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].items.length; j++) {
      orderItems.push(orders[i].items[j]);
    }
  }
  console.log("OrderItems: ", orderItems);

  let dateRangeRef = (dateRange) => {
    dateRangeRef = dateRange; // dateRangeRef is a reference to the DateRangePickerComponent
  };

  const filterDate = () => {
    if (dateRangeRef.value && dateRangeRef.value.length > 0) {
      const start = dateRangeRef.value[0];
      const end = dateRangeRef.value[1];

      setDateStart(start);
      setDateEnd(end);
      navigate("/MaintainenceDateRange", { state: { DS: start, DE: end } });
    } else {
      alert("Please select a date range");
      setDateStart("");
      setDateEnd("");
    }
  };

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

      <div className={currentMode === "Dark" ? "dark" : ""}>
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
                {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                {/* PART AFTER THE RETURN STATEMENT */}
                <div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                    <Header title="Payment Invoice Details" />
                    <div className=" flex items-center mb-5 ">
                      <div>
                        <input
                          type="text"
                          className=" block w-400 rounded-md bg-gray-100 focus:bg-white dark:text-black"
                          placeholder="Search Here"
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mr-0 ml-auto">
                        <Link to={"/ProvisionReport"}>
                          {" "}
                          {/* change this link your preview page */}
                          <button
                            type="button"
                            className="py-1 px-4 rounded-lg text-white hover:bg-slate-700 bg-slate-500"
                          >
                            Generate Report
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className=" flex items-center mb-5 "></div>
                    <div className="block w-full overflow-x-auto rounded-lg">
                      <table className="w-full rounded-lg">
                        <thead>
                          <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Payment ID" />
                            <TableHeader value="Client" />
                            <TableHeader value="Gross Total" />
                            <TableHeader value="Commission" />
                            <TableHeader value="Invoice Date" />
                            <TableHeader value="Status" />
                          </tr>
                        </thead>
                        <tbody>
                          {orders
                            .filter((data) => {
                              if (searchTerm == "") {
                                return data;
                              } else if (
                                data.email.includes(searchTerm) ||
                                data._id
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                data.status
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return data;
                              }
                            })
                            .map((data, key) => {
                              if (
                                data.status === "Confirmed" ||
                                data.status === "Pending" ||
                                data.status === "Dispatched"
                              ) {
                                let dataColor = "text-black dark:text-white";
                                if (data.status === "Pending") {
                                  dataColor =
                                    "text-orange-800 font-bold font-bold dark:text-orange-400";
                                } else if (data.status === "Confirmed") {
                                  dataColor =
                                    "text-blue-800 font-bold font-bold dark:text-blue-400";
                                } else if (data.status === "Dispatched") {
                                  dataColor = "text-green-700 font-bold";
                                } else if (data.status === "Refunded") {
                                  dataColor = "text-red-700 font-bold";
                                }
                                return (
                                  <tr
                                    className="text-sm h-10 border dark:border-slate-600"
                                    key={key}
                                  >
                                    <TableData value={"INV " + data._id} />
                                    <TableData value={data.email} />
                                    <TableData
                                      value={formatter.format(data.total)}
                                    />
                                    <TableData
                                      value={formatter.format(
                                        data.total * 0.15
                                      )}
                                    />
                                    <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                      {data.invoiceDate
                                        ? new Date(
                                            data.invoiceDate
                                          ).toLocaleDateString()
                                        : new Date().toLocaleDateString()}{" "}
                                      {/* Use today's date if invoiceDate is null */}
                                    </td>
                                    <td
                                      className={`${dataColor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}
                                    >
                                      {data.status}
                                    </td>
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

export default SellerPayments;
