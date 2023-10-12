import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function RatingSummary({ itemId, item }) {
  const [ratingSummary, setRatingSummary] = useState({});

  useEffect(() => {
    if (itemId) {
      axios
        .get(`http://localhost:8081/items/${itemId}/ratingsummary`)
        .then((response) => {
          setRatingSummary(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [itemId]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <ResponsiveContainer width={400} height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ratingSummary}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar
              name="Mike"
              dataKey="count"
              stroke="#feb400"
              fill="#feb400"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RatingSummary;
