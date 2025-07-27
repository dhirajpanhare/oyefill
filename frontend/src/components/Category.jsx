import { __categoryapiurl } from "../API_URL";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Category() {
  const [cList, setCList] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true); // Start in loading state

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch")
      .then((response) => {
        setCList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load category data");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="heading">FILL BY CATEGORY</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="category-section">
        {cList.map((row, index) => (
          <Link to={`/cat/${row.catName}`} key={row._id}>
            <div className="category">
              <img src={row.caticonnm} alt={row.catName} />
              <h4>{row.catName}</h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Category;
