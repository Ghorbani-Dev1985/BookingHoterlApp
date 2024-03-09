import React from "react";
import useFetch from "../../Hooks/useFetch";
import { Link } from "react-router-dom";
import { Euro } from "@mui/icons-material";
import LocationListLoading from "../Loading/LocationListLoading";

const LocationList = () => {
  const { data, isLoading } = useFetch("hotels", "");
  return (
    <section>
      <div className="container">
        {isLoading ? (
          <LocationListLoading listsToRender={10} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border border-gray-600 rounded-xl p-2">
            {data.map(({ id, medium_url, smart_location, name, price }) => {
              return (
                <React.Fragment key={id}>
                  <div className="h-auto border rounded-lg shadow bg-gray-800 border-gray-700">
                    <Link to="">
                      {medium_url ? (
                        <img
                          className="w-full rounded-t-lg h-[183px] min-h-[183px]"
                          src={medium_url}
                          alt={name}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-48 mb-4 rounded-t-lg bg-gray-700">
                          <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                          >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                          </svg>
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-col justify-evenly h-56 min-h-56 p-2 my-3">
                      <div>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-white line-clamp-2 min-h-10">
                          {name}
                        </h5>
                        <p className="mb-3 font-normal text-gray-400">
                          {smart_location}
                        </p>
                        <div className="flex items-center gap-2">
                          <h5 className="flex items-center mb-2 text-2xl font-bold tracking-tight text-white">
                            <Euro />
                            {price}
                          </h5>
                          <p className="mb-3 font-normal text-gray-400">
                            Per Night
                          </p>
                        </div>
                      </div>
                      <div>
                        <Link
                          to=""
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                        >
                          Read more
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationList;
