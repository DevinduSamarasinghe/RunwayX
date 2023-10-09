import React from 'react'
import { Link } from 'react-router-dom'
import { DashTopBox } from '../Tailwind/components'
import { GiConfirmed } from "react-icons/gi";
import {MdPendingActions} from "react-icons/md";
import {TbTruckDelivery} from "react-icons/tb";

const SellerButtons = ({pending, confirmed,dispatched, refunded}) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
      {/* small top boxes in the dashboard */}{" "}
      {/* use minimum 3, maximum 5 */}
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
  )
}

export default SellerButtons