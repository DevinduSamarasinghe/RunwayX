
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

  export const calcTotal = (total,orders,setTotals) => {
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