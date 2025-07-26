import { useState,useEffect } from "react";
import { __formapiurl } from "../API_URL";
import axios from "axios";

const FormSection = () => {

  const [fList ,setFList] = useState([]);

  useEffect(()=>{
    axios.get(__formapiurl + "full",

    ).then((response)=>{
    
      setFList(response.data)
    })
  },[])

  return (
    <>
      <div className="form-container">
        {
          fList.map((row)=>(
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
  )
}
export default FormSection;