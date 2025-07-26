import { useState } from "react";
import axios from 'axios';
import { __userapiurl } from "../API_URL";
import Navbar from "../components/Navbar";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !number || !password) {
            setOutput("Please fill in all fields.");
            return;
        }

        const userDetails = { name, email, number, password };
        setLoading(true);
        try {
            await axios.post(__userapiurl + 'save', userDetails);
            setName("");
            setEmail("");
            setNumber("");
            setPassword("");
            setOutput("✅ Registered successfully!");
        } catch (error) {
            console.error(error);
            setOutput("❌ Registration failed.");
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <div className="form">
                <form className="r-form">
                    <h1>{output}</h1>
                    <h2 className="rh">Register Here!</h2>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br /><br />
                    <button
                        type="button"
                        className="r-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register Now"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;
