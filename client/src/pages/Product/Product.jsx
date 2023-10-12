import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./Product.css";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Reviews from "../../components/Reviews/Reviews";
import jwtDecode from "jwt-decode";
import Recommendation from "../../components/Recommendation/Recommendation";

export default function Product() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [count, setCount] = useState(1);
  const [imagePreview, setImagePreview] = useState(
    item.image && item.image.length > 0 && item.image[0]
  );
  const [disableCart, setDisableCart] = useState();
  const [res, setRes] = useState({});

  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    setCount(count + 1);
  };

  const avgStar = item && item.ratings && item.ratings.averageRating;

  async function AddtoCart() {
    const email = localStorage.getItem("email");
    const status = "cart";
    const itemID = item._id;

    if (disableCart) {
      return;
    } else {
      const Neworder = {
        email: email,
        items: [
          {
            itemID: item._id,
            name: item.name,
            quantity: count,
            price: item.price,
            image: item.image[0],
            sellerID: "65257b8203c39d6590f03b0a",
            sellerEmail: "seller@gmail.com",
          },
        ],
        total: item.price * count,
        status: status,
        address: "",
        shippingMethod: "",
      };

      const newItem = {
        itemID: item._id,
        name: item.name,
        quantity: count,
        price: item.price,
        image: item.image[0],
        sellerID: "65257b8203c39d6590f03b0a",
        sellerEmail: "seller@gmail.com",
      };

      if (res.isSuccess) {
        try {
          const res2 = await axios.post(
            `http://localhost:8070/orders/${res.order[0]._id}/addItem`,
            newItem
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log(Neworder);
        await axios
          .post(`http://localhost:8070/orders`, Neworder)
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      }

      setDisableCart(true);
    }
  }

  async function fetchItem() {
    const email = localStorage.getItem("email");
    try {
      const [response1, response2, response3] = await Promise.all([
        fetch(`http://localhost:8070/items/${id}`),
        fetch(`http://localhost:8070/orders/${email}/cart/${id}`),
        fetch(`http://localhost:8070/orders/${email}/cart`),
      ]);

      const item = await response1.json();
      const data = await response2.json();
      const res = await response3.json();

      setItem(item);
      setDisableCart(data.isSuccess);
      setRes(res);

      return { item, disableCart: data.isSuccess, res };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    fetchItem()
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="">
        <div className="h-[70px] items-center justify-center flex bg-[#f1f1f1]">
          <div className="container mx-auto">
            <p className="flex focus:outline-none focus:ring-2 focus:ring-offset-2 gap-8 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
              <p>{item.section_name}</p> / <p>{item.category}</p> /{" "}
              <p>{item.product_type_name}</p>
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-8">
          <div className="w-[75%] mx-auto flex justify-center items-center lg:flex-row flex-col gap-20">
            <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-8">
              <div className="w-[400px] bg-white flex justify-center items-center">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : item.image && item.image.length > 0 && item.image[0]
                  }
                  alt="Item Image"
                />
              </div>
            </div>
            <div className="w-full items-center">
              <h2
                className="font-semibold lg:text-4xl text-3xl mt-4"
                style={{
                  lineHeight: "3.5rem",
                  color: "#1a202c",
                }}
              >
                {item.name}
              </h2>

              <div className="flex flex-row gap-10 items-center mt-5">
                <div className=" flex flex-row space-x-3">
                  <StarRatings
                    starDimension="35px"
                    starSpacing="0px"
                    rating={avgStar}
                    starRatedColor="#feb400"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <div className="h-[35px] flex items-center justify-center">
                  <p className="items-center focus:outline-none font-normal text-lg text-base leading-4 text-gray-400 duration-100 mr-5">
                    {item.ratings &&
                      item.ratings.totalRatings &&
                      item.ratings.totalRatings}
                    <span className="ml-2">Reviews</span>
                  </p>
                </div>
              </div>
              <div className="pb-5">
                <p className=" lg:text-xl text-2xl lg:leading-6 leading-5 mt-6">
                  $ {item && item.price && item.price.toFixed(2)}
                </p>
              </div>
              <hr />
              <p className=" font-normal text-base leading-6 text-gray-600 mt-7 mb-8">
                {item.description}
              </p>
              <hr />
              <div className="grid grid-cols-3 gap-5 mt-5">
                <p>Product Code : </p>
                <p>Product Type : </p>
                <p>Index Group : </p>
                <span className="text-gray-400">{item.product_code}</span>
                <span className="text-gray-400">{item.product_type_name}</span>
                <span className="text-gray-400">{item.index_group_name}</span>
              </div>
              {!localStorage.getItem("token") ? (
                <></>
              ) : jwtDecode(localStorage.getItem("token")).role == "buyer" &&
                !disableCart ? (
                <div className="lg:mt-7 mt-5">
                  <div
                    className="flex flex-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p
                      className=" font-medium text-base leading-4 text-gray-600"
                      style={{
                        marginRight: "50px",
                      }}
                    >
                      Select Quantity
                    </p>
                    <div
                      className="flex"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={minusCount}
                        className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-l-lg"
                      >
                        -
                      </button>
                      <input
                        id="counter"
                        aria-label="input"
                        className="border border-gray-300 h-full text-center w-14 mx-2"
                        type="text"
                        value={count}
                        disabled
                      />
                      <button
                        onClick={addCount}
                        className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {!localStorage.getItem("token") ? (
                <></>
              ) : jwtDecode(localStorage.getItem("token")).role == "buyer" ? (
                disableCart ? (
                  <button
                    className="bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-9"
                    disabled
                  >
                    Added
                  </button>
                ) : (
                  <button
                    className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-9"
                    onClick={AddtoCart}
                  >
                    Add to Shopping Cart
                  </button>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <Recommendation article_id={item && item.article_id} />
        </div>
      </div>
      <Reviews
        reviews={
          item.reviews && item.reviews.length > 0
            ? item.reviews.reverse()
            : undefined
        }
        itemId={item._id && item._id}
        item={item}
      />
      <Footer />
    </>
  );
}
