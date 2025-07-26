import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { __alertapiurl } from "../API_URL";

const Alerts = () => {

  const [form, setForm] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios.get(__alertapiurl + "fetch", {
     
    }).then((response) => {
      console.log(response.data)
      setForm(response.data);
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to load user data");
        setLoading(false);
      });
  }, []);


  return (
    <>
      <Navbar />

      <div class="alert-boxes">


{
  form.map((row ,index)=>(

<div class="timeline-box" key={row._id}>
          <h2>{row.name}</h2>
          <div class="timeline">
            <div class="event">
              <h4>{row.startdate}</h4>
              <p>Application Start Date</p>
            </div>
            <div class="event">
              <h4>{row.enddate}</h4>
              <p>Application Last Date</p>
            </div>
            <div class="event">
              <h4>{row.admitcarddate}</h4>
              <p>Exam Date</p>
            </div>
            <div class="event">
              <h4>{row.examdate}</h4>
              <p>Exam Date</p>
            </div>
          </div>
        </div>
     
    
  ) )}
</div>
      

    </>
)}
export default Alerts;