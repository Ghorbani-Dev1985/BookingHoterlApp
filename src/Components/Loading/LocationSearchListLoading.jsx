import React from "react";

const LocationListLoading = ({ listsToRender }) => {
  return (
    <div
      role="status"
      className="flex flex-col gap-5 shadow animate-pulse dark:divide-gray-700dark:border-gray-700"
    >
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <React.Fragment key={index}>
       
<div role="status" className="space-y-8  border border-gray-700 rounded-lg animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div className="flex items-center justify-center w-full h-36 rounded sm:w-96 bg-gray-700">
        <svg className="w-10 h-10 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    <div className="w-full pr-3">
        <div className="h-2.5 rounded-full bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 rounded-full bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 max-w-[360px]"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>


          </React.Fragment>
        ))}
    </div>
  );
};

export default LocationListLoading;
