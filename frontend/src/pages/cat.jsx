import Navbar from "../components/Navbar";
import { __formapiurl } from "../API_URL";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Cat = () => {
  const { catName } = useParams();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await axios.get(`${__formapiurl}cat/${catName}`);
        setForms(res.data);
      } catch (error) {
        console.error("Error fetching category forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [catName]);

  return (
    <>
      <Navbar />
      <div className="form-container">
        {loading && <p>Loading forms...</p>}

        {!loading && forms.length === 0 && (
          <p>No forms available in this category.</p>
        )}

        {forms.map((row) => (
          <div className="form-section" key={row._id}>
            <h1>{row.formName}</h1>
            <h4>{row.catName}</h4>

            <span>Eligibility</span>
            <p>{row.description}</p>

            <span>Price</span>
            <p className="price">₹{parseFloat(row.formPrice).toFixed(2)}</p>

            <a href={row.nLink} target="_blank" rel="noopener noreferrer">
              <button className="r-btn">Notification Link</button>
            </a>

            <a href={row.fLink} target="_blank" rel="noopener noreferrer">
              <button className="r-btn">Fill Now</button>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cat;
