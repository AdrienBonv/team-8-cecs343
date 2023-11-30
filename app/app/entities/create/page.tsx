import Image from "next/image";

export default function CreateEntity() {
  async function handleSubmit(formData: FormData) {
    "use server";

    // convert FormData to JSON string
    const formDataJSON = JSON.stringify(Object.fromEntries(formData));

    const response = await fetch("http://localhost:3000/api/entities/create", {
      method: "POST",
      body: formDataJSON,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-full p-8">
      <div className="border rounded-lg border-gray-400 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create Entity
          </h1>
        </div>
        {/* column space between */}
        <div className="flex flex-row justify-center">
          <form className="w-full max-w-lg" action={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-name"
                  type="text"
                  placeholder="Name of the entity"
                />
                <p className="text-gray-600 dark:text-gray-400 text-xs italic">
                  Name of the entity
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"
                  htmlFor="grid-description"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-description"
                  placeholder="Write a description of the entity"
                />
                <p className="text-gray-600 dark:text-gray-400 text-xs italic">
                  Description of the entity
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"
                  htmlFor="grid-image"
                >
                  Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-image"
                  type="file"
                  accept="image/*"
                />
                <p className="text-gray-600 dark:text-gray-400 text-xs italic">
                  Image of the entity
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg border text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
