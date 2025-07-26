import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { __alertapiurl, __categoryapiurl } from "../API_URL";
import axios from 'axios'

const AddAlert = () => {
    const [name, setName] = useState("");
    const [cList, setCList] = useState([]);
    const [aList, setAList] = useState([]);
    const [categorynm, setCategorynm] = useState();
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [admitcarddate, setAdmitCardDate] = useState("");
    const [examdate, setExamDate] = useState("");
    const [output, setOutput] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(__categoryapiurl + "fetch",

        ).then((response) => {
            console.log(response.data)
            setCList(response.data)

        })
        axios.get(__alertapiurl + "fetch", {

        }).then((response) => {
            setAList(response.data);
        })
    }, [])

    const handleSubmit = async () => {



        const alertDetails = { name, categorynm, startdate, enddate, admitcarddate, examdate };
        setLoading(true);

        await axios.post(__alertapiurl + 'save', alertDetails).then(() => {
            setName("");
            setStartDate("")
            setCategorynm("");
            setEndDate("")
            setOutput("✅ Alert Added Succesfully")
        }).catch((error) => {
            setOutput("✖️ Alert Add Failed")
        })
        setLoading(false)
    }

    const manageAlerts = (_id, action) => {
        if (action === "delete") {
            axios.delete(__alertapiurl + "delete", {
                data: { _id }
            })
                .then(() => {
                    setAList(prev => prev.filter(alert => alert._id !== _id));
                })
                .catch(err => console.error("Error deleting user:", err));
        }
    }

    return (
        <>
            <Navbar />
            <div className="form">
                <form className="r-form">
                    <h2>{output}</h2>
                    <h2 className="rh">Add Alert Here!</h2>
                    <p>Form Name</p>
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <p>Category</p>
                    <select value={categorynm}
                        onChange={(e) => setCategorynm(e.target.value)} >
                        <option>Select Category</option>
                        {
                            cList.map((row) => (
                                <option key={row._id}>{row.catName}</option>
                            ))
                        }
                    </select>
                    <p>Application Start Date</p>
                    <input type="date" placeholder="Application Start Date" value={startdate} onChange={(e) => setStartDate(e.target.value)} />
                    <p>Application End Date</p>
                    <input type="date" placeholder="Application End Date" value={enddate} onChange={(e) => setEndDate(e.target.value)} />
                    <p>Admit Card Date</p>
                    <input type="text" placeholder="Admit Card Date" value={admitcarddate} onChange={(e) => setAdmitCardDate(e.target.value)} />
                    <p>Exam Date</p>
                    <input type="text" placeholder="Exam Date" value={examdate} onChange={(e) => setExamDate(e.target.value)} />
                    <br />
                    <br />
                    <button className="r-btn" onClick={handleSubmit} disabled={loading}>Add Alert</button>
                </form>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Form Name</th>
                        <th>Form Start Date</th>
                        <th>Form Exam Date</th>
                        <th>Form Admit Card Date</th>
                        <th>Form Exam Date</th>
                    </tr>
                </thead>
                <tbody>
                    {aList.map((row, index) => (
                        <tr key={row._id}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.startdate}</td>
                            <td>{row.enddate}</td>
                            
                            <td>{row.admitcarddate}</td>
                            <td>{row.examdate}</td>



                            <td>

                                <button
                                    className='del'
                                    onClick={() => manageAlerts(row._id, 'delete')}
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
export default AddAlert