import "./Card1.css";
import TextTruncate from "react-text-truncate";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

export default function Card1({ item }) {
  const avgStar =
    item.star && item.star.reviewers && item.star.reviewers.length > 0
      ? item.star.total / item.star.reviewers.length
      : 0;

  return (
    <div className="card1">
      <div>
        <img
          src={
            item.image && item.image.length > 0 && item.image[0]
              ? item.image[0]
              : "https://via.placeholder.com/150"
          }
          alt="item "
        />
      </div>
      <div className="textcont">
        <Link to={`/pr/${item._id}`}>
          <div className="h-[65px]">
            <TextTruncate
              line={2}
              element="span"
              truncateText="…"
              text={item.name}
              className="font-semibold text-base leading-6 text-gray-600 mt-7 mb-8 text-transform: capitalize"
            />
          </div>
        </Link>
        {/* <div className="prid">{item.article_id}</div> */}
        <div>
          <p>${item.price.toFixed(2)}</p>
          <div>
            <StarRatings
              starDimension="20px"
              starSpacing="0px"
              rating={item.ratings.averageRating}
              starRatedColor="#feb400"
              // changeRating={() => {}}
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
