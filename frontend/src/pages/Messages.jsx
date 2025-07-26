import { useState, useEffect } from 'react';
import { __contactapiurl, __userapiurl } from '../API_URL.jsx';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';

const Messages = () => {
   
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(__contactapiurl + "fetch", {
          
        })
            .then((response) => {
                setMessages(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Failed to load user data");
                setLoading(false);
            });
    }, []);

    const manageMessage = (_id, action) => {
   

         if (action === "delete") {
            axios.delete(__contactapiurl + "delete", {
                data: { _id }
            })
                .then(() => {
                    setMessages(prev => prev.filter(msg => msg._id !== _id));
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
                        <th>Message</th>
                        <th>Info</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((row, index) => (
                        <tr key={row._id}>
                            <td>{index+1}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.message}</td>
                            <td>{row.info}</td>
<td>
                                <button
                                    className='del'
                                    onClick={() => manageMessage(row._id, 'delete')}
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

export default Messages;
