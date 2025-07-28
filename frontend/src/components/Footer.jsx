import { Link } from "react-router-dom";

const Footer = () => {
return (
    <>
<footer>
  <div className="sec">
    <img src="/public/assets/images/logo.png" alt="oyefill Logo" className="bottom"/>
    <p>Home for programmers</p>
    <p>
      
      <a href="#"><i className="fa-brands fa-instagram"></i></a>
      <a href="#"><i className="fa-brands fa-twitter"></i></a>
      <a href="#"><i className="fa-brands fa-github"></i></a>
      <a href="#"><i className="fa-regular fa-envelope"></i></a>
    </p>
   
  </div>

  <div className="sec">
   <p> <Link to="/">Home</Link></p>
   <p> <Link to="/about">About</Link></p>
   <p> <Link to="/forms">Forms</Link></p>
   <p> <Link to="contact">Contact</Link></p>
   <p> <Link to="alets">Alerts</Link></p>
  </div>

  <div className="sec">
   <p> <Link to="login">Login</Link></p>
   <p> <Link to="login">Register</Link></p>
    <p><Link to="faq">FAQs</Link></p>
   <p> <Link to="tc">Terms</Link></p>
   <p> <Link to="privacy">Privacy</Link></p>
   
  </div>
</footer>

    </>
)
}

export default Footer;