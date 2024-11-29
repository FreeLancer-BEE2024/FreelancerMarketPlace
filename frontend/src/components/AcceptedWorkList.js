import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Hook to get dynamic URL params

const AcceptedWork = () => {
  const { id } = useParams();  // Get the 'id' from the URL
  const [acceptedWorks, setAcceptedWorks] = useState([]);

  useEffect(() => {
    const fetchAcceptedWorks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/company/${id}/counterworks`, {
          withCredentials: true,
        });
        setAcceptedWorks(response.data);
      } catch (error) {
        console.error("Error fetching accepted works:", error);
      }
    };

    if (id) {
      fetchAcceptedWorks();
    }
  }, [id]);  // Dependency on 'id' to re-fetch when it changes

  return (
    <div>
      <h2>Accepted Work</h2>
      <ul>
        {acceptedWorks.map((work) => (
          <li key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedWork;
