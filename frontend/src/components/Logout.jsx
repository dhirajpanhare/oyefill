import { Navigate } from "react-router-dom";

const Logout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("number");
    localStorage.removeItem("role");
    localStorage.removeItem("info")

    return (
        <>
        <Navigate to="/login"/>
        </>
    )
}
export default Logout;