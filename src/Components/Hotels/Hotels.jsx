import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import LocationSearchListLoading from "../../Components/Loading/LocationSearchListLoading";
import { Euro } from "@mui/icons-material";
import { Divider } from "@mui/material";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data, isLoading } = useFetch(
    "hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  // name_like , host_location_like
  return isLoading ? (
    <LocationSearchListLoading listsToRender={data.length} />
  ) : (
    <>
    <h2>Search Result <span className="flex-centre bg-emerald-500 px-2 py-1 rounded-lg ml-2">{data.length}</span></h2>
    <Divider className="border-gray-600"/>
    {
    data.map(({ id, medium_url, smart_location, name, latitude , longitude , price}) => {
        return (
        <React.Fragment key={id}>
          <Link
            to={`/hotels/${id}?lat=${latitude}?lng=${longitude}`}
            className="flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
            <img
              className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg"
              src={medium_url}
              alt={name}
              />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                {name}
              </h5>
              <p className="mb-3 font-normal text-gray-400">{smart_location}</p>
              <div className="flex items-center gap-2">
                          <h5 className="flex items-center mb-2 text-xl font-bold tracking-tight text-white">
                            <Euro />
                            {price}
                          </h5>
                          <p className="mb-3 font-normal text-gray-400">
                            Per Night
                          </p>
                        </div>
            </div>
          </Link>
        </React.Fragment>
      );
    })
    }
    </>
  );
};

export default Hotels;
