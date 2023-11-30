import { Cookie } from "next/font/google";
import Image from "next/image";

async function getEntity(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/entities/entity/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

async function getRate(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/ratings/entity/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

async function handleSubmit(formData: FormData) {
  "use server";

  // convert FormData to JSON string
  // const formDataJSON = JSON.stringify(Object.fromEntries(formData));

  // console.log(formDataJSON);

  // // create entityId with the id from the url
  // const entityId =
  // // add entityId to formDataJSON
  // const formDataJSONWithEntityId = JSON.parse(formDataJSON);
  // formDataJSONWithEntityId.entityId = entityId;

  // // send JSON string to server
  // const response = await fetch("http://localhost:3000/api/ratings/create", {
  //   method: "POST",
  //   body: formDataJSONWithEntityId,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // get response from server
  // const data = await response.json();
  // console.log(data);
}

export default async function Entity({ params }: { params: { id: string } }) {
  const entity = await getEntity(params.id);
  const rate = await getRate(params.id);

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
          <form className="flex flex-col" action={handleSubmit}>
            <label className="text-xl font-semibold text-gray-900 dark:text-white">
              Rate
            </label>
            <select
              name="rating"
              className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={0}
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
