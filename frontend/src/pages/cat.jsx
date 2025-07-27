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
        const res = await axios.get(`${__formapiurl}cat/${catName}`); // ✅ CORRECT
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
    <Navbar/>
           <div className="form-container">
        {
          forms.map((row)=>(
        <div className="form-section" key={row._id}>
          <h1>{row.formName}</h1>
          <h4>{row.catName}</h4>
          <span>Eligibility</span>
          <p>{row.description}</p>
          <span>Price</span>
          <p className="price">{row.formPrice}</p>
         <a href={row.nLink}> <button className="r-btn">Notification Link</button></a>
          <a href={row.fLink}><button className="r-btn">Fill Now</button></a>
        </div>
        ))
}
      </div>
    </>
  );
};

export default Cat;
