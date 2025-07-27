import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Auth() {
  const navigate = useNavigate();
  const location = useLocation(); // better than window.location
  const path = location.pathname;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const adminPaths = ["/adminhome", "/manageusers", "/addcategory"];

    if (adminPaths.includes(path)) {
      if (!token || role !== "admin") navigate("/logout");
    }
  }, [location, navigate]); 

  return null;
}

export default Auth;
