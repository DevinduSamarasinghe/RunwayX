import React from "react";
import { Link } from "react-router-dom";
import { MdPendingActions } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { DashTopBox } from "../../Tailwind/components";
import { GiMoneyStack } from "react-icons/gi";

const AdminDashButtons = ({ pending, confirmed, dispatched, refunded, Totals,formatter}) => {
  return (
    <div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* small top boxes in the dashboard */}{" "}
          {/* use minimum 3, maximum 5 */}
          <DashTopBox
            icon={<GiMoneyStack />}
            label="Gross Sales Amount"
            data={formatter.format(Totals)}
          />
          <DashTopBox
            icon={<GiMoneyStack />}
            label="Total Commissions Earned"
            data={formatter.format(Totals * 0.15)}
          />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {" "}
          <Link to="/pending">
            <DashTopBox
              icon={<MdPendingActions />}
              label="Orders pending"
              data={pending}
            />
          </Link>
          <Link to="/confirmed">
            <DashTopBox
              icon={<GiConfirmed />}
              label="Orders confirmed"
              data={confirmed}
            />
          </Link>
          <Link to="/dispatched">
            <DashTopBox
              icon={<TbTruckDelivery />}
              label="Orders dispatched"
              data={dispatched}
            />
          </Link>
          <Link to="/refunded">
            <DashTopBox
              icon={<TbTruckDelivery />}
              label="Orders Refunded"
              data={refunded}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashButtons;
