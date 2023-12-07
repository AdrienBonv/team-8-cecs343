"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Entity({ params }: { params: { id: string } }) {
  const [userRatings, setUserRatings] = useState({
    RatingId: 0,
    EntityId: parseInt(params.id),
    UserId: 0,
    Rating: 0,
  });
  const [entity, setEntity] = useState({
    entity: { Name: "", Description: "", image: "" },
  });
  const [rate, setRate] = useState({ ratings: 0 });
  const hasUserRatingsChanged = useRef(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(userRatings);

    try {
      const response = await fetch("http://localhost:3000/api/ratings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-cache",
        body: JSON.stringify(userRatings),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("Entity rated");
      }
    } catch (error) {
      console.error(error);
      alert("Entity not rated");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/entities/entity/${params.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        setEntity(data);
      });

    fetch(`http://localhost:3000/api/ratings/entity/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        setRate(data);
      });

    fetch(`http://localhost:3000/api/ratings/user/${params.id}`, {
      method: "get",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ratings.RatingId != null) {
          setUserRatings(data.ratings);
          hasUserRatingsChanged.current = true;
          console.log(data);
          console.log("user ratings: ", userRatings);
        }
      });
  }, []);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-screen p-8">
      <div className="border rounded-lg border-gray-400 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {entity.entity.Name}
          </h1>
          <div>
            <p className="text-xl text-gray-700 dark:text-gray-400">
              {rate.ratings}/5
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Description
          </h2>
          <p className="text-gray-700 dark:text-gray-400">
            {entity.entity.Description}
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* select rate 0-5, title, description */}
        <div className="border rounded-lg border-gray-400 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-xl font-semibold text-gray-900 dark:text-white">
              Rate
            </label>
            <select
              name="rating"
              className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={userRatings.Rating.toString()}
              onChange={(e) => {
                setUserRatings({
                  ...userRatings,
                  Rating: parseInt(e.target.value),
                });
              }}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="pt-2.5">
              <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg border text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
