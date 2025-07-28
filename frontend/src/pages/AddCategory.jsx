
import axios from 'axios';
import { useState, useEffect } from 'react';
import { __categoryapiurl } from '../API_URL';
import Navbar from '../components/Navbar';

function AddCategory() {
  const [file, setFile] = useState("");
  const [catName, setCatName] = useState("");
  const [output, setOutput] = useState();
  const [cList ,setCList] = useState([]);



  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };



  const handleSubmit = async (event) => {
    if (!catName || !file) {
      setOutput("Please fill all  field");
      return;
    }
   

    event.preventDefault();
    var formData = new FormData();
    formData.append('catName', catName);
    formData.append('caticon', file);
    const config = {
      'content-type': 'multipart/form-data'
    };
    await axios.post(__categoryapiurl + "save", formData, config).then((response) => {
      setCatName("");
      setFile("");
      setOutput("✅Category Added Successfully....");
    });

  };

    useEffect(() => {
        axios.get(__categoryapiurl + "fetch",

        ).then((response) => {
            setCList(response.data)

        })
    }, 1)

    const manageCategory = (_id ,action) =>{
if (action === "delete") {
            axios.delete(__categoryapiurl + "delete", {
                data: { _id }
            })
                .then(() => {
                    setFList(prev => prev.filter(category => category._id !== _id));
                })
                .catch(err => console.error("Error deleting user:", err));
        }
    }




  return (
    <>
      <Navbar />
      <h1 className="heading">{output}</h1>
      <div className="form">
        <form className="r-form">

          <p>Category Image</p>
          <input type="file" className="file" onChange={handleChange} />
          <p>Category Namek</p>
          <input type="text" value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="Categort Name" />

          <button type="button" className='r-btn' onClick={handleSubmit} >Add Category</button>
        </form>
      </div>
<table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Image</th>
                       <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cList.map((row, index) => (
                        <tr key={row._id}>
                            <td>{index+1}</td>
                            <td>{row.catName}</td>
                            <td><img src={row.caticonnm} alt="" height={"50px"}/></td>
                          
                           
                          
                            <td>

                                <button
                                    className='del'
                                    onClick={() => manageForms(row._id, 'delete')}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </>
  )
}

export default AddCategory;


