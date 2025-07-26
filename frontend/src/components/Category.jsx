import { __categoryapiurl } from "../API_URL";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Category() {

    const [cList , setCList]= useState([]);
    const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    axios.get(__categoryapiurl+ "fetch", {
      
     
    }).then((response) => {
      setCList(response.data);
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError("Failed to load project data");
        setLoading(false);
      });

      
  }, 1);
    return (
        <>
            <h1 className="heading">FILL BY CATEGORY</h1>

            <div className="category-section">
                 {
                 cList.map((row ,index)=>(
                  <Link to={`/cat/${row.catName}`}>
                <div className="category" key={row._id}>
           
                    <img src={`/assets/uploads/categoryicons/${row.caticonnm}`} alt="" />
                    <h4 className="">{row.catName}</h4>
                </div>
                </Link>

                 ))
                }
            
            </div>
        </>
    )
}
export default Category;