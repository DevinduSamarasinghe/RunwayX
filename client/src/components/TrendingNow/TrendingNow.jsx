import "./TrendingNow.css";
import Carousel from "react-multi-carousel";
import Card1 from "../Card1/Card1";
import { useEffect, useState } from "react";
import axios from "axios";
import CarouselLoading from "../CarouselLoading/CarouselLoading";

export default function TrendingNow() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch(
      //   "http://localhost:8081/items"
      // );
      const response = await axios.post(
        "http://localhost:8081/items/category",
        {
          category: "Garment Upper body",
        }
      );
      setItems(response.data);
      // const reversedData = data.reverse();
      // setItems(reversedData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 6,
    },
    minidesktop: {
      breakpoint: { max: 2000, min: 1000 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1000, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="trendingNow">
      <div>
        <h3>Trending Now</h3>
        <button className="bg-[#3ea7ac] hover:bg-[#278a9e] mx-4 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          View more
        </button>
      </div>
      <div>
        {isLoading ? (
          <CarouselLoading />
        ) : (
          <Carousel responsive={responsive}>
            {items.map((item) => (
              <Card1 key={item._id} item={item} />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
