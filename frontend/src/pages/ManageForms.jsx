import Navbar from "../components/Navbar";
import { __categoryapiurl, __formapiurl } from "../API_URL";
import { useState, useEffect } from "react";
import axios from "axios";

const ManageForms = () => {
    const [cList, setCList] = useState([]);
    const [error, setError] = useState();
    const [catName, setCatName] = useState();
    const [loading, setLoading] = useState(false);
    const [formName, setFormName] = useState();
    const [formPrice, setFormPrice] = useState();
    const [fLink , setFLink] = useState();
    const [nLink ,setNLink] =useState();
    const [description, setDescription] = useState();
    const [output, setOutput] = useState();
    const [fList , setFList] = useState([]);

    useEffect(() => {
        axios.get(__categoryapiurl + "fetch",

        ).then((response) => {
            setCList(response.data)

        })
        axios.get(__formapiurl + "full",{

        }).then((response)=>{
            setFList(response.data);
        })
    }, 1)

    const manageForms = (_id ,action) =>{
if (action === "delete") {
            axios.delete(__formapiurl + "delete", {
                data: { _id }
            })
                .then(() => {
                    setFList(prev => prev.filter(form => form._id !== _id));
                })
                .catch(err => console.error("Error deleting user:", err));
        }
    }

    const handleSubmit = async () => {

        const formDetails = { formName,catName, formPrice, description, nLink, fLink };
        setLoading(true);

        await axios.post(__formapiurl + 'save', formDetails).then(() => {
            setFormName("");
            setDescription("");
            setCatName("");
            setFormPrice("");
            setNLink("");
            setFLink("");
            setOutput("✅ Form Added Succesfully")
        }).catch((error) => {
            setOutput("✖️ Form Adding Failed")
        })
        setLoading(false)
    }
    return (
        <>
            <Navbar />

            <h1 className="heading">{output}</h1>

            <div className="form">
                <form className="r-form">
                    <h1 className="heading">Add Form Here !</h1>
                    <p>Category Name</p>
                    <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Form Name . . ." />
                    <select value={catName} onChange={(e)=> setCatName(e.target.value)}>
                        <option>Select Category</option>
                        {
                            cList.map((row) => (
                                <option>{row.catName}</option>
                            ))
                        }
                    </select>
                    <p>Form Description</p>
                    <textarea placeholder="Enter Form Description . . ." value={description} 
                    onChange={(e)=> setDescription(e.target.value)}></textarea>
                    <p>Form Price</p>
                    <input type="text" placeholder="Enter Form Price . . ."
                    value={formPrice} onChange={(e) => setFormPrice(e.target.value) } />
                       <p>Notification Link</p>
                    <input type="text" placeholder="Add Notification Link . . ." value={nLink}
                    onChange={(e)=> setNLink(e.target.value)} />
                    <p>Form Link</p>
                     <input type="text" placeholder="Add form Link . . ." value={fLink}
                    onChange={(e)=> setFLink(e.target.value)} />
                    <button type="button" className="r-btn" onClick={handleSubmit} disabled={loading}>Add Form</button>
                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                       <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fList.map((row, index) => (
                        <tr key={row._id}>
                            <td>{index+1}</td>
                            <td>{row.catName}</td>
                            <td>{row.formName}</td>
                          
                           
                          
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
export default ManageForms;