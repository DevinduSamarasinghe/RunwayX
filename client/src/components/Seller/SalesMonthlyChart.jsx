import { React, useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider.js";
import { ChartsHeader } from "../Tailwind/components";
import axios from "axios";
import {
  ChartComponent,
  LineSeries,
  Tooltip,
  DataLabel,
  Category,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";

export default function SalesMonthlyChart() {
  const { currentMode } = useStateContext();

  const [orders, setOrders] = useState([]);

  const tooltip = { enable: true, shared: false };

  const primaryYAxis = {
    labelFormat: "{value}",
    title: "Gross total (LKR)",
    labelStyle: { color: currentMode === "Dark" ? "#e9ecef" : "#343a40" },
    titleStyle: {
      color: currentMode === "Dark" ? "#e9ecef" : "#343a40",
      fontSize: "16px",
    },
    interval: 50000,
  };

  const primaryXAxis = {
    valueType: "Category",
    title: "Month",
    labelStyle: { color: currentMode === "Dark" ? "#e9ecef" : "#343a40" },
    titleStyle: {
      color: currentMode === "Dark" ? "#e9ecef" : "#343a40",
      fontSize: "16px",
    },
  };

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

  var janTotal,
    febTotal,
    marTotal,
    aprTotal,
    mayTotal,
    junTotal,
    julTotal,
    augTotal,
    sepTotal,
    octTotal,
    novTotal,
    decTotal;
  janTotal =
    febTotal =
    marTotal =
    aprTotal =
    mayTotal =
    junTotal =
    julTotal =
    augTotal =
    sepTotal =
    octTotal =
    novTotal =
    decTotal =
      0;

  var OrdersLen = orders.length;

  for (let index = 0; index < OrdersLen; index++) {
    switch (new Date(orders[index].invoiceDate).getMonth()) {
      case 0:
        janTotal = janTotal + orders[index].total;
        break;
      case 1:
        febTotal = febTotal + orders[index].total;
        break;
      case 2:
        marTotal = marTotal + orders[index].total;
        break;
      case 3:
        aprTotal = aprTotal + orders[index].total;
        break;
      case 4:
        mayTotal = mayTotal + orders[index].total;
        break;
      case 5:
        junTotal = junTotal + orders[index].total;
        break;
      case 6:
        julTotal = julTotal + orders[index].total;
        break;
      case 7:
        augTotal = augTotal + orders[index].total;
        break;
      case 8:
        sepTotal = sepTotal + orders[index].total;
        break;
      case 9:
        octTotal = octTotal + orders[index].total;
        break;
      case 10:
        novTotal = parseInt(novTotal) + orders[index].total;
        break;
      case 11:
        decTotal = decTotal + orders[index].total;
        break;
      default:
        break;
    }
  }

  let data = [
    { month: "Jan", orders: 7850 },
    { month: "Feb", orders: 9600 },
    { month: "Mar", orders: 2000 },
    { month: "Apr", orders: 5800 },
    { month: "May", orders: 5660 },
    { month: "Jun", orders: 200 },
    { month: "Jul", orders: 588 },
    { month: "Aug", orders: 4110 },
    { month: "Sep", orders: 58 },
    { month: "Oct", orders: 59 },
    { month: "Nov", orders: novTotal },
    { month: "Dec" },
  ];

  return (
    <>
      <ChartsHeader category="Chart" title="Gross total Analysis" />
      <ChartComponent
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={tooltip}
        background={currentMode === "Dark" ? "#33373E" : "#f3f4f6"}
      >
        <Inject services={[LineSeries, Tooltip, DataLabel, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            type="Line"
            dataSource={data}
            xName="month"
            yName="orders" // Change "Gross total" to "orders"
            name="Monthly Gross total"
            marker={{ dataLable: { visible: true }, visible: true }}
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </>
  );
}
