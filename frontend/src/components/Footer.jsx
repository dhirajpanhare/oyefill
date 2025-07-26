

const Footer = () => {
return (
    <>
<footer>
  <div className="sec">
    <img src="assets/images/logo.png" alt="ChaiCode Logo" className="bottom"/>
    <p>Home for programmers</p>
    <p>
      <a href="#"><i className="fa-brands fa-square-youtube"></i></a> 
      <a href="#"><i className="fa-brands fa-instagram"></i></a>
      <a href="#"><i className="fa-brands fa-twitter"></i></a>
      <a href="#"><i className="fa-brands fa-github"></i></a>
      <a href="#"><i className="fa-solid fa-message"></i></a>
    </p>
   
  </div>

  <div className="sec">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Form</a>
    <a href="#">Cotact</a>
    <a href="#">Pricing</a>
    <a href="#">Community</a>
  </div>

  <div className="sec">
    <a href="#">Support</a>
    <a href="#">FAQs</a>
    <a href="#">Terms</a>
    <a href="#">Privacy</a>
    <a href="#">Contact</a>
    <a href="#">About Us</a>
  </div>
</footer>

    </>
)
}

export default Footer;