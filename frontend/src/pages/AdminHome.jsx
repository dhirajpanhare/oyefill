import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { __categoryapiurl, __contactapiurl, __formapiurl, __userapiurl } from "../API_URL";
import axios from "axios";

const AdminHome = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [cList, setCList] = useState([]);
    const [fList ,setFList] = useState([]);
    const [mList , setMList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(__userapiurl + "fetch", {
                    params: { role: "user" }
                });
                setUsers(userRes.data);

                const adminRes = await axios.get(__userapiurl + "fetch", {
                    params: { role: "admin" }
                });
                setAdmins(adminRes.data);

                const categoryRes = await axios.get(__categoryapiurl + "fetch", {
                    
                });
                setCList(categoryRes.data)

                const messageRes = await axios.get(__contactapiurl + "fetch", {
                    
                });
                setMList(messageRes.data)

                 const formRes = await axios.get(__formapiurl + "full", {
                    
                });
                setFList(formRes.data)

            } catch (err) {
                console.error(err);
                setError("Failed to fetch user/admin data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const manageAdmin = async (_id) => {
        try {
            await axios.delete(__userapiurl + "delete", {
                data: { _id }
            });

            setAdmins(admins.filter(admin => admin._id !== _id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <div className="main-box">

                {admins.map((row) => (
                    <div className="boxs" key={row._id}>
                        <p className="bh">{row.name}</p>
                        <p className="bh">{row.email}</p>
                        <p className="bh">{row.number}</p>
                        <Link to="/register">
                            <button><i className="fa-solid fa-plus"></i></button>
                        </Link>
                        <button><i className="fa-solid fa-pencil"></i></button>
                        <button onClick={() => manageAdmin(row._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}

                <div className="boxes">
                    <div className="box">
                        <Link to="/manageusers">
                            <p className="bh">Total Active Users</p>
                            <p className="bd">{users.length}</p>
                        </Link>
                    </div>
                    <Link to="/addcategory">
                    <div className="box">
                        <p className="bh">Total Categories</p>
                        <p className="bd">{cList.length}</p>
                    </div>
                    </Link>
                    <Link to="/manageforms">
                    <div className="box">
                        <p className="bh">Total Forms</p>
                        <p className="bd">{fList.length}</p>
                    </div>
                    </Link>
                    <Link to="/messages">
                    <div className="box">
                        <p className="bh">Total Messages</p>
                        <p className="bd">{mList.length}</p>
                    </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
