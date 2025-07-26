import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { __userapiurl } from "../API_URL";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            setOutput("Please enter both email and password.");
            return;
        }

        const userDetails = { email, password };
        setLoading(true);
        try {
            const response = await axios.post(__userapiurl + "login", userDetails);
            const user = response.data.userDetails;

            // Store only safe public values
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            localStorage.setItem("number", user.number);
            localStorage.setItem("role", user.role);
            localStorage.setItem("info", user.info);

            setOutput("Login successful!");
            if (user.role === "admin") {
                navigate("/adminhome");
            } else { 
                navigate("/");
            }
        } catch (error) {
            setOutput("❌ Invalid email or password.");
            setEmail("");
            setPassword("");
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <div className="form">
                <form className="r-form">
                    {output && <h1>{output}</h1>}
                    <h2 className="rh">Login Here!</h2>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? "Logging in..." : "Login Now"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
