import Link from "next/link";

async function getEntity() {
  const response = await fetch(`http://localhost:3000/api/entities/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export default async function Entity() {
  const apiData = await getEntity();

  const entities = Array.isArray(apiData.entities) ? apiData.entities : [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="grid grid-cols-12 gap-2">
        {entities.map((entity) => (
          <Link
            href={`/entities/${entity.EntityId}`}
            key={entity.Name}
            className="block col-span-6 sm:col-span-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {entity.Name}
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
}
