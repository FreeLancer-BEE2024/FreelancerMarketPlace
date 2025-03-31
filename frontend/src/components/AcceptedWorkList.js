import React from "react";

const AcceptedWork = ({ works }) => {
  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Accepted Work</h2>

      {/* Data Display */}
      {works.length > 0 ? (
        <ul className="space-y-6">
          {works.map((work) => {
            // Check if there's no response for this work (both counterOffer and accepted are missing)
            const isNoResponse = !work.counterOffer && !work.accepted;

            return (
              <li
                key={work.id}
                className="bg-gradient-to-r from-indigo-100 via-gray-200 to-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-bold text-gray-900">{work.workName}</h3>

                {/* Freelancer Name */}
                <p className="mt-2 text-lg text-gray-700">Freelancer: {work.freelancerName}</p>

                {/* Conditional Rendering of Offer Details */}
                {isNoResponse ? (
                  <p className="mt-4 text-gray-500 text-md italic">No one has responded to this work.</p>
                ) : (
                  <>
                    <p className="mt-4 text-lg text-gray-900">
                      Counter Offer: <span className="font-semibold">{work.counterOffer || 'N/A'}</span>
                    </p>
                    <p className="mt-2 text-lg text-gray-900">
                      Accepted Amount: <span className="font-semibold">{work.accepted || 'N/A'}</span>
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">No accepted works found for this job.</p>
      )}
    </div>
  );
};

export default AcceptedWork;
