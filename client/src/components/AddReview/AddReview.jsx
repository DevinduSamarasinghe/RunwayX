import axios from "axios";
import { useState } from "react";

export default function AddReview({ itemId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const review = {
        clientId: "60b6f5b3e6b2f2b0a4f9e1a5",
        rating: rating,
        comment: comment,
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(
        `http://localhost:8081/items/${itemId}/reviews`,
        review
      );

      console.log("Review added:", response.data);

      setRating(0);
      setComment("");

      window.location.reload();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="flex w-full px-10 flex-col col-span-2 col-start-4">
      <div className="w-full">
        <div className="rounded-3xl">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Add a Review
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave your comment here..."
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mt-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rate this Item
              </label>
              <div className="flex mb-3">
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ex: 1 , 2 or ... 5"
                  min="1"
                  max="5"
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-5"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
