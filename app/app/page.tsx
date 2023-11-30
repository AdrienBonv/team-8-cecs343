import Link from "next/link";

async function getTopRatedPlaces() {
  const response = await fetch("http://localhost:3000/api/entities/toprated", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

async function getTopPoll() {
  const response = await fetch("http://localhost:3000/api/poll/top", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export default async function Home() {
  // top rated places array

  const apiData = await getTopRatedPlaces();

  const topRatedPlaces = Array.isArray(apiData.entities)
    ? apiData.entities
    : [];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-full">
      {/* TOP RATED PLACES */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Top rated places
        </h1>
        <div className="grid grid-cols-9 gap-4">
          {topRatedPlaces.map((place) => (
            // Link to entity page with id

            <Link
              href={`/entities/${place.EntityId}`}
              key={place.Name}
              className="block col-span-6 sm:col-span-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {place.Name}
              </h5>
            </Link>
          ))}
        </div>
      </div>

      {/* TOP POLL */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Top poll
        </h1>
        <div className="grid grid-cols-9 gap-4">
          {topRatedPlaces.map((poll) => (
            <Link
              href="/"
              key={poll.Name}
              className="block col-span-6 sm:col-span-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {poll.Name}
              </h5>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
