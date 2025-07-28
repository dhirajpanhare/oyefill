import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { __contactapiurl } from "../API_URL";

const Contact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [output, setOutput] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            setOutput("Please fill all  field");
            return;
        }

        const contactDetails = { name, email, message };
        setLoading(true);

        await axios.post(__contactapiurl+'save',contactDetails).then(()=>{
            setName("");
            setEmail("")
            setMessage("")
            setOutput("✅ Message Sent Succesfully")
        }).catch((error)=>{
            setOutput("✖️ Message Sent Failed")
        })
        setLoading(false)
    }

    return (
        <>
            <Navbar />
            <div className="form">
                <form className="r-form">
                    <h2>{output}</h2>
                    <h2 className="rh">Contact Us! </h2>
                    <p>Name</p>
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <p>Email</p>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p>Message</p>
                    <textarea placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <br />
                    <br />
                    <button className="r-btn" onClick={handleSubmit} disabled={loading}>Contact</button>
                </form>
            </div>
        </>
    )
}
export default Contact;