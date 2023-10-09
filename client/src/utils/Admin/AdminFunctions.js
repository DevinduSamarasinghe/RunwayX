
export const getOrderCount = (setDispatched, setConfirmed, setPending, setRefunded, orders) => {
    let pendingCount = 0;
    let dispatchedCount = 0;
    let confirmedCount = 0;
    let refundedCount = 0;

    orders.map((order) => {
      if (order.status === "Pending") {
        pendingCount++;
      }
      if (order.status === "Dispatched") {
        dispatchedCount++;
      }
      if (order.status === "Confirmed") {
        confirmedCount++;
      }
      if (order.status === "Refunded") {
        refundedCount++;
      }
      setDispatched(dispatchedCount);
      setConfirmed(confirmedCount);
      setPending(pendingCount);
      setRefunded(refundedCount);
    });
  };

export const calcTotal = (orders,setTotals) => {
    let total = 0;
    orders.map((order) => {
      if (
        order.status === "Dispatched" ||
        order.status === "Confirmed" ||
        order.status === "Pending" ||
        order.status === "Refunded"
      ) {
        if (order.status === "Refunded") {
          total -= order.total * 2;
        }
        total += order.total;
        setTotals(total);
      }
    });
  };

  /**
   * 
   * @param {[orders]} orders -> Take all orders fetched from getOrders 
   * @returns value;
   */
  export const getTotal = async (orders,setTotal) => {
    let value = 0;
    for (let i = 0; i < orders.length; i++) {
      if(orders[i].status === "Dispatched" || orders[i].status === "Confirmed" || orders[i].status === "Pending" || orders[i].status === "Refunded"){
        if(orders[i].status === "Refunded"){
          value -= orders[i].total * 2
        }
        value = value + orders[i].total;
      }
    }
    setTotal(value);
  }

