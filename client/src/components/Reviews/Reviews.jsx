import StarRatings from "react-star-ratings";
import { format } from "timeago.js";
import AddReview from "../AddReview/AddReview";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import RatingSummary from "../RatingSummary/RatingSummary";

export default function Reviews({ reviews, itemId, item }) {
  const [displayedReviews, setDisplayedReviews] = useState(4);
  const [showAll, setShowAll] = useState(false);

  const loadMoreReviews = () => {
    setDisplayedReviews(reviews.length);
    setShowAll(true);
  };

  const showLessReviews = () => {
    setDisplayedReviews(4);
    setShowAll(false);
  };

  const profileimg =
    "https://firebasestorage.googleapis.com/v0/b/surge-internship-march-2023.appspot.com/o/noprofile.png?alt=media&token=739a8587-3eb9-4d38-9e44-d887d2bf54e3";

  return (
    <div>
      <section className="bg-blueGray-100 rounded-t-10xl overflow-hidden mt-20">
        <div className="container mx-auto mb-10 grid grid-cols-5">
          <h2 className="flex mb-8 text-xl font-semi-bold">
            Reviews & Ratings
          </h2>
          <div
            style={{ margin: 0, padding: 0 }}
            className="col-start-1 col-span-3 px-7 flex flex-col justify-center"
          >
            {reviews && reviews.length > 0 ? (
              reviews.slice(0, displayedReviews).map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-300 mb-10 rounded-lg overflow-hidden py-3"
                >
                  <div className="w-full flex justify-between md:px-16 md:py-3 flex items-center">
                    <img
                      className="w-10 mr-3 rounded-full"
                      src={profileimg}
                      alt=""
                    />
                    <h4 className="w-full md:w-auto text-l">RunwayX User</h4>
                    <div className="w-full md:w-px h-2 md:h-8 mx-8 md:bg-gray-200"></div>
                    <span className="mr-3 text-xl font-heading font-medium">
                      {review.rating}.0
                    </span>
                    <div className=" mr-10">
                      <StarRatings
                        starDimension="24px"
                        starSpacing="0px"
                        rating={review.rating}
                        starRatedColor="#feb400"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <p className=" text-sm text-gray-400 mb-3">
                        Added {format(review.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 overflow-hidden pb-3 md:px-16">
                    <div className="flex flex-wrap">
                      <div className="w-full">
                        <p className=" text-darkBlueGray-400 leading-loose">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-[50px]">
                <h1 className="text-xl">No Reviews</h1>
              </div>
            )}

            {reviews && reviews.length > displayedReviews && !showAll ? (
              <button
                className="text-gray-400 hover:text-gray-500 mt-4 pb-10 hover:font-semibold"
                onClick={loadMoreReviews}
              >
                Show More
              </button>
            ) : null}

            {showAll ? (
              <button
                className="text-gray-400 hover:text-gray-500 mt-4 pb-10 hover:font-semibold"
                onClick={showLessReviews}
              >
                Show Less
              </button>
            ) : null}
          </div>
          <div className="flex flex-col items-center col-span-2 px-7">
            <div className="flex items-center gap-5 mb-7">
              <h1 className="text-3xl">
                {item && item.ratings && item.ratings.averageRating.toFixed(2)}
                <span className="text-lg">/5.00</span>
              </h1>
              <StarRatings
                starDimension="24px"
                starSpacing="0px"
                rating={item && item.ratings && item.ratings.averageRating}
                starRatedColor="#feb400"
                numberOfStars={5}
                name="rating"
              />
              <p className="flex text-gray-400 gap-5">
                ({" "}
                {item.ratings &&
                  item.ratings.totalRatings &&
                  item.ratings.totalRatings}{" "}
                reviews )
              </p>
            </div>
            <RatingSummary itemId={itemId && itemId} />
            {localStorage.getItem("token") ? (
              jwtDecode(localStorage.getItem("token")).role === "buyer" ? (
                <AddReview itemId={itemId && itemId} item={item} />
              ) : (
                <> </>
              )
            ) : (
              <> </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
