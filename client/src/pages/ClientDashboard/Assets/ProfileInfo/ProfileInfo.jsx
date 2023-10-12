import React, {useState} from "react";
import {Link} from "react-router-dom"
import { useStateContext } from "../../../../contexts/ContextProvider";

const ClientProfile = ({user}) => {

    const {currentColor} = useStateContext();

    console.log("User", user);
  return (
    <div>
      <div className="pb-16 px-10">
        <div className="p-8 bg-white shadow mt-24 dark:bg-gray-700">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl dark:text-gray-400">0</p>{" "}
                <p className="text-gray-400 dark:text-gray-200">Wishlist</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl dark:text-gray-400">0</p>{" "}
                <p className="text-gray-400 dark:text-gray-200 ">Cart Items</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl dark:text-gray-400">1</p>{" "}
                <p className="text-gray-400 dark:text-gray-200">Total Orders</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <Link to="/update-client">
            
              <button className="text-white py-2 px-4 uppercase rounded text-sm hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              style={{background: currentColor}}>
                {" "}
                Update your profile
              </button>{" "}
              </Link>

              <Link to="#">
              <button className="text-white py-2 px-4 uppercase rounded text-sm bg-green-400 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Contact Support
              </button>{" "}

              </Link>
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700 dark:text-gray-200">
              {user?.user?.firstName} {user?.user?.lastName} <span className="font-light text-gray-500 dark:text-gray-400">24</span>
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3 dark:text-gray-400">{user?.address}</p>{" "}
            <p className="mt-8 text-gray-500">{user?.profession}</p>
          </div>{" "}
          <div className="mt-12 flex flex-col justify-center">
            {" "}
            <p className="text-gray-600 text-center font-light lg:px-16 dark:text-gray-400">
                {user?.bio}
              </p>{" "}
            <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              {" "}
              Show more
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;