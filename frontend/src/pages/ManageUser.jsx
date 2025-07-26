import { useState, useEffect } from 'react';
import { __userapiurl } from '../API_URL.jsx';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';

const ManageUsers = () => {
   
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(__userapiurl + "fetch", {
            params: { role: "user" }
        })
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Failed to load user data");
                setLoading(false);
            });
    }, []);

    const manageUserStatus = (_id, action) => {
        if (action === "active" || action === "inactive") {
            const statusValue = action === "active" ? 1 : 0;
            const updateDetails = {
                condition_obj: { _id },
                content_obj: { status: statusValue }
            };

            axios.patch(__userapiurl + "update", updateDetails)
                .then(() => {
                    setUsers(prev =>
                        prev.map(user =>
                            user._id === _id ? { ...user, status: statusValue } : user
                        )
                    );
                })
                .catch(err => console.error("Error updating status:", err));
        } else if (action === "delete") {
            axios.delete(__userapiurl + "delete", {
                data: { _id }
            })
                .then(() => {
                    setUsers(prev => prev.filter(user => user._id !== _id));
                })
                .catch(err => console.error("Error deleting user:", err));
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Info</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((row, index) => (
                        <tr key={row._id}>
                            <td>{index+1}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.number}</td>
                            <td>{row.info}</td>
                            <td>
                                {row.status === 1
                                    ? <span style={{ color: "green" }}><i className="fa-solid fa-circle"></i></span>
                                    : <span style={{ color: "orange" }}><i className="fa-solid fa-circle"></i></span>
                                }
                            </td>
                            <td>
                                <button className='change'   
                                    onClick={() => manageUserStatus(row._id, row.status === 1 ? 'inactive' : 'active')}>
                                    <i className="fa-solid fa-right-left"></i>
                                </button>
                                <button
                                    className='del'
                                    onClick={() => manageUserStatus(row._id, 'delete')}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ManageUsers;
