import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import Card1 from "../Card1/Card1";
import axios from "axios";
import CarouselLoading from "../CarouselLoading/CarouselLoading";

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

function Recommendation({ article_id }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      if (article_id !== "" && article_id !== undefined) {
        try {
          const response = await axios.get(
            `http://localhost:8081/items/recom/${article_id}`
          );
          setItems(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [article_id]);

  return (
    <div className="container mt-20">
      <h1 className="text-xl font-semi-bold mb-5">Related Products</h1>

      {isLoading ? (
        <CarouselLoading />
      ) : items && items.length > 0 ? (
        <Carousel responsive={responsive}>
          {items.map((item) => (
            <Card1 key={item._id} item={item} />
          ))}
        </Carousel>
      ) : (
        <div>No recommendations available.</div>
      )}
    </div>
  );
}

export default Recommendation;
