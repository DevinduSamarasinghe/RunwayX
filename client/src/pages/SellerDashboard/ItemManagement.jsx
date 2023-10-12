import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider.js";
import {
  DashTopBox,
  DashTopButton,
} from "../../components/Tailwind/components";
import { FiSettings } from "react-icons/fi";
import {
  Header,
  Navbar,
  Footer,
  ThemeSettings,
  AdminPieChart,
} from "../../components/Tailwind/components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import SellerSidebar from "../../components/Tailwind/components/SellerSidebar.jsx";
import { storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddItemModal from "../../components/AddItemModal/AddItemModal.jsx";
import UpdateItemModal from "../../components/UpdateItemModal/UpdateItemModal.jsx";
import { async } from "@firebase/util";
import jwtDecode from "jwt-decode";

const ItemManagement = () => {
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [uploadedPostImages, setUploadedPostImages] = useState([]);
  const filepickerRef = useRef(null);
  const [category, setCategory] = useState("");
  const [state, setState] = useState(false);
  const [cartDelete, setCartDelete] = useState({});
  const [page, setPage] = useState(1); // Initial page number
  const limit = 10; // Items per page
  const [itemID, setItemID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(""); // 'article_id' or 'name'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  const navigate = useNavigate();

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const uploadPostImage = async (e) => {
    const fileList = e.target.files;
    const array = [];

    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      reader.onload = () => {
        array.push(reader.result);

        if (array.length === fileList.length) {
          setPostImage(array);
        }
      };
    }
    const imagesArray = Array.from(fileList);
    setUploadedPostImages(imagesArray);
  };

  const uploadFiles = async () => {
    const uploadPromises = uploadedPostImages.map(async (image) => {
      const storageRef = ref(storage, `${category}/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(ref(storageRef));
        return url;
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const urls = await Promise.all(uploadPromises);
    setImages(urls);
    return urls;
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    const sellerId = localStorage.getItem("sellerId");
    const sellerEmail = localStorage.getItem("email");

    await uploadFiles().then((res) => {
      const item = {
        name,
        description,
        price,
        image: res,
        sellerId,
        sellerEmail,
        category,
      };

      console.log(item);
      axios
        .post("http://localhost:8070/items", item)
        .then(() => {
          setPostImage([]);
          setImages([]);
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleDeleteItem = async (id) => {
    const orders = await axios.get(
      `http://localhost:8070/orders/status/cart/cart/cart`
    );

    orders.data.map(async (order) => {
      const orderID = order._id;
      const cartitems = order.items;

      cartitems.map(async (item) => {
        if (item.itemID === id) {
          console.log(orderID);
          console.log(item);
          await axios
            .post(`http://localhost:8070/orders/${orderID}/removeItem`, {
              itemID: item.itemID,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            })
            .then(() => {
              console.log("Item deleted from cart");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });

    await axios
      .delete(`http://localhost:8070/items/${id}`)
      .then(() => {
        console.log("Item deleted");
        setState(!state);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

    const fetchItems = async () => {
      const sellerId = localStorage.getItem("sellerId");
      const res = await axios.get(
        `http://localhost:8081/items?page=${page}&limit=500`
      );
      setItems(res.data);
    };
    fetchItems();
  }, [showModal, showUpdateModal, state, page]);

  return (
    <div>
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
                <div className="mt-5">
                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center"></div>
                  </div>

                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    {/* ADD CODE FROM HERE FOR BODY */}

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-9">
                      {/* Item management heading */}
                      <h1 className="float-left mb-6 text-3xl font-medium leading-tight text-primary">
                        Item Management
                      </h1>

                      {/* Add item button form */}
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded float-right mr-20 mb-6"
                        type="button"
                        onClick={() => setShowModal(true)}
                      >
                        Add new Item
                      </button>
                      <Link to="/itemReport">
                        <div className="mr-0 ml-auto">
                          <button
                            type="button"
                            className="font-bold py-1 px-4 rounded-md mx-3 my-1 text-white  hover:bg-slate-700 bg-slate-500"
                          >
                            Show Report
                          </button>
                        </div>
                      </Link>

                      {/* Add item modal */}
                      <AddItemModal
                        showModal={showModal}
                        handleAddItem={handleAddItem}
                        setName={setName}
                        setDescription={setDescription}
                        setPrice={setPrice}
                        setCategory={setCategory}
                        setPostImage={setPostImage}
                        postImage={postImage}
                        uploadPostImage={uploadPostImage}
                        setShowModal={setShowModal}
                        setImages={setImages}
                        filepickerRef={filepickerRef}
                      />

                      <div className="w-full h-[70px] py-3 flex gap-10">
                        <input
                          type="text"
                          className="w-[300px] h-[40px] bg-white px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                          placeholder="Search by name or article ID"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      {/* table to store item data */}
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              article_id
                            </th>
                            <th scope="col" className="px-6 py-3">
                              name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              category
                            </th>
                            <th scope="col" className="px-6 py-3">
                              garment_group_name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              colour_group_name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items
                            .filter((item) => {
                              const articleIdString = String(item.article_id); // Convert to string
                              // Filter by search term (case-insensitive)
                              return (
                                articleIdString
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                item.name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              );
                            })
                            .sort((a, b) => {
                              // Sort by the selected key and order
                              const aValue =
                                sortKey === "article_id"
                                  ? a.article_id
                                  : a.name;
                              const bValue =
                                sortKey === "article_id"
                                  ? b.article_id
                                  : b.name;
                              if (sortOrder === "asc") {
                                return aValue.localeCompare(bValue);
                              } else {
                                return bValue.localeCompare(aValue);
                              }
                            })
                            .map((item) => (
                              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4">{item.article_id}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">
                                  {item.garment_group_name}
                                </td>
                                <td className="px-6 py-4">
                                  {item.colour_group_name}
                                </td>
                                <td className="px-6 py-4">
                                  ${item.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => {
                                      setItemID(item._id);
                                      setShowUpdateModal(true);
                                    }}
                                  >
                                    Update
                                  </button>
                                  {/* Update item modal */}

                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                      handleDeleteItem(item._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          <UpdateItemModal
                            id={itemID}
                            showModal={showUpdateModal}
                            setShowUpdateModal={setShowUpdateModal}
                            setName={setName}
                            setDescription={setDescription}
                            setPrice={setPrice}
                            setCategory={setCategory}
                            postImage={postImage}
                            uploadPostImage={uploadPostImage}
                            setImages={setImages}
                            filepickerRef={filepickerRef}
                            setPostImage={setPostImage}
                          />
                        </tbody>
                      </table>

                      {/* Pagination */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            setPage(page - 1);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Previous Page
                        </button>

                        <button
                          onClick={(e) => {
                            setPage(page + 1);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Next Page
                        </button>
                        <p className="text-center">
                          Page {page} of {items.length / limit}
                        </p>
                      </div>
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

export default ItemManagement;
